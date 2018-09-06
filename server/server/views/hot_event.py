"""View for displaying hot events"""

from cornice.resource import Service
from pyramid.security import Allow, Everyone

from ..models import model_to_dict
from ..models.event import Event
from ..models.event_history import EventHistory


class HotEventView(object):
    def __init__(self, request):
        self.request = request

    def __acl__(self):
        return [(Allow, Everyone, 'get')]


hot_event = Service(name='hot_event',
                     path='/hot-event/',
                     factory=HotEventView,
                     cors_origins=('http://localhost:3000',))

@hot_event.get()
def hot_event_get(request):
    response = {
        'hot_events': None,
        'num_of_hot_events': None
    }

    histories = EventHistory.get_all_by(request, status_id=5)
    id_array = [obj.event_id for obj in histories]
    response['num_of_hot_events'] = len(id_array)

    hot_events = Event.get_events_by_ids(request, id_array)
    hot_array = [model_to_dict(obj) for obj in hot_events]
    response['hot_events'] = hot_array

    return response
