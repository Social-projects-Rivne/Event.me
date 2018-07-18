from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    nickname = Column(String, enique=True)
    password = Column(String)
    create_date = Column(String)
    location = Column(String)
    f_name = Column(String)
    l_name = Column(String)
    id_status = Column(Integer, ForeignKey("user_statuses.id"))
    id_role = Column(Integer, ForeignKey("roles.id"))
    avatar = Column(String)

    roles = relationship("Role", foreign_keys="id_role")
    user_statuses = relationship("UserStatuse", foreign_keys="id_status")
    events = relationship("Event")
    feedback = relationship("Feedback")
    users_subscribe = relationship("Subscribe")
