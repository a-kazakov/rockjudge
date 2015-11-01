React.initializeTouchEvents(true);


function onTouchOrClick(handler) {
    var f = function(event) {
        event.preventDefault();
        return handler();
    }
    return {
        onTouchStart: f,
        onClick: f,
    }
}

class TabletSelectorInput extends React.Component {
    getButtonsCount() {
        return this.props.choices.length;
    }
    render() {
        var result = [];
        this.props.choices.forEach(function(el) {
            var key = el[0];
            var text = el[1];
            var active_class_name = (this.props.active === key) ? " active" : "";
            result.push(<button
                key={key}
                {...onTouchOrClick(this.onClick.bind(this, key))}
                className={ "tbtn score-btn" + active_class_name }
            >{text}</button>);
        }.bind(this));
        var layout_class = (this.getButtonsCount() <= 10) ? "selector-layout" : "selector-layout-2rows";
        return <div className={"scoring-layout " + layout_class + " n-" + this.getButtonsCount().toString() }>{ result }</div>
    }
    onClick(n) {
        this.props.onValueUpdate(n);
    }
}

class TabletIntegerSelectInput extends React.Component {
    createArray(min, max) {
        let result = [];
        for (let idx = min; idx <= max; ++idx) {
            result.push([idx, idx.toString()]);
        }
        return result;
    }
    render() {
        let {min, max, ...other} = this.props;
        return <TabletSelectorInput { ...other } choices={ this.createArray(min, max) } />
    }
}

class TabletPointFiveSelectInput extends React.Component {
    createArray(min, max) {
        let result = [];
        for (let idx = 2 * min; idx <= 2 * max; ++idx) {
            result.push([idx / 2, (idx % 2) ? (idx / 2).toFixed(1) : Math.floor(idx / 2).toString()]);
        }
        return result;
    }
    render() {
        let {min, max, ...other} = this.props;
        return <TabletSelectorInput { ...other } choices={ this.createArray(min, max) } />
    }
}

class TabletIntegerInput extends React.Component {
    render() {
        return <div className="tablet-integer-input">
            <button className="tbtn btn-minus" {...onTouchOrClick(this.onMinus.bind(this))}>&minus;</button>
            <div className="value">{ this.props.value }</div>
            <button className="tbtn btn-plus" {...onTouchOrClick(this.onPlus.bind(this))}>+</button>
        </div>
    }
    onMinus() {
        if (this.props.value > 0) {
            this.props.onValueUpdate(this.props.value - 1);
        }
    }
    onPlus() {
        this.props.onValueUpdate(this.props.value + 1);
    }
}

class TabletPoint5Input extends React.Component {
    render() {
        return <div className="tablet-integer-input">
            <button className="tbtn btn-minus" {...onTouchOrClick(this.onMinus.bind(this))}>&minus;</button>
            <div className="value">{ this.props.value }</div>
            <button className="tbtn btn-plus" {...onTouchOrClick(this.onPlus.bind(this))}>+</button>
        </div>
    }
    onMinus() {
        if (this.props.value > 0) {
            this.props.onValueUpdate((Math.round(this.props.value * 2) - 1) / 2);
        }
    }
    onPlus() {
        this.props.onValueUpdate((Math.round(this.props.value * 2) + 1) / 2);
    }
}

class StopWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            value: 0,
            str_value: "0:00",
        };
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
        if (this.state.active) {
            this.setState({
                start_at: this.now(),
            });
        } else {
            this.setState({
                value: 0,
            });
        }
    }
    value() {
        return this.state.active
            ? (this.now() - this.state.start_at)
            : this.state.value;
    }
    tick() {
        var new_value = this.value();
        if (new_value != this.state.value) {
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
        return <div className="stopwatch">
            <button className={ "tbtn btn-toggle" + (this.state.active ? " active" : "") } {...onTouchOrClick(this.toggle.bind(this))}>
                { this.state.active ? _("tablet.buttons.stop_stopwatch") : _("tablet.buttons.start_stopwatch") }
            </button>
            <button className="tbtn btn-reset" {...onTouchOrClick(this.reset.bind(this))}>
                { _("tablet.buttons.reset_stopwatch") }
            </button>
            <div className="time">{ this.getStrValue() }</div>
        </div>
    }
}