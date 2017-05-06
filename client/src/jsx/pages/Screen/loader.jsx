import Api from "common/server/Api";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";

import makeTourResultsTable from "common/makeTourResultsTable";
import makeDisciplineResultsTable from "common/makeDisciplineResultsTable";

class RulesSetLoader {
    constructor() {
        this._loaded = false;
    }

    load(component) {
        this._component = component;
        this._loaded = true;
        console.log("Added screen plugin");
    }

    _checkIfLoaded() {
        if (!this._loaded) {
            throw new Error("Screen plugin is not loaded.");
        }
    }

    get loaded() {
        return this._loaded;
    }

    get component() {
        this._checkIfLoaded();
        return this._component;
    }
}

const loader = new RulesSetLoader();

window.registerScreen = function(...args) {
    loader.load(...args);
    return {
        Api,
        storage: storage.getDomain("screen"),
        message_dispatcher,
        makeTourResultsTable,
        makeDisciplineResultsTable,
    };
}

export default loader;
