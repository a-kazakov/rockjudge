import { _ } from "l10n/loader";


export function onTouchOrClick(handler) {
    let f = (event) => {
        event.preventDefault();
        return handler(event);
    };
    return {
        onTouchStart: f,
        onClick: f,
    }
}

export function onTouchEndOrClick(handler, prevent_default) {
    let _handler = () => {};
    let distance = 0;
    let latest_pos = [0, 0];
    let fire = (event) => {
        event.preventDefault();
        return _handler();
    }
    let discard = () => {
        _handler = () => {};
    }
    let move = (event) => {
        let current_pos = [event.touches[0].pageX, event.touches[0].pageY];
        let sqr = (x) => x * x;
        distance += Math.sqrt(sqr(current_pos[0] - latest_pos[0]) + sqr(current_pos[1] - latest_pos[1]));
        latest_pos = current_pos;
        if (distance > 20) {
            discard();
        }
    }
    let start = (event) => {
        _handler = handler;
        distance = 0;
        latest_pos = [event.touches[0].pageX, event.touches[0].pageY];
    }
    return {
        onTouchStart: start,
        onTouchEnd: fire,
        onTouchMove: move,
        onTouchCancel: discard,
        onClick: handler,
    }
}

export class Slider extends React.Component {
    static get propTypes() {
        return {
            done: React.PropTypes.bool,
            doneText: React.PropTypes.string,
            slideText: React.PropTypes.string,
            onActivate: React.PropTypes.func,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            touch: false,
            finished: false,
        };
        this.pin = null;
    }
    componentWillUpdate(nextProps) {
        if (!this.props.done && nextProps.done) {
            this.setState({
                finished: false,
            });
        }
    }
    isFree() {
        return !this.state.touch && !this.props.done && !this.state.finished;
    }
    getOuterTextOpacity() {
        if (this.state.finished) {
            return 0;
        }
        let value = Math.min(Math.max(100 - this.state.position, 0), 100);
        return (value / 100).toFixed(3);
    }
    getElementOffset(element) {
        let res = 0;
        while (element) {
            res += element.offsetLeft || 0;
            element = element.parentNode;
        }
        return res;
    }
    getTouch(event) {
        let touch = event.touches[0];
        let parent = event.target.parentNode;
        return touch.pageX - this.getElementOffset(parent);
    }
    getRelativeTouch(event) {
        let touch = event.touches[0];
        let parent = event.target;
        return touch.pageX - this.getElementOffset(parent);
    }
    getSliderPos(event) {
        let pos = this.getTouch(event) - this.pin;
        return Math.min(Math.max(pos, 0), 200);
    }
    onClick = (event) => {
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            posision: 200,
            touch: false,
            finished: true,
        });
        this.props.onActivate();
    }
    onTouchStart = (event) => {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.pin = this.getRelativeTouch(event);
        this.setState({
            position: this.getSliderPos(event),
            touch: true,
        });
    }
    onTouchMove = (event) => {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            position: this.getSliderPos(event),
        });
    }
    onTouchEnd = (event) => {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        if (this.state.position === 200) {
            this.setState({
                position: 0,
                finished: true,
                touch: false,
            });
            this.props.onActivate();
        } else {
            this.setState({
                position: 0,
                touch: false,
            });
        }
    }
    render() {
        return <div className="slider noselect">
            <div className={"inner" + (this.isFree() ? " free" : "")}
                style={{ left: (this.props.done || this.state.finished) ? "200px" : this.state.position + "px" }}
                onTouchStart={ this.onTouchStart }
                onTouchMove={ this.onTouchMove }
                onTouchEnd={ this.onTouchEnd }
                onClick={ this.onClick }
            >
                →
            </div>
            { this.props.done
                ? <span
                    style={{ color: "rgb(100,100,100)" }}
                    className={ "done-text" }
                  >
                        { this.props.doneText }
                </span>
                : <span
                    style={{ color: "rgba(100,100,100," + this.getOuterTextOpacity() + ")" }}
                    className={ "slide-text" + (this.isFree() ? " free" : "") }
                  >
                        { this.props.slideText }
                </span>
            }
        </div>
    }
}


