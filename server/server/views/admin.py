from cornice import Service
from cornice.resource import resource, view
from cornice.validators import colander_body_validator
from passlib.hash import pbkdf2_sha256
from pyramid.security import Allow
from ..validation_schema import ProfileSchema

from server.models import model_to_dict
from server.models.user import User

user_status = Service(name='user_status',
                           path='/user-status/',
                           renderer='json',
                           cors_origins=('http://localhost:3000',))



@resource(collection_path='/admin-page', path='/admin-page/{id}',
          renderer='json', cors_origins=('http://localhost:3000',))
class AdminView(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, 'role:admin', 'admin')]

    def collection_get(self):
        users_list = User.get_all(self.request)
        users_dict = []
        for obj in users_list:
            temp_dict = model_to_dict(obj)
            temp_dict['status_str'] = obj.user_statuses.status
            users_dict.append(temp_dict)
        response = {}
        response['users_dict'] = users_dict
        return response

@user_status.post(validators=(colander_body_validator,))
def put(request):
    json = request.json_body
    user = User.get_user_by_nickname(request, request.json['nickname'])
    response = {}

    if user is not None:
        user.status_id = json['status_id']
        return 0
