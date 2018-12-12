import React from "react";

import Loader from "common/components/Loader";
import makeClassName from "common/makeClassName";
import TourSubscription from "common/server/Storage/subscriptions/TourSubscription";
import lastOf from "common/tools/lastOf";
import Header from "pages/PresenterTablet/HeatsPage/TourHeats/Header";
import PT from "prop-types";
import RunInfo from "./RunInfo";
import DefaultMap from "common/DefaultMap";

export default class TourHeats extends React.Component {
    static propTypes = {
        autoHeat: PT.bool.isRequired,
        layout: PT.oneOf(["large", "medium", "small"]).isRequired,
        tour: PT.object.isRequired,
    };

    static checkRunJudged(run) {
        if (run.status !== "OK") {
            return true;
        }
        let total_counts = new DefaultMap(() => 0);
        let conf_counts = new DefaultMap(() => 0);
        for (const score of run.scores) {
            const { role } = score.discipline_judge;
            total_counts.set(role, total_counts.get(role) + 1);
            if (score.confirmed) {
                conf_counts.set(role, conf_counts.get(role) + 1);
            }
        }
        for (const [role, conf_value] of conf_counts.entries()) {
            if (2 * conf_value >= total_counts.get(role)) {
                return true;
            }
        }
        return false;
    }

    constructor(props) {
        super(props);
        this.state = {
            tourStorage: null,
            heat: 1,
        };
    }

    componentDidMount() {
        this.subscribe();
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    UNSAFE_componentWIllReceiveProps(nextProps) {
        if (!nextProps.autoHeat && this.props.autoHeat) {
            this.setState({ heat: this.auto_heat_value });
        }
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

    get auto_heat_value() {
        for (const run of this.props.tour.runs) {
            if (!this.constructor.checkRunJudged(run)) {
                return run.heat;
            }
        }
        return Math.max(1, ...this.props.tour.runs.map(run => run.heat));
    }

    handleNextHeatClick = () => this.setState({ heat: this.state.heat + 1 });
    handlePrevHeatClick = () => this.setState({ heat: this.state.heat - 1 });

    getClassName() {
        return makeClassName({
            heats: true,
            [this.props.layout]: true,
        });
    }
    renderRun(run, layout) {
        return <RunInfo key={run.id} layout={layout} run={run} />;
    }
    render() {
        if (this.state.tourStorage == null) {
            return (
                <div className={this.getClassName()}>
                    <Loader />
                </div>
            );
        }
        const heat = this.props.autoHeat ? this.auto_heat_value : this.state.heat;
        const runs = this.props.tour.runs.filter(r => r.heat === heat);
        const run_layout = runs.length > 3 ? "small" : this.props.layout;
        const max_heat = lastOf(this.props.tour.runs)?.heat || 1;
        return (
            <div className={this.getClassName()}>
                <Header
                    heat={heat}
                    maxHeat={max_heat}
                    showButtons={!this.props.autoHeat}
                    tour={this.props.tour}
                    onNextHeatClick={this.handleNextHeatClick}
                    onPrevHeatClick={this.handlePrevHeatClick}
                />
                <div className="content">
                    {runs.map(r => this.renderRun(r, run_layout))}
                </div>
            </div>
        );
    }
}
