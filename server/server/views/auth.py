"""Views for log-in and log-out system"""
from pyramid.security import remember, forget
from cornice.resource import resource, view
from pyramid.security import Allow, Everyone, Authenticated

from ..models.token import Token
from ..models.user import User


@resource(path='/log-in', renderer='json')
class LogIn(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Everyone, 'everything')]

    @view(permission='everything')
    def get(self):
        return {
            "msg": "Get log in page",
            'success': True
            }

    def post(self):
        """Log-in view

        This function get email and password from json request, check if they
        are valid, generate token for user and return it."""
        request = self.request
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


@resource(path='/log-out', renderer='json')
class LogOut(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Authenticated, 'out')]

    @view(permission='out')
    def post(self):
        """Log-in view

        This function get token from request header, check if this
        token exist and delete it from db."""
        request = self.request
        response = {
            'msg': "",
            'success': False
        }
        response['success'] = forget(request)
        if not response['success']:
            response['msg'] = "You are not logged in"
        return response
