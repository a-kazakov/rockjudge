import _ from "l10n";

export default class ClubsShown extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                clubs: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        name: PT.string.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            config: PT.shape({
                clubs: PT.object.isRequired,
            }).isRequired,
        };
    }
    hasDisabledClubs() {
        return this.props.competition.clubs.findIndex(
            d => !this.props.config.clubs[d.id]
        ) >= 0;
    }
    getEnabledClubs() {
        return this.props.competition.clubs.filter(
            d => this.props.config.clubs[d.id]
        );
    }

    render() {
        if (!this.hasDisabledClubs()) {
            return null;
        }
        const clubs = this.getEnabledClubs();
        if (clubs.length === 0) {
            return null;
        }
        return (
            <div className="clubs-shown">
                <p>
                    <strong>
                        { _("admin.headers.clubs_shown") }
                    </strong>
                </p>
                <ul>
                    { clubs.map(c =>
                        <li key={ c.id }>{ c.name }</li>
                    ) }
                </ul>
            </div>
        )
    }
}

ClubsShown.displayName = "AdminPanel_Management_StartList_ClubsShown";
