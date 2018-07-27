import transaction
from pyramid_mailer.mailer import Mailer
from pyramid_mailer.message import Message
from pyramid.view import view_config

@view_config(route_name='home', renderer='json')
def my_view(request):
    mailer = request.mailer
    message = Message(subject="hello world",
                      sender="eventmerv@gmail.com",
                      recipients=["RayMetHD@gmail.com"],
                      body="hello, arthur")
    mailer.send(message)
    mailer.send_immediately(message, fail_silently=False)
    return {'status': 'OK'}
