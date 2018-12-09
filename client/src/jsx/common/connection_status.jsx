import React from "react";
import ReactDOM from "react-dom";

import _ from "l10n";

import makeClassName from "common/makeClassName";

class ConnectionStatusMock {
    setOk() {}
    setFail() {}
    setPendingData() {}
    setNoPendingData() {}
}

class ConnectionStatus extends React.Component {
    static init() {
        let element = window.document.getElementById("connection_status");
        if (element && !element.hasChildNodes()) {
            return ReactDOM.render(
                <ConnectionStatus />,
                element
            );
        }
        return new ConnectionStatusMock();
    }

    state = {
        connected: null,
        hasPendingData: false,
        showPendingData: false,
    };

    componentDidMount() {
        window.addEventListener("beforeunload", event => {
            if (this.state.hasPendingData) {
                event.preventDefault();
                event.returnValue = '';
            }
        })
    }

    componentWillUnmount() {
        this.stopInterval();
    }

    startInterval() {
        if (this.interval) {
            return;
        }
        this.interval = setInterval(() => {
            this.setState({
                tick: !this.state.tick,
            });
        }, 750);
    }
    stopInterval() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
        this.interval = null;
    }

    setOk() {
        this.stopInterval();
        this.setState({ connected: true, tick: false });
    }
    setFail() {
        this.startInterval();
        this.setState({ connected: false });
    }
    setPendingData() {
        if (this.state.hasPendingData) {
            return;
        }
        this.setState({
            hasPendingData: true,
            showPendingData: false,
        });
        setTimeout(
            () => this.setState(state => state.hasPendingData ? {showPendingData: true} : {}),
            2000,
        );
    }

    setNoPendingData() {
        this.setState({
            hasPendingData: false,
            showPendingData: false,
        });
    }

    getClassName() {
        return makeClassName({
            "connection-status": true,
            "error": true,
            "tick": this.state.tick,
        });
    }
    render() {
        if (this.state.connected) {
            if (this.state.showPendingData) {
                return (
                    <div className="connection-status warning">
                        { _("global.labels.data_pending") }
                    </div>
                );
            }
            return (
                <div className="connection-status ok" />
            );
        }
        if (this.state.connected == null) {
            return (
                <div className="connection-status waiting">
                    { _("global.labels.connecting") }
                </div>
            )
        }
        return (
            <div className={ this.getClassName() }>
                { this.state.hasPendingData
                    ? _("global.labels.connection_problem_data_pending")
                    : _("global.labels.connection_problem") }
            </div>
        )
    }
}

const connection_status = ConnectionStatus.init();
export default connection_status;
