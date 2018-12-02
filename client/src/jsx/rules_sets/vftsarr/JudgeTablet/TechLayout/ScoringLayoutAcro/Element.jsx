import {React} from "HostModules";

import PT from "prop-types";
import OverrideInput from "./OverrideInput";

export default class Element extends React.Component {
    static propTypes = {
        acrobatic: PT.object.isRequired,
        readOnly: PT.bool.isRequired,
        onAcroOverride: PT.func.isRequired,
    };

    handleChange = (value) => {
        this.props.onAcroOverride(this.props.acrobatic, value);
    };

    formatDescriptionChunk = (text, idx) => {
        if (text === "") {
            return null;
        }
        return (
            idx % 2 === 0
                ? <span key={ idx }>{ text }</span>
                : <span className="highlight" key={ idx }>{ text }</span>
        );
    };
    renderDescription() {
        const chunks = this.props.acrobatic.description.split("_");
        if (chunks.length % 2 === 0) {
            return this.props.acrobatic.description;
        }
        return chunks.map(this.formatDescriptionChunk)
    }
    render() {
        return (
            <div className="tech-judge-acro">
                <div className="controls">
                    <OverrideInput
                        acrobatic={ this.props.acrobatic }
                        readOnly={ this.props.readOnly }
                        onChange={ this.handleChange }
                    />
                </div>
                <div className="description">
                    { this.renderDescription() }
                </div>
                <div className="clearfix" />
            </div>
        );
    }
}