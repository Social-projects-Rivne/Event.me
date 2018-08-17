from pyramid.view import forbidden_view_config
from pyramid.httpexceptions import HTTPForbidden


@forbidden_view_config(renderer="json")
def forbidden(request):
    return HTTPForbidden()
