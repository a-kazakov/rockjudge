import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import Row from "./Row";

const PARTS_ORDER = new Map(
    [
        "tech_execution",
        "tech_control_stretching",
        "tech_style_power",
        "group_sync",
        "group_similarity",
        "group_position",
        "choreography_art",
        "choreography_performance_effects",
        "choreography_complexity",
        "impression_art",
    ].map((value, idx) => [value, idx + 1]),
);

export default class LineJudgesScores extends React.Component {
    static propTypes = {
        disciplineJudges: PT.arrayOf(PT.object.isRequired).isRequired,
        run: PT.object.isRequired,
    };

    static names_cache = new Map();
    static convertName(name) {
        if (!this.names_cache.get(name)) {
            const new_name_part = name
                .split("")
                .map((ch, idx, arr) =>
                    idx === 0 || arr[idx - 1] === "_" ? ch.toUpperCase() : ch,
                )
                .filter(ch => ch !== "_")
                .join("");
            this.names_cache.set(name, `get${new_name_part}`);
        }
        return this.names_cache.get(name);
    }

    state = {
        verboseIdx: null,
    };
    _cache = new Map();

    resetCache() {
        this._cache.clear();
    }
    getValue(value_name, use_cache_or_context = true, state = null, props = null) {
        const func = this.constructor.convertName(value_name);
        const context =
            typeof use_cache_or_context === "object"
                ? use_cache_or_context
                : {
                      use_cache: use_cache_or_context,
                      state: state || this.state,
                      props: props || this.props,
                  };
        if (context.use_cache) {
            if (!this._cache.has(value_name)) {
                this._cache.set(value_name, this[func](context));
            }
            return this._cache.get(value_name);
        } else {
            return this[func](context);
        }
    }

    getLineJudges(context) {
        return context.props.disciplineJudges.filter(dj => dj.role === "dance_judge");
    }

    getLineJudgesIndex(context) {
        return new Map(this.getValue("line_judges", context).map(dj => [dj.id, dj]));
    }

    getScores(context) {
        const lj_index = this.getValue("line_judges_index", context);
        return context.props.run.scores.filter(score =>
            lj_index.has(score.discipline_judge_id),
        );
    }

    getTable(context) {
        let result = new Map();
        for (const score of this.getValue("scores", context)) {
            const dj_id = score.discipline_judge_id;
            const score_data = score.data;
            for (const part of PARTS_ORDER.keys()) {
                const key = `${dj_id}/${part}`;
                if (!score_data.hasOwnProperty(part)) {
                    continue;
                }
                result.set(key, score_data[part]);
            }
        }
        return result;
    }

    getAllParts(context) {
        const all_score_parts = this.getValue("scores", context).map(score =>
            Object.keys(score.data),
        );
        return Array.from(new Set([].concat(...all_score_parts)))
            .filter(p => PARTS_ORDER.has(p))
            .sort((a, b) => PARTS_ORDER[a] - PARTS_ORDER[b]);
    }

    getMedians(context) {
        const table = this.getValue("table", context);
        let result = new Map();
        for (const part of this.getValue("all_parts", context).values()) {
            let med_values = [];
            for (const score of this.getValue("scores", context)) {
                const key = `${score.discipline_judge_id}/${part}`;
                const cell_value = table.get(key);
                if (typeof cell_value !== "number") {
                    continue;
                }
                med_values.push(cell_value);
            }
            if (med_values.length === 0) {
                result.set(part, 0);
                continue;
            }
            med_values.sort((a, b) => a - b);
            const mid_point = Math.floor(med_values.length / 2);
            result.set(
                part,
                med_values.length % 2 === 0
                    ? (med_values[mid_point - 1] + med_values[mid_point]) / 2
                    : med_values[mid_point],
            );
        }
        return result;
    }

    get line_judges() {
        return this.getValue("line_judges");
    }
    get line_judges_index() {
        return this.getValue("line_judges_index");
    }
    get scores() {
        return this.getValue("scores");
    }
    get table() {
        return this.getValue("table");
    }
    get all_parts() {
        return this.getValue("all_parts");
    }
    get medians() {
        return this.getValue("medians");
    }

    makeTableRef = ref => (this._table = ref);

    handleShowVerboseScore = event => {
        event.preventDefault();
        this.handleShowVerboseScoreNoPrevent(event);
    };

    handleShowVerboseScoreNoPrevent = event => {
        const position_obj = event.touches ? event.touches[0] : event;
        const target = this._table;
        const rect = target.getBoundingClientRect();
        const offset = position_obj.clientX - rect.left - 300;
        const selected_idx = Math.floor(
            offset / ((target.offsetWidth - 300) / this.scores.length),
        );
        this.setState({
            verboseIdx: selected_idx,
        });
    };

    handleHideVerboseScore = event => {
        event.preventDefault();
        this.setState({ verboseIdx: null });
    };

    renderJudgeName(score, idx) {
        if (idx !== this.state.verboseIdx) {
            return null;
        }
        return (
            <div className="verbose-score">
                <div className="judge-name">
                    {this.line_judges_index.get(score.discipline_judge_id).judge.name}
                </div>
                <div className="triangle" />
            </div>
        );
    }
    renderNumbers() {
        return this.scores.map((score, idx) => {
            const dj = this.line_judges_index.get(score.discipline_judge_id);
            return (
                <td key={score.id}>
                    {`${dj.judge.number}${dj.role === "acro_judge" ? " (A)" : ""}`}
                    {this.renderJudgeName(score, idx)}
                </td>
            );
        });
    }
    renderRows() {
        return this.all_parts.map((part, _idx, all) => (
            <Row
                key={part}
                lineJudgesIndex={this.line_judges_index}
                medians={this.medians}
                part={part}
                scores={this.scores}
                showPartName={all.length > 1}
                table={this.table}
            />
        ));
    }
    render() {
        this.resetCache();
        const width = 300 + this.scores.length * 100;
        return (
            <div>
                <h3>{_("tablet.head_judge.dance_judge_scores")}</h3>
                <table
                    className="line-judge-scores"
                    ref={this.makeTableRef}
                    style={{ width: `${width}px`, maxWidth: "100%" }}
                    onMouseMove={this.handleShowVerboseScore}
                    onMouseOut={this.handleHideVerboseScore}
                    onMouseUp={this.handleHideVerboseScore}
                    onTouchCancel={this.handleHideVerboseScore}
                    onTouchEnd={this.handleHideVerboseScore}
                    onTouchMove={this.handleShowVerboseScoreNoPrevent}
                    onTouchStart={this.handleShowVerboseScore}
                >
                    <tbody>
                        <tr className="numbers">
                            <td style={{ width: "300px" }} />
                            {this.renderNumbers()}
                        </tr>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}
