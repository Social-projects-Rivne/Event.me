import transaction
from pyramid_mailer.mailer import Mailer
from pyramid_mailer.message import Message
from pyramid.view import view_config
from ..models.user import User

@view_config(route_name='home', renderer='json')
def my_view(request):
    jsn = request.json_body
    user = request.dbsession.query(User).filter_by(email=jsn['email']).one_or_none()
    if user.email is not None:
        mailer = request.mailer
        message = Message(subject="hello world",
                          sender="eventmerv@gmail.com",
                          recipients=[jsn["email"]],
                          body="hello, arthur")
        mailer.send(message)
        mailer.send_immediately(message, fail_silently=False)

    return "olala"