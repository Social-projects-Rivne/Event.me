import json
import transaction

from pyramid.httpexceptions import HTTPOk
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config, view_defaults

from .models import Base, DBSession
from .models.users import User
from .models.users import users_to_json
from .models.users import UserSchema
from .models.users import datetime_conv, AlchemyEncoder

@view_config(route_name='home', renderer='templates/mytemplate.jinja2')
def my_view(request):
    return {'project': 'server'}

@view_config(route_name='users.view', renderer='json')
def get_users(request):
    qry = DBSession.query(User).all()
    return json.dumps(qry, cls=AlchemyEncoder)

@view_config(route_name='users.create', renderer='json')
def create_user(request):
    json_str = request.json_body
    json_encoded = json.dumps(json_str)
    json_decoded = json.loads(json_encoded)
    user = User(**json_decoded)
    DBSession.add(user)
    transaction.commit()
    return {'status': 'Success!'}

@view_config(route_name='users.read', renderer='json')
def read_user(request):
    qry = DBSession.query(User).filter(User.id==request.matchdict['user_id']).first()
    dict_ = users_to_json(qry)
    return json.dumps(dict_, default=datetime_conv)

@view_config(route_name='users.update', renderer='json')
def update_user(request):
    json_str = request.json_body
    json_encoded = json.dumps(json_str)
    DBSession.query(User).filter(User.id==request.matchdict['user_id']).update(json.loads(json_encoded))
    transaction.commit()
    return {'status': 'Success!'}

@view_config(route_name='users.delete', renderer='json')
def delete_user(request):
    qry = DBSession.query(User).get(request.matchdict['user_id'])
    DBSession.delete(qry)
    transaction.commit()
    return {'return': 'Success!'}
