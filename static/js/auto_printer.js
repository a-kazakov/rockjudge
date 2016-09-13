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
                    var _key = _step2.value;

                    if (KEYS.indexOf(_key) < 0) {
                        console.warn("Module " + module_name + " exports unknown " + _key + " parameter.");
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
                        var _key = idx.slice(1);
                        var nested_data = data[idx];
                        if ((typeof nested_data === "undefined" ? "undefined" : _typeof(nested_data)) === "object") {
                            this.__storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                        }
                        this[_key] = new Ref(this.__storage, nested_data.model, nested_data.id);
                        this.__key_types[_key] = "^";
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

        return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).apply(this, arguments));
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

        var _this2 = _possibleConstructorReturn(this, (ConnectionStatus.__proto__ || Object.getPrototypeOf(ConnectionStatus)).call(this, props));

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

        return _possibleConstructorReturn(this, (Printable.__proto__ || Object.getPrototypeOf(Printable)).apply(this, arguments));
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Wrapper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call.apply(_ref, [this].concat(args))), _this), _this.makePrintableRef = function (ref) {
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DisciplineResultsTab);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DisciplineResultsTab.__proto__ || Object.getPrototypeOf(DisciplineResultsTab)).call.apply(_ref, [this].concat(args))), _this), _this.makeResultsRef = function (ref) {
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

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
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

        var _this = _possibleConstructorReturn(this, (HeatsTab.__proto__ || Object.getPrototypeOf(HeatsTab)).call(this, props));

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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Wrapper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call.apply(_ref, [this].concat(args))), _this), _this.makePrintableRef = function (ref) {
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TourResultsTab);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TourResultsTab.__proto__ || Object.getPrototypeOf(TourResultsTab)).call.apply(_ref, [this].concat(args))), _this), _this.makeResultsRef = function (ref) {
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

        return _possibleConstructorReturn(this, (ActiveJob.__proto__ || Object.getPrototypeOf(ActiveJob)).apply(this, arguments));
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TestPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TestPage.__proto__ || Object.getPrototypeOf(TestPage)).call.apply(_ref, [this].concat(args))), _this), _this.makeContentRef = function (ref) {
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

        var _this = _possibleConstructorReturn(this, (JobQueue.__proto__ || Object.getPrototypeOf(JobQueue)).call(this, props));

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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Cell);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cell.__proto__ || Object.getPrototypeOf(Cell)).call.apply(_ref, [this].concat(args))), _this), _this.makeInputRef = function (ref) {
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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Row);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Row.__proto__ || Object.getPrototypeOf(Row)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (action, new_value) {
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

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

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

        var _this = _possibleConstructorReturn(this, (AutoPrinter.__proto__ || Object.getPrototypeOf(AutoPrinter)).call(this, props));

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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Paper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Paper.__proto__ || Object.getPrototypeOf(Paper)).call.apply(_ref, [this].concat(args))), _this), _this.makeBodyRef = function (ref) {
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

        var _this = _possibleConstructorReturn(this, (DisciplineResults.__proto__ || Object.getPrototypeOf(DisciplineResults)).call(this, props));

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

        var _this = _possibleConstructorReturn(this, (TourResults.__proto__ || Object.getPrototypeOf(TourResults)).call(this, props));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYXV0b19wcmludGVyLmpzeCIsInNyY1xcanN4XFxjb21tb25cXGRvY3guanN4Iiwic3JjXFxqc3hcXGwxMG5cXGxvYWRlci5qc3giLCJzcmNcXGpzeFxcbDEwblxccnUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXGxvYWRlci5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxhcGkuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcbWVzc2FnZV9kaXNwYXRjaGVyLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXHN0b3JhZ2UuanN4Iiwic3JjXFxqc3hcXHVpXFxjb21wb25lbnRzLmpzeCIsInNyY1xcanN4XFx1aVxcZGlhbG9ncy5qc3giLCJzcmNcXGpzeFxcdWlcXHByaW50YWJsZS5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXEp1ZGdpbmdcXFRvdXJQYW5lbFxcRGlzY2lwbGluZVJlc3VsdHNUYWJcXFdyYXBwZXIuanN4Iiwic3JjXFxqc3hfbmV3XFxBZG1pblBhbmVsXFxKdWRnaW5nXFxUb3VyUGFuZWxcXERpc2NpcGxpbmVSZXN1bHRzVGFiXFxpbmRleC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXEp1ZGdpbmdcXFRvdXJQYW5lbFxcSGVhdHNUYWJcXFJvdy5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXEp1ZGdpbmdcXFRvdXJQYW5lbFxcSGVhdHNUYWJcXGluZGV4LmpzeCIsInNyY1xcanN4X25ld1xcQWRtaW5QYW5lbFxcSnVkZ2luZ1xcVG91clBhbmVsXFxUb3VyUmVzdWx0c1RhYlxcV3JhcHBlci5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXEp1ZGdpbmdcXFRvdXJQYW5lbFxcVG91clJlc3VsdHNUYWJcXGluZGV4LmpzeCIsInNyY1xcanN4X25ld1xcQWRtaW5QYW5lbFxcU2VydmljZVxcQXV0b1ByaW50ZXJcXEpvYlF1ZXVlXFxBY3RpdmVKb2IuanN4Iiwic3JjXFxqc3hfbmV3XFxBZG1pblBhbmVsXFxTZXJ2aWNlXFxBdXRvUHJpbnRlclxcSm9iUXVldWVcXFRlc3RQYWdlLmpzeCIsInNyY1xcanN4X25ld1xcQWRtaW5QYW5lbFxcU2VydmljZVxcQXV0b1ByaW50ZXJcXEpvYlF1ZXVlXFxpbmRleC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXFNlcnZpY2VcXEF1dG9QcmludGVyXFxUYWJsZVxcQ2VsbC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXFNlcnZpY2VcXEF1dG9QcmludGVyXFxUYWJsZVxcUm93LmpzeCIsInNyY1xcanN4X25ld1xcQWRtaW5QYW5lbFxcU2VydmljZVxcQXV0b1ByaW50ZXJcXFRhYmxlXFxpbmRleC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXFNlcnZpY2VcXEF1dG9QcmludGVyXFxpbmRleC5qc3giLCJzcmNcXGpzeF9uZXdcXEFkbWluUGFuZWxcXGNvbW1vblxcUGFwZXIuanN4Iiwic3JjXFxqc3hfbmV3XFxjb21tb25cXERpc2NpcGxpbmVSZXN1bHRzLmpzeCIsInNyY1xcanN4X25ld1xcY29tbW9uXFxUb3VyUmVzdWx0cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFHQSxTQUFTLE1BQVQsQ0FDSSwyQ0FBa0IsT0FBTyxVQUF6QixDQURKLEVBRUksU0FBUyxjQUFULENBQXdCLFNBQXhCLENBRko7Ozs7Ozs7Ozs7Ozs7SUNITSxRO0FBQ0Ysc0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUNsQixhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsSUFBZDtBQUNBLGFBQUssTUFBTCxHQUFjLElBQWQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUssSUFBTCxHQUFZLEVBQVo7QUFD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Q0FDVSxLLEVBQU87QUFBQSx5QkFDOEIsS0FBSyxLQURuQztBQUFBLGdCQUNOLE1BRE0sVUFDTixNQURNO0FBQUEsZ0JBQ0UsUUFERixVQUNFLFFBREY7O0FBQUEsZ0JBQ2UsV0FEZjs7QUFFZCxnQkFBTSxxQkFBcUIsUUFBM0I7QUFDQSxtQkFDSSxvQkFBQyxrQkFBRDtBQUNJLHFCQUFNLEtBQUssZUFEZjtBQUVJLHVCQUFRLEtBRlo7QUFHSSxzQkFBTyxLQUFLLEtBQUwsQ0FBVztBQUh0QixlQUlTLFdBSlQsRUFESjtBQVFIOzs7aUNBQ1E7QUFBRztBQUNSLGdCQUFNLFFBQVEsS0FBSyxnQkFBTCxFQUFkO0FBQ0EsZ0JBQUksVUFBVSxJQUFkLEVBQW9CO0FBQ2hCLHVCQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGNBQWY7QUFDSTtBQURKLGlCQURKO0FBS0g7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxjQUFmO0FBQ00scUJBQUsseUJBRFg7QUFFTSxxQkFBSyxVQUFMLENBQWdCLEtBQWhCO0FBRk4sYUFESjtBQU1IOzs7NEJBOUlZO0FBQ1QsbUJBQU87QUFDSCw0QkFBWTtBQUNSLGlDQUFhLEVBREw7QUFFUix1Q0FBbUI7QUFDZiwrQkFBTztBQURRO0FBRlgsaUJBRFQ7QUFPSCxzQkFBTTtBQUNGLGdDQUFZLEVBRFY7QUFFRiw0QkFBUSxFQUZOO0FBR0YsaUNBQWE7QUFDVCw4QkFBTTtBQURHO0FBSFg7QUFQSCxhQUFQO0FBZUg7Ozs7RUFuRW9DLE1BQU0sUzs7a0JBQTFCLFc7OztBQW9NckIsWUFBWSxXQUFaLEdBQTBCLG9CQUExQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQXV0b1ByaW50ZXIgZnJvbSBcIkFkbWluUGFuZWwvU2VydmljZS9BdXRvUHJpbnRlclwiO1xyXG5cclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICAgIDxBdXRvUHJpbnRlciB7IC4uLndpbmRvdy5wYWdlX3Byb3BzIH0gLz4sXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIilcclxuKTtcclxuIiwiY2xhc3MgRG9jeEltcGwge1xyXG4gICAgY29uc3RydWN0b3IoZmlsZW5hbWUpIHtcclxuICAgICAgICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGl0bGUxID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRpdGxlMiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50aXRsZTMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gXCJcIjtcclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gXCJwb3J0cmFpdFwiO1xyXG4gICAgICAgIHRoaXMuc3R5bGVzID0ge1xyXG4gICAgICAgICAgICBcImJvZHlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMHB0XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvbnQtZmFtaWx5XCI6IFwiQ2FsaWJyaSwgVGFob21hLCBBcmlhbCwgc2Fucy1zZXJpZlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRhYmxlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbGxhcHNlXCI6IFwiY29sbGFwc2VcIixcclxuICAgICAgICAgICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidHJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwYWdlLWJyZWFrLWluc2lkZVwiOiBcImF2b2lkXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidGQsIHRoXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1wiOiBcIjFwdCAzcHRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoMSwgaDIsIGgzLCBoNCwgaDUsIGg2XCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFnZS1icmVhay1hZnRlclwiOiBcImF2b2lkXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1ib3R0b21cIjogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoMVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjIwcHRcIixcclxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXHJcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjEwcHRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoMlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE2cHRcIixcclxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXHJcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjZwdFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImgzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcclxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNHB0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaDQgcFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcclxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiBcIjEwcHQgMCA2cHRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoNSBwXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTJwdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiNnB0IDBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCIuaGVhZGVyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWJvdHRvbVwiOiBcIjFweCBzb2xpZCBibGFja1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMHB0XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcclxuICAgICAgICAgICAgICAgIFwicGFkZGluZy1ib3R0b21cIjogXCIycHRcIixcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiBcIjIwcHRcIixcclxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcclxuICAgICAgICAgICAgICAgIFwicGFkZGluZ1wiOiAwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxpXCI6IHsgXCJtYXJnaW4tdG9wXCI6IDAsIFwicGFkZGluZy10b3BcIjogMCB9LFxyXG4gICAgICAgICAgICBcIi5zcGFjZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNHB0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiLnZhLXRvcFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwidG9wXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiLnRleHQtbGVmdFwiOiB7IFwidGV4dC1hbGlnblwiOiBcImxlZnRcIiB9LFxyXG4gICAgICAgICAgICBcIi50ZXh0LXJpZ2h0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwicmlnaHRcIiB9LFxyXG4gICAgICAgICAgICBcIi50ZXh0LWNlbnRlclwiOiB7IFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiIH0sXHJcbiAgICAgICAgICAgIFwiLmJvcmRlcmVkLXRhYmxlIHRkLCAuYm9yZGVyZWQtdGFibGUgdGhcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJib3JkZXJcIjogXCIxcHQgc29saWQgYmxhY2tcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRXaWR0aENzcygpO1xyXG4gICAgfVxyXG4gICAgYWRkV2lkdGhDc3MoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTAwOyArK2kpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdHlsZShcIi53LVwiICsgaSwgXCJ3aWR0aFwiLCBpICsgXCIlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRTdHlsZShzZWxlY3Rvciwga2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdHlsZXNbc2VsZWN0b3JdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl1ba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0VGl0bGUxKHRpdGxlMSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUxID0gdGl0bGUxO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0VGl0bGUyKHRpdGxlMikge1xyXG4gICAgICAgIHRoaXMudGl0bGUyID0gdGl0bGUyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0VGl0bGUzKHRpdGxlMykge1xyXG4gICAgICAgIHRoaXMudGl0bGUzID0gdGl0bGUzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0TWFyZ2lucyhtYXJnaW5zKSB7XHJcbiAgICAgICAgdGhpcy5tYXJnaW5zID0gbWFyZ2lucztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldEJvZHkoYm9keSkge1xyXG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbikge1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdHlsZUJsb2NrKHNlbGVjdG9yLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IGNzc19wYWlycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpLm1hcCgoa2V5KSA9PiBrZXkgKyAnOiAnICsgZGF0YVtrZXldICsgJzsgJylcclxuICAgICAgICByZXR1cm4gc2VsZWN0b3IgKyBcIiB7IFwiICsgY3NzX3BhaXJzLmpvaW4oXCIgXCIpICsgXCIgfVwiO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyU3R5bGVzKCkge1xyXG4gICAgICAgIGxldCBjc3NfYmxvY2tzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5zdHlsZXMpLm1hcCgoXHJcbiAgICAgICAgICAgIChzZWxlY3RvcikgPT4gdGhpcy5yZW5kZXJTdHlsZUJsb2NrKHNlbGVjdG9yLCB0aGlzLnN0eWxlc1tzZWxlY3Rvcl0pXHJcbiAgICAgICAgKS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm4gY3NzX2Jsb2Nrcy5qb2luKFwiXFxuXCIpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVySFRNTCgpIHtcclxuICAgICAgICBsZXQgY3NzID0gdGhpcy5yZW5kZXJTdHlsZXMoKTtcclxuICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5oZWFkZXIgPyAnPHAgY2xhc3M9XCJoZWFkZXJcIj4nICsgdGhpcy5oZWFkZXIgKyAnPC9wPicgOiBcIlwiO1xyXG4gICAgICAgIGxldCB0aXRsZTEgPSB0aGlzLnRpdGxlMSA/ICc8aDE+JyArIHRoaXMudGl0bGUxICsgJzwvaDE+JyA6IFwiXCI7XHJcbiAgICAgICAgbGV0IHRpdGxlMiA9IHRoaXMudGl0bGUyID8gJzxoMj4nICsgdGhpcy50aXRsZTIgKyAnPC9oMj4nIDogXCJcIjtcclxuICAgICAgICBsZXQgdGl0bGUzID0gdGhpcy50aXRsZTMgPyAnPGgzPicgKyB0aGlzLnRpdGxlMyArICc8L2gzPicgOiBcIlwiO1xyXG4gICAgICAgIGxldCBzcGFjZXIgPSAoaGVhZGVyIHx8IHRpdGxlMSB8fCB0aXRsZTIgfHwgdGl0bGUzKSA/ICc8cCBjbGFzcz1cInNwYWNlclwiPiZuYnNwOzwvcD4nIDogXCJcIjtcclxuICAgICAgICByZXR1cm4gXCI8IURPQ1RZUEUgaHRtbD5cXG5cIiArXHJcbiAgICAgICAgICAgIFwiPGh0bWw+PGhlYWQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8bWV0YSBjaGFyc2V0PVxcXCJ1dGYtOFxcXCI+XCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8c3R5bGU+XFxuXCIgKyBjc3MgKyBcIlxcbjwvc3R5bGU+XFxuXCIgK1xyXG4gICAgICAgICAgICBcIjwvaGVhZD48Ym9keT5cXG5cIiArXHJcbiAgICAgICAgICAgICAgICBoZWFkZXIgK1xyXG4gICAgICAgICAgICAgICAgdGl0bGUxICtcclxuICAgICAgICAgICAgICAgIHRpdGxlMiArXHJcbiAgICAgICAgICAgICAgICB0aXRsZTMgK1xyXG4gICAgICAgICAgICAgICAgc3BhY2VyICtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9keSArXHJcbiAgICAgICAgICAgIFwiPC9ib2R5PjwvaHRtbD5cIjtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKCkge1xyXG4gICAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJIVE1MKCk7XHJcbiAgICAgICAgbGV0IG1hcmdpbnMgPSB0aGlzLm1hcmdpbnMgfHwgKHRoaXMub3JpZW50YXRpb24gPT09IFwicG9ydHJhaXRcIiA/IFsxMCwgMTUsIDEwLCAxNV0gOiBbNywgMTAsIDcsIDEwXSk7XHJcbiAgICAgICAgbGV0IGNvbnZlcnRlZCA9IGh0bWxEb2N4LmFzQmxvYihodG1sLCB7XHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLm9yaWVudGF0aW9uLFxyXG4gICAgICAgICAgICBtYXJnaW5zOiB7XHJcbiAgICAgICAgICAgICAgICB0b3A6ICAgIE1hdGguZmxvb3IobWFyZ2luc1swXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAgTWF0aC5mbG9vcihtYXJnaW5zWzFdICogNTYuNjU5KS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiBNYXRoLmZsb29yKG1hcmdpbnNbMl0gKiA1Ni42NTkpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAgIE1hdGguZmxvb3IobWFyZ2luc1szXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNhdmVBcyhjb252ZXJ0ZWQsIHRoaXMuZmlsZW5hbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHZhciBEb2N4ID0gKGZuKSA9PiBuZXcgRG9jeEltcGwoZm4pO1xyXG4iLCJpbXBvcnQgeyB0cmFuc2xhdGUsIGdldFBvc3NpYmxlVG91ck5hbWVzIH0gZnJvbSBcIi4vcnVcIjtcclxuXHJcbmV4cG9ydCB2YXIgXyA9IHRyYW5zbGF0ZTtcclxuZXhwb3J0IHZhciB0b3VyX25hbWVzID0gZ2V0UG9zc2libGVUb3VyTmFtZXMoKTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShzcmMsIGFyZykge1xyXG4gICAgZnVuY3Rpb24gY2hvb3NlRW5kaW5nKG4sIGUxLCBlMiwgZTUpIHtcclxuICAgICAgICBsZXQgeCA9IG4gJSAxMDA7XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID49IDUgfHwgeCAlIDEwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGUyO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBQSFJBU0VTID0ge1xyXG4gICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6ICh2ZXJzaW9uLCBkYXRlKSA9PiA8ZGl2IGNsYXNzTmFtZT1cImFib3V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PGI+Um9ja0p1ZGdlIHt2ZXJzaW9ufTwvYj4gKNC30LDQutGA0YvRgtCw0Y8g0LLQtdGA0YHQuNGPINC00LvRjyDQvtCz0YDQsNC90LjRh9C10L3QvdC+0LPQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjykgJm1kYXNoOyDRgdC40YHRgtC10LzQsCDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDRgNC10LfRg9C70YzRgtCw0YLQvtCyINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDQv9C+INCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC+0LzRgyDRgNC+0Lot0L0t0YDQvtC70LvRgy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JDQstGC0L7RgNGB0LrQuNC1INC/0YDQsNCy0LAg0L3QsCDRgdC40YHRgtC10LzRgyBSb2NrSnVkZ2Ug0L/QvtC70L3QvtGB0YLRjNGOINC/0YDQuNC90LDQtNC70LXQttCw0YIg0YDQsNC30YDQsNCx0L7RgtGH0LjQutGDINCQ0YDRgtC10LzRgyDQmtCw0LfQsNC60L7QstGDLiDQodC+0LDQstGC0L7RgCDRgdC40YHRgtC10LzRiyDQkNC90YLQvtC9INCQ0LzQtdC70LjQvS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0KHQuNGB0YLQtdC80LAg0YDQsNGB0L/RgNC+0YHRgtGA0LDQvdGP0LXRgtGB0Y8g0L/QviDQu9C40YbQtdC90LfQuNC4IExpbnVtIGQuby5vIChpbmZvQGxpbnVtLmhyKS4g0JTQu9GPINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsCBSb2NrSnVkZ2Ug0L3QtdC+0LHRhdC+0LTQuNC80L4g0Lgg0LTQvtGB0YLQsNGC0L7Rh9C90L4g0LjQvNC10YLRjCDQv9GA0LDQstC+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLIExpbnVtIExQUy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0J7RhNC40YbQuNCw0LvRjNC90YvQuSDRgdCw0LnRgjogPGEgaHJlZj1cImh0dHBzOi8vcm9ja2p1ZGdlLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5odHRwczovL3JvY2tqdWRnZS5jb20vPC9hPjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3Byb2dyYW1zX2FmdGVyX2NyZWF0aW9uXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLINC80L7QttC90L4g0LHRg9C00LXRgiDQtNC+0LHQsNCy0LjRgtGMINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGB0L7RhdGA0LDQvdC10L3QuNGPINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0LrQvtGA0YDQtdC60YLQvdC+INC90LDRgdGC0YDQvtC10L3QsCDQuCDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L3QsC5cIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX25vdF9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQvdC10LTQvtGB0YLRg9C/0L3QsCDQvdCwINGN0YLQvtC8INC60L7QvNC/0YzRgtC10YDQtS5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmluYWxpemVkXCI6IFwi0J7RgtGB0YPRgtGB0YLQstGD0Y7RgiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3dhcm5pbmdcIjogPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPtCk0LjQvdCw0LvQuNC30LDRhtC40Y8g0LTQvtC70LbQvdCwINC+0YLQvNC10L3Rj9GC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDQuNGB0LrQu9GO0YfQuNGC0LXQu9GM0L3Ri9GFINGB0LvRg9GH0LDRj9GFITwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QldGB0LvQuCDQttC1INGN0YLQviDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDQvdC10L7QsdGF0L7QtNC40LzQviwg0L7QsdGA0LDRgtC40YLQtSDQstC90LjQvNCw0L3QuNC1LCDRh9GC0L4g0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgdC/0LjRgdC+0Log0YPRh9Cw0YHRgtC90LjQutC+0LJcclxuICAgICAgICAgICAgICAgICAgICDRgdC70LXQtNGD0Y7RidC10LPQviDRgtGD0YDQsCDQsdGD0LTQtdGCINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC4INC/0LXRgNC10YHQvtC30LTQsNC9LiDQoNC10LfRg9C70YzRgtCw0YLRiyDRg9GH0LDRgdGC0L3QuNC60L7Qsiwg0L/RgNC+0YjQtdC00YjQuNGFINCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L/QvtGB0LvQtSDQv9C10YDQstC+0LlcclxuICAgICAgICAgICAgICAgICAgICDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INC4INC90LUg0L/RgNC+0YjQtdC00YjQuNGFINC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INCx0YPQtNGD0YIg0LHQtdC30LLQvtC30LLRgNCw0YLQvdC+INGD0YLQtdGA0Y/QvdGLITwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QmCDQvdC1INC30LDQsdGD0LTRjNGC0LUg0LfQsNC90L7QstC+INC90LDQv9C10YfQsNGC0LDRgtGMINCy0YHQtSDRgtCx0LvQuNGG0YsuPC9wPjwvZGl2PixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicHJpbnRfdGVzdF9wYWdlXCI6IFwi0J3QsNC/0LXRh9Cw0YLQsNGC0Ywg0YLQtdGB0YLQvtCy0YPRjiDRgdGC0YDQsNC90LjRhtGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlXCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlX2VtcHR5XCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/Rg9GB0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicnVsZXNcIjogXCLQl9Cw0LTQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfcGFnZVwiOiBcItCi0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3RleHRcIjogXCLQrdGC0L4g0YLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwIFJvY2tKdWRnZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfY2x1YlwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjogXCLQlNC+0LHQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9kaXNjaXBsaW5lXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3BhcnRpY2lwYW50XCI6IFwi0JTQvtCx0LDQstC40YLRjCDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3RvdXJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfbnVtYmVyc1wiOiBcItCd0L7QvNC10YDQsCDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0XCI6IFwi0K3QutGB0L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogXCLQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb1wiOiBcItCX0LDQs9GA0YPQt9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQn9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQstGB0LUg0YPRgdGC0YDQvtC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX3BsYW5cIjogXCLQodC+0YDRgtC40YDQvtCy0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtCy0LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgICAgIFwidW5jb25maXJtX3Njb3JlXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQutGB0LDRhtC40LhcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZVwiOiBcItCe0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NsdWJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDQutC70YPQsT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NvbXBldGl0aW9uXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2Rpc2NpcGxpbmVcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0LTQuNGB0YbQuNC/0LvQuNC90YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9qdWRnZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YHRg9C00YzRjj9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC/0YDQvtCz0YDQsNC80LzRgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOINGC0YPRgNCwPyDQktCy0LXQtNC40YLQtSDCq3VuZmluYWxpemXCuywg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiBcItCeINC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbGllbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LzQuCDRg9GB0YLRgNC+0LnRgdGC0LLQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfc2hvd25cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0L/QviDRgdC70LXQtNGD0Y7RidC40Lwg0LrQu9GD0LHQsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2luZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDRgtGD0YDQvdC40YDQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX21hbmFnZW1lbnRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQtNC40YHRhtC40L/Qu9C40L3QsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRfY29tcGV0aXRpb25cIjogXCLQrdC60YHQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LAg0Lgg0YDQtdC30YPQu9GM0YLQsNGC0L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfY29tcGV0aXRpb25cIjogXCLQmNC80L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTQtdC50YHQutCw0Y8g0LHRgNC40LPQsNC00LBcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9iYXRpY3NcIjogXCLQl9Cw0LPRgNGD0LfQutCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YPRh9Cw0YHRgtC90LjQutCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX21lbnVcIjogXCLQodC10YDQstC40YHQvdC+0LUg0LzQtdC90Y5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX2xpc3RcIjogXCLQodC/0LjRgdC+0Log0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2RhdGVcIjogXCLQlNCw0YLQsCDQv9GA0L7QstC10LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9uYW1lXCI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc1wiOiBcItCU0LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Rpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maWxlc19zZWxlY3RlZFwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LsuLi5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fcHJvZ3JhbV9sb2FkZWRcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQvdC1INC30LDQs9GA0YPQttC10L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNcIjogXCLQo9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFzdGVfYWNyb1wiOiBcItCS0YHRgtCw0LLRjNGC0LUg0LTQsNC90L3Ri9C1INC40Lcg0LrQsNC70YzQutGD0LvRj9GC0L7RgNCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zcG9ydHNtZW5fb25seVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDRgdC/0L7RgNGC0YHQvNC10L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3VtbWFyeVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDQutC+0LvQuNGH0LXRgdGC0LLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJcIjogXCLQt9Cw0L9cIiwgIC8vIHN1YnN0aXR1dGVcclxuICAgICAgICAgICAgICAgIFwidG91cnNcIjogXCLQotGD0YDRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9wYXNzY29kZVwiOiBcItCS0LLQtdC00ZHQvSDQvdC10LLQtdGA0L3Ri9C5INC60L7QtCDQv9C+0YLQstC10YDQttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZW51XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jbHVic1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfZGlzY2lwbGluZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2p1ZGdlc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9wYXJ0aWNpcGFudHNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC/0L7RgNGC0YHQvNC10L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3RvdXJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YLRg9GA0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibl9wYXJ0aWNpcGFudHNcIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuXCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQv9Cw0YHQvSR7IGNob29zZUVuZGluZyhzLCBcItC+0LlcIiwgXCLRi9GFXCIsIFwi0YvRhVwiKSB9KWAgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5fc2hvcnRcIjogKG4sIHMpID0+IG4udG9TdHJpbmcoKSArIFwiINGB0L/QvtGA0YLRgdC80LXQvVwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpICsgKHMgPiAwID8gYCAoKyR7c30g0LfQsNC/LilgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX25fcGFydGljaXBhbnRzXCI6IG4gPT4gXCLQmNGC0L7Qs9C+IFwiICsgbiArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnaW5nLXRhYnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b3VyLWFkbWluXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmUtcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVycm9yc1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3N5bnRheF9lcnJvclwiOiBcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0LTQsNC90L3Ri9GFXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXBpXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZHVwbGljYXRlZF9leHRlcm5hbF9pZFwiOiBcItCSINC00LDQvdC90YvRhSDQuNC80LXRjtGC0YHRjyDQt9Cw0L/QuNGB0Lgg0YEg0L/QvtCy0YLQvtGA0Y/RjtGJ0LjQvNC40LzRgdGPIGV4dGVybmFsX2lkXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuYWJsZV90b19nZXRcIjogKHdhbnRlZCkgPT4gXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C+0LvRg9GH0LjRgtGMIFwiICsgd2FudGVkICsgXCIg0LjQtyDQt9Cw0L/RgNC+0YHQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQutC70YPQsSwg0Log0LrQvtGC0L7RgNC+0LzRgyDQv9GA0LjQstGP0LfQsNC90Ysg0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfbm9uX2VtcHR5XCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1LCDRgdC+0LTQtdGA0LbQsNGJ0LXQtSDQtNC40YHRhtC40L/Qu9C40L3Riywg0LrQu9GD0LHRiyDQuNC70Lgg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b29fbWFueV90b3Vyc1wiOiAoZCkgPT4gW1wi0J7RiNC40LHQutCwINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIiwgYNCSINC00LjRgdGG0LjQv9C70LjQvdC1ICR7ZH0g0YHQvtC00LXRgNC20LjRgtGB0Y8g0LHQvtC70YzRiNC1INGC0YPRgNC+0LIsINGH0LXQvCDRgdC+0LfQtNCw0L3QviDQsiDRgdC40YHRgtC10LzQtWBdLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2Rpc2NpcGxpbmVfZm91bmRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YssINC+0YLRgdGD0YLRgdGC0LLRg9GO0YnQuNC1INCyINGB0LjRgdGC0LXQvNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNoYW5nZV9qdWRnZXNfd2l0aF9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHQvtGB0YLQsNCyINGB0YPQtNC10Lkg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLLCDRgdC+0LTQtdGA0LbQsNGJ0LXQuSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBlYXRpbmdfanVkZ2VcIjogKG5hbWUpID0+IG5hbWUgKyBcIiDQstGB0YLRgNC10YfQsNC10YLRgdGPINCyINGB0L/QuNGB0LrQtSDRgdGD0LTQtdC5INCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGA0LDQt9CwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxfc2VydmVyX2Vycm9yXCI6IFtcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1XCIsIFwi0L/RgNC+0LLQtdGA0YzRgtC1INC70L7Qs9C4INC00LvRjyDQuNC90YTQvtGA0LzQsNGG0LjQuFwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2Rpc2NpcGxpbmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0LLRhdC+0LTRj9GJ0LXQs9C+INCyINGB0YPQtNC10LnRgdC60YPRjiDQsdGA0LjQs9Cw0LTRgyDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsCwg0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0YXQvtGC0Y8g0LHRiyDQsiDQvtC00L3QvtC8INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJydW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXRfcGVyZm9ybWVkX2ZsYWdfb25fZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGF0L7QtNCwINGE0LjQvdCw0LvQuNC30LjQvdC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNjb3JlX25vdF9leGlzdFwiOiBcItCf0L7Qv9GL0YLQutCwINC/0L7Qu9GD0YfQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC5INC+0YbQtdC90LrQuCDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgtGD0YAsINC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RidC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Njb3Jpbmdfc3lzdGVtXCI6IFwi0JLRi9Cx0YDQsNC90LAg0L3QtdC00L7Qv9GD0YHRgtC40LzQsNGPINGB0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3RvX25vbl9lbXB0eVwiOiAoZCkgPT4gW1wi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNCz0YDRg9C30LjRgtGMINGC0YPRgNGLINC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLCBg0JTQuNGB0YbQuNC/0LvQuNC90LAgJHtkfSDRg9C20LUg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRi2BdLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfZmluYWxpemVkXCI6IFwi0JTQu9GPINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LAg0L3QtSDQtNC+0L/Rg9GB0LrQsNC10YLRgdGPINC40LfQvNC10L3QtdC90LjQtSDQutCy0L7RgtGLINCy0YvQstC+0LTQsCwg0YLQuNC/0LAg0YLRg9GA0LAg0LjQu9C4INGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZVwiOiBcItCj0LTQsNC70LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2F2ZVwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGluZ1wiOiBcItCf0L7QtNC60LvRjtGH0LXQvdC40LUg0Log0YHQtdGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9wcm9ibGVtXCI6IFwi0J/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInllc1wiOiBcItCU0LBcIixcclxuICAgICAgICAgICAgICAgIFwibm9cIjogXCLQndC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fZXJyb3JcIjogXCLQn9C+0YXQvtC20LUsINC40LzQtdGO0YLRgdGPINC/0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlcnJvcl9oZWFkZXJcIjogXCLQntGI0LjQsdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiBcItCe0L/QtdGA0LDRhtC40Y8g0YPRgdC/0LXRiNC90L4g0LfQsNCy0LXRgNGI0LXQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYXRfblwiOiAobikgPT4gXCLQl9Cw0YXQvtC0IOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZV9uXCI6IChuKSA9PiBcItCb0LjQvdC10LnQvdGL0Lkg0YHRg9C00YzRjyDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfblwiOiAobiwgbmFtZSwgbl9zcCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAobl9zcCA+IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCk0L7RgNC80LXQudGI0L0g4oSWXCIgKyBuLnRvU3RyaW5nKCkgKyAobmFtZSA/IFwiOiBcIiArIG5hbWUgOiBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChuX3NwID09PSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwi0J/QsNGA0LAg4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCLQo9GH0LDRgdGC0L3QuNC6IOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKyBuLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdpbmdcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdF9hY3JvYmF0aWNfb3ZlcnJpZGVcIjogXCLQmNC30LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQntGB0YLQsNC90L7QstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00Ys/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwib2xkX3Njb3JlXCI6IFwi0JHQsNC30LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb2RlbHNcIjoge1xyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQtNC70Y8g0L/RgNC+0YLQvtC60L7Qu9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJ1bGVzX3NldFwiOiBcItCh0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5faXRlbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2VfbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcIlRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C7XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGFXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlc19sZWdlbmRcIjogKFxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LTEwMFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JPQuyDigJQg0LPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KIg4oCUINGB0YPQtNGM0Y8g0YLQsNC90YbQsDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JAg4oCUINGB0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60Lg8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCiZXgg4oCUINGC0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCLQmtCw0YLQtdCz0L7RgNC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC9LiBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KQuINCYLiDQni5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwi0KDQvtC70Ywg0LIg0YHRg9C00LXQudGB0YLQstC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVfZGVzY3JpcHRpb25cIjogXCLQlNC+0LvQttC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvbnNcIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX25hbWVcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX2NpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX25hbWVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwi0JjQvNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlclwiOiBcItCf0L7Qu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfZlwiOiBcItCWXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9tXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZXJhbF9pbmZvXCI6IFwi0J7RgdC90L7QstC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQvtC80LDQvdC00Ysg0YTQvtGA0LzQtdC50YjQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCLQpNCw0LzQuNC70LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByb2dyYW1zXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21hblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX25cIjogXCLQntGB0L0uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfeVwiOiBcItCX0LDQvy5cIixcclxuICAgICAgICAgICAgICAgIFwieWVhcl9vZl9iaXJ0aFwiOiBcItCT0L7QtCDRgNC+0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInlvYlwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2dyYW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X2ZvclwiOiBcItCf0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X3Byb2dyYW1cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19ob3BlX3RvdXJcIjogXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bV9hZHZhbmNlc1wiOiBcItCa0LLQvtGC0LAg0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19wZXJfaGVhdFwiOiBcItCj0YfQsNGB0YLQvdC40LrQvtCyINCyINC30LDRhdC+0LTQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY29yaW5nX3N5c3RlbV9uYW1lXCI6IFwi0KHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2hlYXRcIjogXCLQodCx0YDQvtGBINC90L7QvNC10YDQsCDQt9Cw0YXQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfcGxhY2VcIjogXCLQodCx0YDQvtGBINC80LXRgdGC0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlc1wiOiBcItCc0LXRgdGC0LAg0LTQu9GPINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInByZXNlbnRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2JlZ2lubmluZ1wiOiBcItCd0LDRh9Cw0LvQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfZHVyYXRpb25cIjogXCLQlNC70LjRgi5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fYWN0aXZlX3RvdXJcIjogXCLQndC10YIg0LDQutGC0LjQstC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFzZV9uYW1lXCI6IFwi0KDQvtGB0KTQkNCg0KBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImNsYXNzIFJ1bGVzU2V0TG9hZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWQobW9kdWxlX25hbWUsIGRhdGEpIHtcclxuICAgICAgICBjb25zdCBLRVlTID0gW1widG91cl9yZXN1bHRzX3RhYmxlXzFcIiwgXCJ0b3VyX3Jlc3VsdHNfdGFibGVfMlwiLCBcInRvdXJfcmVzdWx0c190YWJsZV8zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c190YWJsZVwiLCBcImp1ZGdlX3RhYmxldFwiLCBcImFkbWluX3Njb3JlX2lucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcImdldF9qdWRnZV90YWJsZV9tYXJrXCJdO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIEtFWVMpIHtcclxuICAgICAgICAgICAgaWYgKCEoa2V5IGluIGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1vZHVsZSAke21vZHVsZV9uYW1lfSBkb2Vzbid0IGV4cG9ydCAke2tleX0gY2xhc3MuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpc1tgXyR7a2V5fWBdID0gZGF0YVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAoS0VZUy5pbmRleE9mKGtleSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYE1vZHVsZSAke21vZHVsZV9uYW1lfSBleHBvcnRzIHVua25vd24gJHtrZXl9IHBhcmFtZXRlci5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBBZGRlZCBzY29yaW5nIHN5c3RlbTogJHttb2R1bGVfbmFtZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2hlY2tJZkxvYWRlZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xvYWRlZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzY29yaW5nIHN5c3RlbSB3YXMgbG9hZGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG91cl9yZXN1bHRzX3RhYmxlXzEoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJZkxvYWRlZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b3VyX3Jlc3VsdHNfdGFibGVfMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG91cl9yZXN1bHRzX3RhYmxlXzIoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJZkxvYWRlZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b3VyX3Jlc3VsdHNfdGFibGVfMjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG91cl9yZXN1bHRzX3RhYmxlXzMoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJZkxvYWRlZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b3VyX3Jlc3VsdHNfdGFibGVfMztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGlzY2lwbGluZV9yZXN1bHRzX3RhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSWZMb2FkZWQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzY2lwbGluZV9yZXN1bHRzX3RhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBqdWRnZV90YWJsZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJZkxvYWRlZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9qdWRnZV90YWJsZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFkbWluX3Njb3JlX2lucHV0KCkge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSWZMb2FkZWQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWRtaW5fc2NvcmVfaW5wdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdldF9qdWRnZV90YWJsZV9tYXJrKCkge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSWZMb2FkZWQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0X2p1ZGdlX3RhYmxlX21hcms7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGxvYWRlciA9IG5ldyBSdWxlc1NldExvYWRlcigpO1xyXG5cclxud2luZG93LnJlZ2lzdGVyUnVsZXNTZXQgPSBmdW5jdGlvbigpIHtcclxuICAgIGxvYWRlci5sb2FkKC4uLmFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvYWRlcjtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IHNob3dFcnJvciB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5cclxuY2xhc3MgQXBpSW1wbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSAobXNnLCBjb2RlLCBhcmdzKSA9PiBzaG93RXJyb3IoY29kZSA/IF8oY29kZSwgLi4uYXJncykgOiBtc2cpO1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9ICguLi5kYXRhKSA9PiBjb25zb2xlLmVycm9yKFwiQVBJIGZhaWxcIiwgLi4uZGF0YSk7XHJcbiAgICAgICAgdGhpcy5jYl9kb25lID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuICAgIG9uRG9uZShjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25TdWNjZXNzKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvbkVycm9yKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25GYWlsKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhZGRUb0RCKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBzdD1zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBzdC5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCByZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2VuZCgpIHtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIFwiL2FwaVwiLCB0cnVlKTtcclxuICAgICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuIiwiaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uX3N0YXR1cyB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcblxyXG5cclxuY2xhc3MgTWVzc2FnZURpc3BhdGNoZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzX2NudCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGluZyB0byB3ZWJzb2NrZXQuLi5cIik7XHJcbiAgICAgICAgdGhpcy53cyA9IG5ldyBTb2NrSlMoXCJodHRwOi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIFwiL3dzXCIpO1xyXG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldE9rKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkLlwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogW1tcInJlbG9hZF9kYXRhXCIsIG51bGxdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxfdXBkYXRlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25fc3RhdHVzLnNldEZhaWwoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNvbm5lY3QuYmluZCh0aGlzKSwgNTAwKTtcclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb25NZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICBpZiAoZGF0YVtcImNsaWVudF9pZFwiXSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xpZW50X2lkID0gZGF0YVtcImNsaWVudF9pZFwiXTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLm1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgbXNnX3R5cGUgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICBsZXQgbXNnX2RhdGEgPSBkYXRhWzFdO1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAobXNnX3R5cGUgPT09IFwiZm9yY2VfcmVmcmVzaFwiKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fSkuZm9yRWFjaCgoa2V5KSA9PiBsaXN0ZW5lcnNba2V5XShtc2dfZGF0YSkpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRhdGEubW9kZWxfdXBkYXRlcy5mb3JFYWNoKChtb2RlbF9pbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHN0b3JhZ2UudXBkYXRlTW9kZWwobW9kZWxfaW5mby5tb2RlbCwgbW9kZWxfaW5mby5pZCwgbW9kZWxfaW5mby5kYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGRhdGFfY2hhbmdlZCkge1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbXCJkYl91cGRhdGVcIl0gfHwge307XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRMaXN0ZW5lcklkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc19jbnQrKztcclxuICAgIH1cclxuICAgIGFkZExpc3RlbmVyKG1zZ190eXBlcywgY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLmdldExpc3RlbmVySWQoKTtcclxuICAgICAgICBtc2dfdHlwZXMuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24obXNnX3R5cGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21zZ190eXBlXVtpZF0gPSBjYWxsYmFjaztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyX2lkKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1trZXldW2xpc3RlbmVyX2lkXTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuaWYgKCF3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyKSB7XHJcbiAgICB3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XHJcbn1cclxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSB3aW5kb3cubWVzc2FnZV9kaXNwYXRjaGVyO1xyXG4iLCJjbGFzcyBSZWYge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSwgaWQpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubW9kZWxfbmFtZSkuYnlfaWQodGhpcy5pZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIGlkLCBtb2RlbF9zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX19zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzID0ge307XHJcbiAgICAgICAgdGhpcy5fX21vZGVsX3N0b3JhZ2UgPSBtb2RlbF9zdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkQmFja1JlZihrZXksIHJlZikge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHJlZjtcclxuICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgIH1cclxuICAgIHVwZGF0ZShkYXRhLCBjcmVhdGU9dHJ1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IGlkeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIiB8fCBpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjcmVhdGUgJiYgdHlwZW9mIHRoaXNbaWR4LnNsaWNlKDEpXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZHguY2hhckF0KDApID09PSBcIipcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IFtdXHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCB0aGlzLl9fbW9kZWxfc3RvcmFnZS5tb2RlbF9uYW1lLCB0aGlzLmlkKTtcclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZl9rZXkgPSBkYXRhW2lkeF0uYmFja19yZWY7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2lkeF0uY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihuZXN0ZWRfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEuZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWYgPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZi5nZXQoKS5hZGRCYWNrUmVmKGJhY2tfcmVmX2tleSwgYmFja19yZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XS5wdXNoKHJlZik7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCIqXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVzdGVkX2RhdGEgPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpZHhdID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1tpZHhdID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNlcmlhbGl6ZShzY2hlbWEpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0ge31cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fX2tleV90eXBlcykgaWYgKHRoaXMuX19rZXlfdHlwZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX19rZXlfdHlwZXNba2V5XSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiKlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5tYXAoZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWYuZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiXlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSBpbiBzY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQuaWQgPSB0aGlzLmlkXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWxzU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGQoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxzW2lkXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0gPSBuZXcgTW9kZWwodGhpcy5zdG9yYWdlLCBpZCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoaWQsIGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbHNbaWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXS51cGRhdGUoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYnlfaWQoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbaWRdO1xyXG4gICAgfVxyXG4gICAgYWxsKCkge1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tb2RlbHMpO1xyXG4gICAgICAgIHJldHVybiBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2tleV07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZG9tYWlucyA9IHt9XHJcbiAgICB9XHJcbiAgICBnZXREb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRvbWFpbnNbZG9tYWluXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRvbWFpbnNbZG9tYWluXSA9IG5ldyBTdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGRlbERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBnZXQobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID0gbmV3IE1vZGVsc1N0b3JhZ2UodGhpcywgbW9kZWxfbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgZGVsKG1vZGVsX25hbWUpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsX3R5cGUsIG1vZGVsX2lkLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX3R5cGVdKSB7XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmRvbWFpbnMpLmZvckVhY2goKGtleSkgPT5cclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5kb21haW5zW2tleV0udXBkYXRlTW9kZWwoLi4uYXJndW1lbnRzKSB8fCBkYXRhX2NoYW5nZWQpO1xyXG4gICAgICAgIC8vIHJldHVybiBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgc3R5bGU9e3sgXCJoZWlnaHRcIjogXCIxMDAlXCIsIFwid2lkdGhcIjogXCIxMDAlXCIgfX0+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIgfX0+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvaW1nL2FqYXgtbG9hZGVyLmdpZlwiIC8+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXNNb2NrIHtcclxuICAgIHNldE9rKCkge31cclxuICAgIHNldEZhaWwoKSB7fVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFwiY29ubmVjdGVkXCI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbm5lY3Rpb25fc3RhdHVzXCIpO1xyXG4gICAgICAgIGlmIChlbGVtZW50ICYmICFlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgPENvbm5lY3Rpb25TdGF0dXMgLz4sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvblN0YXR1c01vY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRPaygpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IHRydWUsIHRpY2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0RmFpbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgb2tcIj48L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3RpbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LWRhbmdlclwiICsgKHRoaXMuc3RhdGUudGljayA/IFwiIHRpY2tcIiA6IFwiXCIpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW9uX3Byb2JsZW1cIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29ubmVjdGlvbl9zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmluaXQoKTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XHJcbiAgICBsZXQgdGl0bGUgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMF0gOiBfKFwiZ2xvYmFsLm1lc3NhZ2VzLmVycm9yX2hlYWRlclwiKTtcclxuICAgIGxldCB0ZXh0ID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzFdIDogbXNnO1xyXG4gICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDb25maXJtKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkge1xyXG4gICAgcmV0dXJuIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxyXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxyXG4gICAgfSwgYWN0aW9uKTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgUHJpbnRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgdGl0bGUxOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICB0aXRsZTI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIHRpdGxlMzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgYm9keTogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGZldGNoUHJpbnRhYmxlRGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pbm5lckhUTUw7XHJcbiAgICB9XHJcbiAgICByZW5kZXJIZWFkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGVhZGVyID8gPGRpdiBjbGFzc05hbWU9XCJwLWhlYWRlclwiPnsgdGhpcy5wcm9wcy5oZWFkZXIgfTwvZGl2PiA6IG51bGw7XHJcbiAgICB9XHJcbiAgICByZW5kZXJUaXRsZTEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUxID8gPGgxPnsgdGhpcy5wcm9wcy50aXRsZTEgfTwvaDE+IDogbnVsbDtcclxuICAgIH1cclxuICAgIHJlbmRlclRpdGxlMigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTIgPyA8aDI+eyB0aGlzLnByb3BzLnRpdGxlMiB9PC9oMj4gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyVGl0bGUzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMyA/IDxoMz57IHRoaXMucHJvcHMudGl0bGUzIH08L2gzPiA6IG51bGw7XHJcbiAgICB9XHJcbiAgICByZW5kZXJCb2R5KCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtY29udGVudFwiXHJcbiAgICAgICAgICAgICAgICByZWY9eyBlID0+IHRoaXMuX2JvZHkgPSBlIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmJvZHkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicHJpbnRhYmxlXCI+XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTEoKSB9XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTIoKSB9XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTMoKSB9XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xyXG5cclxuaW1wb3J0IHJ1bGVzX3NldCBmcm9tIFwicnVsZXNfc2V0cy9sb2FkZXJcIjtcclxuXHJcbmltcG9ydCBQYXBlciBmcm9tIFwiQWRtaW5QYW5lbC9jb21tb24vUGFwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdyYXBwZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYXV0b0RvY3g6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG9uRG9uZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoUFQub2JqZWN0LmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3gub25Eb25lKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VQcmludGFibGVSZWYgPSAocmVmKSA9PiB0aGlzLl9wcmludGFibGUgPSByZWY7XHJcblxyXG4gICAgaGFuZGxlU2lnbmFsID0gKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcclxuICAgICAgICBjYXNlIFwiZG9jeFwiOlxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckJvZHkoKSB7XHJcbiAgICAgICAgY29uc3QgUmVuZGVyaW5nQ29tcG9uZW50ID0gcnVsZXNfc2V0LmRpc2NpcGxpbmVfcmVzdWx0c190YWJsZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8UmVuZGVyaW5nQ29tcG9uZW50IHsgLi4udGhpcy5wcm9wcyB9IC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8UGFwZXJcclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IHRoaXMucHJvcHMuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICAgICAgcmVmPXsgdGhpcy5tYWtlUHJpbnRhYmxlUmVmIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMT17IF8oXCJhZG1pbi5oZWFkZXJzLmRpc2NpcGxpbmVfcmVzdWx0c1wiKSB9XHJcbiAgICAgICAgICAgICAgICB0aXRsZTM9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmUubmFtZSB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxyXG4gICAgICAgICAgICA8L1BhcGVyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRG9jeChmaWxlbmFtZT1cImRpc2NpcGxpbmUtcmVzdWx0cy5kb2N4XCIpIHtcclxuICAgICAgICBEb2N4KGZpbGVuYW1lKVxyXG4gICAgICAgICAgICAuc2V0SGVhZGVyKHRoaXMucHJvcHMuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMuZGlzY2lwbGluZV9yZXN1bHRzXCIpKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUzKHRoaXMucHJvcHMuZGlzY2lwbGluZS5uYW1lKVxyXG4gICAgICAgICAgICAuc2V0Qm9keSh0aGlzLl9wcmludGFibGUuZ2V0UHJpbnRhYmxlSFRNTCgpKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG91ci1uYW1lXCIsIFwiYmFja2dyb3VuZFwiLCBcIiNkZGRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGQsIC5ib3JkZXJlZC10YWJsZSAuc3BvcnRzbWVuIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNwb3J0c21lbiB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zcG9ydHNtZW4gdGhcIiwgXCJwYWRkaW5nXCIsIFwiMFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc3BvcnRzbWVuXCIsIFwid2lkdGhcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgIC5zYXZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbldyYXBwZXIuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfSnVkZ2luZ19EaXNjaXBsaW5lUGFuZWxfRGlzY2lwbGluZVJlc3VsdHNUYWJfV3JhcHBlclwiO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSBcInVpL3ByaW50YWJsZVwiO1xyXG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XHJcblxyXG5pbXBvcnQgRGlzY2lwbGluZVJlc3VsdHMgZnJvbSBcImNvbW1vbi9EaXNjaXBsaW5lUmVzdWx0c1wiO1xyXG5cclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzY2lwbGluZVJlc3VsdHNUYWIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYXV0b0RvY3g6IFBULm9iamVjdCxcclxuICAgICAgICAgICAgZGlzY2lwbGluZTogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVJlc3VsdHNSZWYgPSAocmVmKSA9PiB0aGlzLl9yZXN1bHRzID0gcmVmO1xyXG5cclxuICAgIGhhbmRsZVNpZ25hbCA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fcmVzdWx0cy5oYW5kbGVTaWduYWwobWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVuZGVyaW5nXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxEaXNjaXBsaW5lUmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9eyB0aGlzLnByb3BzLmF1dG9Eb2N4IH1cclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVJZD17IHRoaXMucHJvcHMuZGlzY2lwbGluZS5pZCB9XHJcbiAgICAgICAgICAgICAgICByZWY9eyB0aGlzLm1ha2VSZXN1bHRzUmVmIH1cclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyPXsgV3JhcHBlciB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbkRpc2NpcGxpbmVSZXN1bHRzVGFiLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX0p1ZGdpbmdfRGlzY2lwbGluZVBhbmVsX0Rpc2NpcGxpbmVSZXN1bHRzVGFiXCI7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwYXJ0aWNpcGFudDogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgY2x1YjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy04XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBhcnRpY2lwYW50Lm51bWJlciB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBhcnRpY2lwYW50Lm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5wYXJ0aWNpcGFudC5jbHViLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUm93LmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX0p1ZGdpbmdfVG91clBhbmVsX0hlYXRzVGFiX1Jvd1wiO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xyXG5cclxuaW1wb3J0IFBhcGVyIGZyb20gXCJBZG1pblBhbmVsL2NvbW1vbi9QYXBlclwiO1xyXG5cclxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzVGFiIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGF1dG9Eb2N4OiBQVC5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBvbkRvbmU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGlkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR1cFN0b3JhZ2UoKTtcclxuICAgICAgICB0aGlzLnJlbG9hZF9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEpO1xyXG4gICAgICAgIHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuaWQgIT09IG5leHRfcHJvcHMudG91ci5pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmZyZWVTdG9yYWdlKHRoaXMucHJvcHMudG91ci5pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBTdG9yYWdlKG5leHRfcHJvcHMudG91ci5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZfcHJvcHMsIHBzKSB7XHJcbiAgICAgICAgaWYgKHByZXZfcHJvcHMudG91ci5pZCAhPT0gdGhpcy5wcm9wcy50b3VyLmlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0RvY3ggJiYgIXRoaXMuX2RvY3hfZG9uZSAmJiB0aGlzLnN0YXRlLnRvdXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZG9jeF9kb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4Lm9uRG9uZSh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5mcmVlU3RvcmFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTQ0hFTUEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZToge1xyXG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBydW5zOiB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBTdG9yYWdlKHRvdXJfaWQ9bnVsbCkge1xyXG4gICAgICAgIGlmICh0b3VyX2lkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRvdXJfaWQgPSB0aGlzLnByb3BzLnRvdXIuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKGBoZWF0c18ke3RvdXJfaWR9YCk7XHJcbiAgICB9XHJcbiAgICBmcmVlU3RvcmFnZSh0b3VyX2lkPW51bGwpIHtcclxuICAgICAgICBpZiAodG91cl9pZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0b3VyX2lkID0gdGhpcy5wcm9wcy50b3VyLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yYWdlLmRlbERvbWFpbihgaGVhdHNfJHt0b3VyX2lkfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbG9hZEZyb21TdG9yYWdlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKVxyXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy50b3VyLmlkKVxyXG4gICAgICAgICAgICAuc2VyaWFsaXplKHRoaXMuU0NIRU1BKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIEFwaShcInRvdXIuZ2V0XCIsIHtcclxuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyLmlkLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5TQ0hFTUEsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMucHJvcHMudG91ci5pZCwgdGhpcy5zdG9yYWdlKVxyXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlUHJpbnRhYmxlUmVmID0gKHJlZikgPT4gdGhpcy5fcHJpbnRhYmxlID0gcmVmO1xyXG5cclxuICAgIGhhbmRsZVNpZ25hbCA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlKSB7XHJcbiAgICAgICAgY2FzZSBcImRvY3hcIjpcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEb2N4KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBtZXNzYWdlOlwiLCBtZXNzYWdlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJIZWF0SGVhZGVyKHByZXZfcm93LCBuZXh0X3Jvdykge1xyXG4gICAgICAgIGNvbnN0IG5lZWRfcmVuZGVyID0gKHR5cGVvZiBwcmV2X3JvdyA9PT0gXCJ1bmRlZmluZWRcIikgfHwgKHByZXZfcm93LmhlYXQgIT09IG5leHRfcm93LmhlYXQpXHJcbiAgICAgICAgaWYgKCFuZWVkX3JlbmRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRyIGtleT17IFwiSFwiICsgbmV4dF9yb3cuaGVhdCB9PlxyXG4gICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImhlYXQtbnVtYmVyXCIgY29sU3Bhbj1cIjNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLnBocmFzZXMuaGVhdF9uXCIsIG5leHRfcm93LmhlYXQpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb3dzKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBsZXQgcnVucyA9IHRoaXMuc3RhdGUudG91ci5ydW5zO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVucy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLnJlbmRlckhlYXRIZWFkZXIocnVuc1tpIC0gMV0sIHJ1bnNbaV0pO1xyXG4gICAgICAgICAgICBpZiAoaGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChoZWFkZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxyXG4gICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaV0uaWQgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50PXsgcnVuc1tpXS5wYXJ0aWNpcGFudCB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TG9hZGVyIC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxQYXBlclxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICAgICAgcmVmPXsgdGhpcy5tYWtlUHJpbnRhYmxlUmVmIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMT17IF8oXCJhZG1pbi5oZWFkZXJzLnRvdXJfaGVhdHNcIikgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9XHJcbiAgICAgICAgICAgICAgICB0aXRsZTM9eyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG91ci1oZWF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImp1ZGdpbmcubGFiZWxzLm51bWJlclwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJqdWRnaW5nLmxhYmVscy5wYXJ0aWNpcGFudF9uYW1lXCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImp1ZGdpbmcubGFiZWxzLmNsdWJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSb3dzKCkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9QYXBlcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURvY3goZmlsZW5hbWU9XCJ0b3VyLWhlYXRzLmRvY3hcIikge1xyXG4gICAgICAgIERvY3goZmlsZW5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9oZWF0c1wiKSlcclxuICAgICAgICAgICAgLnNldFRpdGxlMih0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUzKHRoaXMuc3RhdGUudG91ci5uYW1lKVxyXG4gICAgICAgICAgICAuc2V0Qm9keSh0aGlzLl9wcmludGFibGUuZ2V0UHJpbnRhYmxlSFRNTCgpKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuaGVhdC1udW1iZXJcIiwgXCJiYWNrZ3JvdW5kXCIsIFwiI2NjY1wiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuaGVhdC1udW1iZXJcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCJ0ZCwgdGhcIiwgXCJmb250LXNpemVcIiwgXCIxMnB0XCIpXHJcbiAgICAgICAgICAgIC5zYXZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkhlYXRzVGFiLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX0p1ZGdpbmdfVG91clBhbmVsX0hlYXRzVGFiXCI7XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xyXG5cclxuaW1wb3J0IHJ1bGVzX3NldCBmcm9tIFwicnVsZXNfc2V0cy9sb2FkZXJcIjtcclxuXHJcbmltcG9ydCBQYXBlciBmcm9tIFwiQWRtaW5QYW5lbC9jb21tb24vUGFwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdyYXBwZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYXV0b0RvY3g6IFBULnNoYXBlKHtcclxuICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG9uRG9uZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFibGU6IFBULmFycmF5T2YoUFQub2JqZWN0LmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHRvdXI6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB2ZXJib3NpdHk6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVEb2N4KHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3gub25Eb25lKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VQcmludGFibGVSZWYgPSAocmVmKSA9PiB0aGlzLl9wcmludGFibGUgPSByZWY7XHJcblxyXG4gICAgaGFuZGxlU2lnbmFsID0gKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UpIHtcclxuICAgICAgICBjYXNlIFwiZG9jeFwiOlxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFJlbmRlcmluZ0NvbXBvbmVudCgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudmVyYm9zaXR5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIHJ1bGVzX3NldC50b3VyX3Jlc3VsdHNfdGFibGVfMTtcclxuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gcnVsZXNfc2V0LnRvdXJfcmVzdWx0c190YWJsZV8yO1xyXG4gICAgICAgICAgICBjYXNlIDM6IHJldHVybiBydWxlc19zZXQudG91cl9yZXN1bHRzX3RhYmxlXzM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyQm9keSgpIHtcclxuICAgICAgICBjb25zdCBSZW5kZXJpbmdDb21wb25lbnQgPSB0aGlzLmdldFJlbmRlcmluZ0NvbXBvbmVudCgpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxSZW5kZXJpbmdDb21wb25lbnQgeyAuLi50aGlzLnByb3BzIH0gLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxQYXBlclxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICAgICAgcmVmPXsgdGhpcy5tYWtlUHJpbnRhYmxlUmVmIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMT17IF8oXCJhZG1pbi5oZWFkZXJzLnRvdXJfcmVzdWx0c1wiKSB9XHJcbiAgICAgICAgICAgICAgICB0aXRsZTI9eyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMz17IHRoaXMucHJvcHMudG91ci5uYW1lIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XHJcbiAgICAgICAgICAgIDwvUGFwZXI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwidG91ci1yZXN1bHRzLmRvY3hcIikge1xyXG4gICAgICAgIERvY3goZmlsZW5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRNYXJnaW5zKFsxMCwgMTAsIDE1LCAxMF0pXHJcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5wcm9wcy50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUyKHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5wcm9wcy50b3VyLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRCb2R5KHRoaXMuX3ByaW50YWJsZS5nZXRQcmludGFibGVIVE1MKCkpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZVwiLCBcImZvbnQtc2l6ZVwiLCB0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gMSA/IFwiMTJwdFwiIDogXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcInBhZGRpbmdcIiwgXCIwIDNwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJib3JkZXJcIiwgXCIwLjVwdCBzb2xpZCBibGFja1wiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJmb250LXNpemVcIiwgXCI5cHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiYm9yZGVyXCIsIFwibm9uZVwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInBhZGRpbmdcIiwgXCIwIDFwdCAwIDBcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAwIDAgMXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0ZFwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duXCIsIFwid2lkdGhcIiwgXCI1MHB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIudG90YWwtc2NvcmVcIiwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmhlYWRfanVkZ2VcIiwgXCJ3aWR0aFwiLCBcIjUlXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5kYW5jZV9qdWRnZVwiLCBcIndpZHRoXCIsIFwiOCVcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmFjcm9fanVkZ2VcIiwgXCJ3aWR0aFwiLCBcIjglXCIpXHJcbiAgICAgICAgICAgIC5zYXZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbldyYXBwZXIuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfSnVkZ2luZ19Ub3VyUGFuZWxfVG91clJlc3VsdHNUYWJfV3JhcHBlclwiO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSBcInVpL3ByaW50YWJsZVwiO1xyXG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XHJcblxyXG5pbXBvcnQgVG91clJlc3VsdHMgZnJvbSBcImNvbW1vbi9Ub3VyUmVzdWx0c1wiO1xyXG5cclxuaW1wb3J0IFdyYXBwZXIgZnJvbSBcIi4vV3JhcHBlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91clJlc3VsdHNUYWIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYXV0b0RvY3g6IFBULm9iamVjdCxcclxuICAgICAgICAgICAgdG91cjogUFQuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICB2ZXJib3NpdHk6IFBULm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVJlc3VsdHNSZWYgPSAocmVmKSA9PiB0aGlzLl9yZXN1bHRzID0gcmVmO1xyXG5cclxuICAgIGhhbmRsZVNpZ25hbCA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fcmVzdWx0cy5oYW5kbGVTaWduYWwobWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVuZGVyaW5nXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUb3VyUmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgYXV0b0RvY3g9eyB0aGlzLnByb3BzLmF1dG9Eb2N4IH1cclxuICAgICAgICAgICAgICAgIHJlZj17IHRoaXMubWFrZVJlc3VsdHNSZWYgfVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI9eyBXcmFwcGVyIH1cclxuICAgICAgICAgICAgICAgIHRvdXJJZD17IHRoaXMucHJvcHMudG91ci5pZCB9XHJcbiAgICAgICAgICAgICAgICB2ZXJib3NpdHk9eyB0aGlzLnByb3BzLnZlcmJvc2l0eSB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblRvdXJSZXN1bHRzVGFiLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX0p1ZGdpbmdfVG91clBhbmVsX1RvdXJSZXN1bHRzVGFiXCI7XHJcbiIsImltcG9ydCBIZWF0c1RhYiBmcm9tIFwiQWRtaW5QYW5lbC9KdWRnaW5nL1RvdXJQYW5lbC9IZWF0c1RhYlwiO1xuaW1wb3J0IFRvdXJSZXN1bHRzVGFiIGZyb20gXCJBZG1pblBhbmVsL0p1ZGdpbmcvVG91clBhbmVsL1RvdXJSZXN1bHRzVGFiXCI7XG5pbXBvcnQgRGlzY2lwbGluZVJlc3VsdHNUYWIgZnJvbSBcIkFkbWluUGFuZWwvSnVkZ2luZy9Ub3VyUGFuZWwvRGlzY2lwbGluZVJlc3VsdHNUYWJcIjtcbmltcG9ydCBUZXN0UGFnZSBmcm9tIFwiLi9UZXN0UGFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RpdmVKb2IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHF1ZXVlSXRlbTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHRvdXI6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uRG9uZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNyZWF0ZUZpbGVuYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJhdXRvcHJpbnRlcl9cIiArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vLCBcIlwiKS5zbGljZSgxKSArIFwiLnRtcFwiO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnF1ZXVlSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZG9jeF9wYXJhbXMgPSB7IGZpbGVuYW1lOiB0aGlzLmNyZWF0ZUZpbGVuYW1lKCksIG9uRG9uZTogdGhpcy5wcm9wcy5vbkRvbmUgfTtcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLnF1ZXVlSXRlbS50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJoZWF0c1wiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8SGVhdHNUYWJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0RvY3g9eyBkb2N4X3BhcmFtcyB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnF1ZXVlSXRlbS50b3VyIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcInJlc3VsdHNfMVwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VG91clJlc3VsdHNUYWJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0RvY3g9eyBkb2N4X3BhcmFtcyB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnF1ZXVlSXRlbS50b3VyIH1cbiAgICAgICAgICAgICAgICAgICAgdmVyYm9zaXR5PXsgMSB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXzJcIjpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFRvdXJSZXN1bHRzVGFiXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Eb2N4PXsgZG9jeF9wYXJhbXMgfVxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy5xdWV1ZUl0ZW0udG91ciB9XG4gICAgICAgICAgICAgICAgICAgIHZlcmJvc2l0eT17IDIgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwicmVzdWx0c18zXCI6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxUb3VyUmVzdWx0c1RhYlxuICAgICAgICAgICAgICAgICAgICBhdXRvRG9jeD17IGRvY3hfcGFyYW1zIH1cbiAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMucXVldWVJdGVtLnRvdXIgfVxuICAgICAgICAgICAgICAgICAgICB2ZXJib3NpdHk9eyAzIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RGlzY2lwbGluZVJlc3VsdHNUYWJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0RvY3g9eyBkb2N4X3BhcmFtcyB9XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmU9eyB0aGlzLnByb3BzLnF1ZXVlSXRlbS50b3VyLmRpc2NpcGxpbmUgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwidGVzdFwiOlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8VGVzdFBhZ2VcbiAgICAgICAgICAgICAgICAgICAgYXV0b0RvY3g9eyBkb2N4X3BhcmFtcyB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBqb2IgdHlwZTpcIiwgdGhpcy5wcm9wcy5xdWV1ZUl0ZW0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5BY3RpdmVKb2IuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfU2VydmljZV9BdXRvUHJpbnRlcl9Kb2JRdWV1ZV9BY3RpdmVKb2JcIjtcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IERvY3ggfSBmcm9tIFwiY29tbW9uL2RvY3hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGF1dG9Eb2N4OiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZmlsZW5hbWU6IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIG9uRG9uZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy5wcm9wcy5hdXRvRG9jeC5vbkRvbmUodGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgfVxuXG4gICAgbWFrZUNvbnRlbnRSZWYgPSAocmVmKSA9PiB0aGlzLl9jb250ZW50ID0gcmVmO1xuXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgcmVmPXsgdGhpcy5tYWtlQ29udGVudFJlZiB9PlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIudGVzdF90ZXh0XCIpIH1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwidGVzdC1wYWdlLmRvY3hcIikge1xuICAgICAgICBEb2N4KGZpbGVuYW1lKVxuICAgICAgICAgICAgLnNldEJvZHkodGhpcy5fY29udGVudC5pbm5lckhUTUwpXG4gICAgICAgICAgICAuc2F2ZSgpO1xuICAgIH1cbn1cblxuVGVzdFBhZ2UuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfU2VydmljZV9BdXRvUHJpbnRlcl9Kb2JRdWV1ZV9UZXN0UGFnZVwiO1xuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJsMTBuL2xvYWRlclwiO1xuXG5pbXBvcnQgQWN0aXZlSm9iIGZyb20gXCIuL0FjdGl2ZUpvYlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JRdWV1ZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcXVldWU6IFtdLFxuICAgICAgICAgICAgbm93UmVuZGVyaW5nOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlSm9iKCk7XG4gICAgfVxuXG4gICAgYWRkSm9iID0gKGpvYl90eXBlLCB0b3VyLCBjb3BpZXMpID0+IHtcbiAgICAgICAgbGV0IG5ld19xdWV1ZSA9IHRoaXMuc3RhdGUucXVldWUuc2xpY2UoKTsgLy8gY2xvbmVcbiAgICAgICAgbmV3X3F1ZXVlLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogam9iX3R5cGUsXG4gICAgICAgICAgICB0b3VyOiB0b3VyLFxuICAgICAgICAgICAgY29waWVzOiBjb3BpZXMsXG4gICAgICAgICAgICBpZDogTWF0aC5yYW5kb20oKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IG5ld19xdWV1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNjaGVkdWxlSm9iID0gKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMucHJvY2Vzc0pvYiwgMTAwMCk7XG4gICAgfVxuICAgIHByb2Nlc3NKb2IgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLm5vd1JlbmRlcmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBqb2IgPSB0aGlzLnN0YXRlLnF1ZXVlWzBdO1xuICAgICAgICBpZiAoIWpvYikge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZUpvYigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMucmV0cnlKb2IsIDEwMDAwKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBxdWV1ZTogdGhpcy5zdGF0ZS5xdWV1ZS5zbGljZSgxKSxcbiAgICAgICAgICAgIG5vd1JlbmRlcmluZzogam9iLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0cnlKb2IgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IFt0aGlzLnN0YXRlLm5vd1JlbmRlcmluZ10uY29uY2F0KHRoaXMuc3RhdGUucXVldWUpLFxuICAgICAgICAgICAgbm93UmVuZGVyaW5nOiBudWxsLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZUpvYigpO1xuICAgIH1cbiAgICBoYW5kbGVEb2N4Q3JlYXRlZCA9IChmaWxlbmFtZSkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGpvYiA9IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nO1xuICAgICAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgbGV0IGFkZHJlc3MgPSBgaHR0cDovLzEyNy4wLjAuMTo1OTQ5L3ByaW50LWRvY3g/ZmlsZW5hbWU9JHsgZmlsZW5hbWUgfSZjb3BpZXM9JHsgam9iLmNvcGllcyB9YDtcbiAgICAgICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIGFkZHJlc3MsIHRydWUpO1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHt9O1xuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB0aGlzLmFkZEpvYihqb2IudHlwZSwgam9iLnRvdXIsIGpvYi5jb3BpZXMpO1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIG5vd1JlbmRlcmluZzogbnVsbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZUpvYigpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG4gICAgcmVuZGVyQWN0aXZlSm9iKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUubm93UmVuZGVyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEFjdGl2ZUpvYlxuICAgICAgICAgICAgICAgIGtleT1cImFjdGl2ZS1qb2JcIlxuICAgICAgICAgICAgICAgIHF1ZXVlSXRlbT17IHRoaXMuc3RhdGUubm93UmVuZGVyaW5nIH1cbiAgICAgICAgICAgICAgICBvbkRvbmU9eyB0aGlzLmhhbmRsZURvY3hDcmVhdGVkIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWUgcXVldWUtZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnF1ZXVlX2VtcHR5XCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQWN0aXZlSm9iKCkgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWVcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUucXVldWUubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIGtleT17IGl0ZW0uaWQgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaXRlbS50eXBlID09PSBcInRlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIudGVzdF9wYWdlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYCR7aXRlbS50b3VyLmRpc2NpcGxpbmUubmFtZX0g4oCUICR7aXRlbS50b3VyLm5hbWV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKGBhZG1pbi5hdXRvX3ByaW50ZXIuJHtpdGVtLnR5cGV9YCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvcGllc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaXRlbS5jb3BpZXMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQWN0aXZlSm9iKCkgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Kb2JRdWV1ZS5kaXNwbGF5TmFtZSA9IFwiQWRtaW5QYW5lbF9TZXJ2aWNlX0F1dG9QcmludGVyX0pvYlF1ZXVlXCI7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3Rpb246IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgYWN0aXZlQ2VsbDogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgIGFjdGlvbjogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgdG9rZW46IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHRvdXJfaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0b3VyOiBQVC5zaGFwZSh7XG4gICAgICAgICAgICAgICAgaWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHZhbHVlOiBQVC5vbmVPZlR5cGUoW1BULm51bWJlci5pc1JlcXVpcmVkLCBQVC5zdHJpbmcuaXNSZXF1aXJlZF0pLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uTW92ZTogUFQuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2X3Byb3BzKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5hY3RpdmVDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZfcHJvcHMuYWN0aXZlQ2VsbCAmJiBwcmV2X3Byb3BzLmFjdGl2ZUNlbGwudG9rZW4gPT09IHRoaXMucHJvcHMuYWN0aXZlQ2VsbC50b2tlbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWN0aXZlQ2VsbC50b3VyX2lkID09PSB0aGlzLnByb3BzLnRvdXIuaWQgJiZcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWN0aXZlQ2VsbC5hY3Rpb24gPT09IHRoaXMucHJvcHMuYWN0aW9uXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQuc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYWtlSW5wdXRSZWYgPSAocmVmKSA9PiB0aGlzLl9pbnB1dCA9IHJlZjtcblxuICAgIGhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSkgfHwgMDtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLmFjdGlvbiwgdmFsdWUpXG4gICAgfVxuICAgIGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHtcbiAgICAgICAgICAgIFwiMzdcIjogXCJsZWZ0XCIsXG4gICAgICAgICAgICBcIjM4XCI6IFwidXBcIixcbiAgICAgICAgICAgIFwiMzlcIjogXCJyaWdodFwiLFxuICAgICAgICAgICAgXCI0MFwiOiBcImRvd25cIixcbiAgICAgICAgfVtjb2RlLnRvU3RyaW5nKCldO1xuICAgICAgICBpZiAoIWRpcmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucHJvcHMub25Nb3ZlKHRoaXMucHJvcHMudG91ci5pZCwgdGhpcy5wcm9wcy5hY3Rpb24sIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImlucHV0XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17IHRoaXMucHJvcHMudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICByZWY9eyB0aGlzLm1ha2VJbnB1dFJlZiB9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17IHRoaXMuaGFuZGxlS2V5RG93biB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5DZWxsLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX1NlcnZpY2VfQXV0b1ByaW50ZXJfVGFibGVfQ2VsbFwiO1xuIiwiaW1wb3J0IENlbGwgZnJvbSBcIi4vQ2VsbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGl2ZUNlbGw6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBhY3Rpb246IFBULnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHRva2VuOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB0b3VyX2lkOiBQVC5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgcG9zc2libGVBY3Rpb25zOiBQVC5hcnJheU9mKFBULnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcm93OiBQVC5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHRvdXI6IFBULnNoYXBlKHtcbiAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgbmFtZTogUFQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZTogUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBQVC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB9KS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgfSkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBQVC5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvbk1vdmU6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVDaGFuZ2UgPSAoYWN0aW9uLCBuZXdfdmFsdWUpID0+IHtcbiAgICAgICAgbGV0IG5ld19yb3cgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLnJvdyk7XG4gICAgICAgIG5ld19yb3dbYWN0aW9uXSA9IG5ld192YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLnRvdXIuaWQsIG5ld19yb3cpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZGlzY2lwbGluZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IGAke3RoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLm5hbWV9IOKAlCAke3RoaXMucHJvcHMudG91ci5uYW1lfWAgfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBvc3NpYmxlQWN0aW9ucy5tYXAoYWN0aW9uID0+XG4gICAgICAgICAgICAgICAgICAgIDxDZWxsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb249eyBhY3Rpb24gfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ2VsbD17IHRoaXMucHJvcHMuYWN0aXZlQ2VsbCB9XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyBhY3Rpb24gfVxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMucm93W2FjdGlvbl0gfHwgXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW92ZT17IHRoaXMucHJvcHMub25Nb3ZlIH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Sb3cuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfU2VydmljZV9BdXRvUHJpbnRlcl9UYWJsZV9Sb3dcIjtcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcblxuaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3dcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGlvbnM6IFBULm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgcG9zc2libGVBY3Rpb25zOiBQVC5hcnJheU9mKFBULnN0cmluZy5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgdG91cnM6IFBULmFycmF5T2YoXG4gICAgICAgICAgICAgICAgUFQuc2hhcGUoe1xuICAgICAgICAgICAgICAgICAgICBpZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxuICAgICAgICAgICAgKS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25DaGFuZ2U6IFBULmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhY3RpdmVDZWxsOiBudWxsLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlID0gKHRvdXJfaWQsIG5ld192YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgbmV3X2FjdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLmFjdGlvbnMpO1xuICAgICAgICBuZXdfYWN0aW9uc1t0b3VyX2lkXSA9IG5ld192YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdfYWN0aW9ucyk7XG4gICAgfVxuICAgIGhhbmRsZU1vdmUgPSAodG91cl9pZCwgYWN0aW9uLCBkaXJlY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgREVMVEFTID0ge1xuICAgICAgICAgICAgdXA6ICAgIFstMSwgIDBdLFxuICAgICAgICAgICAgZG93bjogIFsgMSwgIDBdLFxuICAgICAgICAgICAgbGVmdDogIFsgMCwgLTFdLFxuICAgICAgICAgICAgcmlnaHQ6IFsgMCwgIDFdLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBbdG91cl9kZWx0YSwgYWN0aW9uX2RlbHRhXSA9IERFTFRBU1tkaXJlY3Rpb25dO1xuICAgICAgICBjb25zdCBuZXh0X3RvdXJfaWR4ID0gdGhpcy5wcm9wcy50b3Vycy5maW5kSW5kZXgodG91ciA9PiB0b3VyLmlkID09PSB0b3VyX2lkKSArIHRvdXJfZGVsdGE7XG4gICAgICAgIGNvbnN0IG5leHRfdG91ciA9IHRoaXMucHJvcHMudG91cnNbbmV4dF90b3VyX2lkeF07XG4gICAgICAgIGNvbnN0IG5leHRfYWN0aW9uX2lkeCA9IHRoaXMucHJvcHMucG9zc2libGVBY3Rpb25zLmluZGV4T2YoYWN0aW9uKSArIGFjdGlvbl9kZWx0YTtcbiAgICAgICAgY29uc3QgbmV4dF9hY3Rpb24gPSB0aGlzLnByb3BzLnBvc3NpYmxlQWN0aW9uc1tuZXh0X2FjdGlvbl9pZHhdO1xuICAgICAgICBpZiAoIW5leHRfYWN0aW9uIHx8ICFuZXh0X3RvdXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZUNlbGw6IHtcbiAgICAgICAgICAgICAgICB0b3VyX2lkOiBuZXh0X3RvdXIuaWQsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXh0X2FjdGlvbixcbiAgICAgICAgICAgICAgICB0b2tlbjogTWF0aC5yYW5kb20oKS50b1N0cmluZygpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRvdXJzLXRhYmxlXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImRpc2NpcGxpbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5kaXNjaXBsaW5lXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uYXV0b19wcmludGVyLmhlYXRzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uYXV0b19wcmludGVyLnJlc3VsdHNfMVwiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5yZXN1bHRzXzJcIikgfVxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGg+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucmVzdWx0c18zXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uYXV0b19wcmludGVyLmRpc2NpcGxpbmVfcmVzdWx0c1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMudG91cnMubWFwKCh0b3VyKSA9PlxuICAgICAgICAgICAgICAgICAgICA8Um93XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVDZWxsPXsgdGhpcy5zdGF0ZS5hY3RpdmVDZWxsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IHRvdXIuaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVBY3Rpb25zPXsgdGhpcy5wcm9wcy5wb3NzaWJsZUFjdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcm93PXsgdGhpcy5wcm9wcy5hY3Rpb25zW3RvdXIuaWRdIHx8IHt9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0b3VyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3ZlPXsgdGhpcy5oYW5kbGVNb3ZlIH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblRhYmxlLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX1NlcnZpY2VfQXV0b1ByaW50ZXJfVGFibGVcIjtcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IHNob3dDb25maXJtIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuaW1wb3J0IEpvYlF1ZXVlIGZyb20gXCIuL0pvYlF1ZXVlXCI7XG5pbXBvcnQgVGFibGUgZnJvbSBcIi4vVGFibGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b1ByaW50ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICBjb25zdCBQVCA9IFJlYWN0LlByb3BUeXBlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uSWQ6IFBULm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgY29uc3Qgb2xkX2FjdGlvbnNfc3RyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShgYXV0b19wcmludGVyXyR7dGhpcy5wcm9wcy5jb21wZXRpdGlvbklkfWApO1xuICAgICAgICBjb25zdCBpbml0aWFsX2FjdGlvbnMgPSBvbGRfYWN0aW9uc19zdHIgPyBKU09OLnBhcnNlKG9sZF9hY3Rpb25zX3N0cikgOiB7fTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbXBldGl0aW9uOiBudWxsLFxuICAgICAgICAgICAgYWN0aW9uczogaW5pdGlhbF9hY3Rpb25zLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLlNDSEVNQSA9IHtcbiAgICAgICAgICAgIGRpc2NpcGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgdG91cnM6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5QT1NTSUJMRV9BQ1RJT05TID0gW1wiaGVhdHNcIiwgXCJyZXN1bHRzXzFcIiwgXCJyZXN1bHRzXzJcIiwgXCJyZXN1bHRzXzNcIiwgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIl07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwiZGJfdXBkYXRlXCIsIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpO1xuICAgICAgICB0aGlzLnJlbG9hZF9kYXRhX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YSk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShgYXV0b19wcmludGVyXyR7dGhpcy5wcm9wcy5jb21wZXRpdGlvbklkfWAsIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuYWN0aW9ucykpO1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2RhdGFfbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGxvYWREYXRhID0gKCkgPT4ge1xuICAgICAgICBBcGkoXCJjb21wZXRpdGlvbi5nZXRcIiwge1xuICAgICAgICAgICAgY29tcGV0aXRpb25faWQ6IHRoaXMucHJvcHMuY29tcGV0aXRpb25JZCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiB0aGlzLlNDSEVNQSxcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiQ29tcGV0aXRpb25cIiwgdGhpcy5wcm9wcy5jb21wZXRpdGlvbklkKVxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXG4gICAgICAgICAgICAuc2VuZCgpO1xuICAgIH1cbiAgICByZWxvYWRGcm9tU3RvcmFnZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X2NvbXBldGl0aW9uX3JlZiA9IHN0b3JhZ2UuZ2V0KFwiQ29tcGV0aXRpb25cIikuYnlfaWQodGhpcy5wcm9wcy5jb21wZXRpdGlvbklkKTtcbiAgICAgICAgaWYgKCFuZXdfY29tcGV0aXRpb25fcmVmKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3X2NvbXBldGl0aW9uID0gbmV3X2NvbXBldGl0aW9uX3JlZi5zZXJpYWxpemUodGhpcy5TQ0hFTUEpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb21wZXRpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaENvbXBldGl0aW9uVXBkYXRlKHRoaXMuc3RhdGUuY29tcGV0aXRpb24sIG5ld19jb21wZXRpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjogbmV3X2NvbXBldGl0aW9uLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlUXVldWVSZWYgPSAocmVmKSA9PiB0aGlzLl9xdWV1ZSA9IHJlZjtcblxuICAgIGhhbmRsZUFjdGlvbnNDaGFuZ2UgPSAoYWN0aW9ucykgPT4gdGhpcy5zZXRTdGF0ZSh7IGFjdGlvbnMgfSk7XG5cbiAgICBoYW5kbGVQcmludFRlc3RQYWdlID0gKCkgPT4ge1xuICAgICAgICBzaG93Q29uZmlybShcbiAgICAgICAgICAgIF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucHJpbnRfdGVzdF9wYWdlXCIpLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNhdmVBcyhuZXcgQmxvYihbXCJkdW1teVwiXSwge3R5cGUgOiAndGV4dC9wbGFpbid9KSwgYGF1dG9wcmludGVyX2R1bW15XyR7TWF0aC5yYW5kb20oKX0udG1wYCk7XG4gICAgICAgICAgICAgICAgc2F2ZUFzKG5ldyBCbG9iKFtcImR1bW15XCJdLCB7dHlwZSA6ICd0ZXh0L3BsYWluJ30pLCBgYXV0b3ByaW50ZXJfZHVtbXlfJHtNYXRoLnJhbmRvbSgpfS50bXBgKTtcbiAgICAgICAgICAgICAgICBzYXZlQXMobmV3IEJsb2IoW1wiZHVtbXlcIl0sIHt0eXBlIDogJ3RleHQvcGxhaW4nfSksIGBhdXRvcHJpbnRlcl9kdW1teV8ke01hdGgucmFuZG9tKCl9LnRtcGApO1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlLmFkZEpvYihcInRlc3RcIiwgbnVsbCwgMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFRvdXJzRnJvbUNvbXBldGl0aW9uKGNvbXBldGl0aW9uKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBkaXNjaXBsaW5lIG9mIGNvbXBldGl0aW9uLmRpc2NpcGxpbmVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRvdXIgb2YgZGlzY2lwbGluZS50b3Vycykge1xuICAgICAgICAgICAgICAgIGxldCByID0gT2JqZWN0LmFzc2lnbih7fSwgdG91cik7XG4gICAgICAgICAgICAgICAgci5kaXNjaXBsaW5lID0gZGlzY2lwbGluZTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBnZXRUb3Vyc01hcChjb21wZXRpdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IE1hcCh0aGlzLmdldFRvdXJzRnJvbUNvbXBldGl0aW9uKGNvbXBldGl0aW9uKS5tYXAodG91ciA9PiBbdG91ci5pZCwgdG91cl0pKTtcbiAgICB9XG4gICAgZGlzcGF0Y2hDb21wZXRpdGlvblVwZGF0ZShvbGRfY29tcGV0aXRpb24sIG5ld19jb21wZXRpdGlvbikge1xuICAgICAgICBsZXQgb2xkX3RvdXJzID0gdGhpcy5nZXRUb3Vyc01hcChvbGRfY29tcGV0aXRpb24pO1xuICAgICAgICBsZXQgbmV3X3RvdXJzID0gdGhpcy5nZXRUb3Vyc01hcChuZXdfY29tcGV0aXRpb24pO1xuICAgICAgICBmb3IgKGNvbnN0IHRvdXJfaWQgb2Ygb2xkX3RvdXJzLmtleXMoKSkge1xuICAgICAgICAgICAgaWYgKCFuZXdfdG91cnMuaGFzKHRvdXJfaWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvbGRfdG91cnMuZ2V0KHRvdXJfaWQpLmZpbmFsaXplZCAmJiBuZXdfdG91cnMuZ2V0KHRvdXJfaWQpLmZpbmFsaXplZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9BY3Rpb25zRm9yVG91cihuZXdfdG91cnMuZ2V0KHRvdXJfaWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXROZXh0VG91cih0b3VyKSB7XG4gICAgICAgIGNvbnN0IHRvdXJzID0gdGhpcy5nZXRUb3Vyc0Zyb21Db21wZXRpdGlvbih0aGlzLnN0YXRlLmNvbXBldGl0aW9uKTtcbiAgICAgICAgY29uc3QgY3VycmVudF9pZHggPSB0b3Vycy5maW5kSW5kZXgodCA9PiB0LmlkID09PSB0b3VyLmlkKTtcbiAgICAgICAgY29uc3QgbmV4dF9pZHggPSBjdXJyZW50X2lkeCArIDE7XG4gICAgICAgIGlmICh0b3Vyc1tjdXJyZW50X2lkeF0uZGlzY2lwbGluZS5pZCAhPT0gdG91cnNbbmV4dF9pZHhdLmRpc2NpcGxpbmUuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3Vyc1tuZXh0X2lkeF07XG4gICAgfVxuXG4gICAgZG9UaGVKb2IodG91ciwgYWN0aW9uX3R5cGUsIGNvcGllcykge1xuICAgICAgICBpZiAoIXRvdXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9xdWV1ZS5hZGRKb2IoYWN0aW9uX3R5cGUsIHRvdXIsIGNvcGllcyk7XG4gICAgfVxuICAgIGRvQWN0aW9uc0ZvclRvdXIodG91cikge1xuICAgICAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5zdGF0ZS5hY3Rpb25zW3RvdXIuaWRdO1xuICAgICAgICBjb25zdCBuZXh0X3RvdXIgPSB0aGlzLmdldE5leHRUb3VyKHRvdXIpO1xuICAgICAgICBjb25zdCBuZXh0X3RvdXJfYWN0aW9ucyA9IHRoaXMuc3RhdGUuYWN0aW9uc1tuZXh0X3RvdXIuaWRdO1xuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbl90eXBlIG9mIHRoaXMuUE9TU0lCTEVfQUNUSU9OUykge1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uX3RvdXIgPSBhY3Rpb25fdHlwZSA9PT0gXCJoZWF0c1wiID8gbmV4dF90b3VyIDogdG91cjtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbnNfcm93ID0gYWN0aW9uX3R5cGUgPT09IFwiaGVhdHNcIiA/IG5leHRfdG91cl9hY3Rpb25zIDogYWN0aW9ucztcbiAgICAgICAgICAgIGlmIChhY3Rpb25zX3JvdyAmJiBhY3Rpb25zX3Jvd1thY3Rpb25fdHlwZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvVGhlSm9iKGFjdGlvbl90b3VyLCBhY3Rpb25fdHlwZSwgYWN0aW9uc19yb3dbYWN0aW9uX3R5cGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmNvbXBldGl0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxMb2FkZXIgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXV0by1wcmludGVyXCI+XG4gICAgICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPGgxPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwiYWRtaW4uaGVhZGVycy5hdXRvX3ByaW50ZXJcIikgfVxuICAgICAgICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvbi10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcImFkbWluLmF1dG9fcHJpbnRlci5ydWxlc1wiKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucz17IHRoaXMuc3RhdGUuYWN0aW9ucyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVBY3Rpb25zPXsgdGhpcy5QT1NTSUJMRV9BQ1RJT05TIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3Vycz17IHRoaXMuZ2V0VG91cnNGcm9tQ29tcGV0aXRpb24odGhpcy5zdGF0ZS5jb21wZXRpdGlvbikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVBY3Rpb25zQ2hhbmdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb24tcXVldWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJhZG1pbi5hdXRvX3ByaW50ZXIucXVldWVcIikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxKb2JRdWV1ZSByZWY9eyB0aGlzLm1ha2VRdWV1ZVJlZiB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlc3QtcGFnZS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5oYW5kbGVQcmludFRlc3RQYWdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCf0LXRh9Cw0YLRjCDRgtC10YHRgtC+0LLQvtC5INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQXV0b1ByaW50ZXIuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfU2VydmljZV9BdXRvUHJpbnRlclwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFwZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgY29uc3QgUFQgPSBSZWFjdC5Qcm9wVHlwZXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2hpbGRyZW46IFBULm5vZGUuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgaGVhZGVyOiBQVC5zdHJpbmcsXHJcbiAgICAgICAgICAgIHRpdGxlMTogUFQuc3RyaW5nLFxyXG4gICAgICAgICAgICB0aXRsZTI6IFBULnN0cmluZyxcclxuICAgICAgICAgICAgdGl0bGUzOiBQVC5zdHJpbmcsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlYWRlcjogbnVsbCxcclxuICAgICAgICAgICAgdGl0bGUxOiBudWxsLFxyXG4gICAgICAgICAgICB0aXRsZTI6IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlMzogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VCb2R5UmVmID0gKHJlZikgPT4gdGhpcy5fYm9keSA9IHJlZjtcclxuXHJcbiAgICBnZXRQcmludGFibGVIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5LmlubmVySFRNTDtcclxuICAgIH1cclxuICAgIHJlbmRlckhlYWRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5oZWFkZXIgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC1oZWFkZXJcIj57IHRoaXMucHJvcHMuaGVhZGVyIH08L2Rpdj5cclxuICAgICAgICApIDogbnVsbDtcclxuICAgIH1cclxuICAgIHJlbmRlclRpdGxlMSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTEgPyAoXHJcbiAgICAgICAgICAgIDxoMT57IHRoaXMucHJvcHMudGl0bGUxIH08L2gxPlxyXG4gICAgICAgICkgOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyVGl0bGUyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMiA/IChcclxuICAgICAgICAgICAgPGgyPnsgdGhpcy5wcm9wcy50aXRsZTIgfTwvaDI+XHJcbiAgICAgICAgKSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICByZW5kZXJUaXRsZTMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUzID8gKFxyXG4gICAgICAgICAgICA8aDM+eyB0aGlzLnByb3BzLnRpdGxlMyB9PC9oMz5cclxuICAgICAgICApIDogbnVsbDtcclxuICAgIH1cclxuICAgIHJlbmRlckJvZHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC1jb250ZW50XCJcclxuICAgICAgICAgICAgICAgIHJlZj17IHRoaXMubWFrZUJvZHlSZWYgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmludGFibGVcIj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUxKCkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMigpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTMoKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUGFwZXIuZGlzcGxheU5hbWUgPSBcIkFkbWluUGFuZWxfY29tcG9uZW50c19QYXBlclwiO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2NpcGxpbmVSZXN1bHRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVJZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJlbmRlcmVyOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lOiBudWxsLFxyXG4gICAgICAgICAgICByZXN1bHRzOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc2V0dXBTdG9yYWdlKCk7XHJcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCAoKSA9PiB7IHRoaXMubG9hZERhdGE7IHRoaXMubG9hZFJlc3VsdHMoKTsgfSk7XHJcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcclxuICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNfY2hhbmdlZCByZWxvYWRfZGF0YVwiLFxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRvdXJSZXN1bHRzQ2hhbmdlZFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRpc2NpcGxpbmVJZCAhPT0gbmV4dF9wcm9wcy5kaXNjaXBsaW5lSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0czogbnVsbCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZVN0b3JhZ2UodGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwU3RvcmFnZShuZXh0X3Byb3BzLmRpc2NpcGxpbmVJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZfcHJvcHMpIHtcclxuICAgICAgICBpZiAocHJldl9wcm9wcy5kaXNjaXBsaW5lSWQgIT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5mcmVlU3RvcmFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTQ0hFTUEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxyXG4gICAgICAgICAgICB0b3Vyczoge1xyXG4gICAgICAgICAgICAgICAgcnVuczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwU3RvcmFnZShkaXNjaXBsaW5lX2lkPW51bGwpIHtcclxuICAgICAgICBpZiAoZGlzY2lwbGluZV9pZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkID0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKGBkaXNjaXBsaW5lX3Jlc3VsdHNfJHtkaXNjaXBsaW5lX2lkfWApO1xyXG4gICAgfVxyXG4gICAgZnJlZVN0b3JhZ2UoZGlzY2lwbGluZV9pZD1udWxsKSB7XHJcbiAgICAgICAgaWYgKGRpc2NpcGxpbmVfaWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZV9pZCA9IHRoaXMucHJvcHMuZGlzY2lwbGluZUlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yYWdlLmRlbERvbWFpbihgZGlzY2lwbGluZV9yZXN1bHRzXyR7ZGlzY2lwbGluZV9pZH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlUmVuZGVyZXJSZWYgPSAocmVmKSA9PiB0aGlzLl9yZW5kZXJlciA9IHJlZjtcclxuXHJcbiAgICBoYW5kbGVUb3VyUmVzdWx0c0NoYW5nZWQgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGlmICghbWVzc2FnZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRvdXJfc3RvcmFnZSA9IHRoaXMuc3RvcmFnZS5nZXQoXCJUb3VyXCIpLmJ5X2lkKG1lc3NhZ2VbXCJ0b3VyX2lkXCJdKTtcclxuICAgICAgICBpZiAoIXRvdXJfc3RvcmFnZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b3VyX3N0b3JhZ2UuZGlzY2lwbGluZS5pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNZXJnZWRSZXN1bHRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnJlc3VsdHMgPT09IG51bGwgfHwgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCdWlsZCBydW5zIGluZGV4XHJcbiAgICAgICAgbGV0IHJ1bnNfaW5kZXggPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgZm9yIChjb25zdCB0b3VyIG9mIHRoaXMuc3RhdGUuZGlzY2lwbGluZS50b3Vycykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJ1biBvZiB0b3VyLnJ1bnMpIHtcclxuICAgICAgICAgICAgICAgIHJ1bnNfaW5kZXguc2V0KHJ1bi5pZCwgeyB0b3VyLCBydW4gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTWVyZ2UgcmVzdWx0c1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RhdGUucmVzdWx0cy5tYXAocm93ID0+ICh7XHJcbiAgICAgICAgICAgIHBsYWNlOiByb3cucGxhY2UsXHJcbiAgICAgICAgICAgIHRvdXI6IHJ1bnNfaW5kZXguZ2V0KHJvdy5ydW5faWQpLnRvdXIsXHJcbiAgICAgICAgICAgIHJ1bjogcnVuc19pbmRleC5nZXQocm93LnJ1bl9pZCkucnVuLFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRSZXN1bHRzID0gKCkgPT4ge1xyXG4gICAgICAgIEFwaShcImRpc2NpcGxpbmUuZ2V0X3Jlc3VsdHNcIiwge1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lX2lkOiB0aGlzLnByb3BzLmRpc2NpcGxpbmVJZCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vblN1Y2Nlc3MocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICBsb2FkRGF0YSA9ICgpID0+IHtcclxuICAgICAgICBBcGkoXCJkaXNjaXBsaW5lLmdldFwiLCB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfaWQ6IHRoaXMucHJvcHMuZGlzY2lwbGluZUlkLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5TQ0hFTUEsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFRvREIoXCJEaXNjaXBsaW5lXCIsIHRoaXMucHJvcHMuZGlzY2lwbGluZUlkLCB0aGlzLnN0b3JhZ2UpXHJcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZSlcclxuICAgICAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuICAgIHJlbG9hZEZyb21TdG9yYWdlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiRGlzY2lwbGluZVwiKVxyXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy5kaXNjaXBsaW5lSWQpXHJcbiAgICAgICAgICAgIC5zZXJpYWxpemUodGhpcy5TQ0hFTUEpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBkaXNjaXBsaW5lOiBzZXJpYWxpemVkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExpc3RlbmVyc1xyXG5cclxuICAgIGhhbmRsZVNpZ25hbCA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlcmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmhhbmRsZVNpZ25hbChtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVuZGVyaW5nXHJcblxyXG4gICAgcmVuZGVyQm9keSh0YWJsZSkge1xyXG4gICAgICAgIGNvbnN0IHsgZGlzY2lwbGluZUlkLCByZW5kZXJlciwgLi4ub3RoZXJfcHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBSZW5kZXJpbmdDb21wb25lbnQgPSByZW5kZXJlcjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8UmVuZGVyaW5nQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lPXsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lIH1cclxuICAgICAgICAgICAgICAgIHJlZj17IHRoaXMubWFrZVJlbmRlcmVyUmVmIH1cclxuICAgICAgICAgICAgICAgIHRhYmxlPXsgdGFibGUgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi5vdGhlcl9wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuICAgICAgICBjb25zdCB0YWJsZSA9IHRoaXMuZ2V0TWVyZ2VkUmVzdWx0cygpO1xyXG4gICAgICAgIGlmICh0YWJsZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8TG9hZGVyIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjaXBsaW5lLXJlc3VsdHNcIj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KHRhYmxlKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkRpc2NpcGxpbmVSZXN1bHRzLmRpc3BsYXlOYW1lID0gXCJBZG1pblBhbmVsX2NvbW1vbl9EaXNjaXBsaW5lUmVzdWx0c1wiO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvdXJSZXN1bHRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFBUID0gUmVhY3QuUHJvcFR5cGVzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvdXJJZDogUFQubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJlbmRlcmVyOiBQVC5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB0b3VyOiBudWxsLFxyXG4gICAgICAgICAgICByZXN1bHRzOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc2V0dXBTdG9yYWdlKCk7XHJcbiAgICAgICAgdGhpcy5yZWxvYWRfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJyZWxvYWRfZGF0YVwiLCAoKSA9PiB7IHRoaXMubG9hZERhdGE7IHRoaXMubG9hZFJlc3VsdHMoKTsgfSk7XHJcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcclxuICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNfY2hhbmdlZCByZWxvYWRfZGF0YVwiLFxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRvdXJSZXN1bHRzQ2hhbmdlZFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXJJZCAhPT0gbmV4dF9wcm9wcy50b3VySWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB0b3VyOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0czogbnVsbCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJlZVN0b3JhZ2UodGhpcy5wcm9wcy50b3VySWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwU3RvcmFnZShuZXh0X3Byb3BzLnRvdXJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZfcHJvcHMpIHtcclxuICAgICAgICBpZiAocHJldl9wcm9wcy50b3VySWQgIT09IHRoaXMucHJvcHMudG91cklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5mcmVlU3RvcmFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTQ0hFTUEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzY2lwbGluZToge1xyXG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBqdWRnZToge30sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBydW5zOiB7XHJcbiAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiB7fSxcclxuICAgICAgICAgICAgICAgIHNjb3Jlczoge30sXHJcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwU3RvcmFnZSh0b3VyX2lkPW51bGwpIHtcclxuICAgICAgICBpZiAodG91cl9pZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0b3VyX2lkID0gdGhpcy5wcm9wcy50b3VySWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKGB0b3VyX3Jlc3VsdHNfJHt0b3VyX2lkfWApO1xyXG4gICAgfVxyXG4gICAgZnJlZVN0b3JhZ2UodG91cl9pZD1udWxsKSB7XHJcbiAgICAgICAgaWYgKHRvdXJfaWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdG91cl9pZCA9IHRoaXMucHJvcHMudG91cklkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9yYWdlLmRlbERvbWFpbihgdG91cl9yZXN1bHRzXyR7dG91cl9pZH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlUmVuZGVyZXJSZWYgPSAocmVmKSA9PiB0aGlzLl9yZW5kZXJlciA9IHJlZjtcclxuXHJcbiAgICBoYW5kbGVUb3VyUmVzdWx0c0NoYW5nZWQgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGlmICghbWVzc2FnZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRvdXJfc3RvcmFnZSA9IHRoaXMuc3RvcmFnZS5nZXQoXCJUb3VyXCIpLmJ5X2lkKG1lc3NhZ2VbXCJ0b3VyX2lkXCJdKTtcclxuICAgICAgICBpZiAoIXRvdXJfc3RvcmFnZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b3VyX3N0b3JhZ2UuaWQgPT09IHRoaXMucHJvcHMudG91cklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVyZ2VkUmVzdWx0cygpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZXN1bHRzID09PSBudWxsIHx8IHRoaXMuc3RhdGUudG91ciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQnVpbGQgcnVucyBpbmRleFxyXG4gICAgICAgIGxldCBydW5zX2luZGV4ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIHRoaXMuc3RhdGUudG91ci5ydW5zKSB7XHJcbiAgICAgICAgICAgIHJ1bnNfaW5kZXguc2V0KHJ1bi5pZCwgcnVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTWVyZ2UgcmVzdWx0c1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RhdGUucmVzdWx0cy5tYXAocm93ID0+ICh7XHJcbiAgICAgICAgICAgIHBsYWNlOiByb3cucGxhY2UsXHJcbiAgICAgICAgICAgIGFkdmFuY2VzOiByb3cuYWR2YW5jZXMsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxfZGF0YTogcm93LmFkZGl0aW9uYWxfZGF0YSxcclxuICAgICAgICAgICAgcnVuOiBydW5zX2luZGV4LmdldChyb3cucnVuX2lkKSxcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkUmVzdWx0cyA9ICgpID0+IHtcclxuICAgICAgICBBcGkoXCJ0b3VyLmdldF9yZXN1bHRzXCIsIHtcclxuICAgICAgICAgICAgdG91cl9pZDogdGhpcy5wcm9wcy50b3VySWQsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub25TdWNjZXNzKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzOiByZXNwb25zZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgbG9hZERhdGEgPSAoKSA9PiB7XHJcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwge1xyXG4gICAgICAgICAgICB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXJJZCxcclxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMuU0NIRU1BLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLnByb3BzLnRvdXJJZCwgdGhpcy5zdG9yYWdlKVxyXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UpXHJcbiAgICAgICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWRGcm9tU3RvcmFnZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIilcclxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMucHJvcHMudG91cklkKVxyXG4gICAgICAgICAgICAuc2VyaWFsaXplKHRoaXMuU0NIRU1BKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMaXN0ZW5lcnNcclxuXHJcbiAgICBoYW5kbGVTaWduYWwgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5oYW5kbGVTaWduYWwobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbmRlcmluZ1xyXG5cclxuICAgIHJlbmRlck5vbkZpbmFsaXplZFdhcm5pbmcoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnRvdXIuZmluYWxpemVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPlxyXG4gICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5hbGVydHMubm90X2ZpbmFsaXplZFwiKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJCb2R5KHRhYmxlKSB7XHJcbiAgICAgICAgY29uc3QgeyB0b3VySWQsIHJlbmRlcmVyLCAuLi5vdGhlcl9wcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IFJlbmRlcmluZ0NvbXBvbmVudCA9IHJlbmRlcmVyO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxSZW5kZXJpbmdDb21wb25lbnRcclxuICAgICAgICAgICAgICAgIHJlZj17IHRoaXMubWFrZVJlbmRlcmVyUmVmIH1cclxuICAgICAgICAgICAgICAgIHRhYmxlPXsgdGFibGUgfVxyXG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMuc3RhdGUudG91ciB9XHJcbiAgICAgICAgICAgICAgICB7IC4uLm90aGVyX3Byb3BzIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3NvcnQtY29tcFxyXG4gICAgICAgIGNvbnN0IHRhYmxlID0gdGhpcy5nZXRNZXJnZWRSZXN1bHRzKCk7XHJcbiAgICAgICAgaWYgKHRhYmxlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvdXItcmVzdWx0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMb2FkZXIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvdXItcmVzdWx0c1wiPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5vbkZpbmFsaXplZFdhcm5pbmcgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkodGFibGUpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuVG91clJlc3VsdHMuZGlzcGxheU5hbWUgPSBcImNvbW1vbl9Ub3VyUmVzdWx0c1wiO1xyXG4iXX0=
