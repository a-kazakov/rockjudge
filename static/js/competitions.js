(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.Competitions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _loader = require("i10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _dialogs = require("ui/dialogs");

var _tools = require("common/tools");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompetitionEditorRow = function (_React$Component) {
    _inherits(CompetitionEditorRow, _React$Component);

    function CompetitionEditorRow(props) {
        _classCallCheck(this, CompetitionEditorRow);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        var state = (0, _tools.clone)(_this.props.competition);
        _this.state = state;
        _this.latest_added = "base";
        return _this;
    }

    CompetitionEditorRow.prototype.onChange = function onChange(group, idx, field, type, event) {
        var new_value = field === "active" ? event.target.checked : event.target.value;
        var state = (0, _tools.clone)(this.state);
        switch (group) {
            case "info":
                state.info[idx][field] = new_value;
                break;
            case "":
                state[field] = new_value;
        }
        this.setState(state);
    };

    CompetitionEditorRow.prototype.addInfoItem = function addInfoItem() {
        var info = (0, _tools.clone)(this.state.info);
        var new_idx = info.length;
        info.push(["", ""]);
        this.latest_added = "info" + new_idx;
        this.setState({
            info: info
        });
    };

    CompetitionEditorRow.prototype.removeInfoItem = function removeInfoItem(idx) {
        var info = (0, _tools.clone)(this.state.info);
        info.splice(idx, 1);
        this.setState({
            info: info
        });
    };

    CompetitionEditorRow.prototype.moveInfoItemUp = function moveInfoItemUp(idx) {
        var info = (0, _tools.clone)(this.state.info);
        var current = info[idx];
        var upper = info[idx - 1];
        info[idx] = upper;
        info[idx - 1] = current;
        this.setState({
            info: info
        });
    };

    CompetitionEditorRow.prototype.moveInfoItemDown = function moveInfoItemDown(idx) {
        this.moveInfoItemUp(idx + 1);
    };

    CompetitionEditorRow.prototype.sertialize = function sertialize() {
        return {
            name: this.state.name,
            date: this.state.date,
            active: this.state.active,
            info: this.state.info
        };
    };

    CompetitionEditorRow.prototype.onSubmit = function onSubmit(event) {
        event.preventDefault();
        if (!this.props.newCompetition) {
            (0, _api.Api)("competition.set", {
                competition_id: this.state.id,
                data: this.sertialize()
            }).onSuccess(this.props.stopEditing).send();
        } else {
            (0, _api.Api)("competition.create", {
                data: this.sertialize()
            }).onSuccess(this.props.stopEditing).send();
        }
    };

    CompetitionEditorRow.prototype.render = function render() {
        var bti = (this.props.idx || 1000) * 10000;
        var info = this.state.info.map(function (item, idx) {
            return React.createElement(
                "div",
                { className: "info-item", key: idx },
                React.createElement("input", {
                    tabIndex: bti + 1000 + 10 * idx + 1,
                    ref: function (e) {
                        if (e && this.latest_added === "info" + idx.toString()) {
                            e.select();
                            this.latest_added = null;
                        };
                    }.bind(this),
                    type: "text",
                    className: "title",
                    placeholder: (0, _loader._)("models.competition.info_item_title"),
                    value: item[0],
                    onChange: this.onChange.bind(this, "info", idx, 0, "any") }),
                React.createElement("input", {
                    tabIndex: bti + 1000 + 10 * idx + 2,
                    type: "text",
                    className: "value",
                    placeholder: (0, _loader._)("models.competition.info_item_value"),
                    value: item[1],
                    onChange: this.onChange.bind(this, "info", idx, 1, "any") }),
                React.createElement(
                    "button",
                    {
                        type: "button",
                        className: "down btn btn-primary",
                        disabled: idx === this.state.info.length - 1,
                        onClick: this.moveInfoItemDown.bind(this, idx) },
                    "↓"
                ),
                React.createElement(
                    "button",
                    {
                        type: "button",
                        className: "up btn btn-primary",
                        disabled: idx === 0,
                        onClick: this.moveInfoItemUp.bind(this, idx) },
                    "↑"
                ),
                React.createElement(
                    "button",
                    {
                        type: "button",
                        className: "del btn btn-danger",
                        onClick: this.removeInfoItem.bind(this, idx) },
                    "X"
                )
            );
        }.bind(this));
        return React.createElement(
            "tr",
            { className: "editor" + (this.props.newCompetition ? " create" : "") },
            React.createElement(
                "td",
                { colSpan: "4" },
                React.createElement(
                    "form",
                    { onSubmit: this.onSubmit.bind(this) },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-3 general-info" },
                            React.createElement(
                                "label",
                                { className: "full-width" },
                                (0, _loader._)("models.competition.name"),
                                React.createElement("input", {
                                    tabIndex: bti + 1,
                                    ref: function (e) {
                                        if (e && this.latest_added === "base") {
                                            e.select();
                                            this.latest_added = null;
                                        };
                                    }.bind(this),
                                    className: "full-width",
                                    value: this.state.name,
                                    onChange: this.onChange.bind(this, "", null, "name", "any") })
                            ),
                            React.createElement(
                                "label",
                                { className: "full-width" },
                                (0, _loader._)("models.competition.date"),
                                React.createElement("input", {
                                    tabIndex: bti + 2,
                                    className: "full-width",
                                    value: this.state.date,
                                    onChange: this.onChange.bind(this, "", null, "date", "any") })
                            ),
                            React.createElement(
                                "label",
                                { className: "full-width" },
                                (0, _loader._)("models.competition.active"),
                                React.createElement("br", null),
                                React.createElement("input", {
                                    tabIndex: bti + 3,
                                    type: "checkbox",
                                    checked: this.state.active,
                                    onChange: this.onChange.bind(this, "", null, "active", "any") })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-7" },
                            React.createElement(
                                "label",
                                null,
                                (0, _loader._)("models.competition.info")
                            ),
                            info,
                            React.createElement(
                                "button",
                                {
                                    tabIndex: bti + 1999,
                                    type: "button",
                                    className: "full-width btn btn-sm btn-default",
                                    onClick: this.addInfoItem.bind(this) },
                                (0, _loader._)("global.buttons.add")
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-2" },
                            React.createElement(
                                "label",
                                null,
                                " "
                            ),
                            React.createElement(
                                "div",
                                { className: "buttons" },
                                React.createElement(
                                    "button",
                                    {
                                        tabIndex: bti + 10000,
                                        type: "submit",
                                        className: "btn btn-primary" },
                                    (0, _loader._)("global.buttons.submit")
                                ),
                                React.createElement(
                                    "button",
                                    {
                                        tabIndex: bti + 10001,
                                        type: "button",
                                        className: "btn btn-danger",
                                        onClick: this.props.stopEditing },
                                    (0, _loader._)("global.buttons.discard")
                                )
                            )
                        )
                    )
                )
            )
        );
    };

    return CompetitionEditorRow;
}(React.Component);

var CompetitionRow = function (_React$Component2) {
    _inherits(CompetitionRow, _React$Component2);

    function CompetitionRow(props) {
        _classCallCheck(this, CompetitionRow);

        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.state = {
            editing: false
        };
        return _this2;
    }

    CompetitionRow.prototype.startEditing = function startEditing() {
        this.setState({
            editing: true
        });
    };

    CompetitionRow.prototype.stopEditing = function stopEditing() {
        this.setState({
            editing: false
        });
    };

    CompetitionRow.prototype.onDelete = function onDelete(event) {
        var _this3 = this;

        event.stopPropagation();
        (0, _dialogs.showConfirm)((0, _loader._)("admin.confirms.delete_competition"), function () {
            (0, _api.Api)("competition.delete", {
                competition_id: _this3.props.competition.id
            }).onSuccess(function () {
                return swal.close();
            }).send();
        });
    };

    CompetitionRow.prototype.renderEditor = function renderEditor() {
        return React.createElement(CompetitionEditorRow, _extends({
            newCompetition: false,
            stopEditing: this.stopEditing.bind(this)
        }, this.props));
    };

    CompetitionRow.prototype.renderViewer = function renderViewer() {
        var p = this.props.competition;
        return React.createElement(
            "tr",
            { className: "viewer", onClick: this.startEditing.bind(this) },
            React.createElement(
                "td",
                { className: "name" },
                p.name
            ),
            React.createElement(
                "td",
                { className: "date" },
                p.date
            ),
            React.createElement(
                "td",
                { className: "is-active" },
                p.active ? (0, _loader._)("global.labels.yes") : (0, _loader._)("global.labels.no")
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
    };

    CompetitionRow.prototype.render = function render() {
        if (this.state.editing) {
            return this.renderEditor();
        } else {
            return this.renderViewer();
        }
    };

    return CompetitionRow;
}(React.Component);

var CompetitionCreationRow = function (_React$Component3) {
    _inherits(CompetitionCreationRow, _React$Component3);

    function CompetitionCreationRow(props) {
        _classCallCheck(this, CompetitionCreationRow);

        var _this4 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

        _this4.state = {
            editing: false
        };
        return _this4;
    }

    CompetitionCreationRow.prototype.startEditing = function startEditing() {
        this.setState({
            editing: true
        });
    };

    CompetitionCreationRow.prototype.stopEditing = function stopEditing() {
        this.setState({
            editing: false
        });
    };

    CompetitionCreationRow.prototype.renderEditor = function renderEditor() {
        var empty_data = {
            "name": "",
            "date": "",
            "active": true,
            "info": []
        };
        return React.createElement(CompetitionEditorRow, _extends({
            newCompetition: true,
            stopEditing: this.stopEditing.bind(this),
            competition: empty_data
        }, this.props));
    };

    CompetitionCreationRow.prototype.renderButton = function renderButton() {
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
                    (0, _loader._)("admin.buttons.add_competition")
                )
            )
        );
    };

    CompetitionCreationRow.prototype.render = function render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    };

    return CompetitionCreationRow;
}(React.Component);

var Competitions = exports.Competitions = function (_React$Component4) {
    _inherits(Competitions, _React$Component4);

    function Competitions(props) {
        _classCallCheck(this, Competitions);

        var _this5 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

        _this5.state = {
            competitions: null
        };
        _message_dispatcher.message_dispatcher.addListener("db_update", _this5.reloadFromStorage.bind(_this5));
        _message_dispatcher.message_dispatcher.addListener("competition_list_update", _this5.loadData.bind(_this5));
        _message_dispatcher.message_dispatcher.addListener("reload_data", _this5.loadData.bind(_this5));
        _this5.loadData();
        return _this5;
    }

    Competitions.prototype.reloadFromStorage = function reloadFromStorage() {
        var serialized = _storage.storage.get("Competition").all().map(function (c) {
            return c.serialize({});
        });
        this.setState({
            competitions: serialized
        });
    };

    Competitions.prototype.loadData = function loadData() {
        (0, _api.Api)("competition.get_all", {
            children: {}
        }).onSuccess(function (response) {
            _storage.storage.del("Competition");
            response.forEach(function (c) {
                return _storage.storage.get("Competition").add(c.id, c.data);
            });
            this.reloadFromStorage();
        }.bind(this)).send();
    };

    Competitions.prototype.renderTable = function renderTable() {
        var rows = this.state.competitions.map(function (competition) {
            return React.createElement(CompetitionRow, {
                key: competition.id,
                competition: competition });
        }.bind(this));
        return React.createElement(
            "div",
            { className: "manage-competitions" },
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
                            { className: "name" },
                            (0, _loader._)("models.competition.name")
                        ),
                        React.createElement(
                            "th",
                            { className: "date" },
                            (0, _loader._)("models.competition.date")
                        ),
                        React.createElement(
                            "th",
                            { className: "is-active" },
                            (0, _loader._)("models.competition.active")
                        ),
                        React.createElement("th", { className: "delete" })
                    ),
                    rows,
                    React.createElement(CompetitionCreationRow, {
                        discipline_id: this.props.discipline_id })
                )
            )
        );
    };

    Competitions.prototype.render = function render() {
        if (this.state.competitions === null) {
            return React.createElement(_components.Loader, null);
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "header",
                null,
                React.createElement(
                    "h1",
                    null,
                    (0, _loader._)("admin.headers.competitions_management")
                )
            ),
            this.renderTable()
        );
    };

    return Competitions;
}(React.Component);

},{"common/tools":2,"i10n/loader":4,"server/api":6,"server/message_dispatcher":7,"server/storage":8,"ui/components":9,"ui/dialogs":10}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.clone = clone;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clone(obj) {
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object") {
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}

var CmpChainImpl = function () {
    function CmpChainImpl() {
        _classCallCheck(this, CmpChainImpl);

        this.result = 0;
    }

    CmpChainImpl.prototype.cmp = function cmp(a, b) {
        if (this.result === 0) {
            if (a < b) {
                this.result = -1;
            } else if (a > b) {
                this.result = 1;
            }
        }
        return this;
    };

    CmpChainImpl.prototype.end = function end() {
        return this.result;
    };

    return CmpChainImpl;
}();

