import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import Mistakes from "JudgeTablet/components/Mistakes";
import GeneralScale from "JudgeTablet/components/GeneralScale";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    renderPart(code, scale, additional_props = {}) {
        return (
            <GeneralScale
                code={code}
                header={_(`tablet.dance_judge.${code}`)}
                readOnly={this.props.score.confirmed}
                scale={scale}
                value={this.props.score.data[code]}
                onChange={this.props.onScoreUpdate}
                {...additional_props}
            />
        );
    }
    render() {
        return (
            <div>
                {this.renderPart("fw", "reduction")}
                <table className="extended-layout">
                    <tbody>
                        <tr>
                            <td className="part-1">
                                <h3 className="primary">
                                    {_("tablet.dance_judge.dance_figs")}
                                </h3>
                                {this.renderPart("df_accuracy", "number", {
                                    min: 0,
                                    max: 5,
                                    step: 0.5,
                                })}
                            </td>
                            <td className="part-2">
                                {this.renderPart("df_difficulty", "number", {
                                    min: 0,
                                    max: 4,
                                    step: 0.5,
                                })}
                            </td>
                            <td className="part-3">
                                {this.renderPart("df_art", "number", {
                                    min: 0,
                                    max: 1,
                                    step: 0.5,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="part-1">
                                <h3 className="primary">
                                    {_("tablet.dance_judge.composition")}
                                </h3>
                                {this.renderPart("c_ideas", "number", {
                                    min: 0,
                                    max: 5,
                                    step: 0.5,
                                })}
                            </td>
                            <td className="part-2">
                                {this.renderPart("c_structure", "number", {
                                    min: 0,
                                    max: 4,
                                    step: 0.5,
                                })}
                            </td>
                            <td className="part-3">
                                {this.renderPart("c_bonus", "number", {
                                    min: 0,
                                    max: 1,
                                    step: 0.5,
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className="part-1">
                                <h3 className="primary">
                                    {_("tablet.dance_judge.figures")}
                                </h3>
                                {this.renderPart("fig_execution", "number", {
                                    min: 0,
                                    max: 5,
                                    step: 0.5,
                                })}
                            </td>
                            <td className="part-2">
                                {this.renderPart("fig_patterns", "number", {
                                    min: 0,
                                    max: 4,
                                    step: 0.5,
                                })}
                            </td>
                            <td className="part-3">
                                {this.renderPart("fig_transitions", "number", {
                                    min: 0,
                                    max: 1,
                                    step: 0.5,
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Mistakes
                    formation
                    readOnly={this.props.score.confirmed}
                    scoreData={this.props.score.data}
                    onScoreUpdate={this.props.onScoreUpdate}
                />
            </div>
        );
    }
}
