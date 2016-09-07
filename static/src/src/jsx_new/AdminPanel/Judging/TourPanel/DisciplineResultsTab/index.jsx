import { _ } from "l10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Loader } from "ui/components";
import { Printable } from "ui/printable";
import { Docx } from "common/docx";

import DisciplineResults from "common/DisciplineResults";

import Wrapper from "./Wrapper";

export default class DisciplineResultsTab extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            discipline: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }

    makeResultsRef = (ref) => this._results = ref;

    handleSignal = (message) => {
        this._results.handleSignal(message);
    }

    // Rendering

    render() {
        return (
            <DisciplineResults
                disciplineId={ this.props.discipline.id }
                ref={ this.makeResultsRef }
                renderer={ Wrapper }
            />
        );
    }
}


DisciplineResultsTab.displayName = "AdminPanel_Judging_DisciplinePanel_DisciplineResultsTab";
