import { _ } from "l10n/loader";

import keys_storage from "common/keys_storage";

export default class SingleJudge extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            accessLevel: PT.string,
            competition: PT.shape({
                judges: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        number: PT.string.isRequired,
                        name: PT.string.isRequired,
                        role_description: PT.string.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
        };
    }

    handleButtonClick = () => {
        window.location.href = this.props.accessLevel.replace("judge_", "/judge/");
    }

    render() {
        const judge_id = Number(this.props.accessLevel.split("_")[1]);
        const judge = this.props.competition.judges.find(j => j.id === judge_id);
        const judge_role = judge.role_description || _("global.phrases.judge_n", judge.number);
        if (!judge) {
            return null;
        }
        return (
            <div className="single-judge">
                <div className="content">
                    <h3>
                        { _("start_page.messages.single_judge_access") }
                    </h3>
                    <h4>
                        { `${judge_role}: ${judge.name}` }
                    </h4>
                    <button
                        className="btn btn-lg btn-primary"
                        type="button"
                        onClick={ this.handleButtonClick }
                    >
                        { _("global.buttons.continue") }
                    </button>
                </div>
                <div className="client-id">
                    { _("start_page.messages.client_id", keys_storage.client_id) }
                </div>
            </div>
        );
    }
}

SingleJudge.displayName = "StartPage_RoleSelector_SingleJudge";
