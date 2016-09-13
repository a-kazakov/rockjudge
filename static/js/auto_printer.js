(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _AutoPrinter = require("AdminPanel/Service/AutoPrinter");

var _AutoPrinter2 = _interopRequireDefault(_AutoPrinter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(_AutoPrinter2.default, window.page_props), document.getElementById("content"));

},{"AdminPanel/Service/AutoPrinter":24}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocxImpl = function () {
    function DocxImpl(filename) {
        _classCallCheck(this, DocxImpl);

        this.filename = filename;
        this.header = null;
        this.title1 = null;
        this.title2 = null;
        this.title3 = null;
        this.margins = null;
        this.body = "";
        this.orientation = "portrait";
        this.styles = {
            "body": {
                "font-size": "10pt",
                "font-family": "Calibri, Tahoma, Arial, sans-serif"
            },
            "table": {
                "border-collapse": "collapse",
                "width": "100%"
            },
            "tr": {
                "page-break-inside": "avoid"
            },
            "td, th": {
                "padding": "1pt 3pt"
            },
            "h1, h2, h3, h4, h5, h6": {
                "page-break-after": "avoid",
                "margin-bottom": 0
            },
            "h1": {
                "font-size": "20pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "10pt"
            },
            "h2": {
                "font-size": "16pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "6pt"
            },
            "h3": {
                "font-size": "16pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "4pt"
            },
            "h4 p": {
                "font-size": "14pt",
                "font-weight": "bold",
                "margin": "10pt 0 6pt"
            },
            "h5 p": {
                "font-size": "12pt",
                "font-weight": "bold",
                "margin": "6pt 0"
            },
            ".header": {
                "border-bottom": "1px solid black",
                "font-size": "10pt",
                "font-weight": "bold",
                "margin": 0,
                "padding-bottom": "2pt",
                "margin-bottom": "20pt",
                "text-align": "center"
            },
            "p": {
                "margin": 0,
                "padding": 0
            },
            "li": { "margin-top": 0, "padding-top": 0 },
            ".spacer": {
                "font-size": "14pt"
            },
            ".va-top": {
                "vertical-align": "top"
            },
            ".text-left": { "text-align": "left" },
            ".text-right": { "text-align": "right" },
            ".text-center": { "text-align": "center" },
            ".bordered-table td, .bordered-table th": {
                "border": "1pt solid black"
            }
        };
        this.addWidthCss();
    }

    _createClass(DocxImpl, [{
        key: "addWidthCss",
        value: function addWidthCss() {
            for (var i = 1; i <= 100; ++i) {
                this.addStyle(".w-" + i, "width", i + "%");
            }
        }
    }, {
        key: "addStyle",
        value: function addStyle(selector, key, value) {
            if (!this.styles[selector]) {
                this.styles[selector] = {};
            }
            this.styles[selector][key] = value;
            return this;
        }
    }, {
        key: "setHeader",
        value: function setHeader(header) {
            this.header = header;
            return this;
        }
    }, {
        key: "setTitle1",
        value: function setTitle1(title1) {
            this.title1 = title1;
            return this;
        }
    }, {
        key: "setTitle2",
        value: function setTitle2(title2) {
            this.title2 = title2;
            return this;
        }
    }, {
        key: "setTitle3",
        value: function setTitle3(title3) {
            this.title3 = title3;
            return this;
        }
    }, {
        key: "setMargins",
        value: function setMargins(margins) {
            this.margins = margins;
            return this;
        }
    }, {
        key: "setBody",
        value: function setBody(body) {
            this.body = body;
            return this;
        }
    }, {
        key: "setOrientation",
        value: function setOrientation(orientation) {
            this.orientation = orientation;
            return this;
        }
    }, {
        key: "renderStyleBlock",
        value: function renderStyleBlock(selector, data) {
            var css_pairs = Object.getOwnPropertyNames(data).map(function (key) {
                return key + ': ' + data[key] + '; ';
            });
            return selector + " { " + css_pairs.join(" ") + " }";
        }
    }, {
        key: "renderStyles",
        value: function renderStyles() {
            var _this = this;

            var css_blocks = Object.getOwnPropertyNames(this.styles).map(function (selector) {
                return _this.renderStyleBlock(selector, _this.styles[selector]);
            }.bind(this));
            return css_blocks.join("\n");
        }
    }, {
        key: "renderHTML",
        value: function renderHTML() {
            var css = this.renderStyles();
            var header = this.header ? '<p class="header">' + this.header + '</p>' : "";
            var title1 = this.title1 ? '<h1>' + this.title1 + '</h1>' : "";
            var title2 = this.title2 ? '<h2>' + this.title2 + '</h2>' : "";
            var title3 = this.title3 ? '<h3>' + this.title3 + '</h3>' : "";
            var spacer = header || title1 || title2 || title3 ? '<p class="spacer">&nbsp;</p>' : "";
            return "<!DOCTYPE html>\n" + "<html><head>" + "<meta charset=\"utf-8\">" + "<style>\n" + css + "\n</style>\n" + "</head><body>\n" + header + title1 + title2 + title3 + spacer + this.body + "</body></html>";
        }
    }, {
        key: "save",
        value: function save() {
            var html = this.renderHTML();
            var margins = this.margins || (this.orientation === "portrait" ? [10, 15, 10, 15] : [7, 10, 7, 10]);
            var converted = htmlDocx.asBlob(html, {
                orientation: this.orientation,
                margins: {
                    top: Math.floor(margins[0] * 56.659).toString(),
                    right: Math.floor(margins[1] * 56.659).toString(),
                    bottom: Math.floor(margins[2] * 56.659).toString(),
                    left: Math.floor(margins[3] * 56.659).toString()
                }
            });
            saveAs(converted, this.filename);
        }
    }]);

    return DocxImpl;
}();

var Docx = exports.Docx = function Docx(fn) {
    return new DocxImpl(fn);
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RulesSetLoader = function () {
    function RulesSetLoader() {
        _classCallCheck(this, RulesSetLoader);

        this._loaded = false;
    }

    _createClass(RulesSetLoader, [{
        key: "load",
        value: function load(module_name, data) {
            var KEYS = ["tour_results_table_1", "tour_results_table_2", "tour_results_table_3", "discipline_results_table", "judge_tablet", "admin_score_input", "get_judge_table_mark"];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = KEYS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (!(key in data)) {
                        throw new Error("Module " + module_name + " doesn't export " + key + " class.");
                    }
                    this["_" + key] = data[key];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(data)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    if (KEYS.indexOf(key) < 0) {
                        console.warn("Module " + module_name + " exports unknown " + key + " parameter.");
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this._loaded = true;
            console.log("Added scoring system: " + module_name);
        }
    }, {
        key: "_checkIfLoaded",
        value: function _checkIfLoaded() {
            if (!this._loaded) {
                throw new Error("No scoring system was loaded");
            }
        }
    }, {
        key: "tour_results_table_1",
        get: function get() {
            this._checkIfLoaded();
            return this._tour_results_table_1;
        }
    }, {
        key: "tour_results_table_2",
        get: function get() {
            this._checkIfLoaded();
            return this._tour_results_table_2;
        }
    }, {
        key: "tour_results_table_3",
        get: function get() {
            this._checkIfLoaded();
            return this._tour_results_table_3;
        }
    }, {
        key: "discipline_results_table",
        get: function get() {
            this._checkIfLoaded();
            return this._discipline_results_table;
        }
    }, {
        key: "judge_tablet",
        get: function get() {
            this._checkIfLoaded();
            return this._judge_tablet;
        }
    }, {
        key: "admin_score_input",
        get: function get() {
            this._checkIfLoaded();
            return this._admin_score_input;
        }
    }, {
        key: "get_judge_table_mark",
        get: function get() {
            this._checkIfLoaded();
            return this._get_judge_table_mark;
        }
    }]);

    return RulesSetLoader;
}();

var loader = new RulesSetLoader();

window.registerRulesSet = function () {
    loader.load.apply(loader, arguments);
};

exports.default = loader;

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

},{"l10n/loader":3,"server/storage":8,"ui/dialogs":10}],7:[function(require,module,exports){
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

},{"l10n/loader":3}],10:[function(require,module,exports){
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

},{"l10n/loader":3}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Printable = exports.Printable = function (_React$Component) {
    _inherits(Printable, _React$Component);

    function Printable() {
        _classCallCheck(this, Printable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Printable).apply(this, arguments));
    }

    _createClass(Printable, [{
        key: "fetchPrintableData",
        value: function fetchPrintableData() {
            return this._body.innerHTML;
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            return this.props.header ? React.createElement(
                "div",
                { className: "p-header" },
                this.props.header
            ) : null;
        }
    }, {
        key: "renderTitle1",
        value: function renderTitle1() {
            return this.props.title1 ? React.createElement(
                "h1",
                null,
                this.props.title1
            ) : null;
        }
    }, {
        key: "renderTitle2",
        value: function renderTitle2() {
            return this.props.title2 ? React.createElement(
                "h2",
                null,
                this.props.title2
            ) : null;
        }
    }, {
        key: "renderTitle3",
        value: function renderTitle3() {
            return this.props.title3 ? React.createElement(
                "h3",
                null,
                this.props.title3
            ) : null;
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            var _this2 = this;

            return React.createElement(
                "div",
                {
                    className: "p-content",
                    ref: function ref(e) {
                        return _this2._body = e;
                    }
                },
                this.props.body
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "printable" },
                this.renderHeader(),
                this.renderTitle1(),
                this.renderTitle2(),
                this.renderTitle3(),
                this.renderBody()
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                header: React.PropTypes.string,
                title1: React.PropTypes.string,
                title2: React.PropTypes.string,
                title3: React.PropTypes.string,
                body: React.PropTypes.node.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }]);

    return Printable;
}(React.Component);

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _docx = require("common/docx");

var _loader2 = require("rules_sets/loader");

var _loader3 = _interopRequireDefault(_loader2);

var _Paper = require("AdminPanel/common/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wrapper = function (_React$Component) {
    _inherits(Wrapper, _React$Component);

    function Wrapper() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Wrapper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Wrapper)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.makePrintableRef = function (ref) {
            return _this._printable = ref;
        }, _this.handleSignal = function (message) {
            switch (message) {
                case "docx":
                    _this.createDocx();
                    break;
                default:
                    console.log("Unknown message:", message);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Wrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.createDocx(this.props.autoDocx.filename);
            this.props.autoDocx.onDone(this.props.autoDocx.filename);
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            var RenderingComponent = _loader3.default.discipline_results_table;
            return React.createElement(RenderingComponent, this.props);
        }
    }, {
        key: "render",
        value: function render() {
            // eslint-disable-line react/sort-comp
            return React.createElement(
                _Paper2.default,
                {
                    header: this.props.discipline.competition.name + ", " + this.props.discipline.competition.date,
                    ref: this.makePrintableRef,
                    title1: (0, _loader._)("admin.headers.discipline_results"),
                    title3: this.props.discipline.name
                },
                this.renderBody()
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "discipline-results.docx" : arguments[0];

            (0, _docx.Docx)(filename).setHeader(this.props.discipline.competition.name + ", " + this.props.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.discipline_results")).setTitle3(this.props.discipline.name).setBody(this._printable.getPrintableHTML()).addStyle(".tour-name", "background", "#ddd").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0").addStyle(".sportsmen", "width", "100%").save();
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                autoDocx: PT.shape({
                    filename: PT.string.isRequired,
                    onDone: PT.func.isRequired
                }),
                table: PT.arrayOf(PT.object.isRequired).isRequired,
                discipline: PT.object.isRequired
            };
        }
    }]);

    return Wrapper;
}(React.Component);

exports.default = Wrapper;


Wrapper.displayName = "AdminPanel_Judging_DisciplinePanel_DisciplineResultsTab_Wrapper";

},{"AdminPanel/common/Paper":25,"common/docx":2,"l10n/loader":3,"rules_sets/loader":5}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _printable = require("ui/printable");

var _docx = require("common/docx");

var _DisciplineResults = require("common/DisciplineResults");

var _DisciplineResults2 = _interopRequireDefault(_DisciplineResults);

var _Wrapper = require("./Wrapper");

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisciplineResultsTab = function (_React$Component) {
    _inherits(DisciplineResultsTab, _React$Component);

    function DisciplineResultsTab() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, DisciplineResultsTab);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DisciplineResultsTab)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.makeResultsRef = function (ref) {
            return _this._results = ref;
        }, _this.handleSignal = function (message) {
            _this._results.handleSignal(message);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DisciplineResultsTab, [{
        key: "render",


        // Rendering

        value: function render() {
            return React.createElement(_DisciplineResults2.default, {
                autoDocx: this.props.autoDocx,
                disciplineId: this.props.discipline.id,
                ref: this.makeResultsRef,
                renderer: _Wrapper2.default
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                autoDocx: PT.object,
                discipline: PT.shape({
                    id: PT.number.isRequired
                }).isRequired
            };
        }
    }]);

    return DisciplineResultsTab;
}(React.Component);

exports.default = DisciplineResultsTab;


DisciplineResultsTab.displayName = "AdminPanel_Judging_DisciplinePanel_DisciplineResultsTab";

},{"./Wrapper":12,"common/DisciplineResults":26,"common/docx":2,"l10n/loader":3,"server/api":6,"server/message_dispatcher":7,"server/storage":8,"ui/components":9,"ui/printable":11}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
    }

    _createClass(Row, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "w-8" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.participant.number
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "p",
                        null,
                        this.props.participant.name
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "p",
                        null,
                        this.props.participant.club.name
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                participant: PT.shape({
                    number: PT.number.isRequired,
                    name: PT.string.isRequired,
                    club: PT.shape({
                        name: PT.string.isRequired
                    }).isRequired
                }).isRequired
            };
        }
    }]);

    return Row;
}(React.Component);

exports.default = Row;


Row.displayName = "AdminPanel_Judging_TourPanel_HeatsTab_Row";

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _api = require("server/api");

var _docx = require("common/docx");

var _components = require("ui/components");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _Paper = require("AdminPanel/common/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsTab = function (_React$Component) {
    _inherits(HeatsTab, _React$Component);

    _createClass(HeatsTab, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                autoDocx: PT.shape({
                    filename: PT.string.isRequired,
                    onDone: PT.func.isRequired
                }),
                tour: PT.shape({
                    id: PT.number.isRequired
                }).isRequired
            };
        }
    }]);

    function HeatsTab(props) {
        _classCallCheck(this, HeatsTab);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HeatsTab).call(this, props));

        _this.reloadFromStorage = function () {
            var serialized = _this.storage.get("Tour").by_id(_this.props.tour.id).serialize(_this.SCHEMA);
            _this.setState({
                tour: serialized
            });
        };

        _this.makePrintableRef = function (ref) {
            return _this._printable = ref;
        };

        _this.handleSignal = function (message) {
            switch (message) {
                case "docx":
                    _this.createDocx();
                    break;
                default:
                    console.log("Unknown message:", message);
            }
        };

        _this.state = {
            tour: null
        };
        return _this;
    }

    _createClass(HeatsTab, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.setupStorage();
            this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData);
            this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage);
            this.loadData();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (this.props.tour.id !== next_props.tour.id) {
                this.setState({
                    tour: null
                });
                this.freeStorage(this.props.tour.id);
                this.setupStorage(next_props.tour.id);
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prev_props, ps) {
            if (prev_props.tour.id !== this.props.tour.id) {
                this.loadData();
            }
            if (this.props.autoDocx && !this._docx_done && this.state.tour !== null) {
                this._docx_done = true;
                this.createDocx(this.props.autoDocx.filename);
                this.props.autoDocx.onDone(this.props.autoDocx.filename);
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
            this.freeStorage();
        }
    }, {
        key: "setupStorage",
        value: function setupStorage() {
            var tour_id = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (tour_id === null) {
                tour_id = this.props.tour.id;
            }
            this.storage = _storage.storage.getDomain("heats_" + tour_id);
        }
    }, {
        key: "freeStorage",
        value: function freeStorage() {
            var tour_id = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (tour_id === null) {
                tour_id = this.props.tour.id;
            }
            _storage.storage.delDomain("heats_" + tour_id);
        }
    }, {
        key: "loadData",
        value: function loadData() {
            (0, _api.Api)("tour.get", {
                tour_id: this.props.tour.id,
                children: this.SCHEMA
            }).addToDB("Tour", this.props.tour.id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "renderHeatHeader",
        value: function renderHeatHeader(prev_row, next_row) {
            var need_render = typeof prev_row === "undefined" || prev_row.heat !== next_row.heat;
            if (!need_render) {
                return null;
            }
            return React.createElement(
                "tr",
                { key: "H" + next_row.heat },
                React.createElement(
                    "th",
                    { className: "heat-number", colSpan: "3" },
                    React.createElement(
                        "p",
                        null,
                        (0, _loader._)("global.phrases.heat_n", next_row.heat)
                    )
                )
            );
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            var runs = this.state.tour.runs;
            for (var i = 0; i < runs.length; ++i) {
                var header = this.renderHeatHeader(runs[i - 1], runs[i]);
                if (header) {
                    result.push(header);
                }
                result.push(React.createElement(_Row2.default, {
                    key: runs[i].id,
                    participant: runs[i].participant
                }));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            // eslint-disable-line react/sort-comp
            if (this.state.tour === null) {
                return React.createElement(_components.Loader, null);
            }
            return React.createElement(
                _Paper2.default,
                {
                    header: this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date,
                    ref: this.makePrintableRef,
                    title1: (0, _loader._)("admin.headers.tour_heats"),
                    title2: this.state.tour.discipline.name,
                    title3: this.state.tour.name
                },
                React.createElement(
                    "div",
                    { className: "tour-heats" },
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
                                    { className: "w-8" },
                                    React.createElement(
                                        "p",
                                        null,
                                        (0, _loader._)("judging.labels.number")
                                    )
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement(
                                        "p",
                                        null,
                                        (0, _loader._)("judging.labels.participant_name")
                                    )
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement(
                                        "p",
                                        null,
                                        (0, _loader._)("judging.labels.club")
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            this.renderRows()
                        )
                    )
                )
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-heats.docx" : arguments[0];

            (0, _docx.Docx)(filename).setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.tour_heats")).setTitle2(this.state.tour.discipline.name).setTitle3(this.state.tour.name).setBody(this._printable.getPrintableHTML()).addStyle(".heat-number", "background", "#ccc").addStyle(".heat-number", "text-align", "left").addStyle("td, th", "font-size", "12pt").save();
        }
    }, {
        key: "SCHEMA",
        get: function get() {
            return {
                discipline: {
                    competition: {}
                },
                runs: {
                    participant: {
                        club: {}
                    }
                }
            };
        }
    }]);

    return HeatsTab;
}(React.Component);

exports.default = HeatsTab;


HeatsTab.displayName = "AdminPanel_Judging_TourPanel_HeatsTab";

},{"./Row":14,"AdminPanel/common/Paper":25,"common/docx":2,"l10n/loader":3,"server/api":6,"server/message_dispatcher":7,"server/storage":8,"ui/components":9}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _docx = require("common/docx");

var _loader2 = require("rules_sets/loader");

var _loader3 = _interopRequireDefault(_loader2);

var _Paper = require("AdminPanel/common/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wrapper = function (_React$Component) {
    _inherits(Wrapper, _React$Component);

    function Wrapper() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Wrapper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Wrapper)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.makePrintableRef = function (ref) {
            return _this._printable = ref;
        }, _this.handleSignal = function (message) {
            switch (message) {
                case "docx":
                    _this.createDocx();
                    break;
                default:
                    console.log("Unknown message:", message);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Wrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.createDocx(this.props.autoDocx.filename);
            this.props.autoDocx.onDone(this.props.autoDocx.filename);
        }
    }, {
        key: "getRenderingComponent",
        value: function getRenderingComponent() {
            switch (this.props.verbosity) {
                case 1:
                    return _loader3.default.tour_results_table_1;
                case 2:
                    return _loader3.default.tour_results_table_2;
                case 3:
                    return _loader3.default.tour_results_table_3;
            }
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            var RenderingComponent = this.getRenderingComponent();
            return React.createElement(RenderingComponent, this.props);
        }
    }, {
        key: "render",
        value: function render() {
            // eslint-disable-line react/sort-comp
            return React.createElement(
                _Paper2.default,
                {
                    header: this.props.tour.discipline.competition.name + ", " + this.props.tour.discipline.competition.date,
                    ref: this.makePrintableRef,
                    title1: (0, _loader._)("admin.headers.tour_results"),
                    title2: this.props.tour.discipline.name,
                    title3: this.props.tour.name
                },
                this.renderBody()
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-results.docx" : arguments[0];

            (0, _docx.Docx)(filename).setMargins([10, 10, 15, 10]).setHeader(this.props.tour.discipline.competition.name + ", " + this.props.tour.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.tour_results")).setTitle2(this.props.tour.discipline.name).setTitle3(this.props.tour.name).setBody(this._printable.getPrintableHTML()).addStyle(".bordered-table", "font-size", this.props.verbosity === 1 ? "12pt" : "9pt").addStyle(".bordered-table .acro-table td", "font-size", "9pt").addStyle(".bordered-table .acro-table td", "padding", "0 3pt").addStyle(".bordered-table .acro-table td", "border", "0.5pt solid black").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "font-size", "9pt").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none").addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0").addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt").addStyle(".score-breakdown th", "text-align", "right").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown", "width", "50pt").addStyle(".advances-header", "background-color", "#ddd").addStyle(".total-score", "font-weight", "bold").addStyle(".head_judge", "width", "5%").addStyle(".dance_judge", "width", "8%").addStyle(".acro_judge", "width", "8%").save();
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                autoDocx: PT.shape({
                    filename: PT.string.isRequired,
                    onDone: PT.func.isRequired
                }),
                table: PT.arrayOf(PT.object.isRequired).isRequired,
                tour: PT.object.isRequired,
                verbosity: PT.number.isRequired
            };
        }
    }]);

    return Wrapper;
}(React.Component);

