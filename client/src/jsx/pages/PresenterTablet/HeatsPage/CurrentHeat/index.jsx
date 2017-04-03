import _ from "l10n";

import RunInfo from "./RunInfo";

export default class CurrentHeat extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            heat: PT.number.isRequired,
            maxHeat: PT.number.isRequired,
            runs: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                }).isRequired
            ).isRequired,
        };
    }
    renderHeader() {
        if (this.props.runs.length === 0) {
            return _("presenter.labels.no_runs");
        }
        return `${_("tablet.headers.heat")}: ${this.props.heat} / ${this.props.maxHeat}`;
    }
    render() {
        return (
            <div className="heat">
                <h3>
                    { this.renderHeader() }
                </h3>
                { this.props.runs.map(run =>
                    <RunInfo
                        key={ run.id }
                        run={ run }
                    />
                ) }
                <div className="spacer" />
            </div>
        );
    }
}

CurrentHeat.displayName = "PresenterTablet_HeatsPage_CurrentHeat";
