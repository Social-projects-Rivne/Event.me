from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Event(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    lng = Column(String, nullable=False)
    lnt = Column(String, nullable=False)
    description = Column(String, nullable=False)
    data_start = Column(String, nullable=False)
    data_end = Column(String, nullable=False)
    author_name = Column(String, nullable=False)
    main_image = Column(String, nullable=False)
    author_id = Column(ForeignKey('users.id'), nullable=False, index=True)
    category_id = Column(ForeignKey('categories.id'), nullable=False, index=True)

    author = relationship("User", foreign_keys="Event.author_id")
    category = relationship("Category", foreign_keys="Event.category_id")
    subscribes = relationship("Subscribe")
    feedbacks = relationship("Feedback")
    galleries = relationship("Gallery")
