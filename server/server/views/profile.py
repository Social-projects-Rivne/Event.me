import json
import transaction

from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config

from server.models import get_dbsession
from server.models.user import get_all_users, create_usr, \
                                read_usr, update_usr, delete_usr


@view_config(route_name='users.view', renderer='json')
def get_users(request):
    return get_all_users()


@view_config(route_name='users.create', renderer='json')
def create_user(request):
    json_str = request.json_body
    return create_usr(json_str)


@view_config(route_name='users.read', renderer='json')
def read_user(request):
    return read_usr(request)


@view_config(route_name='users.update', renderer='json')
def update_user(request):
    json_str = request.json_body
    return update_usr(json_str, request)


@view_config(route_name='users.delete', renderer='json')
def delete_user(request):
    return delete_usr(request)
