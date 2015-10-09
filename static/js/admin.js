"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompetitionSchema = (function (_React$Component) {
    _inherits(CompetitionSchema, _React$Component);

    function CompetitionSchema(props) {
        _classCallCheck(this, CompetitionSchema);

        _get(Object.getPrototypeOf(CompetitionSchema.prototype), "constructor", this).call(this, props);
    }

    _createClass(CompetitionSchema, [{
        key: "activateTour",
        value: function activateTour(tour_id) {
            this.props.updateTourId(tour_id);
        }
    }, {
        key: "renderTour",
        value: function renderTour(tour) {
            var className = "level-2" + (tour.finalized ? " grey" : "") + (tour.id == this.props.current_tour_id ? " active" : "");
            return React.createElement(
                "div",
                { className: className, onClick: this.activateTour.bind(this, tour.id), key: tour.id },
                tour.name
            );
        }
    }, {
        key: "renderInnerCompetition",
        value: function renderInnerCompetition(ic) {
            return React.createElement(
                "details",
                { open: "true", className: "block", key: ic.id },
                React.createElement(
                    "summary",
                    { className: "level-1" },
                    ic.name
                ),
                ic.tours.map(this.renderTour.bind(this))
            );
        }
    }, {
        key: "render",
        value: function render() {
            var data = this.props.inner_competitions.map((function (ic) {
                return this.renderInnerCompetition(ic);
            }).bind(this));
            return React.createElement(
                "div",
                { className: "noselect" },
                data
            );
        }
    }]);

    return CompetitionSchema;
})(React.Component);

var JudgingUI = (function (_React$Component2) {
    _inherits(JudgingUI, _React$Component2);

    function JudgingUI(props) {
        _classCallCheck(this, JudgingUI);

        _get(Object.getPrototypeOf(JudgingUI.prototype), "constructor", this).call(this, props);
        this.state = {
            tour_id: null
        };
    }

    _createClass(JudgingUI, [{
        key: "updateTourId",
        value: function updateTourId(new_tour_id) {
            this.setState({
                tour_id: new_tour_id
            });
        }
    }, {
        key: "render",
        value: function render() {
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
                            React.createElement(CompetitionSchema, {
                                inner_competitions: this.props.inner_competitions,
                                updateTourId: this.updateTourId.bind(this),
                                current_tour_id: this.state.tour_id })
                        ),
                        React.createElement(
                            "td",
                            null,
                            this.state.tour_id === null ? React.createElement("br", null) : React.createElement("iframe", { className: "judging-frame", src: "/tour/" + this.state.tour_id })
                        )
                    )
                )
            );
        }
    }]);

    return JudgingUI;
})(React.Component);

var CompetitionLoadingUI = (function (_React$Component3) {
    _inherits(CompetitionLoadingUI, _React$Component3);

    function CompetitionLoadingUI(props) {
        _classCallCheck(this, CompetitionLoadingUI);

        _get(Object.getPrototypeOf(CompetitionLoadingUI.prototype), "constructor", this).call(this, props);
        this.state = {
            raw_text: ""
        };
    }

    _createClass(CompetitionLoadingUI, [{
        key: "render",
        value: function render() {
            var _this = this;

            return React.createElement(
                "div",
                { className: "load-competition-page" },
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        "Load competition data"
                    )
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.onSubmit.bind(this), className: "load-competition" },
                    React.createElement("textarea", {
                        defaultValue: "",
                        ref: function (c) {
                            return _this._input = c;
                        },
                        placeholder: "Insert serialized data here ..." }),
                    React.createElement(
                        "button",
                        { className: "btn btn-primary", type: "submit" },
                        "Apply"
                    )
                )
            );
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            new Api("tournaments.competition.load", {
                competition_id: this.props.competition_id,
                data: JSON.parse(this._input.getDOMNode().value)
            }).onSuccess(function () {
                alert("Success.");
            }).send();
        }
    }]);

    return CompetitionLoadingUI;
})(React.Component);

