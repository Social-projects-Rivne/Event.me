from cornice.resource import resource, view


@resource(path='/', renderer='json', cors_origins=('http://localhost:3000',))
class Home(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def get(self):
        return {
            "msg": "Get home page",
            'success': True
            }