export class TabletSelectorInput extends React.Component {
    static get propTypes() {
        return {
            style: React.PropTypes.string,
            choices: React.PropTypes.array.isRequired,
            rowSize: React.PropTypes.number,
            active: React.PropTypes.number,
            onValueUpdate: React.PropTypes.func.isRequired,
        };
    }
    getButtonsCount() {
        if (this.props.style === "grid") {
            return this.props.rowSize;
        }
        return this.props.choices.length;
    }
    onClick(n) {
        this.props.onValueUpdate(n);
    }
    render() {
        let result = [];
        this.props.choices.forEach((el, idx) => {
            let key = el[0];
            let text = el[1];
            let active_class_name = (this.props.value === key) ? " active" : "";
            result.push(
                <button
                    key={ key }
                    {...onTouchOrClick(this.onClick.bind(this, key))}
                    className={ "tbtn score-btn" + active_class_name }
                >
                    {text}
                </button>);
            if (this.props.style === "grid" && (idx + 1) % this.props.rowSize === 0) {
                result.push(<br key={ "br" + idx } />)
            }
        });
        let layout_class = (this.props.style !== "two-lines") ? "selector-layout" : "selector-layout-2rows";
        let selected_class = this.props.value === null ? "" : " selected"
        return <div className={"scoring-layout " + layout_class + selected_class + " n-" + this.getButtonsCount().toString() }>{ result }</div>
    }
}

export class TabletIntegerSelectInput extends React.Component {
    static get propTypes() {
        return {
            min: React.PropTypes.number.isRequired,
            max: React.PropTypes.number.isRequired,
        };
    }
    createArray(min, max) {
        let result = [];
        for (let idx = min; idx <= max; ++idx) {
            result.push([idx, idx.toString()]);
        }
        return result;
    }
    render() {
        return (
            <TabletSelectorInput
                choices={ this.createArray(this.props.min, this.props.max) }
                { ...this.props }
            />
        )
    }
}

export class TabletPoint5SelectInput extends React.Component {
    static get propTypes() {
        return {
            min: React.PropTypes.number.isRequired,
            max: React.PropTypes.number.isRequired,
        };
    }
    createArray(min, max) {
        let result = [];
        for (let idx = Math.round(2 * min); idx <= Math.round(2 * max); ++idx) {
            result.push([idx / 2, (idx % 2) ? (idx / 2).toFixed(1) : Math.floor(idx / 2).toString()]);
        }
        return result;
    }
    render() {
        return (
            <TabletSelectorInput
                choices={ this.createArray(this.props.min, this.props.max) }
                { ...this.props }
            />
        )
    }
}

export class TabletIntegerInput extends React.Component {
    static get propTypes() {
        return {
            value: React.PropTypes.number.isRequired,
            onValueUpdate: React.PropTypes.func.isRequired,
            sendDeltas: React.PropTypes.bool,
        };
    }
    static get defaultProps() {
        return {
            sendDeltas: false,
        }
    }
    onMinus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({"delta": -1});
        } else {
            this.props.onValueUpdate(this.props.value - 1);
        }
    }
    onPlus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({"delta": 1});
        } else {
            this.props.onValueUpdate(this.props.value + 1);
        }
    }
    render() {
        return (
            <div className="tablet-integer-input">
                <button
                    className="tbtn btn-minus"
                    {...onTouchOrClick(this.onMinus.bind(this))}
                >
                    &minus;
                </button>
                <div className="value">
                    { this.props.value }
                </div>
                <button
                    className="tbtn btn-plus"
                    {...onTouchOrClick(this.onPlus.bind(this))}
                >
                    +
                </button>
            </div>
        )
    }
}

