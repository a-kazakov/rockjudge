import {React} from "HostModules";

import PT from "prop-types";
import makeDisciplineResultsTable from "common/makeDisciplineResultsTable";

export default class Renderer extends React.Component {
    static propTypes = {
        discipline: PT.object.isRequired,
        position: PT.number,
    };

    renderEmpty() {
        return (
            <div className="Awarding">
                <div className="discipline-name">
                    { this.props.discipline.name }
                </div>
            </div>
        );
    }
    renderPlace(row) {
        if (row.place == null) {
            return null;
        }
        return (
            <div className="place">
                { `${row.place} место` }
            </div>
        );
    }
    render() {
        if (this.props.discipline == null) {
            return null;
        }
        const table = makeDisciplineResultsTable(this.props.discipline);
        const row = table[this.props.position];
        if (!row) {
            return this.renderEmpty();
        }
        return (
            <div className="Awarding">
                <div className="discipline-name">
                    { this.props.discipline.name }
                </div>
                { this.renderPlace(row) }
                <div className="participant-name">
                    { row.run.participant.name }
                </div>
                <div className="participant-club">
                    { row.run.participant.club.name }
                </div>
            </div>
        );
    }
}

Renderer.displayName = "Awarding_Renderer";