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

### mailer ###

- Change directory into Event.me/server.

- Open file development.ini.

- Find in file lines.
    
    mail.username  
    
  and

    mail.password 

- Set your email address in mail.username and password in mail.password.

# Migration & Seeding #

### Migration ###

First you need to activate your virtual env, for this open your favorite Terminal and run
```sh
source way/to/your/venv/bin/activate
```

Second change your work dir to **server**
```sh
cd way/to/project/server/
```

When virtual env activated you can use alembic to manage migrations

- Create migration

To create migration open your Terminal and run
```sh
alembic revision --autogenerate -m "Add tables"
```

This will create migration that you can find at **migrations/versions**

(optional) If migration already exist or you just created it and you want push migration with test data
into database go to paragraph **Seeding**

- Push migration

To push migration open your Terminal and run
```sh
alembic upgrade head
```

This will push migration to our database

- Drop migration

To drop migration open your Terminal and run
```sh
alembic downgrade base
```

This will drop migration from our database

### Seeding ###

To push migration with test data open your Terminal and run
```sh
python config.py
```

That's it! Your migration with tests data can be use

