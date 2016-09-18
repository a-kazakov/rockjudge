import rules_set from "rules_sets/loader";

import AddButton from "./AddButton";
import Creator from "./Creator";
import Row from "./Row";

export default class Tours extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
            disciplineId: PT.number.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            newTourAfterId: -1,
        }
        this._discipline = null;
    }

    componentWillReceiveProps(next_props) {
        if (next_props.disciplineId !== this.props.disciplineId) {
            this.setState({
                newTourAfterId: -1,
            });
        }
        this._discipline = null; // flush cache
    }

    // Handlers

    handleAddButtonClick = (after_id) => {
        this.setState({
            newTourAfterId: after_id,
        });
    }

    handleStopTourCreating = () => {
        this.setState({
            newTourAfterId: -1,
        });
    }

    // Renderers

    renderTourCreation(after_id) {
        if (after_id === this.state.newTourAfterId) {
            return (
                <Creator
                    afterId={ after_id }
                    disciplineId={ this.props.disciplineId }
                    key="tour-creating"
                    onStopEditing={ this.handleStopTourCreating }
                />
            );
        } else {
            return (
                <AddButton
                    afterId={ after_id }
                    onClick={ this.handleAddButtonClick }
                />
            );
        }
    }
    renderTours(discipline) {
        return discipline.tours.map(tour => {
            return [
                <Row
                    key={ tour.id }
                    tour={ tour }
                />,
                this.renderTourCreation(tour.id),
            ];
        });
    }
    render() {
        const discipline = this.props.competition.disciplines.find(d => d.id === this.props.disciplineId);
        return (
            <div className="app-content">
                <header className="app-header">
                    <h1>
                        { discipline.name }
                    </h1>
                </header>
                <div className="app-body ic-management-ui">
                    { this.renderTourCreation(null, discipline.tours[0]) }
                    { this.renderTours(discipline) }
                </div>
                <datalist id="dl_tours">
                    { rules_set.translate.tour_name_suggestions.map((n, idx) =>
                        <option key={ idx } value={ n } />
                    ) }
                </datalist>
                <datalist id="dl_programs">
                    { rules_set.meta.suggested_programs.map((n, idx) =>
                        <option key={ idx } value={ n } />
                    ) }
                </datalist>
            </div>
        );
    }
}

Tours.displayName = "AdminPanel_Management_Tours";
