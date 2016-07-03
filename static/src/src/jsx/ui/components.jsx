import { _ } from "l10n/loader";


export class Loader extends React.Component {
    render() {
        return <table style={{ "height": "100%", "width": "100%" }}><tbody><tr>
            <td style={{ "textAlign": "center" }}>
                <img src="/static/img/ajax-loader.gif" />
            </td>
        </tr></tbody></table>
    }
}

class ConnectionStatusMock {
    setOk() {}
    setFail() {}
}

class ConnectionStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "connected": null,
        };
    }
    componentWillUnmount() {
        this.stopInterval();
    }
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
    startInterval() {
        if (this.interval) {
            return
        }
        this.interval = setInterval(() => {
            this.setState({
                tick: !this.state.tick,
            });
        }, 750);
    }
    stopInterval() {
        if (!this.interval) {
            return
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
    render() {
        if (this.state.connected) {
            return <div className="connection-status ok"></div>
        }
        if (this.state.connected === null) {
            return (
                <div className="connection-status alert-warning">
                    { _("global.labels.connecting") }
                </div>
            )
        }
        return (
            <div className={ "connection-status alert-danger" + (this.state.tick ? " tick" : "") }>
                    { _("global.labels.connection_problem") }
            </div>
        )
    }
}

export var connection_status = ConnectionStatus.init();
