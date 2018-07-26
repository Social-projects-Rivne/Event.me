from passlib.totp import generate_secret
from pyramid.view import view_config
from ..models.user import User
from ..models.token import Token


@view_config(route_name='log_in', renderer='json')
def log_in(request):
    response = {
        'msg': "",
        'success': False
    }
    user = User.get_one(request, nickname=request.json_body['login'])
    if(user is not None and user.check_password(request.json_body['password'])):
        key = generate_secret()
        response['token'] = key
        Token.add_token(request, key, user.id)
        response['success'] = True
        return response
    response['msg'] = "Invalid password or email"
    return response


@view_config(route_name='log_out', renderer='json')
def log_out(request):
    response = {
        'msg': "",
        'success': False
    }
    if(Token.deactivate(request, request.json_body['token'])):
        response['success'] = True
    return response
