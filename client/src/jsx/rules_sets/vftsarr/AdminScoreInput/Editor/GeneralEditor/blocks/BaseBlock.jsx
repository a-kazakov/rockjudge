export default class BaseBlock extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            field: PT.string.isRequired,
            readOnly: PT.bool,
            value: PT.any,
            onChange: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            readOnly: false,
        };
    }

    render() {
        console.error("render() for block is not implemented");
        return null;
    }
}
