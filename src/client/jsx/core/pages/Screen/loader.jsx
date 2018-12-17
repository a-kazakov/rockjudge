import { consoleLog } from "common/logging";

class ScreenLoader {
    constructor() {
        this._loaded = false;
    }

    load(component) {
        this._component = component;
        this._loaded = true;
        consoleLog("Added screen plugin");
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

const loader = new ScreenLoader();

window.registerScreen = function(...args) {
    loader.load(...args);
};

export default loader;
