class TabletSelectorInput extends React.Component {
    getButtonsCount() {
        return this.props.choices.length;
    }
    render() {
        var result = [];
        this.props.choices.forEach(function(el) {
            var key = el[0];
            var text = el[1];
            var active_class_name = (this.props.active == key) ? " active" : "";
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

class TabletScoreInput extends React.Component {
    updateScores(type, value) {
        console.log("updateScore", arguments);
        var new_score = $.extend({}, this.props.score.raw_data);
        new_score[type] = value;
        this.props.onScoreUpdate(new_score);
    }
    render() {
        return <div>
            <h3>Footwork, woman (% reduction):</h3>
            <TabletSelectorInput
                choices={ [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]] }
                active={ this.props.score.raw_data.fw_woman }
                onValueUpdate={ this.updateScores.bind(this, "fw_woman") } />
            <h3>Footwork, man (% reduction):</h3>
            <TabletSelectorInput
                choices={ [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]] }
                active={ this.props.score.raw_data.fw_man }
                onValueUpdate={ this.updateScores.bind(this, "fw_man") } />
            <h3>Dance figures:</h3>
            <TabletIntegerInput
                min={ 0 }
                max={ 25 }
                active={ this.props.score.raw_data.dance_figs }
                onValueUpdate={ this.updateScores.bind(this, "dance_figs") } />
            <h3>Composition:</h3>
            <TabletIntegerInput
                min={ 0 }
                max={ 20 }
                active={ this.props.score.raw_data.composition }
                onValueUpdate={ this.updateScores.bind(this, "composition") } />
            <table className="mistakes full-width"><tbody><tr>
                <td>
                    <h3>Small mistakes (-5):</h3>
                    <TabletNumberInput
                        value={ this.props.score.raw_data.small_mistakes }
                        onValueUpdate={ this.updateScores.bind(this, "small_mistakes") } />
                </td><td>
                    <h3>Big mistakes (-30):</h3>
                    <TabletNumberInput
                        value={ this.props.score.raw_data.big_mistakes }
                        onValueUpdate={ this.updateScores.bind(this, "big_mistakes") } />
                </td>
            </tr></tbody></table>
            <div className="total-score">Total score: { this.props.score.total_score }</div>
        </div>
    }
}
