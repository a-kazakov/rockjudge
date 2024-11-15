import React from "react";

import PT from "prop-types";
import _ from "l10n";

import DisciplinesSorted from "./DisciplinesSorted";
import PlanSorted from "./PlanSorted";

export default class SideMenu extends React.Component {
    static propTypes = {
        activeTourId: PT.number,
        competition: PT.object.isRequired,
        onActiveTourChange: PT.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            sortByPlan: !!Number(sessionStorage.getItem("sortByPlan")),
        };
    }

    handlePlanSwitch = () => {
        this.setState({
            sortByPlan: true,
        });
        sessionStorage.setItem("sortByPlan", "1");
    };
    handleDisciplinesSwitch = () => {
        this.setState({
            sortByPlan: false,
        });
        sessionStorage.setItem("sortByPlan", "0");
    };

    renderList() {
        if (this.state.sortByPlan) {
            return (
                <PlanSorted
                    activeTourId={this.props.activeTourId}
                    competition={this.props.competition}
                    onActiveTourChange={this.props.onActiveTourChange}
                />
            );
        } else {
            return (
                <DisciplinesSorted
                    activeTourId={this.props.activeTourId}
                    competition={this.props.competition}
                    onActiveTourChange={this.props.onActiveTourChange}
                />
            );
        }
    }
    renderButton() {
        if (this.state.sortByPlan) {
            return (
                <button
                    className="btn btn-default btn-sm full-width"
                    onClick={this.handleDisciplinesSwitch}
                >
                    {_("admin.buttons.switch_to_disciplines")}
                </button>
            );
        } else {
            return (
                <button
                    className="btn btn-default btn-sm full-width"
                    onClick={this.handlePlanSwitch}
                >
                    {_("admin.buttons.switch_to_plan")}
                </button>
            );
        }
    }
    render() {
        return (
            <div className="SideMenu">
                <div className="tours">{this.renderList()}</div>
                {this.renderButton()}
            </div>
        );
    }
}
