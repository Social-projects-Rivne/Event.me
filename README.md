# Docker #

Open your favorite Terminal and run these commands.

First you need to change your dir:
```sh
$ cd Event.me
```

Next step you to start your docker:
```sh
$ docker-compose up
```

This will up containers.
Verify the deployment by navigating to server address in your preferred browser.

Pyramid:
```sh
localhost:6543
```

Adminer:
```sh
localhost:9000
```

Client:
```sh
localhost:3000
```

# Init tables & data in db#

Change your work dir to **server**
```sh
cd way/to/project/server/
```

To create tables and push test data open your Terminal and run
```sh
python db_data_init.py
```

That's all.

Also, tables will be created every time a server is launched.
