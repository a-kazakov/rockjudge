import Api from "common/server/Api";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";

import TourResultsLoader from "common/components/TourResultsLoader";
import DisciplineResultsLoader from "common/components/DisciplineResultsLoader";

class RulesSetLoader {
    constructor() {
        this._loaded = false;
    }

    load(module_name, data) {
        const KEYS = [
            "meta",
            "translate",
            "tour_results_table_1",
            "tour_results_table_2",
            "tour_results_table_3",
            "discipline_results_table",
            "judge_tablet",
            "admin_score_input",
            "get_judge_table_mark",
        ];
        for (const key of KEYS) {
            if (!(key in data)) {
                throw new Error(`Module ${module_name} doesn't export ${key} class.`);
            }
            this[`_${key}`] = data[key];
        }
        for (const key of Object.keys(data)) {
            if (KEYS.indexOf(key) < 0) {
                console.warn(`Module ${module_name} exports unknown ${key} parameter.`);
            }
        }
        this._loaded = true;
        console.log(`Added scoring system: ${module_name}`);
    }

    _checkIfLoaded() {
        if (!this._loaded) {
            throw new Error("No scoring system was loaded");
        }
    }

    get meta() {
        this._checkIfLoaded();
        return this._meta;
    }

    get translate() {
        this._checkIfLoaded();
        return this._translate;
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

    get discipline_results_table() {
        this._checkIfLoaded();
        return this._discipline_results_table;
    }

    get judge_tablet() {
        this._checkIfLoaded();
        return this._judge_tablet;
    }

    get admin_score_input() {
        this._checkIfLoaded();
        return this._admin_score_input;
    }

    get get_judge_table_mark() {
        this._checkIfLoaded();
        return this._get_judge_table_mark;
    }
}

const loader = new RulesSetLoader();

window.registerRulesSet = function(...args) {
    loader.load(...args);
    return { Api, storage, message_dispatcher, TourResultsLoader, DisciplineResultsLoader };
}

export default loader;
