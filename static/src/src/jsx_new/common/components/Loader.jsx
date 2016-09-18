export default class Loader extends React.Component {
    render() {
        return (
            <table style={ { "height": "100%", "width": "100%" } }><tbody><tr>
                <td style={ { "textAlign": "center", "verticalAlign": "middle" } }>
                    <img src="/static/img/ajax-loader.gif" />
                </td>
            </tr></tbody></table>
        );
    }
}
