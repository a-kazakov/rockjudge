"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourInputForm = (function (_React$Component) {
    _inherits(TourInputForm, _React$Component);

    function TourInputForm() {
        _classCallCheck(this, TourInputForm);

        _get(Object.getPrototypeOf(TourInputForm.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourInputForm, [{
        key: "render",
        value: function render() {
            var classes = ["tour", "form-horizontal"].concat(this.props.classes || []).join(" ");
            var tour = this.props.tour || { id: "new" };
            return React.createElement(
                "form",
                { className: classes, key: tour.id, onSubmit: this.submitTour.bind(this) },
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
                                    defaultValue: tour.name })
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
                                    defaultValue: tour.num_advances })
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
                                    defaultValue: tour.participants_per_heat })
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
                                    defaultValue: tour.scoring_system })
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
                                            defaultChecked: tour.hope_tour })
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
                                    { className: "btn btn-primary btn-sm", type: "button", onClick: this.props.stopEditing },
                                    "Discard"
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
            this.props.submitTour(this.serialize());
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                name: this.refs.name.getDOMNode().value,
                num_advances: this.refs.num_advances.getDOMNode().value,
                participants_per_heat: this.refs.participants_per_heat.getDOMNode().value,
                scoring_system: this.refs.scoring_system.getDOMNode().value,
                hope_tour: this.refs.hope_tour.getDOMNode().checked
            };
        }
    }]);

    return TourInputForm;
})(React.Component);

var TourEditingUI = (function (_React$Component2) {
    _inherits(TourEditingUI, _React$Component2);

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
        value: function renderEditor() {
            return React.createElement(TourInputForm, {
                tour: this.props.tour,
                submitTour: this.submitTour.bind(this),
                stopEditing: this.stopEditing.bind(this) });
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
        value: function submitTour(data) {
            new Api("tournaments.tour.set", {
                tour_id: this.props.tour.id,
                data: data
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

var TourCreatingUI = (function (_React$Component3) {
    _inherits(TourCreatingUI, _React$Component3);

    function TourCreatingUI() {
        _classCallCheck(this, TourCreatingUI);

        _get(Object.getPrototypeOf(TourCreatingUI.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourCreatingUI, [{
        key: "render",
        value: function render() {
            return React.createElement(TourInputForm, {
                classes: ["tour-create"],
                submitTour: this.submitTour.bind(this),
                stopEditing: this.props.stopEditing });
        }
    }, {
        key: "submitTour",
        value: function submitTour(data) {
            new Api("tournaments.tour.create", {
                inner_competition_id: this.props.inner_competition_id,
                add_after: this.props.add_after,
                data: data
            }).onSuccess((function (response) {
                this.props.stopEditing();
            }).bind(this)).send();
        }
    }]);

    return TourCreatingUI;
})(React.Component);

var InnerCompetitionManagementUI = (function (_React$Component4) {
    _inherits(InnerCompetitionManagementUI, _React$Component4);

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
//# sourceMappingURL=tour_management.js.map