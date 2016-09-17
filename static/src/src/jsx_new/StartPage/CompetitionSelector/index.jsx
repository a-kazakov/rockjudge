import _ from "l10n";

import Button from "./Button";

export default class CompetitionSelector extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionsNames: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                }).isRequired
            ).isRequired,
            onSelect: PT.func.isRequired,
        };
    }

    renderNoCompetitions() {
        let link = null;
        if (window.location.hostname === "127.0.0.1") {
            link = (
                <h4>
                    { _("start_page.messages.competitions_management_link", link) }
                </h4>
            );
        }
        return (
            <div className="start-screen">
                <div className="no-competitions">
                    <h3>{ _("start_page.messages.no_competitions") }</h3>
                    { link }
                </div>
            </div>
        );
    }
    render() {
        if (this.props.competitionsNames.length === 0) {
            return this.renderNoCompetitions();
        }
        return (
            <div className="competition-selector">
                <h3>
                    { _("start_page.headers.select_competition") }
                </h3>
                <div className="list">
                    { this.props.competitionsNames.map(comp_info =>
                        <Button
                            competitionInfo={ comp_info }
                            key={ comp_info.id }
                            onSelect={ this.props.onSelect }
                        />
                    ) }
                </div>
            </div>
        );
    }
}

CompetitionSelector.displayName = "StartPage_CompetitionSelector";
