from cornice.resource import resource
from pyramid.security import Allow, Everyone, Authenticated, ALL_PERMISSIONS

from server.models import model_to_dict
from server.models.user import User


@resource(collection_path='/profile', path='/profile/{profile_id}',
          renderer='json')
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
        return model_to_dict(user)

    def put(self):
        request = self.request
        data = request.json_body
        return User.update_user(request, data)
