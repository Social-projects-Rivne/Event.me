class Comment:
    @staticmethod
    def get_for_event(request, event_id):
        obj = request.mongo.comments.find_one({
            'event_id': event_id
        })
        return list(obj['comments'])

    @staticmethod
    def add_comment(request, event_id, author_id, comment_msg,
                    timestamp, father_comment_id):
        new_comment = {
            'author_id': author_id,
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
