import Api from "common/server/Api";

export default class PerformedCell extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            run: PT.shape({
                id: PT.number.isRequired,
                performed: PT.bool.isRequired,
            }).isRequired,
        };
    }

    handleStateToggle = () => {
        if (this.props.readOnly) {
            return;
        }
        let method = this.props.run.performed
            ? "run.mark_not_performed"
            : "run.mark_performed";
        Api(method, { run_id: this.props.run.id }).send();
    }

    render() {
        return (
            <td className="performed">
                <input
                    checked={ this.props.run.performed }
                    type="checkbox"
                    onChange={ this.handleStateToggle }
                />
            </td>
        );
    }
}

PerformedCell.displayName = "AdminPanel_Judging_TourPanel_ScoresTab_Row_PerformedCell";
