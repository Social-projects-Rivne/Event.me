import transaction
from passlib.totp import generate_secret
from pyramid_mailer.mailer import Mailer
from pyramid_mailer.message import Message
from passlib.hash import pbkdf2_sha256
from server.models.user_status import UserStatus
from pyramid.view import view_config

from ..models.user import User

@view_config(route_name='recover_password', renderer='json')
def recover_send_mail(request):
    json = request.json_body
    user = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
    if user.email is not None:
        token = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
        mailer = request.mailer
        message = Message(subject="hello world",
                          sender="eventmerv@gmail.com",
                          recipients=[json["email"]],
                          body='http://localhost:6543/change_password/')
        mailer.send(message)
        mailer.send_immediately(message, fail_silently=False)

    return "We send link for change password in your mail", json['email']

@view_config(route_name='change_password', renderer='json')
def recover_change_password(request):
    json = request.json_body
    user = request.dbsession.query(User).filter_by(email=jsn['email']).one_or_none()
    password = request.dbsession.query(User).filter_by(password=json['password']).one_or_none()
    if user.email is not None:
        user = request.dbsession.query(User).filter_by(email=json['email']).update(dict(password=json['password']))

    return {'status': 'OK'}
