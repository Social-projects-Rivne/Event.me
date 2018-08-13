from cornice.resource import resource, view
from pyramid.security import Allow, Everyone, ALL_PERMISSIONS


@resource(path='/', renderer='json', cors_origins=('http://localhost:3000',))
class Home(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Everyone, ALL_PERMISSIONS)]

    @view(permission=ALL_PERMISSIONS)
    def get(self):
        return {
            "msg": "Get home page",
            'success': True
            }
