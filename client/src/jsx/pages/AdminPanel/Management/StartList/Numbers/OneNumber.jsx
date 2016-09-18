export default class OneNumber extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                name: PT.string.isRequired,
            }).isRequired,
            participant: PT.shape({
                number: PT.number.isRequired,
                name: PT.string.isRequired,
                discipline_name: PT.string.isRequired,
                club: PT.shape({
                    name: PT.string.isRequired,
                    city: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        return (
            <div className="participant">
                <p className="spacer-top">
                    &nbsp;
                </p>
                <div className="competition">
                    <p>
                        { this.props.competition.name }
                        &nbsp;
                    </p>
                </div>
                <p className="spacer-top2">
                    &nbsp;
                </p>
                <p className="number">
                    { this.props.participant.number }
                </p>
                <p className="name">
                    { this.props.participant.name }
                    &nbsp;
                </p>
                <p className="discipline">
                    { this.props.participant.discipline_name }
                    &nbsp;
                </p>
                <p className="club">
                    { this.props.participant.club.name } &mdash; { this.props.participant.club.city }
                </p>
                <p className="spacer-bottom">&nbsp;</p>
            </div>
        );
    }
}

OneNumber.displayName = "AdminPanel_Management_StartList_Numbers_OneNumber";
