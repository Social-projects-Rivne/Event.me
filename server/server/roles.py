from myapp.models import relationship
from sqlalchemy import Column
from sqlalchemy import Unicode
from sqlalchemy import Integer


class Roles(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    role = Column(Unicode(255), unique=True, nullable=False)

