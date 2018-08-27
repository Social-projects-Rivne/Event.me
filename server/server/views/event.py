"""View for adding new event to db"""
from datetime import datetime

from cornice.resource import resource, view
from cornice.validators import colander_body_validator
from pyramid.security import Allow, Authenticated, Everyone
from pyramid.httpexceptions import HTTPNotFound

from ..models import model_to_dict
from ..models.category import Category
from ..models.event import Event
from ..models.event_history import EventHistory
from ..models.event_status import EventStatus
from ..models.event_tag import EventTag
from ..models.tag import Tag
from ..validation_schema import EventSchema


@resource(collection_path='/event', path='/event/{event_id}', renderer='json',
          cors_origins=('http://localhost:3000',))
class EventView(object):
    """ """

    def __init__(self, request, context=None):
        """ """
        self.request = request
        self.context = context
        if 'event_id' in request.matchdict:
            self.event_id = request.matchdict['event_id']
            self.author_id = Event.get_event_by_id(request,
                                                   self.event_id).author_id
            self.event_history = EventHistory\
                .get_current_event_status(self.request, self.event_id)
            self.event_status = self.event_history.event_statuses.status

    def __acl__(self):
        """ """
        if 'event_id' in self.request.matchdict:
            if (self.event_status == "New" or
                    self.event_status == "Disapproved"):
                principal = self.author_id
            else:
                principal = Everyone
            return [(Allow, Authenticated, 'add'),
                    (Allow, str(self.author_id), 'update'),
                    (Allow, str(principal), 'get')]
        else:
            return [(Allow, Authenticated, 'add')]

    @view(schema=EventSchema(), validators=(colander_body_validator,),
          permission='add')
    def collection_post(self):
        """Get validated data, create new event and push it to the db"""
        request = self.request
        response = {
            'success': False,
            'new_event_id': None,
            'errors': [{
                'name': 'name',
                'description': 'Event name already exist'
            }],
        }

        if Event.get_event_obj(request,
                               name=request.validated['name']) is None:
            new_event = Event(name=request.validated['name'],
                              long=request.validated['long'],
                              lat=request.validated['lat'],
                              start_date=request.validated['start_date'],
                              description=request.validated['description'],
                              author_name=request.user.nickname,
                              author_id=request.user.id
                              )

            category_obj = Category\
                .get_by_name(request, request.validated['category'].lower())
            if category_obj is None:
                response['errors']['name'] = 'category'
                response['errors']['description'] = "Category is not exist"
                return response
            new_event.category_id = category_obj.id

            if 'main_image' in request.validated:
                new_event.main_image = request.validated['main_image']

            if 'end_date' in request.validated:
                new_event.end_date = request.validated['end_date']

            Event.add_event(request, obj=new_event)
            new_event_id = Event.get_event_obj(request,
                                               name=request.validated['name']
                                               ).id

            for tag in request.validated.get('tags', []):
                tag_obj = Tag.get_by_name(request, tag.lower())
                if tag_obj is not None:
                    tag_id = tag_obj.id
                else:
                    tag_id = Tag.add_new(request, tag.lower())
                EventTag.add_new(request, tag_id, new_event_id)

            response['success'] = EventHistory.create_new(
                request,
                event_id=new_event_id,
                status_id=EventStatus.get_status(request, 'New').id,
                date=datetime.now(),
                comment="New event created. \
                    Please wait for review by moderator."
            )
            response['new_event_id'] = new_event_id
            del response['errors']
        return response

    @view(permission='get')
    def get(self):
        """ """
        request = self.request

        event_obj = Event.get_event_by_id(request, self.event_id)
        if event_obj is None:
            return HTTPNotFound()

        tags = EventTag.get_event_tags(request, event_obj.id)
        response = {
            'event': model_to_dict(event_obj),
            'category': event_obj.category.category,
            'tags': tags,
        }
        if event_obj.author_id == request.user.id:
            response['status'] = model_to_dict(self.event_history)

        return response

    @view(schema=EventSchema(), validators=(colander_body_validator,),
          permission='update')
    def put(self):
        """Get validated data and update event data"""
        request = self.request
        response = {
            'success': False,
            'errors': [{
                'name': 'name',
                'description': 'Event name already exist'
            }],
        }
        current_event = Event.get_event_by_id(request, self.event_id)

        if current_event is None:
            raise HTTPNotFound()

        if (current_event.name == request.validated['name'] or
            Event.get_event_obj(request,
                                name=request.validated['name']) is None):
            event_dict = model_to_dict(current_event)
            for key in event_dict:
                if key in request.validated:
                    event_dict[key] = request.validated[key]

            category_obj = Category\
                .get_by_name(request, request.validated['category'].lower())
            if category_obj is None:
                response['errors']['name'] = 'category'
                response['errors']['description'] = "Category is not exist"
                return response
            event_dict['category_id'] = category_obj.id

            current_event.update_event(request, event_dict)

            currnet_event_tags = EventTag.get_event_tags(request,
                                                         self.event_id)
            for tag in currnet_event_tags:
                if tag not in request.validated.get('tags', []):
                    EventTag.delete_tag(request,
                                        currnet_event_tags[tag], self.event_id)
            for tag in request.validated.get('tags', []):
                tag_obj = Tag.get_by_name(request, tag.lower())
                if tag_obj is not None:
                    tag_id = tag_obj.id
                    if tag not in currnet_event_tags:
                        EventTag.add_new(request, tag_id, self.event_id)
                else:
                    tag_id = Tag.add_new(request, tag.lower())
                    EventTag.add_new(request, tag_id, self.event_id)

            response['success'] = EventHistory.create_new(
                request,
                event_id=self.event_id,
                status_id=EventStatus.get_status(request, 'New').id,
                date=datetime.now(),
                comment=("Your event updated. "
                         "Please wait for review by moderator.")
            )
            del response['errors']
        return response
