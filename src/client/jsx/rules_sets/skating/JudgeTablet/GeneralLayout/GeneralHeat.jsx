import { React } from "HostModules";

import PT from "prop-types";
import Grid from "JudgeTablet/Grid";
import GeneralParticipant from "JudgeTablet/GeneralLayout/GeneralParticipant";

export default class GeneralHeat extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        heat: PT.number.isRequired,
        participantRenderer: PT.func.isRequired,
        tour: PT.object.isRequired,
    };
    static defaultProps = {
        participantRenderer: GeneralParticipant,
    };

    getScores() {
        const { tour, heat, disciplineJudge } = this.props;
        return tour.runs
            .filter(run => run.heat === heat)
            .map(run =>
                run.scores.find(
                    score => score.discipline_judge_id === disciplineJudge.id,
                ),
            );
    }
    renderParticipant = (score, idx) => {
        const {
            disciplintJudge,
            heat,
            tour,
            participantRenderer: Renderer,
            ...other_props
        } = this.props;
        return (
            <Renderer key={score?.id ?? `I-${idx}`} score={score} {...other_props} />
        );
    };
    render() {
        return (
            <div className="body">
                <Grid>{this.getScores().map(this.renderParticipant)}</Grid>
            </div>
        );
    }
}
