"""Viws for registration user and confirm registration user in system"""
from pyramid.view import view_config
from passlib.hash import pbkdf2_sha256
from passlib.totp import generate_secret
from pyramid_mailer.mailer import Mailer
from pyramid_mailer.message import Message
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound
from server.models.user import User
from server.models.user_status import UserStatus
from server.models.role import Role


@view_config(route_name='registration', renderer='json')
def registration_view(request):
    """Registration view

    This function get email and password from json request, check if email
    isn't in db - add email and password into db, set status_id to 'Non_active',
    generate and send url-token to user email."""
    json = request.json_body
    user_query = User.get_one(request, email=request.json_body['email'])
    if user_query is None:
        User.add_user(request, email=request.json['email'],
                      password=pbkdf2_sha256.hash(request.json['password']),
                      url_token=generate_secret(),
                      status_id=UserStatus.get_status_id(request, status="Non_active").id)
        token = User.get_one(request, email=request.json['email'])
        mailer = request.mailer
        message = Message(subject="confirm email",
                          sender="asstelite@gmail.com",
                          recipients=[json['email']],
                          body='http://localhost:6543/users/{}'.format(token.url_token))
        mailer.send(message)
        mailer.send_immediately(message, fail_silently=False)

        return {"msg": "We sent token to your email address"}
    else:
        return {"msg": "Your email address is already taken"}


@view_config(route_name='user')
def confirm_registration_view(request):
    """confirm registration view

    This function get url_token, check if it isn't in db
    return the 404 Error. If url_token is in db, this function
    create url address, change status_id to 'Active', and set role_id to 'user'."""
    user = request.matchdict['user']
    user_status = User.get_one(request, url_token=user)
    if user_status is None:
        return HTTPNotFound()
    else:
        url = 'localhost:6543/users/{}'.format(user)

        user_status.status_id = UserStatus.get_status_id(request, status="Active").id
        user_status.role_id = Role.set_role(request, role="user").id
        return Response('Your email address is confirmed')
