import React from "react";

import PT from "prop-types";
import Model from "common/server/Storage/models/Model";

export default class Acrobatics extends React.Component {
    static propTypes = {
        participant: PT.instanceOf(Model).isRequired,
    };
    formatDescriptionChunk = (text, idx) => {
        if (text === "") {
            return null;
        }
        return idx % 2 === 0 ? (
            <span key={idx}>{text}</span>
        ) : (
            <strong key={idx}>{text}</strong>
        );
    };
    formatDescription(text) {
        const chunks = text.split("_");
        if (chunks.length % 2 === 0) {
            return text;
        }
        return chunks.map(this.formatDescriptionChunk);
    }
    render() {
        return (
            <tr className="tr-acro">
                <td className="acro" colSpan="5">
                    <table className="inner">
                        <tbody>
                            {this.props.participant.programs.map((pr, pr_idx) =>
                                [
                                    <tr key={`H${pr_idx}`}>
                                        <th colSpan="3">
                                            <p className="text-left">{pr.name}</p>
                                        </th>
                                    </tr>,
                                ].concat(
                                    pr.elements.map((a, a_idx) => (
                                        <tr key={`A_${pr_idx}_${a_idx}`}>
                                            <td className="w-3">
                                                <p className="text-left">{a_idx + 1}</p>
                                            </td>
                                            <td className="w-90">
                                                <p className="text-left">
                                                    {this.formatDescription(
                                                        a.description,
                                                    )}
                                                </p>
                                            </td>
                                            <td className="w-7">
                                                <p className="text-right">
                                                    {a.score.toFixed(1)}
                                                </p>
                                            </td>
                                        </tr>
                                    )),
                                ),
                            )}
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    }
}
