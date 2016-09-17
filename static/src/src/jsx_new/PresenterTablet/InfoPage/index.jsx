import _ from "l10n";

import CompetitionInfo from "./CompetitionInfo";
import Judges from "./Judges";
import Clubs from "./Clubs";

export default class InfoPage extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
        };
    }

    render() {
        return (
            <div className="info">
                <h2>
                    { this.props.competition.name }
                </h2>
                <CompetitionInfo
                    competition={ this.props.competition }
                />
                <h3>
                    { _("presenter.headers.judges") }
                </h3>
                <Judges
                    competition={ this.props.competition }
                />
                <h3>
                    { _("presenter.headers.clubs") }
                </h3>
                <Clubs
                    competition={ this.props.competition }
                />
            </div>
        );
    }
}

InfoPage.displayName = "PresenterTablet_InfoPage";
