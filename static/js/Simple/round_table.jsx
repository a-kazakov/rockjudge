var AdminTourTableScoreCell = React.createClass({
    getInitialState: function() {
        window.message_dispatcher.subscribe("score_update", this.dispatchScoreUpdate);
        return {
            score: this.props.score,
        };
    },
    render: function() {
        return (
            <td onClick={ this.onClick }>{ this.state.score }</td>
        );
    },
    dispatchScoreUpdate: function(data) {
        if (data["run_id"] == this.props.run_id && data["judge_id"] == this.props.judge_id) {
            this.setState({
                score: data["score"],
            });
        }
    },
    updateScore: function() {
        var new_score = prompt("Enter new value");
        this.setState({
            score: "...",
        });
        $.ajax({
            url: "/api",
            method: "POST",
            data: {
                method: "set_judge_score",
                judge: this.props.judge_id,
                run: this.props.run_id,
                score: new_score,
            },
            success: function(data) {
                this.setState({
                    score: new_score,
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                this.setState({
                    score: "ERROR",
                });
            }.bind(this),
        });
    },
    onClick: function() {
        this.updateScore();
    },
});

var AdminTourTableScoreRow = React.createClass({
    render: function() {
        var cells = [];
        for (var i = 0; i < this.props.run.scores.length; ++i) {
            cells.push(<AdminTourTableScoreCell
                score={this.props.run.scores[i]}
                judge_id={this.props.judge_ids[i]}
                run_id={this.props.run.run_id} />);
        }
        return (
            <tr>
                <th>{ this.props.run.participant }</th>
                <td>{ this.props.run.heat }</td>
                { cells }
            </tr>
        );
    }
})

var AdminTourTable = React.createClass({
    getInitialState : function() {
        window.message_dispatcher.subscribe("round_update", this.dispatchRoundUpdate);
        return {};
    },
    dispatchRoundUpdate: function(data) {
        if (data["round_id"] == this.props.round_id) {
            window.location.href = window.location.href;
        }
    },
    render: function() {
        judges = this.props.data.judges.map(function(judge) {
            return <th>{ judge.name }</th>;
        });
        judge_ids = this.props.data.judges.map(function(judge) {
            return judge.id;
        });
        rows = this.props.data.runs.map(function(run) {
            return <AdminTourTableScoreRow
                run={run}
                judge_ids={judge_ids} />;
        });
        return (
            <table border="1">
                <tr>
                    <th>Participant</th>
                    <th>Heat</th>
                    { judges }
                </tr>
                { rows }
            </table>
        )
    }
});