export class TabletAcroOverrideInput extends React.Component {
    static get propTypes() {
        return {
            value: React.PropTypes.number.isRequired,
            original_value: React.PropTypes.number.isRequired,
            send_deltas: React.PropTypes.bool,
            onValueUpdate: React.PropTypes.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            send_deltas: false,
        }
    }
    onMinus = () => {
        if (this.props.send_deltas) {
            this.props.onValueUpdate({"delta": -0.5});
        } else {
            this.props.onValueUpdate(Math.max(this.props.value - 0.5, 0));
        }
    }
    onPlus = () => {
        if (this.props.send_deltas) {
            this.props.onValueUpdate({"delta": 0.5});
        } else {
            this.props.onValueUpdate(Math.min(this.props.value + 0.5, this.props.original_value));
        }
    }
    onZero = () => {
        this.props.onValueUpdate(0);
    }
    onRestore = () => {
        this.props.onValueUpdate(this.props.original_value);
    }
    render() {
        let value_changed = Math.abs(this.props.value - this.props.original_value);
        return (
            <div className="tablet-acro-override-input">
                <div className="buttons">
                    <button
                        className="tbtn btn-zero"
                        disabled={ this.props.value < 0.05 }
                        {...onTouchOrClick(this.onZero)}
                    >
                        ↓0
                    </button>
                    <button
                        className="tbtn btn-restore"
                        disabled={ value_changed < 0.05 }
                        {...onTouchOrClick(this.onRestore)}
                    >
                        ↑
                    </button>
                    <button
                        className="tbtn btn-minus"
                        disabled={ this.props.value < 0.05 }
                        {...onTouchOrClick(this.onMinus)}
                    >
                        &minus;
                    </button>
                    <button
                        className="tbtn btn-plus"
                        disabled={ this.props.original_value < this.props.value + 0.05 }
                        {...onTouchOrClick(this.onPlus)}
                    >
                        +
                    </button>
                </div>
                <div className="value">
                    { value_changed
                        ? `${this.props.original_value.toFixed(1)} → ${this.props.value.toFixed(1)}`
                        : this.props.value.toFixed(1) }
                </div>
            </div>
        )
    }
}

var stopwatches = {};

export class StopWatch extends React.Component {
    static get propTypes() {
        return {
            score_id: React.PropTypes.number,
        };
    }
    constructor(props) {
        super(props);
        this.state = stopwatches[this.props.score_id] || {
            active: false,
            value: 0,
            str_value: "0:00",
            interval: null,
        };
        if (this.state.active) {
            this.state.interval = setInterval(this.tick.bind(this), 10);  // eslint-disable-line react/no-direct-mutation-state
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
        stopwatches[this.props.score_id] = this.state;
    }
    now() {
        return (new Date()).getTime();
    }
    toggle() {
        this.state.active ? this.stop() : this.start();
    }
    start() {
        this.setState({
            active: true,
            start_at: this.now() - this.state.value,
            interval: setInterval(this.tick.bind(this), 10),
        });
    }
    stop() {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: this.value(),
        });
    }
    reset() {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: 0,
        });
    }
    value() {
        return this.state.active
            ? (this.now() - this.state.start_at)
            : this.state.value;
    }
    tick() {
        var new_value = this.value();
        if (new_value !== this.state.value) {
            this.setState({
                value: this.value(),
            });
        }
    }
    pad(num, size) {
        var s = "0000" + num.toString();
        return s.substr(s.length - size);
    }
    getStrValue() {
        var val = this.value();
        var m = 0, s = 0;
        var result = '';
        m = Math.floor(val / (60 * 1000));
        val %= 60 * 1000;
        s = Math.floor(val / 1000);
        return m.toString() + ':' + this.pad(s, 2);
    }
    render() {
        return (
            <div className="stopwatch">
                <button
                    className="tbtn btn-reset ignore-readonly"
                    {...onTouchOrClick(this.reset.bind(this))}
                >
                    { _("tablet.buttons.reset_stopwatch") }
                </button>
                <button
                    className={ "tbtn btn-toggle ignore-readonly" + (this.state.active ? " active" : "") }
                    {...onTouchOrClick(this.toggle.bind(this))}
                >
                    { this.state.active ? _("tablet.buttons.stop_stopwatch") : _("tablet.buttons.start_stopwatch") }
                </button>
                <div className="time">
                    { this.getStrValue() }
                </div>
            </div>
        )
    }
}
