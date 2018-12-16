import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import makeClassName from "common/makeClassName";
import onTouchOrClick from "tablet_ui/onTouchOrClick";

let stopwatches = {};

export default class StopWatch extends React.Component {
    static propTypes = {
        readOnly: PT.bool,
        stopwatchId: PT.number.isRequired,
        value: PT.number,
        onChange: PT.func.isRequired,
    };
    static get defaultProps() {
        return {
            readOnly: false,
        };
    }

    static now() {
        return new Date().getTime();
    }

    constructor(props) {
        super(props);
        let state = stopwatches[this.props.stopwatchId] || {
            active: false,
            value: props.value != null ? props.value * 1000 : 0,
            interval: null,
        };
        if (state.active) {
            state.interval = setInterval(this.handleTick, 10);
        }
        this.state = state;
    }

    componentDidUpdate() {
        if (this.state.active && this.props.readOnly) {
            this.stop(true);
        }
        if (
            !this.state.active &&
            this.props.value != null &&
            this.props.value !== this.flooredStateValue()
        ) {
            this.setState({ value: this.props.value * 1000 });
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
        stopwatches[this.props.stopwatchId] = this.state;
    }

    isSynchronized() {
        return !this.active && this.flooredStateValue() === this.props.value;
    }
    flooredStateValue() {
        return Math.floor(this.state.value / 1000);
    }

    start() {
        this.setState({
            active: true,
            start_at: this.constructor.now() - this.state.value,
            interval: setInterval(this.handleTick, 10),
        });
    }
    stop(force_submit = false) {
        clearInterval(this.state.interval);
        this.submitValue(this.value(), force_submit);
        this.setState({
            active: false,
            value: this.value(),
        });
    }
    submitValue(value, force_submit = false) {
        let floored_value = Math.floor(value / 1000);
        if (floored_value === 0) {
            floored_value = null;
        }
        this.props.onChange(floored_value, force_submit);
    }

    handleToggle = () => {
        if (this.props.readOnly) {
            return;
        }
        if (this.state.active) {
            this.stop();
        } else {
            this.start();
        }
    };
    handleReset = () => {
        if (this.props.readOnly) {
            return;
        }
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: 0,
        });
        this.submitValue(0);
    };
    handleTick = () => {
        const new_value = this.value();
        if (new_value !== this.state.value) {
            this.setState({
                value: this.value(),
            });
        }
    };
    modStart(delta) {
        if (this.props.readOnly) {
            return;
        }
        const next_value = Math.max(0, this.state.value + 1000 * delta);
        this.setState({
            start_at: Math.min(
                this.state.start_at - 1000 * delta,
                this.constructor.now(),
            ),
            value: next_value,
        });
        if (!this.state.active) {
            this.submitValue(next_value);
        }
    }
    handleMinus10 = () => this.modStart(-10);
    handleMinus1 = () => this.modStart(-1);
    handlePlus1 = () => this.modStart(1);
    handlePlus10 = () => this.modStart(10);

    value() {
        return this.state.active
            ? this.constructor.now() - this.state.start_at
            : this.state.value;
    }

    pad(num, size) {
        const s = `0000${num}`;
        return s.substr(s.length - size);
    }
    getStrValue(val = null) {
        val = val == null ? this.value() : val;
        let m = 0,
            s = 0;
        m = Math.floor(val / (60 * 1000));
        val %= 60 * 1000;
        s = Math.floor(val / 1000);
        return `${m}:${this.pad(s, 2)}`;
    }

    getToggleButtonClassName() {
        return makeClassName({
            tbtn: true,
            "btn-toggle": true,
            active: this.state.active,
        });
    }
    getClassName() {
        return makeClassName({
            stopwatch: true,
            "read-only": this.props.readOnly,
        });
    }

    render() {
        return (
            <div className={this.getClassName()}>
                <button
                    className={this.getToggleButtonClassName()}
                    {...onTouchOrClick(this.handleToggle)}
                >
                    {this.state.active
                        ? _("tablet.buttons.stop_stopwatch")
                        : _("tablet.buttons.start_stopwatch")}
                </button>
                <button
                    className="tbtn btn-reset"
                    {...onTouchOrClick(this.handleReset)}
                >
                    {_("tablet.buttons.reset_stopwatch")}
                </button>
                <button
                    className="tbtn btn-ctl"
                    {...onTouchOrClick(this.handleMinus10)}
                >
                    &minus;10
                </button>
                <button className="tbtn btn-ctl" {...onTouchOrClick(this.handleMinus1)}>
                    &minus;1
                </button>
                <div
                    className={makeClassName({
                        time: true,
                        synchronized: this.isSynchronized(),
                    })}
                >
                    {this.getStrValue()}
                </div>
                <button className="tbtn btn-ctl" {...onTouchOrClick(this.handlePlus1)}>
                    +1
                </button>
                <button className="tbtn btn-ctl" {...onTouchOrClick(this.handlePlus10)}>
                    +10
                </button>
            </div>
        );
    }
}
