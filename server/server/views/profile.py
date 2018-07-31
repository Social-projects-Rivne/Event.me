import json
import transaction

from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config

from server.models import get_dbsession

from server.models import Base
from server.models.user import User
from server.models.user import users_to_json
from server.models.user import datetime_conv, AlchemyEncoder

@view_config(route_name='users.view', renderer='json')
def get_users(request):
    qry = get_dbsession().query(User).all()
    return json.loads(json.dumps(qry, cls=AlchemyEncoder))

@view_config(route_name='users.create', renderer='json')
def create_user(request):
    json_str = request.json_body
    json_encoded = json.dumps(json_str)
    json_decoded = json.loads(json_encoded)
    user = User(**json_decoded)
    get_dbsession().add(user)
    transaction.commit()
    return {'status': 'Success!'}

@view_config(route_name='users.read', renderer='json')
def read_user(request):
    qry = get_dbsession().query(User).filter(User.id==request.matchdict['user_id']).first()
    dict_ = users_to_json(qry)
    return json.loads(json.dumps(dict_, default=datetime_conv))

@view_config(route_name='users.update', renderer='json')
def update_user(request):
    json_str = request.json_body
    json_encoded = json.dumps(json_str)
    get_dbsession().query(User).filter(User.id==request.matchdict['user_id']).update(json.loads(json_encoded))
    transaction.commit()
    return {'status': 'Success!'}

@view_config(route_name='users.delete', renderer='json')
def delete_user(request):
    qry = get_dbsession().query(User).get(request.matchdict['user_id'])
    get_dbsession().delete(qry)
    transaction.commit()
    return {'return': 'Success!'}
