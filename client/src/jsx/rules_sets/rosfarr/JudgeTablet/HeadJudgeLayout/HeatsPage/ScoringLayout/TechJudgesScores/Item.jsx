import _ from "l10n";

export default class Item extends React.Component {
    static get propTypes() {
        return {
            score: React.PropTypes.object.isRequired,
            judge: React.PropTypes.object.isRequired,
        };
    }
    getTimingData() {
        if (!this.props.score) {
            return ["-", ""];
        }
        let tv_raw_value = this.props.score.data.raw_data.timing_violation;
        if (tv_raw_value === null) {
            return ["—", ""];
        } else if (tv_raw_value) {
            return ["X", " fail"];
        } else {
            return ["OK", " ok"];
        }
    }
    render() {
        let timing_data = this.getTimingData();
        let jump_steps = this.props.score
            ? this.props.score.data.raw_data.jump_steps
            : 0;
        let confirmed = this.props.score && this.props.score.confirmed;
        return (
            <div>
                <h3 className={ confirmed ? "confirmed" : "" }>{ this.props.judge.name }</h3>
                <table className="tech-judge-info"><tbody><tr>
                    <td className="title">
                        { _("tablet.tech_judge.jump_steps") }
                    </td>
                    <td className="value">
                        <div className="inner">
                            { jump_steps }
                        </div>
                    </td>
                    <td className="title">
                        { _("tablet.tech_judge.timing") }
                    </td>
                    <td className="value">
                        <div className={ "inner" + timing_data[1] }>
                            { timing_data[0] }
                        </div>
                    </td>
                </tr></tbody></table>
            </div>
        );
    }
}
