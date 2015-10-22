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
                                _("models.tour.name"),
                                ":"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    list: "dl_tours",
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
                                _("models.tour.num_advances"),
                                ":"
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
                                _("models.tour.participants_per_heat"),
                                ":"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "participants_per_heat",
                                    defaultValue: tour.participants_per_heat || 2 })
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
                                _("models.tour.scoring_system_name"),
                                ":"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement(
                                    "select",
                                    {
                                        className: "form-control",
                                        ref: "scoring_system_name",
                                        defaultValue: tour.scoring_system_name || GL.scoring_systems[0] },
                                    GL.scoring_systems.map(function (sn) {
                                        return React.createElement(
                                            "option",
                                            { key: sn, value: sn },
                                            _("scoring_systems_names." + sn)
                                        );
                                    })
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                _("models.tour.is_hope_tour"),
                                ":"
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
                                    _("global.buttons.submit")
                                ),
                                " ",
                                React.createElement(
                                    "button",
                                    { className: "btn btn-primary btn-sm", type: "button", onClick: this.props.stopEditing },
                                    _("global.buttons.discard")
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
                scoring_system_name: this.refs.scoring_system_name.getDOMNode().value,
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
                                _("models.tour.num_advances"),
                                ":"
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
                                _("models.tour.participants_per_heat"),
                                ":"
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
                                _("models.tour.is_hope_tour"),
                                ":"
                            ),
                            " ",
                            this.props.tour.hope_tour ? _("global.labels.yes") : _("global.labels.no"),
                            " "
                        ),
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                _("models.tour.scoring_system_name"),
                                ":"
                            ),
                            " ",
                            _("scoring_systems_names." + this.props.tour.scoring_system_name),
                            " "
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-2" },
                        React.createElement(
                            "button",
                            { className: "full-width btn btn-primary btn-sm", onClick: this.startEditing.bind(this) },
                            _("global.buttons.edit")
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { className: "full-width btn btn-danger btn-sm", onClick: this.deleteTour.bind(this) },
                            _("global.buttons.delete")
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
            Api("tour.set", {
                tour_id: this.props.tour.id,
                data: data
            }).onSuccess((function (response) {
                this.stopEditing();
            }).bind(this)).send();
        }
    }, {
        key: "deleteTour",
        value: function deleteTour() {
            if (!confirm(_("admin.confirms.delete_tour"))) {
                return false;
            }
            Api("tour.delete", { tour_id: this.props.tour.id }).send();
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
            Api("tour.create", {
                discipline_id: this.props.discipline_id,
                add_after: this.props.add_after,
                data: data
            }).onSuccess((function (response) {
                this.props.stopEditing();
            }).bind(this)).send();
        }
    }]);

    return TourCreatingUI;
})(React.Component);

var ToursManagementUI = (function (_React$Component4) {
    _inherits(ToursManagementUI, _React$Component4);

    function ToursManagementUI(props) {
        _classCallCheck(this, ToursManagementUI);

        _get(Object.getPrototypeOf(ToursManagementUI.prototype), "constructor", this).call(this, props);
        this.state = {
            new_tour_after_id: -1
        };
    }

    _createClass(ToursManagementUI, [{
        key: "submitBaseData",
        value: function submitBaseData(event) {
            event.preventDefault();
            Api("discipline.set", {
                discipline_id: this.props.discipline.id,
                data: {
                    name: this.refs.name.getDOMNode().value,
                    external_id: this.refs.external_id.getDOMNode().value
                }
            }).onSuccess(function () {
                alert(_("global.messages.success"));
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
                    discipline_id: this.props.discipline.id,
                    add_after: after_id,
                    stopEditing: this.addTourAfter.bind(this, -1) });
            } else {
                return React.createElement(
                    "button",
                    { className: "btn btn-default full-width", onClick: this.addTourAfter.bind(this, after_id) },
                    _("admin.buttons.add_tour")
                );
            }
        }
    }, {
        key: "renderTours",
        value: function renderTours() {
            return this.props.discipline.tours.map((function (tour) {
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
                        this.props.discipline.name
                    )
                ),
                React.createElement(
                    "div",
                    { className: "ic-management-ui" },
                    this.renderTourCreation(null),
                    this.renderTours()
                ),
                React.createElement(
                    "datalist",
                    { id: "dl_tours" },
                    _getPossibleTourNames().map(function (n, idx) {
                        return React.createElement("option", { key: idx, value: n });
                    })
                )
            );
        }
    }]);

    return ToursManagementUI;
})(React.Component);
//# sourceMappingURL=tour_management.js.map