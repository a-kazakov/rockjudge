import React from "react";

import PT from "prop-types";
import Model from "common/server/Storage/models/Model";

export default class OneNumber extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        participant: PT.instanceOf(Model).isRequired,
    };

    render() {
        return (
            <div className="participant">
                <p className="spacer-top">&nbsp;</p>
                <div className="competition">
                    <p>
                        {this.props.competition.name}
                        &nbsp;
                    </p>
                </div>
                <p className="spacer-top2">&nbsp;</p>
                <p className="number">{this.props.participant.number}</p>
                <p className="name">
                    {this.props.participant.name}
                    &nbsp;
                </p>
                <p className="discipline">
                    {this.props.participant.discipline.name}
                    &nbsp;
                </p>
                <p className="club">
                    {this.props.participant.club.name} &mdash;{" "}
                    {this.props.participant.club.city}
                </p>
                <p className="spacer-bottom">&nbsp;</p>
            </div>
        );
    }
}
