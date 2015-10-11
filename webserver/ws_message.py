from collections import OrderedDict

class WsMessage:
    def __init__(self):
        self.model_updates = []
        self.messages = []

    def add_model_update(self, model_type, model_id, schema=None):
        if schema is None:
            schema = {}
        self.model_updates.append({
            "model_type": model_type,
            "model_id": model_id,
            "schema": schema,
        })

    def add_message(self, message, data):
        self.messages.append((message, data, ))

    @classmethod
    def merge_schemas(cls, base, new):
        for k, v in new:
            if k in base:
                cls.merge_schemas(base[k], v)
            else:
                base[k] = v

    def serialize(self):
        schemas = OrderedDict()
        for x in self.model_updates:
            key = (x["model_type"], x["model_id"])
            if key not in schemas:
                schemas[key] = {}
            self.merge_schemas(schemas[key], x["schema"])
        updates = []
        for (model_type, model_id), schema in schemas:
            updates.append(model_type.get(model_type.id == model_id).serialize_as_child(schema))
        return {
            "model_updates": updates,
            "messages": self.messages,
        }

    def empty(self):
        return self.model_updates == [] and self.messages == []
