export default class Renderer extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            discipline: PT.shape({
                name: PT.string.isRequired,
            }).isRequired,
            position: PT.number,
            table: PT.arrayOf(
                PT.shape({
                    place: PT.number,
                    run: PT.shape({
                        participant: PT.shape({
                            name: PT.string.isRequired,
                            club: PT.shape({
                                name: PT.string.isRequired,
                            }).isRequired,
                        }).isRequired,
                    }).isRequired,
                }).isRequired,
            ).isRequired,
        };
    }

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
        if (row.place === null) {
            return null;
        }
        return (
            <div className="place">
                { `${row.place} место` }
            </div>
        );
    }
    render() {
        const row = this.props.table[this.props.position];
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
