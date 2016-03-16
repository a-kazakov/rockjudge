(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.ConnectionTester = undefined;

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

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

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

    ConnectionTester.prototype.resetJob = function resetJob(interval) {
        if (this.job) {
            clearInterval(this.job);
        }
        this.job = setInterval(this.ping.bind(this), interval || this.state.ping_interval);
    };

    ConnectionTester.prototype.ping = function ping() {
        var ping_id = Math.random().toString();
        var new_state = (0, _tools.clone)(this.state.active_pings);
        new_state[ping_id] = new Date().getTime();
        this.setState({
            active_pings: new_state,
            latest_sent: new Date().getTime()
        });
        (0, _api.Api)("service.ping", { ping_id: ping_id, payload_size: this.state.payload_size }).send();
    };

    ConnectionTester.prototype.onPingReply = function onPingReply(response) {
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
    };

    ConnectionTester.prototype.setPayloadSize = function setPayloadSize(new_size) {
        this.setState({
            payload_size: new_size
        });
    };

    ConnectionTester.prototype.setPingInterval = function setPingInterval(interval) {
        this.setState({
            ping_interval: interval
        });
        this.resetJob(interval);
    };

    ConnectionTester.prototype.calcStatistics = function calcStatistics(source) {
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
    };

    ConnectionTester.prototype.renderStat = function renderStat(stat) {
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
    };

    ConnectionTester.prototype.render = function render() {
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
    };

    return ConnectionTester;
}(React.Component);

},{"common/tools":2,"server/api":6,"server/message_dispatcher":7,"ui/tablet_components":11}],2:[function(require,module,exports){
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

var _main = require("clients/connection_tester/main");

ReactDOM.render(React.createElement(_main.ConnectionTester, window.page_props), window.document.getElementById("content"));

},{"clients/connection_tester/main":1}],4:[function(require,module,exports){
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

},{"i10n/loader":4}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.StopWatch = exports.TabletPoint5Input = exports.TabletIntegerInput = exports.TabletPoint5SelectInput = exports.TabletIntegerSelectInput = exports.TabletSelectorInput = exports.Slider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.onTouchOrClick = onTouchOrClick;
exports.onTouchEndOrClick = onTouchEndOrClick;

var _loader = require("i10n/loader");

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

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            position: 0,
            touch: false,
            finished: false
        };
        _this.pin = null;
        return _this;
    }

    Slider.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
        if (!this.props.done && nextProps.done) {
            this.setState({
                finished: false
            });
        }
    };

    Slider.prototype.isFree = function isFree() {
        return !this.state.touch && !this.props.done && !this.state.finished;
    };

    Slider.prototype.getOuterTextOpacity = function getOuterTextOpacity() {
        if (this.state.finished) {
            return 0;
        }
        var value = Math.min(Math.max(100 - this.state.position, 0), 100);
        return (value / 100).toFixed(3);
    };

    Slider.prototype.getElementOffset = function getElementOffset(element) {
        var res = 0;
        while (element) {
            res += element.offsetLeft || 0;
            element = element.parentNode;
        }
        return res;
    };

    Slider.prototype.getTouch = function getTouch(event) {
        var touch = event.touches[0];
        var parent = event.target.parentNode;
        return touch.pageX - this.getElementOffset(parent);
    };

    Slider.prototype.getRelativeTouch = function getRelativeTouch(event) {
        var touch = event.touches[0];
        var parent = event.target;
        return touch.pageX - this.getElementOffset(parent);
    };

    Slider.prototype.getSliderPos = function getSliderPos(event) {
        var pos = this.getTouch(event) - this.pin;
        return Math.min(Math.max(pos, 0), 200);
    };

    Slider.prototype.onClick = function onClick(event) {
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            posision: 200,
            touch: false,
            finished: true
        });
        this.props.onActivate();
    };

    Slider.prototype.onTouchStart = function onTouchStart(event) {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.pin = this.getRelativeTouch(event);
        this.setState({
            position: this.getSliderPos(event),
            touch: true
        });
    };

    Slider.prototype.onTouchMove = function onTouchMove(event) {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            position: this.getSliderPos(event)
        });
    };

    Slider.prototype.onTouchEnd = function onTouchEnd(event) {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        if (this.state.position === 200) {
            this.setState({
                position: 0,
                finished: true,
                touch: false
            });
            this.props.onActivate();
        } else {
            this.setState({
                position: 0,
                touch: false
            });
        }
    };

    Slider.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "slider noselect" },
            React.createElement(
                "div",
                { className: "inner" + (this.isFree() ? " free" : ""),
                    style: { left: this.props.done || this.state.finished ? "200px" : this.state.position + "px" },
                    onTouchStart: this.onTouchStart.bind(this),
                    onTouchMove: this.onTouchMove.bind(this),
                    onTouchEnd: this.onTouchEnd.bind(this),
                    onClick: this.onClick.bind(this)
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
    };

    return Slider;
}(React.Component);

