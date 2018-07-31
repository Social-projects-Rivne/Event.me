import transaction
from pyramid_mailer.mailer import Mailer
from pyramid_mailer.message import Message
from pyramid.view import view_config
from server.models.user_status import UserStatus
from passlib.hash import pbkdf2_sha256
from passlib.totp import generate_secret
from ..models.user import User

@view_config(route_name='recover_password', renderer='json')
def my_view(request):
    jsn = request.json_body
    user = request.dbsession.query(User).filter_by(email=jsn['email']).one_or_none()
    if user.email is not None:
        token = request.dbsession.query(User).filter_by(email=jsn['email']).one_or_none()
        mailer = request.mailer
        message = Message(subject="hello world",
                          sender="eventmerv@gmail.com",
                          recipients=[jsn["email"]],
                          body='http://localhost:6543/change_password/')
        mailer.send(message)
        mailer.send_immediately(message, fail_silently=False)

    return "olala"

@view_config(route_name='change_password', renderer='json')
def my_view(request):
    jsn = request.json_body
    user = request.dbsession.query(User).filter_by(email=jsn['email']).one_or_none()
    password = request.dbsession.query(User).filter_by(password=jsn['password']).one_or_none()
    if user.email is not None:
        user = request.dbsession.query(User).filter_by(email=jsn['email']).update(dict(password=jsn['password']))

    return {'status': 'OK'}
