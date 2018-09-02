class Comment:
    @staticmethod
    def get_for_event(request, event_id):
        comments = request.mongo.comments.find({
            'event_id': request.matchdict['category_id']
            })
        return [comment for comment in comments]

    @staticmethod
    def add_comment(request, event_id):
        pass
