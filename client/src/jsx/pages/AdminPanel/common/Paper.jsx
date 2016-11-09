export default class Paper extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            children: PT.node.isRequired,
            header: PT.string,
            margins: PT.arrayOf(PT.number.isRequired),
            title1: PT.string,
            title2: PT.string,
            title3: PT.string,
        };
    }
    static get defaultProps() {
        return {
            header: null,
            title1: null,
            title2: null,
            title3: null,
        };
    }

    makeBodyRef = (ref) => this._body = ref;

    getPrintableHTML() {
        return this._body.innerHTML;
    }
    renderHeader() {
        return this.props.header ? (
            <div className="p-header">{ this.props.header }</div>
        ) : null;
    }
    renderTitle1() {
        return this.props.title1 ? (
            <h1>{ this.props.title1 }</h1>
        ) : null;
    }
    renderTitle2() {
        return this.props.title2 ? (
            <h2>{ this.props.title2 }</h2>
        ) : null;
    }
    renderTitle3() {
        return this.props.title3 ? (
            <h3>{ this.props.title3 }</h3>
        ) : null;
    }
    renderBody() {
        return (
            <div
                className="p-content"
                ref={ this.makeBodyRef }
            >
                { this.props.children }
            </div>
        )
    }
    getStyle() {
        if (!this.props.margins) {
            return {};
        }
        return {
            padding: this.props.margins
                .map(v => 2.834645669291 * v)
                .map(v => `${v.toFixed(3)}pt`)
                .join(" "),
        }
    }
    render() {
        return (
            <div className="Paper" style={ this.getStyle() }>
                { this.renderHeader() }
                { this.renderTitle1() }
                { this.renderTitle2() }
                { this.renderTitle3() }
                { this.renderBody() }
            </div>
        );
    }
}

Paper.displayName = "AdminPanel_components_Paper";
