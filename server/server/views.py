from pyramid.httpexceptions import HTTPOk
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config, view_defaults
from cornice import Service

from .models import Base, DBSession
from .models.users import User
from .models.users import users_to_json
from .models.users import UserSchema
import json
from .models.users import AlchemyEncoder, datetime_conv
import transaction

@view_config(route_name='home', renderer='templates/mytemplate.jinja2')
def my_view(request):
    return {'project': 'server'}

@view_config(route_name='users.view', renderer='json')
def get_users(request):
    try:
        user_col = DBSession.query(User).all()
        request.render_schema = UserSchema()
        return user_col
    except:
        return {'return': 'Cant get users'}

@view_config(route_name='users.create', renderer='json')
def create_user(request):
    json_str = request.json_body
    json_encoded = json.dumps(json_str)
    json_decoded = json.loads(json_encoded)
    user = User(**json_decoded)
    DBSession.add(user)
    return {'status': 'Success!'}

@view_config(route_name='users.read', renderer='json')
def read_user(request):
    try:
        qry = DBSession.query(User).filter(User.id==request.matchdict['user_id']).first()
        d = users_to_json(qry)
        request.render_schema = UserSchema()
        return json.dumps(d, default=datetime_conv)
        #return d
    except:
        return {'return': 'No object found'}

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
