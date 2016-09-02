(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectionTester = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require("server/api");

var _message_dispatcher = require("server/message_dispatcher");

var _tablet_components = require("ui/tablet_components");

var _tools = require("common/tools");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConnectionTester = exports.ConnectionTester = function (_React$Component) {
    _inherits(ConnectionTester, _React$Component);

    function ConnectionTester(props) {
        _classCallCheck(this, ConnectionTester);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectionTester).call(this, props));

        _this.state = {
            payload_size: 1000,
            ping_interval: 1000,
            active_pings: {},
            finished_pings: [],
            lastest_latency: 0
        };
        _message_dispatcher.message_dispatcher.addListener("ping_reply", _this.onPingReply.bind(_this));
        _this.resetJob();
        return _this;
    }

    _createClass(ConnectionTester, [{
        key: "resetJob",
        value: function resetJob(interval) {
            if (this.job) {
                clearInterval(this.job);
            }
            this.job = setInterval(this.ping.bind(this), interval || this.state.ping_interval);
        }
    }, {
        key: "ping",
        value: function ping() {
            var ping_id = Math.random().toString();
            var new_state = (0, _tools.clone)(this.state.active_pings);
            new_state[ping_id] = new Date().getTime();
            this.setState({
                active_pings: new_state,
                latest_sent: new Date().getTime()
            });
            (0, _api.Api)("service.ping", { ping_id: ping_id, payload_size: this.state.payload_size }).send();
        }
    }, {
        key: "onPingReply",
        value: function onPingReply(response) {
            var ping_id = response.ping_id;
            if (!this.state.active_pings[ping_id]) {
                return;
            }
            var time = new Date().getTime() - this.state.active_pings[ping_id];
            var active_pings = (0, _tools.clone)(this.state.active_pings);
            var finished_pings = (0, _tools.clone)(this.state.finished_pings);
            finished_pings.push({
                received: new Date().getTime(),
                latency: time
            });
            if (finished_pings.length > 1100) {
                finished_pings = finished_pings.slice(-1000);
            }
            delete active_pings[ping_id];
            this.setState({
                active_pings: active_pings,
                finished_pings: finished_pings
            });
        }
    }, {
        key: "setPayloadSize",
        value: function setPayloadSize(new_size) {
            this.setState({
                payload_size: new_size
            });
        }
    }, {
        key: "setPingInterval",
        value: function setPingInterval(interval) {
            this.setState({
                ping_interval: interval
            });
            this.resetJob(interval);
        }
    }, {
        key: "calcStatistics",
        value: function calcStatistics(source) {
            var arr = source.map(function (p) {
                return parseInt(p.latency);
            });
            arr.sort(function (a, b) {
                return a - b;
            });
            return {
                min: (arr[0] / 1000).toFixed(2),
                max: (arr[arr.length - 1] / 1000).toFixed(2),
                p50: (arr[Math.round((arr.length - 1) * 0.50)] / 1000).toFixed(2),
                p80: (arr[Math.round((arr.length - 1) * 0.80)] / 1000).toFixed(2),
                p95: (arr[Math.round((arr.length - 1) * 0.95)] / 1000).toFixed(2),
                p99: (arr[Math.round((arr.length - 1) * 0.99)] / 1000).toFixed(2)
            };
        }
    }, {
        key: "renderStat",
        value: function renderStat(stat) {
            return React.createElement(
                "div",
                { className: "stat" },
                React.createElement(
                    "div",
                    { className: "title" },
                    "Min:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.min
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "P50:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.p50
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "P80:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.p80
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "P95:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.p95
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "P99:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.p99
                ),
                React.createElement(
                    "div",
                    { className: "title" },
                    "Max:"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    stat.max
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var stat100 = this.calcStatistics(this.state.finished_pings.slice(-100));
            var stat1000 = this.calcStatistics(this.state.finished_pings.slice(-1000));
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        "Connection tester"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "container-fluid" },
                    React.createElement(
                        "div",
                        { className: "row connection-tester" },
                        React.createElement(
                            "div",
                            { className: "col-md-6" },
                            React.createElement(
                                "h3",
                                null,
                                "Payload size"
                            ),
                            React.createElement(_tablet_components.TabletSelectorInput, {
                                choices: [[100, "100 b"], [1000, "1 KB"], [10000, "10 KB"], [100000, "100 KB"], [1000000, "1 MB"]],
                                active: this.state.payload_size,
                                onValueUpdate: this.setPayloadSize.bind(this) }),
                            React.createElement(
                                "h3",
                                null,
                                "Ping interval"
                            ),
                            React.createElement(_tablet_components.TabletSelectorInput, {
                                choices: [[100, "100ms"], [200, "200ms"], [500, "500ms"], [1000, "1s"], [2000, "2s"], [5000, "5s"], [10000, "10s"]],
                                active: this.state.ping_interval,
                                onValueUpdate: this.setPingInterval.bind(this) })
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-6" },
                            React.createElement(
                                "b",
                                null,
                                "Active pings:"
                            ),
                            " ",
                            Object.keys(this.state.active_pings).length,
                            React.createElement("br", null),
                            React.createElement(
                                "h3",
                                null,
                                "Lastest latencies"
                            ),
                            React.createElement(
                                "table",
                                { className: "latency-chart" },
                                React.createElement(
                                    "tbody",
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        this.state.finished_pings.slice(-10).map(function (ping, idx) {
                                            return React.createElement(
                                                "td",
                                                { key: idx, className: "chart-cell" },
                                                React.createElement("div", { className: "bar" + (ping.latency > 2000 ? " red" : ""), style: { height: Math.min(Math.round(ping.latency / 10), 200) + "px" } }),
                                                Math.round(ping.latency / 10) / 100
                                            );
                                        }),
                                        React.createElement("td", null)
                                    )
                                )
                            ),
                            React.createElement(
                                "h3",
                                null,
                                "Statistics out of 100:"
                            ),
                            this.renderStat(stat100),
                            React.createElement(
                                "h3",
                                null,
                                "Statistics out of 1000:"
                            ),
                            this.renderStat(stat1000)
                        )
                    )
                )
            );
        }
    }]);

    return ConnectionTester;
}(React.Component);

},{"common/tools":2,"server/api":6,"server/message_dispatcher":7,"ui/tablet_components":11}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(CmpChainImpl, [{
        key: "cmp",
        value: function cmp(a, b) {
            if (this.result === 0) {
                if (a < b) {
                    this.result = -1;
                } else if (a > b) {
                    this.result = 1;
                }
            }
            return this;
        }
    }, {
        key: "end",
        value: function end() {
            return this.result;
        }
    }]);

    return CmpChainImpl;
}();

var CmpChain = exports.CmpChain = function CmpChain() {
    return new CmpChainImpl();
};

},{}],3:[function(require,module,exports){
"use strict";

var _main = require("clients/connection_tester/main");

ReactDOM.render(React.createElement(_main.ConnectionTester, window.page_props), window.document.getElementById("content"));

},{"clients/connection_tester/main":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
                            " (закрытая версия для ограниченного использования) — система для подсчета результатов соревнований по акробатическому рок-н-роллу."
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
                "switch_to_plan": "Сортировка по программе",
                "switch_to_disciplines": "Сортировка по дисциплинам",
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
                "clubs_shown": "Информация только по следующим клубам:",
                "clubs_summary": "Сводка по клубам",
                "competition_info": "Информация о турнире",
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
                "clubs": "Клубы",
                "competition_date": "Дата проведения",
                "competition_name": "Наименование соревнования",
                "discipline": "Дисциплина",
                "discipline_judges": "Распределение судей по дисциплинам",
                "disciplines": "Дисциплины",
                "group_by_clubs": "Группировать по клубам",
                "include_acrobatics": "Включить акробатику",
                "include_clubs": "Включить данные о клубах",
                "include_discipline_judges": "Включить распределение судей по дисциплинам",
                "include_extended_info": "Включить расширенную информацию",
                "include_formation_sportsmen": "Включить состав формейшнов",
                "include_judges": "Включить данные о судьях",
                "judges": "Судьи",
                "no_files_selected": "Выберите файл...",
                "participants": "Участники",
                "paste_acro": "Вставьте данные из калькулятора акробатики",
                "plan": "Программа турнира",
                "show_sportsmen_only": "Показывать только спортсменов",
                "show_summary": "Показывать только количество",
                "sub": "зап", // substitute
                "tours": "Туры"
            },
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
                },
                "invalid_discipline_found": "Программа соревнований содержит туры, отсутствующие в системе"
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
                "plan": "Программа",
                "results": "Результаты"
            },
            "labels": {
                "discipline": "Дисциплина",
                "estimated_beginning": "Начало",
                "estimated_duration": "Длит.",
                "no_active_tour": "Нет активного тура",
                "place": "место",
                "tour": "Тур"
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

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Api = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _storage = require("server/storage");

var _dialogs = require("ui/dialogs");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiImpl = function () {
    function ApiImpl(method, data) {
        _classCallCheck(this, ApiImpl);

        this.method = method;
        this.data = data;
        this.cb_success = function () {};
        this.cb_error = function (msg, code, args) {
            return (0, _dialogs.showError)(code ? _loader._.apply(undefined, [code].concat(_toConsumableArray(args))) : msg);
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

    _createClass(ApiImpl, [{
        key: "onDone",
        value: function onDone(callback) {
            this.cb_done = callback;
            return this;
        }
    }, {
        key: "onSuccess",
        value: function onSuccess(callback) {
            this.cb_success = callback;
            return this;
        }
    }, {
        key: "onError",
        value: function onError(callback) {
            this.cb_error = callback;
            return this;
        }
    }, {
        key: "onFail",
        value: function onFail(callback) {
            this.cb_fail = callback;
            return this;
        }
    }, {
        key: "addToDB",
        value: function addToDB(model_type, model_id) {
            var st = arguments.length <= 2 || arguments[2] === undefined ? _storage.storage : arguments[2];

            this.update_db = function (response) {
                st.get(model_type).add(model_id, response);
            };
            return this;
        }
    }, {
        key: "send",
        value: function send() {
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
                if (response === null) {
                    _this.cb_fail();
                } else if (response.success) {
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
        }
    }]);

    return ApiImpl;
}();

var Api = exports.Api = function Api() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return new (Function.prototype.bind.apply(ApiImpl, [null].concat(args)))();
};
exports.default = Api;

},{"l10n/loader":4,"server/storage":8,"ui/dialogs":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.message_dispatcher = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(MessageDispatcher, [{
        key: "connect",
        value: function connect() {
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
        }
    }, {
        key: "onMessage",
        value: function onMessage(message) {
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
        }
    }, {
        key: "getListenerId",
        value: function getListenerId() {
            return this.listeners_cnt++;
        }
    }, {
        key: "addListener",
        value: function addListener(msg_types, callback) {
            var id = this.getListenerId();
            msg_types.split(" ").forEach(function (msg_type) {
                if (!this.listeners[msg_type]) {
                    this.listeners[msg_type] = {};
                }
                this.listeners[msg_type][id] = callback;
            }.bind(this));
            return id;
        }
    }, {
        key: "removeListener",
        value: function removeListener(listener_id) {
            Object.keys(this.listeners).forEach(function (key) {
                delete this.listeners[key][listener_id];
            }.bind(this));
        }
    }]);

    return MessageDispatcher;
}();

if (!window.message_dispatcher) {
    window.message_dispatcher = new MessageDispatcher();
}
var message_dispatcher = exports.message_dispatcher = window.message_dispatcher;

},{"server/storage":8,"ui/components":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ref = function () {
    function Ref(storage, model_name, id) {
        _classCallCheck(this, Ref);

        this.model_name = model_name;
        this.id = id;
        this.storage = storage;
    }

    _createClass(Ref, [{
        key: "get",
        value: function get() {
            return this.storage.get(this.model_name).by_id(this.id);
        }
    }]);

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

    _createClass(Model, [{
        key: "addBackRef",
        value: function addBackRef(key, ref) {
            this[key] = ref;
            this.__key_types[key] = "^";
        }
    }, {
        key: "update",
        value: function update(data) {
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
        }
    }, {
        key: "serialize",
        value: function serialize(schema) {
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
        }
    }]);

    return Model;
}();

var ModelsStorage = function () {
    function ModelsStorage(storage, model_name) {
        _classCallCheck(this, ModelsStorage);

        this.model_name = model_name;
        this.models = {};
        this.storage = storage;
    }

    _createClass(ModelsStorage, [{
        key: "add",
        value: function add(id, data) {
            if (typeof this.models[id] === "undefined") {
                this.models[id] = new Model(this.storage, id, this);
            }
            this.models[id].update(data);
        }
    }, {
        key: "update",
        value: function update(id, data) {
            if (this.models[id]) {
                this.models[id].update(data, false);
                return true;
            }
            return false;
        }
    }, {
        key: "by_id",
        value: function by_id(id) {
            return this.models[id];
        }
    }, {
        key: "all",
        value: function all() {
            var keys = Object.getOwnPropertyNames(this.models);
            return keys.map(function (key) {
                return this.models[key];
            }.bind(this));
        }
    }]);

    return ModelsStorage;
}();

var Storage = function () {
    function Storage() {
        _classCallCheck(this, Storage);

        this.model_storages = {};
        this.domains = {};
    }

    _createClass(Storage, [{
        key: "getDomain",
        value: function getDomain(domain) {
            if (typeof this.domains[domain] === "undefined") {
                this.domains[domain] = new Storage();
            }
            return this.domains[domain];
        }
    }, {
        key: "delDomain",
        value: function delDomain(domain) {
            delete this.domains[domain];
        }
    }, {
        key: "get",
        value: function get(model_name) {
            if (typeof this.model_storages[model_name] === "undefined") {
                this.model_storages[model_name] = new ModelsStorage(this, model_name);
            }
            return this.model_storages[model_name];
        }
    }, {
        key: "del",
        value: function del(model_name) {
            delete this.model_storages[model_name];
        }
    }, {
        key: "updateModel",
        value: function updateModel(model_type, model_id, data) {
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
        }
    }]);

    return Storage;
}();

var storage = exports.storage = new Storage();

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connection_status = exports.Loader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = exports.Loader = function (_React$Component) {
    _inherits(Loader, _React$Component);

    function Loader() {
        _classCallCheck(this, Loader);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Loader).apply(this, arguments));
    }

    _createClass(Loader, [{
        key: "render",
        value: function render() {
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
        }
    }]);

    return Loader;
}(React.Component);