var TourEditingUI = (function (_React$Component4) {
    _inherits(TourEditingUI, _React$Component4);

    function TourEditingUI(props) {
        _classCallCheck(this, TourEditingUI);

        _get(Object.getPrototypeOf(TourEditingUI.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
    }

    _createClass(TourEditingUI, [{
        key: "startEditing",
        value: function startEditing() {
            this.setState({
                editing: true
            });
        }
    }, {
        key: "stopEditing",
        value: function stopEditing() {
            this.setState({
                editing: false
            });
        }
    }, {
        key: "renderEditor",
        value: function renderEditor(tour) {
            return React.createElement(
                "form",
                { className: "tour form-horizontal", key: this.props.tour.id, onSubmit: this.submitTour.bind(this) },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-6" },
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Name"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "name",
                                    defaultValue: this.props.tour.name })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Participants advances"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "num_advances",
                                    defaultValue: this.props.tour.num_advances })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Participants per heat"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "participants_per_heat",
                                    defaultValue: this.props.tour.participants_per_heat })
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-6" },
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Scoring system"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "scoring_system",
                                    defaultValue: this.props.tour.scoring_system })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Is hope tour"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement(
                                    "div",
                                    { className: "checkbox" },
                                    React.createElement(
                                        "label",
                                        null,
                                        React.createElement("input", {
                                            type: "checkbox",
                                            ref: "hope_tour",
                                            defaultChecked: this.props.tour.hope_tour })
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "div",
                                { className: "col-sm-offset-4 col-sm-8" },
                                React.createElement(
                                    "button",
                                    { className: "btn btn-primary btn-sm", type: "submit" },
                                    "Submit"
                                ),
                                " ",
                                React.createElement(
                                    "button",
                                    { className: "btn btn-primary btn-sm", type: "button", onClick: this.stopEditing.bind(this) },
                                    "Discard"
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "renderViewer",
        value: function renderViewer() {
            return React.createElement(
                "div",
                { className: "tour", key: this.props.tour.id },
                React.createElement(
                    "h3",
                    null,
                    this.props.tour.name
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-5" },
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                "Participants advances:"
                            ),
                            " ",
                            this.props.tour.num_advances,
                            " "
                        ),
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                "Participants per heat:"
                            ),
                            " ",
                            this.props.tour.participants_per_heat,
                            " "
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-5" },
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                "Is hope tour:"
                            ),
                            " ",
                            this.props.tour.hope_tour ? "Yes" : "No",
                            " "
                        ),
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                "Scoring system:"
                            ),
                            " ",
                            this.props.tour.scoring_system,
                            " "
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-2" },
                        React.createElement(
                            "button",
                            { className: "full-width btn btn-primary btn-sm", onClick: this.startEditing.bind(this) },
                            "Edit"
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { className: "full-width btn btn-danger btn-sm", onClick: this.deleteTour.bind(this) },
                            "Delete"
                        )
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return this.state.editing ? this.renderEditor() : this.renderViewer();
        }
    }, {
        key: "submitTour",
        value: function submitTour(event) {
            event.preventDefault();
            new Api("tournaments.tour.set", {
                tour_id: this.props.tour.id,
                data: {
                    name: this.refs.name.getDOMNode().value,
                    num_advances: this.refs.num_advances.getDOMNode().value,
                    participants_per_heat: this.refs.participants_per_heat.getDOMNode().value,
                    scoring_system: this.refs.scoring_system.getDOMNode().value,
                    hope_tour: this.refs.hope_tour.getDOMNode().checked
                }
            }).onSuccess((function (response) {
                this.stopEditing();
            }).bind(this)).send();
        }
    }, {
        key: "deleteTour",
        value: function deleteTour() {
            if (!confirm("Are you sure want to delete this tour?")) {
                return false;
            }
            new Api("tournaments.tour.delete", { tour_id: this.props.tour.id }).send();
        }
    }]);

    return TourEditingUI;
})(React.Component);

