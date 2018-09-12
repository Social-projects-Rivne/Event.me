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
        users_dict = []
        roles_dict = []
        for obj in users_list:
            temp_dict = model_to_dict(obj)
            temp_dict['status_str'] = obj.user_statuses.status
            users_dict.append(temp_dict)
        roles_dict = [model_to_dict(obj) for obj in roles_list]
        response = {}
        response['users_dict'] = users_dict
        response['roles_dict'] = roles_dict
        return response

    @view(permission="admin")
    def put(self):
        request = self.request
        json = request.json_body
        user = User.get_one(request, id=request.matchdict['id'])
        if user is not None:
            if 'status_str' in json:
                if json['status_str'] == 'Active':
                    user.status_id = UserStatus.get_id_by_status(request, 'Banned')
                    return {'status': 'Banned'}
                if json['status_str'] == 'Banned':
                    user.status_id = UserStatus.get_id_by_status(request, 'Active')
                    return {'status': 'Active'}
            if 'role_id' in json:
                user.role_id = json['role_id']
                return {'role_id': json['role_id']}
