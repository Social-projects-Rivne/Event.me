from sqlalchemy import Column, Unicode, Integer
from sqlalchemy.orm import relationship


class Role:
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    role = Column(Unicode(255), unique=True, nullable=False)

    users = relationship("User")
