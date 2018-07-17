from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class UserStatuse:
    __tablename__ = "user_statuses"
    id = Column(Integer)
    status = Column(String)

    users = relationship('User')
