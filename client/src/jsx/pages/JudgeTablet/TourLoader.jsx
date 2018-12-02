import React from "react";

import Loader from "common/components/Loader";
import Model from "common/server/Storage/models/Model";
import TourSubscription from "common/server/Storage/subscriptions/TourSubscription";
import PT from "prop-types";
import rules_set from "rules_sets/loader";

export default class TourLoader extends React.Component {
    static propTypes = {
        disciplineJudge: PT.instanceOf(Model).isRequired,
        tour: PT.instanceOf(Model).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            tourStorage: null,
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
        this.props.tour.global_storage.subscribe(this._subscription).then(this.updateTourStorage);
    };
    unsubscribe() {
        this.props.tour.global_storage.unsubscribe(this._subscription);
    }

    updateTourStorage = (tourStorage) => {
        this.setState({tourStorage});
    };

    render() {
        if (!this.state.tourStorage) {
            return (
                <Loader />
            );
        }
        const JudgeTabletComponent = rules_set.judge_tablet;
        return (
            <JudgeTabletComponent
                disciplineJudge={ this.props.disciplineJudge }
                tour={ this.props.tour }
            />
        );
    }
}
