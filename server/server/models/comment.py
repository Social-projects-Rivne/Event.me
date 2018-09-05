class Comment:
    @staticmethod
    def get_for_event(request, event_id):
        obj = request.mongo.comments.find_one({
            'event_id': event_id
        })
        if obj is None:
            return {'comments': []}
        return obj['comments']

    @staticmethod
    def add_comment(request, event_id, author_id, author_nickname, comment_msg,
                    timestamp, father_comment_id):
        new_comment = {
            'author_id': author_id,
            'author_nickname': author_nickname,
            'timestamp': timestamp,
            'comment': comment_msg,
            'child': []
        }
        if father_comment_id is None:
            if request.mongo.comments.find_one({'event_id': event_id}):
                request.mongo.comments.update_one(
                    {'event_id': event_id},
                    {'$push': {'comments': new_comment}}
                )
            else:
                request.mongo.comments.insert_one({
                    'event_id': event_id,
                    'comments': [new_comment]
                })
        else:
            request.mongo.comments.update_one(
                {'event_id': event_id},
                {
                    '$push': {parse_comment_id(father_comment_id): new_comment}
                }
            )

    @staticmethod
    def delete_comment(request, event_id, comment_id, user_id):
        path = parse_comment_id(comment_id)[:-6]
        request.mongo.comments.update_one(
            {
                'event_id': event_id,
                path + ".author_id": user_id
            },
            {'$set': {path + ".comment": "<Comment deleted>"}}
        )


def parse_comment_id(comment_id):
    """Parse comment_id and return path in db

    Get comment id and return path string (e. g. 'comments.5.child.2.child')
    Arguments:
    comment_id -- comment object id (e. g. '5.2')
    """
    arrayIndexes = comment_id.split('.')
    path_str = 'comments'
    for index in arrayIndexes:
        path_str = path_str + "." + index + ".child"
    return path_str
