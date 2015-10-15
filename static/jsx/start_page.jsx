class RoleSelector extends React.Component {
    render() {
        let judges = this.props.competition.judges
        .filter((judge) => judge.role != "")
        .map(function(judge) {
            return <a href={ "/tablet/" + judge.id.toString() } className="btn btn-default btn-lg">
                { judge.role_description || _("global.phrases.judge_n", judge.number) }: { judge.name }
            </a>
        });
        return <div className="role-selector">
            <h3>{ _("start_page.headers.select_role") }</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="btn-group-vertical full-width">
                        <button className="btn btn-default btn-lg">
                            { _("start_page.roles.presenter") }
                        </button>
                        <a href={ "/admin/" + this.props.competition.id.toString() } className="btn btn-default btn-lg">
                            { _("start_page.roles.administrator") }
                        </a>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="btn-group-vertical full-width">
                        { judges }
                    </div>
                </div>
            </div>
        </div>
    }
}

class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.loadData();
        this.state = {
            all_loaded: false,
            selected_competition: null,
        }
    }
    loadCompetitionData(competition_id) {
        Api("tournaments.competition.get", {
            competition_id: competition_id,
            children: {
                judges: {},
            },
        })
        .updateDB("Competition", competition_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }
    loadData() {
        this.props.competition_ids.forEach(function(competition_id) {
            this.loadCompetitionData(competition_id);
        }.bind(this));
    }
    reloadFromStorage() {
        var SCHEMA = {
            judges: {},
        }
        let all_loaded = true;
        let competitions = this.props.competition_ids.map(function(competition_id) {
            let st_obj = storage.get("Competition").by_id(competition_id);
            if (!st_obj) {
                all_loaded = false;
                return null;
            }
            return st_obj.serialize(SCHEMA);
        });
        this.setState({
            competitions: competitions,
            all_loaded: all_loaded,
        });
    }
    selectCompetition(idx) {
        this.setState({
            selected_competition: idx,
        });
    }
    renderCompetitionSelector() {
        let comps = this.state.competitions.map(function(comp, idx) {
            return <div key={ comp.id } className="button" onClick={ this.selectCompetition.bind(this, idx) }>
                { comp.name }
            </div>
        }.bind(this));
        return <div className="competition-selector">
            <h3>{ _("start_page.headers.select_competition") }</h3>
            <div className="list">
                { comps }
            </div>
        </div>
    }
    render() {
        if (!this.state.all_loaded) {
            return <span>Loading ...</span>;
        }
        if (this.state.selected_competition !== null) {
            return <div className="start-screen">
                <RoleSelector competition={ this.state.competitions[this.state.selected_competition] } />
            </div>
        }
        if (this.state.competitions.length == 1) {
            return <div className="start-screen">
                <RoleSelector competition={ this.state.competitions[0] } />
            </div>
        }
        return <div className="start-screen">
            { this.renderCompetitionSelector() }
        </div>
    }
}
