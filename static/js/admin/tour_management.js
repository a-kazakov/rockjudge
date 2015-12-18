"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourInputForm = (function (_React$Component) {
    _inherits(TourInputForm, _React$Component);

    function TourInputForm() {
        _classCallCheck(this, TourInputForm);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourInputForm).apply(this, arguments));
    }

    _createClass(TourInputForm, [{
        key: "render",
        value: function render() {
            var classes = ["tour", ""].concat(this.props.classes || []).join(" ");
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
                                { className: "control-label" },
                                _("models.tour.name")
                            ),
                            React.createElement("input", {
                                list: "dl_tours",
                                type: "text",
                                className: "form-control",
                                ref: "name",
                                defaultValue: tour.name })
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm row" },
                            React.createElement(
                                "div",
                                { className: "col-lg-4" },
                                React.createElement(
                                    "label",
                                    { className: "control-label" },
                                    _("models.tour.num_advances")
                                ),
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "num_advances",
                                    disabled: tour.finalized,
                                    defaultValue: tour.num_advances })
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-4" },
                                React.createElement(
                                    "label",
                                    { className: "control-label" },
                                    _("models.tour.participants_per_heat")
                                ),
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "participants_per_heat",
                                    defaultValue: tour.participants_per_heat || 2 })
                            ),
                            React.createElement(
                                "div",
                                { div: true, className: "col-lg-4" },
                                React.createElement(
                                    "label",
                                    { className: "control-label" },
                                    _("models.tour.is_hope_tour")
                                ),
                                React.createElement(
                                    "div",
                                    { className: "checkbox" },
                                    React.createElement(
                                        "label",
                                        null,
                                        React.createElement("input", {
                                            type: "checkbox",
                                            ref: "hope_tour",
                                            disabled: tour.finalized,
                                            defaultChecked: tour.hope_tour })
                                    )
                                )
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
                                { className: "control-label" },
                                _("models.tour.scoring_system_name")
                            ),
                            React.createElement(
                                "select",
                                {
                                    className: "form-control",
                                    ref: "scoring_system_name",
                                    disabled: tour.finalized,
                                    defaultValue: tour.scoring_system_name || GL.scoring_systems[0] },
                                GL.scoring_systems.map(function (sn) {
                                    return React.createElement(
                                        "option",
                                        { key: sn, value: sn },
                                        _("scoring_systems_names." + sn)
                                    );
                                })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm row" },
                            React.createElement(
                                "div",
                                { className: "col-lg-6" },
                                React.createElement(
                                    "label",
                                    { className: "control-label" },
                                    _("models.tour.default_program")
                                ),
                                React.createElement("input", {
                                    type: "text",
                                    list: "dl_programs",
                                    className: "form-control",
                                    ref: "default_program",
                                    defaultValue: tour.default_program || "" })
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-6" },
                                React.createElement(
                                    "label",
                                    { className: "control-label" },
                                    " "
                                ),
                                React.createElement(
                                    "div",
                                    { className: "text-right" },
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
            var result = {
                name: this.refs.name.value,
                participants_per_heat: this.refs.participants_per_heat.value,
                default_program: this.refs.default_program.value
            };
            if (!this.props.tour || !this.props.tour.finalized) {
                $.extend(result, {
                    num_advances: this.refs.num_advances.value,
                    scoring_system_name: this.refs.scoring_system_name.value,
                    hope_tour: this.refs.hope_tour.checked
                });
            }
            return result;
        }
    }]);

    return TourInputForm;
})(React.Component);

var TourEditingUI = (function (_React$Component2) {
    _inherits(TourEditingUI, _React$Component2);

    function TourEditingUI(props) {
        _classCallCheck(this, TourEditingUI);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TourEditingUI).call(this, props));

        _this2.state = {
            editing: false
        };
        return _this2;
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
                        ),
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
                                _("models.tour.scoring_system_name"),
                                ":"
                            ),
                            " ",
                            _("scoring_systems_names." + this.props.tour.scoring_system_name),
                            " "
                        ),
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                _("models.tour.default_program"),
                                ":"
                            ),
                            " ",
                            this.props.tour.default_program,
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
            var _this3 = this;

            swal_confirm(_("admin.confirms.delete_tour"), function () {
                Api("tour.delete", { tour_id: _this3.props.tour.id }).onSuccess(function () {
                    return swal.close();
                }).send();
            });
        }
    }]);

    return TourEditingUI;
})(React.Component);

var TourCreatingUI = (function (_React$Component3) {
    _inherits(TourCreatingUI, _React$Component3);

    function TourCreatingUI() {
        _classCallCheck(this, TourCreatingUI);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourCreatingUI).apply(this, arguments));
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

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(ToursManagementUI).call(this, props));

        _this5.state = {
            new_tour_after_id: -1
        };
        return _this5;
    }

    _createClass(ToursManagementUI, [{
        key: "addTourAfter",
        value: function addTourAfter(tour_id) {
            this.setState({
                new_tour_after_id: tour_id
            });
        }
    }, {
        key: "renderTourCreation",
        value: function renderTourCreation(after_id, next_tour) {
            if (next_tour && next_tour.finalized) {
                return null;
            }
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
            return this.props.discipline.tours.map((function (tour, idx, arr) {
                return [React.createElement(TourEditingUI, { tour: tour, key: tour.id }), this.renderTourCreation(tour.id, arr[idx + 1])];
            }).bind(this));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "app-content" },
                React.createElement(
                    "header",
                    { className: "app-header" },
                    React.createElement(
                        "h1",
                        null,
                        this.props.discipline.name
                    )
                ),
                React.createElement(
                    "div",
                    { className: "app-body ic-management-ui" },
                    this.renderTourCreation(null, this.props.discipline.tours[0]),
                    this.renderTours()
                ),
                React.createElement(
                    "datalist",
                    { id: "dl_tours" },
                    _getPossibleTourNames().map(function (n, idx) {
                        return React.createElement("option", { key: idx, value: n });
                    })
                ),
                React.createElement(
                    "datalist",
                    { id: "dl_programs" },
                    GL.suggested_programs.map(function (n, idx) {
                        return React.createElement("option", { key: idx, value: n });
                    })
                )
            );
        }
    }]);

    return ToursManagementUI;
})(React.Component);
//# sourceMappingURL=tour_management.js.map