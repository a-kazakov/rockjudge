export default class Buttons extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            onSignal: PT.func.isRequired,
        };
    }

    handleDocxClick = () => {
        return this.props.onSignal("docx");
    }

    render() {
        return (
            <div>
                <button
                    className="btn btn-primary"
                    onClick={ this.handleDocxClick }
                >
                    DOCX
                </button>
            </div>
        );
    }
}

Buttons.displayName = "AdminPanel_Judging_TourPanel_TourResultsTab_Buttons";
