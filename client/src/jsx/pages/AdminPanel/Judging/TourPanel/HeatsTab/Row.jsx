export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            headerCells: PT.number.isRequired,
            isFirstCell: PT.bool.isRequired,
            isLastCell: PT.bool.isRequired,
            heat: PT.number.isRequired,
            participant: PT.shape({
                number: PT.number.isRequired,
                name: PT.string.isRequired,
                club: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    getCellStyle() {
        let result = {
            verticalAlign: "top",
            paddingTop: "1pt",
            paddingBottom: "1pt",
            paddingLeft: "3pt",
            paddingRight: "3pt",
        };
        if (this.props.isFirstCell) {
            Object.assign(result, {
                borderTop: "1pt solid black",
                paddingTop: "4pt",
            });
        }
        if (this.props.isLastCell) {
            Object.assign(result, {
                paddingBottom: "5pt",
            });
        }
        return result;
    }

    render() {
        const style = this.getCellStyle();
        const header = this.props.isFirstCell
            ? (
                <td
                    className="w-8"
                    rowSpan={ this.props.headerCells }
                    style={ Object.assign({}, style, {
                        borderRight: "1pt solid black",
                    }) }
                >
                    <p className="text-center">
                        { this.props.heat }
                    </p>
                </td>
            ) : null;
        return (
            <tr>
                { header }
                <td
                    className="w-8"
                    style={ Object.assign({}, style, {
                        fontWeight: "bold",
                    }) }
                >
                    <p className="text-center">
                        { this.props.participant.number }
                    </p>
                </td>
                <td style={ style }>
                    <p>
                        { this.props.participant.name }
                    </p>
                </td>
                <td className="club-name" style={ style }>
                    <p>
                        { this.props.participant.club.name }
                    </p>
                </td>
            </tr>
        );
    }
}
