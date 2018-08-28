from cornice import Service
from pyramid.response import Response
from ..models.event import Event
from ..models.category import Category


events_short_info = Service(name='events_short_info',
                            path='/events-short-info',
                            cors_origins=('http://localhost:3000',))


@events_short_info.post()
def get_events_short_info(request):
    """ """
    catt = {'holiday': 1,
            'convert': 2}
    json = request.json_body
    response = {
        'info': []
    }
    response['info'] = Event.get_events_short_info(request, int(json['day_filter']))
    if json['category'] in catt:
        for i in response['info']:
            if json['category'] == response['info']['category_id']:

    return response
