import React from "react";

import Loader from "common/components/Loader";
import Model from "common/server/Storage/models/Model";
import TourSubscription from "common/server/Storage/subscriptions/TourSubscription";
import _ from "l10n";
import PT from "prop-types";
import DisciplineResultsTab from "./DisciplineResultsTab";
import DisciplineResultsTabButtons from "./DisciplineResultsTab/Buttons";
import HeatsTab from "./HeatsTab";
import HeatsTabButtons from "./HeatsTab/Buttons";
import NavButton from "./NavButton";
import ScoresTab from "./ScoresTab";
import ScoresTabButtons from "./ScoresTab/Buttons";
import TourResultsTab from "./TourResultsTab";
import TourResultsTabButtons from "./TourResultsTab/Buttons";
import { consoleError } from "common/logging";

export default class TourPanel extends React.Component {
    static propTypes = {
        tour: PT.instanceOf(Model).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            tourStorage: null,
            page: this.getPageFromHash(),
        };
    }

    componentDidMount() {
        this.subscribe();
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    subscribe = () => {
        this._subscription = new TourSubscription(this.props.tour.id);
        this.props.tour.global_storage
            .subscribe(this._subscription)
            .then(this.updateTourStorage);
    };
    unsubscribe() {
        this.props.tour.global_storage.unsubscribe(this._subscription);
    }

    updateTourStorage = tourStorage => {
        this.setState({ tourStorage });
    };

    getDefaultPage() {
        return this.props.tour.finalized ? "results-1" : "tour-admin";
    }
    getPageFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[2]) {
            return chunks[2];
        }
        return this.getDefaultPage();
    }

    handlePageSwitch = page => {
        this.setState({ page });
        window.location.hash = `#judging/${this.props.tour.id}/${page}`;
    };

    makeBodyRef = ref => (this._body = ref);

    handleSignal = message => {
        if (this._body) {
            this._body.handleSignal(message);
        }
    };

    renderNavButton(code) {
        return (
            <NavButton
                active={this.state.page === code}
                label={_(`admin.judging-tabs.${code}`)}
                mkey={code}
                onPageSwitch={this.handlePageSwitch}
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
                return <ScoresTabButtons {...props} />;
            case "heats":
                return <HeatsTabButtons {...props} />;
            case "results-1":
            case "results-2":
            case "results-3":
                return <TourResultsTabButtons {...props} />;
            case "discipline-results":
                return <DisciplineResultsTabButtons {...props} />;
            default:
                consoleError("Unknown page:", this.state.page);
        }
    }
    renderHeader() {
        return (
            <header>
                <div className="controls">{this.renderButtons(this.props.tour)}</div>
                <h1>{this.props.tour.discipline.name}</h1>
                <h2>{this.props.tour.name}</h2>
                <div className="clearfix" />
                <nav>
                    {this.renderNavButton("tour-admin")}
                    {this.renderNavButton("heats")}
                    {this.renderNavButton("results-1")}
                    {this.renderNavButton("results-2")}
                    {this.renderNavButton("results-3")}
                    {this.renderNavButton("discipline-results")}
                </nav>
                <div className="clearfix" />
            </header>
        );
    }
    renderBody(tour) {
        const props = {
            tour: tour,
            ref: this.makeBodyRef,
            onPageSwitch: this.handlePageSwitch,
        };
        switch (this.state.page) {
            case "tour-admin":
                return <ScoresTab {...props} />;
            case "heats":
                return <HeatsTab {...props} />;
            case "results-1":
                return <TourResultsTab verbosity={1} {...props} />;
            case "results-2":
                return <TourResultsTab verbosity={2} {...props} />;
            case "results-3":
                return <TourResultsTab verbosity={3} {...props} />;
            case "discipline-results":
                return (
                    <DisciplineResultsTab
                        discipline={this.props.tour.discipline}
                        ref={this.makeBodyRef}
                    />
                );
            default:
                consoleError("Unknown page:", this.state.page);
        }
    }
    render() {
        if (!this.state.tourStorage) {
            return <Loader />;
        }
        const tour = this.state.tourStorage.getSame(this.props.tour);
        if (!tour) {
            return <Loader />;
        }
        return (
            <div className="TourPanel">
                {this.renderHeader()}
                <div className="body">{this.renderBody(tour)}</div>
            </div>
        );
    }
}