var TourCreatingUI = (function (_React$Component5) {
    _inherits(TourCreatingUI, _React$Component5);

    function TourCreatingUI() {
        _classCallCheck(this, TourCreatingUI);

        _get(Object.getPrototypeOf(TourCreatingUI.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourCreatingUI, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "form",
                { className: "tour tour-create form-horizontal", onSubmit: this.submitTour.bind(this) },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-6" },
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Name"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "name" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Participants advances"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "num_advances" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Participants per heat"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "participants_per_heat" })
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-6" },
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Scoring system"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "scoring_system" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                "Is hope tour"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement(
                                    "div",
                                    { className: "checkbox" },
                                    React.createElement(
                                        "label",
                                        null,
                                        React.createElement("input", {
                                            type: "checkbox",
                                            ref: "hope_tour" })
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "div",
                                { className: "col-sm-offset-4 col-sm-8" },
                                React.createElement(
                                    "button",
                                    { className: "btn btn-primary btm-sm", type: "submit" },
                                    "Submit"
                                ),
                                " ",
                                React.createElement(
                                    "button",
                                    { className: "btn btn-primary btm-sm", type: "button", onClick: this.props.stopEditing },
                                    "Cancel"
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "submitTour",
        value: function submitTour(event) {
            event.preventDefault();
            new Api("tournaments.tour.create", {
                inner_competition_id: this.props.inner_competition_id,
                add_after: this.props.add_after,
                data: {
                    name: this.refs.name.getDOMNode().value,
                    num_advances: this.refs.num_advances.getDOMNode().value,
                    participants_per_heat: this.refs.participants_per_heat.getDOMNode().value,
                    scoring_system: this.refs.scoring_system.getDOMNode().value,
                    hope_tour: this.refs.hope_tour.getDOMNode().checked
                }
            }).onSuccess((function (response) {
                this.props.stopEditing();
            }).bind(this)).send();
        }
    }]);

    return TourCreatingUI;
})(React.Component);

var InnerCompetitionManagementUI = (function (_React$Component6) {
    _inherits(InnerCompetitionManagementUI, _React$Component6);

    function InnerCompetitionManagementUI(props) {
        _classCallCheck(this, InnerCompetitionManagementUI);

        _get(Object.getPrototypeOf(InnerCompetitionManagementUI.prototype), "constructor", this).call(this, props);
        this.state = {
            new_tour_after_id: -1
        };
    }

    _createClass(InnerCompetitionManagementUI, [{
        key: "submitBaseData",
        value: function submitBaseData(event) {
            event.preventDefault();
            new Api("tournaments.inner_competition.set", {
                inner_competition_id: this.props.inner_competition.id,
                data: {
                    name: this.refs.name.getDOMNode().value,
                    external_id: this.refs.external_id.getDOMNode().value
                }
            }).onSuccess(function () {
                alert("Success.");
            }).send();
        }
    }, {
        key: "addTourAfter",
        value: function addTourAfter(tour_id) {
            this.setState({
                new_tour_after_id: tour_id
            });
        }
    }, {
        key: "renderTourCreation",
        value: function renderTourCreation(after_id) {
            if (after_id === this.state.new_tour_after_id) {
                return React.createElement(TourCreatingUI, {
                    inner_competition_id: this.props.inner_competition.id,
                    add_after: after_id,
                    stopEditing: this.addTourAfter.bind(this, -1) });
            } else {
                return React.createElement(
                    "button",
                    { className: "btn btn-default full-width", onClick: this.addTourAfter.bind(this, after_id) },
                    "Add another tour here"
                );
            }
        }
    }, {
        key: "renderTours",
        value: function renderTours() {
            return this.props.inner_competition.tours.map((function (tour) {
                return [React.createElement(TourEditingUI, { tour: tour, key: tour.id }), this.renderTourCreation(tour.id)];
            }).bind(this));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        this.props.inner_competition.name
                    )
                ),
                React.createElement(
                    "div",
                    { className: "ic-management-ui" },
                    React.createElement(
                        "h2",
                        null,
                        "Basic info"
                    ),
                    React.createElement(
                        "form",
                        { className: "form-horizontal", onSubmit: this.submitBaseData.bind(this) },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                { className: "col-sm-2 control-label" },
                                "Name"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-10" },
                                React.createElement("input", { type: "text", ref: "name", className: "form-control", defaultValue: this.props.inner_competition.name })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                { className: "col-sm-2 control-label" },
                                "External ID"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-10" },
                                React.createElement("input", { type: "text", ref: "external_id", className: "form-control", defaultValue: this.props.inner_competition.external_id })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-sm-offset-2 col-sm-10" },
                                React.createElement(
                                    "button",
                                    { type: "submit", className: "btn btn-primary" },
                                    "Save"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "h2",
                        null,
                        "Tours"
                    ),
                    this.renderTourCreation(null),
                    this.renderTours()
                )
            );
        }
    }]);

    return InnerCompetitionManagementUI;
})(React.Component);

