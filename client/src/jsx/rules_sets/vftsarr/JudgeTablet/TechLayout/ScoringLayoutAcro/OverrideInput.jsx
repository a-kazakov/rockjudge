import { React } from "HostModules";

import PT from "prop-types";
import onTouchOrClick from "tablet_ui/onTouchOrClick";

export default class OverrideInput extends React.Component {
    static propTypes = {
        acrobatic: PT.object.isRequired,
        readOnly: PT.bool.isRequired,
        onChange: PT.func.isRequired,
    };

    handleMinus = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(Math.max(this.props.acrobatic.score - 0.5, 0));
    };
    handlePlus = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(
            Math.min(
                this.props.acrobatic.score + 0.5,
                this.props.acrobatic.initial_score,
            ),
        );
    };
    handleZero = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(0);
    };
    handleRestore = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onChange(this.props.acrobatic.initial_score);
    };

    render() {
        const value_changed = Math.abs(
            this.props.acrobatic.score - this.props.acrobatic.initial_score,
        );
        return (
            <div className="tablet-acro-override-input">
                <div className="buttons">
                    <button
                        className="btn-zero"
                        disabled={
                            this.props.acrobatic.score < 0.05 || this.props.readOnly
                        }
                        {...onTouchOrClick(this.handleZero)}
                    >
                        ↓0
                    </button>
                    <button
                        className="btn-restore"
                        disabled={value_changed < 0.05 || this.props.readOnly}
                        {...onTouchOrClick(this.handleRestore)}
                    >
                        ↑
                    </button>
                    <button
                        className="btn-minus"
                        disabled={
                            this.props.acrobatic.score < 0.05 || this.props.readOnly
                        }
                        {...onTouchOrClick(this.handleMinus)}
                    >
                        &minus;
                    </button>
                    <button
                        className="btn-plus"
                        disabled={
                            this.props.acrobatic.initial_score <
                                this.props.acrobatic.score + 0.05 || this.props.readOnly
                        }
                        {...onTouchOrClick(this.handlePlus)}
                    >
                        +
                    </button>
                </div>
                <div className="value">
                    {value_changed
                        ? `${this.props.acrobatic.initial_score.toFixed(
                              1,
                          )} → ${this.props.acrobatic.score.toFixed(1)}`
                        : this.props.acrobatic.score.toFixed(1)}
                </div>
            </div>
        );
    }
}
