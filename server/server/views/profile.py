from cornice.resource import resource, view
from passlib.hash import pbkdf2_sha256
from pyramid.security import Allow, Everyone, Authenticated, ALL_PERMISSIONS

from server.models import model_to_dict
from server.models.user import User


@resource(collection_path='/profile', path='/profile/{profile_id}',
          renderer='json', cors_origins=('http://localhost:3000',))
class UserProfile(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context
        self.owner_id = int(request.matchdict['profile_id'])

    def __acl__(self):
        return [(Allow, Everyone, ALL_PERMISSIONS),
                (Allow, self.owner_id, 'edit')]

    @view(permission=ALL_PERMISSIONS)
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
        if data.get('password'):
            data['password'] = pbkdf2_sha256.hash(data['password']),
        return User.update_user(request, data)
