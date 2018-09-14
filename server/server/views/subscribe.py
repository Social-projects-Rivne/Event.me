from cornice.resource import Service
from pyramid.security import Allow, Everyone
from ..models import model_to_dict
from ..models.event import Event
from ..models.subscribe import Subscribe


class SubscribeFactory(object):
    def __init__(self, request):
        self.request = request

    def __acl__(self):
        return [(Allow, Everyone, 'get')]

subscribe = Service(name='subscribe',
                    path='/subscribe/{subscribe_user_id}',
                    factory=SubscribeFactory,
                    cors_origins=('http://localhost:3000',))


@subscribe.post()
def subscribe_post(request):
    response = {
        'is_subbed': None
    }

    data = request.json_body

    if data.get('if_subbed') is True:
        Subscribe.add_subscription(request, user_id=data.get('user_id'),
                                   event_id=data.get('event_id'))
        response['is_subbed'] = True
    else:
        Subscribe.del_subscription(request, user_id=data.get('user_id'),
                                   event_id=data.get('event_id'))
        response['is_subbed'] = False

    return response
