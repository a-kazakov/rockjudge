var AdminTourTableScoreCell = React.createClass({
  getInitialState: function() {
    return {
      score: this.props.score,
    };
  },
  render: function() {
    return (
      <td onClick={ this.onClick }>{ this.state.score }</td>
    );
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
  }
});

var AdminTourTableScoreRow = React.createClass({
  render: function() {
    var cells = [];
    for (var i = 0; i < this.props.data.scores.length; ++i) {
      cells.push(<AdminTourTableScoreCell
        score={this.props.data.scores[i]}
        judge_id={this.props.judge_ids[i]}
        run_id={this.props.data.run_id} />);
    }
    return (
      <tr>
        <th>{ this.props.data.participant }</th>
        { cells }
      </tr>
    );
  }
})

var AdminTourTable = React.createClass({
  render: function() {
    judges = this.props.data.judges.map(function(judge) {
      return <th>{ judge.name }</th>;
    });
    judge_ids = this.props.data.judges.map(function(judge) {
      return judge.id;
    });
    rows = this.props.data.scores.map(function(scores) {
      return <AdminTourTableScoreRow
        data={scores}
        judge_ids={judge_ids} />;
    });
    return (
      <table border="1">
        <tr>
          <th>Participant</th>
          { judges }
        </tr>
        { rows }
      </table>
    )
  }
});
