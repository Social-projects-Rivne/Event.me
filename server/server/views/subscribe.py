"""View for subscribing to events"""

from cornice.resource import Service
from pyramid.security import Allow, Everyone

from ..models import model_to_dict
from ..models.event import Event
from ..models.subscribe import Subscribe


class SubscribeView(object):
    def __init__(self, request):
        self.request = request

    def __acl__(self):
        return [(Allow, Everyone, 'get')]


subscribe = Service(name='subscribe',
                     path='/subscribe/{subscribe_user_id}',
                     factory=SubscribeView,
                     cors_origins=('http://localhost:3000',))

@subscribe.post()
def subscribe_post(request):
    response = {
        'success': False,
        'is_subbed': None
    }

    data = request.json_body

    if data.get('action') is True:
        Subscribe.add_subscription(request, user_id=data.get('user_id'),
                                   event_id=data.get('event_id'))
        response['success'] = True
        response['is_subbed'] = True
    else:
        Subscribe.del_subscription(request, user_id=data.get('user_id'),
                                   event_id=data.get('event_id'))
        response['success'] = True
        response['is_subbed'] = False

    return response
