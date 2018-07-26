from passlib.hash import pbkdf2_sha256
from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"email": "sashaemail@gmail.com", "nickname": "oleksandttarar", "password": pbkdf2_sha256.hash("passwd"),
             "location": "Rivne", "first_name": "Oleksandr", "last_name": "Tarar", "status_id": 1,
             "role_id": 2},
            {"email": "frodoemail@gmail.com", "nickname": "RingDestroyer", "password": pbkdf2_sha256.hash("iloveSam"),
             "location": "Shire", "first_name": "Frodo", "last_name": "Baggins", "status_id": 1,
             "role_id": 3},
            {"email": "drizztemail@gmail.com", "nickname": "Ranger", "password": pbkdf2_sha256.hash("icewindDale"),
             "location": "Menzoberranzan", "first_name": "Drizzt", "last_name": "Do Urden", "status_id": 2,
             "role_id": 2},
            {"email": "jonemail@gmail.com", "nickname": "KnowNothing", "password": pbkdf2_sha256.hash("Ygritte"),
             "location": "Wall", "first_name": "Aegon", "last_name": "Targaryen", "status_id": 1,
             "role_id": 1},
            {"email": "geraltemail@gmail.com", "nickname": "WhiteWolf", "password": pbkdf2_sha256.hash("Merigold"),
             "location": "Kaer Morhen", "first_name": "Geralt", "last_name": "of Rivia", "status_id": 4,
             "role_id": 2}
            )
    
    statement = text(
        """INSERT INTO users(email, nickname, password, location, first_name, last_name, status_id, role_id)
        VALUES (:email, :nickname, :password, :location, :first_name, :last_name, :status_id, :role_id)"""
    )
    
    for line in data:
        con.execute(statement, **line)
