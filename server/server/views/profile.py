import json
import transaction

from cornice.resource import resource, view
from cornice import Service
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config
from pyramid.security import Allow, Everyone, Authenticated, ALL_PERMISSIONS

from server.models import get_dbsession
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
        return User.read_user(request=request)

    def put(self):
        request = self.request
        data = request.json_body
        return User.update_user(request=request, json_data=data)
