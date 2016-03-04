(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.StartPage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("i10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _components = require("ui/components");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StartPage = exports.StartPage = function (_React$Component) {
    _inherits(StartPage, _React$Component);

    _createClass(StartPage, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition_ids: React.PropTypes.array.isRequired
            };
        }
    }]);

    function StartPage(props) {
        _classCallCheck(this, StartPage);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.loadData();
        _this.state = {
            all_loaded: false,
            selected_competition: null
        };
        return _this;
    }

    StartPage.prototype.loadCompetitionData = function loadCompetitionData(competition_id) {
        (0, _api.Api)("competition.get", {
            competition_id: competition_id,
            children: {
                judges: {
                    discipline_judges: {}
                }
            }
        }).addToDB("Competition", competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
    };

    StartPage.prototype.loadData = function loadData() {
        this.props.competition_ids.forEach(function (competition_id) {
            this.loadCompetitionData(competition_id);
        }.bind(this));
    };

    StartPage.prototype.reloadFromStorage = function reloadFromStorage() {
        var SCHEMA = {
            judges: {
                discipline_judges: {}
            }
        };
        var all_loaded = true;
        var competitions = this.props.competition_ids.map(function (competition_id) {
            var st_obj = _storage.storage.get("Competition").by_id(competition_id);
            if (!st_obj) {
                all_loaded = false;
                return null;
            }
            return st_obj.serialize(SCHEMA);
        });
        this.setState({
            competitions: competitions,
            all_loaded: all_loaded
        });
    };

    StartPage.prototype.selectCompetition = function selectCompetition(idx) {
        this.setState({
            selected_competition: idx
        });
    };

    StartPage.prototype.renderCompetitionSelector = function renderCompetitionSelector() {
        console.log(this.state.competitions);
        var comps = this.state.competitions.map(function (comp, idx) {
            return React.createElement(
                "div",
                {
                    key: comp.id,
                    className: "button",
                    onClick: this.selectCompetition.bind(this, idx)
                },
                comp.name
            );
        }.bind(this));
        return React.createElement(
            "div",
            { className: "competition-selector" },
            React.createElement(
                "h3",
                null,
                (0, _loader._)("start_page.headers.select_competition")
            ),
            React.createElement(
                "div",
                { className: "list" },
                comps
            )
        );
    };

    StartPage.prototype.render = function render() {
        if (this.props.competition_ids.length === 0) {
            var link = window.location.origin + "/c";
            return React.createElement(
                "div",
                { className: "start-screen" },
                React.createElement(
                    "div",
                    { className: "no-competitions" },
                    React.createElement(
                        "h3",
                        null,
                        (0, _loader._)("start_page.messages.no_competitions")
                    ),
                    React.createElement(
                        "h4",
                        null,
                        (0, _loader._)("start_page.messages.competitions_management_link", link)
                    )
                )
            );
        }
        if (!this.state.all_loaded) {
            return React.createElement(_components.Loader, null);
        }
        if (this.state.selected_competition !== null) {
            return React.createElement(
                "div",
                { className: "start-screen" },
                React.createElement(RoleSelector, { competition: this.state.competitions[this.state.selected_competition] })
            );
        }
        if (this.state.competitions.length === 1) {
            return React.createElement(
                "div",
                { className: "start-screen" },
                React.createElement(RoleSelector, { competition: this.state.competitions[0] })
            );
        }
        return React.createElement(
            "div",
            { className: "start-screen" },
            this.renderCompetitionSelector()
        );
    };

    return StartPage;
}(React.Component);