exports.default = Wrapper;


Wrapper.displayName = "AdminPanel_Judging_TourPanel_TourResultsTab_Wrapper";

},{"AdminPanel/common/Paper":25,"common/docx":2,"l10n/loader":3,"rules_sets/loader":5}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _printable = require("ui/printable");

var _docx = require("common/docx");

var _TourResults = require("common/TourResults");

var _TourResults2 = _interopRequireDefault(_TourResults);

var _Wrapper = require("./Wrapper");

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsTab = function (_React$Component) {
    _inherits(TourResultsTab, _React$Component);

    function TourResultsTab() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TourResultsTab);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TourResultsTab)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.makeResultsRef = function (ref) {
            return _this._results = ref;
        }, _this.handleSignal = function (message) {
            _this._results.handleSignal(message);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TourResultsTab, [{
        key: "render",


        // Rendering

        value: function render() {
            return React.createElement(_TourResults2.default, {
                autoDocx: this.props.autoDocx,
                ref: this.makeResultsRef,
                renderer: _Wrapper2.default,
                tourId: this.props.tour.id,
                verbosity: this.props.verbosity
            });
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                autoDocx: PT.object,
                tour: PT.shape({
                    id: PT.number.isRequired
                }).isRequired,
                verbosity: PT.number.isRequired
            };
        }
    }]);

    return TourResultsTab;
}(React.Component);

exports.default = TourResultsTab;


TourResultsTab.displayName = "AdminPanel_Judging_TourPanel_TourResultsTab";

},{"./Wrapper":16,"common/TourResults":27,"common/docx":2,"l10n/loader":3,"server/api":6,"server/message_dispatcher":7,"server/storage":8,"ui/components":9,"ui/printable":11}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HeatsTab = require("AdminPanel/Judging/TourPanel/HeatsTab");

var _HeatsTab2 = _interopRequireDefault(_HeatsTab);

var _TourResultsTab = require("AdminPanel/Judging/TourPanel/TourResultsTab");

var _TourResultsTab2 = _interopRequireDefault(_TourResultsTab);

var _DisciplineResultsTab = require("AdminPanel/Judging/TourPanel/DisciplineResultsTab");

var _DisciplineResultsTab2 = _interopRequireDefault(_DisciplineResultsTab);

var _TestPage = require("./TestPage");

var _TestPage2 = _interopRequireDefault(_TestPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActiveJob = function (_React$Component) {
    _inherits(ActiveJob, _React$Component);

    function ActiveJob() {
        _classCallCheck(this, ActiveJob);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ActiveJob).apply(this, arguments));
    }

    _createClass(ActiveJob, [{
        key: "createFilename",
        value: function createFilename() {
            return "autoprinter_" + Math.random().toString().replace(/[^0-9]/, "").slice(1) + ".tmp";
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.props.queueItem) {
                return null;
            }
            var docx_params = { filename: this.createFilename(), onDone: this.props.onDone };
            switch (this.props.queueItem.type) {
                case "heats":
                    return React.createElement(_HeatsTab2.default, {
                        autoDocx: docx_params,
                        tour: this.props.queueItem.tour
                    });
                case "results_1":
                    return React.createElement(_TourResultsTab2.default, {
                        autoDocx: docx_params,
                        tour: this.props.queueItem.tour,
                        verbosity: 1
                    });
                case "results_2":
                    return React.createElement(_TourResultsTab2.default, {
                        autoDocx: docx_params,
                        tour: this.props.queueItem.tour,
                        verbosity: 2
                    });
                case "results_3":
                    return React.createElement(_TourResultsTab2.default, {
                        autoDocx: docx_params,
                        tour: this.props.queueItem.tour,
                        verbosity: 3
                    });
                case "discipline_results":
                    return React.createElement(_DisciplineResultsTab2.default, {
                        autoDocx: docx_params,
                        discipline: this.props.queueItem.tour.discipline
                    });
                case "test":
                    return React.createElement(_TestPage2.default, {
                        autoDocx: docx_params
                    });
                default:
                    console.error("Invalid job type:", this.props.queueItem.type);
            }
            return null;
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                queueItem: PT.shape({
                    type: PT.string.isRequired,
                    tour: PT.object.isRequired
                }).isRequired,
                onDone: PT.func.isRequired
            };
        }
    }]);

    return ActiveJob;
}(React.Component);

exports.default = ActiveJob;


ActiveJob.displayName = "AdminPanel_Service_AutoPrinter_JobQueue_ActiveJob";

},{"./TestPage":19,"AdminPanel/Judging/TourPanel/DisciplineResultsTab":13,"AdminPanel/Judging/TourPanel/HeatsTab":15,"AdminPanel/Judging/TourPanel/TourResultsTab":17}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _docx = require("common/docx");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestPage = function (_React$Component) {
    _inherits(TestPage, _React$Component);

    function TestPage() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TestPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TestPage)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.makeContentRef = function (ref) {
            return _this._content = ref;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TestPage, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.createDocx(this.props.autoDocx.filename);
            this.props.autoDocx.onDone(this.props.autoDocx.filename);
        }
    }, {
        key: "render",
        value: function render() {
            // eslint-disable-line react/sort-comp
            return React.createElement(
                "div",
                { ref: this.makeContentRef },
                React.createElement(
                    "p",
                    null,
                    (0, _loader._)("admin.auto_printer.test_text")
                )
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "test-page.docx" : arguments[0];

            (0, _docx.Docx)(filename).setBody(this._content.innerHTML).save();
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                autoDocx: PT.shape({
                    filename: PT.string.isRequired,
                    onDone: PT.func.isRequired
                }).isRequired
            };
        }
    }]);

    return TestPage;
}(React.Component);

exports.default = TestPage;


TestPage.displayName = "AdminPanel_Service_AutoPrinter_JobQueue_TestPage";

},{"common/docx":2,"l10n/loader":3}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _ActiveJob = require("./ActiveJob");

var _ActiveJob2 = _interopRequireDefault(_ActiveJob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JobQueue = function (_React$Component) {
    _inherits(JobQueue, _React$Component);

    function JobQueue(props) {
        _classCallCheck(this, JobQueue);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JobQueue).call(this, props));

        _this.addJob = function (job_type, tour, copies) {
            var new_queue = _this.state.queue.slice(); // clone
            new_queue.push({
                type: job_type,
                tour: tour,
                copies: copies,
                id: Math.random()
            });
            _this.setState({
                queue: new_queue
            });
        };

        _this.scheduleJob = function () {
            setTimeout(_this.processJob, 1000);
        };

        _this.processJob = function () {
            if (_this.state.nowRendering) {
                return;
            }
            var job = _this.state.queue[0];
            if (!job) {
                _this.scheduleJob();
                return;
            }
            _this.timer = setTimeout(_this.retryJob, 10000);
            _this.setState({
                queue: _this.state.queue.slice(1),
                nowRendering: job
            });
        };

        _this.retryJob = function () {
            _this.setState({
                queue: [_this.state.nowRendering].concat(_this.state.queue),
                nowRendering: null
            });
            _this.scheduleJob();
        };

        _this.handleDocxCreated = function (filename) {
            clearTimeout(_this.timer);
            setTimeout(function () {
                var job = _this.state.nowRendering;
                var xhr = new XMLHttpRequest();
                var address = "http://127.0.0.1:5949/print-docx?filename=" + filename + "&copies=" + job.copies;
                xhr.open("GET", address, true);
                xhr.onload = function () {};
                xhr.onerror = function () {
                    return _this.addJob(job.type, job.tour, job.copies);
                };
                xhr.send();
                _this.setState({
                    nowRendering: null
                });
                _this.scheduleJob();
            }, 1000);
        };

        _this.state = {
            queue: [],
            nowRendering: null
        };
        _this.scheduleJob();
        return _this;
    }

    _createClass(JobQueue, [{
        key: "renderActiveJob",
        value: function renderActiveJob() {
            if (!this.state.nowRendering) {
                return null;
            }
            return React.createElement(_ActiveJob2.default, {
                key: "active-job",
                queueItem: this.state.nowRendering,
                onDone: this.handleDocxCreated
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.queue.length === 0) {
                return React.createElement(
                    "div",
                    { className: "queue queue-empty" },
                    (0, _loader._)("admin.auto_printer.queue_empty"),
                    React.createElement(
                        "div",
                        { className: "hidden-container" },
                        this.renderActiveJob()
                    )
                );
            }
            return React.createElement(
                "div",
                { className: "queue" },
                this.state.queue.map(function (item) {
                    return React.createElement(
                        "div",
                        { className: "row", key: item.id },
                        React.createElement(
                            "div",
                            { className: "name" },
                            item.type === "test" ? (0, _loader._)("admin.auto_printer.test_page") : item.tour.discipline.name + " — " + item.tour.name
                        ),
                        React.createElement(
                            "div",
                            { className: "type" },
                            (0, _loader._)("admin.auto_printer." + item.type)
                        ),
                        React.createElement(
                            "div",
                            { className: "copies" },
                            item.copies
                        )
                    );
                }),
                React.createElement(
                    "div",
                    { className: "hidden-container" },
                    this.renderActiveJob()
                )
            );
        }
    }]);

    return JobQueue;
}(React.Component);

exports.default = JobQueue;


JobQueue.displayName = "AdminPanel_Service_AutoPrinter_JobQueue";

},{"./ActiveJob":18,"l10n/loader":3}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = function (_React$Component) {
    _inherits(Cell, _React$Component);

    function Cell() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Cell);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cell)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.makeInputRef = function (ref) {
            return _this._input = ref;
        }, _this.handleChange = function (event) {
            var value = parseInt(event.target.value) || 0;
            _this.props.onChange(_this.props.action, value);
        }, _this.handleKeyDown = function (event) {
            var code = event.keyCode || event.which;
            var direction = {
                "37": "left",
                "38": "up",
                "39": "right",
                "40": "down"
            }[code.toString()];
            if (!direction) {
                return;
            }
            event.preventDefault();
            _this.props.onMove(_this.props.tour.id, _this.props.action, direction);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Cell, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate(prev_props) {
            if (!this.props.activeCell) {
                return;
            }
            if (prev_props.activeCell && prev_props.activeCell.token === this.props.activeCell.token) {
                return;
            }
            if (this.props.activeCell.tour_id === this.props.tour.id && this.props.activeCell.action === this.props.action) {
                this._input.select();
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "input" },
                React.createElement("input", {
                    defaultValue: this.props.value,
                    ref: this.makeInputRef,
                    type: "text",
                    onChange: this.handleChange,
                    onKeyDown: this.handleKeyDown
                })
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                action: PT.string.isRequired,
                activeCell: PT.shape({
                    action: PT.string.isRequired,
                    token: PT.string.isRequired,
                    tour_id: PT.number.isRequired
                }),
                tour: PT.shape({
                    id: PT.number.isRequired
                }).isRequired,
                value: PT.oneOfType([PT.number.isRequired, PT.string.isRequired]),
                onChange: PT.func.isRequired,
                onMove: PT.func.isRequired
            };
        }
    }]);

    return Cell;
}(React.Component);

exports.default = Cell;


Cell.displayName = "AdminPanel_Service_AutoPrinter_Table_Cell";

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cell = require("./Cell");

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Row);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Row)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (action, new_value) {
            var new_row = Object.assign({}, _this.props.row);
            new_row[action] = new_value;
            _this.props.onChange(_this.props.tour.id, new_row);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Row, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "discipline" },
                    this.props.tour.discipline.name + " — " + this.props.tour.name
                ),
                this.props.possibleActions.map(function (action) {
                    return React.createElement(_Cell2.default, {
                        action: action,
                        activeCell: _this2.props.activeCell,
                        key: action,
                        tour: _this2.props.tour,
                        value: _this2.props.row[action] || "",
                        onChange: _this2.handleChange,
                        onMove: _this2.props.onMove
                    });
                })
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                activeCell: PT.shape({
                    action: PT.string.isRequired,
                    token: PT.string.isRequired,
                    tour_id: PT.number.isRequired
                }),
                possibleActions: PT.arrayOf(PT.string.isRequired).isRequired,
                row: PT.object.isRequired,
                tour: PT.shape({
                    id: PT.number.isRequired,
                    name: PT.string.isRequired,
                    discipline: PT.shape({
                        name: PT.string.isRequired
                    }).isRequired
                }).isRequired,
                onChange: PT.func.isRequired,
                onMove: PT.func.isRequired
            };
        }
    }]);

    return Row;
}(React.Component);

exports.default = Row;


Row.displayName = "AdminPanel_Service_AutoPrinter_Table_Row";

},{"./Cell":21}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    _createClass(Table, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                actions: PT.object.isRequired,
                possibleActions: PT.arrayOf(PT.string.isRequired).isRequired,
                tours: PT.arrayOf(PT.shape({
                    id: PT.number.isRequired
                }).isRequired).isRequired,
                onChange: PT.func.isRequired
            };
        }
    }]);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Table).call(this, props));

        _this.handleChange = function (tour_id, new_value) {
            var new_actions = Object.assign({}, _this.props.actions);
            new_actions[tour_id] = new_value;
            _this.props.onChange(new_actions);
        };

        _this.handleMove = function (tour_id, action, direction) {
            var DELTAS = {
                up: [-1, 0],
                down: [1, 0],
                left: [0, -1],
                right: [0, 1]
            };

            var _DELTAS$direction = _slicedToArray(DELTAS[direction], 2);

            var tour_delta = _DELTAS$direction[0];
            var action_delta = _DELTAS$direction[1];

            var next_tour_idx = _this.props.tours.findIndex(function (tour) {
                return tour.id === tour_id;
            }) + tour_delta;
            var next_tour = _this.props.tours[next_tour_idx];
            var next_action_idx = _this.props.possibleActions.indexOf(action) + action_delta;
            var next_action = _this.props.possibleActions[next_action_idx];
            if (!next_action || !next_tour) {
                return;
            }
            _this.setState({
                activeCell: {
                    tour_id: next_tour.id,
                    action: next_action,
                    token: Math.random().toString()
                }
            });
        };

        _this.state = {
            activeCell: null
        };
        return _this;
    }

    _createClass(Table, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "table",
                { className: "tours-table" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { className: "discipline" },
                            (0, _loader._)("admin.auto_printer.discipline")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.heats")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.results_1")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.results_2")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.results_3")
                        ),
                        React.createElement(
                            "th",
                            null,
                            (0, _loader._)("admin.auto_printer.discipline_results")
                        )
                    ),
                    this.props.tours.map(function (tour) {
                        return React.createElement(_Row2.default, {
                            activeCell: _this2.state.activeCell,
                            key: tour.id,
                            possibleActions: _this2.props.possibleActions,
                            row: _this2.props.actions[tour.id] || {},
                            tour: tour,
                            onChange: _this2.handleChange,
                            onMove: _this2.handleMove
                        });
                    })
                )
            );
        }
    }]);

    return Table;
}(React.Component);

exports.default = Table;


Table.displayName = "AdminPanel_Service_AutoPrinter_Table";

},{"./Row":22,"l10n/loader":3}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _dialogs = require("ui/dialogs");

var _JobQueue = require("./JobQueue");

var _JobQueue2 = _interopRequireDefault(_JobQueue);

