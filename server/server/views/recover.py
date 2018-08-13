from cornice import Service
from passlib.hash import pbkdf2_sha256
from passlib.totp import generate_secret
from pyramid_mailer.message import Message

from ..models.user import User


recover_password = Service(name='recover_password',
                           path='/recover-password',
                           cors_origins=('http://localhost:3000',))
change_password = Service(name='change_password',
                          path='/change-password/{change_password_hash}',
                          cors_origins=('http://localhost:3000',))


@recover_password.post()
def recover_send_mail(request):
    """Recover password view

    This function get email from json request,
    check if email is in db, check if status active,
    generate and send url-token to user email.
    """
    json = request.json_body
    user = request.dbsession.query(User).filter_by(email=json['email']).one_or_none()
    if (user is not None) and user.is_active(request):
        url_token_confirmation = generate_secret()
        user.url_token = url_token_confirmation
        mailer = request.mailer
        message = Message(
            subject="Recover password",
            sender="eventmerv@gmail.com",
            recipients=[json["email"]],
            body='Follow the link below\n' + 'http://localhost:3000/#/change-password/'+url_token_confirmation)
        mailer.send_immediately(message, fail_silently=False)
        return {
            'msg': "We send link for change password in your mail " + json['email'],
            'success': True
        }

    return {
        'msg': "Not existing mail ",
        'success': False
    }


@change_password.post()
def recover_change_password(request):
    """Change on new password view

    This function get email and new password from json request,
    function get url_token, check if it in db.
    Check if this email and token are in db,
    after change password and delete value from url_token.
    """
    json = request.json_body
    change_password_url_token = request.matchdict['change_password_hash']
    user = request.dbsession.query(User).filter_by(url_token=change_password_url_token).one_or_none()
    if user is not None:
        user.password=pbkdf2_sha256.hash(json['password'])
        user.url_token = None
        return {'success': True}
    return {'success': False}
