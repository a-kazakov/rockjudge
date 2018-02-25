import Renderer from "./Renderer";

export default class TourResultsTab extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            autoDocx: PT.object,
            tour: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            verbosity: PT.number.isRequired,
        };
    }

    makeResultsRef = (ref) => this._results = ref;

    handleSignal = (message) => {
        this._results.handleSignal(message);
    };

    // Rendering

    getClassName() {
        return `TourResultsTab rules-set`;
    }
    render() {
        return (
            <div className={ this.getClassName() }>
                <Renderer
                    autoDocx={ this.props.autoDocx }
                    ref={ this.makeResultsRef }
                    tour={ this.props.tour }
                    verbosity={ this.props.verbosity }
                />
            </div>
        );
    }
}

