"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrintableCompetitionPlanRow = (function (_React$Component) {
    _inherits(PrintableCompetitionPlanRow, _React$Component);

    function PrintableCompetitionPlanRow() {
        _classCallCheck(this, PrintableCompetitionPlanRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PrintableCompetitionPlanRow).apply(this, arguments));
    }

    _createClass(PrintableCompetitionPlanRow, [{
        key: "renderName",
        value: function renderName() {
            var _this2 = this;

            if (this.props.item.verbose_name) {
                return React.createElement(
                    "td",
                    { colSpan: "2" },
                    React.createElement(
                        "p",
                        null,
                        React.createElement(
                            "strong",
                            null,
                            this.props.item.verbose_name
                        )
                    )
                );
            }
            if (this.props.item.tour_id) {
                var result = "";
                this.props.tours.forEach(function (tour) {
                    if (tour.id == _this2.props.item.tour_id) {
                        result = tour;
                    }
                });
                return [React.createElement(
                    "td",
                    { key: "D" },
                    React.createElement(
                        "p",
                        null,
                        result.discipline_name
                    )
                ), React.createElement(
                    "td",
                    { key: "T" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        result.tour_name
                    )
                )];
            }
            return React.createElement(
                "td",
                { colSpan: "2" },
                React.createElement("p", null)
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.item.estimated_beginning || React.createElement(
                            "span",
                            null,
                            " "
                        )
                    )
                ),
                this.renderName(),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.item.estimated_duration || React.createElement(
                            "span",
                            null,
                            " "
                        )
                    )
                )
            );
        }
    }]);

    return PrintableCompetitionPlanRow;
})(React.Component);

var PrintableCompetitionPlan = (function (_React$Component2) {
    _inherits(PrintableCompetitionPlan, _React$Component2);

    function PrintableCompetitionPlan() {
        _classCallCheck(this, PrintableCompetitionPlan);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PrintableCompetitionPlan).apply(this, arguments));
    }

    _createClass(PrintableCompetitionPlan, [{
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "div",
                { className: "print-only" },
                React.createElement(
                    "table",
                    { className: "bordered-table" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    _("models.competition_plan_item.estimated_beginning")
                                )
                            ),
                            React.createElement(
                                "th",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    _("models.competition_plan_item.discipline")
                                )
                            ),
                            React.createElement(
                                "th",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    _("models.competition_plan_item.tour")
                                )
                            ),
                            React.createElement(
                                "th",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    _("models.competition_plan_item.estimated_duration")
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.props.items.map(function (item) {
                            return React.createElement(PrintableCompetitionPlanRow, { item: item, tours: _this4.props.tours, key: item.id });
                        })
                    )
                )
            );
        }
    }]);

    return PrintableCompetitionPlan;
})(React.Component);