var _Table = require("./Table");

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoPrinter = function (_React$Component) {
    _inherits(AutoPrinter, _React$Component);

    _createClass(AutoPrinter, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                competitionId: PT.number.isRequired
            };
        }
    }]);

    function AutoPrinter(props) {
        _classCallCheck(this, AutoPrinter);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoPrinter).call(this, props));

        _this.loadData = function () {
            (0, _api.Api)("competition.get", {
                competition_id: _this.props.competitionId,
                children: _this.SCHEMA
            }).addToDB("Competition", _this.props.competitionId).onSuccess(_this.reloadFromStorage.bind(_this)).send();
        };

        _this.reloadFromStorage = function () {
            var new_competition_ref = _storage.storage.get("Competition").by_id(_this.props.competitionId);
            if (!new_competition_ref) {
                return;
            }
            var new_competition = new_competition_ref.serialize(_this.SCHEMA);
            if (_this.state.competition) {
                _this.dispatchCompetitionUpdate(_this.state.competition, new_competition);
            }
            _this.setState({
                competition: new_competition
            });
        };

        _this.makeQueueRef = function (ref) {
            return _this._queue = ref;
        };

        _this.handleActionsChange = function (actions) {
            return _this.setState({ actions: actions });
        };

        _this.handlePrintTestPage = function () {
            (0, _dialogs.showConfirm)((0, _loader._)("admin.auto_printer.print_test_page"), function () {
                saveAs(new Blob(["dummy"], { type: 'text/plain' }), "autoprinter_dummy_" + Math.random() + ".tmp");
                saveAs(new Blob(["dummy"], { type: 'text/plain' }), "autoprinter_dummy_" + Math.random() + ".tmp");
                saveAs(new Blob(["dummy"], { type: 'text/plain' }), "autoprinter_dummy_" + Math.random() + ".tmp");
                _this._queue.addJob("test", null, 1);
            }, true);
        };

        var old_actions_str = sessionStorage.getItem("auto_printer_" + _this.props.competitionId);
        var initial_actions = old_actions_str ? JSON.parse(old_actions_str) : {};
        _this.state = {
            competition: null,
            actions: initial_actions
        };
        _this.SCHEMA = {
            disciplines: {
                tours: {}
            }
        };
        _this.POSSIBLE_ACTIONS = ["heats", "results_1", "results_2", "results_3", "discipline_results"];
        return _this;
    }

    _createClass(AutoPrinter, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.loadData();
            this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage);
            this.reload_data_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData);
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            sessionStorage.setItem("auto_printer_" + this.props.competitionId, JSON.stringify(this.state.actions));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.reload_data_listener);
        }
    }, {
        key: "getToursFromCompetition",
        value: function getToursFromCompetition(competition) {
            var result = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = competition.disciplines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var discipline = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = discipline.tours[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var tour = _step2.value;

                            var r = Object.assign({}, tour);
                            r.discipline = discipline;
                            result.push(r);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return result;
        }
    }, {
        key: "getToursMap",
        value: function getToursMap(competition) {
            return new Map(this.getToursFromCompetition(competition).map(function (tour) {
                return [tour.id, tour];
            }));
        }
    }, {
        key: "dispatchCompetitionUpdate",
        value: function dispatchCompetitionUpdate(old_competition, new_competition) {
            var old_tours = this.getToursMap(old_competition);
            var new_tours = this.getToursMap(new_competition);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = old_tours.keys()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var tour_id = _step3.value;

                    if (!new_tours.has(tour_id)) {
                        return;
                    }
                    if (!old_tours.get(tour_id).finalized && new_tours.get(tour_id).finalized) {
                        this.doActionsForTour(new_tours.get(tour_id));
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: "getNextTour",
        value: function getNextTour(tour) {
            var tours = this.getToursFromCompetition(this.state.competition);
            var current_idx = tours.findIndex(function (t) {
                return t.id === tour.id;
            });
            var next_idx = current_idx + 1;
            if (tours[current_idx].discipline.id !== tours[next_idx].discipline.id) {
                return null;
            }
            return tours[next_idx];
        }
    }, {
        key: "doTheJob",
        value: function doTheJob(tour, action_type, copies) {
            if (!tour) {
                return;
            }
            this._queue.addJob(action_type, tour, copies);
        }
    }, {
        key: "doActionsForTour",
        value: function doActionsForTour(tour) {
            var actions = this.state.actions[tour.id];
            var next_tour = this.getNextTour(tour);
            var next_tour_actions = this.state.actions[next_tour.id];
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.POSSIBLE_ACTIONS[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var action_type = _step4.value;

                    var action_tour = action_type === "heats" ? next_tour : tour;
                    var actions_row = action_type === "heats" ? next_tour_actions : actions;
                    if (actions_row && actions_row[action_type]) {
                        this.doTheJob(action_tour, action_type, actions_row[action_type]);
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.competition) {
                return React.createElement(_components.Loader, null);
            }
            return React.createElement(
                "div",
                { className: "auto-printer" },
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        (0, _loader._)("admin.headers.auto_printer")
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "section-table" },
                        React.createElement(
                            "h3",
                            null,
                            (0, _loader._)("admin.auto_printer.rules")
                        ),
                        React.createElement(_Table2.default, {
                            actions: this.state.actions,
                            possibleActions: this.POSSIBLE_ACTIONS,
                            tours: this.getToursFromCompetition(this.state.competition),
                            onChange: this.handleActionsChange
                        })
                    ),
                    React.createElement(
                        "div",
                        { className: "section-queue" },
                        React.createElement(
                            "h3",
                            null,
                            (0, _loader._)("admin.auto_printer.queue")
                        ),
                        React.createElement(_JobQueue2.default, { ref: this.makeQueueRef }),
                        React.createElement(
                            "div",
                            { className: "test-page-button" },
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-primary",
                                    type: "button",
                                    onClick: this.handlePrintTestPage
                                },
                                "Печать тестовой страницы"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AutoPrinter;
}(React.Component);

exports.default = AutoPrinter;


AutoPrinter.displayName = "AdminPanel_Service_AutoPrinter";

},{"./JobQueue":20,"./Table":23,"l10n/loader":3,"server/api":6,"server/message_dispatcher":7,"server/storage":8,"ui/components":9,"ui/dialogs":10}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paper = function (_React$Component) {
    _inherits(Paper, _React$Component);

    function Paper() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Paper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Paper)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.makeBodyRef = function (ref) {
            return _this._body = ref;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Paper, [{
        key: "getPrintableHTML",
        value: function getPrintableHTML() {
            return this._body.innerHTML;
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            return this.props.header ? React.createElement(
                "div",
                { className: "p-header" },
                this.props.header
            ) : null;
        }
    }, {
        key: "renderTitle1",
        value: function renderTitle1() {
            return this.props.title1 ? React.createElement(
                "h1",
                null,
                this.props.title1
            ) : null;
        }
    }, {
        key: "renderTitle2",
        value: function renderTitle2() {
            return this.props.title2 ? React.createElement(
                "h2",
                null,
                this.props.title2
            ) : null;
        }
    }, {
        key: "renderTitle3",
        value: function renderTitle3() {
            return this.props.title3 ? React.createElement(
                "h3",
                null,
                this.props.title3
            ) : null;
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            return React.createElement(
                "div",
                {
                    className: "p-content",
                    ref: this.makeBodyRef
                },
                this.props.children
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "printable" },
                this.renderHeader(),
                this.renderTitle1(),
                this.renderTitle2(),
                this.renderTitle3(),
                this.renderBody()
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                children: PT.node.isRequired,
                header: PT.string,
                title1: PT.string,
                title2: PT.string,
                title3: PT.string
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                header: null,
                title1: null,
                title2: null,
                title3: null
            };
        }
    }]);

    return Paper;
}(React.Component);

exports.default = Paper;


Paper.displayName = "AdminPanel_components_Paper";

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _message_dispatcher = require("server/message_dispatcher");

var _storage = require("server/storage");

var _api = require("server/api");

var _components = require("ui/components");

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisciplineResults = function (_React$Component) {
    _inherits(DisciplineResults, _React$Component);

    _createClass(DisciplineResults, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                disciplineId: PT.number.isRequired,
                renderer: PT.func.isRequired
            };
        }
    }]);

    function DisciplineResults(props) {
        _classCallCheck(this, DisciplineResults);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineResults).call(this, props));

        _this.makeRendererRef = function (ref) {
            return _this._renderer = ref;
        };

        _this.handleTourResultsChanged = function (message) {
            if (!message) {
                _this.loadResults();
                return;
            }
            var tour_storage = _this.storage.get("Tour").by_id(message["tour_id"]);
            if (!tour_storage) {
                return;
            }
            if (tour_storage.discipline.id === _this.props.disciplineId) {
                _this.loadResults();
            }
        };

        _this.loadResults = function () {
            (0, _api.Api)("discipline.get_results", {
                discipline_id: _this.props.disciplineId
            }).onSuccess(function (response) {
                _this.setState({
                    results: response
                });
            }).send();
        };

        _this.loadData = function () {
            (0, _api.Api)("discipline.get", {
                discipline_id: _this.props.disciplineId,
                children: _this.SCHEMA
            }).addToDB("Discipline", _this.props.disciplineId, _this.storage).onSuccess(_this.reloadFromStorage).send();
        };

        _this.reloadFromStorage = function () {
            var serialized = _this.storage.get("Discipline").by_id(_this.props.disciplineId).serialize(_this.SCHEMA);
            _this.setState({
                discipline: serialized
            });
        };

        _this.handleSignal = function (message) {
            if (_this._renderer) {
                _this._renderer.handleSignal(message);
            }
        };

        _this.state = {
            discipline: null,
            results: null
        };
        return _this;
    }

    _createClass(DisciplineResults, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            this.setupStorage();
            this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", function () {
                _this2.loadData;_this2.loadResults();
            });
            this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage);
            this.results_change_listener = _message_dispatcher.message_dispatcher.addListener("tour_results_changed reload_data", this.handleTourResultsChanged);
            this.loadData();
            this.loadResults();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (this.props.disciplineId !== next_props.disciplineId) {
                this.setState({
                    discipline: null,
                    results: null
                });
                this.freeStorage(this.props.disciplineId);
                this.setupStorage(next_props.disciplineId);
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prev_props) {
            if (prev_props.disciplineId !== this.props.disciplineId) {
                this.loadData();
                this.loadResults();
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.results_change_listener);
            this.freeStorage();
        }
    }, {
        key: "setupStorage",
        value: function setupStorage() {
            var discipline_id = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (discipline_id === null) {
                discipline_id = this.props.disciplineId;
            }
            this.storage = _storage.storage.getDomain("discipline_results_" + discipline_id);
        }
    }, {
        key: "freeStorage",
        value: function freeStorage() {
            var discipline_id = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (discipline_id === null) {
                discipline_id = this.props.disciplineId;
            }
            _storage.storage.delDomain("discipline_results_" + discipline_id);
        }
    }, {
        key: "getMergedResults",
        value: function getMergedResults() {
            if (this.state.results === null || this.state.discipline === null) {
                return null;
            }
            // Build runs index
            var runs_index = new Map();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.state.discipline.tours[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tour = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = tour.runs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var run = _step2.value;

                            runs_index.set(run.id, { tour: tour, run: run });
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
                // Merge results
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var result = this.state.results.map(function (row) {
                return {
                    place: row.place,
                    tour: runs_index.get(row.run_id).tour,
                    run: runs_index.get(row.run_id).run
                };
            });
            return result;
        }

        // Listeners

    }, {
        key: "renderBody",


        // Rendering

        value: function renderBody(table) {
            var _props = this.props;
            var disciplineId = _props.disciplineId;
            var renderer = _props.renderer;

            var other_props = _objectWithoutProperties(_props, ["disciplineId", "renderer"]);

            var RenderingComponent = renderer;
            return React.createElement(RenderingComponent, _extends({
                discipline: this.state.discipline,
                ref: this.makeRendererRef,
                table: table
            }, other_props));
        }
    }, {
        key: "render",
        value: function render() {
            // eslint-disable-line react/sort-comp
            var table = this.getMergedResults();
            if (table === null) {
                return React.createElement(
                    "div",
                    { className: "discipline-results" },
                    React.createElement(_components.Loader, null)
                );
            }
            return React.createElement(
                "div",
                { className: "discipline-results" },
                this.renderBody(table)
            );
        }
    }, {
        key: "SCHEMA",
        get: function get() {
            return {
                competition: {},
                tours: {
                    runs: {
                        participant: {
                            club: {}
                        }
                    }
                }
            };
        }
    }]);

    return DisciplineResults;
}(React.Component);

exports.default = DisciplineResults;


DisciplineResults.displayName = "AdminPanel_common_DisciplineResults";

},{"l10n/loader":3,"server/api":6,"server/message_dispatcher":7,"server/storage":8,"ui/components":9}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("l10n/loader");

var _message_dispatcher = require("server/message_dispatcher");

var _storage = require("server/storage");

var _api = require("server/api");

var _components = require("ui/components");

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResults = function (_React$Component) {
    _inherits(TourResults, _React$Component);

    _createClass(TourResults, null, [{
        key: "propTypes",
        get: function get() {
            var PT = React.PropTypes;
            return {
                tourId: PT.number.isRequired,
                renderer: PT.func.isRequired
            };
        }
    }]);

    function TourResults(props) {
        _classCallCheck(this, TourResults);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TourResults).call(this, props));

        _this.makeRendererRef = function (ref) {
            return _this._renderer = ref;
        };

        _this.handleTourResultsChanged = function (message) {
            if (!message) {
                _this.loadResults();
                return;
            }
            var tour_storage = _this.storage.get("Tour").by_id(message["tour_id"]);
            if (!tour_storage) {
                return;
            }
            if (tour_storage.id === _this.props.tourId) {
                _this.loadResults();
            }
        };

        _this.loadResults = function () {
            (0, _api.Api)("tour.get_results", {
                tour_id: _this.props.tourId
            }).onSuccess(function (response) {
                _this.setState({
                    results: response
                });
            }).send();
        };

        _this.loadData = function () {
            (0, _api.Api)("tour.get", {
                tour_id: _this.props.tourId,
                children: _this.SCHEMA
            }).addToDB("Tour", _this.props.tourId, _this.storage).onSuccess(_this.reloadFromStorage).send();
        };

        _this.reloadFromStorage = function () {
            var serialized = _this.storage.get("Tour").by_id(_this.props.tourId).serialize(_this.SCHEMA);
            _this.setState({
                tour: serialized
            });
        };

        _this.handleSignal = function (message) {
            if (_this._renderer) {
                _this._renderer.handleSignal(message);
            }
        };

        _this.state = {
            tour: null,
            results: null
        };
        return _this;
    }

    _createClass(TourResults, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            this.setupStorage();
            this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", function () {
                _this2.loadData;_this2.loadResults();
            });
            this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage);
            this.results_change_listener = _message_dispatcher.message_dispatcher.addListener("tour_results_changed reload_data", this.handleTourResultsChanged);
            this.loadData();
            this.loadResults();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (this.props.tourId !== next_props.tourId) {
                this.setState({
                    tour: null,
                    results: null
                });
                this.freeStorage(this.props.tourId);
                this.setupStorage(next_props.tourId);
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prev_props) {
            if (prev_props.tourId !== this.props.tourId) {
                this.loadData();
                this.loadResults();
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.results_change_listener);
            this.freeStorage();
        }
    }, {
        key: "setupStorage",
        value: function setupStorage() {
            var tour_id = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (tour_id === null) {
                tour_id = this.props.tourId;
            }
            this.storage = _storage.storage.getDomain("tour_results_" + tour_id);
        }
    }, {
        key: "freeStorage",
        value: function freeStorage() {
            var tour_id = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (tour_id === null) {
                tour_id = this.props.tourId;
            }
            _storage.storage.delDomain("tour_results_" + tour_id);
        }
    }, {
        key: "getMergedResults",
        value: function getMergedResults() {
            if (this.state.results === null || this.state.tour === null) {
                return null;
            }
            // Build runs index
            var runs_index = new Map();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.state.tour.runs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var run = _step.value;

                    runs_index.set(run.id, run);
                }
                // Merge results
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var result = this.state.results.map(function (row) {
                return {
                    place: row.place,
                    advances: row.advances,
                    additional_data: row.additional_data,
                    run: runs_index.get(row.run_id)
                };
            });
            return result;
        }

        // Listeners

    }, {
        key: "renderNonFinalizedWarning",


        // Rendering

        value: function renderNonFinalizedWarning() {
            if (!this.state.tour.finalized) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "alert alert-danger" },
                (0, _loader._)("results.alerts.not_finalized")
            );
        }
    }, {
        key: "renderBody",
        value: function renderBody(table) {
            var _props = this.props;
            var tourId = _props.tourId;
            var renderer = _props.renderer;

            var other_props = _objectWithoutProperties(_props, ["tourId", "renderer"]);

            var RenderingComponent = renderer;
            return React.createElement(RenderingComponent, _extends({
                ref: this.makeRendererRef,
                table: table,
                tour: this.state.tour
            }, other_props));
        }
    }, {
        key: "render",
        value: function render() {
            // eslint-disable-line react/sort-comp
            var table = this.getMergedResults();
            if (table === null) {
                return React.createElement(
                    "div",
                    { className: "tour-results" },
                    React.createElement(_components.Loader, null)
                );
            }
            return React.createElement(
                "div",
                { className: "tour-results" },
                this.renderNonFinalizedWarning,
                this.renderBody(table)
            );
        }
    }, {
        key: "SCHEMA",
        get: function get() {
            return {
                discipline: {
                    competition: {},
                    discipline_judges: {
                        judge: {}
                    }
                },
                runs: {
                    acrobatics: {},
                    scores: {},
                    participant: {
                        club: {}
                    }
                }
            };
        }
    }]);

    return TourResults;
}(React.Component);

exports.default = TourResults;


