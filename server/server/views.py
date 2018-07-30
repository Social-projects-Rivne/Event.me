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
    try:
        user = User(email='email9', nickname='nick9', password='pass4', create_date=None, location='loc4', first_name='f_name4', last_name='l_name4', status_id=None, role_id=None, avatar='avatar4')
        DBSession.add(user)
        transaction.commit()
        request.render_schema = UserSchema()
        return json.dumps(user, cls=AlchemyEncoder)
    except:
        return {'return': 'Could not create user'}
@view_config(route_name='users.read', renderer='json')
def read_user(request):
    try:
        qry = DBSession.query(User).filter(User.id==request.matchdict['user_id']).first()
        request.render_schema = UserSchema()
        d = users_to_json(qry)
        return json.dumps(d, default=datetime_conv)
    except:
        return {'return': 'No object found'}

@view_config(route_name='users.update', renderer='json')
def update_user(request):
    try:
        qry = DBSession.query(User).get(request.matchdict['user_id'])
        qry.nickname = 'CHANGED'
        transaction.commit()
        request.render_schema = UserSchema()
        d = users_to_json(qry)
        return json.dumps(d, default=AlchemyEncoder)
    except:
        return {'return': 'No object found'}

@view_config(route_name='users.delete', renderer='json')
def delete_user(request):
    try:
        qry = DBSession.query(User).get(request.matchdict['user_id'])
        DBSession.delete(qry)
        transaction.commit()
        request.render_schema = UserSchema()
        d = users_to_json(qry)
        return {'return': 'Success!'}
    except:
        return {'return': 'Could not delete user'}
