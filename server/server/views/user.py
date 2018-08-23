from cornice.resource import resource, view
from cornice.validators import colander_body_validator
from passlib.hash import pbkdf2_sha256
from pyramid.security import Deny, Allow, Everyone, Authenticated, ALL_PERMISSIONS
from ..validation_schema import ProfileSchema

from server.models import model_to_dict
from server.models.user import User


@resource(collection_path='/profile', path='/profile/{profile_id}',
          renderer='json', cors_origins=('http://localhost:3000',))
class UserView(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context
        self.owner_id = request.matchdict['profile_id']

    def __acl__(self):
        return [(Allow, self.owner_id, 'edit')]

    def get(self):
        request = self.request
        user = User.get_one(request, id=request.matchdict['profile_id'])
        user_dict = model_to_dict(user)
        user_dict['password'] = None
        return user_dict

    @view(schema=ProfileSchema(), validators=(colander_body_validator,),
          permission='edit')
    def put(self):
        request = self.request
        data = request.validated
        data_check_if_null = False

        if data.get('first_name') is None and \
           data.get('last_name') is None and \
           data.get('nickname') is None and \
           data.get('location') is None:
            data_check_if_null = True

        if data.get('password'):
            data['password'] = pbkdf2_sha256.hash(data['password'])

        return User.update_user(request, data, data_check_if_null)
