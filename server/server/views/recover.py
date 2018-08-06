import random
import transaction
from cornice import Service
from passlib.totp import generate_secret
from pyramid_mailer.mailer import Mailer
from pyramid_mailer.message import Message
from passlib.hash import pbkdf2_sha256
from passlib.hash import oracle10
from server.models.user_status import UserStatus
from pyramid.view import view_config

from ..models.user import User


recover_password = Service(name='recover_password', path='/recover-password')
change_password = Service(name='change_password', path='/change-password/{change_password_hash}')


@recover_password.post()
def recover_send_mail(request):
    global temporary_password, json
    random_charset = "abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    temporary_password = "".join(random.sample(random_charset,8 ))
    json = request.json_body
    user = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
    password_mail_hash = oracle10.hash(temporary_password, user=json['email'])
    if user.email is not None:
        token = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
        mailer = request.mailer
        message = Message(subject="Recover password",
                          sender="eventmerv@gmail.com",
                          recipients=[json["email"]],
                          body='temporary password:' + temporary_password + '\n' + request.route_url('change_password',
                                                                                             change_password_hash=password_mail_hash))
        mailer.send_immediately(message, fail_silently=False)

    return {
        'msg': "We send link for change password in your mail "+ json['email'],
        'success': True
    }


@change_password.post()
def recover_change_password(request):
    user_change_password = request.matchdict['change_password_hash']
    user = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
    temporary_mail_password = request.dbsession.query(User).filter_by(password=json['password']).one_or_none()
    password = request.dbsession.query(User).filter_by(password=json['password']).one_or_none()

    if ((user.email is not None) & (temporary_password==request.json_body['temporary_password'] )):
        user = request.dbsession.query(User).filter_by(email=json['email']).update(dict(password=pbkdf2_sha256.hash(json['password'])))

    return {'status': 'OK'}
