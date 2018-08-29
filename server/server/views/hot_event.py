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
            'display_method': None
        }

        histories = EventHistory.get_all_by(request, status_id=5)
        id_array = [obj.event_id for obj in histories]

        if len(id_array) == 1:
            response['display_method'] = 12
        elif len(id_array) == 2:
            response['display_method'] = 6
        else:
            response['display_method'] = 4

        hot_events = Event.get_events_by_ids(request, id_array)
        hot_array = [model_to_dict(obj) for obj in hot_events]
        response['hot_events'] = hot_array

        return response
