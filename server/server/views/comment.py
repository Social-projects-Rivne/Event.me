"""View for adding new event to db"""
from cornice.resource import resource, view
from cornice.validators import colander_body_validator
from pyramid.security import Allow, Authenticated

from ..models import model_to_dict
from ..models.comment import Comment
from ..validation_schema import CommentSchema


@resource(collection_path='/comment', path='/comment/{event_id}',
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

    @view(schema=CommentSchema(), validators=(colander_body_validator,),
          permission='post')
    def post(self):
        request = self.request
        data = request.validated
        Comment.add_comment(request,
                            request.matchdict['event_id'],
                            request.user.id,
                            request.user.nickname,
                            data['comment'],
                            data['parent_comment_id']
                            )
        return {'success': True}

    @view(permission='post')
    def delete(self):
        request = self.request
        Comment.delete_comment(request,
                               request.matchdict['event_id'],
                               request.json_body['comment_id'],
                               request.user.id)
        return {'success': True}
