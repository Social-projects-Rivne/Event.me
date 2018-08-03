import random, string
import transaction
from cornice.resource import resource, view
from passlib.totp import generate_secret
from pyramid_mailer.mailer import Mailer
from pyramid_mailer.message import Message
from passlib.hash import pbkdf2_sha256
from server.models.user_status import UserStatus
from pyramid.view import view_config

from ..models.user import User


@view_config(route_name='recover_password', renderer='json')
#def password_generator(size=8, chars=string.ascii_letters + string.digits):
    #return ''.join(random.choice(chars) for i in range(size))

def recover_send_mail(request):
    global temporary_password
    random_charset = "abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    temporary_password = "".join(random.sample(random_charset,8 ))
    json = request.json_body
    user = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
    if user.email is not None:
        token = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
        mailer = request.mailer
        message = Message(subject="Recover password",
                          sender="eventmerv@gmail.com",
                          recipients=[json["email"]],
                          body='temporary password:'+ temporary_password +' http://localhost:6543/change_password/')
        mailer.send(message)
        mailer.send_immediately(message, fail_silently=False)

    return "We send link for change password in your mail", json['email']

@resource(path='change_password', renderer='json')
class Change_Password(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

@view_config(route_name='change_password', renderer='json')
def recover_change_password(request):
    json = request.json_body
    user = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
    password = request.dbsession.query(User).filter_by(password=json['password']).one_or_none()
    if user.email is not None:
        user = request.dbsession.query(User).filter_by(email=json['email']).update(dict(password=pbkdf2_sha256.hash(json['password'])))

    return {'status': 'OK'}
