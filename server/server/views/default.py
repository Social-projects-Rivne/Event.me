from pyramid.view import view_config


@view_config(route_name='home', renderer='json')
def my_view(request):
    request.response.headerlist.extend(
        (
            ('Access-Control-Allow-Origin', '*'),
            ('Content-Type', 'application/json')
        )
    )
    return {'status': 'OK'}
