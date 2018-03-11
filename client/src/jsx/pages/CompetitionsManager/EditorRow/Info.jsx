import _ from "l10n";

import InfoItem from "./InfoItem";

export default class Info extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            baseTabIndex: PT.number.isRequired,
            defaultValue: PT.arrayOf(
                PT.arrayOf(
                    PT.string.isRequired,
                ).isRequired,
            ).isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
        };
    }

    get value() {
        return this.state.value;
    }

    handleAddition = () => {
        let value = this.state.value.slice();
        value.push(["", ""]);
        this.setState({ value });
    };

    handleChange = (idx, new_item) => {
        let value = this.state.value.slice();
        value[idx] = new_item;
        this.setState({ value });
    };

    handleMoveUp = (idx) => {
        let value = this.state.value.slice();
        const [row] = value.splice(idx, 1);
        value.splice(idx - 1, 0, row);
        this.setState({ value });
    };

    handleMoveDown = (idx) => {
        let value = this.state.value.slice();
        const [row] = value.splice(idx, 1);
        value.splice(idx + 1, 0, row);
        this.setState({ value });
    };

    handleDeletion = (idx) => {
        let value = this.state.value.slice();
        value.splice(idx, 1);
        this.setState({ value });
    };

    render() {
        return (
            <div className="info">
                { this.state.value.map((item, idx) =>
                    <InfoItem
                        baseTabIndex={ this.props.baseTabIndex + 5 * idx }
                        idx={ idx }
                        item={ item }
                        itemsCount={ this.state.value.length }
                        key={ idx }
                        onChange={ this.handleChange }
                        onDelete={ this.handleDeletion }
                        onMoveDown={ this.handleMoveDown }
                        onMoveUp={ this.handleMoveUp }
                    />
                ) }
                <button
                    className="add-button"
                    tabIndex={ this.props.baseTabIndex + 949 }
                    type="button"
                    onClick={ this.handleAddition }
                >
                    { _("global.buttons.add") }
                </button>
            </div>
        );
    }
}

Info.displayName = "CompetitionsManager_EditorRow_Info";