var ConnectionStatusMock = function () {
    function ConnectionStatusMock() {
        _classCallCheck(this, ConnectionStatusMock);
    }

    _createClass(ConnectionStatusMock, [{
        key: "setOk",
        value: function setOk() {}
    }, {
        key: "setFail",
        value: function setFail() {}
    }]);

    return ConnectionStatusMock;
}();

var ConnectionStatus = function (_React$Component2) {
    _inherits(ConnectionStatus, _React$Component2);

    function ConnectionStatus(props) {
        _classCallCheck(this, ConnectionStatus);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectionStatus).call(this, props));

        _this2.state = {
            "connected": null
        };
        return _this2;
    }

    _createClass(ConnectionStatus, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.stopInterval();
        }
    }, {
        key: "startInterval",
        value: function startInterval() {
            var _this3 = this;

            if (this.interval) {
                return;
            }
            this.interval = setInterval(function () {
                _this3.setState({
                    tick: !_this3.state.tick
                });
            }, 750);
        }
    }, {
        key: "stopInterval",
        value: function stopInterval() {
            if (!this.interval) {
                return;
            }
            clearInterval(this.interval);
            this.interval = null;
        }
    }, {
        key: "setOk",
        value: function setOk() {
            this.stopInterval();
            this.setState({ connected: true, tick: false });
        }
    }, {
        key: "setFail",
        value: function setFail() {
            this.startInterval();
            this.setState({ connected: false });
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }], [{
        key: "init",
        value: function init() {
            var element = window.document.getElementById("connection_status");
            if (element && !element.hasChildNodes()) {
                return ReactDOM.render(React.createElement(ConnectionStatus, null), element);
            }
            return new ConnectionStatusMock();
        }
    }]);

    return ConnectionStatus;
}(React.Component);

var connection_status = exports.connection_status = ConnectionStatus.init();

},{"l10n/loader":4}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.showError = showError;
exports.showConfirm = showConfirm;

var _loader = require("l10n/loader");

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

},{"l10n/loader":4}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StopWatch = exports.TabletAcroOverrideInput = exports.TabletIntegerInput = exports.TabletPoint5SelectInput = exports.TabletIntegerSelectInput = exports.TabletSelectorInput = exports.Slider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.onTouchOrClick = onTouchOrClick;
exports.onTouchEndOrClick = onTouchEndOrClick;

var _loader = require("l10n/loader");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function onTouchOrClick(handler) {
    var f = function f(event) {
        event.preventDefault();
        return handler(event);
    };
    return {
        onTouchStart: f,
        onClick: f
    };
}

function onTouchEndOrClick(handler, prevent_default) {
    var _handler = function _handler() {};
    var distance = 0;
    var latest_pos = [0, 0];
    var fire = function fire(event) {
        event.preventDefault();
        return _handler();
    };
    var discard = function discard() {
        _handler = function _handler() {};
    };
    var move = function move(event) {
        var current_pos = [event.touches[0].pageX, event.touches[0].pageY];
        var sqr = function sqr(x) {
            return x * x;
        };
        distance += Math.sqrt(sqr(current_pos[0] - latest_pos[0]) + sqr(current_pos[1] - latest_pos[1]));
        latest_pos = current_pos;
        if (distance > 20) {
            discard();
        }
    };
    var start = function start(event) {
        _handler = handler;
        distance = 0;
        latest_pos = [event.touches[0].pageX, event.touches[0].pageY];
    };
    return {
        onTouchStart: start,
        onTouchEnd: fire,
        onTouchMove: move,
        onTouchCancel: discard,
        onClick: handler
    };
}

var Slider = exports.Slider = function (_React$Component) {
    _inherits(Slider, _React$Component);

    _createClass(Slider, null, [{
        key: "propTypes",
        get: function get() {
            return {
                done: React.PropTypes.bool,
                doneText: React.PropTypes.string,
                slideText: React.PropTypes.string,
                onActivate: React.PropTypes.func
            };
        }
    }]);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

        _this.onClick = function (event) {
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.setState({
                posision: 200,
                touch: false,
                finished: true
            });
            _this.props.onActivate();
        };

        _this.onTouchStart = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.pin = _this.getRelativeTouch(event);
            _this.setState({
                position: _this.getSliderPos(event),
                touch: true
            });
        };

        _this.onTouchMove = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.setState({
                position: _this.getSliderPos(event)
            });
        };

        _this.onTouchEnd = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            if (_this.state.position === 200) {
                _this.setState({
                    position: 0,
                    finished: true,
                    touch: false
                });
                _this.props.onActivate();
            } else {
                _this.setState({
                    position: 0,
                    touch: false
                });
            }
        };

        _this.state = {
            position: 0,
            touch: false,
            finished: false
        };
        _this.pin = null;
        return _this;
    }

    _createClass(Slider, [{
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps) {
            if (!this.props.done && nextProps.done) {
                this.setState({
                    finished: false
                });
            }
        }
    }, {
        key: "isFree",
        value: function isFree() {
            return !this.state.touch && !this.props.done && !this.state.finished;
        }
    }, {
        key: "getOuterTextOpacity",
        value: function getOuterTextOpacity() {
            if (this.state.finished) {
                return 0;
            }
            var value = Math.min(Math.max(100 - this.state.position, 0), 100);
            return (value / 100).toFixed(3);
        }
    }, {
        key: "getElementOffset",
        value: function getElementOffset(element) {
            var res = 0;
            while (element) {
                res += element.offsetLeft || 0;
                element = element.parentNode;
            }
            return res;
        }
    }, {
        key: "getTouch",
        value: function getTouch(event) {
            var touch = event.touches[0];
            var parent = event.target.parentNode;
            return touch.pageX - this.getElementOffset(parent);
        }
    }, {
        key: "getRelativeTouch",
        value: function getRelativeTouch(event) {
            var touch = event.touches[0];
            var parent = event.target;
            return touch.pageX - this.getElementOffset(parent);
        }
    }, {
        key: "getSliderPos",
        value: function getSliderPos(event) {
            var pos = this.getTouch(event) - this.pin;
            return Math.min(Math.max(pos, 0), 200);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "slider noselect" },
                React.createElement(
                    "div",
                    { className: "inner" + (this.isFree() ? " free" : ""),
                        style: { left: this.props.done || this.state.finished ? "200px" : this.state.position + "px" },
                        onTouchStart: this.onTouchStart,
                        onTouchMove: this.onTouchMove,
                        onTouchEnd: this.onTouchEnd,
                        onClick: this.onClick
                    },
                    "→"
                ),
                this.props.done ? React.createElement(
                    "span",
                    {
                        style: { color: "rgb(100,100,100)" },
                        className: "done-text"
                    },
                    this.props.doneText
                ) : React.createElement(
                    "span",
                    {
                        style: { color: "rgba(100,100,100," + this.getOuterTextOpacity() + ")" },
                        className: "slide-text" + (this.isFree() ? " free" : "")
                    },
                    this.props.slideText
                )
            );
        }
    }]);

    return Slider;
}(React.Component);

var TabletSelectorInput = exports.TabletSelectorInput = function (_React$Component2) {
    _inherits(TabletSelectorInput, _React$Component2);

    function TabletSelectorInput() {
        _classCallCheck(this, TabletSelectorInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletSelectorInput).apply(this, arguments));
    }

    _createClass(TabletSelectorInput, [{
        key: "getButtonsCount",
        value: function getButtonsCount() {
            if (this.props.style === "grid") {
                return this.props.rowSize;
            }
            return this.props.choices.length;
        }
    }, {
        key: "onClick",
        value: function onClick(n) {
            this.props.onValueUpdate(n);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var result = [];
            this.props.choices.forEach(function (el, idx) {
                var key = el[0];
                var text = el[1];
                var active_class_name = _this3.props.value === key ? " active" : "";
                result.push(React.createElement(
                    "button",
                    _extends({
                        key: key
                    }, onTouchOrClick(_this3.onClick.bind(_this3, key)), {
                        className: "tbtn score-btn" + active_class_name
                    }),
                    text
                ));
                if (_this3.props.style === "grid" && (idx + 1) % _this3.props.rowSize === 0) {
                    result.push(React.createElement("br", { key: "br" + idx }));
                }
            });
            var layout_class = this.props.style !== "two-lines" ? "selector-layout" : "selector-layout-2rows";
            var selected_class = this.props.value === null ? "" : " selected";
            return React.createElement(
                "div",
                { className: "scoring-layout " + layout_class + selected_class + " n-" + this.getButtonsCount().toString() },
                result
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                style: React.PropTypes.string,
                choices: React.PropTypes.array.isRequired,
                rowSize: React.PropTypes.number,
                active: React.PropTypes.number,
                onValueUpdate: React.PropTypes.func.isRequired
            };
        }
    }]);

    return TabletSelectorInput;
}(React.Component);

