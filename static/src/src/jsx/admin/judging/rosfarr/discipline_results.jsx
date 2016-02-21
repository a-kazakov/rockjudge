import { _ } from "i10n/loader";
import { onTouchEndOrClick } from "ui/tablet_components";


function __() {
    let args = [];
    for (let idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _("scoring_systems.rosfarr." + arguments[0], ...args);
}

export class DisciplineResultsTable extends React.Component {
    renderRowHeader(prev_row, next_row) {
        let need_render = (typeof prev_row === "undefined") || (prev_row.run.tour.id !== next_row.run.tour.id)
        if (!need_render) {
            return null;
        }
        return <tr key={ "H" + next_row.run.id }><th className="tour-name" colSpan="6">
            <p className="text-center">{ next_row.run.tour.name }</p>
        </th></tr>;
    }
    renderRow(row) {
        let p = row.run.participant;
        return <tr key={ "R" + row.run.id }>
            <td className="w-8 place"><p className="text-center">{ row.place === null ? "" : row.place }</p></td>
            <td className="w-8 number"><p className="text-center">{ p.number }</p></td>
            <td className="w-36" colSpan="2">
                <table className="sportsmen"><tbody>
                    { p.formation_name ? <tr><th colSpan="2"><p className="text-left">{ p.formation_name }</p></th></tr> : null }
                    { p.sportsmen.map((s, idx) => <tr key={ idx }>
                        <td className="w-75"><p>
                            { s.last_name + " " + s.first_name }
                            { s.substitute ? <i> ({ _("admin.labels.sub") }.)</i> : null }
                        </p></td>
                        <td className="w-25"><p className="text-center">{ s.year_of_birth }</p></td>
                    </tr> ) }
                </tbody></table>
            </td>
            <td className="w-24 club"><p>{ p.club.name }</p></td>
            <td className="w-24 coaches"><p>{ p.coaches.split(",").map((c) => [c.trim(), <br key="X" />]) }</p></td>
        </tr>;
    }
    renderRows() {
        let result = [];
        let table = this.props.table;
        for (let i = 0; i < table.length; ++i) {
            let header = this.renderRowHeader(table[i - 1], table[i]);
            header && result.push(header);
            result.push(this.renderRow(table[i]));
        }
        return result;
    }
    render() {
        return <div className="discipline-results">
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th className="w-8"><p>{ __("results.labels.place") }</p></th>
                        <th className="w-8"><p>{ __("results.labels.number") }</p></th>
                        <th className="w-27"><p>{ __("results.labels.sportsmen") }</p></th>
                        <th className="w-9"><p>{ __("results.labels.sportsmen_year_of_birth") }</p></th>
                        <th className="w-24"><p>{ __("results.labels.participant_club") }</p></th>
                        <th className="w-24"><p>{ __("results.labels.participant_coaches") }</p></th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderRows() }
                </tbody>
            </table>
        </div>;
    }
}

class DisciplineResultsPresenterTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        }
    }
    toggleActive() {
        this.setState({
            active: !this.state.active,
        });
    }
    render() {
        let p = this.props.participant;
        return <table className={ "row" + ( this.state.active ? " active" : "") }
                      {...onTouchEndOrClick(this.toggleActive.bind(this))}><tbody>
            <tr>
                <td className="place" rowSpan="3">
                    { this.props.place === null ? "" :
                        <div>{ this.props.place }
                            <div className="place-label">{ _("presenter.labels.place") }</div>
                        </div> }
                </td>
                <td className="number">{ p.number }</td>
                <td className="name">{ p.name }</td>
            </tr>
            <tr>
                <td className="club" colSpan="2">{ p.club.name }</td>
            </tr>
            <tr>
                <td className="coaches" colSpan="2">{ p.coaches }</td>
            </tr>
        </tbody></table>
    }
}

export class DisciplineResultsPresenterTable extends React.Component {
    renderRowHeader(prev_row, next_row) {
        let need_render = (typeof prev_row === "undefined") || (prev_row.run.tour.id !== next_row.run.tour.id)
        if (!need_render) {
            return null;
        }
        return <div className="tour-name" key={ "H" + next_row.run.id }>
            { next_row.run.tour.name }
        </div>
    }
    renderRow(row) {
        return <DisciplineResultsPresenterTableRow key={ "R" + row.run.id }
                                                   participant={ row.run.participant }
                                                   place={ row.place } />
    }
    renderRows() {
        let result = [];
        let table = this.props.table;
        for (let i = table.length - 1; i >= 0; --i) {
            let header = this.renderRowHeader(table[i + 1], table[i]);
            header && result.push(header);
            result.push(this.renderRow(table[i]));
        }
        return result;
    }
    render() {
        return <div>
            { this.renderRows() }
        </div>
    }
}

class DisciplineResultsScreenOperatorTableRow extends React.Component {
    render() {
        let p = this.props.participant;
        return <table className={ "row" + ( this.props.selected ? " selected" : "") }
                      {...onTouchEndOrClick(this.props.onClick)}><tbody>
            <tr>
                <td className="place" rowSpan="2">
                    { this.props.place === null ? "" :
                        <div>{ this.props.place }
                            <div className="place-label">{ _("presenter.labels.place") }</div>
                        </div> }
                </td>
                <td className="number">{ p.number }</td>
                <td className="name">{ p.name }</td>
            </tr>
            <tr>
                <td className="club" colSpan="2">{ p.club.name }</td>
            </tr>
        </tbody></table>
    }
}

export class DisciplineResultsScreenOperatorTable extends React.Component {
    renderRowHeader(prev_row, next_row) {
        let need_render = (typeof prev_row === "undefined") || (prev_row.run.tour.id !== next_row.run.tour.id)
        if (!need_render) {
            return null;
        }
        return <div className="tour-name" key={ "H" + next_row.run.id }>
            { next_row.run.tour.name }
        </div>
    }
    renderRow(row, place) {
        return <DisciplineResultsScreenOperatorTableRow
            key={ "R" + row.run.id }
            participant={ row.run.participant }
            place={ row.place }
            onClick={ () => this.props.onPlaceSelect(place) }
            selected={ this.props.selectedPlace !== null && place >= this.props.selectedPlace } />
    }
    renderRows() {
        let result = [];
        let table = this.props.table;
        for (let i = table.length - 1; i >= 0; --i) {
            let header = this.renderRowHeader(table[i + 1], table[i]);
            header && result.push(header);
            result.push(this.renderRow(table[i], i + 1));
        }
        return result;
    }
    render() {
        return <div>
            { this.renderRows() }
        </div>
    }
}
