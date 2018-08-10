from cornice.resource import resource, view
from pyramid.security import Allow, Everyone


@resource(path='/', renderer='json', cors_origins=('*',))
class Home(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Everyone, 'everything')]

    @view(permission='everything')
    def get(self):
        return {
            "msg": "Get home page",
            'success': True
            }
