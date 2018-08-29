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
    {"category": "Holiday"},
    {"category": "Concert"},
    {"category": "Movie"},
    {"category": "Voluntary"},
    {"category": "Other"}
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
        "role_id": 2
    },
    {
        "email": "drizztemail@gmail.com",
        "nickname": "Ranger",
        "password": pbkdf2_sha256.hash("icewindDale"),
        "location": "Menzoberranzan",
        "first_name": "Drizzt",
        "last_name": "Do Urden",
        "status_id": 2,
        "banned_to_date": "2018-09-01 00:00:00",
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
        "long": 50.604884,
        "lat": 26.277647,
        "description": ("Oleh Vynnyk performed live on stage at 1,684 shows "
                        "and concerts during his career. Beginning with his "
                        "first Memphis show in 1954 to the last concert in "
                        "Indianapolis on June 26, 1977, it is estimated that "
                        "over 12 million people have seen Oleh Vynnyk’s "
                        "performances live. According to all known written "
                        "accounts and records kept, Oleh Vynnyk performed in "
                        "243 different communities, towns and cities in North "
                        "America during his lifetime. Officially he recorded "
                        "700 songs for Sun Records, RCA, movies and "
                        "television shows. If the rehearsals, private "
                        "sessions, live shows and alternate takes are "
                        "included the total adds up to at least 990 songs."),
        "start_date": "2018-08-28 20:00:00",
        "end_date": "2018-08-28 23:00:00",
        "author_name": "oleksandttarar",
        "main_image": ("https://img.tsn.ua/cached/1533907428/"
                       "tsn-5c161a41b1f154cd63aedacab6e94568/thumbs/"
                       "1340x530/58/25/"
                       "e98d5f0ecaec8c751b385b67df022558.jpeg"),
        "author_id": 1,
        "category_id": 2,
    },
    {
        "name": "Dark Elf Adventure",
        "long": 51.619900,
        "lat": 27.251617,
        "description": "Drizzt long adventure",
        "start_date": "2018-09-01 00:00:00",
        "end_date": "2018-09-05 00:00:00",
        "author_name": "Ranger",
        "author_id": 3,
        "main_image": None,
        "category_id": 3,
    },
    {
        "name": "Salsa Club Rivne - dance bachata",
        "long": 50.619900,
        "lat": 26.251617,
        "description": ("Танцювальні заняття будуть проводити двічі на "
                        "тиждень. Учасникам групи обов'язково потрібно мати з "
                        "собою змінне взуття. Організатори запевняють, що "
                        "такі заняття – це можливість вивчити сучасний "
                        "напрямок танцю в парі та порухатися під музику "
                        "міксованих бачата-версій сучасних треків."),
        "start_date": "2018-09-04 11:00:00",
        "end_date": "2018-09-04 18:00:00",
        "author_name": "oleksandttarar",
        "author_id": 1,
        "main_image": None,
        "category_id": 1,
    },
    {
        "name": "Dig potatoes",
        "long": 50.60122,
        "lat": 26.299617,
        "description": "If you want more potatoes, please help me and cats.",
        "start_date": "2018-08-30 17:30:00",
        "end_date": "2018-08-30 20:00:00",
        "author_name": "RingDestroyer",
        "main_image": "https://r.hswstatic.com/w_907/gif/tesla-cat.jpg",
        "author_id": 2,
        "category_id": 4,
    },
    {
        "name": "Alpha Film",
        "long": 50.619972,
        "lat": 26.250842,
        "description": ("20 000 років тому Земля була холодним і незатишним "
                        "місцем, в якому смерть підстерігала людину на кожному"
                        " кроці, а життя залежало від того, чи вдалося "
                        "загнати злобич чи ні. Молодий мисливець з племені, "
                        "яке за рівнем життя і культури було одним з "
                        "найрозвиненіших на планеті, виявляється один на один "
                        "з ворожим світом, повним смертельних небезпек. Йому "
                        "належить заглянути в обличчя своїм страхам і знайти "
                        "дорогу додому. І можливо, від результату його "
                        "подорожі залежить доля всього людства."),
        "start_date": "2018-08-29 10:20:00",
        "end_date": "2018-08-29 21:40:00",
        "author_name": "oleksandttarar",
        "main_image": ("http://www.thebluediamondgallery.com/"
                       "handwriting/images/film.jpg"),
        "author_id": 1,
        "category_id": 3,
    },
    {
        "name": "Rock MOZART LE CONCERT",
        "long": 50.6179686,
        "lat": 26.2544057,
        "description": ("Світова прем’єра MOZART L'Opera Rock відбулась у "
                        "вересні 2009 року у Парижі. Іронічна Франція миттю "
                        "схилила голову перед революційною, практично "
                        "скандальною постановкою, ідея якої спочатку взагалі "
                        "здавалася авантюрою – розказати про життя Моцарта у "
                        "стилі рок. Однак, неможливе виявилося не тільки "
                        "можливим, а ще й успішним! MOZART L'Opera Rock "
                        "відвідали мільйони глядачів, вона стала першим "
                        "мюзиклом, знятим у форматі 3D, і отримала "
                        "«діамантовий» статус за більш ніж 800 тисяч проданих "
                        "копій альбому. Пориньте у чари прекрасної музики й "
                        "першокласної сценічної гри вже 15 грудня о 19:00 у "
                        "Міському будинку культури на Rock MOZART LE CONCERT!"
                        "У цей вечір розповідь про життя Моцарта перетвориться"
                        " на шалений рок-концерт із 24 рок-хітів про силу "
                        "пристрасті і справжній талант. Не пропустіть цю "
                        "яскраву можливість…"),
        "start_date": "2018-12-15 19:00:00",
        "end_date": None,
        "author_name": "oleksandttarar",
        "main_image": ("https://c1.staticflickr.com/3/2587"
                       "/3951218552_e8bbab7d23_b.jpg"),
        "author_id": 1,
        "category_id": 2,
    },
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
    {"event_id": 1, "status_id": 3,
     "date": "2018-08-27", "comment": "Moderator approved your event"},
    {"event_id": 1, "status_id": 5,
     "date": "2018-08-27 00:01:00",
     "comment": "Moderator add your event to hot events"},
    {"event_id": 3, "status_id": 3,
     "date": "2018-08-21", "comment": "Moderator approved your event"},
    {"event_id": 3, "status_id": 2,
     "date": "2018-08-25", "comment": "Your event closed by time"},
    {"event_id": 2, "status_id": 3,
     "date": "2018-08-27", "comment": "Moderator approved your event"},
    {"event_id": 4, "status_id": 3,
     "date": "2018-08-27", "comment": "Moderator approved your event"},
    {"event_id": 5, "status_id": 3,
     "date": "2018-08-24", "comment": "Moderator approved your event"},
    {"event_id": 6, "status_id": 3,
     "date": "2018-08-24", "comment": "Moderator approved your event"},
    {"event_id": 5, "status_id": 5,
     "date": "2018-08-25",
     "comment": "Moderator add your event to hot events"},
    {"event_id": 6, "status_id": 5,
     "date": "2018-08-25",
     "comment": "Moderator add your event to hot events"},
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
