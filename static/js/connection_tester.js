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
                "heats": "Заходы",
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
                "no_program_loaded": "Акробатика не загружена",
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
                "manage_participants": "Управление спортсменами",
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
                "invalid_scoring_system": "Выбрана недопустимая система судейства",
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
                "edit_acrobatic_override": "Изменить",
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
                "name": "Название",
                "rules_set": "Система судейства"
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
                "base_name": "РосФАРР",
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
            if (window.client_id) {
                data.append("client_id", window.client_id);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcY2xpZW50c1xcY29ubmVjdGlvbl90ZXN0ZXJcXG1haW4uanN4Iiwic3JjXFxqc3hcXGNvbW1vblxcdG9vbHMuanN4Iiwic3JjXFxqc3hcXGNvbm5lY3Rpb25fdGVzdGVyLmpzeCIsInNyY1xcanN4XFxsMTBuXFxsb2FkZXIuanN4Iiwic3JjXFxqc3hcXGwxMG5cXHJ1LmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCIsInNyY1xcanN4XFx1aVxcdGFibGV0X2NvbXBvbmVudHMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNNYTs7O0FBQ1QsYUFEUyxnQkFDVCxDQUFZLEtBQVosRUFBbUI7OEJBRFYsa0JBQ1U7OzJFQURWLDZCQUVDLFFBRFM7O0FBRWYsY0FBSyxLQUFMLEdBQWE7QUFDVCwwQkFBYyxJQUFkO0FBQ0EsMkJBQWUsSUFBZjtBQUNBLDBCQUFjLEVBQWQ7QUFDQSw0QkFBZ0IsRUFBaEI7QUFDQSw2QkFBaUIsQ0FBakI7U0FMSixDQUZlO0FBU2YsK0NBQW1CLFdBQW5CLENBQStCLFlBQS9CLEVBQTZDLE1BQUssV0FBTCxDQUFpQixJQUFqQixPQUE3QyxFQVRlO0FBVWYsY0FBSyxRQUFMLEdBVmU7O0tBQW5COztpQkFEUzs7aUNBYUEsVUFBVTtBQUNmLGdCQUFJLEtBQUssR0FBTCxFQUFVO0FBQ1YsOEJBQWMsS0FBSyxHQUFMLENBQWQsQ0FEVTthQUFkO0FBR0EsaUJBQUssR0FBTCxHQUFXLFlBQVksS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWYs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LFdBQUwsRUFETjtpQkFiSjthQURKLENBREs7Ozs7V0EzRUE7RUFBa0IsTUFBTSxTQUFOIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgVGFibGV0U2VsZWN0b3JJbnB1dCB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgY2xvbmUgfSBmcm9tIFwiY29tbW9uL3Rvb2xzXCI7XG5cblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25UZXN0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBheWxvYWRfc2l6ZTogMTAwMCxcbiAgICAgICAgICAgIHBpbmdfaW50ZXJ2YWw6IDEwMDAsXG4gICAgICAgICAgICBhY3RpdmVfcGluZ3M6IHt9LFxuICAgICAgICAgICAgZmluaXNoZWRfcGluZ3M6IFtdLFxuICAgICAgICAgICAgbGFzdGVzdF9sYXRlbmN5OiAwLFxuICAgICAgICB9O1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJwaW5nX3JlcGx5XCIsIHRoaXMub25QaW5nUmVwbHkuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMucmVzZXRKb2IoKTtcbiAgICB9XG4gICAgcmVzZXRKb2IoaW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMuam9iKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuam9iKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmpvYiA9IHNldEludGVydmFsKHRoaXMucGluZy5iaW5kKHRoaXMpLCBpbnRlcnZhbCB8fCB0aGlzLnN0YXRlLnBpbmdfaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBwaW5nKCkge1xuICAgICAgICBsZXQgcGluZ19pZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IGNsb25lKHRoaXMuc3RhdGUuYWN0aXZlX3BpbmdzKTtcbiAgICAgICAgbmV3X3N0YXRlW3BpbmdfaWRdID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlX3BpbmdzOiBuZXdfc3RhdGUsXG4gICAgICAgICAgICBsYXRlc3Rfc2VudDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIH0pO1xuICAgICAgICBBcGkoXCJzZXJ2aWNlLnBpbmdcIiwgeyBwaW5nX2lkOiBwaW5nX2lkLCBwYXlsb2FkX3NpemU6IHRoaXMuc3RhdGUucGF5bG9hZF9zaXplIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgb25QaW5nUmVwbHkocmVzcG9uc2UpIHtcbiAgICAgICAgbGV0IHBpbmdfaWQgPSByZXNwb25zZS5waW5nX2lkO1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuYWN0aXZlX3BpbmdzW3BpbmdfaWRdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuc3RhdGUuYWN0aXZlX3BpbmdzW3BpbmdfaWRdO1xuICAgICAgICBsZXQgYWN0aXZlX3BpbmdzID0gY2xvbmUodGhpcy5zdGF0ZS5hY3RpdmVfcGluZ3MpO1xuICAgICAgICBsZXQgZmluaXNoZWRfcGluZ3MgPSBjbG9uZSh0aGlzLnN0YXRlLmZpbmlzaGVkX3BpbmdzKTtcbiAgICAgICAgZmluaXNoZWRfcGluZ3MucHVzaCh7XG4gICAgICAgICAgICByZWNlaXZlZDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBsYXRlbmN5OiB0aW1lLFxuICAgICAgICB9KVxuICAgICAgICBpZiAoZmluaXNoZWRfcGluZ3MubGVuZ3RoID4gMTEwMCkge1xuICAgICAgICAgICAgZmluaXNoZWRfcGluZ3MgPSBmaW5pc2hlZF9waW5ncy5zbGljZSgtMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGFjdGl2ZV9waW5nc1twaW5nX2lkXTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmVfcGluZ3M6IGFjdGl2ZV9waW5ncyxcbiAgICAgICAgICAgIGZpbmlzaGVkX3BpbmdzOiBmaW5pc2hlZF9waW5ncyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFBheWxvYWRTaXplKG5ld19zaXplKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcGF5bG9hZF9zaXplOiBuZXdfc2l6ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFBpbmdJbnRlcnZhbChpbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBpbmdfaW50ZXJ2YWw6IGludGVydmFsLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZXNldEpvYihpbnRlcnZhbCk7XG4gICAgfVxuICAgIGNhbGNTdGF0aXN0aWNzKHNvdXJjZSkge1xuICAgICAgICBsZXQgYXJyID0gc291cmNlLm1hcCgocCkgPT4gcGFyc2VJbnQocC5sYXRlbmN5KSk7XG4gICAgICAgIGFyci5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtaW46IChhcnJbMF0gLyAxMDAwKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgbWF4OiAoYXJyW2Fyci5sZW5ndGggLSAxXSAvIDEwMDApLnRvRml4ZWQoMiksXG4gICAgICAgICAgICBwNTA6IChhcnJbTWF0aC5yb3VuZCgoYXJyLmxlbmd0aCAtIDEpICogMC41MCldIC8gMTAwMCkudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHA4MDogKGFycltNYXRoLnJvdW5kKChhcnIubGVuZ3RoIC0gMSkgKiAwLjgwKV0gLyAxMDAwKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgcDk1OiAoYXJyW01hdGgucm91bmQoKGFyci5sZW5ndGggLSAxKSAqIDAuOTUpXSAvIDEwMDApLnRvRml4ZWQoMiksXG4gICAgICAgICAgICBwOTk6IChhcnJbTWF0aC5yb3VuZCgoYXJyLmxlbmd0aCAtIDEpICogMC45OSldIC8gMTAwMCkudG9GaXhlZCgyKSxcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJTdGF0KHN0YXQpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic3RhdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPk1pbjo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj57IHN0YXQubWluIH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5QNTA6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+eyBzdGF0LnA1MCB9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+UDgwOjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPnsgc3RhdC5wODAgfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlA5NTo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj57IHN0YXQucDk1IH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5QOTk6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+eyBzdGF0LnA5OSB9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+TWF4OjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPnsgc3RhdC5tYXggfTwvZGl2PlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHN0YXQxMDAgPSB0aGlzLmNhbGNTdGF0aXN0aWNzKHRoaXMuc3RhdGUuZmluaXNoZWRfcGluZ3Muc2xpY2UoLTEwMCkpO1xuICAgICAgICBsZXQgc3RhdDEwMDAgPSB0aGlzLmNhbGNTdGF0aXN0aWNzKHRoaXMuc3RhdGUuZmluaXNoZWRfcGluZ3Muc2xpY2UoLTEwMDApKTtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgIDxoMT5Db25uZWN0aW9uIHRlc3RlcjwvaDE+XG4gICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgY29ubmVjdGlvbi10ZXN0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlBheWxvYWQgc2l6ZTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNob2ljZXM9eyBbWzEwMCwgXCIxMDAgYlwiXSwgWzEwMDAsIFwiMSBLQlwiXSwgWzEwMDAwLCBcIjEwIEtCXCJdLCBbMTAwMDAwLCBcIjEwMCBLQlwiXSwgWzEwMDAwMDAsIFwiMSBNQlwiXV0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17IHRoaXMuc3RhdGUucGF5bG9hZF9zaXplIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5zZXRQYXlsb2FkU2l6ZS5iaW5kKHRoaXMpIH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5QaW5nIGludGVydmFsPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IFtbMTAwLCBcIjEwMG1zXCJdLCBbMjAwLCBcIjIwMG1zXCJdLCBbNTAwLCBcIjUwMG1zXCJdLCBbMTAwMCwgXCIxc1wiXSwgWzIwMDAsIFwiMnNcIl0sIFs1MDAwLCBcIjVzXCJdLCBbMTAwMDAsIFwiMTBzXCJdXSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlPXsgdGhpcy5zdGF0ZS5waW5nX2ludGVydmFsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5zZXRQaW5nSW50ZXJ2YWwuYmluZCh0aGlzKSB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Yj5BY3RpdmUgcGluZ3M6PC9iPiB7IE9iamVjdC5rZXlzKHRoaXMuc3RhdGUuYWN0aXZlX3BpbmdzKS5sZW5ndGggfTxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPkxhc3Rlc3QgbGF0ZW5jaWVzPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJsYXRlbmN5LWNoYXJ0XCI+PHRib2R5Pjx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZmluaXNoZWRfcGluZ3Muc2xpY2UoLTEwKS5tYXAoKHBpbmcsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9IGNsYXNzTmFtZT1cImNoYXJ0LWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJiYXJcIiArIChwaW5nLmxhdGVuY3kgPiAyMDAwID8gXCIgcmVkXCIgOiBcIlwiKSB9IHN0eWxlPXt7IGhlaWdodDogTWF0aC5taW4oTWF0aC5yb3VuZChwaW5nLmxhdGVuY3kgLyAxMCksIDIwMCkgKyBcInB4XCIgfX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IE1hdGgucm91bmQocGluZy5sYXRlbmN5IC8gMTApIC8gMTAwIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlN0YXRpc3RpY3Mgb3V0IG9mIDEwMDo8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclN0YXQoc3RhdDEwMCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlN0YXRpc3RpY3Mgb3V0IG9mIDEwMDA6PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTdGF0KHN0YXQxMDAwKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbmNsYXNzIENtcENoYWluSW1wbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gMDtcbiAgICB9XG4gICAgY21wKGEsIGIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIENtcENoYWluID0gKCkgPT4gbmV3IENtcENoYWluSW1wbCgpO1xuIiwiaW1wb3J0IHsgQ29ubmVjdGlvblRlc3RlciB9IGZyb20gXCJjbGllbnRzL2Nvbm5lY3Rpb25fdGVzdGVyL21haW5cIjtcblxuXG5SZWFjdERPTS5yZW5kZXIoXG4gICAgPENvbm5lY3Rpb25UZXN0ZXIgeyAuLi53aW5kb3cucGFnZV9wcm9wcyB9IC8+LFxuICAgIHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIilcbik7XG4iLCJpbXBvcnQgeyB0cmFuc2xhdGUsIGdldFBvc3NpYmxlVG91ck5hbWVzIH0gZnJvbSBcIi4vcnVcIjtcclxuXHJcbmV4cG9ydCB2YXIgXyA9IHRyYW5zbGF0ZTtcclxuZXhwb3J0IHZhciB0b3VyX25hbWVzID0gZ2V0UG9zc2libGVUb3VyTmFtZXMoKTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShzcmMsIGFyZykge1xyXG4gICAgZnVuY3Rpb24gY2hvb3NlRW5kaW5nKG4sIGUxLCBlMiwgZTUpIHtcclxuICAgICAgICBsZXQgeCA9IG4gJSAxMDA7XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID49IDUgfHwgeCAlIDEwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGUyO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBQSFJBU0VTID0ge1xyXG4gICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6ICh2ZXJzaW9uLCBkYXRlKSA9PiA8ZGl2IGNsYXNzTmFtZT1cImFib3V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PGI+Um9ja0p1ZGdlIHt2ZXJzaW9ufTwvYj4gKNC30LDQutGA0YvRgtCw0Y8g0LLQtdGA0YHQuNGPINC00LvRjyDQvtCz0YDQsNC90LjRh9C10L3QvdC+0LPQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjykgJm1kYXNoOyDRgdC40YHRgtC10LzQsCDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDRgNC10LfRg9C70YzRgtCw0YLQvtCyINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDQv9C+INCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC+0LzRgyDRgNC+0Lot0L0t0YDQvtC70LvRgy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JDQstGC0L7RgNGB0LrQuNC1INC/0YDQsNCy0LAg0L3QsCDRgdC40YHRgtC10LzRgyBSb2NrSnVkZ2Ug0L/QvtC70L3QvtGB0YLRjNGOINC/0YDQuNC90LDQtNC70LXQttCw0YIg0YDQsNC30YDQsNCx0L7RgtGH0LjQutGDINCQ0YDRgtC10LzRgyDQmtCw0LfQsNC60L7QstGDLiDQodC+0LDQstGC0L7RgCDRgdC40YHRgtC10LzRiyDQkNC90YLQvtC9INCQ0LzQtdC70LjQvS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0KHQuNGB0YLQtdC80LAg0YDQsNGB0L/RgNC+0YHRgtGA0LDQvdGP0LXRgtGB0Y8g0L/QviDQu9C40YbQtdC90LfQuNC4IExpbnVtIGQuby5vIChpbmZvQGxpbnVtLmhyKS4g0JTQu9GPINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsCBSb2NrSnVkZ2Ug0L3QtdC+0LHRhdC+0LTQuNC80L4g0Lgg0LTQvtGB0YLQsNGC0L7Rh9C90L4g0LjQvNC10YLRjCDQv9GA0LDQstC+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLIExpbnVtIExQUy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0J7RhNC40YbQuNCw0LvRjNC90YvQuSDRgdCw0LnRgjogPGEgaHJlZj1cImh0dHBzOi8vcm9ja2p1ZGdlLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5odHRwczovL3JvY2tqdWRnZS5jb20vPC9hPjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3Byb2dyYW1zX2FmdGVyX2NyZWF0aW9uXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLINC80L7QttC90L4g0LHRg9C00LXRgiDQtNC+0LHQsNCy0LjRgtGMINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGB0L7RhdGA0LDQvdC10L3QuNGPINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0LrQvtGA0YDQtdC60YLQvdC+INC90LDRgdGC0YDQvtC10L3QsCDQuCDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L3QsC5cIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX25vdF9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQvdC10LTQvtGB0YLRg9C/0L3QsCDQvdCwINGN0YLQvtC8INC60L7QvNC/0YzRgtC10YDQtS5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmluYWxpemVkXCI6IFwi0J7RgtGB0YPRgtGB0YLQstGD0Y7RgiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3dhcm5pbmdcIjogPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPtCk0LjQvdCw0LvQuNC30LDRhtC40Y8g0LTQvtC70LbQvdCwINC+0YLQvNC10L3Rj9GC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDQuNGB0LrQu9GO0YfQuNGC0LXQu9GM0L3Ri9GFINGB0LvRg9GH0LDRj9GFITwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QldGB0LvQuCDQttC1INGN0YLQviDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDQvdC10L7QsdGF0L7QtNC40LzQviwg0L7QsdGA0LDRgtC40YLQtSDQstC90LjQvNCw0L3QuNC1LCDRh9GC0L4g0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgdC/0LjRgdC+0Log0YPRh9Cw0YHRgtC90LjQutC+0LJcclxuICAgICAgICAgICAgICAgICAgICDRgdC70LXQtNGD0Y7RidC10LPQviDRgtGD0YDQsCDQsdGD0LTQtdGCINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC4INC/0LXRgNC10YHQvtC30LTQsNC9LiDQoNC10LfRg9C70YzRgtCw0YLRiyDRg9GH0LDRgdGC0L3QuNC60L7Qsiwg0L/RgNC+0YjQtdC00YjQuNGFINCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L/QvtGB0LvQtSDQv9C10YDQstC+0LlcclxuICAgICAgICAgICAgICAgICAgICDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INC4INC90LUg0L/RgNC+0YjQtdC00YjQuNGFINC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INCx0YPQtNGD0YIg0LHQtdC30LLQvtC30LLRgNCw0YLQvdC+INGD0YLQtdGA0Y/QvdGLITwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QmCDQvdC1INC30LDQsdGD0LTRjNGC0LUg0LfQsNC90L7QstC+INC90LDQv9C10YfQsNGC0LDRgtGMINCy0YHQtSDRgtCx0LvQuNGG0YsuPC9wPjwvZGl2PixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicHJpbnRfdGVzdF9wYWdlXCI6IFwi0J3QsNC/0LXRh9Cw0YLQsNGC0Ywg0YLQtdGB0YLQvtCy0YPRjiDRgdGC0YDQsNC90LjRhtGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlXCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlX2VtcHR5XCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/Rg9GB0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicnVsZXNcIjogXCLQl9Cw0LTQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfcGFnZVwiOiBcItCi0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3RleHRcIjogXCLQrdGC0L4g0YLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwIFJvY2tKdWRnZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfY2x1YlwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjogXCLQlNC+0LHQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9kaXNjaXBsaW5lXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3BhcnRpY2lwYW50XCI6IFwi0JTQvtCx0LDQstC40YLRjCDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3RvdXJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfbnVtYmVyc1wiOiBcItCd0L7QvNC10YDQsCDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0XCI6IFwi0K3QutGB0L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogXCLQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb1wiOiBcItCX0LDQs9GA0YPQt9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQn9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQstGB0LUg0YPRgdGC0YDQvtC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX3BsYW5cIjogXCLQodC+0YDRgtC40YDQvtCy0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtCy0LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgICAgIFwidW5jb25maXJtX3Njb3JlXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQutGB0LDRhtC40LhcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZVwiOiBcItCe0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NsdWJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDQutC70YPQsT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NvbXBldGl0aW9uXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2Rpc2NpcGxpbmVcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0LTQuNGB0YbQuNC/0LvQuNC90YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9qdWRnZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YHRg9C00YzRjj9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC/0YDQvtCz0YDQsNC80LzRgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOINGC0YPRgNCwPyDQktCy0LXQtNC40YLQtSDCq3VuZmluYWxpemXCuywg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiBcItCeINC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbGllbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LzQuCDRg9GB0YLRgNC+0LnRgdGC0LLQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfc2hvd25cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0L/QviDRgdC70LXQtNGD0Y7RidC40Lwg0LrQu9GD0LHQsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2luZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDRgtGD0YDQvdC40YDQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX21hbmFnZW1lbnRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQtNC40YHRhtC40L/Qu9C40L3QsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRfY29tcGV0aXRpb25cIjogXCLQrdC60YHQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LAg0Lgg0YDQtdC30YPQu9GM0YLQsNGC0L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfY29tcGV0aXRpb25cIjogXCLQmNC80L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTQtdC50YHQutCw0Y8g0LHRgNC40LPQsNC00LBcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9iYXRpY3NcIjogXCLQl9Cw0LPRgNGD0LfQutCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YPRh9Cw0YHRgtC90LjQutCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX21lbnVcIjogXCLQodC10YDQstC40YHQvdC+0LUg0LzQtdC90Y5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX2xpc3RcIjogXCLQodC/0LjRgdC+0Log0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2RhdGVcIjogXCLQlNCw0YLQsCDQv9GA0L7QstC10LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9uYW1lXCI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc1wiOiBcItCU0LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Rpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maWxlc19zZWxlY3RlZFwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LsuLi5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fcHJvZ3JhbV9sb2FkZWRcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQvdC1INC30LDQs9GA0YPQttC10L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNcIjogXCLQo9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFzdGVfYWNyb1wiOiBcItCS0YHRgtCw0LLRjNGC0LUg0LTQsNC90L3Ri9C1INC40Lcg0LrQsNC70YzQutGD0LvRj9GC0L7RgNCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zcG9ydHNtZW5fb25seVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDRgdC/0L7RgNGC0YHQvNC10L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3VtbWFyeVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDQutC+0LvQuNGH0LXRgdGC0LLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJcIjogXCLQt9Cw0L9cIiwgIC8vIHN1YnN0aXR1dGVcclxuICAgICAgICAgICAgICAgIFwidG91cnNcIjogXCLQotGD0YDRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9wYXNzY29kZVwiOiBcItCS0LLQtdC00ZHQvSDQvdC10LLQtdGA0L3Ri9C5INC60L7QtCDQv9C+0YLQstC10YDQttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZW51XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jbHVic1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfZGlzY2lwbGluZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2p1ZGdlc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9wYXJ0aWNpcGFudHNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC/0L7RgNGC0YHQvNC10L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3RvdXJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YLRg9GA0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibl9wYXJ0aWNpcGFudHNcIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuXCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQv9Cw0YHQvSR7IGNob29zZUVuZGluZyhzLCBcItC+0LlcIiwgXCLRi9GFXCIsIFwi0YvRhVwiKSB9KWAgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5fc2hvcnRcIjogKG4sIHMpID0+IG4udG9TdHJpbmcoKSArIFwiINGB0L/QvtGA0YLRgdC80LXQvVwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpICsgKHMgPiAwID8gYCAoKyR7c30g0LfQsNC/LilgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX25fcGFydGljaXBhbnRzXCI6IG4gPT4gXCLQmNGC0L7Qs9C+IFwiICsgbiArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnaW5nLXRhYnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b3VyLWFkbWluXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmUtcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVycm9yc1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3N5bnRheF9lcnJvclwiOiBcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0LTQsNC90L3Ri9GFXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXBpXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZHVwbGljYXRlZF9leHRlcm5hbF9pZFwiOiBcItCSINC00LDQvdC90YvRhSDQuNC80LXRjtGC0YHRjyDQt9Cw0L/QuNGB0Lgg0YEg0L/QvtCy0YLQvtGA0Y/RjtGJ0LjQvNC40LzRgdGPIGV4dGVybmFsX2lkXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuYWJsZV90b19nZXRcIjogKHdhbnRlZCkgPT4gXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C+0LvRg9GH0LjRgtGMIFwiICsgd2FudGVkICsgXCIg0LjQtyDQt9Cw0L/RgNC+0YHQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQutC70YPQsSwg0Log0LrQvtGC0L7RgNC+0LzRgyDQv9GA0LjQstGP0LfQsNC90Ysg0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfbm9uX2VtcHR5XCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1LCDRgdC+0LTQtdGA0LbQsNGJ0LXQtSDQtNC40YHRhtC40L/Qu9C40L3Riywg0LrQu9GD0LHRiyDQuNC70Lgg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b29fbWFueV90b3Vyc1wiOiAoZCkgPT4gW1wi0J7RiNC40LHQutCwINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIiwgYNCSINC00LjRgdGG0LjQv9C70LjQvdC1ICR7ZH0g0YHQvtC00LXRgNC20LjRgtGB0Y8g0LHQvtC70YzRiNC1INGC0YPRgNC+0LIsINGH0LXQvCDRgdC+0LfQtNCw0L3QviDQsiDRgdC40YHRgtC10LzQtWBdLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2Rpc2NpcGxpbmVfZm91bmRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YssINC+0YLRgdGD0YLRgdGC0LLRg9GO0YnQuNC1INCyINGB0LjRgdGC0LXQvNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNoYW5nZV9qdWRnZXNfd2l0aF9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHQvtGB0YLQsNCyINGB0YPQtNC10Lkg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLLCDRgdC+0LTQtdGA0LbQsNGJ0LXQuSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBlYXRpbmdfanVkZ2VcIjogKG5hbWUpID0+IG5hbWUgKyBcIiDQstGB0YLRgNC10YfQsNC10YLRgdGPINCyINGB0L/QuNGB0LrQtSDRgdGD0LTQtdC5INCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGA0LDQt9CwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxfc2VydmVyX2Vycm9yXCI6IFtcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1XCIsIFwi0L/RgNC+0LLQtdGA0YzRgtC1INC70L7Qs9C4INC00LvRjyDQuNC90YTQvtGA0LzQsNGG0LjQuFwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2Rpc2NpcGxpbmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0LLRhdC+0LTRj9GJ0LXQs9C+INCyINGB0YPQtNC10LnRgdC60YPRjiDQsdGA0LjQs9Cw0LTRgyDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsCwg0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0YXQvtGC0Y8g0LHRiyDQsiDQvtC00L3QvtC8INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJydW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXRfcGVyZm9ybWVkX2ZsYWdfb25fZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGF0L7QtNCwINGE0LjQvdCw0LvQuNC30LjQvdC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNjb3JlX25vdF9leGlzdFwiOiBcItCf0L7Qv9GL0YLQutCwINC/0L7Qu9GD0YfQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC5INC+0YbQtdC90LrQuCDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgtGD0YAsINC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RidC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Njb3Jpbmdfc3lzdGVtXCI6IFwi0JLRi9Cx0YDQsNC90LAg0L3QtdC00L7Qv9GD0YHRgtC40LzQsNGPINGB0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3RvX25vbl9lbXB0eVwiOiAoZCkgPT4gW1wi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNCz0YDRg9C30LjRgtGMINGC0YPRgNGLINC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLCBg0JTQuNGB0YbQuNC/0LvQuNC90LAgJHtkfSDRg9C20LUg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRi2BdLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfZmluYWxpemVkXCI6IFwi0JTQu9GPINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LAg0L3QtSDQtNC+0L/Rg9GB0LrQsNC10YLRgdGPINC40LfQvNC10L3QtdC90LjQtSDQutCy0L7RgtGLINCy0YvQstC+0LTQsCwg0YLQuNC/0LAg0YLRg9GA0LAg0LjQu9C4INGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZVwiOiBcItCj0LTQsNC70LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2F2ZVwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGluZ1wiOiBcItCf0L7QtNC60LvRjtGH0LXQvdC40LUg0Log0YHQtdGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9wcm9ibGVtXCI6IFwi0J/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInllc1wiOiBcItCU0LBcIixcclxuICAgICAgICAgICAgICAgIFwibm9cIjogXCLQndC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fZXJyb3JcIjogXCLQn9C+0YXQvtC20LUsINC40LzQtdGO0YLRgdGPINC/0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlcnJvcl9oZWFkZXJcIjogXCLQntGI0LjQsdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiBcItCe0L/QtdGA0LDRhtC40Y8g0YPRgdC/0LXRiNC90L4g0LfQsNCy0LXRgNGI0LXQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYXRfblwiOiAobikgPT4gXCLQl9Cw0YXQvtC0IOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZV9uXCI6IChuKSA9PiBcItCb0LjQvdC10LnQvdGL0Lkg0YHRg9C00YzRjyDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfblwiOiAobiwgbmFtZSwgbl9zcCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAobl9zcCA+IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCk0L7RgNC80LXQudGI0L0g4oSWXCIgKyBuLnRvU3RyaW5nKCkgKyAobmFtZSA/IFwiOiBcIiArIG5hbWUgOiBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChuX3NwID09PSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwi0J/QsNGA0LAg4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCLQo9GH0LDRgdGC0L3QuNC6IOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKyBuLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdpbmdcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdF9hY3JvYmF0aWNfb3ZlcnJpZGVcIjogXCLQmNC30LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQntGB0YLQsNC90L7QstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00Ys/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwib2xkX3Njb3JlXCI6IFwi0JHQsNC30LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb2RlbHNcIjoge1xyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQtNC70Y8g0L/RgNC+0YLQvtC60L7Qu9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJ1bGVzX3NldFwiOiBcItCh0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5faXRlbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2VfbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcIlRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C7XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGFXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlc19sZWdlbmRcIjogKFxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LTEwMFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JPQuyDigJQg0LPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KIg4oCUINGB0YPQtNGM0Y8g0YLQsNC90YbQsDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JAg4oCUINGB0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60Lg8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCiZXgg4oCUINGC0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCLQmtCw0YLQtdCz0L7RgNC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC9LiBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KQuINCYLiDQni5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwi0KDQvtC70Ywg0LIg0YHRg9C00LXQudGB0YLQstC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVfZGVzY3JpcHRpb25cIjogXCLQlNC+0LvQttC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvbnNcIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX25hbWVcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX2NpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX25hbWVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwi0JjQvNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlclwiOiBcItCf0L7Qu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfZlwiOiBcItCWXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9tXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZXJhbF9pbmZvXCI6IFwi0J7RgdC90L7QstC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQvtC80LDQvdC00Ysg0YTQvtGA0LzQtdC50YjQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCLQpNCw0LzQuNC70LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByb2dyYW1zXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21hblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX25cIjogXCLQntGB0L0uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfeVwiOiBcItCX0LDQvy5cIixcclxuICAgICAgICAgICAgICAgIFwieWVhcl9vZl9iaXJ0aFwiOiBcItCT0L7QtCDRgNC+0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInlvYlwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2dyYW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X2ZvclwiOiBcItCf0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X3Byb2dyYW1cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19ob3BlX3RvdXJcIjogXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bV9hZHZhbmNlc1wiOiBcItCa0LLQvtGC0LAg0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19wZXJfaGVhdFwiOiBcItCj0YfQsNGB0YLQvdC40LrQvtCyINCyINC30LDRhdC+0LTQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY29yaW5nX3N5c3RlbV9uYW1lXCI6IFwi0KHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2hlYXRcIjogXCLQodCx0YDQvtGBINC90L7QvNC10YDQsCDQt9Cw0YXQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfcGxhY2VcIjogXCLQodCx0YDQvtGBINC80LXRgdGC0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlc1wiOiBcItCc0LXRgdGC0LAg0LTQu9GPINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInByZXNlbnRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2JlZ2lubmluZ1wiOiBcItCd0LDRh9Cw0LvQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfZHVyYXRpb25cIjogXCLQlNC70LjRgi5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fYWN0aXZlX3RvdXJcIjogXCLQndC10YIg0LDQutGC0LjQstC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFzZV9uYW1lXCI6IFwi0KDQvtGB0KTQkNCg0KBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuXHJcbmNsYXNzIEFwaUltcGwge1xyXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gKG1zZywgY29kZSwgYXJncykgPT4gc2hvd0Vycm9yKGNvZGUgPyBfKGNvZGUsIC4uLmFyZ3MpIDogbXNnKTtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSAoLi4uZGF0YSkgPT4gY29uc29sZS5lcnJvcihcIkFQSSBmYWlsXCIsIC4uLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uU3VjY2VzcyhjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25FcnJvcihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRmFpbChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkVG9EQihtb2RlbF90eXBlLCBtb2RlbF9pZCwgc3Q9c3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbmQoKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfZGIocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9zdWNjZXNzKHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZXJyb3IocmVzcG9uc2UubWVzc2FnZSwgcmVzcG9uc2UuY29kZSwgcmVzcG9uc2UuYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuY2xpZW50X2lkKSB7XHJcbiAgICAgICAgICAgIGRhdGEuYXBwZW5kKFwiY2xpZW50X2lkXCIsIHdpbmRvdy5jbGllbnRfaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLmFwcGVuZChcImRhdGFcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKSk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJtZXRob2RcIiwgdGhpcy5tZXRob2QpO1xyXG4gICAgICAgIHhoci5zZW5kKGRhdGEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIEFwaSA9ICguLi5hcmdzKSA9PiBuZXcgQXBpSW1wbCguLi5hcmdzKTtcclxuZXhwb3J0IGRlZmF1bHQgQXBpO1xyXG4iLCJpbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25fc3RhdHVzIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlRGlzcGF0Y2hlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNfY250ID0gMDtcclxuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIHdlYnNvY2tldC4uLlwiKTtcclxuICAgICAgICB0aGlzLndzID0gbmV3IFNvY2tKUyhcImh0dHA6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvd3NcIik7XHJcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0T2soKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQuXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbW1wicmVsb2FkX2RhdGFcIiwgbnVsbF1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbF91cGRhdGVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0RmFpbCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gY2xvc2VkLlwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY29ubmVjdC5iaW5kKHRoaXMpLCA1MDApO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbk1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhW1wiY2xpZW50X2lkXCJdKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGllbnRfaWQgPSBkYXRhW1wiY2xpZW50X2lkXCJdO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEubWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBtc2dfdHlwZSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIGxldCBtc2dfZGF0YSA9IGRhdGFbMV07XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge307XHJcbiAgICAgICAgICAgIGlmIChtc2dfdHlwZSA9PT0gXCJmb3JjZV9yZWZyZXNoXCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9KS5mb3JFYWNoKChrZXkpID0+IGxpc3RlbmVyc1trZXldKG1zZ19kYXRhKSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgZGF0YS5tb2RlbF91cGRhdGVzLmZvckVhY2goKG1vZGVsX2luZm8pID0+IHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gc3RvcmFnZS51cGRhdGVNb2RlbChtb2RlbF9pbmZvLm1vZGVsLCBtb2RlbF9pbmZvLmlkLCBtb2RlbF9pbmZvLmRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZGF0YV9jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tcImRiX3VwZGF0ZVwiXSB8fCB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldExpc3RlbmVySWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzX2NudCsrO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXIobXNnX3R5cGVzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuZ2V0TGlzdGVuZXJJZCgpO1xyXG4gICAgICAgIG1zZ190eXBlcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihtc2dfdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW21zZ190eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdW2lkXSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJfaWQpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW2tleV1bbGlzdGVuZXJfaWRdO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5pZiAoIXdpbmRvdy5tZXNzYWdlX2Rpc3BhdGNoZXIpIHtcclxuICAgIHdpbmRvdy5tZXNzYWdlX2Rpc3BhdGNoZXIgPSBuZXcgTWVzc2FnZURpc3BhdGNoZXIoKTtcclxufVxyXG5leHBvcnQgdmFyIG1lc3NhZ2VfZGlzcGF0Y2hlciA9IHdpbmRvdy5tZXNzYWdlX2Rpc3BhdGNoZXI7XHJcbiIsImNsYXNzIFJlZiB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lLCBpZCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5tb2RlbF9uYW1lKS5ieV9pZCh0aGlzLmlkKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgaWQsIG1vZGVsX3N0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fX3N0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXMgPSB7fTtcclxuICAgICAgICB0aGlzLl9fbW9kZWxfc3RvcmFnZSA9IG1vZGVsX3N0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGRCYWNrUmVmKGtleSwgcmVmKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gcmVmO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGRhdGEsIGNyZWF0ZT10cnVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkeCkpIHtcclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiIHx8IGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZSAmJiB0eXBlb2YgdGhpc1tpZHguc2xpY2UoMSldID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIHRoaXMuX19tb2RlbF9zdG9yYWdlLm1vZGVsX25hbWUsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmX2tleSA9IGRhdGFbaWR4XS5iYWNrX3JlZjtcclxuICAgICAgICAgICAgICAgIGRhdGFbaWR4XS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKG5lc3RlZF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YS5kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmLmdldCgpLmFkZEJhY2tSZWYoYmFja19yZWZfa2V5LCBiYWNrX3JlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldLnB1c2gocmVmKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIipcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRfZGF0YSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2lkeF0gPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2lkeF0gPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VyaWFsaXplKHNjaGVtYSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9fa2V5X3R5cGVzKSBpZiAodGhpcy5fX2tleV90eXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fX2tleV90eXBlc1trZXldKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLm1hcChmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZi5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJeXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5pZCA9IHRoaXMuaWRcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbHNTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMubW9kZWxzID0ge307XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZChpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbHNbaWRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXSA9IG5ldyBNb2RlbCh0aGlzLnN0b3JhZ2UsIGlkLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsc1tpZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBieV9pZChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpZF07XHJcbiAgICB9XHJcbiAgICBhbGwoKSB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1vZGVscyk7XHJcbiAgICAgICAgcmV0dXJuIGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNba2V5XTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlcyA9IHt9XHJcbiAgICAgICAgdGhpcy5kb21haW5zID0ge31cclxuICAgIH1cclxuICAgIGdldERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZG9tYWluc1tkb21haW5dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tYWluc1tkb21haW5dID0gbmV3IFN0b3JhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZGVsRG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGdldChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPSBuZXcgTW9kZWxzU3RvcmFnZSh0aGlzLCBtb2RlbF9uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICBkZWwobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTW9kZWwobW9kZWxfdHlwZSwgbW9kZWxfaWQsIGRhdGEpIHtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfdHlwZV0pIHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCBkYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZG9tYWlucykuZm9yRWFjaCgoa2V5KSA9PlxyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmRvbWFpbnNba2V5XS51cGRhdGVNb2RlbCguLi5hcmd1bWVudHMpIHx8IGRhdGFfY2hhbmdlZCk7XHJcbiAgICAgICAgLy8gcmV0dXJuIGRhdGFfY2hhbmdlZDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBzdHlsZT17eyBcImhlaWdodFwiOiBcIjEwMCVcIiwgXCJ3aWR0aFwiOiBcIjEwMCVcIiB9fT48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIiB9fT5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9pbWcvYWpheC1sb2FkZXIuZ2lmXCIgLz5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1c01vY2sge1xyXG4gICAgc2V0T2soKSB7fVxyXG4gICAgc2V0RmFpbCgpIHt9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgXCJjb25uZWN0ZWRcIjogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdGlvbl9zdGF0dXNcIik7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgJiYgIWVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICAgICAgICAgICAgICA8Q29ubmVjdGlvblN0YXR1cyAvPixcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uU3RhdHVzTW9jaygpO1xyXG4gICAgfVxyXG4gICAgc3RhcnRJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB0aWNrOiAhdGhpcy5zdGF0ZS50aWNrLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA3NTApO1xyXG4gICAgfVxyXG4gICAgc3RvcEludGVydmFsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldE9rKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3RlZDogdHJ1ZSwgdGljazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRGYWlsKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb25uZWN0aW9uLXN0YXR1cyBva1wiPjwvZGl2PlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgYWxlcnQtd2FybmluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5sYWJlbHMuY29ubmVjdGluZ1wiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiY29ubmVjdGlvbi1zdGF0dXMgYWxlcnQtZGFuZ2VyXCIgKyAodGhpcy5zdGF0ZS50aWNrID8gXCIgdGlja1wiIDogXCJcIikgfT5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3Rpb25fcHJvYmxlbVwiKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBjb25uZWN0aW9uX3N0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuaW5pdCgpO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcclxuICAgIGxldCB0aXRsZSA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1swXSA6IF8oXCJnbG9iYWwubWVzc2FnZXMuZXJyb3JfaGVhZGVyXCIpO1xyXG4gICAgbGV0IHRleHQgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMV0gOiBtc2c7XHJcbiAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICB0eXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XHJcbiAgICByZXR1cm4gc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIiksXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXHJcbiAgICAgICAgY2xvc2VPbkNvbmZpcm06IGNsb3NlX29uX2NvbmZpcm0sXHJcbiAgICB9LCBhY3Rpb24pO1xyXG59XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaE9yQ2xpY2soaGFuZGxlcikge1xyXG4gICAgbGV0IGYgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVyKGV2ZW50KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uVG91Y2hTdGFydDogZixcclxuICAgICAgICBvbkNsaWNrOiBmLFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaEVuZE9yQ2xpY2soaGFuZGxlciwgcHJldmVudF9kZWZhdWx0KSB7XHJcbiAgICBsZXQgX2hhbmRsZXIgPSAoKSA9PiB7fTtcclxuICAgIGxldCBkaXN0YW5jZSA9IDA7XHJcbiAgICBsZXQgbGF0ZXN0X3BvcyA9IFswLCAwXTtcclxuICAgIGxldCBmaXJlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gX2hhbmRsZXIoKTtcclxuICAgIH1cclxuICAgIGxldCBkaXNjYXJkID0gKCkgPT4ge1xyXG4gICAgICAgIF9oYW5kbGVyID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBsZXQgbW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBjdXJyZW50X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcclxuICAgICAgICBsZXQgc3FyID0gKHgpID0+IHggKiB4O1xyXG4gICAgICAgIGRpc3RhbmNlICs9IE1hdGguc3FydChzcXIoY3VycmVudF9wb3NbMF0gLSBsYXRlc3RfcG9zWzBdKSArIHNxcihjdXJyZW50X3Bvc1sxXSAtIGxhdGVzdF9wb3NbMV0pKTtcclxuICAgICAgICBsYXRlc3RfcG9zID0gY3VycmVudF9wb3M7XHJcbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMjApIHtcclxuICAgICAgICAgICAgZGlzY2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBzdGFydCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcclxuICAgICAgICBkaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgbGF0ZXN0X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBzdGFydCxcclxuICAgICAgICBvblRvdWNoRW5kOiBmaXJlLFxyXG4gICAgICAgIG9uVG91Y2hNb3ZlOiBtb3ZlLFxyXG4gICAgICAgIG9uVG91Y2hDYW5jZWw6IGRpc2NhcmQsXHJcbiAgICAgICAgb25DbGljazogaGFuZGxlcixcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNsaWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb25lOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICAgICAgZG9uZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIHNsaWRlVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgb25BY3RpdmF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucGluID0gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmRvbmUgJiYgbmV4dFByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlzRnJlZSgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUudG91Y2ggJiYgIXRoaXMucHJvcHMuZG9uZSAmJiAhdGhpcy5zdGF0ZS5maW5pc2hlZDtcclxuICAgIH1cclxuICAgIGdldE91dGVyVGV4dE9wYWNpdHkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgubWluKE1hdGgubWF4KDEwMCAtIHRoaXMuc3RhdGUucG9zaXRpb24sIDApLCAxMDApO1xyXG4gICAgICAgIHJldHVybiAodmFsdWUgLyAxMDApLnRvRml4ZWQoMyk7XHJcbiAgICB9XHJcbiAgICBnZXRFbGVtZW50T2Zmc2V0KGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgcmVzID0gMDtcclxuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXMgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBnZXRUb3VjaChldmVudCkge1xyXG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XHJcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xyXG4gICAgfVxyXG4gICAgZ2V0UmVsYXRpdmVUb3VjaChldmVudCkge1xyXG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XHJcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcclxuICAgIH1cclxuICAgIGdldFNsaWRlclBvcyhldmVudCkge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmdldFRvdWNoKGV2ZW50KSAtIHRoaXMucGluO1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCAyMDApO1xyXG4gICAgfVxyXG4gICAgb25DbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwb3Npc2lvbjogMjAwLFxyXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gICAgb25Ub3VjaFN0YXJ0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBpbiA9IHRoaXMuZ2V0UmVsYXRpdmVUb3VjaChldmVudCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXHJcbiAgICAgICAgICAgIHRvdWNoOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb25Ub3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb25Ub3VjaEVuZCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucG9zaXRpb24gPT09IDIwMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyIG5vc2VsZWN0XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImlubmVyXCIgKyAodGhpcy5pc0ZyZWUoKSA/IFwiIGZyZWVcIiA6IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogKHRoaXMucHJvcHMuZG9uZSB8fCB0aGlzLnN0YXRlLmZpbmlzaGVkKSA/IFwiMjAwcHhcIiA6IHRoaXMuc3RhdGUucG9zaXRpb24gKyBcInB4XCIgfX1cclxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IHRoaXMub25Ub3VjaFN0YXJ0IH1cclxuICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsgdGhpcy5vblRvdWNoTW92ZSB9XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXsgdGhpcy5vblRvdWNoRW5kIH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLm9uQ2xpY2sgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICDihpJcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lXHJcbiAgICAgICAgICAgICAgICA/IDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiKDEwMCwxMDAsMTAwKVwiIH19XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJkb25lLXRleHRcIiB9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVUZXh0IH1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDogPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2JhKDEwMCwxMDAsMTAwLFwiICsgdGhpcy5nZXRPdXRlclRleHRPcGFjaXR5KCkgKyBcIilcIiB9fVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwic2xpZGUtdGV4dFwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKSB9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNsaWRlVGV4dCB9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRTZWxlY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBjaG9pY2VzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgcm93U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICAgICAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXRCdXR0b25zQ291bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvd1NpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgb25DbGljayhuKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKG4pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnByb3BzLmNob2ljZXMuZm9yRWFjaCgoZWwsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gZWxbMF07XHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZWxbMV07XHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVfY2xhc3NfbmFtZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSBrZXkpID8gXCIgYWN0aXZlXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBrZXkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uQ2xpY2suYmluZCh0aGlzLCBrZXkpKX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInRidG4gc2NvcmUtYnRuXCIgKyBhY3RpdmVfY2xhc3NfbmFtZSB9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge3RleHR9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj4pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIgJiYgKGlkeCArIDEpICUgdGhpcy5wcm9wcy5yb3dTaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCg8YnIga2V5PXsgXCJiclwiICsgaWR4IH0gLz4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbGF5b3V0X2NsYXNzID0gKHRoaXMucHJvcHMuc3R5bGUgIT09IFwidHdvLWxpbmVzXCIpID8gXCJzZWxlY3Rvci1sYXlvdXRcIiA6IFwic2VsZWN0b3ItbGF5b3V0LTJyb3dzXCI7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkX2NsYXNzID0gdGhpcy5wcm9wcy52YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiBcIiBzZWxlY3RlZFwiXHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcInNjb3JpbmctbGF5b3V0IFwiICsgbGF5b3V0X2NsYXNzICsgc2VsZWN0ZWRfY2xhc3MgKyBcIiBuLVwiICsgdGhpcy5nZXRCdXR0b25zQ291bnQoKS50b1N0cmluZygpIH0+eyByZXN1bHQgfTwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlclNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gbWluOyBpZHggPD0gbWF4OyArK2lkeCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChbaWR4LCBpZHgudG9TdHJpbmcoKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cclxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1U2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjcmVhdGVBcnJheShtaW4sIG1heCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSBNYXRoLnJvdW5kKDIgKiBtaW4pOyBpZHggPD0gTWF0aC5yb3VuZCgyICogbWF4KTsgKytpZHgpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCAvIDIsIChpZHggJSAyKSA/IChpZHggLyAyKS50b0ZpeGVkKDEpIDogTWF0aC5mbG9vcihpZHggLyAyKS50b1N0cmluZygpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmNyZWF0ZUFycmF5KHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCkgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTWludXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTF9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uUGx1cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAxfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtaW50ZWdlci1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbk1pbnVzLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMuYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgK1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldEFjcm9PdmVycmlkZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9yaWdpbmFsX3ZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNlbmRfZGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VuZF9kZWx0YXM6IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTWludXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZF9kZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IC0wLjV9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoTWF0aC5tYXgodGhpcy5wcm9wcy52YWx1ZSAtIDAuNSwgMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uUGx1cyA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kX2RlbHRhcykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMC41fSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKE1hdGgubWluKHRoaXMucHJvcHMudmFsdWUgKyAwLjUsIHRoaXMucHJvcHMub3JpZ2luYWxfdmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblplcm8gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKDApO1xyXG4gICAgfVxyXG4gICAgb25SZXN0b3JlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLm9yaWdpbmFsX3ZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgdmFsdWVfY2hhbmdlZCA9IE1hdGguYWJzKHRoaXMucHJvcHMudmFsdWUgLSB0aGlzLnByb3BzLm9yaWdpbmFsX3ZhbHVlKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1hY3JvLW92ZXJyaWRlLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXplcm9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMudmFsdWUgPCAwLjA1IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25aZXJvKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOKGkzBcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc3RvcmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHZhbHVlX2NoYW5nZWQgPCAwLjA1IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25SZXN0b3JlKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOKGkVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tbWludXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMudmFsdWUgPCAwLjA1IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmbWludXM7XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLm9yaWdpbmFsX3ZhbHVlIDwgdGhpcy5wcm9wcy52YWx1ZSArIDAuMDUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMpfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgK1xyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZV9jaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7dGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZS50b0ZpeGVkKDEpfSDihpIgJHt0aGlzLnByb3BzLnZhbHVlLnRvRml4ZWQoMSl9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMudmFsdWUudG9GaXhlZCgxKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG52YXIgc3RvcHdhdGNoZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9wV2F0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcmVfaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSB8fCB7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICBzdHJfdmFsdWU6IFwiMDowMFwiLFxyXG4gICAgICAgICAgICBpbnRlcnZhbDogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlyZWN0LW11dGF0aW9uLXN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcclxuICAgICAgICBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSA9IHRoaXMuc3RhdGU7XHJcbiAgICB9XHJcbiAgICBub3coKSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcbiAgICB0b2dnbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPyB0aGlzLnN0b3AoKSA6IHRoaXMuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIHN0YXJ0X2F0OiB0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS52YWx1ZSxcclxuICAgICAgICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZVxyXG4gICAgICAgICAgICA/ICh0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS5zdGFydF9hdClcclxuICAgICAgICAgICAgOiB0aGlzLnN0YXRlLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGljaygpIHtcclxuICAgICAgICB2YXIgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZSgpO1xyXG4gICAgICAgIGlmIChuZXdfdmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwYWQobnVtLCBzaXplKSB7XHJcbiAgICAgICAgdmFyIHMgPSBcIjAwMDBcIiArIG51bS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBzLnN1YnN0cihzLmxlbmd0aCAtIHNpemUpO1xyXG4gICAgfVxyXG4gICAgZ2V0U3RyVmFsdWUoKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWUoKTtcclxuICAgICAgICB2YXIgbSA9IDAsIHMgPSAwO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgICAgICBtID0gTWF0aC5mbG9vcih2YWwgLyAoNjAgKiAxMDAwKSk7XHJcbiAgICAgICAgdmFsICU9IDYwICogMTAwMDtcclxuICAgICAgICBzID0gTWF0aC5mbG9vcih2YWwgLyAxMDAwKTtcclxuICAgICAgICByZXR1cm4gbS50b1N0cmluZygpICsgJzonICsgdGhpcy5wYWQocywgMik7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdG9wd2F0Y2hcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1yZXNldCBpZ25vcmUtcmVhZG9ubHlcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnJlc2V0LmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnJlc2V0X3N0b3B3YXRjaFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInRidG4gYnRuLXRvZ2dsZSBpZ25vcmUtcmVhZG9ubHlcIiArICh0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuYWN0aXZlID8gXyhcInRhYmxldC5idXR0b25zLnN0b3Bfc3RvcHdhdGNoXCIpIDogXyhcInRhYmxldC5idXR0b25zLnN0YXJ0X3N0b3B3YXRjaFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRTdHJWYWx1ZSgpIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuIl19
