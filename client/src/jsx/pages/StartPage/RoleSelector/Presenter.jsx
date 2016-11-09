import _ from "l10n";

export default class Presenter extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }

    get presenter_href() {
        return `/presenter/${this.props.competition.id}`;
    }
    get screen_operator_href() {
        return `/screen_operator/${this.props.competition.id}`;
    }
    get screen_href() {
        return `/screen/${this.props.competition.id}`;
    }

    render() {
        return (
            <div className="presenter-selector">
                <a
                    className="mbtn no-title"
                    href={ this.presenter_href }
                >
                    { _("start_page.roles.presenter") }
                </a>
                <a
                    className="mbtn no-title"
                    href={ this.screen_operator_href }
                >
                    { _("start_page.roles.screen_operator") }
                </a>
                <a
                    className="mbtn no-title"
                    href={ this.screen_href }
                >
                    { _("start_page.roles.screen") }
                </a>
            </div>
        );
    }
}

Presenter.displayName = "StartPage_RoleSelector_Presenter";
