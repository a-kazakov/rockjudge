import _ from "l10n";

import NavButton from "./NavButton";

import ScoresTab from "./ScoresTab";
import HeatsTab from "./HeatsTab";
import TourResultsTab from "./TourResultsTab";
import DisciplineResultsTab from "./DisciplineResultsTab";

import ScoresTabButtons from "./ScoresTab/Buttons";
import HeatsTabButtons from "./HeatsTab/Buttons";
import TourResultsTabButtons from "./TourResultsTab/Buttons";
import DisciplineResultsTabButtons from "./DisciplineResultsTab/Buttons";

export default class TourPanel extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            discipline: PT.shape({
                name: PT.string.isRequired,
            }).isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
            }).isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            page: this.getPageFromHash(),
        };
    }

    componentWillReceiveProps(next_props) {
        if (next_props.tour.id !== this.props.tour.id) {
            this.setState({
                page: this.getDefaultPage(next_props.tour),
            });
        }
    }

    getDefaultPage(tour) {
        return (tour && tour.finalized)
            ? "results-1"
            : "tour-admin";
    }
    getPageFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[2]) {
            return chunks[2];
        }
        return this.getDefaultPage(this.props.tour);
    }

    handlePageSwitch = (page) => {
        this.setState({ page });
    }

    makeBodyRef = (ref) => this._body = ref;

    handleSignal = (message) => {
        if (this._body) {
            this._body.handleSignal(message);
        }
    }

    renderNavButton(code) {
        return (
            <NavButton
                active={ this.state.page === code }
                label={ _(`admin.judging-tabs.${code}`) }
                mkey={ code }
                onPageSwitch={ this.handlePageSwitch }
            />
        );
    }
    renderButtons() {
        const props = {
            tour: this.props.tour,
            onSignal: this.handleSignal,
        };
        switch (this.state.page) {
        case "tour-admin":
            return (
                <ScoresTabButtons { ...props } />
            );
        case "heats":
            return (
                <HeatsTabButtons { ...props } />
            )
        case "results-1":
        case "results-2":
        case "results-3":
            return (
                <TourResultsTabButtons { ...props } />
            );
        case "discipline-results":
            return (
                <DisciplineResultsTabButtons { ...props } />
            );
        default:
            console.error("Unknown page:", this.state.page);
        }
    }
    renderHeader() {
        return (
            <header className="app-header with-tabs">
                <div className="controls">
                    { this.renderButtons(this.props.tour) }
                </div>
                <h1>
                    { this.props.discipline.name }
                </h1>
                <h2>
                    { this.props.tour.name }
                </h2>
                <div className="clearfix" />
                <ul className="pull-right nav nav-tabs">
                    { this.renderNavButton("tour-admin") }
                    { this.renderNavButton("heats") }
                    { this.renderNavButton("results-1") }
                    { this.renderNavButton("results-2") }
                    { this.renderNavButton("results-3") }
                    { this.renderNavButton("discipline-results") }
                </ul>
                <div className="clearfix" />
            </header>
        );
    }
    renderBody() {
        const props = {
            tour: this.props.tour,
            ref: this.makeBodyRef,
            onPageSwitch: this.handlePageSwitch,
        };
        switch (this.state.page) {
        case "tour-admin":
            return <ScoresTab { ...props } />
        case "heats":
            return <HeatsTab { ...props } />
        case "results-1":
            return <TourResultsTab verbosity={ 1 } { ...props } />
        case "results-2":
            return <TourResultsTab verbosity={ 2 } { ...props } />
        case "results-3":
            return <TourResultsTab verbosity={ 3 } { ...props } />
        case "discipline-results":
            return (
                <DisciplineResultsTab
                    discipline={ this.props.discipline }
                    ref={ this.makeBodyRef }
                />
            );
        default:
            console.log("Unknown page:", this.state.page);
        }
    }
    render() {
        return (
            <div className="app-content">
                { this.renderHeader() }
                <div className="app-body">
                    { this.renderBody() }
                </div>
            </div>
        );
    }
}

TourPanel.displayName = "AdminPanel_Judging_TourPanel";
