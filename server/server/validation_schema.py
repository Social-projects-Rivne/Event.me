"""Colander schemas for data validation"""
from datetime import datetime

import colander

from .models.category import Category


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
    category = colander.SchemaNode(colander.String())
    tags = Tags(missing=colander.drop)
