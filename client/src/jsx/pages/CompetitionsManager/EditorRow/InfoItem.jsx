import _ from "l10n";

export default class InfoItem extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            baseTabIndex: PT.number.isRequired,
            idx: PT.number.isRequired,
            item: PT.arrayOf(
                PT.string.isRequired,
            ).isRequired,
            itemsCount: PT.number.isRequired,
            onChange: PT.func.isRequired,
            onDelete: PT.func.isRequired,
            onMoveDown: PT.func.isRequired,
            onMoveUp: PT.func.isRequired,
        };
    }

    handleLabelChange = (event) => {
        this.props.onChange(this.props.idx, [event.target.value, this.props.item[1]]);
    }
    handleValueChange = (event) => {
        this.props.onChange(this.props.idx, [this.props.item[0], event.target.value]);
    }

    handleMoveDown = () => this.props.onMoveDown(this.props.idx);
    handleMoveUp = () => this.props.onMoveUp(this.props.idx);
    handleItemRemove = () => this.props.onDelete(this.props.idx);

    render() {
        const [label, value] = this.props.item;
        return (
            <div className="info-item">
                <input
                    className="title"
                    placeholder={ _("models.competition.info_item_title") }
                    ref={ this.makeLabelRef }
                    tabIndex={ this.props.baseTabIndex + 1 }
                    type="text"
                    value={ label }
                    onChange={ this.handleLabelChange }
                />
                <input
                    className="value"
                    placeholder={ _("models.competition.info_item_value") }
                    tabIndex={ this.props.baseTabIndex + 2 }
                    type="text"
                    value={ value }
                    onChange={ this.handleValueChange }
                />
                <button
                    className="down"
                    disabled={ this.props.idx === this.props.itemsCount - 1 }
                    type="button"
                    onClick={ this.handleMoveDown }
                >
                    ↓
                </button>
                <button
                    className="up"
                    disabled={ this.props.idx === 0 }
                    tabIndex={ -1 }
                    type="button"
                    onClick={ this.handleMoveUp }
                >
                    ↑
                </button>
                <button
                    className="delete"
                    tabIndex={ -1 }
                    type="button"
                    onClick={ this.handleItemRemove }
                >
                    X
                </button>
            </div>
        );
    }
}

InfoItem.displayName = "CompetitionsManager_EditorRow_InfoItem";
