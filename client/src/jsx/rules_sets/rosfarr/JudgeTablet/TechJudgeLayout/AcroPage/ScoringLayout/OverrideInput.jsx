import onTouchOrClick from "tablet_ui/onTouchOrClick";

export default class OverrideInput extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            originalValue: PT.number.isRequired,
            value: PT.number.isRequired,
            onChange: PT.func.isRequired,
        };
    }

    handleMinus = () => {
        this.props.onChange(Math.max(this.props.value - 0.5, 0));
    }
    handlePlus = () => {
        this.props.onChange(Math.min(this.props.value + 0.5, this.props.originalValue));
    }
    handleZero = () => {
        this.props.onChange(0);
    }
    handleRestore = () => {
        this.props.onChange(this.props.originalValue);
    }

    render() {
        const value_changed = Math.abs(this.props.value - this.props.originalValue);
        return (
            <div className="tablet-acro-override-input">
                <div className="buttons">
                    <button
                        className="tbtn btn-zero"
                        disabled={ this.props.value < 0.05 }
                        { ...onTouchOrClick(this.handleZero) }
                    >
                        ↓0
                    </button>
                    <button
                        className="tbtn btn-restore"
                        disabled={ value_changed < 0.05 }
                        { ...onTouchOrClick(this.handleRestore) }
                    >
                        ↑
                    </button>
                    <button
                        className="tbtn btn-minus"
                        disabled={ this.props.value < 0.05 }
                        { ...onTouchOrClick(this.handleMinus) }
                    >
                        &minus;
                    </button>
                    <button
                        className="tbtn btn-plus"
                        disabled={ this.props.originalValue < this.props.value + 0.05 }
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
