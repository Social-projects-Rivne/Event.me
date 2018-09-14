from cornice.resource import resource, view
from pyramid.security import Allow

from datetime import datetime

from server.models import model_to_dict
from server.models.user import User
from server.models.user_status import UserStatus
from server.models.role import Role

from ..models import model_to_dict
from ..models.event import Event
from ..models.event_history import EventHistory


@resource(collection_path='/admin-page/events', path='/admin-page/events/{id}',
          renderer='json', cors_origins=('http://localhost:3000',))
class AdminViewEvent(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, 'role:admin', 'admin')]

    @view(permission="admin")
    def collection_get(self):
        response = {
            'new_events': None,
            'num_of_new_events': None
        }

        new_events_list = EventHistory.get_all_by(self.request, status_id=1)
        id_array = [obj.event_id for obj in new_events_list]
        response['num_of_new_events'] = len(id_array)

        new_events = Event.get_events_by_ids(self.request, id_array)
        new_array = [model_to_dict(obj) for obj in new_events]
        response['new_events'] = new_array

        return response


    @view(permission="admin")
    def collection_post(self):
        request = self.request
        json = request.json_body
        get_event_status = EventHistory.get_current_event_status(request, event_id=json['event_id'])
        if get_event_status.status_id == 1 and json['status_id'] == 3:
            EventHistory.create_new(request,
                                    event_id=json['event_id'],
                                    status_id=json['status_id'],
                                    date=datetime.now(),
                                    comment='Moderator approved your event')
            return {'ok': "Event approved"}
