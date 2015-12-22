"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScreenOperatorTourSelector = (function (_React$Component) {
    _inherits(ScreenOperatorTourSelector, _React$Component);

    function ScreenOperatorTourSelector() {
        _classCallCheck(this, ScreenOperatorTourSelector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorTourSelector).apply(this, arguments));
    }

    _createClass(ScreenOperatorTourSelector, [{
        key: "expandSelect",
        value: function expandSelect(original_event) {
            original_event.preventDefault();
            original_event.stopPropagation();
            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            this.refs.select.dispatchEvent(e);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var options = [];
            this.props.competition.disciplines.forEach(function (discipline) {
                return discipline.tours.forEach(function (tour) {
                    return options.push(React.createElement(
                        "option",
                        { value: tour.id, key: tour.id },
                        discipline.name,
                        " — ",
                        tour.name + (tour.finalized ? " [over]" : "")
                    ));
                });
            });
            return React.createElement(
                "select",
                { value: this.props.value,
                    className: "form-control",
                    ref: "select",
                    onChange: function onChange(e) {
                        return _this2.props.onChange(e.target.value || null);
                    },
                    onTouchStart: this.expandSelect.bind(this) },
                React.createElement(
                    "option",
                    { value: "" },
                    "----------"
                ),
                options
            );
        }
    }]);

    return ScreenOperatorTourSelector;
})(React.Component);

var ScreenOperatorDisciplinePlaceSelector = (function (_React$Component2) {
    _inherits(ScreenOperatorDisciplinePlaceSelector, _React$Component2);

    function ScreenOperatorDisciplinePlaceSelector() {
        _classCallCheck(this, ScreenOperatorDisciplinePlaceSelector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorDisciplinePlaceSelector).apply(this, arguments));
    }

    _createClass(ScreenOperatorDisciplinePlaceSelector, [{
        key: "render",
        value: function render() {
            var _this4 = this;

            var options = [];
            this.props.competition.disciplines.forEach(function (discipline) {
                return options.push(React.createElement(
                    "option",
                    { value: discipline.id, key: discipline.id },
                    discipline.name
                ));
            });
            return React.createElement(
                "select",
                { value: this.props.value,
                    className: "form-control",
                    onChange: function onChange(e) {
                        return _this4.props.onChange(e.target.value || null);
                    } },
                React.createElement(
                    "option",
                    { value: "" },
                    "----------"
                ),
                options
            );
        }
    }]);

    return ScreenOperatorDisciplinePlaceSelector;
})(React.Component);

