import React from "react";

import TourSubscription from "common/server/Storage/subscriptions/TourSubscription";
import PT from "prop-types";

export default class TourLoader extends React.Component {
    static propTypes = {
        renderer: PT.func.isRequired,
        tour: PT.object.isRequired,
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

    render() {
        if (this.state.tourStorage == null) {
            return null;
        }
        const { renderer: RenderingComponent, ...props } = this.props;
        return <RenderingComponent {...props} />;
    }
}
