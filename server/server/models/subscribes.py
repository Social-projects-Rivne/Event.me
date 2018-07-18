from sqlalchemy import Column, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Subscribe(Base):
    __tablename__ = 'subscribes'
    id_feedback = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey="users.id")
    id_event = Column(Integer, ForeignKey="events.id")
    is_favorite = Column(Boolean)

    users = relationship("User", foreign_keys="id_user")
    events = relationship("Event", foreign_keys="id_event")
