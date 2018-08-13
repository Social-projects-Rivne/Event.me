"""View for adding new event to db"""
from datetime import datetime

from cornice.resource import resource, view
from cornice.validators import colander_body_validator
from pyramid.security import Allow, Authenticated

from ..models import model_to_dict
from ..models.event import Event
from ..models.category import Category
from ..models.event_status import EventStatus
from ..models.event_history import EventHistory
from ..validation_schema import EventSchema


@resource(collection_path='/event', path='/event/{event_id}', renderer='json',
          cors_origins=('http://localhost:3000',))
class EventView(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Authenticated, 'add')]

    @view(schema=EventSchema(), validators=(colander_body_validator,),
          permission='add')
    def collection_post(self):
        """Get validated data, create new event and push it to the db"""
        request = self.request
        response = {
            'success': False,
            'new_event_id': None,
            'msg': 'Event already exist'
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
            if 'main_image' in request.validated:
                new_event.main_image = request.validated['main_image']
            if 'end_date' in request.validated:
                new_event.end_date = request.validated['end_date']
            category = Category.get_by_name(request,
                                            request.validated['category'].
                                            lower())
            if category is not None:
                new_event.category_id = category.id
            else:
                new_event.category_id = Category\
                    .new_get_id(request, request.validated['category'].lower())
            Event.add_event(request, obj=new_event)
            new_event_id = Event.get_event_obj(request,
                                               name=request.validated['name']
                                               ).id
            response['success'] = EventHistory.create_new(
                request,
                event_id=new_event_id,
                status_id=EventStatus.get_status(request, 'New').id,
                date=datetime.now(),
                comment="New event created. \
                    Please wait for review by moderator."
                )
            response['new_event_id'] = new_event_id
            response['msg'] = ''
        return response
