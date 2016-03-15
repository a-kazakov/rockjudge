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
                "sportsmen_list": "Список спортсменов",
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
                "show_sportsmen_only": "Показывать только спортсменов",
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
                "n_sportsmen": function n_sportsmen(n, s) {
                    return n.toString() + " спортсмен" + chooseEnding(n, "", "а", "ов") + (s > 0 ? " (+" + s + " запасн" + chooseEnding(s, "ой", "ых", "ых") + ")" : "");
                },
                "n_sportsmen_short": function n_sportsmen_short(n, s) {
                    return n.toString() + " спортсмен" + chooseEnding(n, "", "а", "ов") + (s > 0 ? " (+" + s + " зап.)" : "");
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
                "sportsman": "Спортсмен",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGNvbXBldGl0aW9uc1xcbWFpbi5qc3giLCJzcmNcXGpzeFxcY29tbW9uXFx0b29scy5qc3giLCJzcmNcXGpzeFxcY29tcGV0aXRpb25zLmpzeCIsInNyY1xcanN4XFxpMTBuXFxsb2FkZXIuanN4Iiwic3JjXFxqc3hcXGkxMG5cXHJ1LmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ1NNOzs7QUFDRixhQURFLG9CQUNGLENBQVksS0FBWixFQUFtQjs4QkFEakIsc0JBQ2lCOztxREFDZiw0QkFBTSxLQUFOLEdBRGU7O0FBRWYsWUFBSSxRQUFRLGtCQUFNLE1BQUssS0FBTCxDQUFXLFdBQVgsQ0FBZCxDQUZXO0FBR2YsY0FBSyxLQUFMLEdBQWEsS0FBYixDQUhlO0FBSWYsY0FBSyxZQUFMLEdBQW9CLE1BQXBCLENBSmU7O0tBQW5COztBQURFLG1DQU9GLDZCQUFTLE9BQU8sS0FBSyxPQUFPLE1BQU0sT0FBTztBQUNyQyxZQUFJLFlBQVksVUFBVSxRQUFWLEdBQXFCLE1BQU0sTUFBTixDQUFhLE9BQWIsR0FBdUIsTUFBTSxNQUFOLENBQWEsS0FBYixDQUR2QjtBQUVyQyxZQUFJLFFBQVEsa0JBQU0sS0FBSyxLQUFMLENBQWQsQ0FGaUM7QUFHckMsZ0JBQVEsS0FBUjtBQUNBLGlCQUFLLE1BQUw7QUFDSSxzQkFBTSxJQUFOLENBQVcsR0FBWCxFQUFnQixLQUFoQixJQUF5QixTQUF6QixDQURKO0FBRUksc0JB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QUFqQjtZQUNVLGVBQUUsa0NBQUYsQ0FEVjtTQURKLENBWEs7OztXQTdDUDtFQUF5QixNQUFNLFNBQU47O0FBZ0V4QixJQUFJLGdEQUFvQixpQkFBaUIsSUFBakIsRUFBcEI7Ozs7Ozs7OztRQy9FSztRQVdBOzs7O0FBWFQsU0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCO0FBQzNCLFFBQUksUUFBUSxRQUFRLGlEQUFQLEtBQWUsUUFBZixHQUEyQixJQUFJLENBQUosQ0FBNUIsR0FBcUMsZUFBRSw4QkFBRixDQUFyQyxDQURlO0FBRTNCLFFBQUksT0FBTyxRQUFRLGlEQUFQLEtBQWUsUUFBZixHQUEyQixJQUFJLENBQUosQ0FBNUIsR0FBcUMsR0FBckMsQ0FGZ0I7QUFHM0IsU0FBSztBQUNELGVBQU8sS0FBUDtBQUNBLGNBQU0sSUFBTjtBQUNBLGNBQU0sT0FBTjtBQUNBLG1CQUFXLEtBQVg7S0FKSixFQUgyQjtDQUF4Qjs7QUFXQSxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEIsTUFBOUIsRUFBOEQ7UUFBeEIseUVBQWlCLHFCQUFPOztBQUNqRSxXQUFPLEtBQUs7QUFDUixlQUFPLE9BQVA7QUFDQSxtQkFBVyxLQUFYO0FBQ0EsMEJBQWtCLElBQWxCO0FBQ0EsMkJBQW1CLGVBQUUsbUJBQUYsQ0FBbkI7QUFDQSwwQkFBa0IsZUFBRSxrQkFBRixDQUFsQjtBQUNBLHdCQUFnQixnQkFBaEI7S0FORyxFQU9KLE1BUEksQ0FBUCxDQURpRTtDQUE5RCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBzaG93Q29uZmlybSB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBjbG9uZSB9IGZyb20gXCJjb21tb24vdG9vbHNcIjtcblxuXG5jbGFzcyBDb21wZXRpdGlvbkVkaXRvclJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICBsZXQgc3RhdGUgPSBjbG9uZSh0aGlzLnByb3BzLmNvbXBldGl0aW9uKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmxhdGVzdF9hZGRlZCA9IFwiYmFzZVwiO1xuICAgIH1cbiAgICBvbkNoYW5nZShncm91cCwgaWR4LCBmaWVsZCwgdHlwZSwgZXZlbnQpIHtcbiAgICAgICAgbGV0IG5ld192YWx1ZSA9IGZpZWxkID09PSBcImFjdGl2ZVwiID8gZXZlbnQudGFyZ2V0LmNoZWNrZWQgOiBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGxldCBzdGF0ZSA9IGNsb25lKHRoaXMuc3RhdGUpO1xuICAgICAgICBzd2l0Y2ggKGdyb3VwKSB7XG4gICAgICAgIGNhc2UgXCJpbmZvXCI6XG4gICAgICAgICAgICBzdGF0ZS5pbmZvW2lkeF1bZmllbGRdID0gbmV3X3ZhbHVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJcIjpcbiAgICAgICAgICAgIHN0YXRlW2ZpZWxkXSA9IG5ld192YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG4gICAgYWRkSW5mb0l0ZW0oKSB7XG4gICAgICAgIGxldCBpbmZvID0gY2xvbmUodGhpcy5zdGF0ZS5pbmZvKTtcbiAgICAgICAgbGV0IG5ld19pZHggPSBpbmZvLmxlbmd0aDtcbiAgICAgICAgaW5mby5wdXNoKFtcIlwiLCBcIlwiXSk7XG4gICAgICAgIHRoaXMubGF0ZXN0X2FkZGVkID0gXCJpbmZvXCIgKyBuZXdfaWR4O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGluZm86IGluZm8sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmVJbmZvSXRlbShpZHgpIHtcbiAgICAgICAgbGV0IGluZm8gPSBjbG9uZSh0aGlzLnN0YXRlLmluZm8pO1xuICAgICAgICBpbmZvLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGluZm86IGluZm8sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtb3ZlSW5mb0l0ZW1VcChpZHgpIHtcbiAgICAgICAgbGV0IGluZm8gPSBjbG9uZSh0aGlzLnN0YXRlLmluZm8pO1xuICAgICAgICBsZXQgY3VycmVudCA9IGluZm9baWR4XTtcbiAgICAgICAgbGV0IHVwcGVyID0gaW5mb1tpZHggLSAxXTtcbiAgICAgICAgaW5mb1tpZHhdID0gdXBwZXI7XG4gICAgICAgIGluZm9baWR4IC0gMV0gPSBjdXJyZW50O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGluZm86IGluZm8sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtb3ZlSW5mb0l0ZW1Eb3duKGlkeCkge1xuICAgICAgICB0aGlzLm1vdmVJbmZvSXRlbVVwKGlkeCArIDEpO1xuICAgIH1cbiAgICBzZXJ0aWFsaXplKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5zdGF0ZS5uYW1lLFxuICAgICAgICAgICAgZGF0ZTogdGhpcy5zdGF0ZS5kYXRlLFxuICAgICAgICAgICAgYWN0aXZlOiB0aGlzLnN0YXRlLmFjdGl2ZSxcbiAgICAgICAgICAgIGluZm86IHRoaXMuc3RhdGUuaW5mbyxcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblN1Ym1pdChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMubmV3Q29tcGV0aXRpb24pIHtcbiAgICAgICAgICAgIEFwaShcImNvbXBldGl0aW9uLnNldFwiLCB7XG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb25faWQ6IHRoaXMuc3RhdGUuaWQsXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJ0aWFsaXplKCksXG4gICAgICAgICAgICB9KS5vblN1Y2Nlc3ModGhpcy5wcm9wcy5zdG9wRWRpdGluZykuc2VuZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQXBpKFwiY29tcGV0aXRpb24uY3JlYXRlXCIsIHtcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnNlcnRpYWxpemUoKSxcbiAgICAgICAgICAgIH0pLm9uU3VjY2Vzcyh0aGlzLnByb3BzLnN0b3BFZGl0aW5nKS5zZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgYnRpID0gKHRoaXMucHJvcHMuaWR4IHx8IDEwMDApICogMTAwMDA7XG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5zdGF0ZS5pbmZvLm1hcChmdW5jdGlvbihpdGVtLCBpZHgpIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImluZm8taXRlbVwiIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17IGJ0aSArIDEwMDAgKyAxMCAqIGlkeCArIDEgfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSAmJiB0aGlzLmxhdGVzdF9hZGRlZCA9PT0gXCJpbmZvXCIgKyBpZHgudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXRlc3RfYWRkZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eyBfKFwibW9kZWxzLmNvbXBldGl0aW9uLmluZm9faXRlbV90aXRsZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgaXRlbVswXSB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIFwiaW5mb1wiLCBpZHgsIDAsIFwiYW55XCIpIH0gLz5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9eyBidGkgKyAxMDAwICsgMTAgKiBpZHggKyAyIH1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsgXyhcIm1vZGVscy5jb21wZXRpdGlvbi5pbmZvX2l0ZW1fdmFsdWVcIikgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IGl0ZW1bMV0gfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzLCBcImluZm9cIiwgaWR4LCAxLCBcImFueVwiKSB9IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZG93biBidG4gYnRuLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IGlkeCA9PT0gdGhpcy5zdGF0ZS5pbmZvLmxlbmd0aCAtIDEgfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5tb3ZlSW5mb0l0ZW1Eb3duLmJpbmQodGhpcywgaWR4KSB9PuKGkzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInVwIGJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgaWR4ID09PSAwIH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMubW92ZUluZm9JdGVtVXAuYmluZCh0aGlzLCBpZHgpIH0+4oaRPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZGVsIGJ0biBidG4tZGFuZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMucmVtb3ZlSW5mb0l0ZW0uYmluZCh0aGlzLCBpZHgpIH0+WDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+O1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gPHRyIGNsYXNzTmFtZT17IFwiZWRpdG9yXCIgKyAodGhpcy5wcm9wcy5uZXdDb21wZXRpdGlvbiA/IFwiIGNyZWF0ZVwiIDogXCJcIiApIH0+XG4gICAgICAgICAgICA8dGQgY29sU3Bhbj1cIjRcIj5cbiAgICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17IHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSB9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBnZW5lcmFsLWluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnVsbC13aWR0aFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJtb2RlbHMuY29tcGV0aXRpb24ubmFtZVwiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9eyBidGkgKyAxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlICYmIHRoaXMubGF0ZXN0X2FkZGVkID09PSBcImJhc2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdGVzdF9hZGRlZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnN0YXRlLm5hbWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcywgXCJcIiwgbnVsbCwgXCJuYW1lXCIsIFwiYW55XCIpIH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcIm1vZGVscy5jb21wZXRpdGlvbi5kYXRlXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17IGJ0aSArIDJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5zdGF0ZS5kYXRlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIFwiXCIsIG51bGwsIFwiZGF0ZVwiLCBcImFueVwiKSB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZnVsbC13aWR0aFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJtb2RlbHMuY29tcGV0aXRpb24uYWN0aXZlXCIpIH08YnIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17IGJ0aSArIDN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17IHRoaXMuc3RhdGUuYWN0aXZlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMsIFwiXCIsIG51bGwsIFwiYWN0aXZlXCIsIFwiYW55XCIpIH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC03XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnsgXyhcIm1vZGVscy5jb21wZXRpdGlvbi5pbmZvXCIpIH08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaW5mbyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17IGJ0aSArIDE5OTl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmdWxsLXdpZHRoIGJ0biBidG4tc20gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5hZGRJbmZvSXRlbS5iaW5kKHRoaXMpIH0+eyBfKFwiZ2xvYmFsLmJ1dHRvbnMuYWRkXCIpIH08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD4mbmJzcDs8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17IGJ0aSArIDEwMDAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIj57IF8oXCJnbG9iYWwuYnV0dG9ucy5zdWJtaXRcIikgfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17IGJ0aSArIDEwMDAxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5wcm9wcy5zdG9wRWRpdGluZyB9PnsgXyhcImdsb2JhbC5idXR0b25zLmRpc2NhcmRcIikgfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5jbGFzcyBDb21wZXRpdGlvblJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZWRpdGluZzogZmFsc2UsXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnRFZGl0aW5nKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGVkaXRpbmc6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wRWRpdGluZygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uRGVsZXRlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBzaG93Q29uZmlybShfKFwiYWRtaW4uY29uZmlybXMuZGVsZXRlX2NvbXBldGl0aW9uXCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBBcGkoXCJjb21wZXRpdGlvbi5kZWxldGVcIiwge1xuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uX2lkOiB0aGlzLnByb3BzLmNvbXBldGl0aW9uLmlkLFxuICAgICAgICAgICAgfSkub25TdWNjZXNzKCgpID0+IHN3YWwuY2xvc2UoKSkuc2VuZCgpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICByZW5kZXJFZGl0b3IoKSB7XG4gICAgICAgIHJldHVybiA8Q29tcGV0aXRpb25FZGl0b3JSb3dcbiAgICAgICAgICAgIG5ld0NvbXBldGl0aW9uPXsgZmFsc2UgfVxuICAgICAgICAgICAgc3RvcEVkaXRpbmc9eyB0aGlzLnN0b3BFZGl0aW5nLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH0gLz5cbiAgICB9XG4gICAgcmVuZGVyVmlld2VyKCkge1xuICAgICAgICBsZXQgcCA9IHRoaXMucHJvcHMuY29tcGV0aXRpb247XG4gICAgICAgIHJldHVybiA8dHIgY2xhc3NOYW1lPVwidmlld2VyXCIgb25DbGljaz17IHRoaXMuc3RhcnRFZGl0aW5nLmJpbmQodGhpcykgfT5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJuYW1lXCI+eyBwLm5hbWUgfTwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZGF0ZVwiPnsgcC5kYXRlIH08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImlzLWFjdGl2ZVwiPnsgcC5hY3RpdmUgPyBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIikgOiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKSB9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJkZWxldGVcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgb25DbGljaz17IHRoaXMub25EZWxldGUuYmluZCh0aGlzKSB9Plg8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmVkaXRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckVkaXRvcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVmlld2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIENvbXBldGl0aW9uQ3JlYXRpb25Sb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0RWRpdGluZygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBlZGl0aW5nOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RvcEVkaXRpbmcoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZWRpdGluZzogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJFZGl0b3IoKSB7XG4gICAgICAgIGxldCBlbXB0eV9kYXRhID0ge1xuICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICBcImRhdGVcIjogXCJcIixcbiAgICAgICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgICAgICBcImluZm9cIjogW10sXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxDb21wZXRpdGlvbkVkaXRvclJvd1xuICAgICAgICAgICAgbmV3Q29tcGV0aXRpb25cbiAgICAgICAgICAgIHN0b3BFZGl0aW5nPXsgdGhpcy5zdG9wRWRpdGluZy5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgIGNvbXBldGl0aW9uPXsgZW1wdHlfZGF0YSB9XG4gICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfSAvPjtcbiAgICB9XG4gICAgcmVuZGVyQnV0dG9uKCkge1xuICAgICAgICByZXR1cm4gPHRyPjx0ZCBjb2xTcGFuPVwiNVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBmdWxsLXdpZHRoXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5zdGFydEVkaXRpbmcuYmluZCh0aGlzKSB9PnsgXyhcImFkbWluLmJ1dHRvbnMuYWRkX2NvbXBldGl0aW9uXCIpIH08L2J1dHRvbj5cbiAgICAgICAgPC90ZD48L3RyPlxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmVkaXRpbmcgPyB0aGlzLnJlbmRlckVkaXRvcigpIDogdGhpcy5yZW5kZXJCdXR0b24oKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wZXRpdGlvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uczogbnVsbCxcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiY29tcGV0aXRpb25fbGlzdF91cGRhdGVcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgIH1cbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgbGV0IHNlcmlhbGl6ZWQgPSBzdG9yYWdlXG4gICAgICAgICAgICAuZ2V0KFwiQ29tcGV0aXRpb25cIilcbiAgICAgICAgICAgIC5hbGwoKVxuICAgICAgICAgICAgLm1hcCgoYykgPT4gYy5zZXJpYWxpemUoe30pKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uczogc2VyaWFsaXplZCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBBcGkoXCJjb21wZXRpdGlvbi5nZXRfYWxsXCIsIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiB7fSxcbiAgICAgICAgfSlcbiAgICAgICAgLm9uU3VjY2VzcyhmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJDb21wZXRpdGlvblwiKTtcbiAgICAgICAgICAgIHJlc3BvbnNlLmZvckVhY2goKGMpID0+IHN0b3JhZ2UuZ2V0KFwiQ29tcGV0aXRpb25cIikuYWRkKGMuaWQsIGMuZGF0YSkpO1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSgpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIHJlbmRlclRhYmxlKCkge1xuICAgICAgICBsZXQgcm93cyA9IHRoaXMuc3RhdGUuY29tcGV0aXRpb25zLm1hcChmdW5jdGlvbihjb21wZXRpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIDxDb21wZXRpdGlvblJvd1xuICAgICAgICAgICAgICAgIGtleT17IGNvbXBldGl0aW9uLmlkIH1cbiAgICAgICAgICAgICAgICBjb21wZXRpdGlvbj17IGNvbXBldGl0aW9uIH0gLz47XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm1hbmFnZS1jb21wZXRpdGlvbnNcIj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwibmFtZVwiPnsgXyhcIm1vZGVscy5jb21wZXRpdGlvbi5uYW1lXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImRhdGVcIj57IF8oXCJtb2RlbHMuY29tcGV0aXRpb24uZGF0ZVwiKSB9PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJpcy1hY3RpdmVcIj57IF8oXCJtb2RlbHMuY29tcGV0aXRpb24uYWN0aXZlXCIpIH08L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImRlbGV0ZVwiPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIHsgcm93cyB9XG4gICAgICAgICAgICAgICAgICAgIDxDb21wZXRpdGlvbkNyZWF0aW9uUm93XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2lkPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2lkIH0gLz5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29tcGV0aXRpb25zID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gPExvYWRlciAvPlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICA8aDE+eyBfKFwiYWRtaW4uaGVhZGVycy5jb21wZXRpdGlvbnNfbWFuYWdlbWVudFwiKSB9PC9oMT5cbiAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRhYmxlKCkgfVxuICAgICAgICA8L2Rpdj47XG4gICAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNsb25lKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG5jbGFzcyBDbXBDaGFpbkltcGwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlc3VsdCA9IDA7XG4gICAgfVxuICAgIGNtcChhLCBiKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBDbXBDaGFpbiA9ICgpID0+IG5ldyBDbXBDaGFpbkltcGwoKTtcbiIsImltcG9ydCB7IENvbXBldGl0aW9ucyB9IGZyb20gXCJhZG1pbi9jb21wZXRpdGlvbnMvbWFpblwiO1xuXG5cblJlYWN0RE9NLnJlbmRlcihcbiAgICA8Q29tcGV0aXRpb25zIHsgLi4ud2luZG93LnBhZ2VfcHJvcHMgfSAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIilcbik7XG4iLCJpbXBvcnQgeyB0cmFuc2xhdGUsIGdldFBvc3NpYmxlVG91ck5hbWVzIH0gZnJvbSBcIi4vcnVcIjtcblxuZXhwb3J0IHZhciBfID0gdHJhbnNsYXRlO1xuZXhwb3J0IHZhciB0b3VyX25hbWVzID0gZ2V0UG9zc2libGVUb3VyTmFtZXMoKTtcbiIsImV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCBhcmcpIHtcclxuICAgIGZ1bmN0aW9uIGNob29zZUVuZGluZyhuLCBlMSwgZTIsIGU1KSB7XHJcbiAgICAgICAgbGV0IHggPSBuICUgMTAwO1xyXG4gICAgICAgIGlmIChNYXRoLmZsb29yKHggLyAxMCkgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA+PSA1IHx8IHggJSAxMCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlMjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgUEhSQVNFUyA9IHtcclxuICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiAodmVyc2lvbiwgZGF0ZSkgPT4gPGRpdiBjbGFzc05hbWU9XCJhYm91dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxiPlJvY2tKdWRnZSB7dmVyc2lvbn08L2I+ICjQvtGCIHtkYXRlfSkgJm1kYXNoOyDRgdC40YHRgtC10LzQsCDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDRgNC10LfRg9C70YzRgtCw0YLQvtCyINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDQv9C+INCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC+0LzRgyDRgNC+0Lot0L0t0YDQvtC70LvRgy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JDQstGC0L7RgNGB0LrQuNC1INC/0YDQsNCy0LAg0L3QsCDRgdC40YHRgtC10LzRgyBSb2NrSnVkZ2Ug0L/QvtC70L3QvtGB0YLRjNGOINC/0YDQuNC90LDQtNC70LXQttCw0YIg0YDQsNC30YDQsNCx0L7RgtGH0LjQutGDINCQ0YDRgtC10LzRgyDQmtCw0LfQsNC60L7QstGDLiDQodC+0LDQstGC0L7RgCDRgdC40YHRgtC10LzRiyDQkNC90YLQvtC9INCQ0LzQtdC70LjQvS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0KHQuNGB0YLQtdC80LAg0YDQsNGB0L/RgNC+0YHRgtGA0LDQvdGP0LXRgtGB0Y8g0L/QviDQu9C40YbQtdC90LfQuNC4IExpbnVtIGQuby5vIChpbmZvQGxpbnVtLmhyKS4g0JTQu9GPINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsCBSb2NrSnVkZ2Ug0L3QtdC+0LHRhdC+0LTQuNC80L4g0Lgg0LTQvtGB0YLQsNGC0L7Rh9C90L4g0LjQvNC10YLRjCDQv9GA0LDQstC+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLIExpbnVtIExQUy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0J7RhNC40YbQuNCw0LvRjNC90YvQuSDRgdCw0LnRgjogPGEgaHJlZj1cImh0dHBzOi8vcm9ja2p1ZGdlLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5odHRwczovL3JvY2tqdWRnZS5jb20vPC9hPjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3Byb2dyYW1zX2FmdGVyX2NyZWF0aW9uXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLINC80L7QttC90L4g0LHRg9C00LXRgiDQtNC+0LHQsNCy0LjRgtGMINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGB0L7RhdGA0LDQvdC10L3QuNGPINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0LrQvtGA0YDQtdC60YLQvdC+INC90LDRgdGC0YDQvtC10L3QsCDQuCDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L3QsC5cIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX25vdF9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQvdC10LTQvtGB0YLRg9C/0L3QsCDQvdCwINGN0YLQvtC8INC60L7QvNC/0YzRgtC10YDQtS5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmluYWxpemVkXCI6IFwi0J7RgtGB0YPRgtGB0YLQstGD0Y7RgiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3dhcm5pbmdcIjogPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPtCk0LjQvdCw0LvQuNC30LDRhtC40Y8g0LTQvtC70LbQvdCwINC+0YLQvNC10L3Rj9GC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDQuNGB0LrQu9GO0YfQuNGC0LXQu9GM0L3Ri9GFINGB0LvRg9GH0LDRj9GFITwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QldGB0LvQuCDQttC1INGN0YLQviDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDQvdC10L7QsdGF0L7QtNC40LzQviwg0L7QsdGA0LDRgtC40YLQtSDQstC90LjQvNCw0L3QuNC1LCDRh9GC0L4g0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgdC/0LjRgdC+0Log0YPRh9Cw0YHRgtC90LjQutC+0LJcclxuICAgICAgICAgICAgICAgICAgICDRgdC70LXQtNGD0Y7RidC10LPQviDRgtGD0YDQsCDQsdGD0LTQtdGCINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC4INC/0LXRgNC10YHQvtC30LTQsNC9LiDQoNC10LfRg9C70YzRgtCw0YLRiyDRg9GH0LDRgdGC0L3QuNC60L7Qsiwg0L/RgNC+0YjQtdC00YjQuNGFINCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L/QvtGB0LvQtSDQv9C10YDQstC+0LlcclxuICAgICAgICAgICAgICAgICAgICDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INC4INC90LUg0L/RgNC+0YjQtdC00YjQuNGFINC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INCx0YPQtNGD0YIg0LHQtdC30LLQvtC30LLRgNCw0YLQvdC+INGD0YLQtdGA0Y/QvdGLITwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QmCDQvdC1INC30LDQsdGD0LTRjNGC0LUg0LfQsNC90L7QstC+INC90LDQv9C10YfQsNGC0LDRgtGMINCy0YHQtSDRgtCx0LvQuNGG0YsuPC9wPjwvZGl2PixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YHQuy7CoNGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInByaW50X3Rlc3RfcGFnZVwiOiBcItCd0LDQv9C10YfQsNGC0LDRgtGMINGC0LXRgdGC0L7QstGD0Y4g0YHRgtGA0LDQvdC40YbRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWV1ZVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWV1ZV9lbXB0eVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0YPRgdGC0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJ1bGVzXCI6IFwi0JfQsNC00LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwidGVzdFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3BhZ2VcIjogXCLQotC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF90ZXh0XCI6IFwi0K3RgtC+INGC0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsCBSb2NrSnVkZ2VcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NsdWJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC60LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvblwiOiBcItCh0L7Qt9C00LDRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RglwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfZGlzY2lwbGluZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YNcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2p1ZGdlXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgdGD0LTRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wYXJ0aWNpcGFudFwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF90b3VyXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X251bWJlcnNcIjogXCLQndC+0LzQtdGA0LAg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydFwiOiBcItCt0LrRgdC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0XCI6IFwi0JjQvNC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibGF1bmNoX2F1dG9fcHJpbnRlclwiOiBcItCX0LDQv9GD0YHQuiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQvtC5INC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9cIjogXCLQl9Cw0LPRgNGD0LfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0J/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0LLRgdC1INGD0YHRgtGA0L7QudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0J7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDRg9GB0YLRgNC+0LnRgdGC0LLQsNGFXCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19wbGFuXCI6IFwi0KHQvtGA0YLQuNGA0L7QutCwINC/0L4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19kaXNjaXBsaW5lc1wiOiBcItCh0L7RgNGC0LjRgNC+0LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgICAgIFwidW5jb25maXJtX3Njb3JlXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQutGB0LDRhtC40LhcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZVwiOiBcItCe0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NsdWJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDQutC70YPQsT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NvbXBldGl0aW9uXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2Rpc2NpcGxpbmVcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0LTQuNGB0YbQuNC/0LvQuNC90YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9qdWRnZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YHRg9C00YzRjj9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC/0YDQvtCz0YDQsNC80LzRgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOINGC0YPRgNCwPyDQktCy0LXQtNC40YLQtSDCq3VuZmluYWxpemXCuywg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiBcItCeINC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbGllbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LzQuCDRg9GB0YLRgNC+0LnRgdGC0LLQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfc3VtbWFyeVwiOiBcItCh0LLQvtC00LrQsCDQv9C+INC60LvRg9Cx0LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX21hbmFnZW1lbnRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQtNC40YHRhtC40L/Qu9C40L3QsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRfY29tcGV0aXRpb25cIjogXCLQrdC60YHQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LAg0Lgg0YDQtdC30YPQu9GM0YLQsNGC0L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfY29tcGV0aXRpb25cIjogXCLQmNC80L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTQtdC50YHQutCw0Y8g0LHRgNC40LPQsNC00LBcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9iYXRpY3NcIjogXCLQl9Cw0LPRgNGD0LfQutCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YPRh9Cw0YHRgtC90LjQutCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX21lbnVcIjogXCLQodC10YDQstC40YHQvdC+0LUg0LzQtdC90Y5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX2xpc3RcIjogXCLQodC/0LjRgdC+0Log0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fZGF0ZVwiOiBcItCU0LDRgtCwINC/0YDQvtCy0LXQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX25hbWVcIjogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJncm91cF9ieV9jbHVic1wiOiBcItCT0YDRg9C/0L/QuNGA0L7QstCw0YLRjCDQv9C+INC60LvRg9Cx0LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Fjcm9iYXRpY3NcIjogXCLQktC60LvRjtGH0LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfY2x1YnNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDQutC70YPQsdCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9kaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9leHRlbmRlZF9pbmZvXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHRiNC40YDQtdC90L3Rg9GOINC40L3RhNC+0YDQvNCw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZm9ybWF0aW9uX3Nwb3J0c21lblwiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YHQvtGB0YLQsNCyINGE0L7RgNC80LXQudGI0L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQtNCw0L3QvdGL0LUg0L4g0YHRg9C00YzRj9GFXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbGVzX3NlbGVjdGVkXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRhNCw0LnQuy4uLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXN0ZV9hY3JvXCI6IFwi0JLRgdGC0LDQstGM0YLQtSDQtNCw0L3QvdGL0LUg0LjQtyDQutCw0LvRjNC60YPQu9GP0YLQvtGA0LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zcG9ydHNtZW5fb25seVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDRgdC/0L7RgNGC0YHQvNC10L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3VtbWFyeVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDQutC+0LvQuNGH0LXRgdGC0LLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJcIjogXCLQt9Cw0L9cIiwgIC8vIHN1YnN0aXR1dGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfcGFzc2NvZGVcIjogXCLQktCy0LXQtNGR0L0g0L3QtdCy0LXRgNC90YvQuSDQutC+0LQg0L/QvtGC0LLQtdGA0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVudVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY2x1YnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2Rpc2NpcGxpbmVzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9qdWRnZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2Vfc3BvcnRzbWVuXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQv9C+0YDRgtGB0LzQtdC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV90b3Vyc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGC0YPRgNCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5fcGFydGljaXBhbnRzXCI6IG4gPT4gbi50b1N0cmluZygpICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJuX3Nwb3J0c21lblwiOiAobiwgcykgPT4gbi50b1N0cmluZygpICsgXCIg0YHQv9C+0YDRgtGB0LzQtdC9XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIikgKyAocyA+IDAgPyBgICgrJHtzfSDQt9Cw0L/QsNGB0L0keyBjaG9vc2VFbmRpbmcocywgXCLQvtC5XCIsIFwi0YvRhVwiLCBcItGL0YVcIikgfSlgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuX3Nob3J0XCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQvy4pYCA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9uX3BhcnRpY2lwYW50c1wiOiBuID0+IFwi0JjRgtC+0LPQviBcIiArIG4gKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2luZy10YWJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG91ci1hZG1pblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lLXJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlcnJvcnNcIjoge1xyXG4gICAgICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibG9hZF9zeW50YXhfZXJyb3JcIjogXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC00LDQvdC90YvRhVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFwaVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImR1cGxpY2F0ZWRfZXh0ZXJuYWxfaWRcIjogXCLQkiDQtNCw0L3QvdGL0YUg0LjQvNC10Y7RgtGB0Y8g0LfQsNC/0LjRgdC4INGBINC/0L7QstGC0L7RgNGP0Y7RidC40LzQuNC80YHRjyBleHRlcm5hbF9pZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmFibGVfdG9fZ2V0XCI6ICh3YW50ZWQpID0+IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QvtC70YPRh9C40YLRjCBcIiArIHdhbnRlZCArIFwiINC40Lcg0LfQsNC/0YDQvtGB0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LrQu9GD0LEsINC6INC60L7RgtC+0YDQvtC80YMg0L/RgNC40LLRj9C30LDQvdGLINGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX25vbl9lbXB0eVwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSwg0YHQvtC00LXRgNC20LDRidC10LUg0LTQuNGB0YbQuNC/0LvQuNC90YssINC60LvRg9Cx0Ysg0LjQu9C4INGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG9vX21hbnlfdG91cnNcIjogKGQpID0+IFtcItCe0YjQuNCx0LrQsCDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsIGDQkiDQtNC40YHRhtC40L/Qu9C40L3QtSAke2R9INGB0L7QtNC10YDQttC40YLRgdGPINCx0L7Qu9GM0YjQtSDRgtGD0YDQvtCyLCDRh9C10Lwg0YHQvtC30LTQsNC90L4g0LIg0YHQuNGB0YLQtdC80LVgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjaGFuZ2VfanVkZ2VzX3dpdGhfZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0L7RgdGC0LDQsiDRgdGD0LTQtdC5INC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Riywg0YHQvtC00LXRgNC20LDRidC10Lkg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINGDINC60L7RgNC+0LPQviDQtdGB0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfc2NvcmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVwZWF0aW5nX2p1ZGdlXCI6IChuYW1lKSA9PiBuYW1lICsgXCIg0LLRgdGC0YDQtdGH0LDQtdGC0YHRjyDQsiDRgdC/0LjRgdC60LUg0YHRg9C00LXQuSDQsdC+0LvQtdC1INC+0LTQvdC+0LPQviDRgNCw0LfQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludGVybmFsX3NlcnZlcl9lcnJvclwiOiBbXCLQntGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtVwiLCBcItC/0YDQvtCy0LXRgNGM0YLQtSDQu9C+0LPQuCDQtNC70Y8g0LjQvdGE0L7RgNC80LDRhtC40LhcIl0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9kaXNjaXBsaW5lc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINCy0YXQvtC00Y/RidC10LPQviDQsiDRgdGD0LTQtdC50YHQutGD0Y4g0LHRgNC40LPQsNC00YMg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRg9GH0LDRgdGC0L3QuNC60LAsINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INGF0L7RgtGPINCx0Ysg0LIg0L7QtNC90L7QvCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicnVuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2V0X3BlcmZvcm1lZF9mbGFnX29uX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHRgtCw0YLRg9GBINC30LDRhdC+0LTQsCDRhNC40L3QsNC70LjQt9C40L3QvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2NvcmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzY29yZV9ub3RfZXhpc3RcIjogXCLQn9C+0L/Ri9GC0LrQsCDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LUg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQuSDQvtGG0LXQvdC60Lgg0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfb25fZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINC+0YbQtdC90LrRgyDQsiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfYmVmb3JlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC00L7QsdCw0LLQuNGC0Ywg0L3QvtCy0YvQuSDRgtGD0YAg0L/QtdGA0LXQtCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YLRg9GALCDQv9GA0LjRgdGD0YLRgdGC0LLRg9GO0YnQuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF9maW5haWx6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2FkZF9hZnRlcl9pZFwiOiBcItCf0L7Qv9GL0YLQutCwINC00L7QsdCw0LjRgtGMINGC0YPRgCDQsiDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC1INC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF90b19ub25fZW1wdHlcIjogKGQpID0+IFtcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQs9GA0YPQt9C40YLRjCDRgtGD0YDRiyDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YtcIiwgYNCU0LjRgdGG0LjQv9C70LjQvdCwICR7ZH0g0YPQttC1INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YtgXSxcclxuICAgICAgICAgICAgICAgIFwibmV4dF9pc19maW5haWx6ZWRcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC90LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX25leHRfdG91clwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L/QvtGB0LvQtdC00L3QuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC90LUg0YHQvtC00LXRgNC20LjRgtGB0Y8g0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X25vdF9maW5haWx6ZWRcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgtGD0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQv9GD0YHRgtC40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX2ZpbmFsaXplZFwiOiBcItCU0LvRjyDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwINC90LUg0LTQvtC/0YPRgdC60LDQtdGC0YHRjyDQuNC30LzQtdC90LXQvdC40LUg0LrQstC+0YLRiyDQstGL0LLQvtC00LAsINGC0LjQv9CwINGC0YPRgNCwINC40LvQuCDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkXCI6IFwi0JTQvtCx0LDQstC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2VsZWN0X2FsbFwiOiBcItCh0L3Rj9GC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImVkaXRcIjogXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVcIjogXCLQo9C00LDQu9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkXCI6IFwi0J7RgtC80LXQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNhdmVcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2FsbFwiOiBcItCS0YvQsdGA0LDRgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJicm93c2VcIjogXCLQntCx0LfQvtGALi4uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3RpbmdcIjogXCLQn9C+0LTQutC70Y7Rh9C10L3QuNC1INC6INGB0LXRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fcHJvYmxlbVwiOiBcItCf0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZXNcIjogXCLQlNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vXCI6IFwi0J3QtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX2Vycm9yXCI6IFwi0J/QvtGF0L7QttC1LCDQuNC80LXRjtGC0YHRjyDQv9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiZXJyb3JfaGVhZGVyXCI6IFwi0J7RiNC40LHQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Y2Nlc3NcIjogXCLQntC/0LXRgNCw0YbQuNGPINGD0YHQv9C10YjQvdC+INC30LDQstC10YDRiNC10L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoZWF0X25cIjogKG4pID0+IFwi0JfQsNGF0L7QtCDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwianVkZ2VfblwiOiAobikgPT4gXCLQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25cIjogKG4sIG5hbWUsIG5fc3ApID0+XHJcbiAgICAgICAgICAgICAgICAgICAgKG5fc3AgPiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQpNC+0YDQvNC10LnRiNC9IOKEllwiICsgbi50b1N0cmluZygpICsgKG5hbWUgPyBcIjogXCIgKyBuYW1lIDogXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAobl9zcCA9PT0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCf0LDRgNCwIOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwi0KPRh9Cw0YHRgtC90LjQuiDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgbi50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnaW5nXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQntGB0YLQsNC90L7QstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00Ys/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwib2xkX3Njb3JlXCI6IFwi0JHQsNC30LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb2RlbHNcIjoge1xyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQtNC70Y8g0L/RgNC+0YLQvtC60L7Qu9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9iZWdpbm5pbmdcIjogXCLQndCw0YfQsNC70L5cIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2R1cmF0aW9uXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0JBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LtcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YVcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJvbGVzX2xlZ2VuZFwiOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctMTAwXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7Qk9C7IOKAlCDQs9C70LDQstC90YvQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QoiDigJQg0YHRg9C00YzRjyDRgtCw0L3RhtCwPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QkCDigJQg0YHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KJleCDigJQg0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBcItCa0LDRgtC10LPQvtGA0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L0uIElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQpC4g0JguINCeLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVcIjogXCLQoNC+0LvRjCDQsiDRgdGD0LTQtdC50YHRgtCy0LVcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZV9kZXNjcmlwdGlvblwiOiBcItCU0L7Qu9C20L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uc1wiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfbmFtZVwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfbmFtZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCLQmNC80Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCI6IFwi0J/QvtC7XCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9mXCI6IFwi0JZcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX21cIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5lcmFsX2luZm9cIjogXCLQntGB0L3QvtCy0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC+0LzQsNC90LTRiyDRhNC+0YDQvNC10LnRiNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcItCk0LDQvNC40LvQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZ3JhbXNcIjogXCLQn9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWFuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfblwiOiBcItCe0YHQvS5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV95XCI6IFwi0JfQsNC/LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZWFyX29mX2JpcnRoXCI6IFwi0JPQvtC0INGA0L7QttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwieW9iXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZ3JhbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfZm9yXCI6IFwi0J/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfcHJvZ3JhbVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX2hvcGVfdG91clwiOiBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwibnVtX2FkdmFuY2VzXCI6IFwi0JrQstC+0YLQsCDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX3Blcl9oZWF0XCI6IFwi0KPRh9Cw0YHRgtC90LjQutC+0LIg0LIg0LfQsNGF0L7QtNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjb3Jpbmdfc3lzdGVtX25hbWVcIjogXCLQodC40YHRgtC10LzQsCDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfaGVhdFwiOiBcItCh0LHRgNC+0YEg0L3QvtC80LXRgNCwINC30LDRhdC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9wbGFjZVwiOiBcItCh0LHRgNC+0YEg0LzQtdGB0YLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VzXCI6IFwi0JzQtdGB0YLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicHJlc2VudGVyXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19hY3RpdmVfdG91clwiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuXHJcbmNsYXNzIEFwaUltcGwge1xyXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gKG1zZywgY29kZSwgYXJncykgPT4gc2hvd0Vycm9yKGNvZGUgPyBfKGNvZGUsIC4uLmFyZ3MpIDogbXNnKTtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSAoLi4uZGF0YSkgPT4gY29uc29sZS5lcnJvcihcIkFQSSBmYWlsXCIsIC4uLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uU3VjY2VzcyhjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25FcnJvcihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRmFpbChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkVG9EQihtb2RlbF90eXBlLCBtb2RlbF9pZCwgc3Q9c3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbmQoKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbiIsImltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvbl9zdGF0dXMgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2VEaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc19jbnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gICAgY29ubmVjdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RpbmcgdG8gd2Vic29ja2V0Li4uXCIpO1xyXG4gICAgICAgIHRoaXMud3MgPSBuZXcgU29ja0pTKFwiaHR0cDovL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi93c1wiKTtcclxuICAgICAgICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRPaygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZC5cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtbXCJyZWxvYWRfZGF0YVwiLCBudWxsXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsX3VwZGF0ZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRGYWlsKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jb25uZWN0LmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGFbXCJjbGllbnRfaWRcIl0pIHtcclxuICAgICAgICAgICAgd2luZG93LmNsaWVudF9pZCA9IGRhdGFbXCJjbGllbnRfaWRcIl07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5tZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG1zZ190eXBlID0gZGF0YVswXTtcclxuICAgICAgICAgICAgbGV0IG1zZ19kYXRhID0gZGF0YVsxXTtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKG1zZ190eXBlID09PSBcImZvcmNlX3JlZnJlc2hcIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge30pLmZvckVhY2goKGtleSkgPT4gbGlzdGVuZXJzW2tleV0obXNnX2RhdGEpKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBkYXRhLm1vZGVsX3VwZGF0ZXMuZm9yRWFjaCgobW9kZWxfaW5mbykgPT4ge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSBzdG9yYWdlLnVwZGF0ZU1vZGVsKG1vZGVsX2luZm8ubW9kZWwsIG1vZGVsX2luZm8uaWQsIG1vZGVsX2luZm8uZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChkYXRhX2NoYW5nZWQpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW1wiZGJfdXBkYXRlXCJdIHx8IHt9O1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0TGlzdGVuZXJJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnNfY250Kys7XHJcbiAgICB9XHJcbiAgICBhZGRMaXN0ZW5lcihtc2dfdHlwZXMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5nZXRMaXN0ZW5lcklkKCk7XHJcbiAgICAgICAgbXNnX3R5cGVzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKG1zZ190eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV1baWRdID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcl9pZCkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNba2V5XVtsaXN0ZW5lcl9pZF07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSBuZXcgTWVzc2FnZURpc3BhdGNoZXIoKTtcclxuIiwiY2xhc3MgUmVmIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLm1vZGVsX25hbWUpLmJ5X2lkKHRoaXMuaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBpZCwgbW9kZWxfc3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9fc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX19tb2RlbF9zdG9yYWdlID0gbW9kZWxfc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZEJhY2tSZWYoa2V5LCByZWYpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSByZWY7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoZGF0YSwgY3JlYXRlPXRydWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIgfHwgaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY3JlYXRlICYmIHR5cGVvZiB0aGlzW2lkeC5zbGljZSgxKV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXVxyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgdGhpcy5fX21vZGVsX3N0b3JhZ2UubW9kZWxfbmFtZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWZfa2V5ID0gZGF0YVtpZHhdLmJhY2tfcmVmO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpZHhdLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obmVzdGVkX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhLmRhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWYuZ2V0KCkuYWRkQmFja1JlZihiYWNrX3JlZl9rZXksIGJhY2tfcmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChyZWYpO1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiKlwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lc3RlZF9kYXRhID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbaWR4XSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNbaWR4XSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXJpYWxpemUoc2NoZW1hKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX19rZXlfdHlwZXMpIGlmICh0aGlzLl9fa2V5X3R5cGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9fa2V5X3R5cGVzW2tleV0pIHtcclxuICAgICAgICAgICAgY2FzZSBcIipcIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0ubWFwKGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIl5cIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0uZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LmlkID0gdGhpcy5pZFxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsc1N0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsc1tpZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdID0gbmV3IE1vZGVsKHRoaXMuc3RvcmFnZSwgaWQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxzW2lkXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGJ5X2lkKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2lkXTtcclxuICAgIH1cclxuICAgIGFsbCgpIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubW9kZWxzKTtcclxuICAgICAgICByZXR1cm4ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1trZXldO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzID0ge31cclxuICAgICAgICB0aGlzLmRvbWFpbnMgPSB7fVxyXG4gICAgfVxyXG4gICAgZ2V0RG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kb21haW5zW2RvbWFpbl0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21haW5zW2RvbWFpbl0gPSBuZXcgU3RvcmFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBkZWxEb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZ2V0KG1vZGVsX25hbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9IG5ldyBNb2RlbHNTdG9yYWdlKHRoaXMsIG1vZGVsX25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIGRlbChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICB1cGRhdGVNb2RlbChtb2RlbF90eXBlLCBtb2RlbF9pZCwgZGF0YSkge1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF90eXBlXSkge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIGRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5kb21haW5zKS5mb3JFYWNoKChrZXkpID0+XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZG9tYWluc1trZXldLnVwZGF0ZU1vZGVsKC4uLmFyZ3VtZW50cykgfHwgZGF0YV9jaGFuZ2VkKTtcclxuICAgICAgICAvLyByZXR1cm4gZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpXHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIHN0eWxlPXt7IFwiaGVpZ2h0XCI6IFwiMTAwJVwiLCBcIndpZHRoXCI6IFwiMTAwJVwiIH19Pjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBcInRleHRBbGlnblwiOiBcImNlbnRlclwiIH19PlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy9hamF4LWxvYWRlci5naWZcIiAvPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzTW9jayB7XHJcbiAgICBzZXRPaygpIHt9XHJcbiAgICBzZXRGYWlsKCkge31cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBcImNvbm5lY3RlZFwiOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0aW9uX3N0YXR1c1wiKTtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgPENvbm5lY3Rpb25TdGF0dXMgLz4sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvblN0YXR1c01vY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRPaygpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IHRydWUsIHRpY2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0RmFpbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgb2tcIj48L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3RpbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LWRhbmdlclwiICsgKHRoaXMuc3RhdGUudGljayA/IFwiIHRpY2tcIiA6IFwiXCIpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW9uX3Byb2JsZW1cIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29ubmVjdGlvbl9zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmluaXQoKTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XG4gICAgbGV0IHRpdGxlID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzBdIDogXyhcImdsb2JhbC5tZXNzYWdlcy5lcnJvcl9oZWFkZXJcIik7XG4gICAgbGV0IHRleHQgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMV0gOiBtc2c7XG4gICAgc3dhbCh7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XG4gICAgcmV0dXJuIHN3YWwoe1xuICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxuICAgIH0sIGFjdGlvbik7XG59XG4iXX0=
