import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";

export default class SplashScreen extends React.Component {
    static propTypes = {
        hasActiveTours: PT.bool.isRequired,
        judge: PT.instanceOf(Model).isRequired,
    };

    renderNotJudgingText() {
        if (!this.props.hasActiveTours) {
            return null;
        }
        return (
            <div className="not-judging-message">
                { _("tablet.messages.not_judging_discipline") }
            </div>
        );
    }
    render() {
        const judge_number = (
            this.props.judge.role_description ||
            _("global.phrases.judge_n", this.props.judge.number)
        );
        return (
            <div className="JudgeTablet splash-screen">
                <header>
                    <div className="button">
                        <a href="/">
                            { _("tablet.buttons.to_start_page") }
                        </a>
                    </div>
                    <h1>
                        { this.props.judge.competition.name }
                    </h1>
                </header>
                <div className="body">
                    <div className="judge-number">
                        { judge_number }
                    </div>
                    <div className="judge-name">
                        { this.props.judge.name }
                    </div>
                    { this.renderNotJudgingText() }
                </div>
            </div>
        );
    }
}
