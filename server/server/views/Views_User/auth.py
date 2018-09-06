"""Views for log-in and log-out system"""
from cornice import Service
from cornice.validators import colander_body_validator
from pyramid.security import remember, forget

from ...models.token import Token
from ...models.user import User
from ...validation_schema import LogInSchema


log_in = Service(name='log_in', path='/log-in',
                 cors_origins=('http://localhost:3000',))
log_out = Service(name='log_out', path='/log-out',
                  cors_origins=('http://localhost:3000',))


@log_in.post(schema=LogInSchema(), validators=(colander_body_validator,))
def log_in_post(request):
    """Log-in view

    This function get email and password from json request, check if they
    are valid, generate token for user and return it."""
    response = {
        'msg': "",
        'success': False,
        'user': {}
    }
    user = User.get_one(request, email=request.validated['email'])

    if (user is not None and
            user.check_password(request.validated['password'])):
        if user.is_active(request):
            key = remember(request, user.id)
            response['token'] = key
            response['success'] = True
            response['user'] = {
                'nickname': user.nickname,
                'avatar': user.avatar,
                'user_id': user.id
            }
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
