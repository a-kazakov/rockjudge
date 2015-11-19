class PresenterTablet extends React.Component {

    // Intiialization

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
            current_heat: 1,
            active_tour_id: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        message_dispatcher.addListener("active_tour_update", this.dispatchActiveTourUpdate.bind(this));
        this.loadData();
    }
    reloadFromStorage() {
        let active_tour_id = this.state.active_tour_id;
        if (active_tour_id === null) {
            this.setState({
                tour: null,
            });
            return;
        }
        let active_tour_model = storage.get("Tour").by_id(active_tour_id);
        if (!active_tour_model) {
            this.setState({
                tour: null,
            });
            return;
        }
        this.setState({
            tour: active_tour_model.serialize({
                runs: {
                    participant: {
                        "club": {},
                        "sportsmen": {},
                    },
                },
                discipline: {},
            }),
        })
    }
    loadData() {
        Api("tour.find_active", {}).onSuccess(function(response) {
            this.dispatchActiveTourUpdate(response);
        }.bind(this)).send();
    }

    // Dispatchers

    dispatchActiveTourUpdate(response) {
        var tour_id = response.tour_id;
        if ((this.state.tour === null && tour_id === null) || (this.state.tour !== null && this.state.tour.id == tour_id)) {
            return;
        }
        this.setState({
            "active_tour_id": tour_id,
        });
        if (tour_id === null) {
            storage.del("Tour");
            storage.del("Run");
            storage.del("Participant");
            storage.del("Sportsman");
            storage.del("Club");
            storage.del("Discipline");
            this.setState({
                tour: null,
                current_heat: 1,
            });
            return;
        }
        Api("tour.get", { tour_id: tour_id, children:{
            runs: {
                participant: {
                    "club": {},
                },
            },
            discipline: {},
        }})
            .addToDB("Tour", tour_id)
            .onSuccess(function() {
                this.reloadFromStorage(tour_id);
                this.setState({
                    current_heat: 1,
                });
            }.bind(this))
            .send();
    }

    // Actions

    toPrevHeat() {
        this.setState({
            current_heat: this.state.current_heat - 1,
        });
    }
    toNextHeat() {
        this.setState({
            current_heat: this.state.current_heat + 1,
        });
    }

    // Helpers

    getHeatsCount() {
        return Math.max(...this.state.tour.runs.map((run) => run.heat));
    }

    // Rendering

    renderHeader() {
        var btn_prev = null;
        var btn_next = null;
        if (this.state.tour !== null) {
            if (this.state.current_heat > 1) {
                btn_prev = <button className="btn btn-primary pull-left" {...onTouchOrClick(this.toPrevHeat.bind(this))}>
                    { _("tablet.buttons.prev_heat") }
                </button>;
            }
            if (this.state.current_heat < this.getHeatsCount()) {
                btn_next = <button className="btn btn-primary pull-right" {...onTouchOrClick(this.toNextHeat.bind(this))}>
                    { _("tablet.buttons.next_heat") }
                </button>;
            }
        }
        var current_tour = (this.state.tour === null) ? null :
            <div className="header">
                <h1>{ this.state.tour.discipline.name }: { this.state.tour.name }</h1>
                <h2>{ _("tablet.headers.heat") }: { this.state.current_heat } / { this.getHeatsCount() }</h2>
            </div>
        return <header>
            { btn_prev }
            { btn_next }
            { current_tour }
        </header>
    }
    renderSplashScreen() {
        return <div>
            <header>
                <a className="btn btn-primary pull-left" href="/">
                    { _("tablet.buttons.to_start_page") }
                </a>
                <div className="clearfix"></div>
            </header>
            <div className="presenter-splash">{ _("tablet.headers.presenter") }</div>
        </div>;
    }
    renderHeat(heat, is_current) {
        let runs = this.state.tour.runs.filter((run) => run.heat == heat);
        return <div className={ "heat" + (is_current ? " current-heat" : "") }>
            <table className="outer"><tbody><tr>
            { runs.map(function(run) {
                return <td key={ run.id }><table><tbody>
                    <tr><td className="number">{ run.participant.number }</td></tr>
                    <tr><td className="name">{ run.participant.name }</td></tr>
                    <tr><td className="club">{ run.participant.club.name }</td></tr>
                    <tr><td className="city">{ run.participant.club.city }</td></tr>
                </tbody></table></td>;
            }) }
            </tr></tbody></table>
        </div>;
    }
    renderBody() {
        return <div>
            { this.renderHeat(this.state.current_heat - 1, false) }
            { this.renderHeat(this.state.current_heat, true) }
            { this.renderHeat(this.state.current_heat + 1, false) }
        </div>
    }
    render() {
        if (this.state.judge === null) {
            return <Loader />
        }
        if (this.state.tour === null) {
            return this.renderSplashScreen();
        }
        return <div>
            { this.renderHeader() }
            { this.renderBody() }
        </div>
    }
}
