"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReportsUI = (function (_React$Component) {
    _inherits(ReportsUI, _React$Component);

    function ReportsUI(props) {
        _classCallCheck(this, ReportsUI);

        _get(Object.getPrototypeOf(ReportsUI.prototype), "constructor", this).call(this, props);
        this.state = {
            "page": this.getPageFromHash(),
            "page_props": this.getPagePropsFromHash()
        };
    }

    _createClass(ReportsUI, [{
        key: "switchPage",
        value: function switchPage(page, props) {
            this.setState({
                page: page,
                page_props: props
            });
            var props_pairs = [];
            Object.getOwnPropertyNames(props).forEach(function (key) {
                props_pairs.push([key, props[key]]);
            });
            window.location.hash = "#reports/" + page + "/" + props_pairs.map(function (p) {
                return p.join("=");
            }).join("$");
        }
    }, {
        key: "getPageFromHash",
        value: function getPageFromHash() {
            var chunks = window.location.hash.substr(1).split("/");
            if (chunks[1] && ["start_list", "competition_report", "discipline_results", "tour_results"].indexOf(chunks[1]) >= 0) {
                return chunks[1];
            }
            return null;
        }
    }, {
        key: "getPagePropsFromHash",
        value: function getPagePropsFromHash() {
            var chunks = window.location.hash.substr(1).split("/");
            if (chunks[2]) {
                var _ret = (function () {
                    var result = {};
                    chunks[2].split("$").forEach(function (pair_str) {
                        var pair = pair_str.split("=");
                        result[pair[0]] = pair[1];
                    });
                    return {
                        v: result
                    };
                })();

                if (typeof _ret === "object") return _ret.v;
            }
            return {};
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            switch (this.state.page) {
                case "start_list":
                    return React.createElement(
                        "div",
                        { className: "ifw" },
                        React.createElement("iframe", { src: "/start_list/" + this.props.competition_id })
                    );
                case "competition_report":
                    return React.createElement(
                        "div",
                        { className: "ifw" },
                        React.createElement("iframe", { src: "/report/" + this.props.competition_id })
                    );
                case "discipline_results":
                    return React.createElement(
                        "div",
                        { className: "ifw" },
                        React.createElement("iframe", { src: "/ic/" + this.state.page_props.discipline_id.toString() + "/results" })
                    );
                case "tour_results":
                    return React.createElement(
                        "div",
                        { className: "ifw" },
                        React.createElement("iframe", { src: "/tour/" + this.state.page_props.tour_id.toString() + "/results" })
                    );
            }
        }
    }, {
        key: "render",
        value: function render() {
            var ics = this.props.disciplines.map((function (ic) {
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
                    { className: "block", key: ic.id, open: !!parseInt(sessionStorage.getItem("D_R_" + ic.id)) },
                    React.createElement(
                        "summary",
                        { className: "level-1", onClick: function (e) {
                                return sessionStorage.setItem("D_R_" + ic.id, e.target.parentNode.open ? 0 : 1);
                            } },
                        ic.name
                    ),
                    tours,
                    React.createElement(
                        "div",
                        {
                            className: "level-2 new-ic" + (this.state.page == "discipline_results" && this.state.page_props.discipline_id == ic.id ? " active" : ""),
                            onClick: this.switchPage.bind(this, "discipline_results", { discipline_id: ic.id }) },
                        _("admin.menu.discipline_results")
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
                                { className: "scroller" },
                                React.createElement(
                                    "div",
                                    { className: "block" },
                                    React.createElement(
                                        "div",
                                        {
                                            className: "level-1" + (this.state.page == "start_list" ? " active" : ""),
                                            onClick: this.switchPage.bind(this, "start_list", {}) },
                                        _("admin.menu.start_list")
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "block" },
                                    React.createElement(
                                        "div",
                                        {
                                            className: "level-1" + (this.state.page == "competition_report" ? " active" : ""),
                                            onClick: this.switchPage.bind(this, "competition_report", {}) },
                                        _("admin.menu.competition_report")
                                    )
                                ),
                                ics
                            )
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

    return ReportsUI;
})(React.Component);
//# sourceMappingURL=reports.js.map