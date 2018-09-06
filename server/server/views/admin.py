from cornice.resource import resource, view
from cornice.validators import colander_body_validator
from passlib.hash import pbkdf2_sha256
from pyramid.security import Allow
from ..validation_schema import ProfileSchema

from server.models import model_to_dict
from server.models.user import User


@resource(collection_path='/admin-page', path='/admin-page/{id}',
          renderer='json', cors_origins=('http://localhost:3000',))
class AdminView(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, 'role:admin', 'admin')]

    def collection_get(self):
        user_ls = User.get_all(self.request)
        user_dict = [model_to_dict(obj) for obj in user_ls]
        response = {}
        response['user_dict'] = user_dict
        return response
