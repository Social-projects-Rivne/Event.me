from cornice import Service
from ..models.event import Event
from ..models.category import Category


events_short_info = Service(name='events_short_info',
                            path='/events-short-info',
                            cors_origins=('http://localhost:3000',))


@events_short_info.post()
def get_events_short_info(request):
    """ """

    json = request.json_body
    categories = Category.get_all(request)
    categories_list = [obj.category for obj in categories]
    categories_id = [obj.id for obj in categories]
    categories_dict = dict(zip(categories_list, categories_id))
    response = {
        'info': []
    }
    if json['category'] in categories_list:
        json['category'] = categories_dict[json['category']]

    if json['category'] == '':
        response['info'] = Event.get_events_short_info(request, int(json['day_filter']))
        return response
    else:
        response['info'] = Event.get_event_short_info_with_category_id\
            (request, int(json['day_filter']), json['category'])
        return response