var RoleSelector = function (_React$Component2) {
    _inherits(RoleSelector, _React$Component2);

    function RoleSelector() {
        _classCallCheck(this, RoleSelector);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    RoleSelector.prototype.render = function render() {
        var all_judges = this.props.competition.judges.filter(function (judge) {
            return judge.discipline_judges.length > 0;
        });
        var line_judges = all_judges.filter(function (judge) {
            return judge.role_description === "";
        }).map(function (judge) {
            return React.createElement(
                "a",
                { key: judge.id, className: "mbtn", href: "/judge/" + judge.id.toString() },
                React.createElement(
                    "div",
                    { className: "title" },
                    (0, _loader._)("global.phrases.judge_n", judge.number)
                ),
                React.createElement(
                    "div",
                    { className: "name" },
                    judge.name
                )
            );
        });
        var staff = all_judges.filter(function (judge) {
            return judge.role_description !== "";
        }).map(function (judge) {
            return React.createElement(
                "a",
                { key: judge.id, className: "mbtn", href: "/judge/" + judge.id.toString() },
                React.createElement(
                    "div",
                    { className: "title" },
                    judge.role_description
                ),
                React.createElement(
                    "div",
                    { className: "name" },
                    judge.name
                )
            );
        });
        return React.createElement(
            "div",
            { className: "role-selector" },
            React.createElement(
                "h3",
                null,
                (0, _loader._)("start_page.headers.select_role")
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-md-4 group" },
                    React.createElement(
                        "div",
                        { className: "btn-group-vertical full-width" },
                        staff
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-md-4 group" },
                    React.createElement(
                        "div",
                        { className: "btn-group-vertical full-width" },
                        line_judges
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-md-4 group" },
                    React.createElement(
                        "div",
                        { className: "btn-group-vertical full-width" },
                        React.createElement(
                            "a",
                            { href: "/presenter/" + this.props.competition.id.toString(), className: "mbtn no-title" },
                            (0, _loader._)("start_page.roles.presenter")
                        ),
                        React.createElement(
                            "a",
                            { href: "/admin/" + this.props.competition.id.toString(), className: "mbtn no-title" },
                            (0, _loader._)("start_page.roles.administrator")
                        ),
                        React.createElement(
                            "a",
                            { href: "/screen_operator/" + this.props.competition.id.toString(), className: "mbtn no-title" },
                            (0, _loader._)("start_page.roles.screen_operator")
                        )
                    )
                )
            )
        );
    };

    _createClass(RoleSelector, null, [{
        key: "propTypes",
        get: function get() {
            return {
                competition: React.PropTypes.object.isRequired
            };
        }
    }]);

    return RoleSelector;
}(React.Component);

},{"i10n/loader":2,"server/api":4,"server/storage":5,"ui/components":7}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":3}],3:[function(require,module,exports){
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
                "competition_name": "Наименование соревнования",
                "competition_date": "Дата проведения",
                "group_by_clubs": "Группировать по клубам",
                "include_acrobatics": "Включить акробатику",
                "include_formation_sportsmen": "Включить состав формейшнов",
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
                "change_judges_with_finalized_tour": "Невозможно изменить состав судей для дисциплины, содержащей финализированные туры ",
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
                "stop_tour_and_start_next": "Перейти к следующему туру",
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

},{}],4:[function(require,module,exports){
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

},{"i10n/loader":2,"server/storage":5,"ui/dialogs":8}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

var _start_page = require("clients/start_page");

ReactDOM.render(React.createElement(_start_page.StartPage, window.page_props), window.document.getElementById("content"));

},{"clients/start_page":1}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;

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

},{}],8:[function(require,module,exports){
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

},{"i10n/loader":2}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcY2xpZW50c1xcc3RhcnRfcGFnZS5qc3giLCJzcmNcXGpzeFxcaTEwblxcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxpMTBuXFxydS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxhcGkuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcc3RhcnRfcGFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ01hOzs7Ozs0QkFDYztBQUNuQixtQkFBTztBQUNILGlDQUFpQixNQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsVUFBdEI7YUFEckIsQ0FEbUI7Ozs7QUFLdkIsYUFOUyxTQU1ULENBQVksS0FBWixFQUFtQjs4QkFOVixXQU1VOztxREFDZiw0QkFBTSxLQUFOLEdBRGU7O0FBRWYsY0FBSyxRQUFMLEdBRmU7QUFHZixjQUFLLEtBQUwsR0FBYTtBQUNULHdCQUFZLEtBQVo7QUFDQSxrQ0FBc0IsSUFBdEI7U0FGSixDQUhlOztLQUFuQjs7QUFOUyx3QkFjVCxtREFBb0IsZ0JBQWdCO0FBQ2hDLHNCQUFJLGlCQUFKLEVBQXVCO0FBQ25CLDRCQUFnQixjQUFoQjtBQUNBLHNCQUFVO0FBQ04sd0JBQVE7QUFDSix1Q0FBbUIsRUFBbkI7aUJBREo7YUFESjtTQUZKLEVBUUMsT0FSRCxDQVFTLGFBUlQsRUFRd0IsY0FSeEIsRUFTQyxTQVRELENBU1csS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQVRYLEVBVUMsSUFWRCxHQURnQzs7O0FBZDNCLHdCQTJCVCwrQkFBVztBQUNQLGFBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIs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RDtpQkFBUDthQUFyRDtTQUFQLENBREs7OztXQURBO0VBQWUsTUFBTSxTQUFOOzs7Ozs7Ozs7UUNHWjtRQVdBOzs7O0FBWFQsU0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCO0FBQzNCLFFBQUksUUFBUSxRQUFRLGlEQUFQLEtBQWUsUUFBZixHQUEyQixJQUFJLENBQUosQ0FBNUIsR0FBcUMsZUFBRSw4QkFBRixDQUFyQyxDQURlO0FBRTNCLFFBQUksT0FBTyxRQUFRLGlEQUFQLEtBQWUsUUFBZixHQUEyQixJQUFJLENBQUosQ0FBNUIsR0FBcUMsR0FBckMsQ0FGZ0I7QUFHM0IsU0FBSztBQUNELGVBQU8sS0FBUDtBQUNBLGNBQU0sSUFBTjtBQUNBLGNBQU0sT0FBTjtBQUNBLG1CQUFXLEtBQVg7S0FKSixFQUgyQjtDQUF4Qjs7QUFXQSxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEIsTUFBOUIsRUFBOEQ7UUFBeEIseUVBQWlCLHFCQUFPOztBQUNqRSxXQUFPLEtBQUs7QUFDUixlQUFPLE9BQVA7QUFDQSxtQkFBVyxLQUFYO0FBQ0EsMEJBQWtCLElBQWxCO0FBQ0EsMkJBQW1CLGVBQUUsbUJBQUYsQ0FBbkI7QUFDQSwwQkFBa0IsZUFBRSxrQkFBRixDQUFsQjtBQUNBLHdCQUFnQixnQkFBaEI7S0FORyxFQU9KLE1BUEksQ0FBUCxDQURpRTtDQUE5RCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhcnRQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uX2lkczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBhbGxfbG9hZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRfY29tcGV0aXRpb246IG51bGwsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbG9hZENvbXBldGl0aW9uRGF0YShjb21wZXRpdGlvbl9pZCkge1xyXG4gICAgICAgIEFwaShcImNvbXBldGl0aW9uLmdldFwiLCB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uX2lkOiBjb21wZXRpdGlvbl9pZCxcclxuICAgICAgICAgICAgY2hpbGRyZW46IHtcclxuICAgICAgICAgICAgICAgIGp1ZGdlczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7fSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYWRkVG9EQihcIkNvbXBldGl0aW9uXCIsIGNvbXBldGl0aW9uX2lkKVxyXG4gICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICBsb2FkRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkcy5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBldGl0aW9uX2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZENvbXBldGl0aW9uRGF0YShjb21wZXRpdGlvbl9pZCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xyXG4gICAgICAgIHZhciBTQ0hFTUEgPSB7XHJcbiAgICAgICAgICAgIGp1ZGdlczoge1xyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IHt9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWxsX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IGNvbXBldGl0aW9ucyA9IHRoaXMucHJvcHMuY29tcGV0aXRpb25faWRzLm1hcChmdW5jdGlvbihjb21wZXRpdGlvbl9pZCkge1xyXG4gICAgICAgICAgICBsZXQgc3Rfb2JqID0gc3RvcmFnZS5nZXQoXCJDb21wZXRpdGlvblwiKS5ieV9pZChjb21wZXRpdGlvbl9pZCk7XHJcbiAgICAgICAgICAgIGlmICghc3Rfb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxfbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3Rfb2JqLnNlcmlhbGl6ZShTQ0hFTUEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjb21wZXRpdGlvbnM6IGNvbXBldGl0aW9ucyxcclxuICAgICAgICAgICAgYWxsX2xvYWRlZDogYWxsX2xvYWRlZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNlbGVjdENvbXBldGl0aW9uKGlkeCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzZWxlY3RlZF9jb21wZXRpdGlvbjogaWR4LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQ29tcGV0aXRpb25TZWxlY3RvcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmNvbXBldGl0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNvbXBzID0gdGhpcy5zdGF0ZS5jb21wZXRpdGlvbnMubWFwKGZ1bmN0aW9uKGNvbXAsIGlkeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGNvbXAuaWQgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMuc2VsZWN0Q29tcGV0aXRpb24uYmluZCh0aGlzLCBpZHgpIH1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7IGNvbXAubmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29tcGV0aXRpb24tc2VsZWN0b3JcIj5cclxuICAgICAgICAgICAgPGgzPnsgXyhcInN0YXJ0X3BhZ2UuaGVhZGVycy5zZWxlY3RfY29tcGV0aXRpb25cIikgfTwvaDM+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgeyBjb21wcyB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbXBldGl0aW9uX2lkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGxpbmsgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgXCIvY1wiO1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzdGFydC1zY3JlZW5cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm8tY29tcGV0aXRpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInN0YXJ0X3BhZ2UubWVzc2FnZXMubm9fY29tcGV0aXRpb25zXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoND57IF8oXCJzdGFydF9wYWdlLm1lc3NhZ2VzLmNvbXBldGl0aW9uc19tYW5hZ2VtZW50X2xpbmtcIiwgbGluaykgfTwvaDQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5hbGxfbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkX2NvbXBldGl0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInN0YXJ0LXNjcmVlblwiPlxyXG4gICAgICAgICAgICAgICAgPFJvbGVTZWxlY3RvciBjb21wZXRpdGlvbj17IHRoaXMuc3RhdGUuY29tcGV0aXRpb25zW3RoaXMuc3RhdGUuc2VsZWN0ZWRfY29tcGV0aXRpb25dIH0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbXBldGl0aW9ucy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic3RhcnQtc2NyZWVuXCI+XHJcbiAgICAgICAgICAgICAgICA8Um9sZVNlbGVjdG9yIGNvbXBldGl0aW9uPXsgdGhpcy5zdGF0ZS5jb21wZXRpdGlvbnNbMF0gfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic3RhcnQtc2NyZWVuXCI+XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb21wZXRpdGlvblNlbGVjdG9yKCkgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgUm9sZVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgYWxsX2p1ZGdlcyA9IHRoaXMucHJvcHMuY29tcGV0aXRpb24uanVkZ2VzLmZpbHRlcigoanVkZ2UpID0+IGp1ZGdlLmRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIGxldCBsaW5lX2p1ZGdlcyA9IGFsbF9qdWRnZXNcclxuICAgICAgICAgICAgLmZpbHRlcigoanVkZ2UpID0+IGp1ZGdlLnJvbGVfZGVzY3JpcHRpb24gPT09IFwiXCIpXHJcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24oanVkZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8YSBrZXk9eyBqdWRnZS5pZCB9IGNsYXNzTmFtZT1cIm1idG5cIiBocmVmPXsgXCIvanVkZ2UvXCIgKyBqdWRnZS5pZC50b1N0cmluZygpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwucGhyYXNlcy5qdWRnZV9uXCIsIGp1ZGdlLm51bWJlcikgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGp1ZGdlLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc3RhZmYgPSBhbGxfanVkZ2VzXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGp1ZGdlKSA9PiBqdWRnZS5yb2xlX2Rlc2NyaXB0aW9uICE9PSBcIlwiKVxyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uKGp1ZGdlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGEga2V5PXsganVkZ2UuaWQgfSBjbGFzc05hbWU9XCJtYnRuXCIgaHJlZj17IFwiL2p1ZGdlL1wiICsganVkZ2UuaWQudG9TdHJpbmcoKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBqdWRnZS5yb2xlX2Rlc2NyaXB0aW9uIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBqdWRnZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicm9sZS1zZWxlY3RvclwiPlxyXG4gICAgICAgICAgICA8aDM+eyBfKFwic3RhcnRfcGFnZS5oZWFkZXJzLnNlbGVjdF9yb2xlXCIpIH08L2gzPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwLXZlcnRpY2FsIGZ1bGwtd2lkdGhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGFmZiB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTQgZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cC12ZXJ0aWNhbCBmdWxsLXdpZHRoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbGluZV9qdWRnZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00IGdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAtdmVydGljYWwgZnVsbC13aWR0aFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXsgXCIvcHJlc2VudGVyL1wiICsgdGhpcy5wcm9wcy5jb21wZXRpdGlvbi5pZC50b1N0cmluZygpIH0gY2xhc3NOYW1lPVwibWJ0biBuby10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwic3RhcnRfcGFnZS5yb2xlcy5wcmVzZW50ZXJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBcIi9hZG1pbi9cIiArIHRoaXMucHJvcHMuY29tcGV0aXRpb24uaWQudG9TdHJpbmcoKSB9IGNsYXNzTmFtZT1cIm1idG4gbm8tdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInN0YXJ0X3BhZ2Uucm9sZXMuYWRtaW5pc3RyYXRvclwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17IFwiL3NjcmVlbl9vcGVyYXRvci9cIiArIHRoaXMucHJvcHMuY29tcGV0aXRpb24uaWQudG9TdHJpbmcoKSB9IGNsYXNzTmFtZT1cIm1idG4gbm8tdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInN0YXJ0X3BhZ2Uucm9sZXMuc2NyZWVuX29wZXJhdG9yXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHRyYW5zbGF0ZSwgZ2V0UG9zc2libGVUb3VyTmFtZXMgfSBmcm9tIFwiLi9ydVwiO1xyXG5cclxuZXhwb3J0IHZhciBfID0gdHJhbnNsYXRlO1xyXG5leHBvcnQgdmFyIHRvdXJfbmFtZXMgPSBnZXRQb3NzaWJsZVRvdXJOYW1lcygpO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKHNyYywgYXJnKSB7XHJcbiAgICBmdW5jdGlvbiBjaG9vc2VFbmRpbmcobiwgZTEsIGUyLCBlNSkge1xyXG4gICAgICAgIGxldCB4ID0gbiAlIDEwMDtcclxuICAgICAgICBpZiAoTWF0aC5mbG9vcih4IC8gMTApID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPj0gNSB8fCB4ICUgMTAgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTI7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IFBIUkFTRVMgPSB7XHJcbiAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogKHZlcnNpb24sIGRhdGUpID0+IDxkaXYgY2xhc3NOYW1lPVwiYWJvdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48Yj5Sb2NrSnVkZ2Uge3ZlcnNpb259PC9iPiAo0L7RgiB7ZGF0ZX0pICZtZGFzaDsg0YHQuNGB0YLQtdC80LAg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Lkg0L/QviDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQvtC80YMg0YDQvtC6LdC9LdGA0L7Qu9C70YMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCQ0LLRgtC+0YDRgdC60LjQtSDQv9GA0LDQstCwINC90LAg0YHQuNGB0YLQtdC80YMgUm9ja0p1ZGdlINC/0L7Qu9C90L7RgdGC0YzRjiDQv9GA0LjQvdCw0LTQu9C10LbQsNGCINGA0LDQt9GA0LDQsdC+0YLRh9C40LrRgyDQkNGA0YLQtdC80YMg0JrQsNC30LDQutC+0LLRgy4g0KHQvtCw0LLRgtC+0YAg0YHQuNGB0YLQtdC80Ysg0JDQvdGC0L7QvSDQkNC80LXQu9C40L0uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCh0LjRgdGC0LXQvNCwINGA0LDRgdC/0YDQvtGB0YLRgNCw0L3Rj9C10YLRgdGPINC/0L4g0LvQuNGG0LXQvdC30LjQuCBMaW51bSBkLm8ubyAoaW5mb0BsaW51bS5ocikuINCU0LvRjyDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LAgUm9ja0p1ZGdlINC90LXQvtCx0YXQvtC00LjQvNC+INC4INC00L7RgdGC0LDRgtC+0YfQvdC+INC40LzQtdGC0Ywg0L/RgNCw0LLQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyBMaW51bSBMUFMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCe0YTQuNGG0LjQsNC70YzQvdGL0Lkg0YHQsNC50YI6IDxhIGhyZWY9XCJodHRwczovL3JvY2tqdWRnZS5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+aHR0cHM6Ly9yb2NranVkZ2UuY29tLzwvYT48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wcm9ncmFtc19hZnRlcl9jcmVhdGlvblwiOiBcItCf0YDQvtCz0YDQsNC80LzRiyDQvNC+0LbQvdC+INCx0YPQtNC10YIg0LTQvtCx0LDQstC40YLRjCDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRgdC+0YXRgNCw0L3QtdC90LjRjyDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC60L7RgNGA0LXQutGC0L3QviDQvdCw0YHRgtGA0L7QtdC90LAg0Lgg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LAuXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9ub3RfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0L3QtdC00L7RgdGC0YPQv9C90LAg0L3QsCDRjdGC0L7QvCDQutC+0LzQv9GM0YLQtdGA0LUuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbmFsaXplZFwiOiBcItCe0YLRgdGD0YLRgdGC0LLRg9GO0YIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV93YXJuaW5nXCI6IDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz7QpNC40L3QsNC70LjQt9Cw0YbQuNGPINC00L7Qu9C20L3QsCDQvtGC0LzQtdC90Y/RgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0LjRgdC60LvRjtGH0LjRgtC10LvRjNC90YvRhSDRgdC70YPRh9Cw0Y/RhSE8L3N0cm9uZz48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JXRgdC70Lgg0LbQtSDRjdGC0L4g0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0L3QtdC+0LHRhdC+0LTQuNC80L4sINC+0LHRgNCw0YLQuNGC0LUg0LLQvdC40LzQsNC90LjQtSwg0YfRgtC+INC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YHQv9C40YHQvtC6INGD0YfQsNGB0YLQvdC40LrQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAg0YHQu9C10LTRg9GO0YnQtdCz0L4g0YLRg9GA0LAg0LHRg9C00LXRgiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuCDQv9C10YDQtdGB0L7Qt9C00LDQvS4g0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YPRh9Cw0YHRgtC90LjQutC+0LIsINC/0YDQvtGI0LXQtNGI0LjRhSDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC/0L7RgdC70LUg0L/QtdGA0LLQvtC5XHJcbiAgICAgICAgICAgICAgICAgICAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDQuCDQvdC1INC/0YDQvtGI0LXQtNGI0LjRhSDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDQsdGD0LTRg9GCINCx0LXQt9Cy0L7Qt9Cy0YDQsNGC0L3QviDRg9GC0LXRgNGP0L3RiyE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0Jgg0L3QtSDQt9Cw0LHRg9C00YzRgtC1INC30LDQvdC+0LLQviDQvdCw0L/QtdGH0LDRgtCw0YLRjCDQstGB0LUg0YLQsdC70LjRhtGLLjwvcD48L2Rpdj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINGB0LsuwqDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmludF90ZXN0X3BhZ2VcIjogXCLQndCw0L/QtdGH0LDRgtCw0YLRjCDRgtC10YHRgtC+0LLRg9GOINGB0YLRgNCw0L3QuNGG0YNcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVcIjogXCLQntGH0LXRgNC10LTRjCDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVfZW1wdHlcIjogXCLQntGH0LXRgNC10LTRjCDQv9GD0YHRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJydWxlc1wiOiBcItCX0LDQtNCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF9wYWdlXCI6IFwi0KLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfdGV4dFwiOiBcItCt0YLQviDRgtC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LAgUm9ja0p1ZGdlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25cIjogXCLQodC+0LfQtNCw0YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uX3BsYW5faXRlbVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9qdWRnZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YHRg9C00YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcGFydGljaXBhbnRcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRcIjogXCLQrdC60YHQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxhdW5jaF9hdXRvX3ByaW50ZXJcIjogXCLQl9Cw0L/Rg9GB0Log0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60L7QuSDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCe0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0YPRgdGC0YDQvtC50YHRgtCy0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fcGxhblwiOiBcItCh0L7RgNGC0LjRgNC+0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVcIjogXCLQntGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jbHViXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0LrQu9GD0LE/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jb21wZXRpdGlvblwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQviDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LU/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9kaXNjaXBsaW5lXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC00LjRgdGG0LjQv9C70LjQvdGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfanVkZ2VcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGB0YPQtNGM0Y4/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQv9GA0L7Qs9GA0LDQvNC80YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDRgdGC0YDQsNC90LjRhtGDINC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjiDRgtGD0YDQsD8g0JLQstC10LTQuNGC0LUgwqt1bmZpbmFsaXplwrssINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogXCLQniDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xpZW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0L/QvtC00LrQu9GO0YfQtdC90L3Ri9C80Lgg0YPRgdGC0YDQvtC50YHRgtCy0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9tYW5hZ2VtZW50XCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3Nob3duXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0YLQvtC70YzQutC+INC/0L4g0YHQu9C10LTRg9GO0YnQuNC8INC00LjRgdGG0LjQv9C70LjQvdCw0Lw6XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydF9jb21wZXRpdGlvblwiOiBcItCt0LrRgdC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsCDQuCDRgNC10LfRg9C70YzRgtCw0YLQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9jb21wZXRpdGlvblwiOiBcItCY0LzQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNC10LnRgdC60LDRjyDQsdGA0LjQs9Cw0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb2JhdGljc1wiOiBcItCX0LDQs9GA0YPQt9C60LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRg9GH0LDRgdGC0L3QuNC60LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VfbWVudVwiOiBcItCh0LXRgNCy0LjRgdC90L7QtSDQvNC10L3RjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fbmFtZVwiOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fZGF0ZVwiOiBcItCU0LDRgtCwINC/0YDQvtCy0LXQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmlsZXNfc2VsZWN0ZWRcIjogXCLQktGL0LHQtdGA0LjRgtC1INGE0LDQudC7Li4uXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3N1bW1hcnlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0LrQvtC70LjRh9C10YHRgtCy0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3ViXCI6IFwi0LfQsNC/XCIsICAvLyBzdWJzdGl0dXRlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Bhc3Njb2RlXCI6IFwi0JLQstC10LTRkdC9INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC/0L7RgtCy0LXRgNC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lbnVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NsdWJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9kaXNjaXBsaW5lc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfanVkZ2VzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3Nwb3J0c21lblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L/QvtGA0YLRgdC80LXQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfdG91cnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgtGD0YDQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuX3BhcnRpY2lwYW50c1wiOiBuID0+IG4udG9TdHJpbmcoKSArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5cIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxfbl9wYXJ0aWNpcGFudHNcIjogbiA9PiBcItCY0YLQvtCz0L4gXCIgKyBuICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdpbmctdGFic1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvdXItYWRtaW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZS1yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZXJyb3JzXCI6IHtcclxuICAgICAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxvYWRfc3ludGF4X2Vycm9yXCI6IFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQtNCw0L3QvdGL0YVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhcGlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkdXBsaWNhdGVkX2V4dGVybmFsX2lkXCI6IFwi0JIg0LTQsNC90L3Ri9GFINC40LzQtdGO0YLRgdGPINC30LDQv9C40YHQuCDRgSDQv9C+0LLRgtC+0YDRj9GO0YnQuNC80LjQvNGB0Y8gZXh0ZXJuYWxfaWRcIixcclxuICAgICAgICAgICAgICAgIFwidW5hYmxlX3RvX2dldFwiOiAod2FudGVkKSA9PiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0L7Qu9GD0YfQuNGC0YwgXCIgKyB3YW50ZWQgKyBcIiDQuNC3INC30LDQv9GA0L7RgdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC60LvRg9CxLCDQuiDQutC+0YLQvtGA0L7QvNGDINC/0YDQuNCy0Y/Qt9Cw0L3RiyDRg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9ub25fZW1wdHlcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUsINGB0L7QtNC10YDQttCw0YnQtdC1INC00LjRgdGG0LjQv9C70LjQvdGLLCDQutC70YPQsdGLINC40LvQuCDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvb19tYW55X3RvdXJzXCI6IChkKSA9PiBbXCLQntGI0LjQsdC60LAg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLCBg0JIg0LTQuNGB0YbQuNC/0LvQuNC90LUgJHtkfSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsdC+0LvRjNGI0LUg0YLRg9GA0L7Qsiwg0YfQtdC8INGB0L7Qt9C00LDQvdC+INCyINGB0LjRgdGC0LXQvNC1YF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2hhbmdlX2p1ZGdlc193aXRoX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdC+0YHRgtCw0LIg0YHRg9C00LXQuSDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YssINGB0L7QtNC10YDQttCw0YnQtdC5INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLIFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBlYXRpbmdfanVkZ2VcIjogKG5hbWUpID0+IG5hbWUgKyBcIiDQstGB0YLRgNC10YfQsNC10YLRgdGPINCyINGB0L/QuNGB0LrQtSDRgdGD0LTQtdC5INCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGA0LDQt9CwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxfc2VydmVyX2Vycm9yXCI6IFtcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1XCIsIFwi0L/RgNC+0LLQtdGA0YzRgtC1INC70L7Qs9C4INC00LvRjyDQuNC90YTQvtGA0LzQsNGG0LjQuFwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2Rpc2NpcGxpbmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0LLRhdC+0LTRj9GJ0LXQs9C+INCyINGB0YPQtNC10LnRgdC60YPRjiDQsdGA0LjQs9Cw0LTRgyDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJydW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXRfcGVyZm9ybWVkX2ZsYWdfb25fZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGF0L7QtNCwINGE0LjQvdCw0LvQuNC30LjQvdC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNjb3JlX25vdF9leGlzdFwiOiBcItCf0L7Qv9GL0YLQutCwINC/0L7Qu9GD0YfQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC5INC+0YbQtdC90LrQuCDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgtGD0YAsINC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RidC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3RvX25vbl9lbXB0eVwiOiAoZCkgPT4gW1wi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNCz0YDRg9C30LjRgtGMINGC0YPRgNGLINC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLCBg0JTQuNGB0YbQuNC/0LvQuNC90LAgJHtkfSDRg9C20LUg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRi2BdLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfZmluYWxpemVkXCI6IFwi0JTQu9GPINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LAg0L3QtSDQtNC+0L/Rg9GB0LrQsNC10YLRgdGPINC40LfQvNC10L3QtdC90LjQtSDQutCy0L7RgtGLINCy0YvQstC+0LTQsCwg0YLQuNC/0LAg0YLRg9GA0LAg0LjQu9C4INGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZVwiOiBcItCj0LTQsNC70LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2F2ZVwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcclxuICAgICAgICAgICAgICAgIFwieWVzXCI6IFwi0JTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9lcnJvclwiOiBcItCf0L7RhdC+0LbQtSwg0LjQvNC10Y7RgtGB0Y8g0L/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImVycm9yX2hlYWRlclwiOiBcItCe0YjQuNCx0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWNjZXNzXCI6IFwi0J7Qv9C10YDQsNGG0LjRjyDRg9GB0L/QtdGI0L3QviDQt9Cw0LLQtdGA0YjQtdC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGVhdF9uXCI6IChuKSA9PiBcItCX0LDRhdC+0LQg4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IFwi0JvQuNC90LXQudC90YvQuSDRgdGD0LTRjNGPIOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIChuX3NwID4gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwi0KTQvtGA0LzQtdC50YjQvSDihJZcIiArIG4udG9TdHJpbmcoKSArIChuYW1lID8gXCI6IFwiICsgbmFtZSA6IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKG5fc3AgPT09IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQn9Cw0YDQsCDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcItCj0YfQsNGB0YLQvdC40Log4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSArIG4udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2luZ1wiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQn9C10YDQtdGB0L7Qt9C00LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9hY3JvYmF0aWNfb3ZlcnJpZGVcIjogXCLQodCx0YDQvtGBXCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQn9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfdG91clwiOiBcItCd0LDRh9Cw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0J7RgdGC0LDQvdC+0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQv9GA0L7Qs9GA0LDQvNC80YMg0LTQu9GPINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsdCw0LfQvtCy0YvRhSDQvtGG0LXQvdC+0Log0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9faWR4XCI6IFwi4oSWINGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtZWRcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuZXdfc2NvcmVcIjogXCLQmtC+0YDRgC5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICBcIm9sZF9zY29yZVwiOiBcItCR0LDQt9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCSXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW9kZWxzXCI6IHtcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQu9GD0LHQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3RpdmVcIjogXCLQkNC60YLQuNCy0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwi0JTQsNGC0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LTQu9GPINC/0YDQvtGC0L7QutC+0LvQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdGl0bGVcIjogXCLQl9Cw0LPQvtC70L7QstC+0LpcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3ZhbHVlXCI6IFwi0JfQvdCw0YfQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5faXRlbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2VfbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IFwi0JrQsNGC0LXQs9C+0YDQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvS4gSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCkLiDQmC4g0J4uXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcItCg0L7Qu9GMINCyINGB0YPQtNC10LnRgdGC0LLQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlX2Rlc2NyaXB0aW9uXCI6IFwi0JTQvtC70LbQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25zXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCe0YbQtdC90LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9uYW1lXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9jaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9uYW1lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiBcItCY0LzRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJcIjogXCLQn9C+0LtcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX2ZcIjogXCLQllwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfbVwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmVyYWxfaW5mb1wiOiBcItCe0YHQvdC+0LLQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60L7QvNCw0L3QtNGLINGE0L7RgNC80LXQudGI0L1cIixcclxuICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwi0KTQsNC80LjQu9C40Y9cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcm9ncmFtc1wiOiBcItCf0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX25cIjogXCLQntGB0L0uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfeVwiOiBcItCX0LDQvy5cIixcclxuICAgICAgICAgICAgICAgIFwieWVhcl9vZl9iaXJ0aFwiOiBcItCT0L7QtCDRgNC+0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInlvYlwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2dyYW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X2ZvclwiOiBcItCf0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X3Byb2dyYW1cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19ob3BlX3RvdXJcIjogXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bV9hZHZhbmNlc1wiOiBcItCa0LLQvtGC0LAg0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19wZXJfaGVhdFwiOiBcItCj0YfQsNGB0YLQvdC40LrQvtCyINCyINC30LDRhdC+0LTQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY29yaW5nX3N5c3RlbV9uYW1lXCI6IFwi0KHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2hlYXRcIjogXCLQodCx0YDQvtGBINC90L7QvNC10YDQsCDQt9Cw0YXQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfcGxhY2VcIjogXCLQodCx0YDQvtGBINC80LXRgdGC0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlc1wiOiBcItCc0LXRgdGC0LAg0LTQu9GPINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInByZXNlbnRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm9fYWN0aXZlX3RvdXJcIjogXCLQndC10YIg0LDQutGC0LjQstC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub3RfZmluYWxpemVkXCI6IFwi0JTQsNC90L3Ri9C1INGA0LXQt9GD0LvRjNGC0LDRgtGLINC90LUg0Y/QstC70Y/RjtGC0YHRjyDQvtC60L7QvdGH0LDRgtC10LvRjNC90YvQvNC4LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwcmludFwiOiBcItCf0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGVfdmlld1wiOiBcItCj0L/RgNC+0YnQtdC90L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2Vfdmlld1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzdGFydF9wYWdlXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2NvbXBldGl0aW9uXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUg0LTQu9GPINC/0YDQvtC00L7Qu9C20LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X3JvbGVcIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0LLQvtGOINGA0L7Qu9GMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19jb21wZXRpdGlvbnNcIjogXCLQndC10YIg0LDQutGC0LjQstC90YvRhSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRfbGlua1wiOiAobGluaykgPT4gPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAg0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuCDQvdCw0YXQvtC00LjRgtGB0Y8g0L/QviDQsNC00YDQtdGB0YMmbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXsgbGluayB9PnsgbGluayB9PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkbWluaXN0cmF0b3JcIjogXCLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY3JlZW5cIjogXCLQrdC60YDQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiBcItCe0L/QtdGA0LDRgtC+0YAg0Y3QutGA0LDQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YNcIixcclxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LXQstGL0YXQvtC0INC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfc3RvcHdhdGNoXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9zdG9wd2F0Y2hcIjogXCLQodGC0LDRgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQn9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuXHJcbmNsYXNzIEFwaUltcGwge1xyXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gKG1zZywgY29kZSwgYXJncykgPT4gc2hvd0Vycm9yKGNvZGUgPyBfKGNvZGUsIC4uLmFyZ3MpIDogbXNnKTtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSAoLi4uZGF0YSkgPT4gY29uc29sZS5lcnJvcihcIkFQSSBmYWlsXCIsIC4uLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uU3VjY2VzcyhjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25FcnJvcihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRmFpbChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkVG9EQihtb2RlbF90eXBlLCBtb2RlbF9pZCwgc3Q9c3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbmQoKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbiIsImNsYXNzIFJlZiB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lLCBpZCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5tb2RlbF9uYW1lKS5ieV9pZCh0aGlzLmlkKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgaWQsIG1vZGVsX3N0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fX3N0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXMgPSB7fTtcclxuICAgICAgICB0aGlzLl9fbW9kZWxfc3RvcmFnZSA9IG1vZGVsX3N0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGRCYWNrUmVmKGtleSwgcmVmKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gcmVmO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGRhdGEsIGNyZWF0ZT10cnVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkeCkpIHtcclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiIHx8IGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZSAmJiB0eXBlb2YgdGhpc1tpZHguc2xpY2UoMSldID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIHRoaXMuX19tb2RlbF9zdG9yYWdlLm1vZGVsX25hbWUsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmX2tleSA9IGRhdGFbaWR4XS5iYWNrX3JlZjtcclxuICAgICAgICAgICAgICAgIGRhdGFbaWR4XS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKG5lc3RlZF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YS5kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmLmdldCgpLmFkZEJhY2tSZWYoYmFja19yZWZfa2V5LCBiYWNrX3JlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldLnB1c2gocmVmKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIipcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRfZGF0YSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2lkeF0gPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2lkeF0gPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VyaWFsaXplKHNjaGVtYSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9fa2V5X3R5cGVzKSBpZiAodGhpcy5fX2tleV90eXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fX2tleV90eXBlc1trZXldKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLm1hcChmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZi5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJeXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5pZCA9IHRoaXMuaWRcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbHNTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMubW9kZWxzID0ge307XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZChpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbHNbaWRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXSA9IG5ldyBNb2RlbCh0aGlzLnN0b3JhZ2UsIGlkLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsc1tpZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBieV9pZChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpZF07XHJcbiAgICB9XHJcbiAgICBhbGwoKSB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1vZGVscyk7XHJcbiAgICAgICAgcmV0dXJuIGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNba2V5XTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlcyA9IHt9XHJcbiAgICAgICAgdGhpcy5kb21haW5zID0ge31cclxuICAgIH1cclxuICAgIGdldERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZG9tYWluc1tkb21haW5dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tYWluc1tkb21haW5dID0gbmV3IFN0b3JhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZGVsRG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGdldChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPSBuZXcgTW9kZWxzU3RvcmFnZSh0aGlzLCBtb2RlbF9uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICBkZWwobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTW9kZWwobW9kZWxfdHlwZSwgbW9kZWxfaWQsIGRhdGEpIHtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfdHlwZV0pIHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCBkYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZG9tYWlucykuZm9yRWFjaCgoa2V5KSA9PlxyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmRvbWFpbnNba2V5XS51cGRhdGVNb2RlbCguLi5hcmd1bWVudHMpIHx8IGRhdGFfY2hhbmdlZCk7XHJcbiAgICAgICAgLy8gcmV0dXJuIGRhdGFfY2hhbmdlZDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxyXG4iLCJpbXBvcnQgeyBTdGFydFBhZ2UgfSBmcm9tIFwiY2xpZW50cy9zdGFydF9wYWdlXCI7XHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFN0YXJ0UGFnZSB7IC4uLndpbmRvdy5wYWdlX3Byb3BzIH0gLz4sXHJcbiAgICB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpXHJcbik7XHJcbiIsImV4cG9ydCBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgc3R5bGU9e3sgXCJoZWlnaHRcIjogXCIxMDAlXCIsIFwid2lkdGhcIjogXCIxMDAlXCIgfX0+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIgfX0+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvaW1nL2FqYXgtbG9hZGVyLmdpZlwiIC8+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XHJcbiAgICBsZXQgdGl0bGUgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMF0gOiBfKFwiZ2xvYmFsLm1lc3NhZ2VzLmVycm9yX2hlYWRlclwiKTtcclxuICAgIGxldCB0ZXh0ID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzFdIDogbXNnO1xyXG4gICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDb25maXJtKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkge1xyXG4gICAgcmV0dXJuIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxyXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxyXG4gICAgfSwgYWN0aW9uKTtcclxufVxyXG4iXX0=
