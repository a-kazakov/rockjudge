import { React } from "HostModules";

import _ from "l10n";
import PT from "prop-types";

import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoreConfirmation from "./ScoreConfirmation";
import GeneralTableHeat from "JudgeTablet/GeneralLayout/GeneralTableHeat";
import CrossSection from "./CrossSection";
import NotesSection from "./NotesSection";
import Footer from "JudgeTablet/Footer";
import FooterItem from "JudgeTablet/Footer/FooterItem";

export default class QualificationSimpleLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

    static checkScoreCompletion(score) {
        return score.data.cross;
    }

    getScores() {
        const { tour, disciplineJudge } = this.props;
        return tour.runs.map(run =>
            run.scores.find(score => score.discipline_judge_id === disciplineJudge.id),
        );
    }
    getSections() {
        return [
            {
                name: "cross",
                title: _("score_parts.components.long.crosses"),
                renderer: CrossSection,
            },
            {
                name: "number",
                title: null,
                renderer: this.renderNumberSection,
            },
            {
                name: "notes",
                title: _("score_parts.components.long.notes"),
                renderer: NotesSection,
            },
        ];
    }
    renderNumberSection(props) {
        const { score } = props;
        if (score == null || score.run.status !== "OK") {
            return null;
        }
        return (
            <div className="table-participant-number">
                {score.run.participant.number ?? ""}
            </div>
        );
    }
    renderFooter = () => {
        return (
            <Footer>
                <FooterItem
                    type="text"
                    value={_(
                        "tablet.dance_judge.crosses_status",
                        this.getScores().filter(s => s.data.cross).length,
                        this.props.tour.num_advances,
                    )}
                />
            </Footer>
        );
    };
    render() {
        return (
            <GeneralLayout
                allowIncompleteScores
                footerRenderer={this.renderFooter}
                heatRenderer={GeneralTableHeat}
                lastPageRenderer={ScoreConfirmation}
                scoreCompletionChecker={this.constructor.checkScoreCompletion}
                sections={this.getSections()}
                {...this.props}
            />
        );
    }
}
