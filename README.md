### Docker ###

Open your favorite Terminal and run these commands.

First:
```sh
$ cd Event.me
```

Second:
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
======

- Change directory into Event.me/server.

- Open file development.ini.

- Find in file lines.
    
    mail.username  
    
  and

    mail.password 

- Set your email address in mail.username and password in mail.password.

