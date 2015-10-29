class ReportsUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "page": this.getPageFromHash(),
            "page_props": this.getPagePropsFromHash(),
        };
    }
    switchPage(page, props) {
        this.setState({
            page: page,
            page_props: props,
        });
        let props_pairs = [];
        Object.getOwnPropertyNames(props).forEach((key) => {
            props_pairs.push([key, props[key]]);
        });
        window.location.hash = "#reports/" + page + "/" + props_pairs.map((p) => p.join("=")).join("$");
    }
    getPageFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[1] && ["start_list", "competition_report", "discipline_results", "tour_results" ].indexOf(chunks[1]) >= 0) {
            return chunks[1];
        }
        return null;
    }
    getPagePropsFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[2]) {
            let result = {};
            chunks[2].split("$").forEach(function(pair_str) {
                let pair = pair_str.split("=");
                result[pair[0]] = pair[1];
            });
            return result;
        }
        return {};
    }
    renderContent() {
        switch (this.state.page) {
        case "start_list":
            return <div className="ifw"><iframe src={ "/start_list/" + this.props.competition_id } /></div>
        case "competition_report":
            return <div className="ifw"><iframe src={ "/report/" + this.props.competition_id } /></div>
        case "discipline_results":
            return <div className="ifw"><iframe src={ "/ic/" + this.state.page_props.discipline_id.toString() + "/results" } /></div>
        case "tour_results":
            return <div className="ifw"><iframe src={ "/tour/" + this.state.page_props.tour_id.toString() + "/results" } /></div>
        }
    }
    render() {
        let ics = this.props.disciplines.map(function(ic) {
            let tours = ic.tours.map(function(tour) {
                return <div key={ tour.id }
                        className={ "level-2" + (
                            (this.state.page == "tour_results" && this.state.page_props.tour_id == tour.id )
                                ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "tour_results", { tour_id: tour.id }) }>
                    { tour.name }
                </div>
            }.bind(this));
            return <details className="block" key={ ic.id }>
                <summary className="level-1">
                    { ic.name }
                </summary>
                { tours }
                <div
                        className={ "level-2 new-ic" + (
                            (this.state.page == "discipline_results" && this.state.page_props.discipline_id == ic.id )
                                ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "discipline_results", { discipline_id: ic.id }) }>
                    { _("admin.menu.discipline_results") }
                </div>
            </details>;

        }.bind(this));
        return <table className="app-content">
            <tbody><tr>
                <td className="side-panel">
                    <div className="scroller">
                        <div className="block">
                            <div
                                    className={ "level-1" + (this.state.page == "start_list" ? " active" : "") }
                                    onClick= { this.switchPage.bind(this, "start_list", {}) } >
                                { _("admin.menu.start_list") }
                            </div>
                        </div>
                        <div className="block">
                            <div
                                    className={ "level-1" + (this.state.page == "competition_report" ? " active" : "") }
                                    onClick= { this.switchPage.bind(this, "competition_report", {}) } >
                                { _("admin.menu.competition_report") }
                            </div>
                        </div>
                        { ics }
                    </div>
                </td>
                <td>
                    <div className="app-page">
                        { this.renderContent() }
                    </div>
                </td>
            </tr></tbody>
        </table>;
    }
}
