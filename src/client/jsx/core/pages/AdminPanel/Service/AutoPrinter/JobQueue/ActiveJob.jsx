import React from "react";

import makeRandomString from "common/tools/makeRandomString";
import PT from "prop-types";
import HeatsTab from "pages/AdminPanel/Judging/TourPanel/HeatsTab";
import TourResultsTab from "pages/AdminPanel/Judging/TourPanel/TourResultsTab";
import DisciplineResultsTab from "pages/AdminPanel/Judging/TourPanel/DisciplineResultsTab";
import TestPage from "./TestPage";
import TourLoader from "./TourLoader";

export default class ActiveJob extends React.Component {
    static propTypes = {
        queueItem: PT.shape({
            type: PT.string.isRequired,
            tour: PT.object.isRequired,
        }).isRequired,
        onDone: PT.func.isRequired,
    };

    createFilename() {
        return `autoprinter_${makeRandomString()}.tmp`;
    }

    render() {
        if (!this.props.queueItem) {
            return null;
        }
        const docx_params = {
            filename: this.createFilename(),
            onDone: this.props.onDone,
        };
        const { type, tour } = this.props.queueItem;
        switch (this.props.queueItem.type) {
            case "heats":
                return <HeatsTab autoDocx={docx_params} tour={tour} />;
            case "results_1":
                return (
                    <TourLoader
                        autoDocx={docx_params}
                        renderer={TourResultsTab}
                        tour={tour}
                        verbosity={1}
                    />
                );
            case "results_2":
                return (
                    <TourLoader
                        autoDocx={docx_params}
                        renderer={TourResultsTab}
                        tour={tour}
                        verbosity={2}
                    />
                );
            case "results_3":
                return (
                    <TourLoader
                        autoDocx={docx_params}
                        renderer={TourResultsTab}
                        tour={tour}
                        verbosity={3}
                    />
                );
            case "discipline_results":
                return (
                    <DisciplineResultsTab
                        autoDocx={docx_params}
                        discipline={tour.discipline}
                    />
                );
            case "test":
                return <TestPage autoDocx={docx_params} />;
            default:
                console.error("Invalid job type:", type);
        }
        return null;
    }
}
