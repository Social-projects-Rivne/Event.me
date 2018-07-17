from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


class UserStatuses(object):
    __tablename__ = "user_statuses"

    id = Column(Integer, ForeignKey('users.id_status'))
    status = Column(Integer)
    users = relationship('Users', back_populates='user_statuses')
