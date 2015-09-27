class TabletIntegerInput extends React.Component {
    render() {
        var result = [];
        for (var n = this.props.min; n <= this.props.max; ++n) {
            if (this.props.active == n) {
                result.push(<button
                    key={n}
                    onClick={ this.onClick.bind(this, n) }
                >[{n}]</button>);
            } else {
                result.push(<button
                    key={n}
                    onClick={ this.onClick.bind(this, n) }
                >{n}</button>);
            }
        }
        return <div>{ result }</div>
    }
    onClick(n) {
        this.props.onValueUpdate(n);
    }
}

class TabletSelectorInput extends React.Component {
    render() {
        var result = [];
        this.props.choices.forEach(function(el) {
            var key = el[0];
            var text = el[1];
            if (this.props.active == key) {
                result.push(<button
                    key={key}
                    onClick={ this.onClick.bind(this, key) }
                >[{text}]</button>);
            } else {
                result.push(<button
                    key={key}
                    onClick={ this.onClick.bind(this, key) }
                >{text}</button>);
            }
        }.bind(this));
        return <div>{ result }</div>
    }
    onClick(n) {
        this.props.onValueUpdate(n);
    }
}

class TabletScoreInput extends React.Component {
    updateScores(type, value) {
        var new_score = $.extend({}, this.props.score.raw_data);
        new_score[type] = value;
        this.props.onScoreUpdate(new_score);
    }
    render() {
        return <table>
            <tbody>
                <tr><th>Footwork man:</th><td>
                    <TabletSelectorInput
                        choices={ [[0, "0%"], [5, "5%"], [10, "10%"], [25, "25%"], [50, "50%"], [75, "75%"], [100, "X"]] }
                        active={ this.props.score.raw_data.fw_man }
                        onValueUpdate={ this.updateScores.bind(this, "fw_man") } />
                </td></tr>
                <tr><th>Footwork woman:</th><td>
                    <TabletSelectorInput
                        choices={ [[0, "0%"], [5, "5%"], [10, "10%"], [25, "25%"], [50, "50%"], [75, "75%"], [100, "X"]] }
                        active={ this.props.score.raw_data.fw_woman }
                        onValueUpdate={ this.updateScores.bind(this, "fw_woman") } />
                </td></tr>
                <tr><th>Dance figures:</th><td>
                    <TabletIntegerInput
                        min={ 0 }
                        max={ 25 }
                        active={ this.props.score.raw_data.dance_figs }
                        onValueUpdate={ this.updateScores.bind(this, "dance_figs") } />
                </td></tr>
                <tr><th>Composition:</th><td>
                    <TabletIntegerInput
                        min={ 0 }
                        max={ 20 }
                        active={ this.props.score.raw_data.composition }
                        onValueUpdate={ this.updateScores.bind(this, "composition") } />
                </td></tr>
            </tbody>
            <tfoot>
                <th>Total score:</th>
                <td>{ this.props.score.total_score }</td>
            </tfoot>
        </table>
    }
}
