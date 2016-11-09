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
    render() {
        return (
            <div className="heat">
                <h3>
                    { `${_("tablet.headers.heat")}: ${this.props.heat} / ${this.props.maxHeat}` }
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