var CmpChain = exports.CmpChain = function CmpChain() {
    return new CmpChainImpl();
};

},{}],3:[function(require,module,exports){
"use strict";

var _main = require("admin/competitions/main");

ReactDOM.render(React.createElement(_main.Competitions, window.page_props), document.getElementById("content"));

},{"admin/competitions/main":1}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":5}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.translate = translate;
function translate(src, arg) {
    function chooseEnding(n, e1, e2, e5) {
        var x = n % 100;
        if (Math.floor(x / 10) === 1) {
            return e5;
        }
        if (x % 10 === 1) {
            return e1;
        }
        if (x % 10 >= 5 || x % 10 === 0) {
            return e5;
        }
        return e2;
    }

    var PHRASES = {
        "admin": {
            "alerts": {
                "about": function about(version, date) {
                    return React.createElement(
                        "div",
                        { className: "about" },
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "b",
                                null,
                                "RockJudge ",
                                version
                            ),
                            " (от ",
                            date,
                            ") — система для подсчета результатов соревнований по акробатическому рок-н-роллу."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Авторские права на систему RockJudge полностью принадлежат разработчику Артему Казакову. Соавтор системы Антон Амелин."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Система распространяется по лицензии Linum d.o.o (info@linum.hr). Для использования системы судейства RockJudge необходимо и достаточно иметь право использования системы Linum LPS."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Официальный сайт: ",
                            React.createElement(
                                "a",
                                { href: "https://rockjudge.com/", target: "_blank" },
                                "https://rockjudge.com/"
                            )
                        )
                    );
                },
                "add_programs_after_creation": "Программы можно будет добавить только после сохранения участника",
                "auto_printer_available": "Автоматическая печать корректно настроена и может быть использована.",
                "auto_printer_not_available": "Автоматическая печать недоступна на этом компьтере.",
                "no_finalized": "Отсутствуют финализированные туры",
                "unfinalize_warning": React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        React.createElement(
                            "strong",
                            null,
                            "Финализация должна отменяться только в исключительных случаях!"
                        )
                    ),
                    React.createElement(
                        "p",
                        null,
                        "Если же это действительно необходимо, обратите внимание, что после повторной финализации список участников следующего тура будет автоматически пересоздан. Результаты участников, прошедших в следующий тур после первой финализации и не прошедших после повторной будут безвозвратно утеряны!"
                    ),
                    React.createElement(
                        "p",
                        null,
                        "И не забудьте заново напечатать все тблицы."
                    )
                )
            },
            "auto_printer": {
                "discipline": "Дисциплина",
                "discipline_results": "Результаты дисциплины",
                "heats": "Заходы сл. тура",
                "print_test_page": "Напечатать тестовую страницу",
                "queue": "Очередь печати",
                "queue_empty": "Очередь пуста",
                "results_1": "Краткая таблица",
                "results_2": "Средняя таблица",
                "results_3": "Подробная таблица",
                "rules": "Задания",
                "test": "",
                "test_page": "Тестовая страница",
                "test_text": "Это тестовая страница RockJudge"
            },
            "buttons": {
                "add_club": "Добавить клуб",
                "add_competition": "Создать соревнование",
                "add_competition_plan_item": "Добавить элемент",
                "add_discipline": "Добавить дисциплину",
                "add_judge": "Добавить судью",
                "add_participant": "Добавить участника",
                "add_tour": "Добавить тур",
                "confirm_score": "Зафиксировать",
                "docx_heats": "Заходы в DOCX",
                "docx_numbers": "Номера в DOCX",
                "docx_results": "Результаты в DOCX",
                "export": "Экспортировать",
                "import": "Импортировать",
                "launch_auto_printer": "Запуск автоматической печати",
                "load_acro": "Загрузить акробатику",
                "refresh_clients": "Перезагрузить все устройства",
                "reload_clients": "Обновить данные на всех устройствах",
                "switch_to_plan": "Сортирока по программе",
                "switch_to_disciplines": "Сортирока по дисциплинам",
                "to_start_page": "На главную",
                "unconfirm_score": "Отмена фиксации",
                "unfinalize": "Отменить финализацию"
            },
            "confirms": {
                "delete_club": "Вы действительно хотите удалить этот клуб?",
                "delete_competition": "Вы действительно хотите удалить это соревнование?",
                "delete_discipline": "Вы действительно хотите удалить эту дисциплину?",
                "delete_judge": "Вы действительно хотите удалить этого судью?",
                "delete_participant": "Вы действительно хотите удалить этого участника?",
                "delete_program": "Вы действительно хотите удалить эту программу?",
                "delete_tour": "Вы действительно хотите удалить этот тур?",
                "refresh_clients": "Вы действительно хотите перезагрузить страницу на всех клиентах?",
                "reload_clients": "Вы действительно хотите обновить данные на всех клиентах?",
                "unfinalize_tour": "Вы действительно хотите отменить финализацию тура? Введите «unfinalize», чтобы продолжить"
            },
            "headers": {
                "about": "О программе",
                "auto_printer": "Автоматическая печать",
                "clients_management": "Управление подключенными устройствами",
                "clubs": "Клубы-участники",
                "clubs_management": "Управление клубами",
                "clubs_summary": "Сводка по клубам",
                "competition_plan": "Программа соревнований",
                "competition_plan_management": "Программа соревнований",
                "competition_report": "Протокол соревнований",
                "competition_results": "Результаты соревнований",
                "competitions_management": "Управление соревнованиями",
                "discipline_judges": "Распределение судей по дисциплинам",
                "discipline_results": "Результаты дисциплины",
                "disciplines_management": "Управление дисциплинами",
                "disciplines_shown": "Информация только по следующим дисциплинам:",
                "disciplines_summary": "Сводка по дисциплинам",
                "export_competition": "Экспорт данных турнира и результатов",
                "import_competition": "Импорт данных турнира",
                "import_export": "Импорт / экспорт",
                "judges": "Судейская бригада",
                "judges_management": "Управление судьями",
                "load_acrobatics": "Загрузка акробатики",
                "participants_management": "Управление участниками",
                "service_menu": "Сервисное меню",
                "start_list": "Стартовый лист",
                "tour_heats": "Заходы участников",
                "tour_results": "Результаты тура",
                "unfinalize_tour": "Отмена финализации тура",
                "unpicked_tours": "Не включены в программу"
            },
            "labels": {
                "competition_date": "Дата проведения",
                "competition_name": "Наименование соревнования",
                "discipline": "Дисциплина",
                "group_by_clubs": "Группировать по клубам",
                "include_acrobatics": "Включить акробатику",
                "include_clubs": "Включить данные о клубах",
                "include_discipline_judges": "Включить распределение судей по дисциплинам",
                "include_extended_info": "Включить расширенную информацию",
                "include_formation_sportsmen": "Включить состав формейшнов",
                "include_judges": "Включить данные о судьях",
                "no_files_selected": "Выберите файл...",
                "paste_acro": "Вставьте данные из калькулятора акробатики",
                "show_summary": "Показывать только количество",
                "sub": "зап" },
            // substitute
            "messages": {
                "invalid_passcode": "Введён неверный код потверждения"
            },
            "menu": {
                "competition_report": "Протокол соревнований",
                "discipline_results": "Результаты дисциплины",
                "import_export": "Импорт / экспорт",
                "manage_clubs": "Управление клубами",
                "manage_competition_plan": "Программа соревнований",
                "manage_disciplines": "Управление дисциплинами",
                "manage_judges": "Управление судьями",
                "manage_sportsmen": "Управление спортсменами",
                "manage_tours": "Управление турами",
                "start_list": "Стартовый лист"
            },
            "phrases": {
                "n_participants": function n_participants(n) {
                    return n.toString() + " участник" + chooseEnding(n, "", "а", "ов");
                },
                "n_sportsmen": function n_sportsmen(n) {
                    return n.toString() + " спортсмен" + chooseEnding(n, "", "а", "ов");
                },
                "total_n_participants": function total_n_participants(n) {
                    return "Итого " + n + " участник" + chooseEnding(n, "", "а", "ов");
                }
            },
            "judging-tabs": {
                "tour-admin": "Управление",
                "heats": "Заходы",
                "results-1": "Краткая таблица",
                "results-2": "Средняя таблица",
                "results-3": "Подробная таблица",
                "discipline-results": "Результаты дисциплины"
            }
        },
        "errors": {
            "admin": {
                "load_syntax_error": "Некорректный формат данных"
            },
            "api": {
                "duplicated_external_id": "В данных имеются записи с повторяющимимся external_id",
                "unable_to_get": function unable_to_get(wanted) {
                    return "Невозможно получить " + wanted + " из запроса";
                }
            },
            "club": {
                "delete_with_participants": "Невозможно удалить клуб, к которому привязаны участники"
            },
            "competition": {
                "delete_non_empty": "Невозможно удалить соревнование, содержащее дисциплины, клубы или судей"
            },
            "competition_plan": {
                "too_many_tours": function too_many_tours(d) {
                    return ["Ошибка в программе соревнований", "В дисциплине " + d + " содержится больше туров, чем создано в системе"];
                }
            },
            "discipline": {
                "change_judges_with_finalized_tour": "Невозможно изменить состав судей для дисциплины, содержащей финализированные туры",
                "delete_with_participants": "Невозможно удалить дисциплину, содержащую участников",
                "delete_with_tours": "Невозможно удалить дисциплину, содержащую туры"
            },
            "discipline_judge": {
                "delete_with_finalized": "Невозможно удалить судью, у корого есть финализированне туры",
                "delete_with_scores": "Невозможно удалить судью принявшего участие в судействе хотя бы одного тура",
                "repeating_judge": function repeating_judge(name) {
                    return name + " встречается в списке судей более одного раза";
                }
            },
            "global": {
                "internal_server_error": ["Ошибка на сервере", "проверьте логи для информации"]
            },
            "judge": {
                "delete_with_disciplines": "Невозможно удалить судью, входящего в судейскую бригаду хотя бы одной дисциплины"
            },
            "participant": {
                "delete_with_finalized_tours": "Невозможно удалить участника, принявшего участие хотя бы в одном финализированном туре"
            },
            "run": {
                "set_performed_flag_on_finalized": "Невозможно изменить статус захода финализинованного тура"
            },
            "score": {
                "score_not_exist": "Попытка получить значение несуществующей оценки судьи",
                "update_on_finalized_tour": "Невозможно изменить оценку в финализированном туре"
            },
            "tour": {
                "add_before_finalized": "Невозможно добавить новый тур перед финализированным",
                "delete_finalized": "Невозможно удалить финализированный тур",
                "delete_in_competition_plan": "Невозможно удалить тур, присутствующий в программе соревнований",
                "init_finailzed": "Невозможно пересоздать финализированный тур",
                "invalid_add_after_id": "Попытка добаить тур в несуществующее место",
                "load_to_non_empty": function load_to_non_empty(d) {
                    return ["Невозможно загрузить туры для дисциплины", "Дисциплина " + d + " уже содержит туры"];
                },
                "next_is_finailzed": "Следующий тур не должен быть финализирован",
                "no_next_tour": "Данный тур последний в программе соревнований",
                "not_in_competition_plan": "Данный тур не содержится в программе соревнований",
                "prev_not_finailzed": "Предыдущий тур должен быть финализирован",
                "start_finalized": "Невозможно запустить финализированный тур",
                "update_finalized": "Для финализированного тура не допускается изменение квоты вывода, типа тура или системы судейства"
            }
        },
        "global": {
            "buttons": {
                "add": "Добавить",
                "close": "Закрыть",
                "deselect_all": "Снять все",
                "edit": "Редактировать",
                "delete": "Удалить",
                "discard": "Отменить",
                "load": "Загрузить",
                "save": "Сохранить",
                "select_all": "Выбрать все",
                "submit": "Сохранить"
            },
            "labels": {
                "browse": "Обзор...",
                "connecting": "Подключение к сети",
                "connection_problem": "Проблемы с сетью",
                "yes": "Да",
                "no": "Нет"
            },
            "messages": {
                "connection_error": "Похоже, имеются проблемы с сетью",
                "error_header": "Ошибка",
                "success": "Операция успешно завершена"
            },
            "phrases": {
                "heat_n": function heat_n(n) {
                    return "Заход №" + n.toString();
                },
                "judge_n": function judge_n(n) {
                    return "Линейный судья №" + n.toString();
                },
                "participant_n": function participant_n(n, name, n_sp) {
                    return n_sp > 2 ? "Формейшн №" + n.toString() + (name ? ": " + name : "") : (n_sp === 2 ? "Пара №" : "Участник №") + n.toString();
                }
            }
        },
        "judging": {
            "buttons": {
                "confirm_score": "Зафиксировать",
                "init_tour": "Пересоздать тур",
                "finalize_tour": "Финализировать",
                "reset_acrobatic_override": "Сброс",
                "shuffle_heats": "Перемешать заходы",
                "start_tour": "Начать тур",
                "stop_tour": "Остановить тур"
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "init_tour": "Вы действительно хотите пересоздать этот тур?",
                "load_program": "Вы действительно хотите перезагрузить программу для этого участника?",
                "shuffle_heats": "Вы действительно хотите перемешать заходы?",
                "stop_tour": "Вы действительно хотите остановить этот тур?"
            },
            "headers": {
                "acrobatic_overrides": "Корректировки базовых оценок акробатики"
            },
            "labels": {
                "acro_description": "Описание трюка",
                "acro_idx": "№ трюка",
                "acrobatics": "Акробатика",
                "club": "Клуб",
                "confirmed": "Зафиксировано",
                "heat": "Заход",
                "new_score": "Корр.",
                "number": "№",
                "old_score": "База",
                "participant_name": "Участник",
                "performed": "В",
                "total_score": "Сумма баллов"
            }
        },
        "models": {
            "club": {
                "name": "Название клуба",
                "city": "Город",
                "external_id": "Внешний ID"
            },
            "competition": {
                "active": "Активно",
                "date": "Дата",
                "info": "Дополнительная информация для протокола",
                "info_item_title": "Заголовок",
                "info_item_value": "Значение",
                "name": "Название"
            },
            "competition_plan_item": {
                "discipline": "Дисциплина",
                "estimated_beginning": "Начало",
                "estimated_duration": "Длительность",
                "name": "Название",
                "sp": "Приоритет",
                "tour": "Тур",
                "verbose_name": "Название"
            },
            "discipline": {
                "discipline_judges": "Судьи",
                "external_id": "Внешний ID",
                "name": "Название дисциплины",
                "sp": "Приоритет"
            },
            "discipline_judge": {
                "roles": {
                    "acro_judge": "А",
                    "dance_judge": "T",
                    "head_judge": "Гл",
                    "tech_judge": "Тех"
                },
                "roles_legend": React.createElement(
                    "table",
                    { className: "w-100" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "Гл — главный судья"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "Т — судья танца"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "А — судья акробатики"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "Тex — технический судья"
                            )
                        )
                    )
                )
            },
            "judge": {
                "category": "Категория",
                "external_id": "Вн. ID",
                "name": "Ф. И. О.",
                "number": "Номер",
                "role": "Роль в судействе",
                "role_description": "Должность",
                "sp": "Приоритет"
            },
            "participant": {
                "acro_description": "Описание трюка",
                "acro_descriptions": "Описание трюков",
                "acro_score": "Оценка",
                "acrobatics": "Акробатика",
                "club_name": "Клуб",
                "club_city": "Город",
                "coaches": "Тренеры",
                "discipline_name": "Дисциплина",
                "first_name": "Имя",
                "gender": "Пол",
                "gender_f": "Ж",
                "gender_m": "М",
                "general_info": "Основная информация",
                "formation_name": "Название команды формейшн",
                "last_name": "Фамилия",
                "name": "Участник",
                "number": "Номер",
                "programs": "Программы",
                "sportsmen": "Спортсмены",
                "sportsmen_year_of_birth": "Г.р.",
                "substitute_n": "Осн.",
                "substitute_y": "Зап.",
                "year_of_birth": "Год рождения",
                "yob": "Г.р."
            },
            "program": {
                "default_for": "По умолчанию",
                "name": "Название программы"
            },
            "tour": {
                "default_program": "Акробатика по умолчанию",
                "is_hope_tour": "Тур «Надежды»",
                "name": "Название тура",
                "num_advances": "Квота вывода",
                "participants_per_heat": "Участников в заходе",
                "scoring_system_name": "Система судейства"
            }
        },
        "screen_operator": {
            "buttons": {
                "reset_heat": "Сброс номера захода",
                "reset_place": "Сброс места"
            },
            "headers": {
                "discipline": "Дисциплина",
                "heat": "Заход",
                "places": "Места для вывода",
                "tour": "Тур"
            },
            "labels": {
                "place": "место",
                "heat": "заход"
            }
        },
        "presenter": {
            "headers": {
                "clubs": "Клубы-участники",
                "heats": "Заходы",
                "info": "Информация",
                "judges": "Судьи",
                "results": "Результаты"
            },
            "labels": {
                "no_active_tour": "Нет активного тура",
                "place": "место"
            }
        },
        "results": {
            "alerts": {
                "not_finalized": "Данные результаты не являются окончательными."
            },
            "buttons": {
                "print": "Печать",
                "simple_view": "Упрощенная таблица",
                "verbose_view": "Подробная таблица"
            }
        },
        "start_page": {
            "headers": {
                "select_competition": "Выберите соревнование для продолжения",
                "select_role": "Выберите свою роль"
            },
            "messages": {
                "no_competitions": "Нет активных соревнований",
                "competitions_management_link": function competitions_management_link(link) {
                    return React.createElement(
                        "span",
                        null,
                        "Управление соревнованиями находится по адресу ",
                        React.createElement(
                            "a",
                            { href: link },
                            link
                        )
                    );
                }
            },
            "roles": {
                "administrator": "Администратор",
                "presenter": "Ведущий",
                "screen": "Экран",
                "screen_operator": "Оператор экрана"
            }
        },
        "tablet": {
            "alerts": {
                "has_unconfirmed_scores": "Имеются незафиксированные оценки судей в последнем заходе."
            },
            "buttons": {
                "finalize_tour": "Финализировать тур",
                "finalize_tour_and_start_next": "Финализировать тур и перейти к следующему",
                "next_heat": "След. заход",
                "not_performed": "Невыход на площадку",
                "performed": "Отмена невыхода на площадку",
                "prev_heat": "Пред. заход",
                "reset_stopwatch": "Сброс",
                "start_stopwatch": "Старт",
                "stop_stopwatch": "Стоп",
                "stop_tour": "Завершить тур",
                "stop_tour_and_start_next": "Завершить тур и перейти к следующему туру",
                "to_start_page": "На главную"
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "finalize_tour_and_start_next": "Вы действительно хотите финализировать этот тур и перейти к следующему туру?",
                "stop_tour": "Вы действительно хотите остановить этот тур?",
                "stop_tour_and_start_next": "Вы действительно хотите перейти к следующему туру?"
            },
            "headers": {
                "acro_n": function acro_n(n) {
                    return "Акробатика №" + (n + 1);
                },
                "heat": "Заход",
                "presenter": "Ведущий",
                "select_page": "Страница"
            },
            "messages": {
                "not_judging_discipline": "Вы не участвуете в судействе данной дисциплины",
                "not_judging_participant": "Вы не оцениваете этого участника",
                "not_judging_tour": "Вы не оцениваете этот тур",
                "not_performing": "Не выступает"
            },
            "pages": {
                "acrobatics": "Акробатика",
                "actions": "Действия",
                "dance": "Танец",
                "heats": "Заходы",
                "results": "Результаты"
            }
        },

        "scoring_systems": {
            "rosfarr": {
                "tablet": {
                    "acro_judge": {
                        "fall_down": "Падения (-30)"
                    },
                    "dance_judge": {
                        "acrobatics": "Акробатика",
                        "big_mistakes": "Большие ошибки (-30)",
                        "composition": "Композиция",
                        "dance_figs": "Танцевальные фигуры",
                        "dance_tech": "Техника танцевания",
                        "form_fall_down": "Падения (-3)",
                        "form_mistakes": "Ошибки (-2)",
                        "form_small_mistakes": "Маленькие ошибки (-2)",
                        "form_big_mistakes": "Большие ошибки (-3)",
                        "fw_man": "Основной ход, партнёр (сбавка в %)",
                        "fw_woman": "Основной ход, партнёрша (сбавка в %)",
                        "impression": "Общее впечатление",
                        "points": "Оценка",
                        "small_mistakes": "Маленькие ошибки (-5)"
                    },
                    "global": {
                        "total_score": "Сумма баллов"
                    },
                    "head_judge": {
                        "acrobatic_overrides": "Корректировки акробатики",
                        "black_card": "-100",
                        "dance_judge_scores": "Оценки линейных судей",
                        "ok": "OK",
                        "penalty_type": "Штрафные санкции",
                        "previous_penalties": "Предыдущие штрафы",
                        "red_card": "-30",
                        "yellow_card": "-3",
                        "form_yellow_card": "-5",
                        "form_red_card": "-15"
                    },
                    "tech_judge": {
                        "jump_steps": "Основные ходы",
                        "reset_to_n": function reset_to_n(n) {
                            return "Сброс на " + n.toString();
                        },
                        "timing": "Длительность"
                    }
                },
                "results": {
                    "breakdown": {
                        "a": "A",
                        "acro_n": function acro_n(n) {
                            return "A" + n.toString();
                        },
                        "bm": "БО",
                        "c": "К",
                        "df": "ТФ",
                        "dt": "ТT",
                        "fd": "П",
                        "fm": "ОХм",
                        "fw": "ОХж",
                        "i": "ОВ",
                        "m": "Ош",
                        "p": "М",
                        "sm": "МО",
                        "t": "Σ"
                    },
                    "headers": {
                        "participants_advanced": "Прошли в следующий тур",
                        "participants_not_advanced": "Не прошли в следующий тур",
                        "participants_not_performed": "Не выступали"
                    },
                    "labels": {
                        "acro_score": "Результат акро",
                        "acrobatics": "Акробатика",
                        "acrobatics_verbose": "Акробатика (заявка/факт)",
                        "card": "Штраф",
                        "fw_score": "Результат ТН",
                        "fw_score_short": "ТН",
                        "info": "Участник, результат",
                        "next_tour": "Следующий тур",
                        "not_performed": "Не принимал участие",
                        "number": "№",
                        "participant_club": "Клуб",
                        "participant_coaches": "Тренеры",
                        "participant_name": "Участник",
                        "penalty": "Штраф главного судьи",
                        "place": "Место",
                        "sportsmen": "Спортсмены",
                        "sportsmen_year_of_birth": "Г.р.",
                        "total_score": "Итог"
                    }
                }
            }
        },

        "scoring_systems_names": {
            "rosfarr": {
                "acro": "РосФАРР, акробатические программы",
                "am_final_acro": "РосФАРР, A и M классы, финал, акробатика",
                "am_final_fw": "РосФАРР, A и M классы, финал, техника ног",
                "formation": "РосФАРР, формейшн без акробатики",
                "formation_acro": "РосФАРР, формейшн с акробатикой",
                "no_acro": "РосФАРР, танцевальные программы",
                "simplified": "РосФАРР, упрощенная система (1–40)"
            }
        },
        "judge_roles": {
            "": "-",
            "acro_judge": "Судья акробатики",
            "dance_judge": "Судья танца",
            "head_judge": "Главный судья",
            "tech_judge": "Технический судья"
        }
    };
    var path = src.split(".");
    var phrase_ptr = PHRASES;
    path.forEach(function (chunk) {
        return phrase_ptr = phrase_ptr[chunk];
    });
    if (typeof phrase_ptr === "undefined") {
        console.error("Unable to find translation for " + src);
        return;
    }
    if (typeof phrase_ptr === "function") {
        var args = [];
        for (var idx = 1; idx < arguments.length; ++idx) {
            args.push(arguments[idx]);
        }
        return phrase_ptr.apply(undefined, args);
    }
    return phrase_ptr;
}

