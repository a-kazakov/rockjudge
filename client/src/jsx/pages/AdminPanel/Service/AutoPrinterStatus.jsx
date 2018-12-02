import React from "react";

import PT from "prop-types";
import _ from "l10n";
import Loader from "common/components/Loader";

let auto_printer = null;

export default class AutoPrinterStatus extends React.Component {
    static propTypes = {
        competition: PT.shape({
            id: PT.number.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            available: null,
        };
    }

    componentDidMount() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5949", true);
        xhr.onload = () => this.setState({ available: true });  //eslint-disable-line react/no-did-mount-set-state
        xhr.onerror = () => this.setState({ available: false });  //eslint-disable-line react/no-did-mount-set-state
        xhr.send();
    }

    handleClick = () => {
        if (!auto_printer || auto_printer.closed) {
            auto_printer = window.open(
                `/printer/${ this.props.competition.id }`,
                "printer",
                "resizable=yes,location=no"
            );
        } else {
            auto_printer.focus();
        }
    }

    render() {
        if (this.state.available == null) {
            return <Loader />
        }
        if (!this.state.available) {
            return (
                <div className="auto-printer-status fail">
                    <p>
                        { _("admin.alerts.auto_printer_not_available") }
                    </p>
                </div>
            );
        }
        return (
            <div className="auto-printer-status ok">
                <p>
                    { _("admin.alerts.auto_printer_available") }
                </p>
                <button
                    type="button"
                    onClick={ this.handleClick }
                >
                    { _("admin.buttons.launch_auto_printer") }
                </button>
            </div>
        )
    }
}
