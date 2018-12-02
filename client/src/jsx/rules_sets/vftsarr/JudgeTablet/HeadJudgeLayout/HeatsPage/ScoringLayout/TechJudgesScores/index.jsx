import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import Item from "./Item";

export default class TechJudgeScore extends React.Component {
    static propTypes = {
        disciplineJudges: PT.arrayOf(
            PT.object.isRequired,
        ).isRequired,
        run: PT.object.isRequired,
        tourResults: PT.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            verboseIdx: null,
        };
    }

    setupCache() {
        this.tech_judges = this.props.disciplineJudges.filter(dj => dj.role === "tech_judge");
        this.tech_judges_index = new Map(this.tech_judges.map(dj => [dj.id, dj]));
        this.scores = this.props.run.scores.filter(score => this.tech_judges_index.has(score.discipline_judge_id));
    }

    makeScoresRowRef = (ref) => this._scores_row = ref;

    handleShowVerboseScore = (event) => {
        event.preventDefault();
        const position_obj = event.touches ? event.touches[0] : event;
        const target = this._scores_row;
        const rect = target.getBoundingClientRect();
        const offset = position_obj.clientX - rect.left;
        const selected_idx = Math.floor(offset / (target.offsetWidth / this.scores.length));
        this.setState({
            verboseIdx: selected_idx,
        });
    };

    handleHideVerboseScore = (event) => {
        event.preventDefault();
        this.setState({ verboseIdx: null });
    };

    getStyle() {
        return {
            maxWidth: `${150 * this.tech_judges.length}px`,
        };
    }
    renderNumbers() {
        return this.scores.map(score => {
            const dj = this.tech_judges_index.get(score.discipline_judge_id);
            return (
                <td key={ score.id }>
                    { dj.judge.number }
                </td>
            );
        });
    }
    renderScores() {
        return this.scores.map((score, idx) => {
            const dj = this.tech_judges_index.get(score.discipline_judge_id);
            return (
                <Item
                    disciplineJudge={ dj }
                    key={ dj.id }
                    score={ score }
                    showVerbose={ this.state.verboseIdx === idx }
                    tourResults={ this.props.tourResults }
                />
            );
        });
    }
    render() {
        this.setupCache();
        if (this.tech_judges.length === 0) {
            return (
                <div />
            );
        }
        return (
            <div>
                <h3>{ _("tablet.head_judge.tech_judge_scores") }</h3>
                <table className="tech-judge-scores" style={ this.getStyle() }><tbody>
                    <tr className="numbers">
                        { this.renderNumbers() }
                    </tr>
                    <tr
                        className="scores"
                        ref={ this.makeScoresRowRef }
                        onMouseMove={ this.handleShowVerboseScore }
                        onMouseOut={ this.handleHideVerboseScore }
                        onMouseUp={ this.handleHideVerboseScore }
                        onTouchCancel={ this.handleHideVerboseScore }
                        onTouchEnd={ this.handleHideVerboseScore }
                        onTouchMove={ this.handleShowVerboseScore }
                        onTouchStart={ this.handleShowVerboseScore }
                    >
                        { this.renderScores() }
                    </tr>
                </tbody></table>
            </div>
        );
    }
}