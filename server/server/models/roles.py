from sqlalchemy import Column, Unicode, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    role = Column(Unicode(255), unique=True, nullable=False)

    users = relationship("User")
