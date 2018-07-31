def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('log_in', '/log-in')
    config.add_route('log_out', '/log-out')
    config.add_route(
        'users.view',
        '/users',
        request_method='GET'
        )
    config.add_route(
        'users.create',
        '/users',
        request_method='POST'
        )
    config.add_route(
        'users.read',
        '/users/{user_id}',
        request_method='GET'
        )
    config.add_route(
        'users.update',
        '/users/{user_id}',
        request_method='PUT'
        )
    config.add_route(
        'users.delete',
        '/users/{user_id}',
        request_method='DELETE'
        )
