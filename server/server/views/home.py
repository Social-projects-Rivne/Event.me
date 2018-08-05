from cornice import Service
from pyramid.security import Allow, Everyone


home = Service(name='home', path='/', cors_origins=('http://localhost:3000',))


@home.get()
def home_get(request):
    return {
        "msg": "Get home page",
        'success': True
        }
