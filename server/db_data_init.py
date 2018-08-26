# -*- coding: utf-8 -*-
from passlib.hash import pbkdf2_sha256
from sqlalchemy import create_engine
from sqlalchemy.sql.expression import insert

from server.models import (Base, user, user_status, tag, token, event,
                           event_history, event_status, event_tag, category,
                           subscribe, feedback, gallery, role)


engine = create_engine('postgresql://admin:1@localhost:5555/eventme',
                       echo=True)
Base.metadata.create_all(bind=engine)

role_data = [
    {"role": "admin"},
    {"role": "user"},
    {"role": "moderator"}
]
tag_data = [
    {"tag": "concert"},
    {"tag": "vynnyk"},
    {"tag": "fans"},
    {"tag": "love"},
    {"tag": "gore"},
    {"tag": "metal"},
    {"tag": "violence"}
]
category_data = [
    {"category": "holiday"},
    {"category": "concert"},
    {"category": "movie"},
    {"category": "Voluntary"},
]
user_status_data = [
    {"status": "Active"},
    {"status": "Banned"},
    {"status": "Delete"},
    {"status": "Non_active"}
]
event_status_data = [
    {"status": "New"},
    {"status": "Close"},
    {"status": "Approved"},
    {"status": "Disapproved"},
    {"status": "Hot"}
]
user_data = [
    {
        "email": "sashaemail@gmail.com",
        "nickname": "oleksandttarar",
        "password": pbkdf2_sha256.hash("passwd"),
        "location": "Rivne",
        "first_name": "Oleksandr",
        "last_name": "Tarar",
        "status_id": 1,
        "role_id": 2
    },
    {
        "email": "frodoemail@gmail.com",
        "nickname": "RingDestroyer",
        "password": pbkdf2_sha256.hash("iloveSam"),
        "location": "Shire",
        "first_name": "Frodo",
        "last_name": "Baggins",
        "status_id": 1,
        "role_id": 3
    },
    {
        "email": "drizztemail@gmail.com",
        "nickname": "Ranger",
        "password": pbkdf2_sha256.hash("icewindDale"),
        "location": "Menzoberranzan",
        "first_name": "Drizzt",
        "last_name": "Do Urden",
        "status_id": 2,
        "role_id": 2
    },
    {
        "email": "jonemail@gmail.com",
        "nickname": "KnowNothing",
        "password": pbkdf2_sha256.hash("Ygritte"),
        "location": "Wall",
        "first_name": "Aegon",
        "last_name": "Targaryen",
        "status_id": 1,
        "role_id": 1
    },
    {
        "email": "geraltemail@gmail.com",
        "nickname": "WhiteWolf",
        "password": pbkdf2_sha256.hash("Merigold"),
        "location": "Kaer Morhen",
        "first_name": "Geralt",
        "last_name": "of Rivia",
        "status_id": 4,
        "role_id": 2
    }
]
event_data = [
    {
        "name": "Oleh Vynnyk Rivne Show",
        "long": 50.619900,
        "lat": 26.251617,
        "description": "Oleh Vynnyk performed live on stage at 1,684 shows and\
        concerts during his career. Beginning with his first Memphis show in\
        1954 to the last concert in Indianapolis on June 26, 1977, it is\
        estimated that over 12 million people have seen Oleh Vynnyk’s\
        performances live. According to all known written accounts and records\
        kept, Oleh Vynnyk performed in 243 different communities, towns and\
        cities in North America during his lifetime. Officially he recorded\
        700 songs for Sun Records, RCA, movies and television shows. If the\
        rehearsals, private sessions, live shows and alternate takes are\
        included the total adds up to at least 990 songs.",
        "start_date": "2017-12-21 20:00:00",
        "end_date": "2017-12-21 23:00:00",
        "author_name": "Concerts Rivne",
        "main_image": "https://img.tsn.ua/cached/1533907428/tsn-5c161a41b1f154cd63aedacab6e94568/thumbs/1340x530/58/25/e98d5f0ecaec8c751b385b67df022558.jpeg",
        "author_id": 4,
        "category_id": 2,
        "status_id": 3
    },
    {
        "name": "Dark Elf Adventure",
        "long": 51.619900,
        "lat": 27.251617,
        "description": "Drizzt long adventure",
        "start_date": "2019-11-01",
        "end_date": "2019-11-05",
        "author_name": "Drizzt",
        "main_image": "drizztcoolposter",
        "author_id": 3,
        "category_id": 3,
        "status_id": 3
    },
    {
        "name": "Independent day",
        "long": 38.907192,
        "lat": -77.036871,
        "description": "Beer, burgers, rock n roll",
        "start_date": "2018-07-04",
        "end_date": "2018-07-05",
        "author_name": "Oleksandr",
        "main_image": "someposter",
        "author_id": 1,
        "category_id": 1,
        "status_id": 3
    },
    {
        "name": "Dig potatoes",
        "long": 50.60122,
        "lat": 26.299617,
        "description": "If you want more potatoes, please help me and cats.",
        "start_date": "2018-08-30 17:30:00",
        "end_date": "2018-08-30 20:00:00",
        "author_name": "Oleksandr",
        "main_image": "https://r.hswstatic.com/w_907/gif/tesla-cat.jpg",
        "author_id": 1,
        "category_id": 4,
        "status_id": 3
    }
]
event_tag_data = [
    {"event_id": 1, "tag_id": 1},
    {"event_id": 1, "tag_id": 2},
    {"event_id": 1, "tag_id": 7},
    {"event_id": 2, "tag_id": 3},
    {"event_id": 2, "tag_id": 5},
    {"event_id": 3, "tag_id": 4},
    {"event_id": 2, "tag_id": 5}
]
event_history_data = [
    {"event_id": 1, "status_id": 2,
     "date": "2017-12-21", "comment": "omg vynnyk best"},
    {"event_id": 3, "status_id": 2,
     "date": "2018-07-05", "comment": "wow was fun"},
    {"event_id": 2, "status_id": 3,
     "date": "2019-11-01", "comment": "coming soon"}
]
gallery_data = [
    {"img_url": "somevynnykurl", "event_id": 1},
    {"img_url": "somedrizzturl", "event_id": 2},
    {"img_url": "someindependenturl", "event_id": 3}
]
feedback_data = [
    {
        "user_id": 2,
        "event_id": 3,
        "feedback": "where was i",
        "date": "2018-07-06",
        "is_deleted": False
    },
    {
        "user_id": 4,
        "event_id": 1,
        "feedback": "VYNNYK NUMBER 1!",
        "date": "2017-12-21",
        "is_deleted": True
    },
    {
        "user_id": 1,
        "event_id": 2,
        "feedback": "Drizzt or better Dzirt",
        "date": "2018-07-01",
        "is_deleted": False}
]
subscribe_data = [
    {"user_id": 4, "event_id": 1, "is_favorite": False},
    {"user_id": 2, "event_id": 2, "is_favorite": True},
    {"user_id": 5, "event_id": 2, "is_favorite": True}
]

data = [
    (role.Role, role_data),
    (tag.Tag, tag_data),
    (category.Category, category_data),
    (user_status.UserStatus, user_status_data),
    (event_status.EventStatus, event_status_data),
    (user.User, user_data),
    (event.Event, event_data),
    (event_tag.EventTag, event_tag_data),
    (event_history.EventHistory, event_history_data),
    (gallery.Gallery, gallery_data),
    (feedback.Feedback, feedback_data),
    (subscribe.Subscribe, subscribe_data)
]

conn = engine.connect()

for model_class, model_data in data:
    conn.execute(model_class.__table__.insert(), model_data)
