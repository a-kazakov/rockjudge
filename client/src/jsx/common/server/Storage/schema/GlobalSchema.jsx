import ModelSchema from "./ModelSchema";

export default class GlobalSchema {
    constructor(global_schema, storage) {
        this.schemas = new Map();
        for (const model_schema of global_schema) {
            this.schemas.set(model_schema.name, new ModelSchema(model_schema, storage));
        }
        for (const schema of this.schemas.values()) {
            schema.finishInit(this);
        }
    }
    get(model_name) {
        return this.schemas.get(model_name);
    }
}