var ScreenOperatorHeatSelectorRow = (function (_React$Component3) {
    _inherits(ScreenOperatorHeatSelectorRow, _React$Component3);

    function ScreenOperatorHeatSelectorRow() {
        _classCallCheck(this, ScreenOperatorHeatSelectorRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorHeatSelectorRow).apply(this, arguments));
    }

    _createClass(ScreenOperatorHeatSelectorRow, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                _extends({ className: "heat" + (this.props.selected ? " selected" : "")
                }, onTouchEndOrClick(this.props.onClick)),
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "heat-number" },
                            React.createElement(
                                "div",
                                null,
                                this.props.heat
                            ),
                            React.createElement(
                                "div",
                                { className: "heat-label" },
                                _("screen_operator.labels.heat")
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "participants" },
                            this.props.runs.map(function (run) {
                                return React.createElement(
                                    "div",
                                    { className: "participant", key: run.id },
                                    React.createElement(
                                        "div",
                                        { className: "number" },
                                        run.participant.number
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "name" },
                                        run.participant.name
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return ScreenOperatorHeatSelectorRow;
})(React.Component);

var ScreenOperatorHeatSelector = (function (_React$Component4) {
    _inherits(ScreenOperatorHeatSelector, _React$Component4);

    function ScreenOperatorHeatSelector(props) {
        _classCallCheck(this, ScreenOperatorHeatSelector);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorHeatSelector).call(this, props));

        _this6.state = {
            tour: null
        };
        return _this6;
    }

    _createClass(ScreenOperatorHeatSelector, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            if (this.props.tour_id === null) {
                return;
            }
            this.storage = storage.getDomain("tour_" + this.props.tour_id);
            this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
            this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.loadData();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (this.props.tour_id === null) {
                return;
            }
            message_dispatcher.removeListener(this.reload_listener);
            message_dispatcher.removeListener(this.db_update_listener);
            storage.delDomain("tour_" + this.props.tour_id);
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                runs: {
                    participant: {}
                }
            };
            var serialized = this.storage.get("Tour").by_id(this.props.tour_id).serialize(SCHEMA);
            this.setState({ tour: serialized });
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("tour.get", {
                tour_id: this.props.tour_id,
                children: {
                    runs: {
                        participant: {}
                    }
                }
            }).addToDB("Tour", this.props.tour_id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "render",
        value: function render() {
            var _Math,
                _this7 = this;

            if (this.props.tour_id === null) {
                return null;
            }
            if (this.state.tour === null) {
                return React.createElement(Loader, null);
            }
            var result = [];
            var max_heat = (_Math = Math).max.apply(_Math, _toConsumableArray(this.state.tour.runs.map(function (run) {
                return run.heat;
            })));

            var _loop = function _loop(heat) {
                result.push(React.createElement(ScreenOperatorHeatSelectorRow, {
                    key: heat,
                    runs: _this7.state.tour.runs.filter(function (run) {
                        return run.heat == heat;
                    }),
                    heat: heat,
                    selected: _this7.props.value == heat,
                    onClick: function onClick() {
                        return _this7.props.onHeatSelect(heat);
                    } }));
            };

            for (var heat = 1; heat <= max_heat; ++heat) {
                _loop(heat);
            }
            return React.createElement(
                "div",
                { className: "heat-selector" },
                React.createElement(
                    "button",
                    _extends({ className: "btn btn-sm btn-warning btn-reset-heat",
                        type: "button"
                    }, onTouchEndOrClick(function () {
                        return _this7.props.onHeatSelect(null);
                    })),
                    _("screen_operator.buttons.reset_heat")
                ),
                result
            );
        }
    }]);

    return ScreenOperatorHeatSelector;
})(React.Component);

var ScreenOperatorPlaceSelector = (function (_React$Component5) {
    _inherits(ScreenOperatorPlaceSelector, _React$Component5);

    function ScreenOperatorPlaceSelector() {
        _classCallCheck(this, ScreenOperatorPlaceSelector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorPlaceSelector).apply(this, arguments));
    }

    _createClass(ScreenOperatorPlaceSelector, [{
        key: "render",
        value: function render() {
            var _this9 = this;

            if (this.props.discipline_id === null) {
                return null;
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "button",
                    _extends({ className: "btn btn-sm btn-warning btn-reset-place",
                        type: "button"
                    }, onTouchEndOrClick(function () {
                        return _this9.props.onChange(null);
                    })),
                    _("screen_operator.buttons.reset_place")
                ),
                React.createElement(DisciplineResults, {
                    discipline_id: this.props.discipline_id,
                    renderer: "screen_operator",
                    onPlaceSelect: function onPlaceSelect(place) {
                        return _this9.props.onChange(place);
                    },
                    selectedPlace: this.props.value,
                    key: this.props.discipline_id })
            );
        }
    }]);

    return ScreenOperatorPlaceSelector;
})(React.Component);

var ScreenOperatorTourHeatControls = (function (_React$Component6) {
    _inherits(ScreenOperatorTourHeatControls, _React$Component6);

    function ScreenOperatorTourHeatControls() {
        _classCallCheck(this, ScreenOperatorTourHeatControls);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorTourHeatControls).apply(this, arguments));
    }

    _createClass(ScreenOperatorTourHeatControls, [{
        key: "onTourChange",
        value: function onTourChange(new_value) {
            var new_state = clone(this.props.controls_state);
            new_state.tour_id = new_value;
            new_state.heat = null;
            this.props.onChange(new_state);
        }
    }, {
        key: "onHeatChange",
        value: function onHeatChange(new_value) {
            var new_state = clone(this.props.controls_state);
            new_state.heat = new_value;
            this.props.onChange(new_state);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    _("screen_operator.headers.tour")
                ),
                React.createElement(ScreenOperatorTourSelector, {
                    competition: this.props.competition,
                    value: this.props.controls_state.tour_id,
                    onChange: this.onTourChange.bind(this) }),
                React.createElement(
                    "h3",
                    null,
                    _("screen_operator.headers.heat")
                ),
                React.createElement(ScreenOperatorHeatSelector, {
                    key: this.props.controls_state.tour_id,
                    tour_id: this.props.controls_state.tour_id,
                    value: this.props.controls_state.heat,
                    onHeatSelect: this.onHeatChange.bind(this) })
            );
        }
    }]);

    return ScreenOperatorTourHeatControls;
})(React.Component);