var getPossibleTourNames = exports.getPossibleTourNames = function getPossibleTourNames() {
    return ["Финал", "Тур «Надежды»", "Отборочный тур", "1/2 финала", "1/4 финала", "1/8 финала", "1/16 финала", "Финал, техника ног", "Финал, акробатика"];
};

},{}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.Api = undefined;

var _loader = require("i10n/loader");

var _storage = require("server/storage");

var _dialogs = require("ui/dialogs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiImpl = function () {
    function ApiImpl(method, data) {
        _classCallCheck(this, ApiImpl);

        this.method = method;
        this.data = data;
        this.cb_success = function () {};
        this.cb_error = function (msg, code, args) {
            return (0, _dialogs.showError)(code ? _loader._.apply(undefined, [code].concat(args)) : msg);
        };
        this.cb_fail = function () {
            var _console;

            for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
                data[_key] = arguments[_key];
            }

            return (_console = console).error.apply(_console, ["API fail"].concat(data));
        };
        this.cb_done = function () {};
        this.update_db = function () {};
    }

    ApiImpl.prototype.onDone = function onDone(callback) {
        this.cb_done = callback;
        return this;
    };

    ApiImpl.prototype.onSuccess = function onSuccess(callback) {
        this.cb_success = callback;
        return this;
    };

    ApiImpl.prototype.onError = function onError(callback) {
        this.cb_error = callback;
        return this;
    };

    ApiImpl.prototype.onFail = function onFail(callback) {
        this.cb_fail = callback;
        return this;
    };

    ApiImpl.prototype.addToDB = function addToDB(model_type, model_id) {
        var st = arguments.length <= 2 || arguments[2] === undefined ? _storage.storage : arguments[2];

        this.update_db = function (response) {
            st.get(model_type).add(model_id, response);
        };
        return this;
    };

    ApiImpl.prototype.send = function send() {
        var _this = this;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api", true);
        xhr.onload = function () {
            _this.cb_done();
            if (xhr.status !== 200) {
                _this.cb_fail();
                return;
            }
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                _this.update_db(response.response);
                _this.cb_success(response.response);
            } else {
                _this.cb_error(response.message, response.code, response.args);
            }
        };
        xhr.onerror = function () {
            _this.cb_done();
            _this.cb_fail();
        };
        var data = new FormData();
        data.append("client_id", window.client_id);
        data.append("data", JSON.stringify(this.data));
        data.append("method", this.method);
        xhr.send(data);
    };

    return ApiImpl;
}();

