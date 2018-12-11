import React from "react";

import Model from "common/server/Storage/models/Model";
import Row from "./Row";
import PT from "prop-types";

export default class ClientsAuth extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };
    render() {
        return (
            <table className="clients-auth">
                <tbody>
                    {this.props.competition.clients.map(client => (
                        <Row
                            client={client}
                            competition={this.props.competition}
                            key={client.id}
                        />
                    ))}
                </tbody>
            </table>
        );
    }
}
