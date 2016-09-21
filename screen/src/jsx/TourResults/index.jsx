import { TourResultsLoader } from "HostModules";

import Renderer from "./Renderer";

export default class TourResults extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                screen_data: PT.shape({
                    controls_state: PT.shape({
                        tour_id: PT.number.isRequired,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        return (
            <TourResultsLoader
                renderer={ Renderer }
                showLoader={ false }
                tourId={ this.props.competition.screen_data.controls_state.tour_id }
            />
        );
    }
}

TourResults.displayName = "TourResults";