var Api = exports.Api = function Api() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return new (Function.prototype.bind.apply(ApiImpl, [null].concat(args)))();
};

},{"i10n/loader":4,"server/storage":8,"ui/dialogs":10}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.message_dispatcher = undefined;

var _storage = require("server/storage");

var _components = require("ui/components");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageDispatcher = function () {
    function MessageDispatcher() {
        _classCallCheck(this, MessageDispatcher);

        this.closed = false;
        this.listeners = {};
        this.listeners_cnt = 0;
        this.connect();
    }

    MessageDispatcher.prototype.connect = function connect() {
        console.log("Connecting to websocket...");
        this.ws = new SockJS("http://" + window.location.host + "/ws");
        this.ws.onopen = function () {
            _components.connection_status.setOk();
            console.log("Connected.");
            if (this.closed) {
                this.onMessage({
                    data: JSON.stringify({
                        messages: [["reload_data", null]],
                        model_updates: []
                    })
                });
            }
        }.bind(this);
        this.ws.onclose = function () {
            _components.connection_status.setFail();
            console.log("Connection closed.");
            this.closed = true;
            setTimeout(this.connect.bind(this), 500);
        }.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
    };

    MessageDispatcher.prototype.onMessage = function onMessage(message) {
        var _this = this;

        var data = JSON.parse(message.data);
        if (data["client_id"]) {
            window.client_id = data["client_id"];
            return;
        }
        data.messages.forEach(function (data) {
            var msg_type = data[0];
            var msg_data = data[1];
            var listeners = this.listeners[msg_type] || {};
            if (msg_type === "force_refresh") {
                window.location.reload(true);
            }
            Object.keys(this.listeners[msg_type] || {}).forEach(function (key) {
                return listeners[key](msg_data);
            });
        }.bind(this));
        var data_changed = false;
        data.model_updates.forEach(function (model_info) {
            data_changed = _storage.storage.updateModel(model_info.model, model_info.id, model_info.data) || data_changed;
        });
        if (data_changed) {
            (function () {
                var listeners = _this.listeners["db_update"] || {};
                Object.keys(listeners).forEach(function (key) {
                    if (listeners[key]) {
                        listeners[key]();
                    }
                });
            })();
        }
    };

    MessageDispatcher.prototype.getListenerId = function getListenerId() {
        return this.listeners_cnt++;
    };

    MessageDispatcher.prototype.addListener = function addListener(msg_types, callback) {
        var id = this.getListenerId();
        msg_types.split(" ").forEach(function (msg_type) {
            if (!this.listeners[msg_type]) {
                this.listeners[msg_type] = {};
            }
            this.listeners[msg_type][id] = callback;
        }.bind(this));
        return id;
    };

    MessageDispatcher.prototype.removeListener = function removeListener(listener_id) {
        Object.keys(this.listeners).forEach(function (key) {
            delete this.listeners[key][listener_id];
        }.bind(this));
    };

    return MessageDispatcher;
}();

var message_dispatcher = exports.message_dispatcher = new MessageDispatcher();

},{"server/storage":8,"ui/components":9}],8:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ref = function () {
    function Ref(storage, model_name, id) {
        _classCallCheck(this, Ref);

        this.model_name = model_name;
        this.id = id;
        this.storage = storage;
    }

    Ref.prototype.get = function get() {
        return this.storage.get(this.model_name).by_id(this.id);
    };

    return Ref;
}();

var Model = function () {
    function Model(storage, id, model_storage) {
        _classCallCheck(this, Model);

        this.id = id;
        this.__storage = storage;
        this.__key_types = {};
        this.__model_storage = model_storage;
    }

    Model.prototype.addBackRef = function addBackRef(key, ref) {
        this[key] = ref;
        this.__key_types[key] = "^";
    };

    Model.prototype.update = function update(data) {
        var _this = this;

        var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        for (var idx in data) {
            if (data.hasOwnProperty(idx)) {
                if (idx.charAt(0) === "*" || idx.charAt(0) === "^") {
                    if (!create && typeof this[idx.slice(1)] === "undefined") {
                        continue;
                    }
                }
                if (idx.charAt(0) === "*") {
                    (function () {
                        var key = idx.slice(1);
                        _this[key] = [];
                        var back_ref = new Ref(_this.__storage, _this.__model_storage.model_name, _this.id);
                        var back_ref_key = data[idx].back_ref;
                        data[idx].children.forEach(function (nested_data) {
                            if (_typeof(nested_data.data) === "object") {
                                this.__storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                            }
                            var ref = new Ref(this.__storage, nested_data.model, nested_data.id);
                            ref.get().addBackRef(back_ref_key, back_ref);
                            this[key].push(ref);
                        }.bind(_this));
                        _this.__key_types[key] = "*";
                    })();
                } else if (idx.charAt(0) === "^") {
                    var key = idx.slice(1);
                    var nested_data = data[idx];
                    if ((typeof nested_data === "undefined" ? "undefined" : _typeof(nested_data)) === "object") {
                        this.__storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                    }
                    this[key] = new Ref(this.__storage, nested_data.model, nested_data.id);
                    this.__key_types[key] = "^";
                } else {
                    this[idx] = data[idx];
                    this.__key_types[idx] = "";
                }
            }
        }
    };

    Model.prototype.serialize = function serialize(schema) {
        var _this2 = this;

        var result = {};

        var _loop = function _loop(key) {
            if (_this2.__key_types.hasOwnProperty(key)) {
                switch (_this2.__key_types[key]) {
                    case "*":
                        if (key in schema) {
                            result[key] = _this2[key].map(function (ref) {
                                return ref.get().serialize(schema[key]);
                            });
                        }
                        break;
                    case "^":
                        if (key in schema) {
                            result[key] = _this2[key].get().serialize(schema[key]);
                        }
                        break;
                    default:
                        result[key] = _this2[key];
                }
            }
        };

        for (var key in this.__key_types) {
            _loop(key);
        }result.id = this.id;
        return result;
    };

    return Model;
}();

var ModelsStorage = function () {
    function ModelsStorage(storage, model_name) {
        _classCallCheck(this, ModelsStorage);

        this.model_name = model_name;
        this.models = {};
        this.storage = storage;
    }

    ModelsStorage.prototype.add = function add(id, data) {
        if (typeof this.models[id] === "undefined") {
            this.models[id] = new Model(this.storage, id, this);
        }
        this.models[id].update(data);
    };

    ModelsStorage.prototype.update = function update(id, data) {
        if (this.models[id]) {
            this.models[id].update(data, false);
            return true;
        }
        return false;
    };

    ModelsStorage.prototype.by_id = function by_id(id) {
        return this.models[id];
    };

    ModelsStorage.prototype.all = function all() {
        var keys = Object.getOwnPropertyNames(this.models);
        return keys.map(function (key) {
            return this.models[key];
        }.bind(this));
    };

    return ModelsStorage;
}();

var Storage = function () {
    function Storage() {
        _classCallCheck(this, Storage);

        this.model_storages = {};
        this.domains = {};
    }

    Storage.prototype.getDomain = function getDomain(domain) {
        if (typeof this.domains[domain] === "undefined") {
            this.domains[domain] = new Storage();
        }
        return this.domains[domain];
    };

    Storage.prototype.delDomain = function delDomain(domain) {
        delete this.domains[domain];
    };

    Storage.prototype.get = function get(model_name) {
        if (typeof this.model_storages[model_name] === "undefined") {
            this.model_storages[model_name] = new ModelsStorage(this, model_name);
        }
        return this.model_storages[model_name];
    };

    Storage.prototype.del = function del(model_name) {
        delete this.model_storages[model_name];
    };

    Storage.prototype.updateModel = function updateModel(model_type, model_id, data) {
        var _this3 = this,
            _arguments = arguments;

        var data_changed = false;
        if (this.model_storages[model_type]) {
            data_changed = this.get(model_type).add(model_id, data) || data_changed;
        }
        Object.keys(this.domains).forEach(function (key) {
            var _domains$key;

            return data_changed = (_domains$key = _this3.domains[key]).updateModel.apply(_domains$key, _arguments) || data_changed;
        });
        // return data_changed;
        return true;
    };

    return Storage;
}();

var storage = exports.storage = new Storage();

},{}],9:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.connection_status = exports.Loader = undefined;

var _loader = require("i10n/loader");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = exports.Loader = function (_React$Component) {
    _inherits(Loader, _React$Component);

    function Loader() {
        _classCallCheck(this, Loader);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Loader.prototype.render = function render() {
        return React.createElement(
            "table",
            { style: { "height": "100%", "width": "100%" } },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { style: { "textAlign": "center" } },
                        React.createElement("img", { src: "/static/img/ajax-loader.gif" })
                    )
                )
            )
        );
    };

    return Loader;
}(React.Component);

var ConnectionStatusMock = function () {
    function ConnectionStatusMock() {
        _classCallCheck(this, ConnectionStatusMock);
    }

    ConnectionStatusMock.prototype.setOk = function setOk() {};

    ConnectionStatusMock.prototype.setFail = function setFail() {};

    return ConnectionStatusMock;
}();

var ConnectionStatus = function (_React$Component2) {
    _inherits(ConnectionStatus, _React$Component2);

    function ConnectionStatus(props) {
        _classCallCheck(this, ConnectionStatus);

        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.state = {
            "connected": null
        };
        return _this2;
    }

    ConnectionStatus.prototype.componentWillUnmount = function componentWillUnmount() {
        this.stopInterval();
    };

    ConnectionStatus.init = function init() {
        var element = window.document.getElementById("connection_status");
        if (element) {
            return ReactDOM.render(React.createElement(ConnectionStatus, null), element);
        }
        return new ConnectionStatusMock();
    };

    ConnectionStatus.prototype.startInterval = function startInterval() {
        var _this3 = this;

        if (this.interval) {
            return;
        }
        this.interval = setInterval(function () {
            _this3.setState({
                tick: !_this3.state.tick
            });
        }, 750);
    };

    ConnectionStatus.prototype.stopInterval = function stopInterval() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
        this.interval = null;
    };

    ConnectionStatus.prototype.setOk = function setOk() {
        this.stopInterval();
        this.setState({ connected: true, tick: false });
    };

    ConnectionStatus.prototype.setFail = function setFail() {
        this.startInterval();
        this.setState({ connected: false });
    };

    ConnectionStatus.prototype.render = function render() {
        if (this.state.connected) {
            return React.createElement("div", { className: "connection-status ok" });
        }
        if (this.state.connected === null) {
            return React.createElement(
                "div",
                { className: "connection-status alert-warning" },
                (0, _loader._)("global.labels.connecting")
            );
        }
        return React.createElement(
            "div",
            { className: "connection-status alert-danger" + (this.state.tick ? " tick" : "") },
            (0, _loader._)("global.labels.connection_problem")
        );
    };

    return ConnectionStatus;
}(React.Component);

var connection_status = exports.connection_status = ConnectionStatus.init();

},{"i10n/loader":4}],10:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.showError = showError;
exports.showConfirm = showConfirm;

var _loader = require("i10n/loader");

