import _ from "l10n";
import { Docx } from "common/docx";

import CreationRow from "./CreationRow";
import PrintablePlan from "./PrintablePlan";
import Row from "./Row";

export default class CompetitionPlan extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                name: PT.string.isRequired,
                date: PT.string.isRequired,
                plan: PT.arrayOf(
                    PT.shape({
                        tour_id: PT.number,
                    }).isRequired
                ).isRequired,
                disciplines: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        name: PT.string.isRequired,
                        tours: PT.arrayOf(
                            PT.shape({
                                id: PT.number.isRequired,
                                name: PT.string.isRequired,
                            }).isRequired
                        ).isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
        };
    }

    makePrintableRef = (ref) => this._printable = ref;

    handleDocxCreation = () => {
        this.createDocx();
    }

    genTours() {
        let result = [];
        for (const discipline of this.props.competition.disciplines) {
            for (const tour of discipline.tours) {
                result.push({
                    id: tour.id,
                    name: `${discipline.name} — ${tour.name}`,
                    discipline_id: discipline.id,
                    discipline_name: discipline.name,
                    tour_name: tour.name,
                });
            }
        }
        return result;
    }

    renderTable(tours) {
        // Build tours index and count
        let tours_count = new Map();
        let tours_index = new Map();
        let picked_tours_ids = new Set();
        for (const tour of tours) {
            tours_index.set(tour.id, tour);
            tours_count.set(tour.id, (tours_count.get(tour.id) || 0) + 1)
        }
        // Build disciplines index and cursors
        let disciplines_index = new Map();
        let disciplines_cursors = new Map();
        for (const discipline of this.props.competition.disciplines) {
            disciplines_index.set(discipline.id, discipline);
            disciplines_cursors.set(discipline.id, 0);
        }

        const rows = this.props.competition.plan.map(item => {
            let error = tours_count.get(item.tour_id) > 2;
            if (item.tour_id !== null) {
                picked_tours_ids.add(item.tour_id);
                const discipline_id = tours_index.get(item.tour_id).discipline_id;
                let tour_idx = disciplines_cursors.get(discipline_id);
                if (
                    !disciplines_index.get(discipline_id).tours[tour_idx] ||
                    item.tour_id !== disciplines_index.get(discipline_id).tours[tour_idx].id
                ) {
                    error = true;
                    tour_idx = disciplines_index.get(discipline_id).tours.findIndex(
                        tour => tour.id === item.tour_id
                    );
                }
                disciplines_cursors.set(discipline_id, tour_idx + 1);
            }
            return (
                <Row
                    error={ error }
                    item={ item }
                    key={ item.id }
                    tours={ tours }
                />
            );
        });
        const unpicked_tours = tours.filter((tour) => !picked_tours_ids.has(tour.id));
        const unpicked_tours_html = unpicked_tours.length === 0 ? null : (
            <div>
                <h4>
                    { _("admin.headers.unpicked_tours") }
                </h4>
                <ul className="unpicked-tours">
                    { unpicked_tours.map((tour) =>
                        <li className="item" key={ tour.id }>
                            { tour.name }
                        </li>
                    ) }
                </ul>
            </div>
        );
        return (
            <div className="manage-competition-plan">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th className="sp">
                                { _("models.competition_plan_item.sp") }
                            </th>
                            <th className="discipline">
                                { _("models.competition_plan_item.discipline") }
                            </th>
                            <th className="tour">
                                { _("models.competition_plan_item.tour") }
                            </th>
                            <th className="estimated_beginning">
                                { _("models.competition_plan_item.estimated_beginning") }
                            </th>
                            <th className="estimated_duration">
                                { _("models.competition_plan_item.estimated_duration") }
                            </th>
                            <th className="delete" />
                        </tr>
                        { rows }
                        <CreationRow
                            competition={ this.props.competition }
                            tours={ tours }
                        />
                    </tbody>
                </table>
                { unpicked_tours_html }
            </div>
        );
    }
    render() {  // eslint-disable-line react/sort-comp
        const tours = this.genTours();
        return (
            <div className="app-content">
                <header className="app-header">
                    <div className="controls">
                        <button
                            className="btn btn-primary"
                            key="btn-init-tour"
                            onClick={ this.handleDocxCreation }
                        >
                            DOCX
                        </button>
                    </div>
                    <h1>{ _("admin.headers.competition_plan_management") }</h1>
                </header>
                <div className="app-body">
                    { this.renderTable(tours) }
                    <PrintablePlan
                        competition={ this.props.competition }
                        ref={ this.makePrintableRef }
                        tours={ tours }
                    />
                </div>
            </div>
        );
    }

    createDocx(filename="program.docx") {
        Docx(filename)
            .setMargins([10, 15, 10, 15])
            .setHeader(`${this.props.competition.name}, ${this.props.competition.date}`)
            .setTitle1(_("admin.headers.competition_plan"))
            .setBody(ReactDOM.findDOMNode(this._printable).innerHTML)
            .save();
    }
}

CompetitionPlan.displayName = "AdminPanel_Management_CompetitionPlan";