var TabletIntegerSelectInput = exports.TabletIntegerSelectInput = function (_React$Component3) {
    _inherits(TabletIntegerSelectInput, _React$Component3);

    function TabletIntegerSelectInput() {
        _classCallCheck(this, TabletIntegerSelectInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletIntegerSelectInput).apply(this, arguments));
    }

    _createClass(TabletIntegerSelectInput, [{
        key: "createArray",
        value: function createArray(min, max) {
            var result = [];
            for (var idx = min; idx <= max; ++idx) {
                result.push([idx, idx.toString()]);
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(TabletSelectorInput, _extends({
                choices: this.createArray(this.props.min, this.props.max)
            }, this.props));
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                min: React.PropTypes.number.isRequired,
                max: React.PropTypes.number.isRequired
            };
        }
    }]);

    return TabletIntegerSelectInput;
}(React.Component);

var TabletPoint5SelectInput = exports.TabletPoint5SelectInput = function (_React$Component4) {
    _inherits(TabletPoint5SelectInput, _React$Component4);

    function TabletPoint5SelectInput() {
        _classCallCheck(this, TabletPoint5SelectInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletPoint5SelectInput).apply(this, arguments));
    }

    _createClass(TabletPoint5SelectInput, [{
        key: "createArray",
        value: function createArray(min, max) {
            var result = [];
            for (var idx = Math.round(2 * min); idx <= Math.round(2 * max); ++idx) {
                result.push([idx / 2, idx % 2 ? (idx / 2).toFixed(1) : Math.floor(idx / 2).toString()]);
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(TabletSelectorInput, _extends({
                choices: this.createArray(this.props.min, this.props.max)
            }, this.props));
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                min: React.PropTypes.number.isRequired,
                max: React.PropTypes.number.isRequired
            };
        }
    }]);

    return TabletPoint5SelectInput;
}(React.Component);

var TabletIntegerInput = exports.TabletIntegerInput = function (_React$Component5) {
    _inherits(TabletIntegerInput, _React$Component5);

    function TabletIntegerInput() {
        _classCallCheck(this, TabletIntegerInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletIntegerInput).apply(this, arguments));
    }

    _createClass(TabletIntegerInput, [{
        key: "onMinus",
        value: function onMinus() {
            if (this.props.sendDeltas) {
                this.props.onValueUpdate({ "delta": -1 });
            } else {
                this.props.onValueUpdate(this.props.value - 1);
            }
        }
    }, {
        key: "onPlus",
        value: function onPlus() {
            if (this.props.sendDeltas) {
                this.props.onValueUpdate({ "delta": 1 });
            } else {
                this.props.onValueUpdate(this.props.value + 1);
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "tablet-integer-input" },
                React.createElement(
                    "button",
                    _extends({
                        className: "tbtn btn-minus"
                    }, onTouchOrClick(this.onMinus.bind(this))),
                    "−"
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    this.props.value
                ),
                React.createElement(
                    "button",
                    _extends({
                        className: "tbtn btn-plus"
                    }, onTouchOrClick(this.onPlus.bind(this))),
                    "+"
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                value: React.PropTypes.number.isRequired,
                onValueUpdate: React.PropTypes.func.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                sendDeltas: false
            };
        }
    }]);

    return TabletIntegerInput;
}(React.Component);

var TabletAcroOverrideInput = exports.TabletAcroOverrideInput = function (_React$Component6) {
    _inherits(TabletAcroOverrideInput, _React$Component6);

    function TabletAcroOverrideInput() {
        var _Object$getPrototypeO;

        var _temp, _this7, _ret;

        _classCallCheck(this, TabletAcroOverrideInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this7 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TabletAcroOverrideInput)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this7), _this7.onMinus = function () {
            if (_this7.props.send_deltas) {
                _this7.props.onValueUpdate({ "delta": -0.5 });
            } else {
                _this7.props.onValueUpdate(Math.max(_this7.props.value - 0.5, 0));
            }
        }, _this7.onPlus = function () {
            if (_this7.props.send_deltas) {
                _this7.props.onValueUpdate({ "delta": 0.5 });
            } else {
                _this7.props.onValueUpdate(Math.min(_this7.props.value + 0.5, _this7.props.original_value));
            }
        }, _this7.onZero = function () {
            _this7.props.onValueUpdate(0);
        }, _this7.onRestore = function () {
            _this7.props.onValueUpdate(_this7.props.original_value);
        }, _temp), _possibleConstructorReturn(_this7, _ret);
    }

    _createClass(TabletAcroOverrideInput, [{
        key: "render",
        value: function render() {
            var value_changed = Math.abs(this.props.value - this.props.original_value);
            return React.createElement(
                "div",
                { className: "tablet-acro-override-input" },
                React.createElement(
                    "div",
                    { className: "buttons" },
                    React.createElement(
                        "button",
                        _extends({
                            className: "tbtn btn-zero",
                            disabled: this.props.value < 0.05
                        }, onTouchOrClick(this.onZero)),
                        "↓0"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "tbtn btn-restore",
                            disabled: value_changed < 0.05
                        }, onTouchOrClick(this.onRestore)),
                        "↑"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "tbtn btn-minus",
                            disabled: this.props.value < 0.05
                        }, onTouchOrClick(this.onMinus)),
                        "−"
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "tbtn btn-plus",
                            disabled: this.props.original_value < this.props.value + 0.05
                        }, onTouchOrClick(this.onPlus)),
                        "+"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "value" },
                    value_changed ? this.props.original_value.toFixed(1) + " → " + this.props.value.toFixed(1) : this.props.value.toFixed(1)
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                value: React.PropTypes.number.isRequired,
                original_value: React.PropTypes.number.isRequired,
                send_deltas: React.PropTypes.bool,
                onValueUpdate: React.PropTypes.func.isRequired
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                send_deltas: false
            };
        }
    }]);

    return TabletAcroOverrideInput;
}(React.Component);

var stopwatches = {};

