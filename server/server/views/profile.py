<<<<<<< HEAD
import json
import transaction

from cornice.resource import resource, view
from cornice import Service
from passlib.hash import pbkdf2_sha256
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config
=======
from cornice.resource import resource
>>>>>>> origin
from pyramid.security import Allow, Everyone, Authenticated, ALL_PERMISSIONS

from server.models import model_to_dict
from server.models.user import User


@resource(collection_path='/profile', path='/profile/{profile_id}',
          renderer='json', cors_origins=('*',))
class UserProfile(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Everyone, ALL_PERMISSIONS),
                (Allow, self.owner, 'edit')]

    def get(self):
        request = self.request
        user = User.get_one(request, id=request.matchdict['profile_id'])
        user_dict = model_to_dict(user)
        user_dict['password'] = None
        return user_dict

    @view(permission='edit')
    def put(self):
        request = self.request
        data = request.json_body
        data['password'] = pbkdf2_sha256.hash(data['password']),
        return User.update_user(request, data)
