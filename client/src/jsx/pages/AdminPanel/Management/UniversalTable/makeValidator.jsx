import showError from "common/dialogs/showError";
import _ from "l10n";

export default function makeValidator(predicate, message) {
    return (value) => {
        if (!predicate(value)) {
            showError(_(message));
            return false;
        }
        return true;
    }
}
