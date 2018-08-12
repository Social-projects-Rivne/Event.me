"""View for adding new event to db"""
from cornice import Service

from ..models import model_to_dict
from ..models.category import Category


add_event = Service(name='add_event', path='/add-event',
                    cors_origins=('http://localhost:3000',))


@add_event.get()
def add_event_get(request):
    response = {
        'success': False,
        'categories': None
    }
    categories = Category.get_all(request)
    response['categories'] = [model_to_dict(obj) for obj in categories]
    return response
