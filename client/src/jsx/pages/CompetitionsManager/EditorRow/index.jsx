import _ from "l10n";
import makeClassName from "common/makeClassName";

import Info from "./Info";

export default class EditorRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            baseTabIndex: PT.number.isRequired,
            competition: PT.shape({
                name: PT.string.isRequired,
                date: PT.string.isRequired,
                active: PT.bool.isRequired,
                info: PT.array.isRequired,
                rules_set: PT.string.isRequired,
            }).isRequired,
            newCompetition: PT.bool,
            rulesSets: PT.object,
            onStopEditing: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            newCompetition: false,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            competition: this.props.competition,
        };
    }

    makeNameRef     = (ref) => this._name      = ref;
    makeDateRef     = (ref) => this._date      = ref;
    makeActiveRef   = (ref) => this._active    = ref;
    makeInfoRef     = (ref) => this._info      = ref;
    makeRulesSetRef = (ref) => this._rules_set = ref;

    serialize() {
        let result = {
            name:   this._name.value,
            date:   this._date.value,
            active: this._active.checked,
            info:   this._info.value,
        }
        if (this.props.newCompetition) {
            Object.assign(result, {
                rules_set: this._rules_set.value,
            });
        }
        return result;
    }

    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.serialize());
    }

    getClassName() {
        return makeClassName({
            "editor": true,
            "create": this.props.newCompetition,
        });
    }
    renderRulesSet() {
        if (!this.props.newCompetition) {
            return null;
        }
        const rules_sets = Object.keys(this.props.rulesSets).sort();
        return (
            <label className="full-width">
                { _("models.competition.rules_set") }
                <select
                    className="full-width"
                    defaultValue={ this.props.competition.rules_set }
                    ref={ this.makeRulesSetRef }
                    tabIndex={ this.props.baseTabIndex + 5 }
                >
                    { rules_sets.map(ss =>
                        <option key={ ss } value={ ss }>
                            { this.props.rulesSets[ss] }
                        </option>
                    ) }
                </select>
            </label>
        );
    }
    render() {
        return (
            <tr className={ this.getClassName() }>
                <td colSpan="4">
                    <form onSubmit={ this.handleSubmission }>
                        <div className="col-6 general-info">
                            <label className="full-width">
                                { _("models.competition.name") }
                                <input
                                    required
                                    className="full-width"
                                    defaultValue={ this.props.competition.name }
                                    ref={ this.makeNameRef }
                                    tabIndex={ this.props.baseTabIndex + 1 }
                                />
                            </label>
                            <label className="full-width">
                                { _("models.competition.date") }
                                <input
                                    required
                                    className="full-width"
                                    defaultValue={ this.props.competition.date }
                                    ref={ this.makeDateRef }
                                    tabIndex={ this.props.baseTabIndex + 2 }
                                />
                            </label>
                            { this.renderRulesSet() }
                            <label className="full-width">
                                { _("models.competition.active") }
                                <br />
                                <input
                                    defaultChecked={ this.props.competition.active }
                                    ref={ this.makeActiveRef }
                                    tabIndex={ this.props.baseTabIndex + 3 }
                                    type="checkbox"
                                />
                            </label>
                        </div>
                        <div className="col-14">
                            <label>
                                { _("models.competition.info") }
                                <Info
                                    baseTabIndex={ this.props.baseTabIndex + 10 }
                                    defaultValue={ this.props.competition.info }
                                    ref={ this.makeInfoRef }
                                />
                            </label>
                        </div>
                        <div className="col-4">
                            <div className="buttons horizontal">
                                <button
                                    className="btn btn-primary"
                                    tabIndex={ this.props.baseTabIndex + 998 }
                                    type="submit"
                                >
                                    { _("global.buttons.submit") }
                                </button>
                                <button
                                    className="btn btn-danger"
                                    tabIndex={ this.props.baseTabIndex + 999 }
                                    type="button"
                                    onClick={ this.props.onStopEditing }
                                >
                                    { _("global.buttons.discard") }
                                </button>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
        );
    }
}

EditorRow.displayName = "CompetitionsManager_EditorRow";
