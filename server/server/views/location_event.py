from cornice import Service

from ..models.event import Event


events_short_info = Service(name='events_short_info',
                            path='/events-short-info',
                            cors_origins=('http://localhost:3000',))


@events_short_info.get()
def get_events_short_info(request):
    """ """
    responce = {
        'info': []
    }
    responce['info'] = Event.get_events_short_info(request, 14)
    return responce
