from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class Users(object):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    nickname = Column(String, enique=True)
    password = Column(String)
    create_date = Column(String)
    location = Column(String)
    f_name = Column(String)
    l_name = Column(String)
    id_status = Column(Integer)
    id_role = Column(String)
    avatar = Column(String)
    feedback = relationship('Feedbacks', back_populates='users')
    user_statuses = relationship('UserStatuses', back_populates='users')
    users_subscribe = relationship('Subscribe', back_populates='users')