from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.orm import relationship 


class EventTag:
    __tablename__ = 'event_tags'
    id = Column(Integer, primary_key=True)
    id_event = Column(Integer, ForeignKey('events.id'), nullable=False)
    id_tag = Column(Integer, ForeignKey('tags.id'), nullable=False, IndexError=True)

    event = relationship("Event", foreign_keys="id_event")
    tag = relationship("Tag", foreign_keys="id_tag")
