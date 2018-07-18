from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from . import Base


class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    role = Column(String, unique=True, nullable=False)

    users = relationship("User")
