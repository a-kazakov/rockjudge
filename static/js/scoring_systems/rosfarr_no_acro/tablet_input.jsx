React.initializeTouchEvents(true);

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
                onClick={ this.onClick.bind(this, key) }
                className={ "score-btn" + active_class_name }
            >{text}</button>);
        }.bind(this));
        var layout_class = (this.getButtonsCount() <= 10) ? "selector-layout" : "selector-layout-2rows";
        return <div className={"scoring-layout " + layout_class + " n-" + this.getButtonsCount().toString() }>{ result }</div>
    }
    onClick(n) {
        this.props.onValueUpdate(n);
    }
}

class TabletIntegerInput extends React.Component {
    createArray(min, max) {
        var result = [];
        for (var idx = min; idx <= max; ++idx) {
            result.push([idx, idx.toString()]);
        }
        return result;
    }
    render() {
        var {min, max, ...other} = this.props;
        return <TabletSelectorInput { ...other } choices={ this.createArray(min, max) } />
    }
    onClick(n) {
        this.props.onValueUpdate(n);
    }
}

class TabletNumberInput extends React.Component {
    render() {
        return <div className="tablet-number-input">
            <button className="btn btn-minus" onClick={ this.onMinus.bind(this) }>&minus;</button>
            <div className="value">{ this.props.value }</div>
            <button className="btn btn-plus" onClick={ this.onPlus.bind(this) }>+</button>
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
            <button className="btn-toggle" onClick={ this.toggle.bind(this) }>
                { this.state.active ? "Stop" : "Start" }
            </button>
            <button className="btn-reset" onClick={ this.reset.bind(this) }>Reset</button>
            <div className="time">{ this.getStrValue() }</div>
        </div>
    }
}

class TabletScoreInput extends React.Component {
    updateScores(type, value) {
        var score = this.props.scores[this.props.judge_id];
        var new_score = $.extend({}, score.raw_data);
        new_score[type] = value;
        this.props.onScoreUpdate(new_score);
    }
    getCurrentJudge() {
        for (var idx in this.props.judges) if (this.props.judges.hasOwnProperty(idx)) {
            if (this.props.judges[idx].id == this.props.judge_id) {
                return this.props.judges[idx];
            }
        }
    }
    renderHeadJudgeInput() {
        var tech_judges = this.props.judges.filter(function(judge) {
            return judge.role == "tech_judge";
        }).map(function(judge) {
            var timing_data = (this.props.scores[judge.id].raw_data.timing_violation === null)
                ? ["-", ""]
                : (this.props.scores[judge.id].raw_data.timing_violation ? ["X", " fail"] : ["OK", " ok"])
            return <div>
                <h3>{ judge.name }:</h3>
                <div className="tech-judge-info">
                    <div className="title">
                        Jump steps:
                    </div>
                    <div className="value">
                        { this.props.scores[judge.id].raw_data.jump_steps }
                    </div>
                </div>
                <div className="tech-judge-info">
                    <div className="title">
                        Timing:
                    </div>
                    <div className={ "value" + timing_data[1] }>
                        { timing_data[0] }
                    </div>
                </div>
            </div>
        }.bind(this));
        var score = this.props.scores[this.props.judge_id];
        return <div>
            <h3>Penalty type:</h3>
            <TabletSelectorInput
                choices={ [[0, "OK"], [-5, "Yellow card"], [-30, "Red card"], [-100, "-100"]] }
                active={ score.raw_data.penalty }
                onValueUpdate={ this.updateScores.bind(this, "penalty") } />
            <div className="spacer"></div>
            { tech_judges }
        </div>
    }
    renderTechJudgeInput() {
        var score = this.props.scores[this.props.judge_id];
        return <div>
            <h3>Jump steps count:</h3>
            <TabletNumberInput
                value={ score.raw_data.jump_steps }
                onValueUpdate={ this.updateScores.bind(this, "jump_steps") } />
            <div className="spacer"></div>
            <h3>Dancing time:</h3>
            <StopWatch />
            <TabletSelectorInput
                choices={ [[true, "X"], [null, "-"], [false, "OK"]] }
                active={ score.raw_data.timing_violation }
                onValueUpdate={ this.updateScores.bind(this, "timing_violation") } />
        </div>
    }
    renderLineJudgeInput() {
        var score = this.props.scores[this.props.judge_id];
        return <div>
            <h3>Footwork, woman (% reduction):</h3>
            <TabletSelectorInput
                choices={ [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]] }
                active={ score.raw_data.fw_woman }
                onValueUpdate={ this.updateScores.bind(this, "fw_woman") } />
            <h3>Footwork, man (% reduction):</h3>
            <TabletSelectorInput
                choices={ [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]] }
                active={ score.raw_data.fw_man }
                onValueUpdate={ this.updateScores.bind(this, "fw_man") } />
            <h3>Dance figures:</h3>
            <TabletIntegerInput
                min={ 0 }
                max={ 25 }
                active={ score.raw_data.dance_figs }
                onValueUpdate={ this.updateScores.bind(this, "dance_figs") } />
            <h3>Composition:</h3>
            <TabletIntegerInput
                min={ 0 }
                max={ 20 }
                active={ score.raw_data.composition }
                onValueUpdate={ this.updateScores.bind(this, "composition") } />
            <table className="mistakes full-width"><tbody><tr>
                <td>
                    <h3>Small mistakes (-5):</h3>
                    <TabletNumberInput
                        value={ score.raw_data.small_mistakes }
                        onValueUpdate={ this.updateScores.bind(this, "small_mistakes") } />
                </td><td>
                    <h3>Big mistakes (-30):</h3>
                    <TabletNumberInput
                        value={ score.raw_data.big_mistakes }
                        onValueUpdate={ this.updateScores.bind(this, "big_mistakes") } />
                </td>
            </tr></tbody></table>
            <div className="total-score">Total score: { score.total_score }</div>
        </div>
    }
    render() {
        switch (this.getCurrentJudge().role) {
        case "line_judge":
            return this.renderLineJudgeInput();
        case "head_judge":
            return this.renderHeadJudgeInput();
        case "tech_judge":
            return this.renderTechJudgeInput();
        default:
            console.log("Unknown judge role", this.props.judges[this.props.judge_id].role);
            return null;
        }
    }
}
