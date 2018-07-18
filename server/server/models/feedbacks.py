from sqlalchemy import Column, Integer, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Feedback(Base):
    __tablename__ = 'feedbacks'
    id_feedback = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey="users.id")
    id_event = Column(Integer, ForeignKey="events.id")
    feedback = Column(Text)
    date = Column(DateTime)
    is_delete = Column(Boolean)

    users = relationship("User", foreign_keys="id_user")
    events = relationship("Event", foreign_keys="id_event")