var TabletSelectorInput = exports.TabletSelectorInput = function (_React$Component2) {
    _inherits(TabletSelectorInput, _React$Component2);

    function TabletSelectorInput() {
        _classCallCheck(this, TabletSelectorInput);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    TabletSelectorInput.prototype.getButtonsCount = function getButtonsCount() {
        if (this.props.style === "grid") {
            return this.props.row_size;
        }
        return this.props.choices.length;
    };

    TabletSelectorInput.prototype.onClick = function onClick(n) {
        this.props.onValueUpdate(n);
    };

    TabletSelectorInput.prototype.render = function render() {
        var _this3 = this;

        var result = [];
        this.props.choices.forEach(function (el, idx) {
            var key = el[0];
            var text = el[1];
            var active_class_name = _this3.props.active === key ? " active" : "";
            result.push(React.createElement(
                "button",
                _extends({
                    key: key
                }, onTouchOrClick(_this3.onClick.bind(_this3, key)), {
                    className: "tbtn score-btn" + active_class_name
                }),
                text
            ));
            if (_this3.props.style === "grid" && (idx + 1) % _this3.props.row_size === 0) {
                result.push(React.createElement("br", { key: "br" + idx }));
            }
        });
        var layout_class = this.props.style !== "two-lines" ? "selector-layout" : "selector-layout-2rows";
        var selected_class = this.props.active === null ? "" : " selected";
        return React.createElement(
            "div",
            { className: "scoring-layout " + layout_class + selected_class + " n-" + this.getButtonsCount().toString() },
            result
        );
    };

    _createClass(TabletSelectorInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                style: React.PropTypes.string,
                choices: React.PropTypes.string.isRequired,
                row_size: React.PropTypes.number,
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

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    TabletIntegerSelectInput.prototype.createArray = function createArray(min, max) {
        var result = [];
        for (var idx = min; idx <= max; ++idx) {
            result.push([idx, idx.toString()]);
        }
        return result;
    };

    TabletIntegerSelectInput.prototype.render = function render() {
        return React.createElement(TabletSelectorInput, _extends({
            choices: this.createArray(this.props.min, this.props.max)
        }, this.props));
    };

    _createClass(TabletIntegerSelectInput, null, [{
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

        return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
    }

    TabletPoint5SelectInput.prototype.createArray = function createArray(min, max) {
        var result = [];
        for (var idx = Math.round(2 * min); idx <= Math.round(2 * max); ++idx) {
            result.push([idx / 2, idx % 2 ? (idx / 2).toFixed(1) : Math.floor(idx / 2).toString()]);
        }
        return result;
    };

    TabletPoint5SelectInput.prototype.render = function render() {
        return React.createElement(TabletSelectorInput, _extends({
            choices: this.createArray(this.props.min, this.props.max)
        }, this.props));
    };

    _createClass(TabletPoint5SelectInput, null, [{
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

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    TabletIntegerInput.prototype.onMinus = function onMinus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": -1 });
        } else {
            this.props.onValueUpdate(this.props.value - 1);
        }
    };

    TabletIntegerInput.prototype.onPlus = function onPlus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": 1 });
        } else {
            this.props.onValueUpdate(this.props.value + 1);
        }
    };

    TabletIntegerInput.prototype.render = function render() {
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
    };

    _createClass(TabletIntegerInput, null, [{
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

var TabletPoint5Input = exports.TabletPoint5Input = function (_React$Component6) {
    _inherits(TabletPoint5Input, _React$Component6);

    function TabletPoint5Input() {
        _classCallCheck(this, TabletPoint5Input);

        return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
    }

    TabletPoint5Input.prototype.onMinus = function onMinus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": -0.5 });
        } else {
            this.props.onValueUpdate(this.props.value - 0.5);
        }
    };

    TabletPoint5Input.prototype.onPlus = function onPlus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": 0.5 });
        } else {
            this.props.onValueUpdate(this.props.value + 0.5);
        }
    };

    TabletPoint5Input.prototype.render = function render() {
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
    };

    _createClass(TabletPoint5Input, null, [{
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

    return TabletPoint5Input;
}(React.Component);

var stopwatches = {};

var StopWatch = exports.StopWatch = function (_React$Component7) {
    _inherits(StopWatch, _React$Component7);

    _createClass(StopWatch, null, [{
        key: "propTypes",
        get: function get() {
            return {
                score_id: React.PropTypes.number,
                onValueUpdate: React.PropTypes.func.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }]);

    function StopWatch(props) {
        _classCallCheck(this, StopWatch);

        var _this8 = _possibleConstructorReturn(this, _React$Component7.call(this, props));

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

    StopWatch.prototype.componentWillUnmount = function componentWillUnmount() {
        clearInterval(this.state.interval);
        stopwatches[this.props.score_id] = this.state;
    };

    StopWatch.prototype.now = function now() {
        return new Date().getTime();
    };

    StopWatch.prototype.toggle = function toggle() {
        this.state.active ? this.stop() : this.start();
    };

    StopWatch.prototype.start = function start() {
        this.setState({
            active: true,
            start_at: this.now() - this.state.value,
            interval: setInterval(this.tick.bind(this), 10)
        });
    };

    StopWatch.prototype.stop = function stop() {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: this.value()
        });
    };

    StopWatch.prototype.reset = function reset() {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: 0
        });
    };

    StopWatch.prototype.value = function value() {
        return this.state.active ? this.now() - this.state.start_at : this.state.value;
    };

    StopWatch.prototype.tick = function tick() {
        var new_value = this.value();
        if (new_value !== this.state.value) {
            this.setState({
                value: this.value()
            });
        }
    };

    StopWatch.prototype.pad = function pad(num, size) {
        var s = "0000" + num.toString();
        return s.substr(s.length - size);
    };

    StopWatch.prototype.getStrValue = function getStrValue() {
        var val = this.value();
        var m = 0,
            s = 0;
        var result = '';
        m = Math.floor(val / (60 * 1000));
        val %= 60 * 1000;
        s = Math.floor(val / 1000);
        return m.toString() + ':' + this.pad(s, 2);
    };

    StopWatch.prototype.render = function render() {
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
    };

    return StopWatch;
}(React.Component);

},{"i10n/loader":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcY2xpZW50c1xcY29ubmVjdGlvbl90ZXN0ZXJcXG1haW4uanN4Iiwic3JjXFxqc3hcXGNvbW1vblxcdG9vbHMuanN4Iiwic3JjXFxqc3hcXGNvbm5lY3Rpb25fdGVzdGVyLmpzeCIsInNyY1xcanN4XFxpMTBuXFxsb2FkZXIuanN4Iiwic3JjXFxqc3hcXGkxMG5cXHJ1LmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCIsInNyY1xcanN4XFx1aVxcdGFibGV0X2NvbXBvbmVudHMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ01hOzs7QUFDVCxhQURTLGdCQUNULENBQVksS0FBWixFQUFtQjs4QkFEVixrQkFDVTs7cURBQ2YsNEJBQU0sS0FBTixHQURlOztBQUVmLGNBQUssS0FBTCxHQUFhO0FBQ1QsMEJBQWMsSUFBZDtBQUNBLDJCQUFlLElBQWY7QUFDQSwwQkFBYyxFQUFkO0FBQ0EsNEJBQWdCLEVBQWhCO0FBQ0EsNkJBQWlCLENBQWpCO1NBTEosQ0FGZTtBQVNmLCtDQUFtQixXQUFuQixDQUErQixZQUEvQixFQUE2QyxNQUFLLFdBQUwsQ0FBaUIsSUFBakIsT0FBN0MsRUFUZTtBQVVmLGNBQUssUUFBTCxHQVZlOztLQUFuQjs7QUFEUywrQkFhVCw2QkFBUyxVQUFVO0FBQ2YsWUFBSSxLQUFLLEdBQUwsRUFBVTtBQUNWLDBCQUFjLEtBQUssR0FBTCxDQUFkLENBRFU7U0FBZDtBQUdBLGFBQUssR0FBTCxHQUFXLFlBQVksS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElB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O21CQUNJLGVBQWUsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFmLEVBRlI7Z0JBSU0sZUFBRSxnQ0FBRixDQUpOO2FBREo7WUFPSTs7O0FBQ0ksK0JBQVkscUNBQXFDLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsU0FBcEIsR0FBZ0MsRUFBaEMsQ0FBckM7bUJBQ1IsZUFBZSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQWYsRUFGUjtnQkFJTSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLGVBQUUsK0JBQUYsQ0FBcEIsR0FBeUQsZUFBRSxnQ0FBRixDQUF6RDthQVhWO1lBYUk7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNNLEtBQUssV0FBTCxFQUROO2FBYko7U0FESixDQURLOzs7V0E3RUE7RUFBa0IsTUFBTSxTQUFOIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgVGFibGV0U2VsZWN0b3JJbnB1dCB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgY2xvbmUgfSBmcm9tIFwiY29tbW9uL3Rvb2xzXCI7XG5cblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25UZXN0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBheWxvYWRfc2l6ZTogMTAwMCxcbiAgICAgICAgICAgIHBpbmdfaW50ZXJ2YWw6IDEwMDAsXG4gICAgICAgICAgICBhY3RpdmVfcGluZ3M6IHt9LFxuICAgICAgICAgICAgZmluaXNoZWRfcGluZ3M6IFtdLFxuICAgICAgICAgICAgbGFzdGVzdF9sYXRlbmN5OiAwLFxuICAgICAgICB9O1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJwaW5nX3JlcGx5XCIsIHRoaXMub25QaW5nUmVwbHkuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMucmVzZXRKb2IoKTtcbiAgICB9XG4gICAgcmVzZXRKb2IoaW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMuam9iKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuam9iKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmpvYiA9IHNldEludGVydmFsKHRoaXMucGluZy5iaW5kKHRoaXMpLCBpbnRlcnZhbCB8fCB0aGlzLnN0YXRlLnBpbmdfaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBwaW5nKCkge1xuICAgICAgICBsZXQgcGluZ19pZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IG5ld19zdGF0ZSA9IGNsb25lKHRoaXMuc3RhdGUuYWN0aXZlX3BpbmdzKTtcbiAgICAgICAgbmV3X3N0YXRlW3BpbmdfaWRdID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlX3BpbmdzOiBuZXdfc3RhdGUsXG4gICAgICAgICAgICBsYXRlc3Rfc2VudDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIH0pO1xuICAgICAgICBBcGkoXCJzZXJ2aWNlLnBpbmdcIiwgeyBwaW5nX2lkOiBwaW5nX2lkLCBwYXlsb2FkX3NpemU6IHRoaXMuc3RhdGUucGF5bG9hZF9zaXplIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgb25QaW5nUmVwbHkocmVzcG9uc2UpIHtcbiAgICAgICAgbGV0IHBpbmdfaWQgPSByZXNwb25zZS5waW5nX2lkO1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuYWN0aXZlX3BpbmdzW3BpbmdfaWRdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuc3RhdGUuYWN0aXZlX3BpbmdzW3BpbmdfaWRdO1xuICAgICAgICBsZXQgYWN0aXZlX3BpbmdzID0gY2xvbmUodGhpcy5zdGF0ZS5hY3RpdmVfcGluZ3MpO1xuICAgICAgICBsZXQgZmluaXNoZWRfcGluZ3MgPSBjbG9uZSh0aGlzLnN0YXRlLmZpbmlzaGVkX3BpbmdzKTtcbiAgICAgICAgZmluaXNoZWRfcGluZ3MucHVzaCh7XG4gICAgICAgICAgICByZWNlaXZlZDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBsYXRlbmN5OiB0aW1lLFxuICAgICAgICB9KVxuICAgICAgICBpZiAoZmluaXNoZWRfcGluZ3MubGVuZ3RoID4gMTEwMCkge1xuICAgICAgICAgICAgZmluaXNoZWRfcGluZ3MgPSBmaW5pc2hlZF9waW5ncy5zbGljZSgtMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGFjdGl2ZV9waW5nc1twaW5nX2lkXTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmVfcGluZ3M6IGFjdGl2ZV9waW5ncyxcbiAgICAgICAgICAgIGZpbmlzaGVkX3BpbmdzOiBmaW5pc2hlZF9waW5ncyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFBheWxvYWRTaXplKG5ld19zaXplKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcGF5bG9hZF9zaXplOiBuZXdfc2l6ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFBpbmdJbnRlcnZhbChpbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBpbmdfaW50ZXJ2YWw6IGludGVydmFsLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZXNldEpvYihpbnRlcnZhbCk7XG4gICAgfVxuICAgIGNhbGNTdGF0aXN0aWNzKHNvdXJjZSkge1xuICAgICAgICBsZXQgYXJyID0gc291cmNlLm1hcCgocCkgPT4gcGFyc2VJbnQocC5sYXRlbmN5KSk7XG4gICAgICAgIGFyci5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtaW46IChhcnJbMF0gLyAxMDAwKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgbWF4OiAoYXJyW2Fyci5sZW5ndGggLSAxXSAvIDEwMDApLnRvRml4ZWQoMiksXG4gICAgICAgICAgICBwNTA6IChhcnJbTWF0aC5yb3VuZCgoYXJyLmxlbmd0aCAtIDEpICogMC41MCldIC8gMTAwMCkudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHA4MDogKGFycltNYXRoLnJvdW5kKChhcnIubGVuZ3RoIC0gMSkgKiAwLjgwKV0gLyAxMDAwKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgcDk1OiAoYXJyW01hdGgucm91bmQoKGFyci5sZW5ndGggLSAxKSAqIDAuOTUpXSAvIDEwMDApLnRvRml4ZWQoMiksXG4gICAgICAgICAgICBwOTk6IChhcnJbTWF0aC5yb3VuZCgoYXJyLmxlbmd0aCAtIDEpICogMC45OSldIC8gMTAwMCkudG9GaXhlZCgyKSxcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJTdGF0KHN0YXQpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic3RhdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPk1pbjo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj57IHN0YXQubWluIH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5QNTA6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+eyBzdGF0LnA1MCB9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+UDgwOjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPnsgc3RhdC5wODAgfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlA5NTo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj57IHN0YXQucDk1IH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5QOTk6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+eyBzdGF0LnA5OSB9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+TWF4OjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPnsgc3RhdC5tYXggfTwvZGl2PlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHN0YXQxMDAgPSB0aGlzLmNhbGNTdGF0aXN0aWNzKHRoaXMuc3RhdGUuZmluaXNoZWRfcGluZ3Muc2xpY2UoLTEwMCkpO1xuICAgICAgICBsZXQgc3RhdDEwMDAgPSB0aGlzLmNhbGNTdGF0aXN0aWNzKHRoaXMuc3RhdGUuZmluaXNoZWRfcGluZ3Muc2xpY2UoLTEwMDApKTtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgIDxoMT5Db25uZWN0aW9uIHRlc3RlcjwvaDE+XG4gICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgY29ubmVjdGlvbi10ZXN0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlBheWxvYWQgc2l6ZTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNob2ljZXM9eyBbWzEwMCwgXCIxMDAgYlwiXSwgWzEwMDAsIFwiMSBLQlwiXSwgWzEwMDAwLCBcIjEwIEtCXCJdLCBbMTAwMDAwLCBcIjEwMCBLQlwiXSwgWzEwMDAwMDAsIFwiMSBNQlwiXV0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17IHRoaXMuc3RhdGUucGF5bG9hZF9zaXplIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5zZXRQYXlsb2FkU2l6ZS5iaW5kKHRoaXMpIH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5QaW5nIGludGVydmFsPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IFtbMTAwLCBcIjEwMG1zXCJdLCBbMjAwLCBcIjIwMG1zXCJdLCBbNTAwLCBcIjUwMG1zXCJdLCBbMTAwMCwgXCIxc1wiXSwgWzIwMDAsIFwiMnNcIl0sIFs1MDAwLCBcIjVzXCJdLCBbMTAwMDAsIFwiMTBzXCJdXSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlPXsgdGhpcy5zdGF0ZS5waW5nX2ludGVydmFsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5zZXRQaW5nSW50ZXJ2YWwuYmluZCh0aGlzKSB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Yj5BY3RpdmUgcGluZ3M6PC9iPiB7IE9iamVjdC5rZXlzKHRoaXMuc3RhdGUuYWN0aXZlX3BpbmdzKS5sZW5ndGggfTxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPkxhc3Rlc3QgbGF0ZW5jaWVzPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJsYXRlbmN5LWNoYXJ0XCI+PHRib2R5Pjx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZmluaXNoZWRfcGluZ3Muc2xpY2UoLTEwKS5tYXAoKHBpbmcsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9IGNsYXNzTmFtZT1cImNoYXJ0LWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJiYXJcIiArIChwaW5nLmxhdGVuY3kgPiAyMDAwID8gXCIgcmVkXCIgOiBcIlwiKSB9IHN0eWxlPXt7IGhlaWdodDogTWF0aC5taW4oTWF0aC5yb3VuZChwaW5nLmxhdGVuY3kgLyAxMCksIDIwMCkgKyBcInB4XCIgfX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IE1hdGgucm91bmQocGluZy5sYXRlbmN5IC8gMTApIC8gMTAwIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlN0YXRpc3RpY3Mgb3V0IG9mIDEwMDo8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclN0YXQoc3RhdDEwMCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlN0YXRpc3RpY3Mgb3V0IG9mIDEwMDA6PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTdGF0KHN0YXQxMDAwKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbmNsYXNzIENtcENoYWluSW1wbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gMDtcbiAgICB9XG4gICAgY21wKGEsIGIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIENtcENoYWluID0gKCkgPT4gbmV3IENtcENoYWluSW1wbCgpO1xuIiwiaW1wb3J0IHsgQ29ubmVjdGlvblRlc3RlciB9IGZyb20gXCJjbGllbnRzL2Nvbm5lY3Rpb25fdGVzdGVyL21haW5cIjtcblxuXG5SZWFjdERPTS5yZW5kZXIoXG4gICAgPENvbm5lY3Rpb25UZXN0ZXIgeyAuLi53aW5kb3cucGFnZV9wcm9wcyB9IC8+LFxuICAgIHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIilcbik7XG4iLCJpbXBvcnQgeyB0cmFuc2xhdGUsIGdldFBvc3NpYmxlVG91ck5hbWVzIH0gZnJvbSBcIi4vcnVcIjtcblxuZXhwb3J0IHZhciBfID0gdHJhbnNsYXRlO1xuZXhwb3J0IHZhciB0b3VyX25hbWVzID0gZ2V0UG9zc2libGVUb3VyTmFtZXMoKTtcbiIsImV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCBhcmcpIHtcclxuICAgIGZ1bmN0aW9uIGNob29zZUVuZGluZyhuLCBlMSwgZTIsIGU1KSB7XHJcbiAgICAgICAgbGV0IHggPSBuICUgMTAwO1xyXG4gICAgICAgIGlmIChNYXRoLmZsb29yKHggLyAxMCkgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA+PSA1IHx8IHggJSAxMCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlMjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgUEhSQVNFUyA9IHtcclxuICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiAodmVyc2lvbiwgZGF0ZSkgPT4gPGRpdiBjbGFzc05hbWU9XCJhYm91dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxiPlJvY2tKdWRnZSB7dmVyc2lvbn08L2I+ICjQvtGCIHtkYXRlfSkgJm1kYXNoOyDRgdC40YHRgtC10LzQsCDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDRgNC10LfRg9C70YzRgtCw0YLQvtCyINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDQv9C+INCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC+0LzRgyDRgNC+0Lot0L0t0YDQvtC70LvRgy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JDQstGC0L7RgNGB0LrQuNC1INC/0YDQsNCy0LAg0L3QsCDRgdC40YHRgtC10LzRgyBSb2NrSnVkZ2Ug0L/QvtC70L3QvtGB0YLRjNGOINC/0YDQuNC90LDQtNC70LXQttCw0YIg0YDQsNC30YDQsNCx0L7RgtGH0LjQutGDINCQ0YDRgtC10LzRgyDQmtCw0LfQsNC60L7QstGDLiDQodC+0LDQstGC0L7RgCDRgdC40YHRgtC10LzRiyDQkNC90YLQvtC9INCQ0LzQtdC70LjQvS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0KHQuNGB0YLQtdC80LAg0YDQsNGB0L/RgNC+0YHRgtGA0LDQvdGP0LXRgtGB0Y8g0L/QviDQu9C40YbQtdC90LfQuNC4IExpbnVtIGQuby5vIChpbmZvQGxpbnVtLmhyKS4g0JTQu9GPINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsCBSb2NrSnVkZ2Ug0L3QtdC+0LHRhdC+0LTQuNC80L4g0Lgg0LTQvtGB0YLQsNGC0L7Rh9C90L4g0LjQvNC10YLRjCDQv9GA0LDQstC+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLIExpbnVtIExQUy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0J7RhNC40YbQuNCw0LvRjNC90YvQuSDRgdCw0LnRgjogPGEgaHJlZj1cImh0dHBzOi8vcm9ja2p1ZGdlLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5odHRwczovL3JvY2tqdWRnZS5jb20vPC9hPjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3Byb2dyYW1zX2FmdGVyX2NyZWF0aW9uXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLINC80L7QttC90L4g0LHRg9C00LXRgiDQtNC+0LHQsNCy0LjRgtGMINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGB0L7RhdGA0LDQvdC10L3QuNGPINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0LrQvtGA0YDQtdC60YLQvdC+INC90LDRgdGC0YDQvtC10L3QsCDQuCDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L3QsC5cIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX25vdF9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQvdC10LTQvtGB0YLRg9C/0L3QsCDQvdCwINGN0YLQvtC8INC60L7QvNC/0YzRgtC10YDQtS5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmluYWxpemVkXCI6IFwi0J7RgtGB0YPRgtGB0YLQstGD0Y7RgiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3dhcm5pbmdcIjogPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPtCk0LjQvdCw0LvQuNC30LDRhtC40Y8g0LTQvtC70LbQvdCwINC+0YLQvNC10L3Rj9GC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDQuNGB0LrQu9GO0YfQuNGC0LXQu9GM0L3Ri9GFINGB0LvRg9GH0LDRj9GFITwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QldGB0LvQuCDQttC1INGN0YLQviDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDQvdC10L7QsdGF0L7QtNC40LzQviwg0L7QsdGA0LDRgtC40YLQtSDQstC90LjQvNCw0L3QuNC1LCDRh9GC0L4g0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgdC/0LjRgdC+0Log0YPRh9Cw0YHRgtC90LjQutC+0LJcclxuICAgICAgICAgICAgICAgICAgICDRgdC70LXQtNGD0Y7RidC10LPQviDRgtGD0YDQsCDQsdGD0LTQtdGCINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC4INC/0LXRgNC10YHQvtC30LTQsNC9LiDQoNC10LfRg9C70YzRgtCw0YLRiyDRg9GH0LDRgdGC0L3QuNC60L7Qsiwg0L/RgNC+0YjQtdC00YjQuNGFINCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L/QvtGB0LvQtSDQv9C10YDQstC+0LlcclxuICAgICAgICAgICAgICAgICAgICDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INC4INC90LUg0L/RgNC+0YjQtdC00YjQuNGFINC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INCx0YPQtNGD0YIg0LHQtdC30LLQvtC30LLRgNCw0YLQvdC+INGD0YLQtdGA0Y/QvdGLITwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QmCDQvdC1INC30LDQsdGD0LTRjNGC0LUg0LfQsNC90L7QstC+INC90LDQv9C10YfQsNGC0LDRgtGMINCy0YHQtSDRgtCx0LvQuNGG0YsuPC9wPjwvZGl2PixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YHQuy7CoNGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInByaW50X3Rlc3RfcGFnZVwiOiBcItCd0LDQv9C10YfQsNGC0LDRgtGMINGC0LXRgdGC0L7QstGD0Y4g0YHRgtGA0LDQvdC40YbRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWV1ZVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWV1ZV9lbXB0eVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0YPRgdGC0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJ1bGVzXCI6IFwi0JfQsNC00LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwidGVzdFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3BhZ2VcIjogXCLQotC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF90ZXh0XCI6IFwi0K3RgtC+INGC0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsCBSb2NrSnVkZ2VcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NsdWJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC60LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvblwiOiBcItCh0L7Qt9C00LDRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RglwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfZGlzY2lwbGluZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YNcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2p1ZGdlXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgdGD0LTRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wYXJ0aWNpcGFudFwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF90b3VyXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X251bWJlcnNcIjogXCLQndC+0LzQtdGA0LAg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydFwiOiBcItCt0LrRgdC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0XCI6IFwi0JjQvNC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibGF1bmNoX2F1dG9fcHJpbnRlclwiOiBcItCX0LDQv9GD0YHQuiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQvtC5INC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9cIjogXCLQl9Cw0LPRgNGD0LfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0J/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0LLRgdC1INGD0YHRgtGA0L7QudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0J7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDRg9GB0YLRgNC+0LnRgdGC0LLQsNGFXCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19wbGFuXCI6IFwi0KHQvtGA0YLQuNGA0L7QutCwINC/0L4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19kaXNjaXBsaW5lc1wiOiBcItCh0L7RgNGC0LjRgNC+0LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgICAgIFwidW5jb25maXJtX3Njb3JlXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQutGB0LDRhtC40LhcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZVwiOiBcItCe0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NsdWJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDQutC70YPQsT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NvbXBldGl0aW9uXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2Rpc2NpcGxpbmVcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0LTQuNGB0YbQuNC/0LvQuNC90YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9qdWRnZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YHRg9C00YzRjj9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC/0YDQvtCz0YDQsNC80LzRgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOINGC0YPRgNCwPyDQktCy0LXQtNC40YLQtSDCq3VuZmluYWxpemXCuywg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiBcItCeINC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbGllbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LzQuCDRg9GB0YLRgNC+0LnRgdGC0LLQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfc3VtbWFyeVwiOiBcItCh0LLQvtC00LrQsCDQv9C+INC60LvRg9Cx0LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX21hbmFnZW1lbnRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQtNC40YHRhtC40L/Qu9C40L3QsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRfY29tcGV0aXRpb25cIjogXCLQrdC60YHQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LAg0Lgg0YDQtdC30YPQu9GM0YLQsNGC0L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfY29tcGV0aXRpb25cIjogXCLQmNC80L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTQtdC50YHQutCw0Y8g0LHRgNC40LPQsNC00LBcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9iYXRpY3NcIjogXCLQl9Cw0LPRgNGD0LfQutCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YPRh9Cw0YHRgtC90LjQutCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX21lbnVcIjogXCLQodC10YDQstC40YHQvdC+0LUg0LzQtdC90Y5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX2xpc3RcIjogXCLQodC/0LjRgdC+0Log0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2RhdGVcIjogXCLQlNCw0YLQsCDQv9GA0L7QstC10LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9uYW1lXCI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc1wiOiBcItCU0LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Rpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maWxlc19zZWxlY3RlZFwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LsuLi5cIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzXCI6IFwi0KPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3BvcnRzbWVuX29ubHlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3N1bW1hcnlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0LrQvtC70LjRh9C10YHRgtCy0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3ViXCI6IFwi0LfQsNC/XCIsICAvLyBzdWJzdGl0dXRlXHJcbiAgICAgICAgICAgICAgICBcInRvdXJzXCI6IFwi0KLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfcGFzc2NvZGVcIjogXCLQktCy0LXQtNGR0L0g0L3QtdCy0LXRgNC90YvQuSDQutC+0LQg0L/QvtGC0LLQtdGA0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVudVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY2x1YnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2Rpc2NpcGxpbmVzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9qdWRnZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2Vfc3BvcnRzbWVuXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQv9C+0YDRgtGB0LzQtdC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV90b3Vyc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGC0YPRgNCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5fcGFydGljaXBhbnRzXCI6IG4gPT4gbi50b1N0cmluZygpICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJuX3Nwb3J0c21lblwiOiAobiwgcykgPT4gbi50b1N0cmluZygpICsgXCIg0YHQv9C+0YDRgtGB0LzQtdC9XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIikgKyAocyA+IDAgPyBgICgrJHtzfSDQt9Cw0L/QsNGB0L0keyBjaG9vc2VFbmRpbmcocywgXCLQvtC5XCIsIFwi0YvRhVwiLCBcItGL0YVcIikgfSlgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuX3Nob3J0XCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQvy4pYCA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9uX3BhcnRpY2lwYW50c1wiOiBuID0+IFwi0JjRgtC+0LPQviBcIiArIG4gKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2luZy10YWJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG91ci1hZG1pblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lLXJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlcnJvcnNcIjoge1xyXG4gICAgICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibG9hZF9zeW50YXhfZXJyb3JcIjogXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC00LDQvdC90YvRhVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFwaVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImR1cGxpY2F0ZWRfZXh0ZXJuYWxfaWRcIjogXCLQkiDQtNCw0L3QvdGL0YUg0LjQvNC10Y7RgtGB0Y8g0LfQsNC/0LjRgdC4INGBINC/0L7QstGC0L7RgNGP0Y7RidC40LzQuNC80YHRjyBleHRlcm5hbF9pZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmFibGVfdG9fZ2V0XCI6ICh3YW50ZWQpID0+IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QvtC70YPRh9C40YLRjCBcIiArIHdhbnRlZCArIFwiINC40Lcg0LfQsNC/0YDQvtGB0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LrQu9GD0LEsINC6INC60L7RgtC+0YDQvtC80YMg0L/RgNC40LLRj9C30LDQvdGLINGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX25vbl9lbXB0eVwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSwg0YHQvtC00LXRgNC20LDRidC10LUg0LTQuNGB0YbQuNC/0LvQuNC90YssINC60LvRg9Cx0Ysg0LjQu9C4INGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG9vX21hbnlfdG91cnNcIjogKGQpID0+IFtcItCe0YjQuNCx0LrQsCDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsIGDQkiDQtNC40YHRhtC40L/Qu9C40L3QtSAke2R9INGB0L7QtNC10YDQttC40YLRgdGPINCx0L7Qu9GM0YjQtSDRgtGD0YDQvtCyLCDRh9C10Lwg0YHQvtC30LTQsNC90L4g0LIg0YHQuNGB0YLQtdC80LVgXSxcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9kaXNjaXBsaW5lX2ZvdW5kXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDRgdC+0LTQtdGA0LbQuNGCINGC0YPRgNGLLCDQvtGC0YHRg9GC0YHRgtCy0YPRjtGJ0LjQtSDQsiDRgdC40YHRgtC10LzQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjaGFuZ2VfanVkZ2VzX3dpdGhfZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0L7RgdGC0LDQsiDRgdGD0LTQtdC5INC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Riywg0YHQvtC00LXRgNC20LDRidC10Lkg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINGDINC60L7RgNC+0LPQviDQtdGB0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfc2NvcmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVwZWF0aW5nX2p1ZGdlXCI6IChuYW1lKSA9PiBuYW1lICsgXCIg0LLRgdGC0YDQtdGH0LDQtdGC0YHRjyDQsiDRgdC/0LjRgdC60LUg0YHRg9C00LXQuSDQsdC+0LvQtdC1INC+0LTQvdC+0LPQviDRgNCw0LfQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludGVybmFsX3NlcnZlcl9lcnJvclwiOiBbXCLQntGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtVwiLCBcItC/0YDQvtCy0LXRgNGM0YLQtSDQu9C+0LPQuCDQtNC70Y8g0LjQvdGE0L7RgNC80LDRhtC40LhcIl0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9kaXNjaXBsaW5lc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINCy0YXQvtC00Y/RidC10LPQviDQsiDRgdGD0LTQtdC50YHQutGD0Y4g0LHRgNC40LPQsNC00YMg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRg9GH0LDRgdGC0L3QuNC60LAsINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INGF0L7RgtGPINCx0Ysg0LIg0L7QtNC90L7QvCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicnVuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2V0X3BlcmZvcm1lZF9mbGFnX29uX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHRgtCw0YLRg9GBINC30LDRhdC+0LTQsCDRhNC40L3QsNC70LjQt9C40L3QvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2NvcmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzY29yZV9ub3RfZXhpc3RcIjogXCLQn9C+0L/Ri9GC0LrQsCDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LUg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQuSDQvtGG0LXQvdC60Lgg0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfb25fZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINC+0YbQtdC90LrRgyDQsiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfYmVmb3JlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC00L7QsdCw0LLQuNGC0Ywg0L3QvtCy0YvQuSDRgtGD0YAg0L/QtdGA0LXQtCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YLRg9GALCDQv9GA0LjRgdGD0YLRgdGC0LLRg9GO0YnQuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF9maW5haWx6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2FkZF9hZnRlcl9pZFwiOiBcItCf0L7Qv9GL0YLQutCwINC00L7QsdCw0LjRgtGMINGC0YPRgCDQsiDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC1INC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF90b19ub25fZW1wdHlcIjogKGQpID0+IFtcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQs9GA0YPQt9C40YLRjCDRgtGD0YDRiyDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YtcIiwgYNCU0LjRgdGG0LjQv9C70LjQvdCwICR7ZH0g0YPQttC1INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YtgXSxcclxuICAgICAgICAgICAgICAgIFwibmV4dF9pc19maW5haWx6ZWRcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC90LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX25leHRfdG91clwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L/QvtGB0LvQtdC00L3QuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC90LUg0YHQvtC00LXRgNC20LjRgtGB0Y8g0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X25vdF9maW5haWx6ZWRcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgtGD0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQv9GD0YHRgtC40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX2ZpbmFsaXplZFwiOiBcItCU0LvRjyDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwINC90LUg0LTQvtC/0YPRgdC60LDQtdGC0YHRjyDQuNC30LzQtdC90LXQvdC40LUg0LrQstC+0YLRiyDQstGL0LLQvtC00LAsINGC0LjQv9CwINGC0YPRgNCwINC40LvQuCDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkXCI6IFwi0JTQvtCx0LDQstC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2VsZWN0X2FsbFwiOiBcItCh0L3Rj9GC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImVkaXRcIjogXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVcIjogXCLQo9C00LDQu9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkXCI6IFwi0J7RgtC80LXQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNhdmVcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2FsbFwiOiBcItCS0YvQsdGA0LDRgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJicm93c2VcIjogXCLQntCx0LfQvtGALi4uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3RpbmdcIjogXCLQn9C+0LTQutC70Y7Rh9C10L3QuNC1INC6INGB0LXRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fcHJvYmxlbVwiOiBcItCf0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZXNcIjogXCLQlNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vXCI6IFwi0J3QtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX2Vycm9yXCI6IFwi0J/QvtGF0L7QttC1LCDQuNC80LXRjtGC0YHRjyDQv9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiZXJyb3JfaGVhZGVyXCI6IFwi0J7RiNC40LHQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Y2Nlc3NcIjogXCLQntC/0LXRgNCw0YbQuNGPINGD0YHQv9C10YjQvdC+INC30LDQstC10YDRiNC10L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoZWF0X25cIjogKG4pID0+IFwi0JfQsNGF0L7QtCDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwianVkZ2VfblwiOiAobikgPT4gXCLQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25cIjogKG4sIG5hbWUsIG5fc3ApID0+XHJcbiAgICAgICAgICAgICAgICAgICAgKG5fc3AgPiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQpNC+0YDQvNC10LnRiNC9IOKEllwiICsgbi50b1N0cmluZygpICsgKG5hbWUgPyBcIjogXCIgKyBuYW1lIDogXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAobl9zcCA9PT0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCf0LDRgNCwIOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwi0KPRh9Cw0YHRgtC90LjQuiDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgbi50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnaW5nXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQntGB0YLQsNC90L7QstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00Ys/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwib2xkX3Njb3JlXCI6IFwi0JHQsNC30LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb2RlbHNcIjoge1xyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQtNC70Y8g0L/RgNC+0YLQvtC60L7Qu9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9iZWdpbm5pbmdcIjogXCLQndCw0YfQsNC70L5cIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2R1cmF0aW9uXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0JBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LtcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YVcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJvbGVzX2xlZ2VuZFwiOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctMTAwXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7Qk9C7IOKAlCDQs9C70LDQstC90YvQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QoiDigJQg0YHRg9C00YzRjyDRgtCw0L3RhtCwPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QkCDigJQg0YHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KJleCDigJQg0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBcItCa0LDRgtC10LPQvtGA0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L0uIElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQpC4g0JguINCeLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVcIjogXCLQoNC+0LvRjCDQsiDRgdGD0LTQtdC50YHRgtCy0LVcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZV9kZXNjcmlwdGlvblwiOiBcItCU0L7Qu9C20L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uc1wiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfbmFtZVwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfbmFtZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCLQmNC80Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCI6IFwi0J/QvtC7XCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9mXCI6IFwi0JZcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX21cIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5lcmFsX2luZm9cIjogXCLQntGB0L3QvtCy0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC+0LzQsNC90LTRiyDRhNC+0YDQvNC10LnRiNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcItCk0LDQvNC40LvQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZ3JhbXNcIjogXCLQn9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWFuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfblwiOiBcItCe0YHQvS5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV95XCI6IFwi0JfQsNC/LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZWFyX29mX2JpcnRoXCI6IFwi0JPQvtC0INGA0L7QttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwieW9iXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZ3JhbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfZm9yXCI6IFwi0J/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfcHJvZ3JhbVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX2hvcGVfdG91clwiOiBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwibnVtX2FkdmFuY2VzXCI6IFwi0JrQstC+0YLQsCDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX3Blcl9oZWF0XCI6IFwi0KPRh9Cw0YHRgtC90LjQutC+0LIg0LIg0LfQsNGF0L7QtNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjb3Jpbmdfc3lzdGVtX25hbWVcIjogXCLQodC40YHRgtC10LzQsCDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfaGVhdFwiOiBcItCh0LHRgNC+0YEg0L3QvtC80LXRgNCwINC30LDRhdC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9wbGFjZVwiOiBcItCh0LHRgNC+0YEg0LzQtdGB0YLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VzXCI6IFwi0JzQtdGB0YLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicHJlc2VudGVyXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19hY3RpdmVfdG91clwiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuXHJcbmNsYXNzIEFwaUltcGwge1xyXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gKG1zZywgY29kZSwgYXJncykgPT4gc2hvd0Vycm9yKGNvZGUgPyBfKGNvZGUsIC4uLmFyZ3MpIDogbXNnKTtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSAoLi4uZGF0YSkgPT4gY29uc29sZS5lcnJvcihcIkFQSSBmYWlsXCIsIC4uLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uU3VjY2VzcyhjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25FcnJvcihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRmFpbChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkVG9EQihtb2RlbF90eXBlLCBtb2RlbF9pZCwgc3Q9c3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbmQoKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbiIsImltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvbl9zdGF0dXMgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2VEaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc19jbnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gICAgY29ubmVjdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RpbmcgdG8gd2Vic29ja2V0Li4uXCIpO1xyXG4gICAgICAgIHRoaXMud3MgPSBuZXcgU29ja0pTKFwiaHR0cDovL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi93c1wiKTtcclxuICAgICAgICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRPaygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZC5cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtbXCJyZWxvYWRfZGF0YVwiLCBudWxsXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsX3VwZGF0ZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRGYWlsKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jb25uZWN0LmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGFbXCJjbGllbnRfaWRcIl0pIHtcclxuICAgICAgICAgICAgd2luZG93LmNsaWVudF9pZCA9IGRhdGFbXCJjbGllbnRfaWRcIl07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5tZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG1zZ190eXBlID0gZGF0YVswXTtcclxuICAgICAgICAgICAgbGV0IG1zZ19kYXRhID0gZGF0YVsxXTtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKG1zZ190eXBlID09PSBcImZvcmNlX3JlZnJlc2hcIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge30pLmZvckVhY2goKGtleSkgPT4gbGlzdGVuZXJzW2tleV0obXNnX2RhdGEpKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBkYXRhLm1vZGVsX3VwZGF0ZXMuZm9yRWFjaCgobW9kZWxfaW5mbykgPT4ge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSBzdG9yYWdlLnVwZGF0ZU1vZGVsKG1vZGVsX2luZm8ubW9kZWwsIG1vZGVsX2luZm8uaWQsIG1vZGVsX2luZm8uZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChkYXRhX2NoYW5nZWQpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW1wiZGJfdXBkYXRlXCJdIHx8IHt9O1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0TGlzdGVuZXJJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnNfY250Kys7XHJcbiAgICB9XHJcbiAgICBhZGRMaXN0ZW5lcihtc2dfdHlwZXMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5nZXRMaXN0ZW5lcklkKCk7XHJcbiAgICAgICAgbXNnX3R5cGVzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKG1zZ190eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV1baWRdID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcl9pZCkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNba2V5XVtsaXN0ZW5lcl9pZF07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSBuZXcgTWVzc2FnZURpc3BhdGNoZXIoKTtcclxuIiwiY2xhc3MgUmVmIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLm1vZGVsX25hbWUpLmJ5X2lkKHRoaXMuaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBpZCwgbW9kZWxfc3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9fc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX19tb2RlbF9zdG9yYWdlID0gbW9kZWxfc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZEJhY2tSZWYoa2V5LCByZWYpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSByZWY7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoZGF0YSwgY3JlYXRlPXRydWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIgfHwgaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY3JlYXRlICYmIHR5cGVvZiB0aGlzW2lkeC5zbGljZSgxKV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXVxyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgdGhpcy5fX21vZGVsX3N0b3JhZ2UubW9kZWxfbmFtZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWZfa2V5ID0gZGF0YVtpZHhdLmJhY2tfcmVmO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpZHhdLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obmVzdGVkX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhLmRhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWYuZ2V0KCkuYWRkQmFja1JlZihiYWNrX3JlZl9rZXksIGJhY2tfcmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChyZWYpO1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiKlwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lc3RlZF9kYXRhID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbaWR4XSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNbaWR4XSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXJpYWxpemUoc2NoZW1hKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX19rZXlfdHlwZXMpIGlmICh0aGlzLl9fa2V5X3R5cGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9fa2V5X3R5cGVzW2tleV0pIHtcclxuICAgICAgICAgICAgY2FzZSBcIipcIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0ubWFwKGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIl5cIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0uZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LmlkID0gdGhpcy5pZFxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsc1N0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsc1tpZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdID0gbmV3IE1vZGVsKHRoaXMuc3RvcmFnZSwgaWQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxzW2lkXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGJ5X2lkKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2lkXTtcclxuICAgIH1cclxuICAgIGFsbCgpIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubW9kZWxzKTtcclxuICAgICAgICByZXR1cm4ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1trZXldO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzID0ge31cclxuICAgICAgICB0aGlzLmRvbWFpbnMgPSB7fVxyXG4gICAgfVxyXG4gICAgZ2V0RG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kb21haW5zW2RvbWFpbl0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21haW5zW2RvbWFpbl0gPSBuZXcgU3RvcmFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBkZWxEb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZ2V0KG1vZGVsX25hbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9IG5ldyBNb2RlbHNTdG9yYWdlKHRoaXMsIG1vZGVsX25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIGRlbChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICB1cGRhdGVNb2RlbChtb2RlbF90eXBlLCBtb2RlbF9pZCwgZGF0YSkge1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF90eXBlXSkge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIGRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5kb21haW5zKS5mb3JFYWNoKChrZXkpID0+XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZG9tYWluc1trZXldLnVwZGF0ZU1vZGVsKC4uLmFyZ3VtZW50cykgfHwgZGF0YV9jaGFuZ2VkKTtcclxuICAgICAgICAvLyByZXR1cm4gZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpXHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIHN0eWxlPXt7IFwiaGVpZ2h0XCI6IFwiMTAwJVwiLCBcIndpZHRoXCI6IFwiMTAwJVwiIH19Pjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBcInRleHRBbGlnblwiOiBcImNlbnRlclwiIH19PlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy9hamF4LWxvYWRlci5naWZcIiAvPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzTW9jayB7XHJcbiAgICBzZXRPaygpIHt9XHJcbiAgICBzZXRGYWlsKCkge31cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBcImNvbm5lY3RlZFwiOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0aW9uX3N0YXR1c1wiKTtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgPENvbm5lY3Rpb25TdGF0dXMgLz4sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvblN0YXR1c01vY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRPaygpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IHRydWUsIHRpY2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0RmFpbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgb2tcIj48L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3RpbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LWRhbmdlclwiICsgKHRoaXMuc3RhdGUudGljayA/IFwiIHRpY2tcIiA6IFwiXCIpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW9uX3Byb2JsZW1cIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29ubmVjdGlvbl9zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmluaXQoKTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XG4gICAgbGV0IHRpdGxlID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzBdIDogXyhcImdsb2JhbC5tZXNzYWdlcy5lcnJvcl9oZWFkZXJcIik7XG4gICAgbGV0IHRleHQgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMV0gOiBtc2c7XG4gICAgc3dhbCh7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XG4gICAgcmV0dXJuIHN3YWwoe1xuICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxuICAgIH0sIGFjdGlvbik7XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hPckNsaWNrKGhhbmRsZXIpIHtcbiAgICBsZXQgZiA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gaGFuZGxlcihldmVudCk7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IGYsXG4gICAgICAgIG9uQ2xpY2s6IGYsXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaEVuZE9yQ2xpY2soaGFuZGxlciwgcHJldmVudF9kZWZhdWx0KSB7XG4gICAgbGV0IF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgbGV0IGRpc3RhbmNlID0gMDtcbiAgICBsZXQgbGF0ZXN0X3BvcyA9IFswLCAwXTtcbiAgICBsZXQgZmlyZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gX2hhbmRsZXIoKTtcbiAgICB9XG4gICAgbGV0IGRpc2NhcmQgPSAoKSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gKCkgPT4ge307XG4gICAgfVxuICAgIGxldCBtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcbiAgICAgICAgbGV0IHNxciA9ICh4KSA9PiB4ICogeDtcbiAgICAgICAgZGlzdGFuY2UgKz0gTWF0aC5zcXJ0KHNxcihjdXJyZW50X3Bvc1swXSAtIGxhdGVzdF9wb3NbMF0pICsgc3FyKGN1cnJlbnRfcG9zWzFdIC0gbGF0ZXN0X3Bvc1sxXSkpO1xuICAgICAgICBsYXRlc3RfcG9zID0gY3VycmVudF9wb3M7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDIwKSB7XG4gICAgICAgICAgICBkaXNjYXJkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgZGlzdGFuY2UgPSAwO1xuICAgICAgICBsYXRlc3RfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IHN0YXJ0LFxuICAgICAgICBvblRvdWNoRW5kOiBmaXJlLFxuICAgICAgICBvblRvdWNoTW92ZTogbW92ZSxcbiAgICAgICAgb25Ub3VjaENhbmNlbDogZGlzY2FyZCxcbiAgICAgICAgb25DbGljazogaGFuZGxlcixcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9uZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBkb25lVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHNsaWRlVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG9uQWN0aXZhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5waW4gPSBudWxsO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZG9uZSAmJiBuZXh0UHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNGcmVlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUudG91Y2ggJiYgIXRoaXMucHJvcHMuZG9uZSAmJiAhdGhpcy5zdGF0ZS5maW5pc2hlZDtcbiAgICB9XG4gICAgZ2V0T3V0ZXJUZXh0T3BhY2l0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgubWluKE1hdGgubWF4KDEwMCAtIHRoaXMuc3RhdGUucG9zaXRpb24sIDApLCAxMDApO1xuICAgICAgICByZXR1cm4gKHZhbHVlIC8gMTAwKS50b0ZpeGVkKDMpO1xuICAgIH1cbiAgICBnZXRFbGVtZW50T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXMgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGdldFRvdWNoKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFJlbGF0aXZlVG91Y2goZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XG4gICAgfVxuICAgIGdldFNsaWRlclBvcyhldmVudCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRUb3VjaChldmVudCkgLSB0aGlzLnBpbjtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIDIwMCk7XG4gICAgfVxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3Npc2lvbjogMjAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICB9XG4gICAgb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGluID0gdGhpcy5nZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICAgICAgdG91Y2g6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBvc2l0aW9uID09PSAyMDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlciBub3NlbGVjdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaW5uZXJcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIil9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogKHRoaXMucHJvcHMuZG9uZSB8fCB0aGlzLnN0YXRlLmZpbmlzaGVkKSA/IFwiMjAwcHhcIiA6IHRoaXMuc3RhdGUucG9zaXRpb24gKyBcInB4XCIgfX1cbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyB0aGlzLm9uVG91Y2hTdGFydC5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgICAgICBvblRvdWNoTW92ZT17IHRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKSB9XG4gICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKGklxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVxuICAgICAgICAgICAgICAgID8gPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiKDEwMCwxMDAsMTAwKVwiIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiZG9uZS10ZXh0XCIgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVUZXh0IH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgOiA8c3BhblxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2JhKDEwMCwxMDAsMTAwLFwiICsgdGhpcy5nZXRPdXRlclRleHRPcGFjaXR5KCkgKyBcIilcIiB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInNsaWRlLXRleHRcIiArICh0aGlzLmlzRnJlZSgpID8gXCIgZnJlZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNsaWRlVGV4dCB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRhYmxldFNlbGVjdG9ySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBjaG9pY2VzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByb3dfc2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldEJ1dHRvbnNDb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5yb3dfc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaG9pY2VzLmxlbmd0aDtcbiAgICB9XG4gICAgb25DbGljayhuKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZShuKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMucHJvcHMuY2hvaWNlcy5mb3JFYWNoKChlbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5ID0gZWxbMF07XG4gICAgICAgICAgICBsZXQgdGV4dCA9IGVsWzFdO1xuICAgICAgICAgICAgbGV0IGFjdGl2ZV9jbGFzc19uYW1lID0gKHRoaXMucHJvcHMuYWN0aXZlID09PSBrZXkpID8gXCIgYWN0aXZlXCIgOiBcIlwiO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBrZXkgfVxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbkNsaWNrLmJpbmQodGhpcywga2V5KSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBzY29yZS1idG5cIiArIGFjdGl2ZV9jbGFzc19uYW1lIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPik7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIgJiYgKGlkeCArIDEpICUgdGhpcy5wcm9wcy5yb3dfc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKDxiciBrZXk9eyBcImJyXCIgKyBpZHggfSAvPilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBsYXlvdXRfY2xhc3MgPSAodGhpcy5wcm9wcy5zdHlsZSAhPT0gXCJ0d28tbGluZXNcIikgPyBcInNlbGVjdG9yLWxheW91dFwiIDogXCJzZWxlY3Rvci1sYXlvdXQtMnJvd3NcIjtcbiAgICAgICAgbGV0IHNlbGVjdGVkX2NsYXNzID0gdGhpcy5wcm9wcy5hY3RpdmUgPT09IG51bGwgPyBcIlwiIDogXCIgc2VsZWN0ZWRcIlxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wic2NvcmluZy1sYXlvdXQgXCIgKyBsYXlvdXRfY2xhc3MgKyBzZWxlY3RlZF9jbGFzcyArIFwiIG4tXCIgKyB0aGlzLmdldEJ1dHRvbnNDb3VudCgpLnRvU3RyaW5nKCkgfT57IHJlc3VsdCB9PC9kaXY+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlclNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbWF4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNyZWF0ZUFycmF5KG1pbiwgbWF4KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gbWluOyBpZHggPD0gbWF4OyArK2lkeCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCwgaWR4LnRvU3RyaW5nKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmNyZWF0ZUFycmF5KHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCkgfVxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1U2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSBNYXRoLnJvdW5kKDIgKiBtaW4pOyBpZHggPD0gTWF0aC5yb3VuZCgyICogbWF4KTsgKytpZHgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpZHggLyAyLCAoaWR4ICUgMikgPyAoaWR4IC8gMikudG9GaXhlZCgxKSA6IE1hdGguZmxvb3IoaWR4IC8gMikudG9TdHJpbmcoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk1pbnVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlIC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25QbHVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1pbnRlZ2VyLWlucHV0XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1taW51c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uTWludXMuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAmbWludXM7XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcGx1c1wiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uUGx1cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk1pbnVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTAuNX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAwLjUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uUGx1cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IDAuNX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAwLjUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbnZhciBzdG9wd2F0Y2hlcyA9IHt9O1xuXG5leHBvcnQgY2xhc3MgU3RvcFdhdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSB8fCB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICBzdHJfdmFsdWU6IFwiMDowMFwiLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IG51bGwsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpcmVjdC1tdXRhdGlvbi1zdGF0ZVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSA9IHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIG5vdygpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgfVxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPyB0aGlzLnN0b3AoKSA6IHRoaXMuc3RhcnQoKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgc3RhcnRfYXQ6IHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZVxuICAgICAgICAgICAgPyAodGhpcy5ub3coKSAtIHRoaXMuc3RhdGUuc3RhcnRfYXQpXG4gICAgICAgICAgICA6IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgfVxuICAgIHRpY2soKSB7XG4gICAgICAgIHZhciBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIGlmIChuZXdfdmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYWQobnVtLCBzaXplKSB7XG4gICAgICAgIHZhciBzID0gXCIwMDAwXCIgKyBudW0udG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHMuc3Vic3RyKHMubGVuZ3RoIC0gc2l6ZSk7XG4gICAgfVxuICAgIGdldFN0clZhbHVlKCkge1xuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICB2YXIgbSA9IDAsIHMgPSAwO1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgIG0gPSBNYXRoLmZsb29yKHZhbCAvICg2MCAqIDEwMDApKTtcbiAgICAgICAgdmFsICU9IDYwICogMTAwMDtcbiAgICAgICAgcyA9IE1hdGguZmxvb3IodmFsIC8gMTAwMCk7XG4gICAgICAgIHJldHVybiBtLnRvU3RyaW5nKCkgKyAnOicgKyB0aGlzLnBhZChzLCAyKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdG9wd2F0Y2hcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc2V0IGlnbm9yZS1yZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnJlc2V0LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucmVzZXRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBidG4tdG9nZ2xlIGlnbm9yZS1yZWFkb25seVwiICsgKHRoaXMuc3RhdGUuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5hY3RpdmUgPyBfKFwidGFibGV0LmJ1dHRvbnMuc3RvcF9zdG9wd2F0Y2hcIikgOiBfKFwidGFibGV0LmJ1dHRvbnMuc3RhcnRfc3RvcHdhdGNoXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldFN0clZhbHVlKCkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=
