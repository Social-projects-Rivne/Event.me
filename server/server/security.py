"""Implement authentication and authorization policy"""
from passlib.totp import generate_secret
from pyramid.authentication import CallbackAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.interfaces import IAuthenticationPolicy
from pyramid.security import Authenticated, Everyone
from zope.interface import implementer

from .models.user import User
from .models.token import Token


@implementer(IAuthenticationPolicy)
class MyAuthenticationPolicy(CallbackAuthenticationPolicy):

    def unauthenticated_userid(self, request):
        """Returns user's id by token"""
        token_obj = Token.get_token_obj(request,
                                        get_token_from_header(request))
        if token_obj is not None:
            token_obj.update_expiration_date()
            return token_obj.user_id

    def authenticated_userid(self, request):
        """Get authenticated user id from user object in request object"""
        user = request.user
        if user is not None:
            return user.id

    def effective_principals(self, request):
        """Return principals for authenticated user"""
        principals = [Everyone]
        user = request.user
        if user is not None:
            principals.append(Authenticated)
            principals.append(str(user.id))
            principals.append('role:' + user.get_role())
        return principals

    def remember(self, request, userid, **kw):
        """Generate random authorization token, save it into db and return"""
        key = generate_secret()
        Token.add_token(request, key, userid)
        return key

    def forget(self, request):
        """Delete token from db if it exist"""
        token_obj = Token.get_token_obj(request,
                                        get_token_from_header(request))
        return token_obj.deactivate(request)


def get_token_from_header(request):
    """Extract authorization token from header if it exist"""
    if 'Authorization' in request.headers:
        auth_header = request.headers['Authorization'].split(' ')
        if len(auth_header) == 2:
            return auth_header[1]
        return None


def get_user(request):
    """Get user object by unauthenticated user id"""
    user_id = request.unauthenticated_userid
    if user_id is not None:
        user = request.dbsession.query(User).get(user_id)
        return user


def includeme(config):
    authn_policy = MyAuthenticationPolicy()
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(ACLAuthorizationPolicy())
    config.add_request_method(get_user, 'user', reify=True)