var ManagmentUI = (function (_React$Component7) {
    _inherits(ManagmentUI, _React$Component7);

    function ManagmentUI(props) {
        _classCallCheck(this, ManagmentUI);

        _get(Object.getPrototypeOf(ManagmentUI.prototype), "constructor", this).call(this, props);
        this.state = {
            "page": "load_competition"
        };
    }

    _createClass(ManagmentUI, [{
        key: "switchPage",
        value: function switchPage(page, props) {
            this.setState({
                page: page,
                page_props: props
            });
        }
    }, {
        key: "renderInnerCompetition",
        value: function renderInnerCompetition(ic) {
            return React.createElement(
                "div",
                {
                    className: "level-2" + (this.state.page == "manage_inner_competition" && this.state.page_props.inner_competition_id == ic.id ? " active" : ""),
                    key: ic.id,
                    onClick: this.switchPage.bind(this, "manage_inner_competition", { inner_competition_id: ic.id }) },
                ic.name
            );
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            switch (this.state.page) {
                case "load_competition":
                    return React.createElement(CompetitionLoadingUI, { competition_id: this.props.competition_id });
                case "manage_inner_competition":
                    var ic = null;
                    this.props.inner_competitions.forEach((function (el) {
                        if (el.id == this.state.page_props.inner_competition_id) {
                            ic = el;
                        }
                    }).bind(this));
                    return React.createElement(InnerCompetitionManagementUI, {
                        key: this.state.page_props.inner_competition_id,
                        inner_competition: ic });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var ics = this.props.inner_competitions.map((function (ic) {
                return this.renderInnerCompetition(ic);
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
                                        className: "level-1" + (this.state.page == "load_competition" ? " active" : ""),
                                        onClick: this.switchPage.bind(this, "load_competition") },
                                    "Load competition data"
                                )
                            ),
                            React.createElement(
                                "details",
                                { open: "true", className: "block" },
                                React.createElement(
                                    "summary",
                                    { className: "level-1" },
                                    "Manage categories"
                                ),
                                ics
                            ),
                            React.createElement(
                                "div",
                                { className: "block" },
                                React.createElement(
                                    "div",
                                    { className: "level-1", onClick: this.createInnerCommpetition.bind(this) },
                                    "Add new catagory"
                                )
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
    }, {
        key: "createInnerCommpetition",
        value: function createInnerCommpetition() {
            var name = prompt("Enter the name of new category:");
            if (name === null) {
                return;
            }
            new Api("tournaments.inner_competition.create", {
                name: name,
                competition_id: this.props.competition_id
            }).send();
        }
    }]);

    return ManagmentUI;
})(React.Component);

var AdminUI = (function (_React$Component8) {
    _inherits(AdminUI, _React$Component8);

    // Intialization

    function AdminUI(props) {
        _classCallCheck(this, AdminUI);

        _get(Object.getPrototypeOf(AdminUI.prototype), "constructor", this).call(this, props);
        this.state = {
            active_app: "judging",
            id: null
        };
        window.message_dispatcher.addListener("competition_update inner_competition_update tour_update tour_full_update competition_full_update").setCallback(this.loadData.bind(this));
        this.loadData();
    }

    _createClass(AdminUI, [{
        key: "loadData",
        value: function loadData() {
            new Api("tournaments.competition.get", { competition_id: this.props.competition_id, recursive: true }).onSuccess((function (response) {
                this.setState(response);
            }).bind(this)).send();
        }

        // Listeners

    }, {
        key: "setApp",
        value: function setApp(app) {
            this.setState({
                active_app: app
            });
        }

        // Rendering

    }, {
        key: "renderActiveApp",
        value: function renderActiveApp() {
            switch (this.state.active_app) {
                case "judging":
                    return React.createElement(JudgingUI, {
                        inner_competitions: this.state.inner_competitions });
                case "management":
                    return React.createElement(ManagmentUI, {
                        inner_competitions: this.state.inner_competitions,
                        competition_id: this.props.competition_id });
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.id === null) {
                return React.createElement(
                    "span",
                    null,
                    "Loading..."
                );
            }
            return React.createElement(
                "table",
                { className: "outer-table" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { colSpan: "2" },
                            this.state.name
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "left-col noselect" },
                            React.createElement(
                                "div",
                                { className: "app" + (this.state.active_app == "management" ? " active" : ""), onClick: this.setApp.bind(this, "management") },
                                React.createElement(
                                    "div",
                                    { className: "icon" },
                                    "M"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "label" },
                                    "Management"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "app" + (this.state.active_app == "judging" ? " active" : ""), onClick: this.setApp.bind(this, "judging") },
                                React.createElement(
                                    "div",
                                    { className: "icon" },
                                    "J"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "label" },
                                    "Judging"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "app" },
                                React.createElement(
                                    "div",
                                    { className: "icon" },
                                    "R"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "label" },
                                    "Results"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "app" },
                                React.createElement(
                                    "div",
                                    { className: "icon" },
                                    "S"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "label" },
                                    "Service"
                                )
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            this.renderActiveApp()
                        )
                    )
                )
            );
        }
    }]);

    return AdminUI;
})(React.Component);
//# sourceMappingURL=admin.js.map