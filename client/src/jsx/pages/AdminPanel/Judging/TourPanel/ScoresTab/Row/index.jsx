import makeClassName from "common/makeClassName";

import AcrobaticsCell from "./AcrobaticsCell";
import ActionsCell from "./ActionsCell";
import HeatCell from "./HeatCell";
import StatusCell from "./StatusCell";
import ScoreCell from "./ScoreCell";


export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            heatPosition: PT.number.isRequired,
            heatSize: PT.number.isRequired,
            readOnly: PT.bool.isRequired,
            nowEditing: PT.shape({
                type: PT.string,
                score_id: PT.number,
                run_id: PT.number,
            }).isRequired,
            run: PT.shape({
                id: PT.number.isRequired,
                heat: PT.number.isRequired,
                status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                disqualified: PT.bool.isRequired,
                total_score: PT.string.isRequired,
                participant: PT.shape({
                    number: PT.number.isRequired,
                    name: PT.shape.isRequired,
                }).isRequired,
                scores: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        confirmed: PT.bool.isRequired,
                        discipline_judge_id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            tour: PT.shape({
                discipline: PT.shape({
                    discipline_judges: PT.arrayOf(
                        PT.shape({
                            id: PT.number.isRequired,
                        }).isRequired
                    ).isRequired,
                }).isRequired,
            }).isRequired,
            onEditRequest: PT.func.isRequired,
            onPositionMove: PT.func.isRequired,
            onStopEditing: PT.func.isRequired,
        };
    }

    getClassName() {
        return makeClassName({
            "odd-heat": this.props.run.heat % 2 === 1,
            "even-heat": this.props.run.heat % 2 === 0,
            "not-performed": this.props.run.status === "NP",
            "disqualified": this.props.run.status === "DQ",
            "zero-heat": this.props.run.heat <= 0,
        });
    }
    renderActionsCell() {
        if (this.props.readOnly) {
            return null;
        }
        return (
            <ActionsCell
                heatPosition={ this.props.heatPosition }
                heatSize={ this.props.heatSize }
                opened={ this.props.nowEditing.type === "actions" &&
                          this.props.nowEditing.run_id === this.props.run.id }
                readOnly={ this.props.readOnly }
                run={ this.props.run }
                onEditRequest={ this.props.onEditRequest }
                onPositionMove={ this.props.onPositionMove }
                onStopEditing={ this.props.onStopEditing }
            />
        );
    }
    render() {
        let scores_map = new Map();
        for (const score of this.props.run.scores) {
            scores_map.set(score.discipline_judge_id, score)
        }
        const scores = this.props.tour.discipline.discipline_judges.map((discipline_judge, idx) => {
            const score = scores_map.get(discipline_judge.id);
            return (
                <ScoreCell
                    confirmed={ score && score.confirmed }
                    disciplineJudge={ discipline_judge }
                    editing={ this.props.nowEditing.type === "score" &&
                              this.props.nowEditing.score_id === (score && score.id) }
                    key={ (score && score.id) ||  `I${idx}` }
                    readOnly={ this.props.readOnly }
                    score={ score }
                    tour={ this.props.tour }
                    onEditRequest={ this.props.onEditRequest }
                    onStopEditing={ this.props.onStopEditing }
                />
            );
        });
        return (
            <tr className={ this.getClassName() }>
                <HeatCell
                    editing={ this.props.nowEditing.type === "heat" &&
                              this.props.nowEditing.run_id === this.props.run.id }
                    readOnly={ this.props.readOnly }
                    run={ this.props.run }
                    onEditRequest={ this.props.onEditRequest }
                    onStopEditing={ this.props.onStopEditing }
                />
                <td className="number">
                    { this.props.run.participant.number }
                </td>
                <td className="name">
                    { this.props.run.participant.name }
                </td>
                <AcrobaticsCell
                    editing={ this.props.nowEditing.type === "acrobatics" &&
                              this.props.nowEditing.run_id === this.props.run.id }
                    readOnly={ this.props.readOnly }
                    run={ this.props.run }
                    onEditRequest={ this.props.onEditRequest }
                    onStopEditing={ this.props.onStopEditing }
                />
                <StatusCell
                    readOnly={ this.props.readOnly }
                    run={ this.props.run }
                />
                <td className="total">
                    { this.props.run.total_score }
                </td>
                { scores }
                { this.renderActionsCell() }
            </tr>
        );
    }
}

Row.displayName = "AdminPanel_Judging_TourPanel_ScoresTab_Row";
