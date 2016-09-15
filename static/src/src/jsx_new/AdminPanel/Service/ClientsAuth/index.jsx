import Row from "./Row";

export default class ClientsAuth extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                clients: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
        };
    }
    render() {
        return (
            <table className="clients-auth"><tbody>
                { this.props.competition.clients.map(client =>
                    <Row
                        client={ client }
                        competition={ this.props.competition }
                        key={ client.id }
                    />
                ) }
            </tbody></table>
        );
    }
}

ClientsAuth.displayName = "AdminPanel_Service_ClientsAuth";
