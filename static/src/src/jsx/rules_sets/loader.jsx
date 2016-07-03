class RulesSetLoader {
    constructor() {
        this._loaded = false;
    }

    load(module_name, data) {
        const KEYS = ["tour_results_table_1", "tour_results_table_2", "tour_results_table_2",
                      "judge_tablet", "admin_score_input"];
        for (const key of KEYS) {
            if (!(key in data)) {
                throw new Error(`Module ${module_name} doesn't export ${key} class.`);
            }
            this[`_${key}`] = data[key];
        }
        this._loaded = true;
        console.log(`Added scoring system: ${module_name}`);
    }

    _checkIfLoaded() {
        if (!this._loaded) {
            throw new Error("No scoring system was loaded");
        }
    }

    get tour_results_table_1() {
        this._checkIfLoaded();
        return this._tour_results_table_1;
    }

    get tour_results_table_2() {
        this._checkIfLoaded();
        return this._tour_results_table_2;
    }

    get tour_results_table_3() {
        this._checkIfLoaded();
        return this._tour_results_table_3;
    }

    get judge_tablet() {
        this._checkIfLoaded();
        return this._judge_tablet;
    }

    get admin_score_input() {
        this._checkIfLoaded();
        return this._admin_score_input;
    }
}

var loader = new RulesSetLoader();

window.registerRulesSet = function() {
    loader.load(...arguments);
}

export default loader;
