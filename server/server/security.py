from pyramid.authentication import CallbackAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.security import (
    Authenticated,
    Everyone,
)
from pyramid.interfaces import IAuthenticationPolicy

from zope.interface import implementer
from .models.user import User
from .models.token import Token

#https://docs.pylonsproject.org/projects/pyramid/en/latest/_modules/pyramid/authentication.html#AuthTktAuthenticationPolicy
@implementer(IAuthenticationPolicy)
class MyAuthenticationPolicy(CallbackAuthenticationPolicy):
    def __init__(self,
                 callback=None,
                 secure=False,
                 include_ip=False,
                 timeout=None,
                 reissue_time=None,
                 max_age=None,
                 path="/",
                 http_only=False,
                 wild_domain=True,
                 debug=False,
                 hashalg='sha512',
                 parent_domain=False,
                 domain=None,
                 ):
        self.callback = callback
        self.debug = debug

    def unauthenticated_userid(self, request):
        """ The userid key within the auth_tkt cookie."""
        userid = Token.get_user_id(request)
        if userid is not None:
            return userid

    def authenticated_userid(self, request):
        user = request.user
        if user is not None:
            return user.id

    def effective_principals(self, request):
        principals = [Everyone]
        user = request.user
        if user is not None:
            principals.append(Authenticated)
            principals.append(str(user.id))
            principals.append('role:' + user.get_role(request))
        return principals


def get_user(request):
    user_id = request.unauthenticated_userid
    if user_id is not None:
        user = request.dbsession.query(User).get(user_id)
        return user

def includeme(config):
    authn_policy = MyAuthenticationPolicy(hashalg='sha512')
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(ACLAuthorizationPolicy())
    config.add_request_method(get_user, 'user', reify=True)