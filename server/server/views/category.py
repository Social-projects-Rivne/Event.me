"""View for adding new event to db"""
from cornice.resource import resource, view
from pyramid.security import Allow, Authenticated

from ..models import model_to_dict
from ..models.category import Category


@resource(collection_path='/category', path='/category/{category_id}',
          renderer='json', cors_origins=('http://localhost:3000',))
class CategoryView(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Authenticated, 'get')]

    @view(permission='get')
    def collection_get(self):
        request = self.request
        response = {
            'categories': None
        }
        categories = Category.get_all(request)
        response['categories'] = [obj.category for obj in categories]
        return response
