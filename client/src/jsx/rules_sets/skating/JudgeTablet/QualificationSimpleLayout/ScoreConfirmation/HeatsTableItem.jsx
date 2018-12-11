import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import makeClassName from "common/makeClassName";

export default class HeatsTableItem extends React.Component {
    static propTypes = {
        disciplineJudge: PT.shape({
            id: PT.number.isRequired,
        }).isRequired,
        heatRuns: PT.arrayOf(
            PT.shape({
                id: PT.number.isRequired,
                heat: PT.number.isRequired,
                status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                participant: PT.shape({
                    number: PT.number.isRequired,
                }).isRequired,
                scores: PT.arrayOf(
                    PT.shape({
                        discipline_judge_id: PT.number.isRequired,
                        data: PT.object.isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
        ).isRequired,
    };

    getScoreClassName(value, cross) {
        return makeClassName({
            "score-value": true,
            "no-score": value == null,
            cross: cross,
            "no-cross": cross === false,
        });
    }

    renderHeader() {
        return (
            <tr>
                {this.props.heatRuns.map(run => (
                    <th key={run.id}>{run.participant.number}</th>
                ))}
            </tr>
        );
    }
    renderScore(value, cross) {
        return (
            <td className={this.getScoreClassName(value, cross)}>
                &nbsp;{value}&nbsp;
            </td>
        );
    }
    renderScores() {
        return (
            <tr>
                {this.props.heatRuns.map(run => {
                    if (run.status !== "OK") {
                        return this.renderScore(null, null);
                    }
                    const score = run.scores.find(
                        s => s?.discipline_judge_id === this.props.disciplineJudge.id,
                    );
                    if (typeof score === "undefined") {
                        return this.renderScore(null, null);
                    }
                    return this.renderScore(
                        score.data.cross ? "X" : "",
                        score.data.cross,
                    );
                })}
            </tr>
        );
    }
    renderNoteNumber(number) {
        return <td className="note-number">&nbsp;{number}&nbsp;</td>;
    }
    renderNotesNumbers() {
        return (
            <tr>
                {this.props.heatRuns.map(run => {
                    if (run.status !== "OK") {
                        return this.renderNoteNumber(null);
                    }
                    const score = run.scores.find(
                        s => s?.discipline_judge_id === this.props.disciplineJudge.id,
                    );
                    if (typeof score === "undefined") {
                        return this.renderNoteNumber(null);
                    }
                    return this.renderNoteNumber(score.data.note_number);
                })}
            </tr>
        );
    }
    renderNotePic(pics) {
        let result = [];
        if (pics != null) {
            const opts = [
                ["S", "♠", "pic color-green"],
                ["H", "♥", "pic color-red"],
                ["C", "♣", "pic color-blue"],
                ["D", "♦", "pic color-yellow"],
            ];
            for (const [letter, icon, cls] of opts) {
                if (pics.includes(letter)) {
                    result.push(
                        <span className={cls} key={letter}>
                            {icon}
                        </span>,
                    );
                }
            }
        }
        return <td className="note-pic">&nbsp;{result}&nbsp;</td>;
    }
    renderNotesPics() {
        return (
            <tr>
                {this.props.heatRuns.map(run => {
                    if (run.status !== "OK") {
                        return this.renderNotePic(null);
                    }
                    const score = run.scores.find(
                        s => s?.discipline_judge_id === this.props.disciplineJudge.id,
                    );
                    if (typeof score === "undefined") {
                        return this.renderNotePic(null);
                    }
                    return this.renderNotePic(score.data.note_pics);
                })}
            </tr>
        );
    }
    render() {
        const width = Math.max(60, 45 * this.props.heatRuns.length);
        return (
            <div className="table-wrapper" style={{ width: `${width}px` }}>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={this.props.heatRuns.length.toString()}>
                                {_(
                                    "tablet.dance_judge.heat",
                                    this.props.heatRuns[0].heat,
                                )}
                            </th>
                        </tr>
                        {this.renderHeader()}
                        {this.renderScores()}
                        {this.renderNotesNumbers()}
                        {this.renderNotesPics()}
                    </tbody>
                </table>
            </div>
        );
    }
}