var StopWatch = exports.StopWatch = function (_React$Component7) {
    _inherits(StopWatch, _React$Component7);

    _createClass(StopWatch, null, [{
        key: "propTypes",
        get: function get() {
            return {
                score_id: React.PropTypes.number
            };
        }
    }]);

    function StopWatch(props) {
        _classCallCheck(this, StopWatch);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(StopWatch).call(this, props));

        _this8.state = stopwatches[_this8.props.score_id] || {
            active: false,
            value: 0,
            str_value: "0:00",
            interval: null
        };
        if (_this8.state.active) {
            _this8.state.interval = setInterval(_this8.tick.bind(_this8), 10); // eslint-disable-line react/no-direct-mutation-state
        }
        return _this8;
    }

    _createClass(StopWatch, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.state.interval);
            stopwatches[this.props.score_id] = this.state;
        }
    }, {
        key: "now",
        value: function now() {
            return new Date().getTime();
        }
    }, {
        key: "toggle",
        value: function toggle() {
            this.state.active ? this.stop() : this.start();
        }
    }, {
        key: "start",
        value: function start() {
            this.setState({
                active: true,
                start_at: this.now() - this.state.value,
                interval: setInterval(this.tick.bind(this), 10)
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            clearInterval(this.state.interval);
            this.setState({
                active: false,
                value: this.value()
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            clearInterval(this.state.interval);
            this.setState({
                active: false,
                value: 0
            });
        }
    }, {
        key: "value",
        value: function value() {
            return this.state.active ? this.now() - this.state.start_at : this.state.value;
        }
    }, {
        key: "tick",
        value: function tick() {
            var new_value = this.value();
            if (new_value !== this.state.value) {
                this.setState({
                    value: this.value()
                });
            }
        }
    }, {
        key: "pad",
        value: function pad(num, size) {
            var s = "0000" + num.toString();
            return s.substr(s.length - size);
        }
    }, {
        key: "getStrValue",
        value: function getStrValue() {
            var val = this.value();
            var m = 0,
                s = 0;
            var result = '';
            m = Math.floor(val / (60 * 1000));
            val %= 60 * 1000;
            s = Math.floor(val / 1000);
            return m.toString() + ':' + this.pad(s, 2);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "stopwatch" },
                React.createElement(
                    "button",
                    _extends({
                        className: "tbtn btn-reset ignore-readonly"
                    }, onTouchOrClick(this.reset.bind(this))),
                    (0, _loader._)("tablet.buttons.reset_stopwatch")
                ),
                React.createElement(
                    "button",
                    _extends({
                        className: "tbtn btn-toggle ignore-readonly" + (this.state.active ? " active" : "")
                    }, onTouchOrClick(this.toggle.bind(this))),
                    this.state.active ? (0, _loader._)("tablet.buttons.stop_stopwatch") : (0, _loader._)("tablet.buttons.start_stopwatch")
                ),
                React.createElement(
                    "div",
                    { className: "time" },
                    this.getStrValue()
                )
            );
        }
    }]);

    return StopWatch;
}(React.Component);

},{"l10n/loader":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcY2xpZW50c1xcY29ubmVjdGlvbl90ZXN0ZXJcXG1haW4uanN4Iiwic3JjXFxqc3hcXGNvbW1vblxcdG9vbHMuanN4Iiwic3JjXFxqc3hcXGNvbm5lY3Rpb25fdGVzdGVyLmpzeCIsInNyY1xcanN4XFxsMTBuXFxsb2FkZXIuanN4Iiwic3JjXFxqc3hcXGwxMG5cXHJ1LmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCIsInNyY1xcanN4XFx1aVxcdGFibGV0X2NvbXBvbmVudHMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNNYTs7O0FBQ1QsYUFEUyxnQkFDVCxDQUFZLEtBQVosRUFBbUI7OEJBRFYsa0JBQ1U7OzJFQURWLDZCQUVDLFFBRFM7O0FBRWYsY0FBSyxLQUFMLEdBQWE7QUFDVCwwQkFBYyxJQUFkO0FBQ0EsMkJBQWUsSUFBZjtBQUNBLDBCQUFjLEVBQWQ7QUFDQSw0QkFBZ0IsRUFBaEI7QUFDQSw2QkFBaUIsQ0FBakI7U0FMSixDQUZlO0FBU2YsK0NBQW1CLFdBQW5CLENBQStCLFlBQS9CLEVBQTZDLE1BQUssV0FBTCxDQUFpQixJQUFqQixPQUE3QyxFQVRlO0FBVWYsY0FBSyxRQUFMLEdBVmU7O0tBQW5COztpQkFEUzs7aUNBYUEsVUFBVTtBQUNmLGdCQUFJLEtBQUssR0FBTCxFQUFVO0FBQ1YsOEJBQWMsS0FBSyxHQUFMLENBQWQsQ0FEVTthQUFkO0FBR0EsaUJBQUssR0FBTCxHQUFXLFlBQVksS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWYs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KHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBUYWJsZXRTZWxlY3RvcklucHV0IH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBjbG9uZSB9IGZyb20gXCJjb21tb24vdG9vbHNcIjtcblxuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvblRlc3RlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcGF5bG9hZF9zaXplOiAxMDAwLFxuICAgICAgICAgICAgcGluZ19pbnRlcnZhbDogMTAwMCxcbiAgICAgICAgICAgIGFjdGl2ZV9waW5nczoge30sXG4gICAgICAgICAgICBmaW5pc2hlZF9waW5nczogW10sXG4gICAgICAgICAgICBsYXN0ZXN0X2xhdGVuY3k6IDAsXG4gICAgICAgIH07XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInBpbmdfcmVwbHlcIiwgdGhpcy5vblBpbmdSZXBseS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXNldEpvYigpO1xuICAgIH1cbiAgICByZXNldEpvYihpbnRlcnZhbCkge1xuICAgICAgICBpZiAodGhpcy5qb2IpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5qb2IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuam9iID0gc2V0SW50ZXJ2YWwodGhpcy5waW5nLmJpbmQodGhpcyksIGludGVydmFsIHx8IHRoaXMuc3RhdGUucGluZ19pbnRlcnZhbCk7XG4gICAgfVxuICAgIHBpbmcoKSB7XG4gICAgICAgIGxldCBwaW5nX2lkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgbmV3X3N0YXRlID0gY2xvbmUodGhpcy5zdGF0ZS5hY3RpdmVfcGluZ3MpO1xuICAgICAgICBuZXdfc3RhdGVbcGluZ19pZF0gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmVfcGluZ3M6IG5ld19zdGF0ZSxcbiAgICAgICAgICAgIGxhdGVzdF9zZW50OiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIEFwaShcInNlcnZpY2UucGluZ1wiLCB7IHBpbmdfaWQ6IHBpbmdfaWQsIHBheWxvYWRfc2l6ZTogdGhpcy5zdGF0ZS5wYXlsb2FkX3NpemUgfSkuc2VuZCgpO1xuICAgIH1cbiAgICBvblBpbmdSZXBseShyZXNwb25zZSkge1xuICAgICAgICBsZXQgcGluZ19pZCA9IHJlc3BvbnNlLnBpbmdfaWQ7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5hY3RpdmVfcGluZ3NbcGluZ19pZF0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5zdGF0ZS5hY3RpdmVfcGluZ3NbcGluZ19pZF07XG4gICAgICAgIGxldCBhY3RpdmVfcGluZ3MgPSBjbG9uZSh0aGlzLnN0YXRlLmFjdGl2ZV9waW5ncyk7XG4gICAgICAgIGxldCBmaW5pc2hlZF9waW5ncyA9IGNsb25lKHRoaXMuc3RhdGUuZmluaXNoZWRfcGluZ3MpO1xuICAgICAgICBmaW5pc2hlZF9waW5ncy5wdXNoKHtcbiAgICAgICAgICAgIHJlY2VpdmVkOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIGxhdGVuY3k6IHRpbWUsXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChmaW5pc2hlZF9waW5ncy5sZW5ndGggPiAxMTAwKSB7XG4gICAgICAgICAgICBmaW5pc2hlZF9waW5ncyA9IGZpbmlzaGVkX3BpbmdzLnNsaWNlKC0xMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgYWN0aXZlX3BpbmdzW3BpbmdfaWRdO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZV9waW5nczogYWN0aXZlX3BpbmdzLFxuICAgICAgICAgICAgZmluaXNoZWRfcGluZ3M6IGZpbmlzaGVkX3BpbmdzLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0UGF5bG9hZFNpemUobmV3X3NpemUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwYXlsb2FkX3NpemU6IG5ld19zaXplLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0UGluZ0ludGVydmFsKGludGVydmFsKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcGluZ19pbnRlcnZhbDogaW50ZXJ2YWwsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlc2V0Sm9iKGludGVydmFsKTtcbiAgICB9XG4gICAgY2FsY1N0YXRpc3RpY3Moc291cmNlKSB7XG4gICAgICAgIGxldCBhcnIgPSBzb3VyY2UubWFwKChwKSA9PiBwYXJzZUludChwLmxhdGVuY3kpKTtcbiAgICAgICAgYXJyLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pbjogKGFyclswXSAvIDEwMDApLnRvRml4ZWQoMiksXG4gICAgICAgICAgICBtYXg6IChhcnJbYXJyLmxlbmd0aCAtIDFdIC8gMTAwMCkudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHA1MDogKGFycltNYXRoLnJvdW5kKChhcnIubGVuZ3RoIC0gMSkgKiAwLjUwKV0gLyAxMDAwKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgcDgwOiAoYXJyW01hdGgucm91bmQoKGFyci5sZW5ndGggLSAxKSAqIDAuODApXSAvIDEwMDApLnRvRml4ZWQoMiksXG4gICAgICAgICAgICBwOTU6IChhcnJbTWF0aC5yb3VuZCgoYXJyLmxlbmd0aCAtIDEpICogMC45NSldIC8gMTAwMCkudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHA5OTogKGFycltNYXRoLnJvdW5kKChhcnIubGVuZ3RoIC0gMSkgKiAwLjk5KV0gLyAxMDAwKS50b0ZpeGVkKDIpLFxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlclN0YXQoc3RhdCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzdGF0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+TWluOjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPnsgc3RhdC5taW4gfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlA1MDo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj57IHN0YXQucDUwIH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5QODA6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+eyBzdGF0LnA4MCB9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+UDk1OjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPnsgc3RhdC5wOTUgfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlA5OTo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj57IHN0YXQucDk5IH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5NYXg6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+eyBzdGF0Lm1heCB9PC9kaXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgc3RhdDEwMCA9IHRoaXMuY2FsY1N0YXRpc3RpY3ModGhpcy5zdGF0ZS5maW5pc2hlZF9waW5ncy5zbGljZSgtMTAwKSk7XG4gICAgICAgIGxldCBzdGF0MTAwMCA9IHRoaXMuY2FsY1N0YXRpc3RpY3ModGhpcy5zdGF0ZS5maW5pc2hlZF9waW5ncy5zbGljZSgtMTAwMCkpO1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgPGgxPkNvbm5lY3Rpb24gdGVzdGVyPC9oMT5cbiAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBjb25uZWN0aW9uLXRlc3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+UGF5bG9hZCBzaXplPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IFtbMTAwLCBcIjEwMCBiXCJdLCBbMTAwMCwgXCIxIEtCXCJdLCBbMTAwMDAsIFwiMTAgS0JcIl0sIFsxMDAwMDAsIFwiMTAwIEtCXCJdLCBbMTAwMDAwMCwgXCIxIE1CXCJdXSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlPXsgdGhpcy5zdGF0ZS5wYXlsb2FkX3NpemUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLnNldFBheWxvYWRTaXplLmJpbmQodGhpcykgfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlBpbmcgaW50ZXJ2YWw8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9pY2VzPXsgW1sxMDAsIFwiMTAwbXNcIl0sIFsyMDAsIFwiMjAwbXNcIl0sIFs1MDAsIFwiNTAwbXNcIl0sIFsxMDAwLCBcIjFzXCJdLCBbMjAwMCwgXCIyc1wiXSwgWzUwMDAsIFwiNXNcIl0sIFsxMDAwMCwgXCIxMHNcIl1dIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmU9eyB0aGlzLnN0YXRlLnBpbmdfaW50ZXJ2YWwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLnNldFBpbmdJbnRlcnZhbC5iaW5kKHRoaXMpIH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxiPkFjdGl2ZSBwaW5nczo8L2I+IHsgT2JqZWN0LmtleXModGhpcy5zdGF0ZS5hY3RpdmVfcGluZ3MpLmxlbmd0aCB9PGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+TGFzdGVzdCBsYXRlbmNpZXM8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImxhdGVuY3ktY2hhcnRcIj48dGJvZHk+PHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5maW5pc2hlZF9waW5ncy5zbGljZSgtMTApLm1hcCgocGluZywgaWR4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQga2V5PXsgaWR4IH0gY2xhc3NOYW1lPVwiY2hhcnQtY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImJhclwiICsgKHBpbmcubGF0ZW5jeSA+IDIwMDAgPyBcIiByZWRcIiA6IFwiXCIpIH0gc3R5bGU9e3sgaGVpZ2h0OiBNYXRoLm1pbihNYXRoLnJvdW5kKHBpbmcubGF0ZW5jeSAvIDEwKSwgMjAwKSArIFwicHhcIiB9fT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgTWF0aC5yb3VuZChwaW5nLmxhdGVuY3kgLyAxMCkgLyAxMDAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+U3RhdGlzdGljcyBvdXQgb2YgMTAwOjwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU3RhdChzdGF0MTAwKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+U3RhdGlzdGljcyBvdXQgb2YgMTAwMDo8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclN0YXQoc3RhdDEwMDApIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuY2xhc3MgQ21wQ2hhaW5JbXBsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSAwO1xuICAgIH1cbiAgICBjbXAoYSwgYikge1xuICAgICAgICBpZiAodGhpcy5yZXN1bHQgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGEgPiBiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCB2YXIgQ21wQ2hhaW4gPSAoKSA9PiBuZXcgQ21wQ2hhaW5JbXBsKCk7XG4iLCJpbXBvcnQgeyBDb25uZWN0aW9uVGVzdGVyIH0gZnJvbSBcImNsaWVudHMvY29ubmVjdGlvbl90ZXN0ZXIvbWFpblwiO1xuXG5cblJlYWN0RE9NLnJlbmRlcihcbiAgICA8Q29ubmVjdGlvblRlc3RlciB7IC4uLndpbmRvdy5wYWdlX3Byb3BzIH0gLz4sXG4gICAgd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKVxuKTtcbiIsImltcG9ydCB7IHRyYW5zbGF0ZSwgZ2V0UG9zc2libGVUb3VyTmFtZXMgfSBmcm9tIFwiLi9ydVwiO1xyXG5cclxuZXhwb3J0IHZhciBfID0gdHJhbnNsYXRlO1xyXG5leHBvcnQgdmFyIHRvdXJfbmFtZXMgPSBnZXRQb3NzaWJsZVRvdXJOYW1lcygpO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKHNyYywgYXJnKSB7XHJcbiAgICBmdW5jdGlvbiBjaG9vc2VFbmRpbmcobiwgZTEsIGUyLCBlNSkge1xyXG4gICAgICAgIGxldCB4ID0gbiAlIDEwMDtcclxuICAgICAgICBpZiAoTWF0aC5mbG9vcih4IC8gMTApID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPj0gNSB8fCB4ICUgMTAgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTI7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IFBIUkFTRVMgPSB7XHJcbiAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogKHZlcnNpb24sIGRhdGUpID0+IDxkaXYgY2xhc3NOYW1lPVwiYWJvdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48Yj5Sb2NrSnVkZ2Uge3ZlcnNpb259PC9iPiAo0LfQsNC60YDRi9GC0LDRjyDQstC10YDRgdC40Y8g0LTQu9GPINC+0LPRgNCw0L3QuNGH0LXQvdC90L7Qs9C+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPKSAmbWRhc2g7INGB0LjRgdGC0LXQvNCwINC00LvRjyDQv9C+0LTRgdGH0LXRgtCwINGA0LXQt9GD0LvRjNGC0LDRgtC+0LIg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INC/0L4g0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60L7QvNGDINGA0L7Qui3QvS3RgNC+0LvQu9GDLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QkNCy0YLQvtGA0YHQutC40LUg0L/RgNCw0LLQsCDQvdCwINGB0LjRgdGC0LXQvNGDIFJvY2tKdWRnZSDQv9C+0LvQvdC+0YHRgtGM0Y4g0L/RgNC40L3QsNC00LvQtdC20LDRgiDRgNCw0LfRgNCw0LHQvtGC0YfQuNC60YMg0JDRgNGC0LXQvNGDINCa0LDQt9Cw0LrQvtCy0YMuINCh0L7QsNCy0YLQvtGAINGB0LjRgdGC0LXQvNGLINCQ0L3RgtC+0L0g0JDQvNC10LvQuNC9LjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QodC40YHRgtC10LzQsCDRgNCw0YHQv9GA0L7RgdGC0YDQsNC90Y/QtdGC0YHRjyDQv9C+INC70LjRhtC10L3Qt9C40LggTGludW0gZC5vLm8gKGluZm9AbGludW0uaHIpLiDQlNC70Y8g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwIFJvY2tKdWRnZSDQvdC10L7QsdGF0L7QtNC40LzQviDQuCDQtNC+0YHRgtCw0YLQvtGH0L3QviDQuNC80LXRgtGMINC/0YDQsNCy0L4g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80YsgTGludW0gTFBTLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QntGE0LjRhtC40LDQu9GM0L3Ri9C5INGB0LDQudGCOiA8YSBocmVmPVwiaHR0cHM6Ly9yb2NranVkZ2UuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPmh0dHBzOi8vcm9ja2p1ZGdlLmNvbS88L2E+PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcHJvZ3JhbXNfYWZ0ZXJfY3JlYXRpb25cIjogXCLQn9GA0L7Qs9GA0LDQvNC80Ysg0LzQvtC20L3QviDQsdGD0LTQtdGCINC00L7QsdCw0LLQuNGC0Ywg0YLQvtC70YzQutC+INC/0L7RgdC70LUg0YHQvtGF0YDQsNC90LXQvdC40Y8g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQutC+0YDRgNC10LrRgtC90L4g0L3QsNGB0YLRgNC+0LXQvdCwINC4INC80L7QttC10YIg0LHRi9GC0Ywg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdCwLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfbm90X2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC90LXQtNC+0YHRgtGD0L/QvdCwINC90LAg0Y3RgtC+0Lwg0LrQvtC80L/RjNGC0LXRgNC1LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maW5hbGl6ZWRcIjogXCLQntGC0YHRg9GC0YHRgtCy0YPRjtGCINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfd2FybmluZ1wiOiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+0KTQuNC90LDQu9C40LfQsNGG0LjRjyDQtNC+0LvQttC90LAg0L7RgtC80LXQvdGP0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINC40YHQutC70Y7Rh9C40YLQtdC70YzQvdGL0YUg0YHQu9GD0YfQsNGP0YUhPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCV0YHQu9C4INC20LUg0Y3RgtC+INC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INC90LXQvtCx0YXQvtC00LjQvNC+LCDQvtCx0YDQsNGC0LjRgtC1INCy0L3QuNC80LDQvdC40LUsINGH0YLQviDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INGB0L/QuNGB0L7QuiDRg9GH0LDRgdGC0L3QuNC60L7QslxyXG4gICAgICAgICAgICAgICAgICAgINGB0LvQtdC00YPRjtGJ0LXQs9C+INGC0YPRgNCwINCx0YPQtNC10YIg0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60Lgg0L/QtdGA0LXRgdC+0LfQtNCw0L0uINCg0LXQt9GD0LvRjNGC0LDRgtGLINGD0YfQsNGB0YLQvdC40LrQvtCyLCDQv9GA0L7RiNC10LTRiNC40YUg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQv9C+0YHQu9C1INC/0LXRgNCy0L7QuVxyXG4gICAgICAgICAgICAgICAgICAgINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0Lgg0L3QtSDQv9GA0L7RiNC10LTRiNC40YUg0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0LHRg9C00YPRgiDQsdC10LfQstC+0LfQstGA0LDRgtC90L4g0YPRgtC10YDRj9C90YshPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCYINC90LUg0LfQsNCx0YPQtNGM0YLQtSDQt9Cw0L3QvtCy0L4g0L3QsNC/0LXRh9Cw0YLQsNGC0Ywg0LLRgdC1INGC0LHQu9C40YbRiy48L3A+PC9kaXY+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRgdC7LsKg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicHJpbnRfdGVzdF9wYWdlXCI6IFwi0J3QsNC/0LXRh9Cw0YLQsNGC0Ywg0YLQtdGB0YLQvtCy0YPRjiDRgdGC0YDQsNC90LjRhtGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlXCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlX2VtcHR5XCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/Rg9GB0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicnVsZXNcIjogXCLQl9Cw0LTQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfcGFnZVwiOiBcItCi0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3RleHRcIjogXCLQrdGC0L4g0YLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwIFJvY2tKdWRnZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfY2x1YlwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjogXCLQlNC+0LHQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9kaXNjaXBsaW5lXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3BhcnRpY2lwYW50XCI6IFwi0JTQvtCx0LDQstC40YLRjCDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3RvdXJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfbnVtYmVyc1wiOiBcItCd0L7QvNC10YDQsCDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0XCI6IFwi0K3QutGB0L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogXCLQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb1wiOiBcItCX0LDQs9GA0YPQt9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQn9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQstGB0LUg0YPRgdGC0YDQvtC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX3BsYW5cIjogXCLQodC+0YDRgtC40YDQvtCy0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtCy0LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgICAgIFwidW5jb25maXJtX3Njb3JlXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQutGB0LDRhtC40LhcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZVwiOiBcItCe0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NsdWJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDQutC70YPQsT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NvbXBldGl0aW9uXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2Rpc2NpcGxpbmVcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0LTQuNGB0YbQuNC/0LvQuNC90YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9qdWRnZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YHRg9C00YzRjj9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC/0YDQvtCz0YDQsNC80LzRgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOINGC0YPRgNCwPyDQktCy0LXQtNC40YLQtSDCq3VuZmluYWxpemXCuywg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiBcItCeINC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbGllbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LzQuCDRg9GB0YLRgNC+0LnRgdGC0LLQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfc2hvd25cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0L/QviDRgdC70LXQtNGD0Y7RidC40Lwg0LrQu9GD0LHQsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2luZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDRgtGD0YDQvdC40YDQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX21hbmFnZW1lbnRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQtNC40YHRhtC40L/Qu9C40L3QsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRfY29tcGV0aXRpb25cIjogXCLQrdC60YHQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LAg0Lgg0YDQtdC30YPQu9GM0YLQsNGC0L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfY29tcGV0aXRpb25cIjogXCLQmNC80L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTQtdC50YHQutCw0Y8g0LHRgNC40LPQsNC00LBcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9iYXRpY3NcIjogXCLQl9Cw0LPRgNGD0LfQutCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YPRh9Cw0YHRgtC90LjQutCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX21lbnVcIjogXCLQodC10YDQstC40YHQvdC+0LUg0LzQtdC90Y5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX2xpc3RcIjogXCLQodC/0LjRgdC+0Log0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2RhdGVcIjogXCLQlNCw0YLQsCDQv9GA0L7QstC10LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9uYW1lXCI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc1wiOiBcItCU0LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Rpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maWxlc19zZWxlY3RlZFwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LsuLi5cIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzXCI6IFwi0KPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3BvcnRzbWVuX29ubHlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3N1bW1hcnlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0LrQvtC70LjRh9C10YHRgtCy0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3ViXCI6IFwi0LfQsNC/XCIsICAvLyBzdWJzdGl0dXRlXHJcbiAgICAgICAgICAgICAgICBcInRvdXJzXCI6IFwi0KLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfcGFzc2NvZGVcIjogXCLQktCy0LXQtNGR0L0g0L3QtdCy0LXRgNC90YvQuSDQutC+0LQg0L/QvtGC0LLQtdGA0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVudVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY2x1YnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2Rpc2NpcGxpbmVzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9qdWRnZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2Vfc3BvcnRzbWVuXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQv9C+0YDRgtGB0LzQtdC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV90b3Vyc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGC0YPRgNCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5fcGFydGljaXBhbnRzXCI6IG4gPT4gbi50b1N0cmluZygpICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJuX3Nwb3J0c21lblwiOiAobiwgcykgPT4gbi50b1N0cmluZygpICsgXCIg0YHQv9C+0YDRgtGB0LzQtdC9XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIikgKyAocyA+IDAgPyBgICgrJHtzfSDQt9Cw0L/QsNGB0L0keyBjaG9vc2VFbmRpbmcocywgXCLQvtC5XCIsIFwi0YvRhVwiLCBcItGL0YVcIikgfSlgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuX3Nob3J0XCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQvy4pYCA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9uX3BhcnRpY2lwYW50c1wiOiBuID0+IFwi0JjRgtC+0LPQviBcIiArIG4gKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2luZy10YWJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG91ci1hZG1pblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lLXJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlcnJvcnNcIjoge1xyXG4gICAgICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibG9hZF9zeW50YXhfZXJyb3JcIjogXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC00LDQvdC90YvRhVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFwaVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImR1cGxpY2F0ZWRfZXh0ZXJuYWxfaWRcIjogXCLQkiDQtNCw0L3QvdGL0YUg0LjQvNC10Y7RgtGB0Y8g0LfQsNC/0LjRgdC4INGBINC/0L7QstGC0L7RgNGP0Y7RidC40LzQuNC80YHRjyBleHRlcm5hbF9pZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmFibGVfdG9fZ2V0XCI6ICh3YW50ZWQpID0+IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QvtC70YPRh9C40YLRjCBcIiArIHdhbnRlZCArIFwiINC40Lcg0LfQsNC/0YDQvtGB0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LrQu9GD0LEsINC6INC60L7RgtC+0YDQvtC80YMg0L/RgNC40LLRj9C30LDQvdGLINGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX25vbl9lbXB0eVwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSwg0YHQvtC00LXRgNC20LDRidC10LUg0LTQuNGB0YbQuNC/0LvQuNC90YssINC60LvRg9Cx0Ysg0LjQu9C4INGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG9vX21hbnlfdG91cnNcIjogKGQpID0+IFtcItCe0YjQuNCx0LrQsCDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsIGDQkiDQtNC40YHRhtC40L/Qu9C40L3QtSAke2R9INGB0L7QtNC10YDQttC40YLRgdGPINCx0L7Qu9GM0YjQtSDRgtGD0YDQvtCyLCDRh9C10Lwg0YHQvtC30LTQsNC90L4g0LIg0YHQuNGB0YLQtdC80LVgXSxcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9kaXNjaXBsaW5lX2ZvdW5kXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDRgdC+0LTQtdGA0LbQuNGCINGC0YPRgNGLLCDQvtGC0YHRg9GC0YHRgtCy0YPRjtGJ0LjQtSDQsiDRgdC40YHRgtC10LzQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjaGFuZ2VfanVkZ2VzX3dpdGhfZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0L7RgdGC0LDQsiDRgdGD0LTQtdC5INC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Riywg0YHQvtC00LXRgNC20LDRidC10Lkg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINGDINC60L7RgNC+0LPQviDQtdGB0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfc2NvcmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVwZWF0aW5nX2p1ZGdlXCI6IChuYW1lKSA9PiBuYW1lICsgXCIg0LLRgdGC0YDQtdGH0LDQtdGC0YHRjyDQsiDRgdC/0LjRgdC60LUg0YHRg9C00LXQuSDQsdC+0LvQtdC1INC+0LTQvdC+0LPQviDRgNCw0LfQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludGVybmFsX3NlcnZlcl9lcnJvclwiOiBbXCLQntGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtVwiLCBcItC/0YDQvtCy0LXRgNGM0YLQtSDQu9C+0LPQuCDQtNC70Y8g0LjQvdGE0L7RgNC80LDRhtC40LhcIl0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9kaXNjaXBsaW5lc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINCy0YXQvtC00Y/RidC10LPQviDQsiDRgdGD0LTQtdC50YHQutGD0Y4g0LHRgNC40LPQsNC00YMg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRg9GH0LDRgdGC0L3QuNC60LAsINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INGF0L7RgtGPINCx0Ysg0LIg0L7QtNC90L7QvCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicnVuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2V0X3BlcmZvcm1lZF9mbGFnX29uX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHRgtCw0YLRg9GBINC30LDRhdC+0LTQsCDRhNC40L3QsNC70LjQt9C40L3QvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2NvcmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzY29yZV9ub3RfZXhpc3RcIjogXCLQn9C+0L/Ri9GC0LrQsCDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LUg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQuSDQvtGG0LXQvdC60Lgg0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfb25fZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINC+0YbQtdC90LrRgyDQsiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfYmVmb3JlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC00L7QsdCw0LLQuNGC0Ywg0L3QvtCy0YvQuSDRgtGD0YAg0L/QtdGA0LXQtCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YLRg9GALCDQv9GA0LjRgdGD0YLRgdGC0LLRg9GO0YnQuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF9maW5haWx6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2FkZF9hZnRlcl9pZFwiOiBcItCf0L7Qv9GL0YLQutCwINC00L7QsdCw0LjRgtGMINGC0YPRgCDQsiDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC1INC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF90b19ub25fZW1wdHlcIjogKGQpID0+IFtcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQs9GA0YPQt9C40YLRjCDRgtGD0YDRiyDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YtcIiwgYNCU0LjRgdGG0LjQv9C70LjQvdCwICR7ZH0g0YPQttC1INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YtgXSxcclxuICAgICAgICAgICAgICAgIFwibmV4dF9pc19maW5haWx6ZWRcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC90LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX25leHRfdG91clwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L/QvtGB0LvQtdC00L3QuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC90LUg0YHQvtC00LXRgNC20LjRgtGB0Y8g0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X25vdF9maW5haWx6ZWRcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgtGD0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQv9GD0YHRgtC40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX2ZpbmFsaXplZFwiOiBcItCU0LvRjyDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwINC90LUg0LTQvtC/0YPRgdC60LDQtdGC0YHRjyDQuNC30LzQtdC90LXQvdC40LUg0LrQstC+0YLRiyDQstGL0LLQvtC00LAsINGC0LjQv9CwINGC0YPRgNCwINC40LvQuCDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkXCI6IFwi0JTQvtCx0LDQstC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2VsZWN0X2FsbFwiOiBcItCh0L3Rj9GC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImVkaXRcIjogXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVcIjogXCLQo9C00LDQu9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkXCI6IFwi0J7RgtC80LXQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNhdmVcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2FsbFwiOiBcItCS0YvQsdGA0LDRgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJicm93c2VcIjogXCLQntCx0LfQvtGALi4uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3RpbmdcIjogXCLQn9C+0LTQutC70Y7Rh9C10L3QuNC1INC6INGB0LXRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fcHJvYmxlbVwiOiBcItCf0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZXNcIjogXCLQlNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vXCI6IFwi0J3QtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX2Vycm9yXCI6IFwi0J/QvtGF0L7QttC1LCDQuNC80LXRjtGC0YHRjyDQv9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiZXJyb3JfaGVhZGVyXCI6IFwi0J7RiNC40LHQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Y2Nlc3NcIjogXCLQntC/0LXRgNCw0YbQuNGPINGD0YHQv9C10YjQvdC+INC30LDQstC10YDRiNC10L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoZWF0X25cIjogKG4pID0+IFwi0JfQsNGF0L7QtCDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwianVkZ2VfblwiOiAobikgPT4gXCLQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25cIjogKG4sIG5hbWUsIG5fc3ApID0+XHJcbiAgICAgICAgICAgICAgICAgICAgKG5fc3AgPiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQpNC+0YDQvNC10LnRiNC9IOKEllwiICsgbi50b1N0cmluZygpICsgKG5hbWUgPyBcIjogXCIgKyBuYW1lIDogXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAobl9zcCA9PT0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCf0LDRgNCwIOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwi0KPRh9Cw0YHRgtC90LjQuiDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgbi50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnaW5nXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQntGB0YLQsNC90L7QstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00Ys/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwib2xkX3Njb3JlXCI6IFwi0JHQsNC30LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb2RlbHNcIjoge1xyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQtNC70Y8g0L/RgNC+0YLQvtC60L7Qu9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9iZWdpbm5pbmdcIjogXCLQndCw0YfQsNC70L5cIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2R1cmF0aW9uXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0JBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LtcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YVcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJvbGVzX2xlZ2VuZFwiOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctMTAwXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7Qk9C7IOKAlCDQs9C70LDQstC90YvQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QoiDigJQg0YHRg9C00YzRjyDRgtCw0L3RhtCwPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QkCDigJQg0YHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KJleCDigJQg0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBcItCa0LDRgtC10LPQvtGA0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L0uIElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQpC4g0JguINCeLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVcIjogXCLQoNC+0LvRjCDQsiDRgdGD0LTQtdC50YHRgtCy0LVcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZV9kZXNjcmlwdGlvblwiOiBcItCU0L7Qu9C20L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uc1wiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfbmFtZVwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfbmFtZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCLQmNC80Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCI6IFwi0J/QvtC7XCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9mXCI6IFwi0JZcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX21cIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5lcmFsX2luZm9cIjogXCLQntGB0L3QvtCy0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC+0LzQsNC90LTRiyDRhNC+0YDQvNC10LnRiNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcItCk0LDQvNC40LvQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZ3JhbXNcIjogXCLQn9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWFuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfblwiOiBcItCe0YHQvS5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV95XCI6IFwi0JfQsNC/LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZWFyX29mX2JpcnRoXCI6IFwi0JPQvtC0INGA0L7QttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwieW9iXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZ3JhbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfZm9yXCI6IFwi0J/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfcHJvZ3JhbVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX2hvcGVfdG91clwiOiBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwibnVtX2FkdmFuY2VzXCI6IFwi0JrQstC+0YLQsCDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX3Blcl9oZWF0XCI6IFwi0KPRh9Cw0YHRgtC90LjQutC+0LIg0LIg0LfQsNGF0L7QtNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjb3Jpbmdfc3lzdGVtX25hbWVcIjogXCLQodC40YHRgtC10LzQsCDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfaGVhdFwiOiBcItCh0LHRgNC+0YEg0L3QvtC80LXRgNCwINC30LDRhdC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9wbGFjZVwiOiBcItCh0LHRgNC+0YEg0LzQtdGB0YLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VzXCI6IFwi0JzQtdGB0YLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicHJlc2VudGVyXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGCLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19hY3RpdmVfdG91clwiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2ZpbmFsaXplZFwiOiBcItCU0LDQvdC90YvQtSDRgNC10LfRg9C70YzRgtCw0YLRiyDQvdC1INGP0LLQu9GP0Y7RgtGB0Y8g0L7QutC+0L3Rh9Cw0YLQtdC70YzQvdGL0LzQuC5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicHJpbnRcIjogXCLQn9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxlX3ZpZXdcIjogXCLQo9C/0YDQvtGJ0LXQvdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX3ZpZXdcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic3RhcnRfcGFnZVwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9jb21wZXRpdGlvblwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1INC00LvRjyDQv9GA0L7QtNC+0LvQttC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9yb2xlXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdCy0L7RjiDRgNC+0LvRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm9fY29tcGV0aXRpb25zXCI6IFwi0J3QtdGCINCw0LrRgtC40LLQvdGL0YUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50X2xpbmtcIjogKGxpbmspID0+IDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgINCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80Lgg0L3QsNGF0L7QtNC40YLRgdGPINC/0L4g0LDQtNGA0LXRgdGDJm5ic3A7XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17IGxpbmsgfT57IGxpbmsgfTwvYT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZG1pbmlzdHJhdG9yXCI6IFwi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuXCI6IFwi0K3QutGA0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY3JlZW5fb3BlcmF0b3JcIjogXCLQntC/0LXRgNCw0YLQvtGAINGN0LrRgNCw0L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhhc191bmNvbmZpcm1lZF9zY29yZXNcIjogXCLQmNC80LXRjtGC0YHRjyDQvdC10LfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L3Ri9C1INC+0YbQtdC90LrQuCDRgdGD0LTQtdC5INCyINC/0L7RgdC70LXQtNC90LXQvCDQt9Cw0YXQvtC00LUuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YNcIixcclxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LXQstGL0YXQvtC0INC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfc3RvcHdhdGNoXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9zdG9wd2F0Y2hcIjogXCLQodGC0LDRgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwIOKEllwiICsgKG4gKyAxKSxcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X3BhZ2VcIjogXCLQodGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19kaXNjaXBsaW5lXCI6IFwi0JLRiyDQvdC1INGD0YfQsNGB0YLQstGD0LXRgtC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDQtNCw0L3QvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfcGFydGljaXBhbnRcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfdG91clwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7RgiDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1pbmdcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogXCLQlNC10LnRgdGC0LLQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhbmNlXCI6IFwi0KLQsNC90LXRhlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcG9zaXRpb25cIjogXCLQmtC+0LzQv9C+0LfQuNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2ZpZ3NcIjogXCLQotCw0L3RhtC10LLQsNC70YzQvdGL0LUg0YTQuNCz0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfdGVjaFwiOiBcItCi0LXRhdC90LjQutCwINGC0LDQvdGG0LXQstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9mYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9taXN0YWtlc1wiOiBcItCe0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9zbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMylcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3dvbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGA0YjQsCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW1wcmVzc2lvblwiOiBcItCe0LHRidC10LUg0LLQv9C10YfQsNGC0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBvaW50c1wiOiBcItCe0YbQtdC90LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlX3Njb3Jlc1wiOiBcItCe0YbQtdC90LrQuCDQu9C40L3QtdC50L3Ri9GFINGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJva1wiOiBcIk9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVuYWx0eV90eXBlXCI6IFwi0KjRgtGA0LDRhNC90YvQtSDRgdCw0L3QutGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByZXZpb3VzX3BlbmFsdGllc1wiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC1INGI0YLRgNCw0YTRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZF9jYXJkXCI6IFwiLTMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1feWVsbG93X2NhcmRcIjogXCItNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fcmVkX2NhcmRcIjogXCItMTVcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianVtcF9zdGVwc1wiOiBcItCe0YHQvdC+0LLQvdGL0LUg0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXNldF90b19uXCI6IChuKSA9PiBcItCh0LHRgNC+0YEg0L3QsCBcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1pbmdcIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJicmVha2Rvd25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIjogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBcIkFcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibVwiOiBcItCR0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjXCI6IFwi0JpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZlwiOiBcItCi0KRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkdFwiOiBcItCiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZkXCI6IFwi0J9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmbVwiOiBcItCe0KXQvFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3XCI6IFwi0J7QpdC2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaVwiOiBcItCe0JJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtXCI6IFwi0J7RiFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBcIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtXCI6IFwi0JzQnlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRcIjogXCLOo1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfYWR2YW5jZWRcIjogXCLQn9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIjogXCLQndC1INC/0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LvQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0LDQutGA0L5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzX3ZlcmJvc2VcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCAo0LfQsNGP0LLQutCwL9GE0LDQutGCKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNhcmRcIjogXCLQqNGC0YDQsNGEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlX3Nob3J0XCI6IFwi0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQo9GH0LDRgdGC0L3QuNC6LCDRgNC10LfRg9C70YzRgtCw0YJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0X3RvdXJcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0L/RgNC40L3QuNC80LDQuyDRg9GH0LDRgdGC0LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NsdWJcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVuYWx0eVwiOiBcItCo0YLRgNCw0YQg0LPQu9Cw0LLQvdC+0LPQviDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQnNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0JjRgtC+0LNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNfbmFtZXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfZndcIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvblwiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INCx0LXQtyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INGBINCw0LrRgNC+0LHQsNGC0LjQutC+0LlcIixcclxuICAgICAgICAgICAgICAgIFwibm9fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRgtCw0L3RhtC10LLQsNC70YzQvdGL0LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsaWZpZWRcIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YPQv9GA0L7RidC10L3QvdCw0Y8g0YHQuNGB0YLQtdC80LAgKDHigJM0MClcIixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnZV9yb2xlc1wiOiB7XHJcbiAgICAgICAgICAgIFwiXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQodGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCLQodGD0LTRjNGPINGC0LDQvdGG0LBcIixcclxuICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIGxldCBwYXRoID0gc3JjLnNwbGl0KFwiLlwiKTtcclxuICAgIGxldCBwaHJhc2VfcHRyID0gUEhSQVNFUztcclxuICAgIHBhdGguZm9yRWFjaCgoY2h1bmspID0+IHBocmFzZV9wdHIgPSBwaHJhc2VfcHRyW2NodW5rXSk7XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGZpbmQgdHJhbnNsYXRpb24gZm9yIFwiICsgc3JjKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGxldCBhcmdzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpZHhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBocmFzZV9wdHIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGhyYXNlX3B0cjtcclxufVxyXG5cclxuZXhwb3J0IHZhciBnZXRQb3NzaWJsZVRvdXJOYW1lcyA9ICgpID0+IFtcclxuICAgIFwi0KTQuNC90LDQu1wiLFxyXG4gICAgXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICBcItCe0YLQsdC+0YDQvtGH0L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgXCIxLzIg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvNCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS84INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzE2INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgIFwi0KTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuXTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IHNob3dFcnJvciB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5cclxuY2xhc3MgQXBpSW1wbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSAobXNnLCBjb2RlLCBhcmdzKSA9PiBzaG93RXJyb3IoY29kZSA/IF8oY29kZSwgLi4uYXJncykgOiBtc2cpO1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9ICguLi5kYXRhKSA9PiBjb25zb2xlLmVycm9yKFwiQVBJIGZhaWxcIiwgLi4uZGF0YSk7XHJcbiAgICAgICAgdGhpcy5jYl9kb25lID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuICAgIG9uRG9uZShjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25TdWNjZXNzKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvbkVycm9yKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25GYWlsKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhZGRUb0RCKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBzdD1zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBzdC5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCByZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2VuZCgpIHtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIFwiL2FwaVwiLCB0cnVlKTtcclxuICAgICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuIiwiaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uX3N0YXR1cyB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcblxyXG5cclxuY2xhc3MgTWVzc2FnZURpc3BhdGNoZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzX2NudCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGluZyB0byB3ZWJzb2NrZXQuLi5cIik7XHJcbiAgICAgICAgdGhpcy53cyA9IG5ldyBTb2NrSlMoXCJodHRwOi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIFwiL3dzXCIpO1xyXG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldE9rKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkLlwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogW1tcInJlbG9hZF9kYXRhXCIsIG51bGxdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxfdXBkYXRlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldEZhaWwoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNvbm5lY3QuYmluZCh0aGlzKSwgNTAwKTtcclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb25NZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICBpZiAoZGF0YVtcImNsaWVudF9pZFwiXSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xpZW50X2lkID0gZGF0YVtcImNsaWVudF9pZFwiXTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLm1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbXNnX3R5cGUgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICBsZXQgbXNnX2RhdGEgPSBkYXRhWzFdO1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAobXNnX3R5cGUgPT09IFwiZm9yY2VfcmVmcmVzaFwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fSkuZm9yRWFjaCgoa2V5KSA9PiBsaXN0ZW5lcnNba2V5XShtc2dfZGF0YSkpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRhdGEubW9kZWxfdXBkYXRlcy5mb3JFYWNoKChtb2RlbF9pbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHN0b3JhZ2UudXBkYXRlTW9kZWwobW9kZWxfaW5mby5tb2RlbCwgbW9kZWxfaW5mby5pZCwgbW9kZWxfaW5mby5kYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGRhdGFfY2hhbmdlZCkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbXCJkYl91cGRhdGVcIl0gfHwge307XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRMaXN0ZW5lcklkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc19jbnQrKztcclxuICAgIH1cclxuICAgIGFkZExpc3RlbmVyKG1zZ190eXBlcywgY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldExpc3RlbmVySWQoKTtcclxuICAgICAgICBtc2dfdHlwZXMuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24obXNnX3R5cGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXVtpZF0gPSBjYWxsYmFjaztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyX2lkKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1trZXldW2xpc3RlbmVyX2lkXTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuaWYgKCF3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyKSB7XHJcbiAgICB3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XHJcbn1cclxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSB3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyO1xyXG4iLCJjbGFzcyBSZWYge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSwgaWQpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubW9kZWxfbmFtZSkuYnlfaWQodGhpcy5pZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIGlkLCBtb2RlbF9zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX19zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzID0ge307XHJcbiAgICAgICAgdGhpcy5fX21vZGVsX3N0b3JhZ2UgPSBtb2RlbF9zdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkQmFja1JlZihrZXksIHJlZikge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHJlZjtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgIH1cclxuICAgIHVwZGF0ZShkYXRhLCBjcmVhdGU9dHJ1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IGlkeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIiB8fCBpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjcmVhdGUgJiYgdHlwZW9mIHRoaXNbaWR4LnNsaWNlKDEpXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IFtdXHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCB0aGlzLl9fbW9kZWxfc3RvcmFnZS5tb2RlbF9uYW1lLCB0aGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZl9rZXkgPSBkYXRhW2lkeF0uYmFja19yZWY7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2lkeF0uY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihuZXN0ZWRfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEuZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZi5nZXQoKS5hZGRCYWNrUmVmKGJhY2tfcmVmX2tleSwgYmFja19yZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XS5wdXNoKHJlZik7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCIqXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVzdGVkX2RhdGEgPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpZHhdID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1tpZHhdID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNlcmlhbGl6ZShzY2hlbWEpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge31cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fX2tleV90eXBlcykgaWYgKHRoaXMuX19rZXlfdHlwZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX19rZXlfdHlwZXNba2V5XSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiKlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5tYXAoZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWYuZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiXlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQuaWQgPSB0aGlzLmlkXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWxzU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGQoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxzW2lkXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0gPSBuZXcgTW9kZWwodGhpcy5zdG9yYWdlLCBpZCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbHNbaWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYnlfaWQoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbaWRdO1xyXG4gICAgfVxyXG4gICAgYWxsKCkge1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tb2RlbHMpO1xyXG4gICAgICAgIHJldHVybiBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2tleV07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZG9tYWlucyA9IHt9XHJcbiAgICB9XHJcbiAgICBnZXREb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRvbWFpbnNbZG9tYWluXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRvbWFpbnNbZG9tYWluXSA9IG5ldyBTdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGRlbERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBnZXQobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID0gbmV3IE1vZGVsc1N0b3JhZ2UodGhpcywgbW9kZWxfbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgZGVsKG1vZGVsX25hbWUpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX3R5cGVdKSB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmRvbWFpbnMpLmZvckVhY2goKGtleSkgPT5cclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5kb21haW5zW2tleV0udXBkYXRlTW9kZWwoLi4uYXJndW1lbnRzKSB8fCBkYXRhX2NoYW5nZWQpO1xyXG4gICAgICAgIC8vIHJldHVybiBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgc3R5bGU9e3sgXCJoZWlnaHRcIjogXCIxMDAlXCIsIFwid2lkdGhcIjogXCIxMDAlXCIgfX0+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIgfX0+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvaW1nL2FqYXgtbG9hZGVyLmdpZlwiIC8+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXNNb2NrIHtcclxuICAgIHNldE9rKCkge31cclxuICAgIHNldEZhaWwoKSB7fVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFwiY29ubmVjdGVkXCI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbm5lY3Rpb25fc3RhdHVzXCIpO1xyXG4gICAgICAgIGlmIChlbGVtZW50ICYmICFlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgPENvbm5lY3Rpb25TdGF0dXMgLz4sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvblN0YXR1c01vY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRPaygpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IHRydWUsIHRpY2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0RmFpbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgb2tcIj48L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3RpbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LWRhbmdlclwiICsgKHRoaXMuc3RhdGUudGljayA/IFwiIHRpY2tcIiA6IFwiXCIpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW9uX3Byb2JsZW1cIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29ubmVjdGlvbl9zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmluaXQoKTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XHJcbiAgICBsZXQgdGl0bGUgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMF0gOiBfKFwiZ2xvYmFsLm1lc3NhZ2VzLmVycm9yX2hlYWRlclwiKTtcclxuICAgIGxldCB0ZXh0ID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzFdIDogbXNnO1xyXG4gICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDb25maXJtKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkge1xyXG4gICAgcmV0dXJuIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxyXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxyXG4gICAgfSwgYWN0aW9uKTtcclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hPckNsaWNrKGhhbmRsZXIpIHtcclxuICAgIGxldCBmID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlcihldmVudCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvblRvdWNoU3RhcnQ6IGYsXHJcbiAgICAgICAgb25DbGljazogZixcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hFbmRPckNsaWNrKGhhbmRsZXIsIHByZXZlbnRfZGVmYXVsdCkge1xyXG4gICAgbGV0IF9oYW5kbGVyID0gKCkgPT4ge307XHJcbiAgICBsZXQgZGlzdGFuY2UgPSAwO1xyXG4gICAgbGV0IGxhdGVzdF9wb3MgPSBbMCwgMF07XHJcbiAgICBsZXQgZmlyZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgICBsZXQgZGlzY2FyZCA9ICgpID0+IHtcclxuICAgICAgICBfaGFuZGxlciA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG4gICAgbGV0IG1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgY3VycmVudF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XHJcbiAgICAgICAgbGV0IHNxciA9ICh4KSA9PiB4ICogeDtcclxuICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnNxcnQoc3FyKGN1cnJlbnRfcG9zWzBdIC0gbGF0ZXN0X3Bvc1swXSkgKyBzcXIoY3VycmVudF9wb3NbMV0gLSBsYXRlc3RfcG9zWzFdKSk7XHJcbiAgICAgICAgbGF0ZXN0X3BvcyA9IGN1cnJlbnRfcG9zO1xyXG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDIwKSB7XHJcbiAgICAgICAgICAgIGRpc2NhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgc3RhcnQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBfaGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICAgICAgZGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIGxhdGVzdF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uVG91Y2hTdGFydDogc3RhcnQsXHJcbiAgICAgICAgb25Ub3VjaEVuZDogZmlyZSxcclxuICAgICAgICBvblRvdWNoTW92ZTogbW92ZSxcclxuICAgICAgICBvblRvdWNoQ2FuY2VsOiBkaXNjYXJkLFxyXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZXIsXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZG9uZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgIGRvbmVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBzbGlkZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIG9uQWN0aXZhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBpbiA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5kb25lICYmIG5leHRQcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpc0ZyZWUoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlLnRvdWNoICYmICF0aGlzLnByb3BzLmRvbmUgJiYgIXRoaXMuc3RhdGUuZmluaXNoZWQ7XHJcbiAgICB9XHJcbiAgICBnZXRPdXRlclRleHRPcGFjaXR5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCgxMDAgLSB0aGlzLnN0YXRlLnBvc2l0aW9uLCAwKSwgMTAwKTtcclxuICAgICAgICByZXR1cm4gKHZhbHVlIC8gMTAwKS50b0ZpeGVkKDMpO1xyXG4gICAgfVxyXG4gICAgZ2V0RWxlbWVudE9mZnNldChlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmVzICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgZ2V0VG91Y2goZXZlbnQpIHtcclxuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcclxuICAgIH1cclxuICAgIGdldFJlbGF0aXZlVG91Y2goZXZlbnQpIHtcclxuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XHJcbiAgICB9XHJcbiAgICBnZXRTbGlkZXJQb3MoZXZlbnQpIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRUb3VjaChldmVudCkgLSB0aGlzLnBpbjtcclxuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgMjAwKTtcclxuICAgIH1cclxuICAgIG9uQ2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcG9zaXNpb246IDIwMCxcclxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hTdGFydCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5waW4gPSB0aGlzLmdldFJlbGF0aXZlVG91Y2goZXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxyXG4gICAgICAgICAgICB0b3VjaDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hFbmQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBvc2l0aW9uID09PSAyMDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlciBub3NlbGVjdFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpbm5lclwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6ICh0aGlzLnByb3BzLmRvbmUgfHwgdGhpcy5zdGF0ZS5maW5pc2hlZCkgPyBcIjIwMHB4XCIgOiB0aGlzLnN0YXRlLnBvc2l0aW9uICsgXCJweFwiIH19XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyB0aGlzLm9uVG91Y2hTdGFydCB9XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoTW92ZT17IHRoaXMub25Ub3VjaE1vdmUgfVxyXG4gICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17IHRoaXMub25Ub3VjaEVuZCB9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5vbkNsaWNrIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAg4oaSXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVxyXG4gICAgICAgICAgICAgICAgPyA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcInJnYigxMDAsMTAwLDEwMClcIiB9fVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiZG9uZS10ZXh0XCIgfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lVGV4dCB9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA6IDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiYSgxMDAsMTAwLDEwMCxcIiArIHRoaXMuZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpICsgXCIpXCIgfX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInNsaWRlLXRleHRcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zbGlkZVRleHQgfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0U2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgY2hvaWNlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJvd1NpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0QnV0dG9uc0NvdW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3dTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIG9uQ2xpY2sobikge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShuKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jaG9pY2VzLmZvckVhY2goKGVsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGtleSA9IGVsWzBdO1xyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IGVsWzFdO1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlX2NsYXNzX25hbWUgPSAodGhpcy5wcm9wcy52YWx1ZSA9PT0ga2V5KSA/IFwiIGFjdGl2ZVwiIDogXCJcIjtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXsga2V5IH1cclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbkNsaWNrLmJpbmQodGhpcywga2V5KSl9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIHNjb3JlLWJ0blwiICsgYWN0aXZlX2NsYXNzX25hbWUgfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0fVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiICYmIChpZHggKyAxKSAlIHRoaXMucHJvcHMucm93U2l6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goPGJyIGtleT17IFwiYnJcIiArIGlkeCB9IC8+KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGxheW91dF9jbGFzcyA9ICh0aGlzLnByb3BzLnN0eWxlICE9PSBcInR3by1saW5lc1wiKSA/IFwic2VsZWN0b3ItbGF5b3V0XCIgOiBcInNlbGVjdG9yLWxheW91dC0ycm93c1wiO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZF9jbGFzcyA9IHRoaXMucHJvcHMudmFsdWUgPT09IG51bGwgPyBcIlwiIDogXCIgc2VsZWN0ZWRcIlxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJzY29yaW5nLWxheW91dCBcIiArIGxheW91dF9jbGFzcyArIHNlbGVjdGVkX2NsYXNzICsgXCIgbi1cIiArIHRoaXMuZ2V0QnV0dG9uc0NvdW50KCkudG9TdHJpbmcoKSB9PnsgcmVzdWx0IH08L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldEludGVnZXJTZWxlY3RJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUFycmF5KG1pbiwgbWF4KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IG1pbjsgaWR4IDw9IG1heDsgKytpZHgpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCwgaWR4LnRvU3RyaW5nKCldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxyXG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldFBvaW50NVNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gTWF0aC5yb3VuZCgyICogbWluKTsgaWR4IDw9IE1hdGgucm91bmQoMiAqIG1heCk7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpZHggLyAyLCAoaWR4ICUgMikgPyAoaWR4IC8gMikudG9GaXhlZCgxKSA6IE1hdGguZmxvb3IoaWR4IC8gMikudG9TdHJpbmcoKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cclxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbk1pbnVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IC0xfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblBsdXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICtcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRBY3JvT3ZlcnJpZGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBvcmlnaW5hbF92YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzZW5kX2RlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbmRfZGVsdGFzOiBmYWxzZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbk1pbnVzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmRfZGVsdGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMC41fSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKE1hdGgubWF4KHRoaXMucHJvcHMudmFsdWUgLSAwLjUsIDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblBsdXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZF9kZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IDAuNX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShNYXRoLm1pbih0aGlzLnByb3BzLnZhbHVlICsgMC41LCB0aGlzLnByb3BzLm9yaWdpbmFsX3ZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25aZXJvID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSgwKTtcclxuICAgIH1cclxuICAgIG9uUmVzdG9yZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlX2NoYW5nZWQgPSBNYXRoLmFicyh0aGlzLnByb3BzLnZhbHVlIC0gdGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtYWNyby1vdmVycmlkZS1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi16ZXJvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLnZhbHVlIDwgMC4wNSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uWmVybyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDihpMwXHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1yZXN0b3JlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB2YWx1ZV9jaGFuZ2VkIDwgMC4wNSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUmVzdG9yZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDihpFcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLnZhbHVlIDwgMC4wNSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uTWludXMpfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZSA8IHRoaXMucHJvcHMudmFsdWUgKyAwLjA1IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICtcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWVfY2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGAke3RoaXMucHJvcHMub3JpZ2luYWxfdmFsdWUudG9GaXhlZCgxKX0g4oaSICR7dGhpcy5wcm9wcy52YWx1ZS50b0ZpeGVkKDEpfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnZhbHVlLnRvRml4ZWQoMSkgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxudmFyIHN0b3B3YXRjaGVzID0ge307XHJcblxyXG5leHBvcnQgY2xhc3MgU3RvcFdhdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3JlX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZV9pZF0gfHwge1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgc3RyX3ZhbHVlOiBcIjA6MDBcIixcclxuICAgICAgICAgICAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpcmVjdC1tdXRhdGlvbi1zdGF0ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XHJcbiAgICAgICAgc3RvcHdhdGNoZXNbdGhpcy5wcm9wcy5zY29yZV9pZF0gPSB0aGlzLnN0YXRlO1xyXG4gICAgfVxyXG4gICAgbm93KCkge1xyXG4gICAgICAgIHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG4gICAgfVxyXG4gICAgdG9nZ2xlKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlID8gdGhpcy5zdG9wKCkgOiB0aGlzLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBzdGFydF9hdDogdGhpcy5ub3coKSAtIHRoaXMuc3RhdGUudmFsdWUsXHJcbiAgICAgICAgICAgIGludGVydmFsOiBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTApLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB2YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hY3RpdmVcclxuICAgICAgICAgICAgPyAodGhpcy5ub3coKSAtIHRoaXMuc3RhdGUuc3RhcnRfYXQpXHJcbiAgICAgICAgICAgIDogdGhpcy5zdGF0ZS52YWx1ZTtcclxuICAgIH1cclxuICAgIHRpY2soKSB7XHJcbiAgICAgICAgdmFyIG5ld192YWx1ZSA9IHRoaXMudmFsdWUoKTtcclxuICAgICAgICBpZiAobmV3X3ZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcGFkKG51bSwgc2l6ZSkge1xyXG4gICAgICAgIHZhciBzID0gXCIwMDAwXCIgKyBudW0udG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gcy5zdWJzdHIocy5sZW5ndGggLSBzaXplKTtcclxuICAgIH1cclxuICAgIGdldFN0clZhbHVlKCkge1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnZhbHVlKCk7XHJcbiAgICAgICAgdmFyIG0gPSAwLCBzID0gMDtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgbSA9IE1hdGguZmxvb3IodmFsIC8gKDYwICogMTAwMCkpO1xyXG4gICAgICAgIHZhbCAlPSA2MCAqIDEwMDA7XHJcbiAgICAgICAgcyA9IE1hdGguZmxvb3IodmFsIC8gMTAwMCk7XHJcbiAgICAgICAgcmV0dXJuIG0udG9TdHJpbmcoKSArICc6JyArIHRoaXMucGFkKHMsIDIpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RvcHdhdGNoXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcmVzZXQgaWdub3JlLXJlYWRvbmx5XCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5yZXNldC5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5yZXNldF9zdG9wd2F0Y2hcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIGJ0bi10b2dnbGUgaWdub3JlLXJlYWRvbmx5XCIgKyAodGhpcy5zdGF0ZS5hY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy50b2dnbGUuYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmFjdGl2ZSA/IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdG9wX3N0b3B3YXRjaFwiKSA6IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdGFydF9zdG9wd2F0Y2hcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RyVmFsdWUoKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
