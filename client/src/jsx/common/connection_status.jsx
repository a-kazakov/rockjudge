import _ from "l10n";

import makeClassName from "common/makeClassName";

class ConnectionStatusMock {
    setOk() {}
    setFail() {}
}

class ConnectionStatus extends React.PureComponent {
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

    constructor(props) {
        super(props);
        this.state = {
            "connected": null,
        };
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

    getClassName() {
        return makeClassName({
            "connection-status": true,
            "error": true,
            "tick": this.state.tick,
        });
    }
    render() {
        if (this.state.connected) {
            return (
                <div className="connection-status ok" />
            );
        }
        if (this.state.connected === null) {
            return (
                <div className="connection-status waiting">
                    { _("global.labels.connecting") }
                </div>
            )
        }
        return (
            <div className={ this.getClassName() }>
                { _("global.labels.connection_problem") }
            </div>
        )
    }
}

const connection_status = ConnectionStatus.init();
export default connection_status;
