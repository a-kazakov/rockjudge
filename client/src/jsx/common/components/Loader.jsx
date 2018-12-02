import React from "react";

export default class Loader extends React.Component {
    render() {
        return (
            <div className="Loader">
                <img src="/static/img/ajax-loader.gif" />
            </div>
        );
    }
}