function showError(msg) {
    var title = (typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object" ? msg[0] : (0, _loader._)("global.messages.error_header");
    var text = (typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object" ? msg[1] : msg;
    swal({
        title: title,
        text: text,
        type: "error",
        animation: false
    });
}

function showConfirm(message, action) {
    var close_on_confirm = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    return swal({
        title: message,
        animation: false,
        showCancelButton: true,
        confirmButtonText: (0, _loader._)("global.labels.yes"),
        cancelButtonText: (0, _loader._)("global.labels.no"),
        closeOnConfirm: close_on_confirm
    }, action);
}

},{"i10n/loader":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGNvbXBldGl0aW9uc1xcbWFpbi5qc3giLCJzcmNcXGpzeFxcY29tbW9uXFx0b29scy5qc3giLCJzcmNcXGpzeFxcY29tcGV0aXRpb25zLmpzeCIsInNyY1xcanN4XFxpMTBuXFxsb2FkZXIuanN4Iiwic3JjXFxqc3hcXGkxMG5cXHJ1LmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ1NNOzs7QUFDRixhQURFLG9CQUNGLENBQVksS0FBWixFQUFtQjs4QkFEakIsc0JBQ2lCOztxREFDZiw0QkFBTSxLQUFOLEdBRGU7O0FBRWYsWUFBSSxRQUFRLGtCQUFNLE1BQUssS0FBTCxDQUFXLFdBQVgsQ0FBZCxDQUZXO0FBR2YsY0FBSyxLQUFMLEdBQWEsS0FBYixDQUhlO0FBSWYsY0FBSyxZQUFMLEdBQW9CLE1BQXBCLENBSmU7O0tBQW5COztBQURFLG1DQU9GLDZCQUFTLE9BQU8sS0FBSyxPQUFPLE1BQU0sT0FBTztBQUNyQyxZQUFJLFlBQVksVUFBVSxRQUFWLEdBQXFCLE1BQU0sTUFBTixDQUFhLE9BQWIsR0FBdUIsTUFBTSxNQUFOLENBQWEsS0FBYixDQUR2QjtBQUVyQyxZQUFJLFFBQVEsa0JBQU0sS0FBSyxLQUFMLENBQWQsQ0FGaUM7QUFHckMsZ0JBQVEsS0FBUjtBQUNBLGlCQUFLLE1BQUw7QUFDSSxzQkFBTSxJQUFOLENBQVcsR0FBWCxFQUFnQixLQUFoQixJQUF5QixTQUF6QixDQURKO0FBRUksc0JB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QUFQO0FBQ0EsY0FBTSxJQUFOO0FBQ0EsY0FBTSxPQUFOO0FBQ0EsbUJBQVcsS0FBWDtLQUpKLEVBSDJCO0NBQXhCOztBQVdBLFNBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QixNQUE5QixFQUE4RDtRQUF4Qix5RUFBaUIscUJBQU87O0FBQ2pFLFdBQU8sS0FBSztBQUNSLGVBQU8sT0FBUDtBQUNBLG1CQUFXLEtBQVg7QUFDQSwwQkFBa0IsSUFBbEI7QUFDQSwyQkFBbUIsZUFBRSxtQkFBRixDQUFuQjtBQUNBLDBCQUFrQixlQUFFLGtCQUFGLENBQWxCO0FBQ0Esd0JBQWdCLGdCQUFoQjtLQU5HLEVBT0osTUFQSSxDQUFQLENBRGlFO0NBQTlEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IHNob3dDb25maXJtIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IGNsb25lIH0gZnJvbSBcImNvbW1vbi90b29sc1wiO1xuXG5cbmNsYXNzIENvbXBldGl0aW9uRWRpdG9yUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIGxldCBzdGF0ZSA9IGNsb25lKHRoaXMucHJvcHMuY29tcGV0aXRpb24pO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMubGF0ZXN0X2FkZGVkID0gXCJiYXNlXCI7XG4gICAgfVxuICAgIG9uQ2hhbmdlKGdyb3VwLCBpZHgsIGZpZWxkLCB0eXBlLCBldmVudCkge1xuICAgICAgICBsZXQgbmV3X3ZhbHVlID0gZmllbGQgPT09IFwiYWN0aXZlXCIgPyBldmVudC50YXJnZXQuY2hlY2tlZCA6IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgbGV0IHN0YXRlID0gY2xvbmUodGhpcy5zdGF0ZSk7XG4gICAgICAgIHN3aXRjaCAoZ3JvdXApIHtcbiAgICAgICAgY2FzZSBcImluZm9cIjpcbiAgICAgICAgICAgIHN0YXRlLmluZm9baWR4XVtmaWVsZF0gPSBuZXdfdmFsdWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIlwiOlxuICAgICAgICAgICAgc3RhdGVbZmllbGRdID0gbmV3X3ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICAgIH1cbiAgICBhZGRJbmZvSXRlbSgpIHtcbiAgICAgICAgbGV0IGluZm8gPSBjbG9uZSh0aGlzLnN0YXRlLmluZm8pO1xuICAgICAgICBsZXQgbmV3X2lkeCA9IGluZm8ubGVuZ3RoO1xuICAgICAgICBpbmZvLnB1c2goW1wiXCIsIFwiXCJdKTtcbiAgICAgICAgdGhpcy5sYXRlc3RfYWRkZWQgPSBcImluZm9cIiArIG5ld19pZHg7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaW5mbzogaW5mbyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZUluZm9JdGVtKGlkeCkge1xuICAgICAgICBsZXQgaW5mbyA9IGNsb25lKHRoaXMuc3RhdGUuaW5mbyk7XG4gICAgICAgIGluZm8uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaW5mbzogaW5mbyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1vdmVJbmZvSXRlbVVwKGlkeCkge1xuICAgICAgICBsZXQgaW5mbyA9IGNsb25lKHRoaXMuc3RhdGUuaW5mbyk7XG4gICAgICAgIGxldCBjdXJyZW50ID0gaW5mb1tpZHhdO1xuICAgICAgICBsZXQgdXBwZXIgPSBpbmZvW2lkeCAtIDFdO1xuICAgICAgICBpbmZvW2lkeF0gPSB1cHBlcjtcbiAgICAgICAgaW5mb1tpZHggLSAxXSA9IGN1cnJlbnQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaW5mbzogaW5mbyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1vdmVJbmZvSXRlbURvd24oaWR4KSB7XG4gICAgICAgIHRoaXMubW92ZUluZm9JdGVtVXAoaWR4ICsgMSk7XG4gICAgfVxuICAgIHNlcnRpYWxpemUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLnN0YXRlLm5hbWUsXG4gICAgICAgICAgICBkYXRlOiB0aGlzLnN0YXRlLmRhdGUsXG4gICAgICAgICAgICBhY3RpdmU6IHRoaXMuc3RhdGUuYWN0aXZlLFxuICAgICAgICAgICAgaW5mbzogdGhpcy5zdGF0ZS5pbmZvLFxuICAgICAgICB9XG4gICAgfVxuICAgIG9uU3VibWl0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5uZXdDb21wZXRpdGlvbikge1xuICAgICAgICAgICAgQXBpKFwiY29tcGV0aXRpb24uc2V0XCIsIHtcbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbl9pZDogdGhpcy5zdGF0ZS5pZCxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnNlcnRpYWxpemUoKSxcbiAgICAgICAgICAgIH0pLm9uU3VjY2Vzcyh0aGlzLnByb3BzLnN0b3BFZGl0aW5nKS5zZW5kKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBBcGkoXCJjb21wZXRpdGlvbi5jcmVhdGVcIiwge1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VydGlhbGl6ZSgpLFxuICAgICAgICAgICAgfSkub25TdWNjZXNzKHRoaXMucHJvcHMuc3RvcEVkaXRpbmcpLnNlbmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBidGkgPSAodGhpcy5wcm9wcy5pZHggfHwgMTAwMCkgKiAxMDAwMDtcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLnN0YXRlLmluZm8ubWFwKGZ1bmN0aW9uKGl0ZW0sIGlkeCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiaW5mby1pdGVtXCIga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXsgYnRpICsgMTAwMCArIDEwICogaWR4ICsgMSB9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlICYmIHRoaXMubGF0ZXN0X2FkZGVkID09PSBcImluZm9cIiArIGlkeC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdGVzdF9hZGRlZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17IF8oXCJtb2RlbHMuY29tcGV0aXRpb24uaW5mb19pdGVtX3RpdGxlXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBpdGVtWzBdIH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgXCJpbmZvXCIsIGlkeCwgMCwgXCJhbnlcIikgfSAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17IGJ0aSArIDEwMDAgKyAxMCAqIGlkeCArIDIgfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eyBfKFwibW9kZWxzLmNvbXBldGl0aW9uLmluZm9faXRlbV92YWx1ZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgaXRlbVsxXSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIFwiaW5mb1wiLCBpZHgsIDEsIFwiYW55XCIpIH0gLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkb3duIGJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgaWR4ID09PSB0aGlzLnN0YXRlLmluZm8ubGVuZ3RoIC0gMSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLm1vdmVJbmZvSXRlbURvd24uYmluZCh0aGlzLCBpZHgpIH0+4oaTPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidXAgYnRuIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyBpZHggPT09IDAgfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5tb3ZlSW5mb0l0ZW1VcC5iaW5kKHRoaXMsIGlkeCkgfT7ihpE8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkZWwgYnRuIGJ0bi1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5yZW1vdmVJbmZvSXRlbS5iaW5kKHRoaXMsIGlkeCkgfT5YPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj47XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiA8dHIgY2xhc3NOYW1lPXsgXCJlZGl0b3JcIiArICh0aGlzLnByb3BzLm5ld0NvbXBldGl0aW9uID8gXCIgY3JlYXRlXCIgOiBcIlwiICkgfT5cbiAgICAgICAgICAgIDx0ZCBjb2xTcGFuPVwiNFwiPlxuICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXsgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpIH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGdlbmVyYWwtaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcIm1vZGVscy5jb21wZXRpdGlvbi5uYW1lXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17IGJ0aSArIDF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eyBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgJiYgdGhpcy5sYXRlc3RfYWRkZWQgPT09IFwiYmFzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGF0ZXN0X2FkZGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZnVsbC13aWR0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMuc3RhdGUubmFtZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzLCBcIlwiLCBudWxsLCBcIm5hbWVcIiwgXCJhbnlcIikgfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwibW9kZWxzLmNvbXBldGl0aW9uLmRhdGVcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXsgYnRpICsgMn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnN0YXRlLmRhdGUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgXCJcIiwgbnVsbCwgXCJkYXRlXCIsIFwiYW55XCIpIH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcIm1vZGVscy5jb21wZXRpdGlvbi5hY3RpdmVcIikgfTxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXsgYnRpICsgM31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXsgdGhpcy5zdGF0ZS5hY3RpdmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgXCJcIiwgbnVsbCwgXCJhY3RpdmVcIiwgXCJhbnlcIikgfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+eyBfKFwibW9kZWxzLmNvbXBldGl0aW9uLmluZm9cIikgfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpbmZvIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXsgYnRpICsgMTk5OX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGggYnRuIGJ0bi1zbSBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLmFkZEluZm9JdGVtLmJpbmQodGhpcykgfT57IF8oXCJnbG9iYWwuYnV0dG9ucy5hZGRcIikgfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPiZuYnNwOzwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXsgYnRpICsgMTAwMDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPnsgXyhcImdsb2JhbC5idXR0b25zLnN1Ym1pdFwiKSB9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXsgYnRpICsgMTAwMDF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLnByb3BzLnN0b3BFZGl0aW5nIH0+eyBfKFwiZ2xvYmFsLmJ1dHRvbnMuZGlzY2FyZFwiKSB9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICB9XG59XG5cbmNsYXNzIENvbXBldGl0aW9uUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGFydEVkaXRpbmcoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZWRpdGluZzogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0b3BFZGl0aW5nKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25EZWxldGUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHNob3dDb25maXJtKF8oXCJhZG1pbi5jb25maXJtcy5kZWxldGVfY29tcGV0aXRpb25cIiksICgpID0+IHtcbiAgICAgICAgICAgIEFwaShcImNvbXBldGl0aW9uLmRlbGV0ZVwiLCB7XG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb25faWQ6IHRoaXMucHJvcHMuY29tcGV0aXRpb24uaWQsXG4gICAgICAgICAgICB9KS5vblN1Y2Nlc3MoKCkgPT4gc3dhbC5jbG9zZSgpKS5zZW5kKCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlbmRlckVkaXRvcigpIHtcbiAgICAgICAgcmV0dXJuIDxDb21wZXRpdGlvbkVkaXRvclJvd1xuICAgICAgICAgICAgbmV3Q29tcGV0aXRpb249eyBmYWxzZSB9XG4gICAgICAgICAgICBzdG9wRWRpdGluZz17IHRoaXMuc3RvcEVkaXRpbmcuYmluZCh0aGlzKSB9XG4gICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfSAvPlxuICAgIH1cbiAgICByZW5kZXJWaWV3ZXIoKSB7XG4gICAgICAgIGxldCBwID0gdGhpcy5wcm9wcy5jb21wZXRpdGlvbjtcbiAgICAgICAgcmV0dXJuIDx0ciBjbGFzc05hbWU9XCJ2aWV3ZXJcIiBvbkNsaWNrPXsgdGhpcy5zdGFydEVkaXRpbmcuYmluZCh0aGlzKSB9PlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm5hbWVcIj57IHAubmFtZSB9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJkYXRlXCI+eyBwLmRhdGUgfTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiaXMtYWN0aXZlXCI+eyBwLmFjdGl2ZSA/IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSA6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpIH08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImRlbGV0ZVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBvbkNsaWNrPXsgdGhpcy5vbkRlbGV0ZS5iaW5kKHRoaXMpIH0+WDwvYnV0dG9uPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj47XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZWRpdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRWRpdG9yKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJWaWV3ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgQ29tcGV0aXRpb25DcmVhdGlvblJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZWRpdGluZzogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnRFZGl0aW5nKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGVkaXRpbmc6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wRWRpdGluZygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlckVkaXRvcigpIHtcbiAgICAgICAgbGV0IGVtcHR5X2RhdGEgPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgIFwiZGF0ZVwiOiBcIlwiLFxuICAgICAgICAgICAgXCJhY3RpdmVcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiaW5mb1wiOiBbXSxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPENvbXBldGl0aW9uRWRpdG9yUm93XG4gICAgICAgICAgICBuZXdDb21wZXRpdGlvblxuICAgICAgICAgICAgc3RvcEVkaXRpbmc9eyB0aGlzLnN0b3BFZGl0aW5nLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgY29tcGV0aXRpb249eyBlbXB0eV9kYXRhIH1cbiAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9IC8+O1xuICAgIH1cbiAgICByZW5kZXJCdXR0b24oKSB7XG4gICAgICAgIHJldHVybiA8dHI+PHRkIGNvbFNwYW49XCI1XCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGZ1bGwtd2lkdGhcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLnN0YXJ0RWRpdGluZy5iaW5kKHRoaXMpIH0+eyBfKFwiYWRtaW4uYnV0dG9ucy5hZGRfY29tcGV0aXRpb25cIikgfTwvYnV0dG9uPlxuICAgICAgICA8L3RkPjwvdHI+XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZWRpdGluZyA/IHRoaXMucmVuZGVyRWRpdG9yKCkgOiB0aGlzLnJlbmRlckJ1dHRvbigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBldGl0aW9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29tcGV0aXRpb25zOiBudWxsLFxuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJjb21wZXRpdGlvbl9saXN0X3VwZGF0ZVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCB0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xuICAgICAgICBsZXQgc2VyaWFsaXplZCA9IHN0b3JhZ2VcbiAgICAgICAgICAgIC5nZXQoXCJDb21wZXRpdGlvblwiKVxuICAgICAgICAgICAgLmFsbCgpXG4gICAgICAgICAgICAubWFwKChjKSA9PiBjLnNlcmlhbGl6ZSh7fSkpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29tcGV0aXRpb25zOiBzZXJpYWxpemVkLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZERhdGEoKSB7XG4gICAgICAgIEFwaShcImNvbXBldGl0aW9uLmdldF9hbGxcIiwge1xuICAgICAgICAgICAgY2hpbGRyZW46IHt9LFxuICAgICAgICB9KVxuICAgICAgICAub25TdWNjZXNzKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIkNvbXBldGl0aW9uXCIpO1xuICAgICAgICAgICAgcmVzcG9uc2UuZm9yRWFjaCgoYykgPT4gc3RvcmFnZS5nZXQoXCJDb21wZXRpdGlvblwiKS5hZGQoYy5pZCwgYy5kYXRhKSk7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZEZyb21TdG9yYWdlKCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgLnNlbmQoKTtcbiAgICB9XG4gICAgcmVuZGVyVGFibGUoKSB7XG4gICAgICAgIGxldCByb3dzID0gdGhpcy5zdGF0ZS5jb21wZXRpdGlvbnMubWFwKGZ1bmN0aW9uKGNvbXBldGl0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gPENvbXBldGl0aW9uUm93XG4gICAgICAgICAgICAgICAga2V5PXsgY29tcGV0aXRpb24uaWQgfVxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uPXsgY29tcGV0aXRpb24gfSAvPjtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibWFuYWdlLWNvbXBldGl0aW9uc1wiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJuYW1lXCI+eyBfKFwibW9kZWxzLmNvbXBldGl0aW9uLm5hbWVcIikgfTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiZGF0ZVwiPnsgXyhcIm1vZGVscy5jb21wZXRpdGlvbi5kYXRlXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImlzLWFjdGl2ZVwiPnsgXyhcIm1vZGVscy5jb21wZXRpdGlvbi5hY3RpdmVcIikgfTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiZGVsZXRlXCI+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgeyByb3dzIH1cbiAgICAgICAgICAgICAgICAgICAgPENvbXBldGl0aW9uQ3JlYXRpb25Sb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfaWQgfSAvPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21wZXRpdGlvbnMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgIDxoMT57IF8oXCJhZG1pbi5oZWFkZXJzLmNvbXBldGl0aW9uc19tYW5hZ2VtZW50XCIpIH08L2gxPlxuICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGFibGUoKSB9XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbmNsYXNzIENtcENoYWluSW1wbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gMDtcbiAgICB9XG4gICAgY21wKGEsIGIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIENtcENoYWluID0gKCkgPT4gbmV3IENtcENoYWluSW1wbCgpO1xuIiwiaW1wb3J0IHsgQ29tcGV0aXRpb25zIH0gZnJvbSBcImFkbWluL2NvbXBldGl0aW9ucy9tYWluXCI7XG5cblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxDb21wZXRpdGlvbnMgeyAuLi53aW5kb3cucGFnZV9wcm9wcyB9IC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKVxuKTtcbiIsImltcG9ydCB7IHRyYW5zbGF0ZSwgZ2V0UG9zc2libGVUb3VyTmFtZXMgfSBmcm9tIFwiLi9ydVwiO1xuXG5leHBvcnQgdmFyIF8gPSB0cmFuc2xhdGU7XG5leHBvcnQgdmFyIHRvdXJfbmFtZXMgPSBnZXRQb3NzaWJsZVRvdXJOYW1lcygpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShzcmMsIGFyZykge1xyXG4gICAgZnVuY3Rpb24gY2hvb3NlRW5kaW5nKG4sIGUxLCBlMiwgZTUpIHtcclxuICAgICAgICBsZXQgeCA9IG4gJSAxMDA7XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID49IDUgfHwgeCAlIDEwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGUyO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBQSFJBU0VTID0ge1xyXG4gICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6ICh2ZXJzaW9uLCBkYXRlKSA9PiA8ZGl2IGNsYXNzTmFtZT1cImFib3V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PGI+Um9ja0p1ZGdlIHt2ZXJzaW9ufTwvYj4gKNC+0YIge2RhdGV9KSAmbWRhc2g7INGB0LjRgdGC0LXQvNCwINC00LvRjyDQv9C+0LTRgdGH0LXRgtCwINGA0LXQt9GD0LvRjNGC0LDRgtC+0LIg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INC/0L4g0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60L7QvNGDINGA0L7Qui3QvS3RgNC+0LvQu9GDLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QkNCy0YLQvtGA0YHQutC40LUg0L/RgNCw0LLQsCDQvdCwINGB0LjRgdGC0LXQvNGDIFJvY2tKdWRnZSDQv9C+0LvQvdC+0YHRgtGM0Y4g0L/RgNC40L3QsNC00LvQtdC20LDRgiDRgNCw0LfRgNCw0LHQvtGC0YfQuNC60YMg0JDRgNGC0LXQvNGDINCa0LDQt9Cw0LrQvtCy0YMuINCh0L7QsNCy0YLQvtGAINGB0LjRgdGC0LXQvNGLINCQ0L3RgtC+0L0g0JDQvNC10LvQuNC9LjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QodC40YHRgtC10LzQsCDRgNCw0YHQv9GA0L7RgdGC0YDQsNC90Y/QtdGC0YHRjyDQv9C+INC70LjRhtC10L3Qt9C40LggTGludW0gZC5vLm8gKGluZm9AbGludW0uaHIpLiDQlNC70Y8g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwIFJvY2tKdWRnZSDQvdC10L7QsdGF0L7QtNC40LzQviDQuCDQtNC+0YHRgtCw0YLQvtGH0L3QviDQuNC80LXRgtGMINC/0YDQsNCy0L4g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80YsgTGludW0gTFBTLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QntGE0LjRhtC40LDQu9GM0L3Ri9C5INGB0LDQudGCOiA8YSBocmVmPVwiaHR0cHM6Ly9yb2NranVkZ2UuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPmh0dHBzOi8vcm9ja2p1ZGdlLmNvbS88L2E+PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcHJvZ3JhbXNfYWZ0ZXJfY3JlYXRpb25cIjogXCLQn9GA0L7Qs9GA0LDQvNC80Ysg0LzQvtC20L3QviDQsdGD0LTQtdGCINC00L7QsdCw0LLQuNGC0Ywg0YLQvtC70YzQutC+INC/0L7RgdC70LUg0YHQvtGF0YDQsNC90LXQvdC40Y8g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQutC+0YDRgNC10LrRgtC90L4g0L3QsNGB0YLRgNC+0LXQvdCwINC4INC80L7QttC10YIg0LHRi9GC0Ywg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdCwLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfbm90X2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC90LXQtNC+0YHRgtGD0L/QvdCwINC90LAg0Y3RgtC+0Lwg0LrQvtC80L/RjNGC0LXRgNC1LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maW5hbGl6ZWRcIjogXCLQntGC0YHRg9GC0YHRgtCy0YPRjtGCINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfd2FybmluZ1wiOiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+0KTQuNC90LDQu9C40LfQsNGG0LjRjyDQtNC+0LvQttC90LAg0L7RgtC80LXQvdGP0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINC40YHQutC70Y7Rh9C40YLQtdC70YzQvdGL0YUg0YHQu9GD0YfQsNGP0YUhPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCV0YHQu9C4INC20LUg0Y3RgtC+INC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INC90LXQvtCx0YXQvtC00LjQvNC+LCDQvtCx0YDQsNGC0LjRgtC1INCy0L3QuNC80LDQvdC40LUsINGH0YLQviDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INGB0L/QuNGB0L7QuiDRg9GH0LDRgdGC0L3QuNC60L7QslxyXG4gICAgICAgICAgICAgICAgICAgINGB0LvQtdC00YPRjtGJ0LXQs9C+INGC0YPRgNCwINCx0YPQtNC10YIg0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60Lgg0L/QtdGA0LXRgdC+0LfQtNCw0L0uINCg0LXQt9GD0LvRjNGC0LDRgtGLINGD0YfQsNGB0YLQvdC40LrQvtCyLCDQv9GA0L7RiNC10LTRiNC40YUg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQv9C+0YHQu9C1INC/0LXRgNCy0L7QuVxyXG4gICAgICAgICAgICAgICAgICAgINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0Lgg0L3QtSDQv9GA0L7RiNC10LTRiNC40YUg0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0LHRg9C00YPRgiDQsdC10LfQstC+0LfQstGA0LDRgtC90L4g0YPRgtC10YDRj9C90YshPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCYINC90LUg0LfQsNCx0YPQtNGM0YLQtSDQt9Cw0L3QvtCy0L4g0L3QsNC/0LXRh9Cw0YLQsNGC0Ywg0LLRgdC1INGC0LHQu9C40YbRiy48L3A+PC9kaXY+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRgdC7LsKg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicHJpbnRfdGVzdF9wYWdlXCI6IFwi0J3QsNC/0LXRh9Cw0YLQsNGC0Ywg0YLQtdGB0YLQvtCy0YPRjiDRgdGC0YDQsNC90LjRhtGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlXCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlX2VtcHR5XCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/Rg9GB0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicnVsZXNcIjogXCLQl9Cw0LTQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfcGFnZVwiOiBcItCi0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3RleHRcIjogXCLQrdGC0L4g0YLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwIFJvY2tKdWRnZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfY2x1YlwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjogXCLQlNC+0LHQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9kaXNjaXBsaW5lXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3BhcnRpY2lwYW50XCI6IFwi0JTQvtCx0LDQstC40YLRjCDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3RvdXJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfbnVtYmVyc1wiOiBcItCd0L7QvNC10YDQsCDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0XCI6IFwi0K3QutGB0L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogXCLQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb1wiOiBcItCX0LDQs9GA0YPQt9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQn9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQstGB0LUg0YPRgdGC0YDQvtC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX3BsYW5cIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX2Rpc2NpcGxpbmVzXCI6IFwi0KHQvtGA0YLQuNGA0L7QutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmNvbmZpcm1fc2NvcmVcIjogXCLQntGC0LzQtdC90LAg0YTQuNC60YHQsNGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY2x1YlwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINC60LvRg9CxP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY29tcGV0aXRpb25cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L4g0YHQvtGA0LXQstC90L7QstCw0L3QuNC1P1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZGlzY2lwbGluZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQtNC40YHRhtC40L/Qu9C40L3Rgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2p1ZGdlXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRgdGD0LTRjNGOP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcGFydGljaXBhbnRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0L/RgNC+0LPRgNCw0LzQvNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0YHRgtGA0LDQvdC40YbRgyDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y4g0YLRg9GA0LA/INCS0LLQtdC00LjRgtC1IMKrdW5maW5hbGl6ZcK7LCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6IFwi0J4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsaWVudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC/0L7QtNC60LvRjtGH0LXQvdC90YvQvNC4INGD0YHRgtGA0L7QudGB0YLQstCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5fbWFuYWdlbWVudFwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3Nob3duXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0YLQvtC70YzQutC+INC/0L4g0YHQu9C10LTRg9GO0YnQuNC8INC00LjRgdGG0LjQv9C70LjQvdCw0Lw6XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydF9jb21wZXRpdGlvblwiOiBcItCt0LrRgdC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsCDQuCDRgNC10LfRg9C70YzRgtCw0YLQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9jb21wZXRpdGlvblwiOiBcItCY0LzQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNC10LnRgdC60LDRjyDQsdGA0LjQs9Cw0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb2JhdGljc1wiOiBcItCX0LDQs9GA0YPQt9C60LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRg9GH0LDRgdGC0L3QuNC60LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VfbWVudVwiOiBcItCh0LXRgNCy0LjRgdC90L7QtSDQvNC10L3RjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fZGF0ZVwiOiBcItCU0LDRgtCwINC/0YDQvtCy0LXQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX25hbWVcIjogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJncm91cF9ieV9jbHVic1wiOiBcItCT0YDRg9C/0L/QuNGA0L7QstCw0YLRjCDQv9C+INC60LvRg9Cx0LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Fjcm9iYXRpY3NcIjogXCLQktC60LvRjtGH0LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfY2x1YnNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDQutC70YPQsdCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9kaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9leHRlbmRlZF9pbmZvXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHRiNC40YDQtdC90L3Rg9GOINC40L3RhNC+0YDQvNCw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZm9ybWF0aW9uX3Nwb3J0c21lblwiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YHQvtGB0YLQsNCyINGE0L7RgNC80LXQudGI0L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQtNCw0L3QvdGL0LUg0L4g0YHRg9C00YzRj9GFXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbGVzX3NlbGVjdGVkXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRhNCw0LnQuy4uLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXN0ZV9hY3JvXCI6IFwi0JLRgdGC0LDQstGM0YLQtSDQtNCw0L3QvdGL0LUg0LjQtyDQutCw0LvRjNC60YPQu9GP0YLQvtGA0LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zdW1tYXJ5XCI6IFwi0J/QvtC60LDQt9GL0LLQsNGC0Ywg0YLQvtC70YzQutC+INC60L7Qu9C40YfQtdGB0YLQstC+XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YlwiOiBcItC30LDQv1wiLCAgLy8gc3Vic3RpdHV0ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9wYXNzY29kZVwiOiBcItCS0LLQtdC00ZHQvSDQvdC10LLQtdGA0L3Ri9C5INC60L7QtCDQv9C+0YLQstC10YDQttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZW51XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jbHVic1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfZGlzY2lwbGluZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2p1ZGdlc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9zcG9ydHNtZW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC/0L7RgNGC0YHQvNC10L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3RvdXJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YLRg9GA0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibl9wYXJ0aWNpcGFudHNcIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuXCI6IG4gPT4gbi50b1N0cmluZygpICsgXCIg0YHQv9C+0YDRgtGB0LzQtdC9XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX25fcGFydGljaXBhbnRzXCI6IG4gPT4gXCLQmNGC0L7Qs9C+IFwiICsgbiArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnaW5nLXRhYnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b3VyLWFkbWluXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmUtcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVycm9yc1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3N5bnRheF9lcnJvclwiOiBcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0LTQsNC90L3Ri9GFXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXBpXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZHVwbGljYXRlZF9leHRlcm5hbF9pZFwiOiBcItCSINC00LDQvdC90YvRhSDQuNC80LXRjtGC0YHRjyDQt9Cw0L/QuNGB0Lgg0YEg0L/QvtCy0YLQvtGA0Y/RjtGJ0LjQvNC40LzRgdGPIGV4dGVybmFsX2lkXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuYWJsZV90b19nZXRcIjogKHdhbnRlZCkgPT4gXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C+0LvRg9GH0LjRgtGMIFwiICsgd2FudGVkICsgXCIg0LjQtyDQt9Cw0L/RgNC+0YHQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQutC70YPQsSwg0Log0LrQvtGC0L7RgNC+0LzRgyDQv9GA0LjQstGP0LfQsNC90Ysg0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfbm9uX2VtcHR5XCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1LCDRgdC+0LTQtdGA0LbQsNGJ0LXQtSDQtNC40YHRhtC40L/Qu9C40L3Riywg0LrQu9GD0LHRiyDQuNC70Lgg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b29fbWFueV90b3Vyc1wiOiAoZCkgPT4gW1wi0J7RiNC40LHQutCwINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIiwgYNCSINC00LjRgdGG0LjQv9C70LjQvdC1ICR7ZH0g0YHQvtC00LXRgNC20LjRgtGB0Y8g0LHQvtC70YzRiNC1INGC0YPRgNC+0LIsINGH0LXQvCDRgdC+0LfQtNCw0L3QviDQsiDRgdC40YHRgtC10LzQtWBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNoYW5nZV9qdWRnZXNfd2l0aF9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHQvtGB0YLQsNCyINGB0YPQtNC10Lkg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLLCDRgdC+0LTQtdGA0LbQsNGJ0LXQuSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBlYXRpbmdfanVkZ2VcIjogKG5hbWUpID0+IG5hbWUgKyBcIiDQstGB0YLRgNC10YfQsNC10YLRgdGPINCyINGB0L/QuNGB0LrQtSDRgdGD0LTQtdC5INCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGA0LDQt9CwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxfc2VydmVyX2Vycm9yXCI6IFtcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1XCIsIFwi0L/RgNC+0LLQtdGA0YzRgtC1INC70L7Qs9C4INC00LvRjyDQuNC90YTQvtGA0LzQsNGG0LjQuFwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2Rpc2NpcGxpbmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0LLRhdC+0LTRj9GJ0LXQs9C+INCyINGB0YPQtNC10LnRgdC60YPRjiDQsdGA0LjQs9Cw0LTRgyDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsCwg0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0YXQvtGC0Y8g0LHRiyDQsiDQvtC00L3QvtC8INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJydW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXRfcGVyZm9ybWVkX2ZsYWdfb25fZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGF0L7QtNCwINGE0LjQvdCw0LvQuNC30LjQvdC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNjb3JlX25vdF9leGlzdFwiOiBcItCf0L7Qv9GL0YLQutCwINC/0L7Qu9GD0YfQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC5INC+0YbQtdC90LrQuCDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgtGD0YAsINC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RidC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3RvX25vbl9lbXB0eVwiOiAoZCkgPT4gW1wi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNCz0YDRg9C30LjRgtGMINGC0YPRgNGLINC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLCBg0JTQuNGB0YbQuNC/0LvQuNC90LAgJHtkfSDRg9C20LUg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRi2BdLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfZmluYWxpemVkXCI6IFwi0JTQu9GPINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LAg0L3QtSDQtNC+0L/Rg9GB0LrQsNC10YLRgdGPINC40LfQvNC10L3QtdC90LjQtSDQutCy0L7RgtGLINCy0YvQstC+0LTQsCwg0YLQuNC/0LAg0YLRg9GA0LAg0LjQu9C4INGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZVwiOiBcItCj0LTQsNC70LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2F2ZVwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGluZ1wiOiBcItCf0L7QtNC60LvRjtGH0LXQvdC40LUg0Log0YHQtdGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9wcm9ibGVtXCI6IFwi0J/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInllc1wiOiBcItCU0LBcIixcclxuICAgICAgICAgICAgICAgIFwibm9cIjogXCLQndC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fZXJyb3JcIjogXCLQn9C+0YXQvtC20LUsINC40LzQtdGO0YLRgdGPINC/0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlcnJvcl9oZWFkZXJcIjogXCLQntGI0LjQsdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiBcItCe0L/QtdGA0LDRhtC40Y8g0YPRgdC/0LXRiNC90L4g0LfQsNCy0LXRgNGI0LXQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYXRfblwiOiAobikgPT4gXCLQl9Cw0YXQvtC0IOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZV9uXCI6IChuKSA9PiBcItCb0LjQvdC10LnQvdGL0Lkg0YHRg9C00YzRjyDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfblwiOiAobiwgbmFtZSwgbl9zcCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAobl9zcCA+IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCk0L7RgNC80LXQudGI0L0g4oSWXCIgKyBuLnRvU3RyaW5nKCkgKyAobmFtZSA/IFwiOiBcIiArIG5hbWUgOiBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChuX3NwID09PSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwi0J/QsNGA0LAg4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCLQo9GH0LDRgdGC0L3QuNC6IOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKyBuLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdpbmdcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0J/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfYWNyb2JhdGljX292ZXJyaWRlXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0J/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3RvdXJcIjogXCLQndCw0YfQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCe0YHRgtCw0L3QvtCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0L/RgNC+0LPRgNCw0LzQvNGDINC00LvRjyDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRiz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LHQsNC30L7QstGL0YUg0L7RhtC10L3QvtC6INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2lkeFwiOiBcIuKEliDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybWVkXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibmV3X3Njb3JlXCI6IFwi0JrQvtGA0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgXCJvbGRfc2NvcmVcIjogXCLQkdCw0LfQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQklwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vZGVsc1wiOiB7XHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60LvRg9Cx0LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWN0aXZlXCI6IFwi0JDQutGC0LjQstC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcItCU0LDRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQlNC+0L/QvtC70L3QuNGC0LXQu9GM0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPINC00LvRjyDQv9GA0L7RgtC+0LrQvtC70LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3RpdGxlXCI6IFwi0JfQsNCz0L7Qu9C+0LLQvtC6XCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV92YWx1ZVwiOiBcItCX0L3QsNGH0LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2JlZ2lubmluZ1wiOiBcItCd0LDRh9Cw0LvQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfZHVyYXRpb25cIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgICAgIFwidG91clwiOiBcItCi0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQkFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCJUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhVwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicm9sZXNfbGVnZW5kXCI6IChcclxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy0xMDBcIj48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCT0Lsg4oCUINCz0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y88L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCiIOKAlCDRgdGD0LTRjNGPINGC0LDQvdGG0LA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCQIOKAlCDRgdGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QomV4IOKAlCDRgtC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y88L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IFwi0JrQsNGC0LXQs9C+0YDQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvS4gSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCkLiDQmC4g0J4uXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcItCg0L7Qu9GMINCyINGB0YPQtNC10LnRgdGC0LLQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlX2Rlc2NyaXB0aW9uXCI6IFwi0JTQvtC70LbQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25zXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCe0YbQtdC90LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9uYW1lXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9jaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9uYW1lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiBcItCY0LzRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJcIjogXCLQn9C+0LtcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX2ZcIjogXCLQllwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfbVwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmVyYWxfaW5mb1wiOiBcItCe0YHQvdC+0LLQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60L7QvNCw0L3QtNGLINGE0L7RgNC80LXQudGI0L1cIixcclxuICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwi0KTQsNC80LjQu9C40Y9cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcm9ncmFtc1wiOiBcItCf0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX25cIjogXCLQntGB0L0uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfeVwiOiBcItCX0LDQvy5cIixcclxuICAgICAgICAgICAgICAgIFwieWVhcl9vZl9iaXJ0aFwiOiBcItCT0L7QtCDRgNC+0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInlvYlwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2dyYW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X2ZvclwiOiBcItCf0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X3Byb2dyYW1cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19ob3BlX3RvdXJcIjogXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bV9hZHZhbmNlc1wiOiBcItCa0LLQvtGC0LAg0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19wZXJfaGVhdFwiOiBcItCj0YfQsNGB0YLQvdC40LrQvtCyINCyINC30LDRhdC+0LTQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY29yaW5nX3N5c3RlbV9uYW1lXCI6IFwi0KHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2hlYXRcIjogXCLQodCx0YDQvtGBINC90L7QvNC10YDQsCDQt9Cw0YXQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfcGxhY2VcIjogXCLQodCx0YDQvtGBINC80LXRgdGC0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlc1wiOiBcItCc0LXRgdGC0LAg0LTQu9GPINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInByZXNlbnRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm9fYWN0aXZlX3RvdXJcIjogXCLQndC10YIg0LDQutGC0LjQstC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub3RfZmluYWxpemVkXCI6IFwi0JTQsNC90L3Ri9C1INGA0LXQt9GD0LvRjNGC0LDRgtGLINC90LUg0Y/QstC70Y/RjtGC0YHRjyDQvtC60L7QvdGH0LDRgtC10LvRjNC90YvQvNC4LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwcmludFwiOiBcItCf0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGVfdmlld1wiOiBcItCj0L/RgNC+0YnQtdC90L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2Vfdmlld1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzdGFydF9wYWdlXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2NvbXBldGl0aW9uXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUg0LTQu9GPINC/0YDQvtC00L7Qu9C20LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X3JvbGVcIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0LLQvtGOINGA0L7Qu9GMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19jb21wZXRpdGlvbnNcIjogXCLQndC10YIg0LDQutGC0LjQstC90YvRhSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRfbGlua1wiOiAobGluaykgPT4gPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAg0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuCDQvdCw0YXQvtC00LjRgtGB0Y8g0L/QviDQsNC00YDQtdGB0YMmbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXsgbGluayB9PnsgbGluayB9PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkbWluaXN0cmF0b3JcIjogXCLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY3JlZW5cIjogXCLQrdC60YDQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiBcItCe0L/QtdGA0LDRgtC+0YAg0Y3QutGA0LDQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGFzX3VuY29uZmlybWVkX3Njb3Jlc1wiOiBcItCY0LzQtdGO0YLRgdGPINC90LXQt9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvdGL0LUg0L7RhtC10L3QutC4INGB0YPQtNC10Lkg0LIg0L/QvtGB0LvQtdC00L3QtdC8INC30LDRhdC+0LTQtS5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2hlYXRcIjogXCLQodC70LXQtC4g0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtdCy0YvRhdC+0LQg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCe0YLQvNC10L3QsCDQvdC10LLRi9GF0L7QtNCwINC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X2hlYXRcIjogXCLQn9GA0LXQtC4g0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9zdG9wd2F0Y2hcIjogXCLQodCx0YDQvtGBXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3N0b3B3YXRjaFwiOiBcItCh0YLQsNGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF9zdG9wd2F0Y2hcIjogXCLQodGC0L7Qv1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YNcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwi0JDQutGA0L7QsdCw0YLQuNC60LAg4oSWXCIgKyAobiArIDEpLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfcGFnZVwiOiBcItCh0YLRgNCw0L3QuNGG0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX2Rpc2NpcGxpbmVcIjogXCLQktGLINC90LUg0YPRh9Cw0YHRgtCy0YPQtdGC0LUg0LIg0YHRg9C00LXQudGB0YLQstC1INC00LDQvdC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ190b3VyXCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtGCINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWluZ1wiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uc1wiOiBcItCU0LXQudGB0YLQstC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2VcIjogXCLQotCw0L3QtdGGXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFjcm9fanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wb3NpdGlvblwiOiBcItCa0L7QvNC/0L7Qt9C40YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfZmlnc1wiOiBcItCi0LDQvdGG0LXQstCw0LvRjNC90YvQtSDRhNC40LPRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV90ZWNoXCI6IFwi0KLQtdGF0L3QuNC60LAg0YLQsNC90YbQtdCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2ZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMylcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX21pc3Rha2VzXCI6IFwi0J7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3NtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9iaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfd29tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YDRiNCwICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbXByZXNzaW9uXCI6IFwi0J7QsdGJ0LXQtSDQstC/0LXRh9Cw0YLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicG9pbnRzXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtNSlcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJsYWNrX2NhcmRcIjogXCItMTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2Vfc2NvcmVzXCI6IFwi0J7RhtC10L3QutC4INC70LjQvdC10LnQvdGL0YUg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5X3R5cGVcIjogXCLQqNGC0YDQsNGE0L3Ri9C1INGB0LDQvdC60YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldmlvdXNfcGVuYWx0aWVzXCI6IFwi0J/RgNC10LTRi9C00YPRidC40LUg0YjRgtGA0LDRhNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ5ZWxsb3dfY2FyZFwiOiBcIi0zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV95ZWxsb3dfY2FyZFwiOiBcIi01XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlc2V0X3RvX25cIjogKG4pID0+IFwi0KHQsdGA0L7RgSDQvdCwIFwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpbWluZ1wiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJyZWFrZG93blwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiOiBcIkFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwiQVwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNcIjogXCLQmlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRmXCI6IFwi0KLQpFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmRcIjogXCLQn1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZtXCI6IFwi0J7QpdC8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpXCI6IFwi0J7QklwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1cIjogXCLQntGIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21cIjogXCLQnNCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidFwiOiBcIs6jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19hZHZhbmNlZFwiOiBcItCf0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiOiBcItCd0LUg0L/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQu9C4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQsNC60YDQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NfdmVyYm9zZVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwICjQt9Cw0Y/QstC60LAv0YTQsNC60YIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FyZFwiOiBcItCo0YLRgNCw0YRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVfc2hvcnRcIjogXCLQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCj0YfQsNGB0YLQvdC40LosINGA0LXQt9GD0LvRjNGC0LDRglwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5leHRfdG91clwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQv9GA0LjQvdC40LzQsNC7INGD0YfQsNGB0YLQuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhCDQs9C70LDQstC90L7Qs9C+INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItCc0LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQmNGC0L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc19uYW1lc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9md1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0LHQtdC3INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0YEg0LDQutGA0L7QsdCw0YLQuNC60L7QuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGC0LDQvdGG0LXQstCw0LvRjNC90YvQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxpZmllZFwiOiBcItCg0L7RgdCk0JDQoNCgLCDRg9C/0YDQvtGJ0LXQvdC90LDRjyDRgdC40YHRgtC10LzQsCAoMeKAkzQwKVwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdlX3JvbGVzXCI6IHtcclxuICAgICAgICAgICAgXCJcIjogXCItXCIsXHJcbiAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0YLQsNC90YbQsFwiLFxyXG4gICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C70LDQstC90YvQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgbGV0IHBhdGggPSBzcmMuc3BsaXQoXCIuXCIpO1xyXG4gICAgbGV0IHBocmFzZV9wdHIgPSBQSFJBU0VTO1xyXG4gICAgcGF0aC5mb3JFYWNoKChjaHVuaykgPT4gcGhyYXNlX3B0ciA9IHBocmFzZV9wdHJbY2h1bmtdKTtcclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZmluZCB0cmFuc2xhdGlvbiBmb3IgXCIgKyBzcmMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGhyYXNlX3B0ciguLi5hcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwaHJhc2VfcHRyO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIGdldFBvc3NpYmxlVG91ck5hbWVzID0gKCkgPT4gW1xyXG4gICAgXCLQpNC40L3QsNC7XCIsXHJcbiAgICBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgIFwi0J7RgtCx0L7RgNC+0YfQvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICBcIjEvMiDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS80INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzgg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvMTYg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG5dO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgc2hvd0Vycm9yIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcblxyXG5jbGFzcyBBcGlJbXBsIHtcclxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IChtc2csIGNvZGUsIGFyZ3MpID0+IHNob3dFcnJvcihjb2RlID8gXyhjb2RlLCAuLi5hcmdzKSA6IG1zZyk7XHJcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gKC4uLmRhdGEpID0+IGNvbnNvbGUuZXJyb3IoXCJBUEkgZmFpbFwiLCAuLi5kYXRhKTtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG4gICAgb25Eb25lKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9kb25lID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvblN1Y2Nlc3MoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRXJyb3IoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvbkZhaWwoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFkZFRvREIobW9kZWxfdHlwZSwgbW9kZWxfaWQsIHN0PXN0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHN0LmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZW5kKCkge1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvYXBpXCIsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfZGIocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9zdWNjZXNzKHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZXJyb3IocmVzcG9uc2UubWVzc2FnZSwgcmVzcG9uc2UuY29kZSwgcmVzcG9uc2UuYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiY2xpZW50X2lkXCIsIHdpbmRvdy5jbGllbnRfaWQpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcIm1ldGhvZFwiLCB0aGlzLm1ldGhvZCk7XHJcbiAgICAgICAgeGhyLnNlbmQoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgQXBpID0gKC4uLmFyZ3MpID0+IG5ldyBBcGlJbXBsKC4uLmFyZ3MpO1xyXG4iLCJpbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25fc3RhdHVzIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlRGlzcGF0Y2hlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNfY250ID0gMDtcclxuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIHdlYnNvY2tldC4uLlwiKTtcclxuICAgICAgICB0aGlzLndzID0gbmV3IFNvY2tKUyhcImh0dHA6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvd3NcIik7XHJcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0T2soKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQuXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbW1wicmVsb2FkX2RhdGFcIiwgbnVsbF1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbF91cGRhdGVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0RmFpbCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gY2xvc2VkLlwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY29ubmVjdC5iaW5kKHRoaXMpLCA1MDApO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbk1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhW1wiY2xpZW50X2lkXCJdKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGllbnRfaWQgPSBkYXRhW1wiY2xpZW50X2lkXCJdO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEubWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBtc2dfdHlwZSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIGxldCBtc2dfZGF0YSA9IGRhdGFbMV07XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge307XHJcbiAgICAgICAgICAgIGlmIChtc2dfdHlwZSA9PT0gXCJmb3JjZV9yZWZyZXNoXCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9KS5mb3JFYWNoKChrZXkpID0+IGxpc3RlbmVyc1trZXldKG1zZ19kYXRhKSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgZGF0YS5tb2RlbF91cGRhdGVzLmZvckVhY2goKG1vZGVsX2luZm8pID0+IHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gc3RvcmFnZS51cGRhdGVNb2RlbChtb2RlbF9pbmZvLm1vZGVsLCBtb2RlbF9pbmZvLmlkLCBtb2RlbF9pbmZvLmRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZGF0YV9jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tcImRiX3VwZGF0ZVwiXSB8fCB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldExpc3RlbmVySWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzX2NudCsrO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXIobXNnX3R5cGVzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuZ2V0TGlzdGVuZXJJZCgpO1xyXG4gICAgICAgIG1zZ190eXBlcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihtc2dfdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW21zZ190eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdW2lkXSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJfaWQpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW2tleV1bbGlzdGVuZXJfaWRdO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgbWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XHJcbiIsImNsYXNzIFJlZiB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lLCBpZCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5tb2RlbF9uYW1lKS5ieV9pZCh0aGlzLmlkKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgaWQsIG1vZGVsX3N0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fX3N0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXMgPSB7fTtcclxuICAgICAgICB0aGlzLl9fbW9kZWxfc3RvcmFnZSA9IG1vZGVsX3N0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGRCYWNrUmVmKGtleSwgcmVmKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gcmVmO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGRhdGEsIGNyZWF0ZT10cnVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkeCkpIHtcclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiIHx8IGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZSAmJiB0eXBlb2YgdGhpc1tpZHguc2xpY2UoMSldID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIHRoaXMuX19tb2RlbF9zdG9yYWdlLm1vZGVsX25hbWUsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmX2tleSA9IGRhdGFbaWR4XS5iYWNrX3JlZjtcclxuICAgICAgICAgICAgICAgIGRhdGFbaWR4XS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKG5lc3RlZF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YS5kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmLmdldCgpLmFkZEJhY2tSZWYoYmFja19yZWZfa2V5LCBiYWNrX3JlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldLnB1c2gocmVmKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIipcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRfZGF0YSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2lkeF0gPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2lkeF0gPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VyaWFsaXplKHNjaGVtYSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9fa2V5X3R5cGVzKSBpZiAodGhpcy5fX2tleV90eXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fX2tleV90eXBlc1trZXldKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLm1hcChmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZi5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJeXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5pZCA9IHRoaXMuaWRcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbHNTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMubW9kZWxzID0ge307XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZChpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbHNbaWRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXSA9IG5ldyBNb2RlbCh0aGlzLnN0b3JhZ2UsIGlkLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsc1tpZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBieV9pZChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpZF07XHJcbiAgICB9XHJcbiAgICBhbGwoKSB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1vZGVscyk7XHJcbiAgICAgICAgcmV0dXJuIGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNba2V5XTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlcyA9IHt9XHJcbiAgICAgICAgdGhpcy5kb21haW5zID0ge31cclxuICAgIH1cclxuICAgIGdldERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZG9tYWluc1tkb21haW5dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tYWluc1tkb21haW5dID0gbmV3IFN0b3JhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZGVsRG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGdldChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPSBuZXcgTW9kZWxzU3RvcmFnZSh0aGlzLCBtb2RlbF9uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICBkZWwobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTW9kZWwobW9kZWxfdHlwZSwgbW9kZWxfaWQsIGRhdGEpIHtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfdHlwZV0pIHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCBkYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZG9tYWlucykuZm9yRWFjaCgoa2V5KSA9PlxyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmRvbWFpbnNba2V5XS51cGRhdGVNb2RlbCguLi5hcmd1bWVudHMpIHx8IGRhdGFfY2hhbmdlZCk7XHJcbiAgICAgICAgLy8gcmV0dXJuIGRhdGFfY2hhbmdlZDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBzdHlsZT17eyBcImhlaWdodFwiOiBcIjEwMCVcIiwgXCJ3aWR0aFwiOiBcIjEwMCVcIiB9fT48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIiB9fT5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9pbWcvYWpheC1sb2FkZXIuZ2lmXCIgLz5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1c01vY2sge1xyXG4gICAgc2V0T2soKSB7fVxyXG4gICAgc2V0RmFpbCgpIHt9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgXCJjb25uZWN0ZWRcIjogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdGlvbl9zdGF0dXNcIik7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcclxuICAgICAgICAgICAgICAgIDxDb25uZWN0aW9uU3RhdHVzIC8+LFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25TdGF0dXNNb2NrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEludGVydmFsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRpY2s6ICF0aGlzLnN0YXRlLnRpY2ssXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDc1MCk7XHJcbiAgICB9XHJcbiAgICBzdG9wSW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0T2soKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiB0cnVlLCB0aWNrOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHNldEZhaWwoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEludGVydmFsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3RlZDogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIG9rXCI+PC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3RlZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW5nXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC1kYW5nZXJcIiArICh0aGlzLnN0YXRlLnRpY2sgPyBcIiB0aWNrXCIgOiBcIlwiKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5sYWJlbHMuY29ubmVjdGlvbl9wcm9ibGVtXCIpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIGNvbm5lY3Rpb25fc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5pbml0KCk7XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1zZykge1xuICAgIGxldCB0aXRsZSA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1swXSA6IF8oXCJnbG9iYWwubWVzc2FnZXMuZXJyb3JfaGVhZGVyXCIpO1xuICAgIGxldCB0ZXh0ID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzFdIDogbXNnO1xuICAgIHN3YWwoe1xuICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDb25maXJtKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkge1xuICAgIHJldHVybiBzd2FsKHtcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIiksXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxuICAgICAgICBjbG9zZU9uQ29uZmlybTogY2xvc2Vfb25fY29uZmlybSxcbiAgICB9LCBhY3Rpb24pO1xufVxuIl19
