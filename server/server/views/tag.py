"""View for adding new event to db"""
from cornice.resource import resource, view
from pyramid.security import Allow, Authenticated

from ..models import model_to_dict
from ..models.event_tag import EventTag
from ..models.tag import Tag


@resource(collection_path='/tag', path='/tag/{tag_id}',
          renderer='json', cors_origins=('http://localhost:3000',))
class TagView(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Authenticated, 'get')]

    @view(permission='get')
    def collection_get(self):
        request = self.request
        response = {
            'success': False,
            'tags': None
        }
        tags = Tag.get_all(request)
        response['tags'] = [obj.tag for obj in tags]
        return response
