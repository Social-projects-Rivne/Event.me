from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


class Event():
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
    author_id = Column(ForeignKey('authod.id'), nullable=False, index=True)
    category_id = Column(ForeignKey('category.id'), nullable=False, index=True)

    author = relationship(User)
    category = relationship(Category)
