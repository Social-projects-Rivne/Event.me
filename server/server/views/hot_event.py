"""View for displaying hot events"""

from cornice.resource import resource, view
from pyramid.security import Allow, Everyone

from ..models import model_to_dict
from ..models.event import Event
from ..models.event_history import EventHistory


@resource(collection_path='/hot-event/',
          path='/hot-event/{hotEvent_id}', renderer='json',
          cors_origins=('http://localhost:3000',))
class HotEventView(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Everyone, 'get')]

    @view(permission='get')
    def collection_get(self):
        request = self.request

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
<<<<<<< HEAD

=======
        
>>>>>>> 829daf7fc9299adf43a3bd5efa509b886b890b2e
        return response
