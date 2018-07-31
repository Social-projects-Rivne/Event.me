"""Views for log-in and log-out system"""
from passlib.totp import generate_secret
from pyramid.view import view_config

from ..models.token import Token
from ..models.user import User

@view_config(route_name='log_in', renderer='json')
def log_in(request):
    """Log-in view

    This function get email and password from json request, check if they
    are valid, generate token for user and return it."""
    response = {
        'msg': "",
        'success': False
    }
    user = User.get_one(request, email=request.json_body['email'])

    if user is not None and user.check_password(request.json_body['password']):
        if user.is_active(request):
            key = generate_secret()
            response['token'] = key
            Token.add_token(request, key, user.id)
            response['success'] = True
            return response
        else:
            response['msg'] = "Your account is not active"
            return response
    response['msg'] = "Invalid password or email"
    return response


@view_config(route_name='log_out', renderer='json')
def log_out(request):
    """Log-in view

    This function get token from request header, check if this
    token exist and delete it from db."""
    response = {
        'msg': "",
        'success': False
    }
    if 'Authorization' in request.headers:
        if Token.deactivate(request,
                            request.headers['Authorization'].split(' ')[1]):
            response['success'] = True
    else:
        response['msg'] = "You are not logged in"
    return response