TourResults.displayName = "common_TourResults";

},{"l10n/loader":3,"server/api":6,"server/message_dispatcher":7,"server/storage":8,"ui/components":9}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYXV0b19wcmludGVyLmpzeCIsInNyY1xcanN4XFxjb21tb25cXGRvY3guanN4Iiwic3JjXFxqc3hcXGwxMG5cXGxvYWRlci5qc3giLCJzcmNcXGpzeFxcbDEwblxccnUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXGxvYWRlci5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxhcGkuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcbWVzc2FnZV9kaXNwYXRjaGVyLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXHN0b3JhZ2UuanN4Iiwic3JjXFxqc3hcXHVpXFxjb21wb25lbnRzLmpzeCIsInNyY1xcanN4XFx1aVxcZGlhbG9ncy5qc3giLCJzcmNcXGpzeFxcdWlcXHByaW50YWJsZS5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXEp1ZGdpbmdcXFRvdXJQYW5lbFxcRGlzY2lwbGluZVJlc3VsdHNUYWJcXFdyYXBwZXIuanN4Iiwic3JjXFxqc3hfbmV3XFxBZG1pblBhbmVsXFxKdWRnaW5nXFxUb3VyUGFuZWxcXERpc2NpcGxpbmVSZXN1bHRzVGFiXFxpbmRleC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXEp1ZGdpbmdcXFRvdXJQYW5lbFxcSGVhdHNUYWJcXFJvdy5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXEp1ZGdpbmdcXFRvdXJQYW5lbFxcSGVhdHNUYWJcXGluZGV4LmpzeCIsInNyY1xcanN4X25ld1xcQWRtaW5QYW5lbFxcSnVkZ2luZ1xcVG91clBhbmVsXFxUb3VyUmVzdWx0c1RhYlxcV3JhcHBlci5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXEp1ZGdpbmdcXFRvdXJQYW5lbFxcVG91clJlc3VsdHNUYWJcXGluZGV4LmpzeCIsInNyY1xcanN4X25ld1xcQWRtaW5QYW5lbFxcU2VydmljZVxcQXV0b1ByaW50ZXJcXEpvYlF1ZXVlXFxBY3RpdmVKb2IuanN4Iiwic3JjXFxqc3hfbmV3XFxBZG1pblBhbmVsXFxTZXJ2aWNlXFxBdXRvUHJpbnRlclxcSm9iUXVldWVcXFRlc3RQYWdlLmpzeCIsInNyY1xcanN4X25ld1xcQWRtaW5QYW5lbFxcU2VydmljZVxcQXV0b1ByaW50ZXJcXEpvYlF1ZXVlXFxpbmRleC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXFNlcnZpY2VcXEF1dG9QcmludGVyXFxUYWJsZVxcQ2VsbC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXFNlcnZpY2VcXEF1dG9QcmludGVyXFxUYWJsZVxcUm93LmpzeCIsInNyY1xcanN4X25ld1xcQWRtaW5QYW5lbFxcU2VydmljZVxcQXV0b1ByaW50ZXJcXFRhYmxlXFxpbmRleC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXFNlcnZpY2VcXEF1dG9QcmludGVyXFxpbmRleC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXGNvbW1vblxcUGFwZXIuanN4Iiwic3JjXFxqc3hfbmV3XFxjb21tb25cXERpc2NpcGxpbmVSZXN1bHRzLmpzeCIsInNyY1xcanN4X25ld1xcY29tbW9uXFxUb3VyUmVzdWx0cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0dBLFNBQVMsTUFBVCxDQUNJLDJDQUFrQixPQUFPLFVBQVAsQ0FEdEIsRUFFSSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FGSjs7Ozs7Ozs7Ozs7OztJQ0hNO0FBQ0YsYUFERSxRQUNGLENBQVksUUFBWixFQUFzQjs4QkFEcEIsVUFDb0I7O0FBQ2xCLGFBQUssUUFBTCxHQUFnQixRQUFoQixDQURrQjtBQUVsQixhQUFLLE1BQUwsR0FBYyxJQUFkLENBRmtCO0FBR2xCLGFBQUssTUFBTCxHQUFjLElBQWQsQ0FIa0I7QUFJbEIsYUFBSyxNQUFMLEdBQWMsSUFBZCxDQUprQjtBQUtsQixhQUFLLE1BQUwsR0FBYyxJQUFkLENBTGtCO0FBTWxCLGFB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QVA7cUJBREo7aUJBRko7QUFNQSxzQkFBTTtBQUNGLGdDQUFZLEVBQVo7QUFDQSw0QkFBUSxFQUFSO0FBQ0EsaUNBQWE7QUFDVCw4QkFBTSxFQUFOO3FCQURKO2lCQUhKO2FBUEosQ0FEUzs7OztXQW5ESTtFQUFvQixNQUFNLFNBQU47O2tCQUFwQjs7O0FBb01yQixZQUFZLFdBQVosR0FBMEIsb0JBQTFCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBBdXRvUHJpbnRlciBmcm9tIFwiQWRtaW5QYW5lbC9TZXJ2aWNlL0F1dG9QcmludGVyXCI7XHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPEF1dG9QcmludGVyIHsgLi4ud2luZG93LnBhZ2VfcHJvcHMgfSAvPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKVxyXG4pO1xyXG4iLCJjbGFzcyBEb2N4SW1wbCB7XG4gICAgY29uc3RydWN0b3IoZmlsZW5hbWUpIHtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUxID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTIgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMyA9IG51bGw7XG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG51bGw7XG4gICAgICAgIHRoaXMuYm9keSA9IFwiXCI7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBcInBvcnRyYWl0XCI7XG4gICAgICAgIHRoaXMuc3R5bGVzID0ge1xuICAgICAgICAgICAgXCJib2R5XCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtZmFtaWx5XCI6IFwiQ2FsaWJyaSwgVGFob21hLCBBcmlhbCwgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGFibGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbGxhcHNlXCI6IFwiY29sbGFwc2VcIixcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJcIjoge1xuICAgICAgICAgICAgICAgIFwicGFnZS1icmVhay1pbnNpZGVcIjogXCJhdm9pZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGQsIHRoXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogXCIxcHQgM3B0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoMSwgaDIsIGgzLCBoNCwgaDUsIGg2XCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstYWZ0ZXJcIjogXCJhdm9pZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDFcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMjBwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiMTBwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDJcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNnB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoM1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCI0cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImg0IHBcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTRwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogXCIxMHB0IDAgNnB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoNSBwXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEycHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiNnB0IDBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi5oZWFkZXJcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWJvdHRvbVwiOiBcIjFweCBzb2xpZCBibGFja1wiLFxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTBwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcbiAgICAgICAgICAgICAgICBcInBhZGRpbmctYm90dG9tXCI6IFwiMnB0XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IFwiMjBwdFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicFwiOiB7XG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxpXCI6IHsgXCJtYXJnaW4tdG9wXCI6IDAsIFwicGFkZGluZy10b3BcIjogMCB9LFxuICAgICAgICAgICAgXCIuc3BhY2VyXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi52YS10b3BcIjoge1xuICAgICAgICAgICAgICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJ0b3BcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi50ZXh0LWxlZnRcIjogeyBcInRleHQtYWxpZ25cIjogXCJsZWZ0XCIgfSxcbiAgICAgICAgICAgIFwiLnRleHQtcmlnaHRcIjogeyBcInRleHQtYWxpZ25cIjogXCJyaWdodFwiIH0sXG4gICAgICAgICAgICBcIi50ZXh0LWNlbnRlclwiOiB7IFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICBcIi5ib3JkZXJlZC10YWJsZSB0ZCwgLmJvcmRlcmVkLXRhYmxlIHRoXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFwdCBzb2xpZCBibGFja1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFdpZHRoQ3NzKCk7XG4gICAgfVxuICAgIGFkZFdpZHRoQ3NzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDA7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5hZGRTdHlsZShcIi53LVwiICsgaSwgXCJ3aWR0aFwiLCBpICsgXCIlXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkU3R5bGUoc2VsZWN0b3IsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0eWxlc1tzZWxlY3Rvcl0pIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXVtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRIZWFkZXIoaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUxKHRpdGxlMSkge1xuICAgICAgICB0aGlzLnRpdGxlMSA9IHRpdGxlMTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMih0aXRsZTIpIHtcbiAgICAgICAgdGhpcy50aXRsZTIgPSB0aXRsZTI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTModGl0bGUzKSB7XG4gICAgICAgIHRoaXMudGl0bGUzID0gdGl0bGUzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0TWFyZ2lucyhtYXJnaW5zKSB7XG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG1hcmdpbnM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRCb2R5KGJvZHkpIHtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSB7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgZGF0YSkge1xuICAgICAgICBsZXQgY3NzX3BhaXJzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubWFwKChrZXkpID0+IGtleSArICc6ICcgKyBkYXRhW2tleV0gKyAnOyAnKVxuICAgICAgICByZXR1cm4gc2VsZWN0b3IgKyBcIiB7IFwiICsgY3NzX3BhaXJzLmpvaW4oXCIgXCIpICsgXCIgfVwiO1xuICAgIH1cbiAgICByZW5kZXJTdHlsZXMoKSB7XG4gICAgICAgIGxldCBjc3NfYmxvY2tzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5zdHlsZXMpLm1hcCgoXG4gICAgICAgICAgICAoc2VsZWN0b3IpID0+IHRoaXMucmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgdGhpcy5zdHlsZXNbc2VsZWN0b3JdKVxuICAgICAgICApLmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gY3NzX2Jsb2Nrcy5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgICByZW5kZXJIVE1MKCkge1xuICAgICAgICBsZXQgY3NzID0gdGhpcy5yZW5kZXJTdHlsZXMoKTtcbiAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMuaGVhZGVyID8gJzxwIGNsYXNzPVwiaGVhZGVyXCI+JyArIHRoaXMuaGVhZGVyICsgJzwvcD4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMSA9IHRoaXMudGl0bGUxID8gJzxoMT4nICsgdGhpcy50aXRsZTEgKyAnPC9oMT4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMiA9IHRoaXMudGl0bGUyID8gJzxoMj4nICsgdGhpcy50aXRsZTIgKyAnPC9oMj4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMyA9IHRoaXMudGl0bGUzID8gJzxoMz4nICsgdGhpcy50aXRsZTMgKyAnPC9oMz4nIDogXCJcIjtcbiAgICAgICAgbGV0IHNwYWNlciA9IChoZWFkZXIgfHwgdGl0bGUxIHx8IHRpdGxlMiB8fCB0aXRsZTMpID8gJzxwIGNsYXNzPVwic3BhY2VyXCI+Jm5ic3A7PC9wPicgOiBcIlwiO1xuICAgICAgICByZXR1cm4gXCI8IURPQ1RZUEUgaHRtbD5cXG5cIiArXG4gICAgICAgICAgICBcIjxodG1sPjxoZWFkPlwiICtcbiAgICAgICAgICAgICAgICBcIjxtZXRhIGNoYXJzZXQ9XFxcInV0Zi04XFxcIj5cIiArXG4gICAgICAgICAgICAgICAgXCI8c3R5bGU+XFxuXCIgKyBjc3MgKyBcIlxcbjwvc3R5bGU+XFxuXCIgK1xuICAgICAgICAgICAgXCI8L2hlYWQ+PGJvZHk+XFxuXCIgK1xuICAgICAgICAgICAgICAgIGhlYWRlciArXG4gICAgICAgICAgICAgICAgdGl0bGUxICtcbiAgICAgICAgICAgICAgICB0aXRsZTIgK1xuICAgICAgICAgICAgICAgIHRpdGxlMyArXG4gICAgICAgICAgICAgICAgc3BhY2VyICtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkgK1xuICAgICAgICAgICAgXCI8L2JvZHk+PC9odG1sPlwiO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJIVE1MKCk7XG4gICAgICAgIGxldCBtYXJnaW5zID0gdGhpcy5tYXJnaW5zIHx8ICh0aGlzLm9yaWVudGF0aW9uID09PSBcInBvcnRyYWl0XCIgPyBbMTAsIDE1LCAxMCwgMTVdIDogWzcsIDEwLCA3LCAxMF0pO1xuICAgICAgICBsZXQgY29udmVydGVkID0gaHRtbERvY3guYXNCbG9iKGh0bWwsIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLm9yaWVudGF0aW9uLFxuICAgICAgICAgICAgbWFyZ2luczoge1xuICAgICAgICAgICAgICAgIHRvcDogICAgTWF0aC5mbG9vcihtYXJnaW5zWzBdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAgTWF0aC5mbG9vcihtYXJnaW5zWzFdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogTWF0aC5mbG9vcihtYXJnaW5zWzJdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICAgTWF0aC5mbG9vcihtYXJnaW5zWzNdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2F2ZUFzKGNvbnZlcnRlZCwgdGhpcy5maWxlbmFtZSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCB2YXIgRG9jeCA9IChmbikgPT4gbmV3IERvY3hJbXBsKGZuKTtcbiIsImltcG9ydCB7IHRyYW5zbGF0ZSwgZ2V0UG9zc2libGVUb3VyTmFtZXMgfSBmcm9tIFwiLi9ydVwiO1xyXG5cclxuZXhwb3J0IHZhciBfID0gdHJhbnNsYXRlO1xyXG5leHBvcnQgdmFyIHRvdXJfbmFtZXMgPSBnZXRQb3NzaWJsZVRvdXJOYW1lcygpO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKHNyYywgYXJnKSB7XHJcbiAgICBmdW5jdGlvbiBjaG9vc2VFbmRpbmcobiwgZTEsIGUyLCBlNSkge1xyXG4gICAgICAgIGxldCB4ID0gbiAlIDEwMDtcclxuICAgICAgICBpZiAoTWF0aC5mbG9vcih4IC8gMTApID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPj0gNSB8fCB4ICUgMTAgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTI7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IFBIUkFTRVMgPSB7XHJcbiAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogKHZlcnNpb24sIGRhdGUpID0+IDxkaXYgY2xhc3NOYW1lPVwiYWJvdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48Yj5Sb2NrSnVkZ2Uge3ZlcnNpb259PC9iPiAo0LfQsNC60YDRi9GC0LDRjyDQstC10YDRgdC40Y8g0LTQu9GPINC+0LPRgNCw0L3QuNGH0LXQvdC90L7Qs9C+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPKSAmbWRhc2g7INGB0LjRgdGC0LXQvNCwINC00LvRjyDQv9C+0LTRgdGH0LXRgtCwINGA0LXQt9GD0LvRjNGC0LDRgtC+0LIg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INC/0L4g0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60L7QvNGDINGA0L7Qui3QvS3RgNC+0LvQu9GDLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QkNCy0YLQvtGA0YHQutC40LUg0L/RgNCw0LLQsCDQvdCwINGB0LjRgdGC0LXQvNGDIFJvY2tKdWRnZSDQv9C+0LvQvdC+0YHRgtGM0Y4g0L/RgNC40L3QsNC00LvQtdC20LDRgiDRgNCw0LfRgNCw0LHQvtGC0YfQuNC60YMg0JDRgNGC0LXQvNGDINCa0LDQt9Cw0LrQvtCy0YMuINCh0L7QsNCy0YLQvtGAINGB0LjRgdGC0LXQvNGLINCQ0L3RgtC+0L0g0JDQvNC10LvQuNC9LjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QodC40YHRgtC10LzQsCDRgNCw0YHQv9GA0L7RgdGC0YDQsNC90Y/QtdGC0YHRjyDQv9C+INC70LjRhtC10L3Qt9C40LggTGludW0gZC5vLm8gKGluZm9AbGludW0uaHIpLiDQlNC70Y8g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwIFJvY2tKdWRnZSDQvdC10L7QsdGF0L7QtNC40LzQviDQuCDQtNC+0YHRgtCw0YLQvtGH0L3QviDQuNC80LXRgtGMINC/0YDQsNCy0L4g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80YsgTGludW0gTFBTLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QntGE0LjRhtC40LDQu9GM0L3Ri9C5INGB0LDQudGCOiA8YSBocmVmPVwiaHR0cHM6Ly9yb2NranVkZ2UuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPmh0dHBzOi8vcm9ja2p1ZGdlLmNvbS88L2E+PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcHJvZ3JhbXNfYWZ0ZXJfY3JlYXRpb25cIjogXCLQn9GA0L7Qs9GA0LDQvNC80Ysg0LzQvtC20L3QviDQsdGD0LTQtdGCINC00L7QsdCw0LLQuNGC0Ywg0YLQvtC70YzQutC+INC/0L7RgdC70LUg0YHQvtGF0YDQsNC90LXQvdC40Y8g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQutC+0YDRgNC10LrRgtC90L4g0L3QsNGB0YLRgNC+0LXQvdCwINC4INC80L7QttC10YIg0LHRi9GC0Ywg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdCwLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfbm90X2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC90LXQtNC+0YHRgtGD0L/QvdCwINC90LAg0Y3RgtC+0Lwg0LrQvtC80L/RjNGC0LXRgNC1LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maW5hbGl6ZWRcIjogXCLQntGC0YHRg9GC0YHRgtCy0YPRjtGCINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfd2FybmluZ1wiOiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+0KTQuNC90LDQu9C40LfQsNGG0LjRjyDQtNC+0LvQttC90LAg0L7RgtC80LXQvdGP0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINC40YHQutC70Y7Rh9C40YLQtdC70YzQvdGL0YUg0YHQu9GD0YfQsNGP0YUhPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCV0YHQu9C4INC20LUg0Y3RgtC+INC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INC90LXQvtCx0YXQvtC00LjQvNC+LCDQvtCx0YDQsNGC0LjRgtC1INCy0L3QuNC80LDQvdC40LUsINGH0YLQviDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INGB0L/QuNGB0L7QuiDRg9GH0LDRgdGC0L3QuNC60L7QslxyXG4gICAgICAgICAgICAgICAgICAgINGB0LvQtdC00YPRjtGJ0LXQs9C+INGC0YPRgNCwINCx0YPQtNC10YIg0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60Lgg0L/QtdGA0LXRgdC+0LfQtNCw0L0uINCg0LXQt9GD0LvRjNGC0LDRgtGLINGD0YfQsNGB0YLQvdC40LrQvtCyLCDQv9GA0L7RiNC10LTRiNC40YUg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQv9C+0YHQu9C1INC/0LXRgNCy0L7QuVxyXG4gICAgICAgICAgICAgICAgICAgINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0Lgg0L3QtSDQv9GA0L7RiNC10LTRiNC40YUg0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0LHRg9C00YPRgiDQsdC10LfQstC+0LfQstGA0LDRgtC90L4g0YPRgtC10YDRj9C90YshPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCYINC90LUg0LfQsNCx0YPQtNGM0YLQtSDQt9Cw0L3QvtCy0L4g0L3QsNC/0LXRh9Cw0YLQsNGC0Ywg0LLRgdC1INGC0LHQu9C40YbRiy48L3A+PC9kaXY+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmludF90ZXN0X3BhZ2VcIjogXCLQndCw0L/QtdGH0LDRgtCw0YLRjCDRgtC10YHRgtC+0LLRg9GOINGB0YLRgNCw0L3QuNGG0YNcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVcIjogXCLQntGH0LXRgNC10LTRjCDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVfZW1wdHlcIjogXCLQntGH0LXRgNC10LTRjCDQv9GD0YHRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJydWxlc1wiOiBcItCX0LDQtNCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF9wYWdlXCI6IFwi0KLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfdGV4dFwiOiBcItCt0YLQviDRgtC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LAgUm9ja0p1ZGdlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25cIjogXCLQodC+0LfQtNCw0YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uX3BsYW5faXRlbVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9qdWRnZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YHRg9C00YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcGFydGljaXBhbnRcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRcIjogXCLQrdC60YHQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxhdW5jaF9hdXRvX3ByaW50ZXJcIjogXCLQl9Cw0L/Rg9GB0Log0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60L7QuSDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCe0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0YPRgdGC0YDQvtC50YHRgtCy0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fcGxhblwiOiBcItCh0L7RgNGC0LjRgNC+0LLQutCwINC/0L4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19kaXNjaXBsaW5lc1wiOiBcItCh0L7RgNGC0LjRgNC+0LLQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmNvbmZpcm1fc2NvcmVcIjogXCLQntGC0LzQtdC90LAg0YTQuNC60YHQsNGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY2x1YlwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINC60LvRg9CxP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY29tcGV0aXRpb25cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L4g0YHQvtGA0LXQstC90L7QstCw0L3QuNC1P1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZGlzY2lwbGluZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQtNC40YHRhtC40L/Qu9C40L3Rgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2p1ZGdlXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRgdGD0LTRjNGOP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcGFydGljaXBhbnRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0L/RgNC+0LPRgNCw0LzQvNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0YHRgtGA0LDQvdC40YbRgyDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y4g0YLRg9GA0LA/INCS0LLQtdC00LjRgtC1IMKrdW5maW5hbGl6ZcK7LCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6IFwi0J4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsaWVudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC/0L7QtNC60LvRjtGH0LXQvdC90YvQvNC4INGD0YHRgtGA0L7QudGB0YLQstCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQutC70YPQsdCw0Lw6XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25faW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINC+INGC0YPRgNC90LjRgNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5fbWFuYWdlbWVudFwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3Nob3duXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0YLQvtC70YzQutC+INC/0L4g0YHQu9C10LTRg9GO0YnQuNC8INC00LjRgdGG0LjQv9C70LjQvdCw0Lw6XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydF9jb21wZXRpdGlvblwiOiBcItCt0LrRgdC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsCDQuCDRgNC10LfRg9C70YzRgtCw0YLQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9jb21wZXRpdGlvblwiOiBcItCY0LzQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNC10LnRgdC60LDRjyDQsdGA0LjQs9Cw0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb2JhdGljc1wiOiBcItCX0LDQs9GA0YPQt9C60LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRg9GH0LDRgdGC0L3QuNC60LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VfbWVudVwiOiBcItCh0LXRgNCy0LjRgdC90L7QtSDQvNC10L3RjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5fbGlzdFwiOiBcItCh0L/QuNGB0L7QuiDRgdC/0L7RgNGC0YHQvNC10L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQntGC0LzQtdC90LAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bnBpY2tlZF90b3Vyc1wiOiBcItCd0LUg0LLQutC70Y7Rh9C10L3RiyDQsiDQv9GA0L7Qs9GA0LDQvNC80YNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0YtcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fZGF0ZVwiOiBcItCU0LDRgtCwINC/0YDQvtCy0LXQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX25hbWVcIjogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCg0LDRgdC/0YDQtdC00LXQu9C10L3QuNC1INGB0YPQtNC10Lkg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZ3JvdXBfYnlfY2x1YnNcIjogXCLQk9GA0YPQv9C/0LjRgNC+0LLQsNGC0Ywg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9hY3JvYmF0aWNzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2NsdWJzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQtNCw0L3QvdGL0LUg0L4g0LrQu9GD0LHQsNGFXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdC/0YDQtdC00LXQu9C10L3QuNC1INGB0YPQtNC10Lkg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZXh0ZW5kZWRfaW5mb1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YDQsNGB0YjQuNGA0LXQvdC90YPRjiDQuNC90YTQvtGA0LzQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Zvcm1hdGlvbl9zcG9ydHNtZW5cIjogXCLQktC60LvRjtGH0LjRgtGMINGB0L7RgdGC0LDQsiDRhNC+0YDQvNC10LnRiNC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2p1ZGdlc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INGB0YPQtNGM0Y/RhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbGVzX3NlbGVjdGVkXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRhNCw0LnQuy4uLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19wcm9ncmFtX2xvYWRlZFwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC90LUg0LfQsNCz0YDRg9C20LXQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c1wiOiBcItCj0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXN0ZV9hY3JvXCI6IFwi0JLRgdGC0LDQstGM0YLQtSDQtNCw0L3QvdGL0LUg0LjQtyDQutCw0LvRjNC60YPQu9GP0YLQvtGA0LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgtGD0YDQvdC40YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3Nwb3J0c21lbl9vbmx5XCI6IFwi0J/QvtC60LDQt9GL0LLQsNGC0Ywg0YLQvtC70YzQutC+INGB0L/QvtGA0YLRgdC80LXQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zdW1tYXJ5XCI6IFwi0J/QvtC60LDQt9GL0LLQsNGC0Ywg0YLQvtC70YzQutC+INC60L7Qu9C40YfQtdGB0YLQstC+XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YlwiOiBcItC30LDQv1wiLCAgLy8gc3Vic3RpdHV0ZVxyXG4gICAgICAgICAgICAgICAgXCJ0b3Vyc1wiOiBcItCi0YPRgNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Bhc3Njb2RlXCI6IFwi0JLQstC10LTRkdC9INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC/0L7RgtCy0LXRgNC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lbnVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NsdWJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9kaXNjaXBsaW5lc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfanVkZ2VzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3BhcnRpY2lwYW50c1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L/QvtGA0YLRgdC80LXQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfdG91cnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgtGD0YDQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuX3BhcnRpY2lwYW50c1wiOiBuID0+IG4udG9TdHJpbmcoKSArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5cIjogKG4sIHMpID0+IG4udG9TdHJpbmcoKSArIFwiINGB0L/QvtGA0YLRgdC80LXQvVwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpICsgKHMgPiAwID8gYCAoKyR7c30g0LfQsNC/0LDRgdC9JHsgY2hvb3NlRW5kaW5nKHMsIFwi0L7QuVwiLCBcItGL0YVcIiwgXCLRi9GFXCIpIH0pYCA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJuX3Nwb3J0c21lbl9zaG9ydFwiOiAobiwgcykgPT4gbi50b1N0cmluZygpICsgXCIg0YHQv9C+0YDRgtGB0LzQtdC9XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIikgKyAocyA+IDAgPyBgICgrJHtzfSDQt9Cw0L8uKWAgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxfbl9wYXJ0aWNpcGFudHNcIjogbiA9PiBcItCY0YLQvtCz0L4gXCIgKyBuICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdpbmctdGFic1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvdXItYWRtaW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZS1yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZXJyb3JzXCI6IHtcclxuICAgICAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxvYWRfc3ludGF4X2Vycm9yXCI6IFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQtNCw0L3QvdGL0YVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhcGlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkdXBsaWNhdGVkX2V4dGVybmFsX2lkXCI6IFwi0JIg0LTQsNC90L3Ri9GFINC40LzQtdGO0YLRgdGPINC30LDQv9C40YHQuCDRgSDQv9C+0LLRgtC+0YDRj9GO0YnQuNC80LjQvNGB0Y8gZXh0ZXJuYWxfaWRcIixcclxuICAgICAgICAgICAgICAgIFwidW5hYmxlX3RvX2dldFwiOiAod2FudGVkKSA9PiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0L7Qu9GD0YfQuNGC0YwgXCIgKyB3YW50ZWQgKyBcIiDQuNC3INC30LDQv9GA0L7RgdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC60LvRg9CxLCDQuiDQutC+0YLQvtGA0L7QvNGDINC/0YDQuNCy0Y/Qt9Cw0L3RiyDRg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9ub25fZW1wdHlcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUsINGB0L7QtNC10YDQttCw0YnQtdC1INC00LjRgdGG0LjQv9C70LjQvdGLLCDQutC70YPQsdGLINC40LvQuCDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvb19tYW55X3RvdXJzXCI6IChkKSA9PiBbXCLQntGI0LjQsdC60LAg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLCBg0JIg0LTQuNGB0YbQuNC/0LvQuNC90LUgJHtkfSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsdC+0LvRjNGI0LUg0YLRg9GA0L7Qsiwg0YfQtdC8INGB0L7Qt9C00LDQvdC+INCyINGB0LjRgdGC0LXQvNC1YF0sXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfZGlzY2lwbGluZV9mb3VuZFwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Lkg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRiywg0L7RgtGB0YPRgtGB0YLQstGD0Y7RidC40LUg0LIg0YHQuNGB0YLQtdC80LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2hhbmdlX2p1ZGdlc193aXRoX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdC+0YHRgtCw0LIg0YHRg9C00LXQuSDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YssINGB0L7QtNC10YDQttCw0YnQtdC5INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDRgyDQutC+0YDQvtCz0L4g0LXRgdGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3Njb3Jlc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4g0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0LIg0YHRg9C00LXQudGB0YLQstC1INGF0L7RgtGPINCx0Ysg0L7QtNC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlcGVhdGluZ19qdWRnZVwiOiAobmFtZSkgPT4gbmFtZSArIFwiINCy0YHRgtGA0LXRh9Cw0LXRgtGB0Y8g0LIg0YHQv9C40YHQutC1INGB0YPQtNC10Lkg0LHQvtC70LXQtSDQvtC00L3QvtCz0L4g0YDQsNC30LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnRlcm5hbF9zZXJ2ZXJfZXJyb3JcIjogW1wi0J7RiNC40LHQutCwINC90LAg0YHQtdGA0LLQtdGA0LVcIiwgXCLQv9GA0L7QstC10YDRjNGC0LUg0LvQvtCz0Lgg0LTQu9GPINC40L3RhNC+0YDQvNCw0YbQuNC4XCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZGlzY2lwbGluZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDQstGF0L7QtNGP0YnQtdCz0L4g0LIg0YHRg9C00LXQudGB0LrRg9GOINCx0YDQuNCz0LDQtNGDINGF0L7RgtGPINCx0Ysg0L7QtNC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwLCDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDRhdC+0YLRjyDQsdGLINCyINC+0LTQvdC+0Lwg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0Lwg0YLRg9GA0LVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJ1blwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNldF9wZXJmb3JtZWRfZmxhZ19vbl9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0YLQsNGC0YPRgSDQt9Cw0YXQvtC00LAg0YTQuNC90LDQu9C40LfQuNC90L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNjb3JlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2NvcmVfbm90X2V4aXN0XCI6IFwi0J/QvtC/0YvRgtC60LAg0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1INC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10Lkg0L7RhtC10L3QutC4INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX29uX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDQvtGG0LXQvdC60YMg0LIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0Lwg0YLRg9GA0LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0b3VyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2JlZm9yZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQtNC+0LHQsNCy0LjRgtGMINC90L7QstGL0Lkg0YLRg9GAINC/0LXRgNC10LQg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGC0YPRgCwg0L/RgNC40YHRg9GC0YHRgtCy0YPRjtGJ0LjQuSDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfZmluYWlsemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9hZGRfYWZ0ZXJfaWRcIjogXCLQn9C+0L/Ri9GC0LrQsCDQtNC+0LHQsNC40YLRjCDRgtGD0YAg0LIg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQtSDQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfc2NvcmluZ19zeXN0ZW1cIjogXCLQktGL0LHRgNCw0L3QsCDQvdC10LTQvtC/0YPRgdGC0LjQvNCw0Y8g0YHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfdG9fbm9uX2VtcHR5XCI6IChkKSA9PiBbXCLQndC10LLQvtC30LzQvtC20L3QviDQt9Cw0LPRgNGD0LfQuNGC0Ywg0YLRg9GA0Ysg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLXCIsIGDQlNC40YHRhtC40L/Qu9C40L3QsCAke2R9INGD0LbQtSDRgdC+0LTQtdGA0LbQuNGCINGC0YPRgNGLYF0sXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaXNfZmluYWlsemVkXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQvdC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19uZXh0X3RvdXJcIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC/0L7RgdC70LXQtNC90LjQuSDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQvdC1INGB0L7QtNC10YDQttC40YLRgdGPINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9ub3RfZmluYWlsemVkXCI6IFwi0J/RgNC10LTRi9C00YPRidC40Lkg0YLRg9GAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9maW5hbGl6ZWRcIjogXCLQlNC70Y8g0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsCDQvdC1INC00L7Qv9GD0YHQutCw0LXRgtGB0Y8g0LjQt9C80LXQvdC10L3QuNC1INC60LLQvtGC0Ysg0LLRi9Cy0L7QtNCwLCDRgtC40L/QsCDRgtGD0YDQsCDQuNC70Lgg0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZFwiOiBcItCU0L7QsdCw0LLQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvc2VcIjogXCLQl9Cw0LrRgNGL0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNlbGVjdF9hbGxcIjogXCLQodC90Y/RgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJlZGl0XCI6IFwi0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwi0KPQtNCw0LvQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2FyZFwiOiBcItCe0YLQvNC10L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZFwiOiBcItCX0LDQs9GA0YPQt9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzYXZlXCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9hbGxcIjogXCLQktGL0LHRgNCw0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwic3VibWl0XCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYnJvd3NlXCI6IFwi0J7QsdC30L7RgC4uLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW5nXCI6IFwi0J/QvtC00LrQu9GO0YfQtdC90LjQtSDQuiDRgdC10YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX3Byb2JsZW1cIjogXCLQn9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwieWVzXCI6IFwi0JTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9lcnJvclwiOiBcItCf0L7RhdC+0LbQtSwg0LjQvNC10Y7RgtGB0Y8g0L/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImVycm9yX2hlYWRlclwiOiBcItCe0YjQuNCx0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWNjZXNzXCI6IFwi0J7Qv9C10YDQsNGG0LjRjyDRg9GB0L/QtdGI0L3QviDQt9Cw0LLQtdGA0YjQtdC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGVhdF9uXCI6IChuKSA9PiBcItCX0LDRhdC+0LQg4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IFwi0JvQuNC90LXQudC90YvQuSDRgdGD0LTRjNGPIOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIChuX3NwID4gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwi0KTQvtGA0LzQtdC50YjQvSDihJZcIiArIG4udG9TdHJpbmcoKSArIChuYW1lID8gXCI6IFwiICsgbmFtZSA6IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKG5fc3AgPT09IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQn9Cw0YDQsCDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcItCj0YfQsNGB0YLQvdC40Log4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSArIG4udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2luZ1wiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlZGl0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCY0LfQvNC10L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0J/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfYWNyb2JhdGljX292ZXJyaWRlXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0J/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3RvdXJcIjogXCLQndCw0YfQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCe0YHRgtCw0L3QvtCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0L/RgNC+0LPRgNCw0LzQvNGDINC00LvRjyDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRiz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LHQsNC30L7QstGL0YUg0L7RhtC10L3QvtC6INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2lkeFwiOiBcIuKEliDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybWVkXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibmV3X3Njb3JlXCI6IFwi0JrQvtGA0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgXCJvbGRfc2NvcmVcIjogXCLQkdCw0LfQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQklwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vZGVsc1wiOiB7XHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60LvRg9Cx0LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWN0aXZlXCI6IFwi0JDQutGC0LjQstC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcItCU0LDRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQlNC+0L/QvtC70L3QuNGC0LXQu9GM0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPINC00LvRjyDQv9GA0L7RgtC+0LrQvtC70LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3RpdGxlXCI6IFwi0JfQsNCz0L7Qu9C+0LLQvtC6XCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV92YWx1ZVwiOiBcItCX0L3QsNGH0LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwicnVsZXNfc2V0XCI6IFwi0KHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9iZWdpbm5pbmdcIjogXCLQndCw0YfQsNC70L5cIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2R1cmF0aW9uXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0JBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LtcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YVcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJvbGVzX2xlZ2VuZFwiOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctMTAwXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7Qk9C7IOKAlCDQs9C70LDQstC90YvQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QoiDigJQg0YHRg9C00YzRjyDRgtCw0L3RhtCwPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QkCDigJQg0YHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KJleCDigJQg0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBcItCa0LDRgtC10LPQvtGA0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L0uIElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQpC4g0JguINCeLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVcIjogXCLQoNC+0LvRjCDQsiDRgdGD0LTQtdC50YHRgtCy0LVcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZV9kZXNjcmlwdGlvblwiOiBcItCU0L7Qu9C20L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uc1wiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfbmFtZVwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfbmFtZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCLQmNC80Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCI6IFwi0J/QvtC7XCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9mXCI6IFwi0JZcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX21cIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5lcmFsX2luZm9cIjogXCLQntGB0L3QvtCy0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC+0LzQsNC90LTRiyDRhNC+0YDQvNC10LnRiNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcItCk0LDQvNC40LvQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZ3JhbXNcIjogXCLQn9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWFuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfblwiOiBcItCe0YHQvS5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV95XCI6IFwi0JfQsNC/LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZWFyX29mX2JpcnRoXCI6IFwi0JPQvtC0INGA0L7QttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwieW9iXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZ3JhbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfZm9yXCI6IFwi0J/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfcHJvZ3JhbVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX2hvcGVfdG91clwiOiBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwibnVtX2FkdmFuY2VzXCI6IFwi0JrQstC+0YLQsCDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX3Blcl9oZWF0XCI6IFwi0KPRh9Cw0YHRgtC90LjQutC+0LIg0LIg0LfQsNGF0L7QtNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjb3Jpbmdfc3lzdGVtX25hbWVcIjogXCLQodC40YHRgtC10LzQsCDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfaGVhdFwiOiBcItCh0LHRgNC+0YEg0L3QvtC80LXRgNCwINC30LDRhdC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9wbGFjZVwiOiBcItCh0LHRgNC+0YEg0LzQtdGB0YLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VzXCI6IFwi0JzQtdGB0YLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicHJlc2VudGVyXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGCLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19hY3RpdmVfdG91clwiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2ZpbmFsaXplZFwiOiBcItCU0LDQvdC90YvQtSDRgNC10LfRg9C70YzRgtCw0YLRiyDQvdC1INGP0LLQu9GP0Y7RgtGB0Y8g0L7QutC+0L3Rh9Cw0YLQtdC70YzQvdGL0LzQuC5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicHJpbnRcIjogXCLQn9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxlX3ZpZXdcIjogXCLQo9C/0YDQvtGJ0LXQvdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX3ZpZXdcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic3RhcnRfcGFnZVwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9jb21wZXRpdGlvblwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1INC00LvRjyDQv9GA0L7QtNC+0LvQttC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9yb2xlXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdCy0L7RjiDRgNC+0LvRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm9fY29tcGV0aXRpb25zXCI6IFwi0J3QtdGCINCw0LrRgtC40LLQvdGL0YUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50X2xpbmtcIjogKGxpbmspID0+IDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgINCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80Lgg0L3QsNGF0L7QtNC40YLRgdGPINC/0L4g0LDQtNGA0LXRgdGDJm5ic3A7XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17IGxpbmsgfT57IGxpbmsgfTwvYT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZG1pbmlzdHJhdG9yXCI6IFwi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuXCI6IFwi0K3QutGA0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY3JlZW5fb3BlcmF0b3JcIjogXCLQntC/0LXRgNCw0YLQvtGAINGN0LrRgNCw0L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhhc191bmNvbmZpcm1lZF9zY29yZXNcIjogXCLQmNC80LXRjtGC0YHRjyDQvdC10LfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L3Ri9C1INC+0YbQtdC90LrQuCDRgdGD0LTQtdC5INCyINC/0L7RgdC70LXQtNC90LXQvCDQt9Cw0YXQvtC00LUuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YNcIixcclxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LXQstGL0YXQvtC0INC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfc3RvcHdhdGNoXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9zdG9wd2F0Y2hcIjogXCLQodGC0LDRgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwIOKEllwiICsgKG4gKyAxKSxcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X3BhZ2VcIjogXCLQodGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19kaXNjaXBsaW5lXCI6IFwi0JLRiyDQvdC1INGD0YfQsNGB0YLQstGD0LXRgtC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDQtNCw0L3QvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfcGFydGljaXBhbnRcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfdG91clwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7RgiDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1pbmdcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogXCLQlNC10LnRgdGC0LLQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhbmNlXCI6IFwi0KLQsNC90LXRhlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcG9zaXRpb25cIjogXCLQmtC+0LzQv9C+0LfQuNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2ZpZ3NcIjogXCLQotCw0L3RhtC10LLQsNC70YzQvdGL0LUg0YTQuNCz0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfdGVjaFwiOiBcItCi0LXRhdC90LjQutCwINGC0LDQvdGG0LXQstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9mYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9taXN0YWtlc1wiOiBcItCe0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9zbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMylcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3dvbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGA0YjQsCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW1wcmVzc2lvblwiOiBcItCe0LHRidC10LUg0LLQv9C10YfQsNGC0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBvaW50c1wiOiBcItCe0YbQtdC90LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlX3Njb3Jlc1wiOiBcItCe0YbQtdC90LrQuCDQu9C40L3QtdC50L3Ri9GFINGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJva1wiOiBcIk9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVuYWx0eV90eXBlXCI6IFwi0KjRgtGA0LDRhNC90YvQtSDRgdCw0L3QutGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByZXZpb3VzX3BlbmFsdGllc1wiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC1INGI0YLRgNCw0YTRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZF9jYXJkXCI6IFwiLTMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1feWVsbG93X2NhcmRcIjogXCItNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fcmVkX2NhcmRcIjogXCItMTVcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianVtcF9zdGVwc1wiOiBcItCe0YHQvdC+0LLQvdGL0LUg0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXNldF90b19uXCI6IChuKSA9PiBcItCh0LHRgNC+0YEg0L3QsCBcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1pbmdcIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJicmVha2Rvd25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIjogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBcIkFcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibVwiOiBcItCR0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjXCI6IFwi0JpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZlwiOiBcItCi0KRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkdFwiOiBcItCiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZkXCI6IFwi0J9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmbVwiOiBcItCe0KXQvFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3XCI6IFwi0J7QpdC2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaVwiOiBcItCe0JJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtXCI6IFwi0J7RiFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBcIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtXCI6IFwi0JzQnlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRcIjogXCLOo1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfYWR2YW5jZWRcIjogXCLQn9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIjogXCLQndC1INC/0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LvQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0LDQutGA0L5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzX3ZlcmJvc2VcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCAo0LfQsNGP0LLQutCwL9GE0LDQutGCKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNhcmRcIjogXCLQqNGC0YDQsNGEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlX3Nob3J0XCI6IFwi0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQo9GH0LDRgdGC0L3QuNC6LCDRgNC10LfRg9C70YzRgtCw0YJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0X3RvdXJcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0L/RgNC40L3QuNC80LDQuyDRg9GH0LDRgdGC0LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NsdWJcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVuYWx0eVwiOiBcItCo0YLRgNCw0YQg0LPQu9Cw0LLQvdC+0LPQviDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQnNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0JjRgtC+0LNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNfbmFtZXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYXNlX25hbWVcIjogXCLQoNC+0YHQpNCQ0KDQoFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfZndcIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvblwiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INCx0LXQtyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INGBINCw0LrRgNC+0LHQsNGC0LjQutC+0LlcIixcclxuICAgICAgICAgICAgICAgIFwibm9fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRgtCw0L3RhtC10LLQsNC70YzQvdGL0LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsaWZpZWRcIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YPQv9GA0L7RidC10L3QvdCw0Y8g0YHQuNGB0YLQtdC80LAgKDHigJM0MClcIixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnZV9yb2xlc1wiOiB7XHJcbiAgICAgICAgICAgIFwiXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQodGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCLQodGD0LTRjNGPINGC0LDQvdGG0LBcIixcclxuICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIGxldCBwYXRoID0gc3JjLnNwbGl0KFwiLlwiKTtcclxuICAgIGxldCBwaHJhc2VfcHRyID0gUEhSQVNFUztcclxuICAgIHBhdGguZm9yRWFjaCgoY2h1bmspID0+IHBocmFzZV9wdHIgPSBwaHJhc2VfcHRyW2NodW5rXSk7XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGZpbmQgdHJhbnNsYXRpb24gZm9yIFwiICsgc3JjKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGxldCBhcmdzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpZHhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBocmFzZV9wdHIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGhyYXNlX3B0cjtcclxufVxyXG5cclxuZXhwb3J0IHZhciBnZXRQb3NzaWJsZVRvdXJOYW1lcyA9ICgpID0+IFtcclxuICAgIFwi0KTQuNC90LDQu1wiLFxyXG4gICAgXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICBcItCe0YLQsdC+0YDQvtGH0L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgXCIxLzIg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvNCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS84INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzE2INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgIFwi0KTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuXTtcclxuIiwiY2xhc3MgUnVsZXNTZXRMb2FkZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZChtb2R1bGVfbmFtZSwgZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IEtFWVMgPSBbXCJ0b3VyX3Jlc3VsdHNfdGFibGVfMVwiLCBcInRvdXJfcmVzdWx0c190YWJsZV8yXCIsIFwidG91cl9yZXN1bHRzX3RhYmxlXzNcIixcclxuICAgICAgICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzX3RhYmxlXCIsIFwianVkZ2VfdGFibGV0XCIsIFwiYWRtaW5fc2NvcmVfaW5wdXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgIFwiZ2V0X2p1ZGdlX3RhYmxlX21hcmtcIl07XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgS0VZUykge1xyXG4gICAgICAgICAgICBpZiAoIShrZXkgaW4gZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTW9kdWxlICR7bW9kdWxlX25hbWV9IGRvZXNuJ3QgZXhwb3J0ICR7a2V5fSBjbGFzcy5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzW2BfJHtrZXl9YF0gPSBkYXRhW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGlmIChLRVlTLmluZGV4T2Yoa2V5KSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgTW9kdWxlICR7bW9kdWxlX25hbWV9IGV4cG9ydHMgdW5rbm93biAke2tleX0gcGFyYW1ldGVyLmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coYEFkZGVkIHNjb3Jpbmcgc3lzdGVtOiAke21vZHVsZV9uYW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIF9jaGVja0lmTG9hZGVkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHNjb3Jpbmcgc3lzdGVtIHdhcyBsb2FkZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b3VyX3Jlc3VsdHNfdGFibGVfMSgpIHtcclxuICAgICAgICB0aGlzLl9jaGVja0lmTG9hZGVkKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdXJfcmVzdWx0c190YWJsZV8xO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b3VyX3Jlc3VsdHNfdGFibGVfMigpIHtcclxuICAgICAgICB0aGlzLl9jaGVja0lmTG9hZGVkKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdXJfcmVzdWx0c190YWJsZV8yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b3VyX3Jlc3VsdHNfdGFibGVfMygpIHtcclxuICAgICAgICB0aGlzLl9jaGVja0lmTG9hZGVkKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdXJfcmVzdWx0c190YWJsZV8zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkaXNjaXBsaW5lX3Jlc3VsdHNfdGFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJZkxvYWRlZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNjaXBsaW5lX3Jlc3VsdHNfdGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGp1ZGdlX3RhYmxldCgpIHtcclxuICAgICAgICB0aGlzLl9jaGVja0lmTG9hZGVkKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2p1ZGdlX3RhYmxldDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWRtaW5fc2NvcmVfaW5wdXQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJZkxvYWRlZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZG1pbl9zY29yZV9pbnB1dDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ2V0X2p1ZGdlX3RhYmxlX21hcmsoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJZkxvYWRlZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRfanVkZ2VfdGFibGVfbWFyaztcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbG9hZGVyID0gbmV3IFJ1bGVzU2V0TG9hZGVyKCk7XHJcblxyXG53aW5kb3cucmVnaXN0ZXJSdWxlc1NldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbG9hZGVyLmxvYWQoLi4uYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9hZGVyO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgc2hvd0Vycm9yIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcblxyXG5jbGFzcyBBcGlJbXBsIHtcclxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IChtc2csIGNvZGUsIGFyZ3MpID0+IHNob3dFcnJvcihjb2RlID8gXyhjb2RlLCAuLi5hcmdzKSA6IG1zZyk7XHJcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gKC4uLmRhdGEpID0+IGNvbnNvbGUuZXJyb3IoXCJBUEkgZmFpbFwiLCAuLi5kYXRhKTtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG4gICAgb25Eb25lKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9kb25lID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvblN1Y2Nlc3MoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRXJyb3IoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvbkZhaWwoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFkZFRvREIobW9kZWxfdHlwZSwgbW9kZWxfaWQsIHN0PXN0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHN0LmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZW5kKCkge1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvYXBpXCIsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX2RiKHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2Jfc3VjY2VzcyhyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2Vycm9yKHJlc3BvbnNlLm1lc3NhZ2UsIHJlc3BvbnNlLmNvZGUsIHJlc3BvbnNlLmFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBpZiAod2luZG93LmNsaWVudF9pZCkge1xyXG4gICAgICAgICAgICBkYXRhLmFwcGVuZChcImNsaWVudF9pZFwiLCB3aW5kb3cuY2xpZW50X2lkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuIiwiaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uX3N0YXR1cyB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcblxyXG5cclxuY2xhc3MgTWVzc2FnZURpc3BhdGNoZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzX2NudCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGluZyB0byB3ZWJzb2NrZXQuLi5cIik7XHJcbiAgICAgICAgdGhpcy53cyA9IG5ldyBTb2NrSlMoXCJodHRwOi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIFwiL3dzXCIpO1xyXG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldE9rKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkLlwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogW1tcInJlbG9hZF9kYXRhXCIsIG51bGxdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxfdXBkYXRlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldEZhaWwoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNvbm5lY3QuYmluZCh0aGlzKSwgNTAwKTtcclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb25NZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICBpZiAoZGF0YVtcImNsaWVudF9pZFwiXSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xpZW50X2lkID0gZGF0YVtcImNsaWVudF9pZFwiXTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLm1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbXNnX3R5cGUgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICBsZXQgbXNnX2RhdGEgPSBkYXRhWzFdO1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAobXNnX3R5cGUgPT09IFwiZm9yY2VfcmVmcmVzaFwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fSkuZm9yRWFjaCgoa2V5KSA9PiBsaXN0ZW5lcnNba2V5XShtc2dfZGF0YSkpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRhdGEubW9kZWxfdXBkYXRlcy5mb3JFYWNoKChtb2RlbF9pbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHN0b3JhZ2UudXBkYXRlTW9kZWwobW9kZWxfaW5mby5tb2RlbCwgbW9kZWxfaW5mby5pZCwgbW9kZWxfaW5mby5kYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGRhdGFfY2hhbmdlZCkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbXCJkYl91cGRhdGVcIl0gfHwge307XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRMaXN0ZW5lcklkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc19jbnQrKztcclxuICAgIH1cclxuICAgIGFkZExpc3RlbmVyKG1zZ190eXBlcywgY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldExpc3RlbmVySWQoKTtcclxuICAgICAgICBtc2dfdHlwZXMuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24obXNnX3R5cGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXVtpZF0gPSBjYWxsYmFjaztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyX2lkKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1trZXldW2xpc3RlbmVyX2lkXTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuaWYgKCF3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyKSB7XHJcbiAgICB3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XHJcbn1cclxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSB3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyO1xyXG4iLCJjbGFzcyBSZWYge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSwgaWQpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubW9kZWxfbmFtZSkuYnlfaWQodGhpcy5pZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIGlkLCBtb2RlbF9zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX19zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzID0ge307XHJcbiAgICAgICAgdGhpcy5fX21vZGVsX3N0b3JhZ2UgPSBtb2RlbF9zdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkQmFja1JlZihrZXksIHJlZikge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHJlZjtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgIH1cclxuICAgIHVwZGF0ZShkYXRhLCBjcmVhdGU9dHJ1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IGlkeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIiB8fCBpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjcmVhdGUgJiYgdHlwZW9mIHRoaXNbaWR4LnNsaWNlKDEpXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IFtdXHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCB0aGlzLl9fbW9kZWxfc3RvcmFnZS5tb2RlbF9uYW1lLCB0aGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZl9rZXkgPSBkYXRhW2lkeF0uYmFja19yZWY7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2lkeF0uY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihuZXN0ZWRfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEuZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZi5nZXQoKS5hZGRCYWNrUmVmKGJhY2tfcmVmX2tleSwgYmFja19yZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XS5wdXNoKHJlZik7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCIqXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVzdGVkX2RhdGEgPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpZHhdID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1tpZHhdID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNlcmlhbGl6ZShzY2hlbWEpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge31cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fX2tleV90eXBlcykgaWYgKHRoaXMuX19rZXlfdHlwZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX19rZXlfdHlwZXNba2V5XSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiKlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5tYXAoZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWYuZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiXlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQuaWQgPSB0aGlzLmlkXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWxzU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGQoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxzW2lkXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0gPSBuZXcgTW9kZWwodGhpcy5zdG9yYWdlLCBpZCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbHNbaWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYnlfaWQoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbaWRdO1xyXG4gICAgfVxyXG4gICAgYWxsKCkge1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tb2RlbHMpO1xyXG4gICAgICAgIHJldHVybiBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2tleV07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZG9tYWlucyA9IHt9XHJcbiAgICB9XHJcbiAgICBnZXREb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRvbWFpbnNbZG9tYWluXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRvbWFpbnNbZG9tYWluXSA9IG5ldyBTdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGRlbERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBnZXQobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID0gbmV3IE1vZGVsc1N0b3JhZ2UodGhpcywgbW9kZWxfbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgZGVsKG1vZGVsX25hbWUpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX3R5cGVdKSB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmRvbWFpbnMpLmZvckVhY2goKGtleSkgPT5cclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5kb21haW5zW2tleV0udXBkYXRlTW9kZWwoLi4uYXJndW1lbnRzKSB8fCBkYXRhX2NoYW5nZWQpO1xyXG4gICAgICAgIC8vIHJldHVybiBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgc3R5bGU9e3sgXCJoZWlnaHRcIjogXCIxMDAlXCIsIFwid2lkdGhcIjogXCIxMDAlXCIgfX0+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIgfX0+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvaW1nL2FqYXgtbG9hZGVyLmdpZlwiIC8+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXNNb2NrIHtcclxuICAgIHNldE9rKCkge31cclxuICAgIHNldEZhaWwoKSB7fVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFwiY29ubmVjdGVkXCI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbm5lY3Rpb25fc3RhdHVzXCIpO1xyXG4gICAgICAgIGlmIChlbGVtZW50ICYmICFlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgPENvbm5lY3Rpb25TdGF0dXMgLz4sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvblN0YXR1c01vY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRPaygpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IHRydWUsIHRpY2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0RmFpbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgb2tcIj48L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3RpbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LWRhbmdlclwiICsgKHRoaXMuc3RhdGUudGljayA/IFwiIHRpY2tcIiA6IFwiXCIpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW9uX3Byb2JsZW1cIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29ubmVjdGlvbl9zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmluaXQoKTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XHJcbiAgICBsZXQgdGl0bGUgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMF0gOiBfKFwiZ2xvYmFsLm1lc3NhZ2VzLmVycm9yX2hlYWRlclwiKTtcclxuICAgIGxldCB0ZXh0ID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzFdIDogbXNnO1xyXG4gICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDb25maXJtKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkge1xyXG4gICAgcmV0dXJuIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxyXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxyXG4gICAgfSwgYWN0aW9uKTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgUHJpbnRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZmV0Y2hQcmludGFibGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGVhZGVyID8gPGRpdiBjbGFzc05hbWU9XCJwLWhlYWRlclwiPnsgdGhpcy5wcm9wcy5oZWFkZXIgfTwvZGl2PiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUxID8gPGgxPnsgdGhpcy5wcm9wcy50aXRsZTEgfTwvaDE+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTIgPyA8aDI+eyB0aGlzLnByb3BzLnRpdGxlMiB9PC9oMj4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMyA/IDxoMz57IHRoaXMucHJvcHMudGl0bGUzIH08L2gzPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC1jb250ZW50XCJcbiAgICAgICAgICAgICAgICByZWY9eyBlID0+IHRoaXMuX2JvZHkgPSBlIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuYm9keSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByaW50YWJsZVwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTEoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUyKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMygpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcclxuXHJcbmltcG9ydCBydWxlc19zZXQgZnJvbSBcInJ1bGVzX3NldHMvbG9hZGVyXCI7XHJcblxyXG5pbXBvcnQgUGFwZXIgZnJvbSBcIkFkbWluUGFuZWwvY29tbW9uL1BhcGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXcmFwcGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGF1dG9Eb2N4OiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBvbkRvbmU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRhYmxlOiBQVC5hcnJheU9mKFBULm9iamVjdC5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBkaXNjaXBsaW5lOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4Lm9uRG9uZSh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlUHJpbnRhYmxlUmVmID0gKHJlZikgPT4gdGhpcy5fcHJpbnRhYmxlID0gcmVmO1xyXG5cclxuICAgIGhhbmRsZVNpZ25hbCA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlKSB7XHJcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBtZXNzYWdlOlwiLCBtZXNzYWdlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJCb2R5KCkge1xyXG4gICAgICAgIGNvbnN0IFJlbmRlcmluZ0NvbXBvbmVudCA9IHJ1bGVzX3NldC5kaXNjaXBsaW5lX3Jlc3VsdHNfdGFibGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFJlbmRlcmluZ0NvbXBvbmVudCB7IC4uLnRoaXMucHJvcHMgfSAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvc29ydC1jb21wXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFBhcGVyXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMucHJvcHMuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlIH1cclxuICAgICAgICAgICAgICAgIHJlZj17IHRoaXMubWFrZVByaW50YWJsZVJlZiB9XHJcbiAgICAgICAgICAgICAgICB0aXRsZTE9eyBfKFwiYWRtaW4uaGVhZGVycy5kaXNjaXBsaW5lX3Jlc3VsdHNcIikgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUzPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lLm5hbWUgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cclxuICAgICAgICAgICAgPC9QYXBlcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHMuZG9jeFwiKSB7XHJcbiAgICAgICAgRG9jeChmaWxlbmFtZSlcclxuICAgICAgICAgICAgLnNldEhlYWRlcih0aGlzLnByb3BzLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMucHJvcHMuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5kYXRlKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUxKF8oXCJhZG1pbi5oZWFkZXJzLmRpc2NpcGxpbmVfcmVzdWx0c1wiKSlcclxuICAgICAgICAgICAgLnNldFRpdGxlMyh0aGlzLnByb3BzLmRpc2NpcGxpbmUubmFtZSlcclxuICAgICAgICAgICAgLnNldEJvZHkodGhpcy5fcHJpbnRhYmxlLmdldFByaW50YWJsZUhUTUwoKSlcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdXItbmFtZVwiLCBcImJhY2tncm91bmRcIiwgXCIjZGRkXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0aFwiLCBcImJvcmRlclwiLCBcIm5vbmVcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwicGFkZGluZ1wiLCBcIjBcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNwb3J0c21lblwiLCBcIndpZHRoXCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAuc2F2ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5XcmFwcGVyLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX0p1ZGdpbmdfRGlzY2lwbGluZVBhbmVsX0Rpc2NpcGxpbmVSZXN1bHRzVGFiX1dyYXBwZXJcIjtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gXCJ1aS9wcmludGFibGVcIjtcclxuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xyXG5cclxuaW1wb3J0IERpc2NpcGxpbmVSZXN1bHRzIGZyb20gXCJjb21tb24vRGlzY2lwbGluZVJlc3VsdHNcIjtcclxuXHJcbmltcG9ydCBXcmFwcGVyIGZyb20gXCIuL1dyYXBwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzVGFiIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGF1dG9Eb2N4OiBQVC5vYmplY3QsXHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VSZXN1bHRzUmVmID0gKHJlZikgPT4gdGhpcy5fcmVzdWx0cyA9IHJlZjtcclxuXHJcbiAgICBoYW5kbGVTaWduYWwgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3Jlc3VsdHMuaGFuZGxlU2lnbmFsKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbmRlcmluZ1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8RGlzY2lwbGluZVJlc3VsdHNcclxuICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXsgdGhpcy5wcm9wcy5hdXRvRG9jeCB9XHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSWQ9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmUuaWQgfVxyXG4gICAgICAgICAgICAgICAgcmVmPXsgdGhpcy5tYWtlUmVzdWx0c1JlZiB9XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlcj17IFdyYXBwZXIgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5EaXNjaXBsaW5lUmVzdWx0c1RhYi5kaXNwbGF5TmFtZSA9IFwiQWRtaW5QYW5lbF9KdWRnaW5nX0Rpc2NpcGxpbmVQYW5lbF9EaXNjaXBsaW5lUmVzdWx0c1RhYlwiO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhcnRpY2lwYW50OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgbnVtYmVyOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBjbHViOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucGFydGljaXBhbnQubnVtYmVyIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5wYXJ0aWNpcGFudC5uYW1lIH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5wYXJ0aWNpcGFudC5jbHViLm5hbWUgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Sb3cuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfSnVkZ2luZ19Ub3VyUGFuZWxfSGVhdHNUYWJfUm93XCI7XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xyXG5cclxuaW1wb3J0IFBhcGVyIGZyb20gXCJBZG1pblBhbmVsL2NvbW1vbi9QYXBlclwiO1xyXG5cclxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzVGFiIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGF1dG9Eb2N4OiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBvbkRvbmU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR1cFN0b3JhZ2UoKTtcclxuICAgICAgICB0aGlzLnJlbG9hZF9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEpO1xyXG4gICAgICAgIHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuaWQgIT09IG5leHRfcHJvcHMudG91ci5pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVTdG9yYWdlKHRoaXMucHJvcHMudG91ci5pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBTdG9yYWdlKG5leHRfcHJvcHMudG91ci5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZfcHJvcHMsIHBzKSB7XHJcbiAgICAgICAgaWYgKHByZXZfcHJvcHMudG91ci5pZCAhPT0gdGhpcy5wcm9wcy50b3VyLmlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3ggJiYgIXRoaXMuX2RvY3hfZG9uZSAmJiB0aGlzLnN0YXRlLnRvdXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZG9jeF9kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4Lm9uRG9uZSh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5mcmVlU3RvcmFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTQ0hFTUEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZToge1xyXG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBydW5zOiB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBTdG9yYWdlKHRvdXJfaWQ9bnVsbCkge1xyXG4gICAgICAgIGlmICh0b3VyX2lkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRvdXJfaWQgPSB0aGlzLnByb3BzLnRvdXIuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKGBoZWF0c18ke3RvdXJfaWR9YCk7XHJcbiAgICB9XHJcbiAgICBmcmVlU3RvcmFnZSh0b3VyX2lkPW51bGwpIHtcclxuICAgICAgICBpZiAodG91cl9pZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0b3VyX2lkID0gdGhpcy5wcm9wcy50b3VyLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yYWdlLmRlbERvbWFpbihgaGVhdHNfJHt0b3VyX2lkfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbG9hZEZyb21TdG9yYWdlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKVxyXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy50b3VyLmlkKVxyXG4gICAgICAgICAgICAuc2VyaWFsaXplKHRoaXMuU0NIRU1BKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIEFwaShcInRvdXIuZ2V0XCIsIHtcclxuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyLmlkLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5TQ0hFTUEsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMucHJvcHMudG91ci5pZCwgdGhpcy5zdG9yYWdlKVxyXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlUHJpbnRhYmxlUmVmID0gKHJlZikgPT4gdGhpcy5fcHJpbnRhYmxlID0gcmVmO1xyXG5cclxuICAgIGhhbmRsZVNpZ25hbCA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlKSB7XHJcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBtZXNzYWdlOlwiLCBtZXNzYWdlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJIZWF0SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xyXG4gICAgICAgIGNvbnN0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LmhlYXQgIT09IG5leHRfcm93LmhlYXQpXHJcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRyIGtleT17IFwiSFwiICsgbmV4dF9yb3cuaGVhdCB9PlxyXG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImhlYXQtbnVtYmVyXCIgY29sU3Bhbj1cIjNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLnBocmFzZXMuaGVhdF9uXCIsIG5leHRfcm93LmhlYXQpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3dzKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBsZXQgcnVucyA9IHRoaXMuc3RhdGUudG91ci5ydW5zO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVucy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLnJlbmRlckhlYXRIZWFkZXIocnVuc1tpIC0gMV0sIHJ1bnNbaV0pO1xyXG4gICAgICAgICAgICBpZiAoaGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChoZWFkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxyXG4gICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaV0uaWQgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50PXsgcnVuc1tpXS5wYXJ0aWNpcGFudCB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TG9hZGVyIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxQYXBlclxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICAgICAgcmVmPXsgdGhpcy5tYWtlUHJpbnRhYmxlUmVmIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMT17IF8oXCJhZG1pbi5oZWFkZXJzLnRvdXJfaGVhdHNcIikgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XHJcbiAgICAgICAgICAgICAgICB0aXRsZTM9eyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG91ci1oZWF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImp1ZGdpbmcubGFiZWxzLm51bWJlclwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJqdWRnaW5nLmxhYmVscy5wYXJ0aWNpcGFudF9uYW1lXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImp1ZGdpbmcubGFiZWxzLmNsdWJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9QYXBlcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJ0b3VyLWhlYXRzLmRvY3hcIikge1xyXG4gICAgICAgIERvY3goZmlsZW5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9oZWF0c1wiKSlcclxuICAgICAgICAgICAgLnNldFRpdGxlMih0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUzKHRoaXMuc3RhdGUudG91ci5uYW1lKVxyXG4gICAgICAgICAgICAuc2V0Qm9keSh0aGlzLl9wcmludGFibGUuZ2V0UHJpbnRhYmxlSFRNTCgpKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuaGVhdC1udW1iZXJcIiwgXCJiYWNrZ3JvdW5kXCIsIFwiI2NjY1wiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuaGVhdC1udW1iZXJcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCJ0ZCwgdGhcIiwgXCJmb250LXNpemVcIiwgXCIxMnB0XCIpXHJcbiAgICAgICAgICAgIC5zYXZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkhlYXRzVGFiLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX0p1ZGdpbmdfVG91clBhbmVsX0hlYXRzVGFiXCI7XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xyXG5cclxuaW1wb3J0IHJ1bGVzX3NldCBmcm9tIFwicnVsZXNfc2V0cy9sb2FkZXJcIjtcclxuXHJcbmltcG9ydCBQYXBlciBmcm9tIFwiQWRtaW5QYW5lbC9jb21tb24vUGFwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdyYXBwZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYXV0b0RvY3g6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG9uRG9uZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoUFQub2JqZWN0LmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHRvdXI6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB2ZXJib3NpdHk6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3gub25Eb25lKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VQcmludGFibGVSZWYgPSAocmVmKSA9PiB0aGlzLl9wcmludGFibGUgPSByZWY7XHJcblxyXG4gICAgaGFuZGxlU2lnbmFsID0gKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcclxuICAgICAgICBjYXNlIFwiZG9jeFwiOlxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFJlbmRlcmluZ0NvbXBvbmVudCgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudmVyYm9zaXR5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIHJ1bGVzX3NldC50b3VyX3Jlc3VsdHNfdGFibGVfMTtcclxuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gcnVsZXNfc2V0LnRvdXJfcmVzdWx0c190YWJsZV8yO1xyXG4gICAgICAgICAgICBjYXNlIDM6IHJldHVybiBydWxlc19zZXQudG91cl9yZXN1bHRzX3RhYmxlXzM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyQm9keSgpIHtcclxuICAgICAgICBjb25zdCBSZW5kZXJpbmdDb21wb25lbnQgPSB0aGlzLmdldFJlbmRlcmluZ0NvbXBvbmVudCgpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxSZW5kZXJpbmdDb21wb25lbnQgeyAuLi50aGlzLnByb3BzIH0gLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxQYXBlclxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICAgICAgcmVmPXsgdGhpcy5tYWtlUHJpbnRhYmxlUmVmIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMT17IF8oXCJhZG1pbi5oZWFkZXJzLnRvdXJfcmVzdWx0c1wiKSB9XHJcbiAgICAgICAgICAgICAgICB0aXRsZTI9eyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMz17IHRoaXMucHJvcHMudG91ci5uYW1lIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XHJcbiAgICAgICAgICAgIDwvUGFwZXI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwidG91ci1yZXN1bHRzLmRvY3hcIikge1xyXG4gICAgICAgIERvY3goZmlsZW5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRNYXJnaW5zKFsxMCwgMTAsIDE1LCAxMF0pXHJcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUyKHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5wcm9wcy50b3VyLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRCb2R5KHRoaXMuX3ByaW50YWJsZS5nZXRQcmludGFibGVIVE1MKCkpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZVwiLCBcImZvbnQtc2l6ZVwiLCB0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gMSA/IFwiMTJwdFwiIDogXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcInBhZGRpbmdcIiwgXCIwIDNwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJib3JkZXJcIiwgXCIwLjVwdCBzb2xpZCBibGFja1wiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInBhZGRpbmdcIiwgXCIwIDFwdCAwIDBcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAwIDAgMXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0ZFwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duXCIsIFwid2lkdGhcIiwgXCI1MHB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmhlYWRfanVkZ2VcIiwgXCJ3aWR0aFwiLCBcIjUlXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5kYW5jZV9qdWRnZVwiLCBcIndpZHRoXCIsIFwiOCVcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmFjcm9fanVkZ2VcIiwgXCJ3aWR0aFwiLCBcIjglXCIpXHJcbiAgICAgICAgICAgIC5zYXZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbldyYXBwZXIuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfSnVkZ2luZ19Ub3VyUGFuZWxfVG91clJlc3VsdHNUYWJfV3JhcHBlclwiO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSBcInVpL3ByaW50YWJsZVwiO1xyXG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XHJcblxyXG5pbXBvcnQgVG91clJlc3VsdHMgZnJvbSBcImNvbW1vbi9Ub3VyUmVzdWx0c1wiO1xyXG5cclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91clJlc3VsdHNUYWIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYXV0b0RvY3g6IFBULm9iamVjdCxcclxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB2ZXJib3NpdHk6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVJlc3VsdHNSZWYgPSAocmVmKSA9PiB0aGlzLl9yZXN1bHRzID0gcmVmO1xyXG5cclxuICAgIGhhbmRsZVNpZ25hbCA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fcmVzdWx0cy5oYW5kbGVTaWduYWwobWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVuZGVyaW5nXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUb3VyUmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9eyB0aGlzLnByb3BzLmF1dG9Eb2N4IH1cclxuICAgICAgICAgICAgICAgIHJlZj17IHRoaXMubWFrZVJlc3VsdHNSZWYgfVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI9eyBXcmFwcGVyIH1cclxuICAgICAgICAgICAgICAgIHRvdXJJZD17IHRoaXMucHJvcHMudG91ci5pZCB9XHJcbiAgICAgICAgICAgICAgICB2ZXJib3NpdHk9eyB0aGlzLnByb3BzLnZlcmJvc2l0eSB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblRvdXJSZXN1bHRzVGFiLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX0p1ZGdpbmdfVG91clBhbmVsX1RvdXJSZXN1bHRzVGFiXCI7XHJcbiIsImltcG9ydCBIZWF0c1RhYiBmcm9tIFwiQWRtaW5QYW5lbC9KdWRnaW5nL1RvdXJQYW5lbC9IZWF0c1RhYlwiO1xyXG5pbXBvcnQgVG91clJlc3VsdHNUYWIgZnJvbSBcIkFkbWluUGFuZWwvSnVkZ2luZy9Ub3VyUGFuZWwvVG91clJlc3VsdHNUYWJcIjtcclxuaW1wb3J0IERpc2NpcGxpbmVSZXN1bHRzVGFiIGZyb20gXCJBZG1pblBhbmVsL0p1ZGdpbmcvVG91clBhbmVsL0Rpc2NpcGxpbmVSZXN1bHRzVGFiXCI7XHJcbmltcG9ydCBUZXN0UGFnZSBmcm9tIFwiLi9UZXN0UGFnZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aXZlSm9iIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHF1ZXVlSXRlbTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB0b3VyOiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25Eb25lOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVGaWxlbmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gXCJhdXRvcHJpbnRlcl9cIiArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vLCBcIlwiKS5zbGljZSgxKSArIFwiLnRtcFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucXVldWVJdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkb2N4X3BhcmFtcyA9IHsgZmlsZW5hbWU6IHRoaXMuY3JlYXRlRmlsZW5hbWUoKSwgb25Eb25lOiB0aGlzLnByb3BzLm9uRG9uZSB9O1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5xdWV1ZUl0ZW0udHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJoZWF0c1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEhlYXRzVGFiXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0RvY3g9eyBkb2N4X3BhcmFtcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMucXVldWVJdGVtLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBjYXNlIFwicmVzdWx0c18xXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8VG91clJlc3VsdHNUYWJcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRG9jeD17IGRvY3hfcGFyYW1zIH1cclxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy5xdWV1ZUl0ZW0udG91ciB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmVyYm9zaXR5PXsgMSB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXzJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxUb3VyUmVzdWx0c1RhYlxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXsgZG9jeF9wYXJhbXMgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnF1ZXVlSXRlbS50b3VyIH1cclxuICAgICAgICAgICAgICAgICAgICB2ZXJib3NpdHk9eyAyIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgY2FzZSBcInJlc3VsdHNfM1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFRvdXJSZXN1bHRzVGFiXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0RvY3g9eyBkb2N4X3BhcmFtcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMucXVldWVJdGVtLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2l0eT17IDMgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBjYXNlIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8RGlzY2lwbGluZVJlc3VsdHNUYWJcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRG9jeD17IGRvY3hfcGFyYW1zIH1cclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lPXsgdGhpcy5wcm9wcy5xdWV1ZUl0ZW0udG91ci5kaXNjaXBsaW5lIH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgY2FzZSBcInRlc3RcIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxUZXN0UGFnZVxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXsgZG9jeF9wYXJhbXMgfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBqb2IgdHlwZTpcIiwgdGhpcy5wcm9wcy5xdWV1ZUl0ZW0udHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5BY3RpdmVKb2IuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfU2VydmljZV9BdXRvUHJpbnRlcl9Kb2JRdWV1ZV9BY3RpdmVKb2JcIjtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhdXRvRG9jeDogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgZmlsZW5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgb25Eb25lOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4Lm9uRG9uZSh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlQ29udGVudFJlZiA9IChyZWYpID0+IHRoaXMuX2NvbnRlbnQgPSByZWY7XHJcblxyXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17IHRoaXMubWFrZUNvbnRlbnRSZWYgfT5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci50ZXN0X3RleHRcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJ0ZXN0LXBhZ2UuZG9jeFwiKSB7XHJcbiAgICAgICAgRG9jeChmaWxlbmFtZSlcclxuICAgICAgICAgICAgLnNldEJvZHkodGhpcy5fY29udGVudC5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgIC5zYXZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblRlc3RQYWdlLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX1NlcnZpY2VfQXV0b1ByaW50ZXJfSm9iUXVldWVfVGVzdFBhZ2VcIjtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuaW1wb3J0IEFjdGl2ZUpvYiBmcm9tIFwiLi9BY3RpdmVKb2JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYlF1ZXVlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHF1ZXVlOiBbXSxcclxuICAgICAgICAgICAgbm93UmVuZGVyaW5nOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZUpvYigpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEpvYiA9IChqb2JfdHlwZSwgdG91ciwgY29waWVzKSA9PiB7XHJcbiAgICAgICAgbGV0IG5ld19xdWV1ZSA9IHRoaXMuc3RhdGUucXVldWUuc2xpY2UoKTsgLy8gY2xvbmVcclxuICAgICAgICBuZXdfcXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgIHR5cGU6IGpvYl90eXBlLFxyXG4gICAgICAgICAgICB0b3VyOiB0b3VyLFxyXG4gICAgICAgICAgICBjb3BpZXM6IGNvcGllcyxcclxuICAgICAgICAgICAgaWQ6IE1hdGgucmFuZG9tKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHF1ZXVlOiBuZXdfcXVldWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzY2hlZHVsZUpvYiA9ICgpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMucHJvY2Vzc0pvYiwgMTAwMCk7XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzSm9iID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLm5vd1JlbmRlcmluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBqb2IgPSB0aGlzLnN0YXRlLnF1ZXVlWzBdO1xyXG4gICAgICAgIGlmICgham9iKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVKb2IoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLnJldHJ5Sm9iLCAxMDAwMCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHF1ZXVlOiB0aGlzLnN0YXRlLnF1ZXVlLnNsaWNlKDEpLFxyXG4gICAgICAgICAgICBub3dSZW5kZXJpbmc6IGpvYixcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHJ5Sm9iID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBxdWV1ZTogW3RoaXMuc3RhdGUubm93UmVuZGVyaW5nXS5jb25jYXQodGhpcy5zdGF0ZS5xdWV1ZSksXHJcbiAgICAgICAgICAgIG5vd1JlbmRlcmluZzogbnVsbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVEb2N4Q3JlYXRlZCA9IChmaWxlbmFtZSkgPT4ge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGpvYiA9IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nO1xyXG4gICAgICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIGxldCBhZGRyZXNzID0gYGh0dHA6Ly8xMjcuMC4wLjE6NTk0OS9wcmludC1kb2N4P2ZpbGVuYW1lPSR7IGZpbGVuYW1lIH0mY29waWVzPSR7IGpvYi5jb3BpZXMgfWA7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIGFkZHJlc3MsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIub25sb2FkID0gKCkgPT4ge307XHJcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4gdGhpcy5hZGRKb2Ioam9iLnR5cGUsIGpvYi50b3VyLCBqb2IuY29waWVzKTtcclxuICAgICAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBub3dSZW5kZXJpbmc6IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJBY3RpdmVKb2IoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLm5vd1JlbmRlcmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEFjdGl2ZUpvYlxyXG4gICAgICAgICAgICAgICAga2V5PVwiYWN0aXZlLWpvYlwiXHJcbiAgICAgICAgICAgICAgICBxdWV1ZUl0ZW09eyB0aGlzLnN0YXRlLm5vd1JlbmRlcmluZyB9XHJcbiAgICAgICAgICAgICAgICBvbkRvbmU9eyB0aGlzLmhhbmRsZURvY3hDcmVhdGVkIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnF1ZXVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZSBxdWV1ZS1lbXB0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5xdWV1ZV9lbXB0eVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBY3RpdmVKb2IoKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZVwiPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnF1ZXVlLm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGtleT17IGl0ZW0uaWQgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGl0ZW0udHlwZSA9PT0gXCJ0ZXN0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIudGVzdF9wYWdlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHtpdGVtLnRvdXIuZGlzY2lwbGluZS5uYW1lfSDigJQgJHtpdGVtLnRvdXIubmFtZX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInR5cGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhgYWRtaW4uYXV0b19wcmludGVyLiR7aXRlbS50eXBlfWApIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29waWVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGl0ZW0uY29waWVzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBY3RpdmVKb2IoKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuSm9iUXVldWUuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfU2VydmljZV9BdXRvUHJpbnRlcl9Kb2JRdWV1ZVwiO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGFjdGl2ZUNlbGw6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB0b2tlbjogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICB0b3VyX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdmFsdWU6IFBULm9uZU9mVHlwZShbUFQubnVtYmVyLmlzUmVxdWlyZWQsIFBULnN0cmluZy5pc1JlcXVpcmVkXSksXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uTW92ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZfcHJvcHMpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYWN0aXZlQ2VsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcmV2X3Byb3BzLmFjdGl2ZUNlbGwgJiYgcHJldl9wcm9wcy5hY3RpdmVDZWxsLnRva2VuID09PSB0aGlzLnByb3BzLmFjdGl2ZUNlbGwudG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWN0aXZlQ2VsbC50b3VyX2lkID09PSB0aGlzLnByb3BzLnRvdXIuaWQgJiZcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5hY3RpdmVDZWxsLmFjdGlvbiA9PT0gdGhpcy5wcm9wcy5hY3Rpb25cclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5faW5wdXQuc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ha2VJbnB1dFJlZiA9IChyZWYpID0+IHRoaXMuX2lucHV0ID0gcmVmO1xyXG5cclxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlKSB8fCAwO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5hY3Rpb24sIHZhbHVlKVxyXG4gICAgfVxyXG4gICAgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHtcclxuICAgICAgICAgICAgXCIzN1wiOiBcImxlZnRcIixcclxuICAgICAgICAgICAgXCIzOFwiOiBcInVwXCIsXHJcbiAgICAgICAgICAgIFwiMzlcIjogXCJyaWdodFwiLFxyXG4gICAgICAgICAgICBcIjQwXCI6IFwiZG93blwiLFxyXG4gICAgICAgIH1bY29kZS50b1N0cmluZygpXTtcclxuICAgICAgICBpZiAoIWRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbk1vdmUodGhpcy5wcm9wcy50b3VyLmlkLCB0aGlzLnByb3BzLmFjdGlvbiwgZGlyZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9eyB0aGlzLnByb3BzLnZhbHVlIH1cclxuICAgICAgICAgICAgICAgICAgICByZWY9eyB0aGlzLm1ha2VJbnB1dFJlZiB9XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17IHRoaXMuaGFuZGxlS2V5RG93biB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkNlbGwuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfU2VydmljZV9BdXRvUHJpbnRlcl9UYWJsZV9DZWxsXCI7XHJcbiIsImltcG9ydCBDZWxsIGZyb20gXCIuL0NlbGxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhY3RpdmVDZWxsOiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgdG9rZW46IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgdG91cl9pZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBwb3NzaWJsZUFjdGlvbnM6IFBULmFycmF5T2YoUFQuc3RyaW5nLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJvdzogUFQub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25Nb3ZlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UgPSAoYWN0aW9uLCBuZXdfdmFsdWUpID0+IHtcclxuICAgICAgICBsZXQgbmV3X3JvdyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMucm93KTtcclxuICAgICAgICBuZXdfcm93W2FjdGlvbl0gPSBuZXdfdmFsdWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLnRvdXIuaWQsIG5ld19yb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZGlzY2lwbGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgYCR7dGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUubmFtZX0g4oCUICR7dGhpcy5wcm9wcy50b3VyLm5hbWV9YCB9XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBvc3NpYmxlQWN0aW9ucy5tYXAoYWN0aW9uID0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENlbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uPXsgYWN0aW9uIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ2VsbD17IHRoaXMucHJvcHMuYWN0aXZlQ2VsbCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IGFjdGlvbiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMucm93W2FjdGlvbl0gfHwgXCJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdmU9eyB0aGlzLnByb3BzLm9uTW92ZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJvdy5kaXNwbGF5TmFtZSA9IFwiQWRtaW5QYW5lbF9TZXJ2aWNlX0F1dG9QcmludGVyX1RhYmxlX1Jvd1wiO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcblxyXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWN0aW9uczogUFQub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHBvc3NpYmxlQWN0aW9uczogUFQuYXJyYXlPZihQVC5zdHJpbmcuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgdG91cnM6IFBULmFycmF5T2YoXHJcbiAgICAgICAgICAgICAgICBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICApLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBhY3RpdmVDZWxsOiBudWxsLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UgPSAodG91cl9pZCwgbmV3X3ZhbHVlKSA9PiB7XHJcbiAgICAgICAgbGV0IG5ld19hY3Rpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5hY3Rpb25zKTtcclxuICAgICAgICBuZXdfYWN0aW9uc1t0b3VyX2lkXSA9IG5ld192YWx1ZTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld19hY3Rpb25zKTtcclxuICAgIH1cclxuICAgIGhhbmRsZU1vdmUgPSAodG91cl9pZCwgYWN0aW9uLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCBERUxUQVMgPSB7XHJcbiAgICAgICAgICAgIHVwOiAgICBbLTEsICAwXSxcclxuICAgICAgICAgICAgZG93bjogIFsgMSwgIDBdLFxyXG4gICAgICAgICAgICBsZWZ0OiAgWyAwLCAtMV0sXHJcbiAgICAgICAgICAgIHJpZ2h0OiBbIDAsICAxXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IFt0b3VyX2RlbHRhLCBhY3Rpb25fZGVsdGFdID0gREVMVEFTW2RpcmVjdGlvbl07XHJcbiAgICAgICAgY29uc3QgbmV4dF90b3VyX2lkeCA9IHRoaXMucHJvcHMudG91cnMuZmluZEluZGV4KHRvdXIgPT4gdG91ci5pZCA9PT0gdG91cl9pZCkgKyB0b3VyX2RlbHRhO1xyXG4gICAgICAgIGNvbnN0IG5leHRfdG91ciA9IHRoaXMucHJvcHMudG91cnNbbmV4dF90b3VyX2lkeF07XHJcbiAgICAgICAgY29uc3QgbmV4dF9hY3Rpb25faWR4ID0gdGhpcy5wcm9wcy5wb3NzaWJsZUFjdGlvbnMuaW5kZXhPZihhY3Rpb24pICsgYWN0aW9uX2RlbHRhO1xyXG4gICAgICAgIGNvbnN0IG5leHRfYWN0aW9uID0gdGhpcy5wcm9wcy5wb3NzaWJsZUFjdGlvbnNbbmV4dF9hY3Rpb25faWR4XTtcclxuICAgICAgICBpZiAoIW5leHRfYWN0aW9uIHx8ICFuZXh0X3RvdXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYWN0aXZlQ2VsbDoge1xyXG4gICAgICAgICAgICAgICAgdG91cl9pZDogbmV4dF90b3VyLmlkLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXh0X2FjdGlvbixcclxuICAgICAgICAgICAgICAgIHRva2VuOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0b3Vycy10YWJsZVwiPjx0Ym9keT5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiZGlzY2lwbGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIuZGlzY2lwbGluZVwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5oZWF0c1wiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5yZXN1bHRzXzFcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucmVzdWx0c18yXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnJlc3VsdHNfM1wiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5kaXNjaXBsaW5lX3Jlc3VsdHNcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXJzLm1hcCgodG91cikgPT5cclxuICAgICAgICAgICAgICAgICAgICA8Um93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNlbGw9eyB0aGlzLnN0YXRlLmFjdGl2ZUNlbGwgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyB0b3VyLmlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVBY3Rpb25zPXsgdGhpcy5wcm9wcy5wb3NzaWJsZUFjdGlvbnMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3c9eyB0aGlzLnByb3BzLmFjdGlvbnNbdG91ci5pZF0gfHwge30gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdG91ciB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdmU9eyB0aGlzLmhhbmRsZU1vdmUgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblRhYmxlLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX1NlcnZpY2VfQXV0b1ByaW50ZXJfVGFibGVcIjtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IHNob3dDb25maXJtIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbmltcG9ydCBKb2JRdWV1ZSBmcm9tIFwiLi9Kb2JRdWV1ZVwiO1xyXG5pbXBvcnQgVGFibGUgZnJvbSBcIi4vVGFibGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9QcmludGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uSWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3Qgb2xkX2FjdGlvbnNfc3RyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgYXV0b19wcmludGVyXyR7dGhpcy5wcm9wcy5jb21wZXRpdGlvbklkfWApO1xyXG4gICAgICAgIGNvbnN0IGluaXRpYWxfYWN0aW9ucyA9IG9sZF9hY3Rpb25zX3N0ciA/IEpTT04ucGFyc2Uob2xkX2FjdGlvbnNfc3RyKSA6IHt9O1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICBhY3Rpb25zOiBpbml0aWFsX2FjdGlvbnMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLlNDSEVNQSA9IHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZXM6IHtcclxuICAgICAgICAgICAgICAgIHRvdXJzOiB7fSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuUE9TU0lCTEVfQUNUSU9OUyA9IFtcImhlYXRzXCIsIFwicmVzdWx0c18xXCIsIFwicmVzdWx0c18yXCIsIFwicmVzdWx0c18zXCIsIFwiZGlzY2lwbGluZV9yZXN1bHRzXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSk7XHJcbiAgICAgICAgdGhpcy5yZWxvYWRfZGF0YV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oYGF1dG9fcHJpbnRlcl8ke3RoaXMucHJvcHMuY29tcGV0aXRpb25JZH1gLCBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmFjdGlvbnMpKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2RhdGFfbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIEFwaShcImNvbXBldGl0aW9uLmdldFwiLCB7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uX2lkOiB0aGlzLnByb3BzLmNvbXBldGl0aW9uSWQsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiB0aGlzLlNDSEVNQSxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkVG9EQihcIkNvbXBldGl0aW9uXCIsIHRoaXMucHJvcHMuY29tcGV0aXRpb25JZClcclxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWRGcm9tU3RvcmFnZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdfY29tcGV0aXRpb25fcmVmID0gc3RvcmFnZS5nZXQoXCJDb21wZXRpdGlvblwiKS5ieV9pZCh0aGlzLnByb3BzLmNvbXBldGl0aW9uSWQpO1xyXG4gICAgICAgIGlmICghbmV3X2NvbXBldGl0aW9uX3JlZikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5ld19jb21wZXRpdGlvbiA9IG5ld19jb21wZXRpdGlvbl9yZWYuc2VyaWFsaXplKHRoaXMuU0NIRU1BKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21wZXRpdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoQ29tcGV0aXRpb25VcGRhdGUodGhpcy5zdGF0ZS5jb21wZXRpdGlvbiwgbmV3X2NvbXBldGl0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBuZXdfY29tcGV0aXRpb24sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVF1ZXVlUmVmID0gKHJlZikgPT4gdGhpcy5fcXVldWUgPSByZWY7XHJcblxyXG4gICAgaGFuZGxlQWN0aW9uc0NoYW5nZSA9IChhY3Rpb25zKSA9PiB0aGlzLnNldFN0YXRlKHsgYWN0aW9ucyB9KTtcclxuXHJcbiAgICBoYW5kbGVQcmludFRlc3RQYWdlID0gKCkgPT4ge1xyXG4gICAgICAgIHNob3dDb25maXJtKFxyXG4gICAgICAgICAgICBfKFwiYWRtaW4uYXV0b19wcmludGVyLnByaW50X3Rlc3RfcGFnZVwiKSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2F2ZUFzKG5ldyBCbG9iKFtcImR1bW15XCJdLCB7dHlwZSA6ICd0ZXh0L3BsYWluJ30pLCBgYXV0b3ByaW50ZXJfZHVtbXlfJHtNYXRoLnJhbmRvbSgpfS50bXBgKTtcclxuICAgICAgICAgICAgICAgIHNhdmVBcyhuZXcgQmxvYihbXCJkdW1teVwiXSwge3R5cGUgOiAndGV4dC9wbGFpbid9KSwgYGF1dG9wcmludGVyX2R1bW15XyR7TWF0aC5yYW5kb20oKX0udG1wYCk7XHJcbiAgICAgICAgICAgICAgICBzYXZlQXMobmV3IEJsb2IoW1wiZHVtbXlcIl0sIHt0eXBlIDogJ3RleHQvcGxhaW4nfSksIGBhdXRvcHJpbnRlcl9kdW1teV8ke01hdGgucmFuZG9tKCl9LnRtcGApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcXVldWUuYWRkSm9iKFwidGVzdFwiLCBudWxsLCAxKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG91cnNGcm9tQ29tcGV0aXRpb24oY29tcGV0aXRpb24pIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBkaXNjaXBsaW5lIG9mIGNvbXBldGl0aW9uLmRpc2NpcGxpbmVzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdG91ciBvZiBkaXNjaXBsaW5lLnRvdXJzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgciA9IE9iamVjdC5hc3NpZ24oe30sIHRvdXIpO1xyXG4gICAgICAgICAgICAgICAgci5kaXNjaXBsaW5lID0gZGlzY2lwbGluZTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBnZXRUb3Vyc01hcChjb21wZXRpdGlvbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWFwKHRoaXMuZ2V0VG91cnNGcm9tQ29tcGV0aXRpb24oY29tcGV0aXRpb24pLm1hcCh0b3VyID0+IFt0b3VyLmlkLCB0b3VyXSkpO1xyXG4gICAgfVxyXG4gICAgZGlzcGF0Y2hDb21wZXRpdGlvblVwZGF0ZShvbGRfY29tcGV0aXRpb24sIG5ld19jb21wZXRpdGlvbikge1xyXG4gICAgICAgIGxldCBvbGRfdG91cnMgPSB0aGlzLmdldFRvdXJzTWFwKG9sZF9jb21wZXRpdGlvbik7XHJcbiAgICAgICAgbGV0IG5ld190b3VycyA9IHRoaXMuZ2V0VG91cnNNYXAobmV3X2NvbXBldGl0aW9uKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHRvdXJfaWQgb2Ygb2xkX3RvdXJzLmtleXMoKSkge1xyXG4gICAgICAgICAgICBpZiAoIW5ld190b3Vycy5oYXModG91cl9pZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW9sZF90b3Vycy5nZXQodG91cl9pZCkuZmluYWxpemVkICYmIG5ld190b3Vycy5nZXQodG91cl9pZCkuZmluYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvQWN0aW9uc0ZvclRvdXIobmV3X3RvdXJzLmdldCh0b3VyX2lkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXROZXh0VG91cih0b3VyKSB7XHJcbiAgICAgICAgY29uc3QgdG91cnMgPSB0aGlzLmdldFRvdXJzRnJvbUNvbXBldGl0aW9uKHRoaXMuc3RhdGUuY29tcGV0aXRpb24pO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRfaWR4ID0gdG91cnMuZmluZEluZGV4KHQgPT4gdC5pZCA9PT0gdG91ci5pZCk7XHJcbiAgICAgICAgY29uc3QgbmV4dF9pZHggPSBjdXJyZW50X2lkeCArIDE7XHJcbiAgICAgICAgaWYgKHRvdXJzW2N1cnJlbnRfaWR4XS5kaXNjaXBsaW5lLmlkICE9PSB0b3Vyc1tuZXh0X2lkeF0uZGlzY2lwbGluZS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvdXJzW25leHRfaWR4XTtcclxuICAgIH1cclxuXHJcbiAgICBkb1RoZUpvYih0b3VyLCBhY3Rpb25fdHlwZSwgY29waWVzKSB7XHJcbiAgICAgICAgaWYgKCF0b3VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcXVldWUuYWRkSm9iKGFjdGlvbl90eXBlLCB0b3VyLCBjb3BpZXMpO1xyXG4gICAgfVxyXG4gICAgZG9BY3Rpb25zRm9yVG91cih0b3VyKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aW9ucyA9IHRoaXMuc3RhdGUuYWN0aW9uc1t0b3VyLmlkXTtcclxuICAgICAgICBjb25zdCBuZXh0X3RvdXIgPSB0aGlzLmdldE5leHRUb3VyKHRvdXIpO1xyXG4gICAgICAgIGNvbnN0IG5leHRfdG91cl9hY3Rpb25zID0gdGhpcy5zdGF0ZS5hY3Rpb25zW25leHRfdG91ci5pZF07XHJcbiAgICAgICAgZm9yIChjb25zdCBhY3Rpb25fdHlwZSBvZiB0aGlzLlBPU1NJQkxFX0FDVElPTlMpIHtcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9uX3RvdXIgPSBhY3Rpb25fdHlwZSA9PT0gXCJoZWF0c1wiID8gbmV4dF90b3VyIDogdG91cjtcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9uc19yb3cgPSBhY3Rpb25fdHlwZSA9PT0gXCJoZWF0c1wiID8gbmV4dF90b3VyX2FjdGlvbnMgOiBhY3Rpb25zO1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9uc19yb3cgJiYgYWN0aW9uc19yb3dbYWN0aW9uX3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvVGhlSm9iKGFjdGlvbl90b3VyLCBhY3Rpb25fdHlwZSwgYWN0aW9uc19yb3dbYWN0aW9uX3R5cGVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmNvbXBldGl0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TG9hZGVyIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXV0by1wcmludGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uaGVhZGVycy5hdXRvX3ByaW50ZXJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDE+XHJcbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uLXRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5ydWxlc1wiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucz17IHRoaXMuc3RhdGUuYWN0aW9ucyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZUFjdGlvbnM9eyB0aGlzLlBPU1NJQkxFX0FDVElPTlMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91cnM9eyB0aGlzLmdldFRvdXJzRnJvbUNvbXBldGl0aW9uKHRoaXMuc3RhdGUuY29tcGV0aXRpb24pIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVBY3Rpb25zQ2hhbmdlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb24tcXVldWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnF1ZXVlXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEpvYlF1ZXVlIHJlZj17IHRoaXMubWFrZVF1ZXVlUmVmIH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXN0LXBhZ2UtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVQcmludFRlc3RQYWdlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQn9C10YfQsNGC0Ywg0YLQtdGB0YLQvtCy0L7QuSDRgdGC0YDQsNC90LjRhtGLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuQXV0b1ByaW50ZXIuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfU2VydmljZV9BdXRvUHJpbnRlclwiO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXBlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hpbGRyZW46IFBULm5vZGUuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGhlYWRlcjogUFQuc3RyaW5nLFxuICAgICAgICAgICAgdGl0bGUxOiBQVC5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTI6IFBULnN0cmluZyxcbiAgICAgICAgICAgIHRpdGxlMzogUFQuc3RyaW5nLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlYWRlcjogbnVsbCxcbiAgICAgICAgICAgIHRpdGxlMTogbnVsbCxcbiAgICAgICAgICAgIHRpdGxlMjogbnVsbCxcbiAgICAgICAgICAgIHRpdGxlMzogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBtYWtlQm9keVJlZiA9IChyZWYpID0+IHRoaXMuX2JvZHkgPSByZWY7XG5cbiAgICBnZXRQcmludGFibGVIVE1MKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGVhZGVyID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLWhlYWRlclwiPnsgdGhpcy5wcm9wcy5oZWFkZXIgfTwvZGl2PlxuICAgICAgICApIDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUxKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTEgPyAoXG4gICAgICAgICAgICA8aDE+eyB0aGlzLnByb3BzLnRpdGxlMSB9PC9oMT5cbiAgICAgICAgKSA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUyID8gKFxuICAgICAgICAgICAgPGgyPnsgdGhpcy5wcm9wcy50aXRsZTIgfTwvaDI+XG4gICAgICAgICkgOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMyA/IChcbiAgICAgICAgICAgIDxoMz57IHRoaXMucHJvcHMudGl0bGUzIH08L2gzPlxuICAgICAgICApIDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIHJlZj17IHRoaXMubWFrZUJvZHlSZWYgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaW50YWJsZVwiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUyKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTMoKSB9XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblBhcGVyLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX2NvbXBvbmVudHNfUGFwZXJcIjtcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVJZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICByZW5kZXJlcjogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IG51bGwsXG4gICAgICAgICAgICByZXN1bHRzOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCAoKSA9PiB7IHRoaXMubG9hZERhdGE7IHRoaXMubG9hZFJlc3VsdHMoKTsgfSk7XG4gICAgICAgIHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpO1xuICAgICAgICB0aGlzLnJlc3VsdHNfY2hhbmdlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFxuICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNfY2hhbmdlZCByZWxvYWRfZGF0YVwiLFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUb3VyUmVzdWx0c0NoYW5nZWRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQgIT09IG5leHRfcHJvcHMuZGlzY2lwbGluZUlkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlc3VsdHM6IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZnJlZVN0b3JhZ2UodGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cFN0b3JhZ2UobmV4dF9wcm9wcy5kaXNjaXBsaW5lSWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2X3Byb3BzKSB7XG4gICAgICAgIGlmIChwcmV2X3Byb3BzLmRpc2NpcGxpbmVJZCAhPT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmZyZWVTdG9yYWdlKCk7XG4gICAgfVxuXG4gICAgZ2V0IFNDSEVNQSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcbiAgICAgICAgICAgIHRvdXJzOiB7XG4gICAgICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2x1Yjoge30sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHNldHVwU3RvcmFnZShkaXNjaXBsaW5lX2lkPW51bGwpIHtcbiAgICAgICAgaWYgKGRpc2NpcGxpbmVfaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQgPSB0aGlzLnByb3BzLmRpc2NpcGxpbmVJZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlLmdldERvbWFpbihgZGlzY2lwbGluZV9yZXN1bHRzXyR7ZGlzY2lwbGluZV9pZH1gKTtcbiAgICB9XG4gICAgZnJlZVN0b3JhZ2UoZGlzY2lwbGluZV9pZD1udWxsKSB7XG4gICAgICAgIGlmIChkaXNjaXBsaW5lX2lkID09PSBudWxsKSB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkID0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQ7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oYGRpc2NpcGxpbmVfcmVzdWx0c18ke2Rpc2NpcGxpbmVfaWR9YCk7XG4gICAgfVxuXG4gICAgbWFrZVJlbmRlcmVyUmVmID0gKHJlZikgPT4gdGhpcy5fcmVuZGVyZXIgPSByZWY7XG5cbiAgICBoYW5kbGVUb3VyUmVzdWx0c0NoYW5nZWQgPSAobWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG91cl9zdG9yYWdlID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIikuYnlfaWQobWVzc2FnZVtcInRvdXJfaWRcIl0pO1xuICAgICAgICBpZiAoIXRvdXJfc3RvcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b3VyX3N0b3JhZ2UuZGlzY2lwbGluZS5pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1lcmdlZFJlc3VsdHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlc3VsdHMgPT09IG51bGwgfHwgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBCdWlsZCBydW5zIGluZGV4XG4gICAgICAgIGxldCBydW5zX2luZGV4ID0gbmV3IE1hcCgpO1xuICAgICAgICBmb3IgKGNvbnN0IHRvdXIgb2YgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lLnRvdXJzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJ1biBvZiB0b3VyLnJ1bnMpIHtcbiAgICAgICAgICAgICAgICBydW5zX2luZGV4LnNldChydW4uaWQsIHsgdG91ciwgcnVuIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE1lcmdlIHJlc3VsdHNcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zdGF0ZS5yZXN1bHRzLm1hcChyb3cgPT4gKHtcbiAgICAgICAgICAgIHBsYWNlOiByb3cucGxhY2UsXG4gICAgICAgICAgICB0b3VyOiBydW5zX2luZGV4LmdldChyb3cucnVuX2lkKS50b3VyLFxuICAgICAgICAgICAgcnVuOiBydW5zX2luZGV4LmdldChyb3cucnVuX2lkKS5ydW4sXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBsb2FkUmVzdWx0cyA9ICgpID0+IHtcbiAgICAgICAgQXBpKFwiZGlzY2lwbGluZS5nZXRfcmVzdWx0c1wiLCB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkOiB0aGlzLnByb3BzLmRpc2NpcGxpbmVJZCxcbiAgICAgICAgfSlcbiAgICAgICAgLm9uU3VjY2VzcyhyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICByZXN1bHRzOiByZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuc2VuZCgpO1xuICAgIH1cbiAgICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICAgICAgQXBpKFwiZGlzY2lwbGluZS5nZXRcIiwge1xuICAgICAgICAgICAgZGlzY2lwbGluZV9pZDogdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQsXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5TQ0hFTUEsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWRkVG9EQihcIkRpc2NpcGxpbmVcIiwgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQsIHRoaXMuc3RvcmFnZSlcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZSlcbiAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gdGhpcy5zdG9yYWdlLmdldChcIkRpc2NpcGxpbmVcIilcbiAgICAgICAgICAgIC5ieV9pZCh0aGlzLnByb3BzLmRpc2NpcGxpbmVJZClcbiAgICAgICAgICAgIC5zZXJpYWxpemUodGhpcy5TQ0hFTUEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHNlcmlhbGl6ZWQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIExpc3RlbmVyc1xuXG4gICAgaGFuZGxlU2lnbmFsID0gKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlcmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5oYW5kbGVTaWduYWwobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW5kZXJpbmdcblxuICAgIHJlbmRlckJvZHkodGFibGUpIHtcbiAgICAgICAgY29uc3QgeyBkaXNjaXBsaW5lSWQsIHJlbmRlcmVyLCAuLi5vdGhlcl9wcm9wc30gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCBSZW5kZXJpbmdDb21wb25lbnQgPSByZW5kZXJlcjtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZW5kZXJpbmdDb21wb25lbnRcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lPXsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lIH1cbiAgICAgICAgICAgICAgICByZWY9eyB0aGlzLm1ha2VSZW5kZXJlclJlZiB9XG4gICAgICAgICAgICAgICAgdGFibGU9eyB0YWJsZSB9XG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlcigpIHsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvc29ydC1jb21wXG4gICAgICAgIGNvbnN0IHRhYmxlID0gdGhpcy5nZXRNZXJnZWRSZXN1bHRzKCk7XG4gICAgICAgIGlmICh0YWJsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGVyIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KHRhYmxlKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkRpc2NpcGxpbmVSZXN1bHRzLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX2NvbW1vbl9EaXNjaXBsaW5lUmVzdWx0c1wiO1xuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3VyUmVzdWx0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3VySWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICByZW5kZXJlcjogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdG91cjogbnVsbCxcclxuICAgICAgICAgICAgcmVzdWx0czogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnNldHVwU3RvcmFnZSgpO1xyXG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgKCkgPT4geyB0aGlzLmxvYWREYXRhOyB0aGlzLmxvYWRSZXN1bHRzKCk7IH0pO1xyXG4gICAgICAgIHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXHJcbiAgICAgICAgICAgIFwidG91cl9yZXN1bHRzX2NoYW5nZWQgcmVsb2FkX2RhdGFcIixcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUb3VyUmVzdWx0c0NoYW5nZWRcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRfcHJvcHMpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VySWQgIT09IG5leHRfcHJvcHMudG91cklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdG91cjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJlc3VsdHM6IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVTdG9yYWdlKHRoaXMucHJvcHMudG91cklkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cFN0b3JhZ2UobmV4dF9wcm9wcy50b3VySWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2X3Byb3BzKSB7XHJcbiAgICAgICAgaWYgKHByZXZfcHJvcHMudG91cklkICE9PSB0aGlzLnByb3BzLnRvdXJJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMuZnJlZVN0b3JhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU0NIRU1BKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcclxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAganVkZ2U6IHt9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcnVuczoge1xyXG4gICAgICAgICAgICAgICAgYWNyb2JhdGljczoge30sXHJcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXR1cFN0b3JhZ2UodG91cl9pZD1udWxsKSB7XHJcbiAgICAgICAgaWYgKHRvdXJfaWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdG91cl9pZCA9IHRoaXMucHJvcHMudG91cklkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlLmdldERvbWFpbihgdG91cl9yZXN1bHRzXyR7dG91cl9pZH1gKTtcclxuICAgIH1cclxuICAgIGZyZWVTdG9yYWdlKHRvdXJfaWQ9bnVsbCkge1xyXG4gICAgICAgIGlmICh0b3VyX2lkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRvdXJfaWQgPSB0aGlzLnByb3BzLnRvdXJJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oYHRvdXJfcmVzdWx0c18ke3RvdXJfaWR9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVJlbmRlcmVyUmVmID0gKHJlZikgPT4gdGhpcy5fcmVuZGVyZXIgPSByZWY7XHJcblxyXG4gICAgaGFuZGxlVG91clJlc3VsdHNDaGFuZ2VkID0gKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBpZiAoIW1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0b3VyX3N0b3JhZ2UgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKS5ieV9pZChtZXNzYWdlW1widG91cl9pZFwiXSk7XHJcbiAgICAgICAgaWYgKCF0b3VyX3N0b3JhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG91cl9zdG9yYWdlLmlkID09PSB0aGlzLnByb3BzLnRvdXJJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1lcmdlZFJlc3VsdHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucmVzdWx0cyA9PT0gbnVsbCB8fCB0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEJ1aWxkIHJ1bnMgaW5kZXhcclxuICAgICAgICBsZXQgcnVuc19pbmRleCA9IG5ldyBNYXAoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHJ1biBvZiB0aGlzLnN0YXRlLnRvdXIucnVucykge1xyXG4gICAgICAgICAgICBydW5zX2luZGV4LnNldChydW4uaWQsIHJ1bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1lcmdlIHJlc3VsdHNcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnN0YXRlLnJlc3VsdHMubWFwKHJvdyA9PiAoe1xyXG4gICAgICAgICAgICBwbGFjZTogcm93LnBsYWNlLFxyXG4gICAgICAgICAgICBhZHZhbmNlczogcm93LmFkdmFuY2VzLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsX2RhdGE6IHJvdy5hZGRpdGlvbmFsX2RhdGEsXHJcbiAgICAgICAgICAgIHJ1bjogcnVuc19pbmRleC5nZXQocm93LnJ1bl9pZCksXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFJlc3VsdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgQXBpKFwidG91ci5nZXRfcmVzdWx0c1wiLCB7XHJcbiAgICAgICAgICAgIHRvdXJfaWQ6IHRoaXMucHJvcHMudG91cklkLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uU3VjY2VzcyhyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0czogcmVzcG9uc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuICAgIGxvYWREYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIEFwaShcInRvdXIuZ2V0XCIsIHtcclxuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5wcm9wcy50b3VySWQsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiB0aGlzLlNDSEVNQSxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkVG9EQihcIlRvdXJcIiwgdGhpcy5wcm9wcy50b3VySWQsIHRoaXMuc3RvcmFnZSlcclxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlKVxyXG4gICAgICAgICAgICAuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZCA9IHRoaXMuc3RvcmFnZS5nZXQoXCJUb3VyXCIpXHJcbiAgICAgICAgICAgIC5ieV9pZCh0aGlzLnByb3BzLnRvdXJJZClcclxuICAgICAgICAgICAgLnNlcmlhbGl6ZSh0aGlzLlNDSEVNQSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHRvdXI6IHNlcmlhbGl6ZWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTGlzdGVuZXJzXHJcblxyXG4gICAgaGFuZGxlU2lnbmFsID0gKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5fcmVuZGVyZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuaGFuZGxlU2lnbmFsKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW5kZXJpbmdcclxuXHJcbiAgICByZW5kZXJOb25GaW5hbGl6ZWRXYXJuaW5nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS50b3VyLmZpbmFsaXplZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1kYW5nZXJcIj5cclxuICAgICAgICAgICAgICAgIHsgXyhcInJlc3VsdHMuYWxlcnRzLm5vdF9maW5hbGl6ZWRcIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQm9keSh0YWJsZSkge1xyXG4gICAgICAgIGNvbnN0IHsgdG91cklkLCByZW5kZXJlciwgLi4ub3RoZXJfcHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBSZW5kZXJpbmdDb21wb25lbnQgPSByZW5kZXJlcjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8UmVuZGVyaW5nQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICByZWY9eyB0aGlzLm1ha2VSZW5kZXJlclJlZiB9XHJcbiAgICAgICAgICAgICAgICB0YWJsZT17IHRhYmxlIH1cclxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnN0YXRlLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuICAgICAgICBjb25zdCB0YWJsZSA9IHRoaXMuZ2V0TWVyZ2VkUmVzdWx0cygpO1xyXG4gICAgICAgIGlmICh0YWJsZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLXJlc3VsdHNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8TG9hZGVyIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3VyLXJlc3VsdHNcIj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb25GaW5hbGl6ZWRXYXJuaW5nIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KHRhYmxlKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblRvdXJSZXN1bHRzLmRpc3BsYXlOYW1lID0gXCJjb21tb25fVG91clJlc3VsdHNcIjtcclxuIl19
