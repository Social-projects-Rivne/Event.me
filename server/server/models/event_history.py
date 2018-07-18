from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class EventHistory(Base):
    __tablename__ = 'event_histories'
    id = Column(Integer, primary_key=True)
    id_event = Column(Integer, ForeignKey('events.id'))
    id_status = Column(Integer, ForeignKey('event_statuses.id'))
    date = Column(DateTime)
    comment = Column(Text)

    events = relationship("Event", foreign_keys="id_event")
    event_statuses = relationship("EventStatus", foreign_keys="id_status")

    def __init__(self, id_event, id_status, date, comment):
        self.name = id_event
        self.id_status = id_status
        self.date = date
        self.comment = comment
