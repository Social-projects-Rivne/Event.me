"""Colander schemas for data validation"""
from datetime import datetime

import colander
import re
from pyramid import threadlocal

from .models.category import Category
from .models.user import User


class LogInSchema(colander.MappingSchema):
    """Schema for log in data validation"""
    email = colander.SchemaNode(colander.String())
    password = colander.SchemaNode(colander.String())


class Tags(colander.SequenceSchema):
    tag = colander.SchemaNode(colander.String(),
                              validator=colander.Length(max=255))


class EventSchema(colander.MappingSchema):
    """Schema for new event data validation"""
    name = colander.SchemaNode(colander.String(),
                               validator=colander.Length(max=255))
    long = colander.SchemaNode(colander.Float(),
                               validator=colander.Range(-180, 180))
    lat = colander.SchemaNode(colander.Float(),
                              validator=colander.Range(-90, 90))
    description = colander.SchemaNode(colander.String(),
                                      validator=colander.Length(max=20000))
    start_date = colander.SchemaNode(colander.DateTime())
    end_date = colander.SchemaNode(colander.DateTime(),
                                   missing=colander.drop)
    main_image = colander.SchemaNode(colander.String(), missing=colander.drop)
    category = colander.SchemaNode(colander.String(),
                                   validator=colander.Length(max=255))
    tags = Tags(missing=colander.drop)


class Nickname_Unique(colander.SchemaNode):
    schema_type = colander.String
    title = 'Check Nickname'

    def validator(self, node, cstruct):
        request = threadlocal.get_current_request()
        check_unique_nickname = False
        if User.get_one(request, nickname=cstruct):
            raise colander.Invalid(node, 'Nickname already taken')


class ProfileSchema(colander.MappingSchema):
    """Schema for profile edit validation"""
    first_name = colander.SchemaNode(colander.String(),
                                     validator=colander.Regex(
                                        "^[a-zA-Z][ A-Za-z_-]*$",
                                        "First name must not contain numbers"),
                                     missing=colander.drop)
    last_name = colander.SchemaNode(colander.String(),
                                    validator=colander.Regex(
                                        "^[a-zA-Z][ A-Za-z_-]*$",
                                        "Last name must not contain numbers"),
                                    missing=colander.drop)
    nickname = Nickname_Unique(missing=colander.drop)
    location = colander.SchemaNode(colander.String(),
                                   validator=colander.Length(max=255),
                                   missing=colander.drop)
    password = colander.SchemaNode(colander.String(),
                                   validator=colander.Length(max=255),
                                   missing=colander.drop)
