import _ from "l10n";

import Item from "./Item";

export default class LeftBar extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            page: PT.oneOf(["info", "plan", "heats", "results"]).isRequired,
            onPageChange: PT.func.isRequired,
        };
    }

    renderItem(page) {
        return (
            <Item
                active={ this.props.page === page }
                page={ page }
                title={ _(`presenter.headers.${page}`) }
                onPageChange={ this.props.onPageChange }
            />
        );
    }
    render() {
        return (
            <div className="left-bar">
                { this.renderItem("info") }
                { this.renderItem("plan") }
                { this.renderItem("heats") }
                { this.renderItem("results") }
            </div>
        );
    }
}

LeftBar.displayName = "PresenterTablet_LeftBar";
