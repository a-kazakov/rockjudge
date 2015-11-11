class HeatsButtons extends React.Component {
    signal(message) {
        return (() => this.props.onSignal(message)).bind(this);
    }
    render() {
        return <div>
            <button className="btn btn-primary" onClick={ this.signal("docx") }>
                DOCX
            </button>
        </div>
    }
}

class HeatsBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
    }
    componentWillMount() {
        this.storage = storage.getDomain("heats_" + this.props.tour_id);
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.loadData();
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        storage.delDomain("heats_" + this.props.tour_id);
    }
    reloadFromStorage() {
        let SCHEMA = {
            discipline: {
                competition: {},
            },
            runs: {
                participant: {
                    club: {},
                }
            },
        }
        let serialized = this.storage.get("Tour")
            .by_id(this.props.tour_id)
            .serialize(SCHEMA);
        this.setState({
            tour: serialized,
        });
    }
    loadData() {
        Api("tour.get", {
            tour_id: this.props.tour_id,
            children: {
                discipline: {
                    competition: {},
                },
                runs: {
                    participant: {
                        club: {},
                    }
                },
            }
        })
        .addToDB("Tour", this.props.tour_id, this.storage)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    onSignal(message) {
        switch (message) {
        case "docx":
            this.createDocx();
            break;
        default:
            console.log("Unknown message:", message)
        }
    }
    renderHeatHeader(prev_row, next_row) {
        let need_render = (typeof prev_row == "undefined") || (prev_row.heat != next_row.heat)
        if (!need_render) {
            return null;
        }
        return <tr key={ "H" + next_row.heat }><th className="heat-number" colSpan="3">
            <p>{ _("global.phrases.heat_n", next_row.heat) }</p>
        </th></tr>;

    }
    renderHeatRow(row) {
        return <tr key={ "R" + row.id }>
            <td className="w-8"><p className="text-center">{ row.participant.number }</p></td>
            <td className="w-50"><p>{ row.participant.name }</p></td>
            <td className="w-42"><p>{ row.participant.club.name }</p></td>
        </tr>;
    }
    renderHeatRows() {
        let result = [];
        let runs = this.state.tour.runs;
        for (let i = 0; i < runs.length; ++i) {
            let header = this.renderHeatHeader(runs[i - 1], runs[i]);
            header && result.push(header);
            result.push(this.renderHeatRow(runs[i]));
        }
        return result;
    }
    render() {
        if (this.state.tour === null) {
            return <span>Loading ...</span>;
        }
        return <div className="tour-heats" ref="printable_heats">
            <table className="bordered-table"><thead>
                <tr>
                    <th className="w-8"><p>{ _("judging.labels.number") }</p></th>
                    <th className="w-46"><p>{ _("judging.labels.participant_name") }</p></th>
                    <th className="w-46"><p>{ _("judging.labels.club") }</p></th>
                </tr>
            </thead><tbody>
                { this.renderHeatRows() }
            </tbody></table>
        </div>
    }
    createDocx() {
        Docx("tour-heats")
            .setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date)
            .setTitle1(_("admin.headers.tour_heats"))
            .setTitle2(this.state.tour.discipline.name)
            .setTitle3(this.state.tour.name)
            .setBody(ReactDOM.findDOMNode(this.refs.printable_heats).innerHTML)
            .addStyle(".heat-number", "background", "#ccc")
            .addStyle(".heat-number", "text-align", "left")
            .addStyle("td, th", "font-size", "12pt")
            .save();
    }
}
