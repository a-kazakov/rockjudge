import HeatsTab from "pages/AdminPanel/Judging/TourPanel/HeatsTab";
import TourResultsTab from "pages/AdminPanel/Judging/TourPanel/TourResultsTab";
import DisciplineResultsTab from "pages/AdminPanel/Judging/TourPanel/DisciplineResultsTab";
import TestPage from "./TestPage";

export default class ActiveJob extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            queueItem: PT.shape({
                type: PT.string.isRequired,
                tour: PT.object.isRequired,
            }).isRequired,
            onDone: PT.func.isRequired,
        };
    }

    createFilename() {
        return `autoprinter_${Math.random().toString().replace(/[^0-9]/, "").slice(1)}.tmp`;
    }

    render() {
        if (!this.props.queueItem) {
            return null;
        }
        const docx_params = { filename: this.createFilename(), onDone: this.props.onDone };
        switch (this.props.queueItem.type) {
        case "heats":
            return (
                <HeatsTab
                    autoDocx={ docx_params }
                    tour={ this.props.queueItem.tour }
                />
            );
        case "results_1":
            return (
                <TourResultsTab
                    autoDocx={ docx_params }
                    tour={ this.props.queueItem.tour }
                    verbosity={ 1 }
                />
            );
        case "results_2":
            return (
                <TourResultsTab
                    autoDocx={ docx_params }
                    tour={ this.props.queueItem.tour }
                    verbosity={ 2 }
                />
            );
        case "results_3":
            return (
                <TourResultsTab
                    autoDocx={ docx_params }
                    tour={ this.props.queueItem.tour }
                    verbosity={ 3 }
                />
            );
        case "discipline_results":
            return (
                <DisciplineResultsTab
                    autoDocx={ docx_params }
                    discipline={ this.props.queueItem.tour.discipline }
                />
            );
        case "test":
            return (
                <TestPage
                    autoDocx={ docx_params }
                />
            );
        default:
            console.error("Invalid job type:", this.props.queueItem.type);
        }
        return null;
    }
}

ActiveJob.displayName = "AdminPanel_Service_AutoPrinter_JobQueue_ActiveJob";
