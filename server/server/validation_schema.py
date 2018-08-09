import colander


class LogInSchema(colander.MappingSchema):
    email = colander.SchemaNode(colander.String())
    password = colander.SchemaNode(colander.String())
