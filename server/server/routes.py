def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('log_in', '/log-in')
    config.add_route('log_out', '/log-out')
    config.add_route('registration', '/registration')
    config.add_route('user', 'registration/{user}')
