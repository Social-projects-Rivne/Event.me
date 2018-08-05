"""Views for log-in and log-out system"""
from pyramid.security import remember, forget
from cornice import Service
from pyramid.security import Allow, Everyone, Authenticated

from ..models.token import Token
from ..models.user import User


log_in = Service(name='log_in', path='/log-in',
                 cors_origins=('http://localhost:3000',))
log_out = Service(name='log_out', path='/log-out',
                  cors_origins=('http://localhost:3000',))


@log_in.get()
def log_in_get(request):
        return {
            "msg": "Get log in page",
            'success': True
            }


@log_in.post()
def log_in_post(request):
    """Log-in view

    This function get email and password from json request, check if they
    are valid, generate token for user and return it."""
    response = {
        'msg': "",
        'success': False
    }
    user = User.get_one(request, email=request.json_body['email'])

    if (user is not None and
            user.check_password(request.json_body['password'])):
        if user.is_active(request):
            key = remember(request, user.id)
            response['token'] = key
            response['success'] = True
            return response
        else:
            response['msg'] = "Your account is not active"
            return response
    response['msg'] = "Invalid password or email"
    return response


@log_out.post()
def log_out_post(request):
    """Log-in view

    This function get token from request header, check if this
    token exist and delete it from db."""
    response = {
        'msg': "",
        'success': False
    }
    response['success'] = forget(request)
    if not response['success']:
        response['msg'] = "You are not logged in"
    return response