var ScreenOperatorTourControls = (function (_React$Component7) {
    _inherits(ScreenOperatorTourControls, _React$Component7);

    function ScreenOperatorTourControls() {
        _classCallCheck(this, ScreenOperatorTourControls);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorTourControls).apply(this, arguments));
    }

    _createClass(ScreenOperatorTourControls, [{
        key: "onTourChange",
        value: function onTourChange(new_value) {
            var new_state = clone(this.props.controls_state);
            new_state.tour_id = new_value;
            this.props.onChange(new_state);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    _("screen_operator.headers.tour")
                ),
                React.createElement(ScreenOperatorTourSelector, {
                    competition: this.props.competition,
                    value: this.props.controls_state.tour_id,
                    onChange: this.onTourChange.bind(this) })
            );
        }
    }]);

    return ScreenOperatorTourControls;
})(React.Component);

var ScreenOperatorDisciplinePlaceControls = (function (_React$Component8) {
    _inherits(ScreenOperatorDisciplinePlaceControls, _React$Component8);

    function ScreenOperatorDisciplinePlaceControls() {
        _classCallCheck(this, ScreenOperatorDisciplinePlaceControls);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperatorDisciplinePlaceControls).apply(this, arguments));
    }

    _createClass(ScreenOperatorDisciplinePlaceControls, [{
        key: "onDisciplineChange",
        value: function onDisciplineChange(new_value) {
            var new_state = clone(this.props.controls_state);
            new_state.discipline_id = new_value;
            new_state.place = null;
            this.props.onChange(new_state);
        }
    }, {
        key: "onPlaceChange",
        value: function onPlaceChange(new_value) {
            var new_state = clone(this.props.controls_state);
            new_state.place = new_value;
            this.props.onChange(new_state);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    _("screen_operator.headers.discipline")
                ),
                React.createElement(ScreenOperatorDisciplinePlaceSelector, {
                    competition: this.props.competition,
                    value: this.props.controls_state.discipline_id,
                    onChange: this.onDisciplineChange.bind(this) }),
                React.createElement(
                    "h3",
                    null,
                    _("screen_operator.headers.places")
                ),
                React.createElement(ScreenOperatorPlaceSelector, {
                    discipline_id: this.props.controls_state.discipline_id,
                    value: this.props.controls_state.place,
                    onChange: this.onPlaceChange.bind(this) })
            );
        }
    }]);

    return ScreenOperatorDisciplinePlaceControls;
})(React.Component);

