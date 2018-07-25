from pyramid.httpexceptions import HTTPOk
from pyramid.view import view_config, view_defaults

from .models import users, Base, DBSession, MetaData

@view_config(route_name='home', renderer='templates/mytemplate.jinja2')
def my_view(request):
    return {'project': 'server'}

class BaseView(object):
    item_cls = None  # Override this in child views
    schema_cls = None  # Override this in child views

    def __init__(self, request):
        self.request = request
        # Don't load a single item for the collection route
        if request.matched_route.name == self.item_route:
            item_id = int(request.matchdict['id'])
            item = DBSession.query(self.item_cls).get(item_id)
            self.item = item

    def create_item(self):
        data = self.schema_cls().deserialize(self.request.json_body)
        item = self.item_cls(**data)
        DBSession.add(item)
        DBSession.flush()
        return item

    def list_items(self):
        return DBSession.query(self.item_cls).all()

    def read_item(self):
        return self.item

    def update_item(self):
        data = self.schema_cls().deserialize(self.request.json_body)
        for key, value in data.items():
            setattr(self.item, key, value)
        return self.item

    def delete_item(self):
        DBSession.delete(self.item)
        return HTTPOk()

    @view_config(request_method='GET')
    def read_item(self):
        return self.item

    @view_config(request_method='PUT')
    def update_item(self):
        data = self.schema_cls().deserialize(self.request.json_body)
        for key, value in data.items():
            setattr(self.item, key, value)
        return self.item

@view_defaults(route_name='profiles_col', renderer='json')
class ProfView(BaseView):
    item_cls = users
    schema_cls = MetaData
