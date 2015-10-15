"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsUI = (function (_React$Component) {
    _inherits(ResultsUI, _React$Component);

    function ResultsUI(props) {
        _classCallCheck(this, ResultsUI);

        _get(Object.getPrototypeOf(ResultsUI.prototype), "constructor", this).call(this, props);
        this.state = {
            "page": null
        };
    }

    _createClass(ResultsUI, [{
        key: "switchPage",
        value: function switchPage(page, props) {
            this.setState({
                page: page,
                page_props: props
            });
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            switch (this.state.page) {
                case "competition_report":
                    return React.createElement(
                        "div",
                        { className: "ifw" },
                        React.createElement("iframe", { src: "/report/" + this.props.competition_id })
                    );
                case "inner_competition_results":
                    return React.createElement(
                        "div",
                        { className: "ifw" },
                        React.createElement("iframe", { src: "/ic/" + this.state.page_props.inner_competition_id.toString() + "/results" })
                    );
                case "tour_results":
                    return React.createElement(
                        "div",
                        { className: "ifw" },
                        React.createElement("iframe", { src: "/tour/" + this.state.page_props.tour_id.toString() + "/results" })
                    );
                case "manage_judges":
                    return React.createElement(JudgesManagementUI, {
                        judges: this.props.judges,
                        competition_id: this.props.competition_id });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var ics = this.props.inner_competitions.map((function (ic) {
                var tours = ic.tours.map((function (tour) {
                    return React.createElement(
                        "div",
                        { key: tour.id,
                            className: "level-2" + (this.state.page == "tour_results" && this.state.page_props.tour_id == tour.id ? " active" : ""),
                            onClick: this.switchPage.bind(this, "tour_results", { tour_id: tour.id }) },
                        tour.name
                    );
                }).bind(this));
                return React.createElement(
                    "details",
                    { open: "true", className: "block", key: ic.id },
                    React.createElement(
                        "summary",
                        { className: "level-1" },
                        ic.name
                    ),
                    tours,
                    React.createElement(
                        "div",
                        {
                            className: "level-2 new-ic" + (this.state.page == "inner_competition_results" && this.state.page_props.inner_competition_id == ic.id ? " active" : ""),
                            onClick: this.switchPage.bind(this, "inner_competition_results", { inner_competition_id: ic.id }) },
                        _("admin.menu.all_inner_competition_results")
                    )
                );
            }).bind(this));
            return React.createElement(
                "table",
                { className: "app-content" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "side-panel" },
                            React.createElement(
                                "div",
                                { className: "block" },
                                React.createElement(
                                    "div",
                                    {
                                        className: "level-1" + (this.state.page == "competition_report" ? " active" : ""),
                                        onClick: this.switchPage.bind(this, "competition_report") },
                                    _("admin.menu.competition_report")
                                )
                            ),
                            ics
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "div",
                                { className: "app-page" },
                                this.renderContent()
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ResultsUI;
})(React.Component);
//# sourceMappingURL=results.js.map