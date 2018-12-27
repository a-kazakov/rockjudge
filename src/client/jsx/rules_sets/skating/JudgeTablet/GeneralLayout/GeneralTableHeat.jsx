import PT from "prop-types";

import { React } from "HostModules";

export default class GeneralTableHeat extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        heat: PT.number.isRequired,
        sections: PT.arrayOf(
            PT.shape({
                name: PT.string.isRequired,
                title: PT.string,
                renderer: PT.func.isRequired,
            }).isRequired,
        ).isRequired,
        tour: PT.object.isRequired,
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

    renderSectionHeader(name, title, scores) {
        if (title == null) {
            return null;
        }
        return (
            <tr key={`H-${name}`}>
                <th colSpan={scores.length}>{title}</th>
            </tr>
        );
    }
    renderSectionScore(Renderer, score, idx) {
        if (Renderer == null) {
            return <td key={score.id ?? `I-${idx}`} />;
        }
        const { sections, disciplineJudge, heat, tour, ...other_props } = this.props;
        return (
            <td key={score.id}>
                <Renderer
                    readOnly={score?.confirmed ?? true}
                    score={score}
                    {...other_props}
                />
            </td>
        );
    }
    renderSection(section, scores) {
        const { name, title, renderer } = section;
        return (
            <table className="section-table" key={name}>
                <tbody>
                    {this.renderSectionHeader(name, title, scores)}
                    <tr key={`B-${name}`}>
                        {scores.map((s, idx) =>
                            this.renderSectionScore(renderer, s, idx),
                        )}
                    </tr>
                </tbody>
            </table>
        );
    }
    render() {
        const scores = this.getScores();
        return (
            <div className="body general-table-heat">
                {this.props.sections.map(section =>
                    this.renderSection(section, scores),
                )}
            </div>
        );
    }
}
