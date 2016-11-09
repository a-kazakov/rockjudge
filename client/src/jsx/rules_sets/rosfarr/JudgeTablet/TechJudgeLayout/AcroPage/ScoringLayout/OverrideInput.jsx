import onTouchOrClick from "tablet_ui/onTouchOrClick";

export default class OverrideInput extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            originalValue: PT.number.isRequired,
            readOnly: PT.bool.isRequired,
            value: PT.number.isRequired,
            onChange: PT.func.isRequired,
        };
    }

    handleMinus = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(Math.max(this.props.value - 0.5, 0));
    }
    handlePlus = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(Math.min(this.props.value + 0.5, this.props.originalValue));
    }
    handleZero = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(0);
    }
    handleRestore = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(this.props.originalValue);
    }

    render() {
        const value_changed = Math.abs(this.props.value - this.props.originalValue);
        return (
            <div className="tablet-acro-override-input">
                <div className="buttons">
                    <button
                        className="btn-zero"
                        disabled={ this.props.value < 0.05 || this.props.readOnly }
                        { ...onTouchOrClick(this.handleZero) }
                    >
                        ↓0
                    </button>
                    <button
                        className="btn-restore"
                        disabled={ value_changed < 0.05 || this.props.readOnly }
                        { ...onTouchOrClick(this.handleRestore) }
                    >
                        ↑
                    </button>
                    <button
                        className="btn-minus"
                        disabled={ this.props.value < 0.05 || this.props.readOnly }
                        { ...onTouchOrClick(this.handleMinus) }
                    >
                        &minus;
                    </button>
                    <button
                        className="btn-plus"
                        disabled={ this.props.originalValue < this.props.value + 0.05 || this.props.readOnly }
                        { ...onTouchOrClick(this.handlePlus) }
                    >
                        +
                    </button>
                </div>
                <div className="value">
                    { value_changed
                        ? `${this.props.originalValue.toFixed(1)} → ${this.props.value.toFixed(1)}`
                        : this.props.value.toFixed(1) }
                </div>
            </div>
        )
    }
}

OverrideInput.displayName = "rules_sets_rosfarr_JudgeTablet_TechJudgeLayout_AcroPage_ScoringLayout_OverrideInput";
