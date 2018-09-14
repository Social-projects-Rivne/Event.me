from cornice.resource import resource, view
from pyramid.security import Allow

from server.models import model_to_dict
from server.models.user import User
from server.models.user_status import UserStatus
from server.models.role import Role


@resource(collection_path='/admin-page/users', path='/admin-page/users/{id}',
          renderer='json', cors_origins=('http://localhost:3000',))
class AdminView(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, 'role:admin', 'admin')]

    @view(permission="admin")
    def collection_get(self):
        users_list = User.get_all(self.request)
        roles_list = Role.get_all(self.request)
        statuses_list = UserStatus.get_all(self.request)
        non_active_status_id_dict = UserStatus\
            .get_id_by_status(self.request, 'Non_active')
        users_dict = []
        roles_dict = []
        statuses_dict = []
        users_dict = [model_to_dict(obj) for obj in users_list]
        roles_dict = [model_to_dict(obj) for obj in roles_list]
        statuses_dict = [model_to_dict(obj) for obj in statuses_list]
        return {
            'users_dict': users_dict,
            'roles_dict': roles_dict,
            'statuses_dict': statuses_dict,
            'non_active_status_id': non_active_status_id_dict
        }

    @view(permission="admin")
    def put(self):
        request = self.request
        json = request.json_body
        user = User.get_one(request, id=request.matchdict['id'])
        if user is not None:
            if 'role_id' in json:
                user.role_id = json['role_id']
                return {'role_id': json['role_id']}
            if 'status_id' in json:
                user.status_id = json['status_id']
                return {'status_id': json['status_id']}
