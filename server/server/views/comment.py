"""View for adding new event to db"""
from cornice.resource import resource, view
from pyramid.security import Allow, Authenticated

from ..models import model_to_dict
from ..models.comment import Comment


@resource(collection_path='/comment', path='/comment/{category_id}',
          renderer='json', cors_origins=('http://localhost:3000',))
class CommentView(object):

    def __init__(self, request, context=None):
        self.request = request
        self.context = context

    def __acl__(self):
        return [(Allow, Authenticated, 'post')]

    def get(self):
        request = self.request
        return {
            'comments': Comment.get_for_event(request,
                                              request.matchdict['event_id'])
        }

    def post(self):
        request = self.request
        # TODO: validation schema for comment
        Comment.add_comment(request, request.matchdict['event_id'])
