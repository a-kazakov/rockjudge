import _ from "l10n";

import makeClassName from "common/makeClassName";
import onTouchOrClick from "tablet_ui/onTouchOrClick";

let stopwatches = {};

export default class StopWatch extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            scoreId: PT.number.isRequired,
        };
    }

    constructor(props) {
        super(props);
        let state = stopwatches[this.props.scoreId] || {
            active: false,
            value: 0,
            str_value: "0:00",
            interval: null,
        };
        if (state.active) {
            state.interval = setInterval(this.handleTick, 10);
        }
        this.state = state;
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
        stopwatches[this.props.scoreId] = this.state;
    }

    now() {
        return (new Date()).getTime();
    }

    start() {
        this.setState({
            active: true,
            start_at: this.now() - this.state.value,
            interval: setInterval(this.handleTick, 10),
        });
    }
    stop() {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: this.value(),
        });
    }

    handleToggle = () => {
        if (this.state.active) {
            this.stop();
        } else {
            this.start();
        }
    }
    handleReset = () => {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: 0,
        });
    }
    handleTick = () => {
        const new_value = this.value();
        if (new_value !== this.state.value) {
            this.setState({
                value: this.value(),
            });
        }
    }

    value() {
        return this.state.active
            ? (this.now() - this.state.start_at)
            : this.state.value;
    }

    pad(num, size) {
        const s = `0000${num}`;
        return s.substr(s.length - size);
    }
    getStrValue() {
        let val = this.value();
        let m = 0, s = 0;
        m = Math.floor(val / (60 * 1000));
        val %= 60 * 1000;
        s = Math.floor(val / 1000);
        return `${m}:${this.pad(s, 2)}`;
    }

    getToggleButtonClassName() {
        return makeClassName({
            "tbtn": true,
            "btn-toggle": true,
            "ignore-readonly": true,
            "active": this.state.active,
        });
    }
    render() {
        return (
            <div className="stopwatch">
                <button
                    className="tbtn btn-reset ignore-readonly"
                    { ...onTouchOrClick(this.handleReset) }
                >
                    { _("tablet.buttons.reset_stopwatch") }
                </button>
                <button
                    className={ this.getToggleButtonClassName() }
                    { ...onTouchOrClick(this.handleToggle) }
                >
                    { this.state.active
                        ? _("tablet.buttons.stop_stopwatch")
                        : _("tablet.buttons.start_stopwatch")
                    }
                </button>
                <div className="time">
                    { this.getStrValue() }
                </div>
            </div>
        )
    }
}
