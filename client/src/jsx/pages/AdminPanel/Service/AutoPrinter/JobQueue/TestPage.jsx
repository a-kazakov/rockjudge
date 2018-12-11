import React from "react";

import PT from "prop-types";
import _ from "l10n";
import Docx from "common/Docx";

export default class TestPage extends React.Component {
    static propTypes = {
        autoDocx: PT.shape({
            filename: PT.string.isRequired,
            onDone: PT.func.isRequired,
        }).isRequired,
    };
    componentDidMount() {
        this.createDocx(this.props.autoDocx.filename);
        this.props.autoDocx.onDone(this.props.autoDocx.filename);
    }

    makeContentRef = ref => (this._content = ref);

    // eslint-disable-next-line react/sort-comp
    render() {
        return (
            <div ref={this.makeContentRef}>
                <p>{_("admin.auto_printer.test_text")}</p>
            </div>
        );
    }

    createDocx(filename = "test-page.docx") {
        Docx(filename)
            .setBody(this._content.innerHTML)
            .save();
    }
}
