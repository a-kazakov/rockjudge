import _ from "l10n";

export default class SplashScreen extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            judge: PT.shape({
                name: PT.string.isRequired,
                number: PT.string.isRequired,
                role_description: PT.string.isRequired,
                competition: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                name: PT.string.isRequired,
                discipline: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }),
            hasActiveTours: PT.bool.isRequired,
        };
    }

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

SplashScreen.displayName = "JudgeTablet_SplashScreen";
