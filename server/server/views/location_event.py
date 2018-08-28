from cornice import Service
from pyramid.response import Response
from ..models.event import Event

from datetime import datetime, timedelta

events_short_info = Service(name='events_short_info',
                            path='/events-short-info',
                            cors_origins=('http://localhost:3000',))


@events_short_info.post()
def get_events_short_info(request):
    """ """
    datetime_now = datetime.now()
    categories = {'holiday': 1, 'concert': 2, 'movie': 3, 'Voluntary': 4}
    json = request.json_body
    response = {
        'info': []
    }
    if json['category'] in categories:
        json['category'] = categories[json['category']]

    if json['category'] == '':
        response['info'] = Event.get_events_short_info(request, int(json['day_filter']))
        return response
    else:
        response['info'] = request.dbsession.query(Event).\
            with_entities(Event.id, Event.long, Event.lat, Event.name, Event.category_id).\
            filter(Event.start_date > datetime_now,
                   Event.start_date < datetime_now +
                   timedelta(days=int(json['day_filter'])),
                   Event.category_id == json['category']).all()
        return response
