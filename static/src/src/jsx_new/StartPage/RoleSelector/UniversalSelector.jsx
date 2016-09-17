import _ from "l10n";

import keys_storage from "common/keys_storage";

export default class UniversalSelector extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                id: PT.number.isRequired,
                judges: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        number: PT.string.isRequired,
                        name: PT.string.isRequired,
                        role_description: PT.string.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            showAdmin: PT.bool,
        };
    }
    static get defaultProps() {
        return {
            showAdmin: false,
        }
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
    get admin_href() {
        return `/admin/${this.props.competition.id}`;
    }
    getJudgeRef(judge) {
        return `/judge/${judge.id}`;
    }

    renderAdminButton() {
        if (!this.props.showAdmin) {
            return null;
        }
        return (
            <a
                className="mbtn no-title"
                href={ this.admin_href }
            >
                { _("start_page.roles.administrator") }
            </a>
        );
    }
    render() {
        const all_judges = this.props.competition.judges.filter(judge => judge.discipline_judges.length > 0);
        const line_judges = all_judges
            .filter(judge => judge.role_description === "")
            .map(judge =>
                <a
                    className="mbtn"
                    href={ this.getJudgeRef(judge) }
                    key={ judge.id }
                >
                    <div className="title">
                        { _("global.phrases.judge_n", judge.number) }
                    </div>
                    <div className="name">
                        { judge.name }
                    </div>
                </a>
            );
        const staff = all_judges
            .filter((judge) => judge.role_description !== "")
            .map(judge =>
                <a
                    className="mbtn"
                    href={ this.getJudgeRef(judge) }
                    key={ judge.id }
                >
                    <div className="title">
                        { judge.role_description }
                    </div>
                    <div className="name">
                        { judge.name }
                    </div>
                </a>
            );
        return (
            <div className="universal-selector">
                <div className="content">
                    <div className="row">
                        <div className="col-md-4 group">
                            <div className="btn-group-vertical full-width">
                                { staff }
                            </div>
                        </div>
                        <div className="col-md-4 group">
                            <div className="btn-group-vertical full-width">
                                { line_judges }
                            </div>
                        </div>
                        <div className="col-md-4 group">
                            <div className="btn-group-vertical full-width">
                                { this.renderAdminButton() }
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
                        </div>
                    </div>
                </div>
                <div className="client-id">
                    { _("start_page.messages.client_id", keys_storage.client_id) }
                </div>
            </div>
        );
    }
}

UniversalSelector.displayName = "StartPage_RoleSelector_UniversalSelector";
