import _ from "l10n";

import makeClassName from "common/makeClassName";
import onTouchOrClick from "tablet_ui/onTouchOrClick";

let stopwatches = {};

export default class StopWatch extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            scoreId: PT.number.isRequired,
            value: PT.number,
            onChange: PT.func.isRequired,
            readOnly: PT.bool,
        };
    }
    static get defaultProps() {
        return {
            readOnly: false,
        }
    }

    constructor(props) {
        super(props);
        let state = stopwatches[this.props.scoreId] || {
            active: false,
            value: 0,
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
    modStart(delta) {
        this.setState({
            start_at: Math.min(this.state.start_at - 1000 * delta, this.now()),
            value: Math.max(0, this.state.value + 1000 * delta),
        });
    }
    handleMinus10 = () => this.modStart(-10)
    handleMinus1 = () => this.modStart(-1)
    handlePlus1 = () => this.modStart(1)
    handlePlus10 = () => this.modStart(10)

    handleTimeSubmission = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(Math.floor(this.state.value / 1000));
    }

    handleTimeDiscard = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(null);
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
    getStrValue(val=null) {
        val = val === null ? this.value() : val;
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
    getClassName() {
        return makeClassName({
            "stopwatch": true,
            "read-only": this.props.readOnly,
        });
    }

    render() {
        return (
            <div className={ this.getClassName() }>
                <button
                    className={ this.getToggleButtonClassName() }
                    { ...onTouchOrClick(this.handleToggle) }
                >
                    { this.state.active
                        ? _("tablet.buttons.stop_stopwatch")
                        : _("tablet.buttons.start_stopwatch")
                    }
                </button>
                <button
                    className="tbtn btn-reset ignore-readonly"
                    { ...onTouchOrClick(this.handleReset) }
                >
                    { _("tablet.buttons.reset_stopwatch") }
                </button>
                <button
                    className="tbtn btn-ctl ignore-readonly"
                    { ...onTouchOrClick(this.handleMinus10 ) }
                >
                    &minus;10
                </button>
                <button
                    className="tbtn btn-ctl ignore-readonly"
                    { ...onTouchOrClick(this.handleMinus1 ) }
                >
                    &minus;1
                </button>
                <div className="time">
                    { this.getStrValue() }
                </div>
                <button
                    className="tbtn btn-ctl ignore-readonly"
                    { ...onTouchOrClick(this.handlePlus1 ) }
                >
                    +1
                </button>
                <button
                    className="tbtn btn-ctl ignore-readonly"
                    { ...onTouchOrClick(this.handlePlus10 ) }
                >
                    +10
                </button>
                <button
                    className="tbtn btn-submit-time"
                    { ...onTouchOrClick(this.handleTimeSubmission) }
                >
                    { _("tablet.buttons.submit_time") }
                </button>
                { this.props.value === null ? null : (
                    <button
                        className="tbtn btn-discard-time"
                        { ...onTouchOrClick(this.handleTimeDiscard) }
                    >
                        { _("tablet.buttons.discard_time") }
                    </button>
                ) }
                <div className="server-time">
                    { _("tablet.tech_judge.server_time", this.props.value === null ? null : this.getStrValue(this.props.value * 1000)) }
                </div>
            </div>
        )
    }
}
