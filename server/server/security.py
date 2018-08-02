from pyramid.request import Request
from pyramid.request import Response


def includeme(config):
    settings = config.get_settings()
    def request_factory(environ):
        request = Request(environ)
        request.response = Response()
        request.response.headerlist = []
        request.response.headerlist.extend(
            (
                ('Access-Control-Allow-Origin', settings['client.url']),
                ('Content-Type', 'application/json')
            )
        )
        return request
    config.set_request_factory(request_factory)
