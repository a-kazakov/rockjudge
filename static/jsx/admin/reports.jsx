class ReportsUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "page": null,
        };
    }
    switchPage(page, props) {
        this.setState({
            page: page,
            page_props: props,
        });
    }
    renderContent() {
        switch (this.state.page) {
        case "start_list":
            return <div className="ifw"><iframe src={ "/start_list/" + this.props.competition_id } /></div>
        case "competition_report":
            return <div className="ifw"><iframe src={ "/report/" + this.props.competition_id } /></div>
        case "inner_competition_results":
            return <div className="ifw"><iframe src={ "/ic/" + this.state.page_props.inner_competition_id.toString() + "/results" } /></div>
        case "tour_results":
            return <div className="ifw"><iframe src={ "/tour/" + this.state.page_props.tour_id.toString() + "/results" } /></div>
        case "manage_judges":
            return <JudgesManagementUI
                judges={ this.props.judges }
                competition_id={ this.props.competition_id } />
        }
    }
    render() {
        let ics = this.props.inner_competitions.map(function(ic) {
            let tours = ic.tours.map(function(tour) {
                return <div key={ tour.id }
                        className={ "level-2" + (
                            (this.state.page == "tour_results" && this.state.page_props.tour_id == tour.id )
                                ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "tour_results", { tour_id: tour.id }) }>
                    { tour.name }
                </div>
            }.bind(this));
            return <details open="true" className="block" key={ ic.id }>
                <summary className="level-1">
                    { ic.name }
                </summary>
                { tours }
                <div
                        className={ "level-2 new-ic" + (
                            (this.state.page == "inner_competition_results" && this.state.page_props.inner_competition_id == ic.id )
                                ? " active" : "") }
                        onClick={ this.switchPage.bind(this, "inner_competition_results", { inner_competition_id: ic.id }) }>
                    { _("admin.menu.inner_competition_results") }
                </div>
            </details>;

        }.bind(this));
        return <table className="app-content">
            <tbody><tr>
                <td className="side-panel">
                    <div className="block">
                        <div
                                className={ "level-1" + (this.state.page == "start_list" ? " active" : "") }
                                onClick= { this.switchPage.bind(this, "start_list") } >
                            { _("admin.menu.start_list") }
                        </div>
                    </div>
                    <div className="block">
                        <div
                                className={ "level-1" + (this.state.page == "competition_report" ? " active" : "") }
                                onClick= { this.switchPage.bind(this, "competition_report") } >
                            { _("admin.menu.competition_report") }
                        </div>
                    </div>
                    { ics }
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
