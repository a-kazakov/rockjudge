class Printable extends React.Component {
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
        return <div className="p-content" ref="body">
            { this.props.body }
        </div>
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
    fetchPrintableData() {
        return this.refs.body.innerHTML;
    }
}
