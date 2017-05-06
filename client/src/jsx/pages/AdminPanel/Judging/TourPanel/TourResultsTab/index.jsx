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

    componentDidMount() {
        this.checkAutoDocx();
    }
    componentDidUpdate() {
        this.checkAutoDocx();
    }

    checkAutoDocx() {
        if (this.props.autoDocx && !this._docx_done && this.props.tour !== null) {
            this._docx_done = true;
            this.createDocx(this.props.autoDocx.filename);
            this.props.autoDocx.onDone(this.props.autoDocx.filename);
        }
    }

    makeResultsRef = (ref) => this._results = ref;

    handleSignal = (message) => {
        this._results.handleSignal(message);
    }

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


TourResultsTab.displayName = "AdminPanel_Judging_TourPanel_TourResultsTab";
