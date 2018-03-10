import _ from "l10n";

import { CRITERIAS_ORDER } from "common/constants";

import Row from "./Row";

const COMPLEX_CRITERIAS = new Map([
    ["mistakes", ["small_mistakes", "big_mistakes"]],
    ["dance_figs", ["df_accuracy", "df_difficulty", "df_art"]],
    ["composition", ["c_ideas", "c_structure", "c_bonus"]],
    ["figures", ["fig_execution", "fig_patterns", "fig_transitions"]],
]);


export default class LineJudgeScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudges: PT.arrayOf(
                PT.shape({
                    role: PT.string.isRequired,
                }).isRequired,
            ).isRequired,
            run: PT.shape({
                scores: PT.arrayOf(
                    PT.shape({
                        discipline_judge_id: PT.number.isRequired,
                    }).isRequired,
                ).isRequired,
                verbose_total_score: PT.shape({
                    criterias_scores: PT.object.isRequired,
                }),
            }).isRequired,
            tour: PT.object.isRequired,
        };
    }

    static names_cache = new Map();
    static convertName(name) {
        if (!this.names_cache.get(name)) {
            const new_name_part = name
                .split("")
                .map((ch, idx, arr) => (idx === 0 || arr[idx - 1] === "_") ? ch.toUpperCase() : ch)
                .filter(ch => ch !== "_")
                .join("");
            this.names_cache.set(
                name,
                `get${new_name_part}`,
            );
        }
        return this.names_cache.get(name);
    }

    constructor(props) {
        super(props);
        this._cache = new Map();
        this.state = {
            verboseIdx: null,
        };
    }

    resetCache() {
        this._cache.clear()
    }
    getValue(value_name, use_cache_or_context=true, state=null, props=null) {
        const func = this.constructor.convertName(value_name);
        const context = typeof use_cache_or_context === "object"
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
            return this._cache.get(value_name)
        } else {
            return this[func](context);
        }
    }

    getLineJudges(context) {
        return context.props.disciplineJudges
            .filter(dj => ["dance_judge", "acro_judge"].includes(dj.role))
    }

    getLineJudgesIndex(context) {
        return new Map(this.getValue("line_judges", context).map(dj => [dj.id, dj]))
    }

    getScores(context) {
        const lj_index = this.getValue("line_judges_index");
        return context.props.run.scores
            .filter(score => lj_index.has(score.discipline_judge_id))
    }

    getTable(context) {
        let result = new Map();
        for (const score of this.getValue("scores", context)) {
            const dj_id = score.discipline_judge_id;
            for (const criteria of Object.keys(score.data.criterias_values)) {
                const key = `${dj_id}/${criteria}`;
                const score_data = score.data.raw_data;
                const components = [criteria]
                    .concat(COMPLEX_CRITERIAS.get(criteria) || [])
                    .filter(c => typeof score_data[c] !== "undefined");
                let cell_data = {
                    components: [],
                };
                for (const c of components) {
                    cell_data.components.push([c, score_data[c]]);
                }
                cell_data.all_set = components.every(comp => score_data[comp] !== null);
                cell_data.criteria_value = score.data.criterias_values[criteria];
                result.set(key, cell_data);
            }
        }
        return result;
    }

    getAllCriterias(context) {
        let cr_found = [];
        for (const score of this.getValue("scores", context).values()) {
            cr_found = cr_found.concat(Object.keys(score.data.criterias_values));
        }
        return new Set(cr_found);
    }

    getMedians(context) {
        const table = this.getValue("table", context);
        let result = new Map();
        for (const criteria of this.getValue("all_criterias", context).values()) {
            let med_values = [];
            for (const score of this.getValue("scores", context)) {
                const key = `${score.discipline_judge_id}/${criteria}`;
                const cell_data = table.get(key);
                if (!cell_data || !cell_data.all_set) {
                    continue;
                }
                med_values.push(cell_data.criteria_value);
            }
            if (med_values.length === 0) {
                result.set(criteria, 0);
                continue;
            }
            med_values.sort((a, b) => a - b);
            const mid_point = Math.floor(med_values.length / 2);
            result.set(
                criteria,
                med_values.length % 2 === 0
                    ? (med_values[mid_point - 1] + med_values[mid_point]) / 2
                    : med_values[mid_point],
            );
        }
        return result;
    }

    get line_judges() { return this.getValue("line_judges") }
    get line_judges_index() { return this.getValue("line_judges_index") }
    get scores() { return this.getValue("scores") }
    get table() { return this.getValue("table") }
    get all_criterias() { return this.getValue("all_criterias") }
    get medians() { return this.getValue("medians") }

    makeTableRef = (ref) => this._table = ref;

    handleShowVerboseScore = (event) => {
        event.preventDefault();
        const position_obj = event.touches ? event.touches[0] : event;
        const target = this._table;
        const rect = target.getBoundingClientRect();
        const offset = position_obj.clientX - rect.left;
        const selected_idx = Math.floor(offset / (target.offsetWidth / (this.scores.length + 1))) - 1;
        this.setState({
            verboseIdx: selected_idx,
        });
    };

    handleHideVerboseScore = (event) => {
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
                    { this.line_judges_index.get(score.discipline_judge_id).judge.name }
                </div>
                <div className="triangle" />
            </div>
        );
    }
    renderNumbers() {
        return this.scores.map((score, idx) => {
            const dj = this.line_judges_index.get(score.discipline_judge_id);
            return (
                <td key={ score.id }>
                    { `${dj.judge.number }${ dj.role === "acro_judge" ? " (A)" : "" }` }
                    { this.renderJudgeName(score, idx) }
                </td>
            );
        });
    }
    renderRows() {
        const criterias = Object.keys(this.props.run.verbose_total_score.criterias_scores)
            .sort((a, b) => (CRITERIAS_ORDER.get(a) || 1000) - (CRITERIAS_ORDER.get(b) || 1000));
        return criterias.map(criteria =>
            <Row
                criteria={ criteria }
                key={ criteria }
                lineJudgesIndex={ this.line_judges_index }
                medians={ this.medians }
                run={ this.props.run }
                scores={ this.scores }
                table={ this.table }
            />
        );
    }
    render() {
        this.resetCache();
        return (
            <div>
                <h3>{ _("tablet.head_judge.dance_judge_scores") }</h3>
                <table
                    className="line-judge-scores"
                    ref={ this.makeTableRef }
                    onMouseMove={ this.handleShowVerboseScore }
                    onMouseOut={ this.handleHideVerboseScore }
                    onMouseUp={ this.handleHideVerboseScore }
                    onTouchCancel={ this.handleHideVerboseScore }
                    onTouchEnd={ this.handleHideVerboseScore }
                    onTouchMove={ this.handleShowVerboseScore }
                    onTouchStart={ this.handleShowVerboseScore }
                >
                    <tbody>
                        <tr className="numbers">
                            <td />
                            { this.renderNumbers() }
                        </tr>
                        { this.renderRows() }
                    </tbody>
                </table>
            </div>
        );
    }
}
