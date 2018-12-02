import React from "react";

import PT from "prop-types";
import _ from "l10n";
import Model from "common/server/Storage/models/Model";

export default class SingleJudge extends React.Component {
    static propTypes = {
        judge: PT.instanceOf(Model).isRequired,
    };

    handleButtonClick = () => {
        window.location.href = `/judge/${this.props.judge.id}`;
    };

    render() {
        const judge = this.props.judge;
        const judge_role = judge.role_description || _("global.phrases.judge_n", judge.number);
        return (
            <div className="single-judge">
                <h3>
                    { _("start_page.messages.single_judge_access") }
                </h3>
                <h4>
                    { `${judge_role}: ${judge.name}` }
                </h4>
                <button
                    type="button"
                    onClick={ this.handleButtonClick }
                >
                    { _("global.buttons.continue") }
                </button>
            </div>
        );
    }
}
