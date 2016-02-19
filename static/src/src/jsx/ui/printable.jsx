export class Printable extends React.Component {
    static get propTypes() {
        return {
            header: React.PropTypes.string,
            title1: React.PropTypes.string,
            title2: React.PropTypes.string,
            title3: React.PropTypes.string,
            body: React.PropTypes.node.isRequired,
            sendDeltas: React.PropTypes.bool,
        };
    }
    fetchPrintableData() {
        return this._body.innerHTML;
    }
    renderHeader() {
        return this.props.header ? <div className="p-header">{ this.props.header }</div> : null;
    }
    renderTitle1() {
        return this.props.title1 ? <h1>{ this.props.title1 }</h1> : null;
    }
    renderTitle2() {
        return this.props.title2 ? <h2>{ this.props.title2 }</h2> : null;
    }
    renderTitle3() {
        return this.props.title3 ? <h3>{ this.props.title3 }</h3> : null;
    }
    renderBody() {
        return (
            <div
                className="p-content"
                ref={ e => this._body = e }
            >
                { this.props.body }
            </div>
        )
    }
    render() {
        return <div className="printable">
            { this.renderHeader() }
            { this.renderTitle1() }
            { this.renderTitle2() }
            { this.renderTitle3() }
            { this.renderBody() }
        </div>
    }
}
