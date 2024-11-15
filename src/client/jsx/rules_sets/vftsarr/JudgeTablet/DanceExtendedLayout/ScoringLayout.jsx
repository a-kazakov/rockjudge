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
                {this.renderPart("fw_woman", "reduction")}
                {this.renderPart("fw_man", "reduction")}
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
                                {this.renderPart("df_complexity", "number", {
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
                                {this.renderPart("c_idea", "number", {
                                    min: 0,
                                    max: 5,
                                    step: 0.5,
                                })}
                            </td>
                            <td className="part-2">
                                {this.renderPart("c_performance", "number", {
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
                    </tbody>
                </table>
                <Mistakes
                    readOnly={this.props.score.confirmed}
                    scoreData={this.props.score.data}
                    onScoreUpdate={this.props.onScoreUpdate}
                />
            </div>
        );
    }
}
