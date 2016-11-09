import _ from "l10n";

import Row from "./Row";

export default class SportsmenList extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            sportsmen: PT.arrayOf(PT.object).isRequired,
            onChange: PT.func.isRequired,
        };
    }
    handleSportsmanAddition = () => {
        let list = this.props.sportsmen.slice(); // clone
        list.push({
            "last_name": "",
            "first_name": "",
            "year_of_birth": "0",
            "gender": "F",
            "substitute": false,
        });
        this.props.onChange("sportsmen", list);
    }
    handleSportsmanChange = (idx, value) => {
        let list = this.props.sportsmen.slice(); // clone
        list[idx] = value;
        this.props.onChange("sportsmen", list);
    }
    handleSportsmanDeletion = (idx) => {
        let list = this.props.sportsmen.slice(); // clone
        list.splice(idx, 1);
        this.props.onChange("sportsmen", list);
    }
    render() {
        return (
            <div className="sportsmen">
                <label>
                    { _("models.participant.sportsmen") }
                </label>
                { this.props.sportsmen.map((sp, idx) =>
                    <Row
                        idx={ idx }
                        key={ idx }
                        sportsman={ sp }
                        onChange={ this.handleSportsmanChange }
                        onDelete={ this.handleSportsmanDeletion }
                    />
                ) }
                <button
                    className="add"
                    type="button"
                    onClick={ this.handleSportsmanAddition }
                >
                    { _("global.buttons.add") }
                </button>
            </div>
        );
    }
}

SportsmenList.displayName = "AdminPanel_Management_Participants_EditorRow_SportsmenList";
