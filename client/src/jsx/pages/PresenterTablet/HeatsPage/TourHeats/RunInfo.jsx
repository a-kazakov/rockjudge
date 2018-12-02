import React from "react";

import PT from "prop-types";

export default class RunInfo extends React.Component {
    static propTypes = {
        layout: PT.oneOf(["large", "medium", "small"]).isRequired,
        run: PT.object.isRequired,
    };

    renderLarge() {
        return (
            <table><tbody>
                <tr>
                    <td className="number" rowSpan="2">
                        { this.props.run.participant.number }
                    </td>
                    <td className="name">
                        { this.props.run.participant.name }
                    </td>
                </tr><tr>
                    <td className="club">
                        { `${this.props.run.participant.club.name}, ${this.props.run.participant.club.city}` }
                    </td>
                </tr>
            </tbody></table>
        );
    }
    renderSmall() {
        return (
            <table className="small"><tbody>
                <tr>
                    <td className="number">
                        { this.props.run.participant.number }
                    </td>
                    <td className="name">
                        { this.props.run.participant.name }
                    </td>
                </tr>
            </tbody></table>
        );
    }
    render() {
        switch (this.props.layout) {
            case "large": // Fallthrough
            case "medium": {
                return this.renderLarge();
            }
            case "small": {
                return this.renderSmall();
            }
            default: {
                return null;
            }
        }
    }
}
