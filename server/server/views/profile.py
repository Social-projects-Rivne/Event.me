import json
import transaction

from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config
from cornice.resource import resource, view
from cornice import Service
from pyramid.security import Allow, Everyone, Authenticated, ALL_PERMISSIONS

from server.models import get_dbsession
from server.models.user import get_all_users, create_usr, \
                                read_usr, update_usr, delete_usr


@resource(collection_path='/profile', path='/profile/{profile_id}',
          renderer='json')
class UserProfile(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context
        #self.owner = request.matchdict['profile_id']

    def __acl__(self):
        return [(Allow, Everyone, ALL_PERMISSIONS),
                (Allow, self.owner, 'edit')]

    def collection_get(self):
        request = self.request
        return get_all_users(request)

    def get(self):
        request = self.request
        return read_usr(request)

    def post(self):
        request = self.request
        json_str = request.json_body
        return create_usr(json_str, request)

    #@view(permissions='edit')
    def put(self):
        request = self.request
        json_str = request.json_body
        return update_usr(json_str, request)

    def delete(self):
        request = self.request
        return delete_usr(request)