var CompetitionPlanItemEditorRow = (function (_React$Component3) {
    _inherits(CompetitionPlanItemEditorRow, _React$Component3);

    function CompetitionPlanItemEditorRow() {
        _classCallCheck(this, CompetitionPlanItemEditorRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CompetitionPlanItemEditorRow).apply(this, arguments));
    }

    _createClass(CompetitionPlanItemEditorRow, [{
        key: "sertialize",
        value: function sertialize() {
            return {
                sp: parseInt(this._sp.value) || 0,
                tour_id: this._tour_id.value == "" ? null : parseInt(this._tour_id.value),
                verbose_name: this._verbose_name.value,
                estimated_beginning: this._estimated_beginning.value,
                estimated_duration: this._estimated_duration.value
            };
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            if (!this.props.newCompetitionPlanItem) {
                Api("competition_plan_item.set", {
                    competition_plan_item_id: this.props.item.id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            } else {
                Api("competition_plan_item.create", {
                    competition_id: this.props.competition_id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "tr",
                { className: "editor" + (this.props.newCompetitionPlanItem ? " create" : "") },
                React.createElement(
                    "td",
                    { colSpan: "5" },
                    React.createElement(
                        "form",
                        { onSubmit: this.onSubmit.bind(this) },
                        React.createElement(
                            "div",
                            { className: "rows" },
                            React.createElement(
                                "div",
                                { className: "col-md-2" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.competition_plan_item.sp"),
                                    React.createElement("input", {
                                        ref: (function (e) {
                                            if (e) {
                                                e.select();this._sp = e;
                                            }
                                        }).bind(this),
                                        className: "full-width",
                                        defaultValue: this.props.item.sp })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-5" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.competition_plan_item.verbose_name"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this6._verbose_name = e);
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.item.verbose_name })
                                ),
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.competition_plan_item.tour"),
                                    React.createElement(
                                        "select",
                                        {
                                            ref: function ref(e) {
                                                return e && (_this6._tour_id = e);
                                            },
                                            className: "full-width",
                                            defaultValue: this.props.item.tour_id || "" },
                                        React.createElement(
                                            "option",
                                            { value: "" },
                                            "----------"
                                        ),
                                        this.props.tours.map(function (tour) {
                                            return React.createElement(
                                                "option",
                                                { value: tour.id, key: tour.id },
                                                tour.name
                                            );
                                        })
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-2" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.competition_plan_item.estimated_beginning"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this6._estimated_beginning = e);
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.item.estimated_beginning })
                                ),
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.competition_plan_item.estimated_duration"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this6._estimated_duration = e);
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.item.estimated_duration })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-3" },
                                React.createElement(
                                    "div",
                                    { className: "buttons" },
                                    React.createElement(
                                        "button",
                                        {
                                            type: "submit",
                                            className: "btn btn-primary" },
                                        _("global.buttons.submit")
                                    ),
                                    React.createElement(
                                        "button",
                                        {
                                            type: "button",
                                            className: "btn btn-danger",
                                            onClick: this.props.stopEditing },
                                        _("global.buttons.discard")
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CompetitionPlanItemEditorRow;
})(React.Component);

var CompetitionPlanItemRow = (function (_React$Component4) {
    _inherits(CompetitionPlanItemRow, _React$Component4);

    function CompetitionPlanItemRow(props) {
        _classCallCheck(this, CompetitionPlanItemRow);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(CompetitionPlanItemRow).call(this, props));

        _this7.state = {
            editing: false
        };
        return _this7;
    }

    _createClass(CompetitionPlanItemRow, [{
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
        key: "onDelete",
        value: function onDelete(event) {
            event.stopPropagation();
            Api("competition_plan_item.delete", {
                competition_plan_item_id: this.props.item.id
            }).send();
        }
    }, {
        key: "getName",
        value: function getName() {
            var c = this.props.item;
            if (c.verbose_name) {
                return c.verbose_name;
            }
            var result = "";
            this.props.tours.forEach(function (tour) {
                if (tour.id == c.tour_id) {
                    result = tour.name;
                }
            });
            return result;
        }
    }, {
        key: "renderEditor",
        value: function renderEditor() {
            return React.createElement(CompetitionPlanItemEditorRow, _extends({
                newCompetitionPlanItem: false,
                stopEditing: this.stopEditing.bind(this)
            }, this.props));
        }
    }, {
        key: "renderViewer",
        value: function renderViewer() {
            var c = this.props.item;
            return React.createElement(
                "tr",
                { className: "viewer", onClick: this.startEditing.bind(this) },
                React.createElement(
                    "td",
                    { className: "sp" },
                    c.sp
                ),
                React.createElement(
                    "td",
                    { className: "name" },
                    this.getName()
                ),
                React.createElement(
                    "td",
                    { className: "estimated_beginning" },
                    c.estimated_beginning
                ),
                React.createElement(
                    "td",
                    { className: "estimated_duration" },
                    c.estimated_duration
                ),
                React.createElement(
                    "td",
                    { className: "delete" },
                    React.createElement(
                        "button",
                        { className: "btn btn-danger", onClick: this.onDelete.bind(this) },
                        "X"
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.editing) {
                return this.renderEditor();
            } else {
                return this.renderViewer();
            }
        }
    }]);

    return CompetitionPlanItemRow;
})(React.Component);

var CompetitionPlanItemCreationRow = (function (_React$Component5) {
    _inherits(CompetitionPlanItemCreationRow, _React$Component5);

    function CompetitionPlanItemCreationRow(props) {
        _classCallCheck(this, CompetitionPlanItemCreationRow);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(CompetitionPlanItemCreationRow).call(this, props));

        _this8.state = {
            editing: false
        };
        return _this8;
    }

    _createClass(CompetitionPlanItemCreationRow, [{
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
            var empty_data = {
                "sp": "",
                "verbose_name": "",
                "tour_id": null,
                "estimated_duration": "",
                "estimated_beginning": ""
            };
            return React.createElement(CompetitionPlanItemEditorRow, _extends({
                newCompetitionPlanItem: true,
                stopEditing: this.stopEditing.bind(this),
                item: empty_data
            }, this.props));
        }
    }, {
        key: "renderButton",
        value: function renderButton() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "5" },
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            className: "btn btn-default full-width",
                            onClick: this.startEditing.bind(this) },
                        _("admin.buttons.add_competition_plan_item")
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return this.state.editing ? this.renderEditor() : this.renderButton();
        }
    }]);

    return CompetitionPlanItemCreationRow;
})(React.Component);

var CompetitionPlanManagementUI = (function (_React$Component6) {
    _inherits(CompetitionPlanManagementUI, _React$Component6);

    function CompetitionPlanManagementUI(props) {
        _classCallCheck(this, CompetitionPlanManagementUI);

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(CompetitionPlanManagementUI).call(this, props));

        _this9.state = {
            creating: false
        };
        return _this9;
    }

    _createClass(CompetitionPlanManagementUI, [{
        key: "genTours",
        value: function genTours() {
            var result = [];
            this.props.disciplines.forEach(function (discipline) {
                return discipline.tours.forEach(function (tour) {
                    return result.push({
                        id: tour.id,
                        name: discipline.name + " — " + tour.name,
                        discipline_name: discipline.name,
                        tour_name: tour.name
                    });
                });
            });
            return result;
        }
    }, {
        key: "renderTable",
        value: function renderTable(tours) {
            var rows = this.props.items.map((function (item) {
                return React.createElement(CompetitionPlanItemRow, {
                    key: item.id,
                    tours: tours,
                    item: item });
            }).bind(this));
            return React.createElement(
                "div",
                { className: "manage-competition-plan" },
                React.createElement(
                    "table",
                    { className: "table table-striped" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "sp" },
                                _("models.competition_plan_item.sp")
                            ),
                            React.createElement(
                                "th",
                                { className: "name" },
                                _("models.competition_plan_item.name")
                            ),
                            React.createElement(
                                "th",
                                { className: "estimated_beginning" },
                                _("models.competition_plan_item.estimated_beginning")
                            ),
                            React.createElement(
                                "th",
                                { className: "estimated_duration" },
                                _("models.competition_plan_item.estimated_duration")
                            ),
                            React.createElement("th", { className: "delete" })
                        ),
                        rows,
                        React.createElement(CompetitionPlanItemCreationRow, { competition_id: this.props.competition_id, tours: tours })
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var tours = this.genTours();
            return React.createElement(
                "div",
                { className: "app-content" },
                React.createElement(
                    "header",
                    { className: "app-header" },
                    React.createElement(
                        "div",
                        { className: "controls" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.createDocx.bind(this), key: "btn-init-tour" },
                            "DOCX"
                        )
                    ),
                    React.createElement(
                        "h1",
                        null,
                        _("admin.headers.competition_plan_management")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "app-body" },
                    this.renderTable(tours),
                    React.createElement(PrintableCompetitionPlan, _extends({ ref: "printable_competition_plan", tours: tours }, this.props))
                )
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            Docx("program").setMargins([10, 15, 10, 15]).setHeader(this.props.competition_name + ", " + this.props.competition_date).setTitle1(_("admin.headers.competition_plan")).setBody(ReactDOM.findDOMNode(this.refs.printable_competition_plan).innerHTML).save();
        }
    }]);

    return CompetitionPlanManagementUI;
})(React.Component);
//# sourceMappingURL=competition_plan_management.js.map