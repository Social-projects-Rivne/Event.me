from passlib.totp import generate_secret
from pyramid.view import view_config
from ..models.user import User


@view_config(route_name='log_in', renderer='json')
def log_in(request):
    response = {
        'msg': "",
        'success': False
        }
    user = User.get_one(request, nickname=request.json_body['login'])
    if(user is not None and user.check_password(request.json_body['password'])):
        response['token'] = generate_secret()
        response['success'] = True
        return response
    response['msg'] = "Invalid password or email"
    return response
