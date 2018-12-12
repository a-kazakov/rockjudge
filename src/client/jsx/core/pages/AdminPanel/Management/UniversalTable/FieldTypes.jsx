import makeValidator from "./makeValidator";

export default class FieldTypes {
    static makeTextField(name) {
        return {
            name: name,
            defaultValue: "",
            fromFormValue: value => value.trim(),
        };
    }

    static makeIntegerField(name, error_message, bounds = [null, null]) {
        const [lower, upper] = bounds;
        return {
            name: name,
            defaultValue: "",
            toFormValue: value => value.toString(),
            fromFormValue: value => parseInt(value),
            validator: makeValidator(
                value =>
                    !isNaN(value) &&
                    (upper == null || value <= upper) &&
                    (lower == null || value >= lower),
                error_message,
            ),
        };
    }

    static makeNonEmptyTextField(name, error_message) {
        return Object.assign(this.makeTextField(name), {
            validator: makeValidator(value => value !== "", error_message),
        });
    }

    static makeExternalIdField() {
        return {
            name: "external_id",
            defaultValue: "",
            toFormValue: value => value || "",
            fromFormValue: value => (value ? value.trim() : null),
        };
    }

    static makeSpField() {
        return this.makeIntegerField("sp", "errors.global.invalid_sp");
    }
}