var ScreenOperator = (function (_React$Component9) {
    _inherits(ScreenOperator, _React$Component9);

    function ScreenOperator(props) {
        _classCallCheck(this, ScreenOperator);

        var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenOperator).call(this, props));

        _this13.manifest = new ScreenManifest(_this13.props.manifest);
        _this13.state = {
            competition: null,
            pending_data: null
        };
        _this13.loadData();
        message_dispatcher.addListener("db_update", _this13.reloadFromStorage.bind(_this13));
        message_dispatcher.addListener("reload_data", _this13.loadData.bind(_this13));
        return _this13;
    }

    _createClass(ScreenOperator, [{
        key: "loadData",
        value: function loadData() {
            Api("competition.get", { competition_id: this.props.competition_id, children: {
                    disciplines: {
                        tours: {}
                    }
                } }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "submitData",
        value: function submitData() {
            var _this14 = this;

            var data = this.state.pending_data || this.state.competition.screen_data;
            if (!this.validateControls(data)) {
                return;
            }
            Api("competition.set", {
                competition_id: this.props.competition_id,
                data: { screen_data: this.state.pending_data }
            }).onSuccess(function () {
                return _this14.setState({
                    pending_data: null
                });
            }).send();
        }
    }, {
        key: "resetData",
        value: function resetData() {
            this.setState({
                pending_data: null
            });
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            this.setState({
                competition: storage.get("Competition").by_id(this.props.competition_id).serialize({
                    disciplines: {
                        tours: {}
                    }
                })
            });
        }
    }, {
        key: "getDefaultControlsState",
        value: function getDefaultControlsState(controls_type) {
            switch (controls_type) {
                case "none":
                    return {};
                case "tour-heat":
                    return {
                        tour_id: null,
                        heat: 1
                    };
                case "tour":
                    return {
                        tour_id: null
                    };
                case "discipline-place":
                    return {
                        discipline_id: null,
                        place: null
                    };
            }
        }
    }, {
        key: "updateData",
        value: function updateData(updater) {
            var data = this.state.pending_data ? clone(this.state.pending_data) : clone(this.state.competition.screen_data);
            data = updater(data);
            this.setState({
                pending_data: data
            });
        }
    }, {
        key: "switchScreen",
        value: function switchScreen(new_id) {
            var _this15 = this;

            this.updateData(function (data) {
                if (data.screen_id != new_id) {
                    var screen_data = _this15.manifest.getScreenDataById(new_id);
                    var controls_type = screen_data.controls;
                    data = {
                        screen_id: new_id,
                        controls_state: _this15.getDefaultControlsState(controls_type)
                    };
                }
                return data;
            });
        }
    }, {
        key: "onControlsStateChange",
        value: function onControlsStateChange(new_value) {
            this.updateData(function (data) {
                data.controls_state = new_value;
                return data;
            });
        }
    }, {
        key: "validateControls",
        value: function validateControls(data) {
            var controls_type = this.manifest.getScreenDataById(data.screen_id).controls;
            switch (controls_type) {
                case "none":
                    return true;
                case "tour":
                case "tour-heat":
                    return data.controls_state.tour_id !== null;
                case "discipline-place":
                    return data.controls_state.discipline_id !== null;
            }
        }
    }, {
        key: "renderContols",
        value: function renderContols(data) {
            var controls_type = this.manifest.getScreenDataById(data.screen_id).controls;
            switch (controls_type) {
                case "none":
                    return null;
                case "tour-heat":
                    return React.createElement(ScreenOperatorTourHeatControls, {
                        key: data.screen_id,
                        competition: this.state.competition,
                        controls_state: data.controls_state,
                        onChange: this.onControlsStateChange.bind(this) });
                case "tour":
                    return React.createElement(ScreenOperatorTourControls, {
                        key: data.screen_id,
                        competition: this.state.competition,
                        controls_state: data.controls_state,
                        onChange: this.onControlsStateChange.bind(this) });
                case "discipline-place":
                    return React.createElement(ScreenOperatorDisciplinePlaceControls, {
                        key: data.screen_id,
                        competition: this.state.competition,
                        controls_state: data.controls_state,
                        onChange: this.onControlsStateChange.bind(this) });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this16 = this;

            if (this.state.competition === null) {
                return React.createElement(Loader, null);
            }
            var data = this.state.pending_data || this.state.competition.screen_data;
            return React.createElement(
                "div",
                { className: "screen-operator" },
                React.createElement(
                    "div",
                    { className: "left-col" },
                    this.manifest.raw_data.screens.map(function (screen_data) {
                        return React.createElement(
                            "div",
                            _extends({ className: "item" + (screen_data.id == data.screen_id ? " active" : ""),
                                key: screen_data.id
                            }, onTouchOrClick(function () {
                                return _this16.switchScreen(screen_data.id);
                            })),
                            screen_data.name
                        );
                    })
                ),
                React.createElement(
                    "div",
                    { className: "body" },
                    React.createElement(
                        "div",
                        { className: "controls" },
                        this.renderContols(data)
                    ),
                    this.state.pending_data ? React.createElement(
                        "div",
                        { className: "buttons" },
                        React.createElement(
                            "button",
                            _extends({ type: "button",
                                className: "btn btn-danger"
                            }, onTouchOrClick(this.resetData.bind(this))),
                            "Reset"
                        ),
                        React.createElement(
                            "button",
                            _extends({ type: "button",
                                className: "btn btn-primary",
                                disabled: !this.validateControls(data)
                            }, onTouchOrClick(this.submitData.bind(this))),
                            "Submit"
                        )
                    ) : null
                )
            );
        }
    }]);

    return ScreenOperator;
})(React.Component);
//# sourceMappingURL=screen_operator.js.map