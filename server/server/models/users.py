"""SQLAlchemy model for table users"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from . import Base


class User(Base):
    """SQLAlchemy model for table users"""

    __tablename__ = "users"
    __json_exclude__ = set(["password", "status_id"])

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    nickname = Column(String, unique=True)
    password = Column(String)
    create_date = Column(DateTime)
    location = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    status_id = Column(Integer, ForeignKey("user_statuses.id"))
    role_id = Column(Integer, ForeignKey("roles.id"))
    avatar = Column(String)

    roles = relationship("Role", foreign_keys="role_id")
    user_statuses = relationship("UserStatus", foreign_keys="status_id")
    events = relationship("Event")
    feedback = relationship("Feedback")
    users_subscribe = relationship("Subscribe")

    @classmethod
    def from_json(cls, data):
        return cls(**data)

    def users_to_json(self):
        to_serialize = ['id', 'email', 'nickname', 'password', 'create_date', 'location', 'first_name', 'last_name', 'status_id', 'role_id', 'avatar']
        d = {}
        for attr_name in to_serialize:
            d[attr_name] = getattr(self, attr_name)
        return d
