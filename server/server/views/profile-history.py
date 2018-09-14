from cornice.resource import Service
from pyramid.security import Allow, Everyone
from ..models import model_to_dict
from ..models.event import Event
from ..models.event_history import EventHistory


class ProfileHistoryFactory(object):
    def __init__(self, request):
        self.request = request
        self.owner_id = request.matchdict['user_id']

    def __acl__(self):
        return [(Allow, self.owner_id, 'get')]

profile_history = Service(name='profile-history',
                          path='/profile-history/{user_id}',
                          factory=ProfileHistoryFactory,
                          cors_origins=('http://localhost:3000',))


@profile_history.get()
def profile_history_get(request):
    response = {}

    events = Event.get_events_by_user_id(request, request.user.id)
    id_arr = [obj.id for obj in events]
    response['num_of_events'] = len(id_arr)
    history = EventHistory.get_event_history_by_user_id(request, id_arr=id_arr)
    history_dict = [model_to_dict(obj) for obj in history]
    events_dict = [model_to_dict(obj) for obj in events]

    response = {
        'events': events_dict,
        'history': history_dict,
    }

    return response
