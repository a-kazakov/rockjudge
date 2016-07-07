(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminScoreinput = function (_React$Component) {
    _inherits(AdminScoreinput, _React$Component);

    function AdminScoreinput() {
        _classCallCheck(this, AdminScoreinput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AdminScoreinput).apply(this, arguments));
    }

    _createClass(AdminScoreinput, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "h2",
                null,
                "Not implemented"
            );
        }
    }]);

    return AdminScoreinput;
}(React.Component);

exports.default = AdminScoreinput;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _GeneralScale = require("JudgeTablet/GeneralScale");

var _GeneralScale2 = _interopRequireDefault(_GeneralScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function (_React$Component) {
    _inherits(Element, _React$Component);

    function Element() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Element);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Element)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onUpdate = function (value) {
            _this.props.onAcroReductionUpdate(_this.props.acroIdx, value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Element, [{
        key: "render",
        value: function render() {
            return React.createElement(_GeneralScale2.default, {
                header: (0, _l10n2.default)("tablet.acro_judge.acro_n", this.props.acroIdx),
                scale: "reduction",
                value: this.props.reduction,
                onValueUpdate: this.onUpdate });
        }
    }]);

    return Element;
}(React.Component);

exports.default = Element;

},{"JudgeTablet/GeneralScale":31,"l10n":69}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element = require("./Element");

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Elements = function (_React$Component) {
    _inherits(Elements, _React$Component);

    function Elements() {
        _classCallCheck(this, Elements);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Elements).apply(this, arguments));
    }

    _createClass(Elements, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                this.props.reductions.map(function (reduction, acro_idx) {
                    return React.createElement(_Element2.default, {
                        key: acro_idx,
                        reduction: reduction,
                        acroIdx: acro_idx,
                        onAcroReductionUpdate: _this2.props.onAcroReductionUpdate });
                })
            );
        }
    }]);

    return Elements;
}(React.Component);

exports.default = Elements;

},{"./Element":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _tablet_components = require("ui/tablet_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mistakes = function (_React$Component) {
    _inherits(Mistakes, _React$Component);

    function Mistakes() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mistakes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onUpdate = function (value) {
            _this.props.onScoreUpdate("mistakes", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mistakes, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "mistakes" },
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.acro_judge.fall_down")
                ),
                React.createElement(_tablet_components.TabletIntegerInput, {
                    value: this.props.mistakes,
                    onValueUpdate: this.onUpdate })
            );
        }
    }]);

    return Mistakes;
}(React.Component);

exports.default = Mistakes;

},{"l10n":69,"ui/tablet_components":77}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _Elements = require("./Elements");

var _Elements2 = _interopRequireDefault(_Elements);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onAcroReductionUpdate = function (acro_idx, value) {
            var reductions = _this.props.scoreData.reductions.map(function () {
                return null;
            });
            reductions[acro_idx] = value;
            _this.props.onScoreUpdate("reductions", reductions);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(_Elements2.default, {
                    reductions: this.props.scoreData.reductions,
                    onAcroReductionUpdate: this.onAcroReductionUpdate }),
                React.createElement(_Mistakes2.default, {
                    mistakes: this.props.scoreData.mistakes,
                    onScoreUpdate: this.props.onScoreUpdate })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Elements":5,"./Mistakes":6,"l10n":69}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralLayout = require("JudgeTablet/GeneralLayout");

var _GeneralLayout2 = _interopRequireDefault(_GeneralLayout);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AcroJudgeTabletBody = function (_React$Component) {
    _inherits(AcroJudgeTabletBody, _React$Component);

    function AcroJudgeTabletBody() {
        _classCallCheck(this, AcroJudgeTabletBody);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AcroJudgeTabletBody).apply(this, arguments));
    }

    _createClass(AcroJudgeTabletBody, [{
        key: "render",
        value: function render() {
            return React.createElement(_GeneralLayout2.default, _extends({
                layoutClass: _ScoringLayout2.default
            }, this.props));
        }
    }]);

    return AcroJudgeTabletBody;
}(React.Component);

exports.default = AcroJudgeTabletBody;

},{"./ScoringLayout":7,"JudgeTablet/GeneralLayout":30}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _tablet_components = require("ui/tablet_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmationButton = function (_React$Component) {
    _inherits(ConfirmationButton, _React$Component);

    function ConfirmationButton() {
        _classCallCheck(this, ConfirmationButton);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ConfirmationButton).apply(this, arguments));
    }

    _createClass(ConfirmationButton, [{
        key: "render",
        value: function render() {
            if (!this.props.canConfirm) {
                return React.createElement("div", { className: "confirm" });
            }
            return React.createElement(
                "div",
                { className: "confirm" },
                React.createElement(_tablet_components.Slider, {
                    onActivate: this.props.onConfirm,
                    done: this.props.confirmed,
                    slideText: (0, _l10n2.default)("tablet.global.confirm_score"),
                    doneText: (0, _l10n2.default)("tablet.global.confirmed") })
            );
        }
    }], [{
        key: "defaultProps",
        get: function get() {
            return {
                canConfirm: true
            };
        }
    }]);

    return ConfirmationButton;
}(React.Component);

exports.default = ConfirmationButton;

},{"l10n":69,"ui/tablet_components":77}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _tablet_components = require("ui/tablet_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mistakes = function (_React$Component) {
    _inherits(Mistakes, _React$Component);

    function Mistakes() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mistakes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onSmallMistakesUpdate = function (value) {
            _this.props.onScoreUpdate("small_mistakes", value);
        }, _this.onBigMistakesUpdate = function (value) {
            _this.props.onScoreUpdate("big_mistakes", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mistakes, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "mistakes full-width" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                (0, _l10n2.default)("tablet.dance_judge.small_mistakes")
                            ),
                            React.createElement(_tablet_components.TabletIntegerInput, {
                                value: this.props.scoreData.small_mistakes,
                                onValueUpdate: this.onSmallMistakesUpdate })
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                (0, _l10n2.default)("tablet.dance_judge.big_mistakes")
                            ),
                            React.createElement(_tablet_components.TabletIntegerInput, {
                                value: this.props.scoreData.big_mistakes,
                                onValueUpdate: this.onBigMistakesUpdate })
                        )
                    )
                )
            );
        }
    }]);

    return Mistakes;
}(React.Component);

exports.default = Mistakes;

},{"l10n":69,"ui/tablet_components":77}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralScale = require("JudgeTablet/GeneralScale");

var _GeneralScale2 = _interopRequireDefault(_GeneralScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScorePart = function (_React$Component) {
    _inherits(ScorePart, _React$Component);

    function ScorePart() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScorePart);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScorePart)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onValueUpdate = function (value) {
            _this.props.onScoreUpdate(_this.props.code, value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScorePart, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var header = _props.header;
            var value = _props.value;
            var scale = _props.scale;
            var onScoreUpdate = _props.onScoreUpdate;

            var other_props = _objectWithoutProperties(_props, ["header", "value", "scale", "onScoreUpdate"]);

            return React.createElement(_GeneralScale2.default, _extends({
                header: header,
                value: value,
                scale: scale,
                onValueUpdate: this.onValueUpdate
            }, other_props));
        }
    }]);

    return ScorePart;
}(React.Component);

exports.default = ScorePart;

},{"JudgeTablet/GeneralScale":31}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _ScorePart = require("./ScorePart");

var _ScorePart2 = _interopRequireDefault(_ScorePart);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        _classCallCheck(this, ScoringLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoringLayout).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return React.createElement(_ScorePart2.default, _extends({
                code: code,
                header: (0, _l10n2.default)("tablet.dance_judge." + code),
                value: this.props.scoreData[code],
                scale: scale,
                onScoreUpdate: this.props.onScoreUpdate
            }, additional_props));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderPart("fw_woman", "reduction"),
                this.renderPart("fw_man", "reduction"),
                this.renderPart("dance_figs", "point5", { min: 0, max: 12.5 }),
                this.renderPart("composition", "point5", { min: 0, max: 10 }),
                React.createElement(_Mistakes2.default, {
                    scoreData: this.props.scoreData,
                    onScoreUpdate: this.props.onScoreUpdate })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Mistakes":10,"./ScorePart":11,"l10n":69}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeneralLayout = require("JudgeTablet/GeneralLayout");

var _GeneralLayout2 = _interopRequireDefault(_GeneralLayout);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DancingLayout = function (_React$Component) {
    _inherits(DancingLayout, _React$Component);

    function DancingLayout() {
        _classCallCheck(this, DancingLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DancingLayout).apply(this, arguments));
    }

    _createClass(DancingLayout, [{
        key: "render",
        value: function render() {
            return React.createElement(_GeneralLayout2.default, _extends({
                layoutClass: _ScoringLayout2.default
            }, this.props));
        }
    }]);

    return DancingLayout;
}(React.Component);

exports.default = DancingLayout;

},{"./ScoringLayout":12,"JudgeTablet/GeneralLayout":30}],14:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10,"l10n":69,"ui/tablet_components":77}],15:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"JudgeTablet/GeneralScale":31,"dup":11}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _ScorePart = require("./ScorePart");

var _ScorePart2 = _interopRequireDefault(_ScorePart);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        _classCallCheck(this, ScoringLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoringLayout).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return React.createElement(_ScorePart2.default, _extends({
                code: code,
                header: (0, _l10n2.default)("tablet.dance_judge." + code),
                value: this.props.scoreData[code],
                scale: scale,
                onScoreUpdate: this.props.onScoreUpdate
            }, additional_props));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderPart("fw_woman", "reduction"),
                this.renderPart("fw_man", "reduction"),
                this.renderPart("dance_figs", "integer", { min: 0, max: 25 }),
                this.renderPart("composition", "integer", { min: 0, max: 20 }),
                React.createElement(_Mistakes2.default, {
                    scoreData: this.props.scoreData,
                    onScoreUpdate: this.props.onScoreUpdate })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Mistakes":14,"./ScorePart":15,"l10n":69}],17:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./ScoringLayout":16,"JudgeTablet/GeneralLayout":30,"dup":13}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tablet_components = require("ui/tablet_components");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Button)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onClick = function () {
            _this.props.onClick(_this.props.mkey);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Button, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                _extends({
                    className: "btn" + (this.props.active ? " active" : "")
                }, (0, _tablet_components.onTouchOrClick)(this.onClick)),
                this.props.label
            );
        }
    }]);

    return Button;
}(React.Component);

exports.default = Button;

},{"ui/tablet_components":77}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooterItem = function (_React$Component) {
    _inherits(FooterItem, _React$Component);

    function FooterItem() {
        _classCallCheck(this, FooterItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FooterItem).apply(this, arguments));
    }

    _createClass(FooterItem, [{
        key: "render",
        value: function render() {
            return null;
        }
    }]);

    return FooterItem;
}(React.Component);

exports.default = FooterItem;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Footer;

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer(props) {
    return React.createElement(
        "div",
        { className: "footer page-selector" },
        React.Children.map(props.children, function (btn) {
            return React.createElement(_Button2.default, _extends({
                key: btn.props.mkey,
                onClick: props.onChange,
                active: props.value === btn.props.mkey
            }, btn.props));
        })
    );
}

},{"./Button":18}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _tablet_components = require("ui/tablet_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mistakes = function (_React$Component) {
    _inherits(Mistakes, _React$Component);

    function Mistakes() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mistakes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onMistakesUpdate = function (value) {
            _this.props.onScoreUpdate("mistakes", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mistakes, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "mistakes full-width" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                (0, _l10n2.default)("tablet.dance_judge.form_mistakes")
                            ),
                            React.createElement(_tablet_components.TabletIntegerInput, {
                                value: this.props.scoreData.mistakes,
                                onValueUpdate: this.onMistakesUpdate })
                        )
                    )
                )
            );
        }
    }]);

    return Mistakes;
}(React.Component);

exports.default = Mistakes;

},{"l10n":69,"ui/tablet_components":77}],22:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"JudgeTablet/GeneralScale":31,"dup":11}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _ScorePart = require("./ScorePart");

var _ScorePart2 = _interopRequireDefault(_ScorePart);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        _classCallCheck(this, ScoringLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoringLayout).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return React.createElement(_ScorePart2.default, _extends({
                code: code,
                header: (0, _l10n2.default)("tablet.dance_judge." + code),
                value: this.props.scoreData[code],
                scale: scale,
                onScoreUpdate: this.props.onScoreUpdate
            }, additional_props));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderPart("acrobatics", "point5", { min: 0, max: 10 }),
                this.renderPart("dance_tech", "point5", { min: 0, max: 10 }),
                this.renderPart("dance_figs", "point5", { min: 0, max: 10 }),
                this.renderPart("impression", "point5", { min: 0, max: 10 }),
                React.createElement(_Mistakes2.default, {
                    scoreData: this.props.scoreData,
                    onScoreUpdate: this.props.onScoreUpdate })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Mistakes":21,"./ScorePart":22,"l10n":69}],24:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./ScoringLayout":23,"JudgeTablet/GeneralLayout":30,"dup":13}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _tablet_components = require("ui/tablet_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mistakes = function (_React$Component) {
    _inherits(Mistakes, _React$Component);

    function Mistakes() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Mistakes);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mistakes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onMistakesUpdate = function (value) {
            _this.props.onScoreUpdate("mistakes", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mistakes, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "mistakes" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                (0, _l10n2.default)("tablet.dance_judge.form_mistakes")
                            ),
                            React.createElement(_tablet_components.TabletIntegerInput, {
                                value: this.props.scoreData.mistakes,
                                onValueUpdate: this.onMistakesUpdate })
                        )
                    )
                )
            );
        }
    }]);

    return Mistakes;
}(React.Component);

exports.default = Mistakes;

},{"l10n":69,"ui/tablet_components":77}],26:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"JudgeTablet/GeneralScale":31,"dup":11}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _ScorePart = require("./ScorePart");

var _ScorePart2 = _interopRequireDefault(_ScorePart);

var _Mistakes = require("./Mistakes");

var _Mistakes2 = _interopRequireDefault(_Mistakes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        _classCallCheck(this, ScoringLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ScoringLayout).apply(this, arguments));
    }

    _createClass(ScoringLayout, [{
        key: "renderPart",
        value: function renderPart(code, scale) {
            var additional_props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return React.createElement(_ScorePart2.default, _extends({
                code: code,
                header: (0, _l10n2.default)("tablet.dance_judge." + code),
                value: this.props.scoreData[code],
                scale: scale,
                onScoreUpdate: this.props.onScoreUpdate
            }, additional_props));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderPart("dance_tech", "point5", { min: 0, max: 10 }),
                this.renderPart("dance_figs", "point5", { min: 0, max: 10 }),
                this.renderPart("impression", "point5", { min: 0, max: 10 }),
                React.createElement(_Mistakes2.default, {
                    scoreData: this.props.scoreData,
                    onScoreUpdate: this.props.onScoreUpdate })
            );
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"./Mistakes":25,"./ScorePart":26,"l10n":69}],28:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./ScoringLayout":27,"JudgeTablet/GeneralLayout":30,"dup":13}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _ConfirmationButton = require("JudgeTablet/ConfirmationButton");

var _ConfirmationButton2 = _interopRequireDefault(_ConfirmationButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Participant = function (_CacheMixin) {
    _inherits(Participant, _CacheMixin);

    function Participant() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Participant);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Participant)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onConfirm = function () {
            _this.props.onScoreConfirm(_this.score.id);
        }, _this.onScoreUpdate = function (key, value) {
            if (_this.score.confirmed) {
                return;
            }
            var score_data = {};
            score_data[key] = value;
            _this.props.onScoreUpdate(_this.score.id, score_data);
        }, _this.onAcroReductionUpdate = function (acro_idx, value) {
            if (_this.score.confirmed) {
                return;
            }
            var reductions = _this.score.data.raw_data.reductions.map(function () {
                return null;
            });
            reductions[acro_idx] = value;
            _this.onScoreUpdate("reductions", reductions);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Participant, [{
        key: "canConfirm",
        value: function canConfirm() {
            var score_data = this.score.data.raw_data;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(score_data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    var value = score_data[key];
                    if (Array.isArray(value)) {
                        if (value.filter(function (a) {
                            return a === null;
                        }).length !== 0) {
                            return false;
                        }
                    } else {
                        if (value === null) {
                            return false;
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

            return true;
        }
    }, {
        key: "renderScoringLayout",
        value: function renderScoringLayout() {
            var score_data = this.score.data.raw_data;
            var class_name = this.score.confirmed ? "read-only" : "";
            var ScoringComponent = this.props.layoutClass;
            return React.createElement(
                "div",
                { className: class_name },
                React.createElement(ScoringComponent, {
                    scoreData: score_data,
                    onScoreUpdate: this.onScoreUpdate }),
                React.createElement(_ConfirmationButton2.default, {
                    confirmed: this.score.confirmed,
                    canConfirm: this.canConfirm(),
                    onConfirm: this.onConfirm })
            );
        }
    }, {
        key: "renderNotPerformingMessage",
        value: function renderNotPerformingMessage() {
            return React.createElement(
                "div",
                { className: "not-performing" },
                (0, _l10n2.default)("tablet.global.not_performing")
            );
        }
    }, {
        key: "render",
        value: function render() {
            var header = (0, _l10n2.default)("global.phrases.participant_n", this.props.run.participant.number, this.props.run.participant.name, this.props.run.participant.sportsmen.length);
            return React.createElement(
                "div",
                { className: "layout-participant" },
                React.createElement(
                    "h2",
                    null,
                    header
                ),
                this.props.run.performed ? this.renderScoringLayout() : this.renderNotPerformingMessage()
            );
        }
    }, {
        key: "score",
        get: function get() {
            var _this2 = this;

            return this.fetchFromCache("score", function () {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _this2.props.run.scores[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var score = _step2.value;

                        if (score.discipline_judge_id === _this2.props.disciplineJudge.id) {
                            return score;
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

                return null;
            });
        }
    }]);

    return Participant;
}((0, _CacheMixin3.default)(React.Component));

exports.default = Participant;

},{"JudgeTablet/ConfirmationButton":9,"common/CacheMixin":64,"l10n":69}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Header = require("JudgeTablet/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Grid = require("JudgeTablet/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Participant = require("./Participant");

var _Participant2 = _interopRequireDefault(_Participant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralLayout = function (_React$Component) {
    _inherits(GeneralLayout, _React$Component);

    function GeneralLayout(props) {
        _classCallCheck(this, GeneralLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GeneralLayout).call(this, props));

        _this.onPrevHeatClick = function () {
            _this.updateHeat(_this.state.heat - 1);
        };

        _this.onNextHeatClick = function () {
            _this.updateHeat(_this.state.heat + 1);
        };

        _this.state = {
            heat: _this.getFirstNonConfirmedHeat()
        };
        return _this;
    }

    _createClass(GeneralLayout, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (next_props.tour.id !== this.props.tour.id) {
                this.setState({
                    heat: this.getFirstNonConfirmedHeat()
                });
            }
        }
    }, {
        key: "updateHeat",
        value: function updateHeat(value) {
            this.setState({
                heat: value
            });
        }
    }, {
        key: "getFirstNonConfirmedHeat",
        value: function getFirstNonConfirmedHeat() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.tour.runs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var run = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = run.scores[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var score = _step2.value;

                            if (score.discipline_judge_id === this.props.disciplineJudge.id && !score.confirmed && run.performed) {
                                return run.heat;
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

            return this.heats_count;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "judge-tablet" },
                React.createElement(_Header2.default, {
                    judge: this.props.disciplineJudge.judge,
                    tour: this.props.tour,
                    heat: this.state.heat,
                    heatsCount: this.heats_count,
                    maxHeat: this.getFirstNonConfirmedHeat(),
                    onPrevHeatClick: this.onPrevHeatClick,
                    onNextHeatClick: this.onNextHeatClick }),
                React.createElement(
                    "div",
                    { className: "body" },
                    React.createElement(
                        _Grid2.default,
                        null,
                        this.props.tour.runs.filter(function (run) {
                            return run.heat === _this2.state.heat;
                        }).map(function (run) {
                            return React.createElement(_Participant2.default, {
                                key: run.id,
                                run: run,
                                layoutClass: _this2.props.layoutClass,
                                disciplineJudge: _this2.props.disciplineJudge,
                                onScoreUpdate: _this2.props.onScoreUpdate,
                                onScoreConfirm: _this2.props.onScoreConfirm });
                        })
                    )
                )
            );
        }
    }, {
        key: "heats_count",
        get: function get() {
            var _Math;

            return (_Math = Math).max.apply(_Math, _toConsumableArray(this.props.tour.runs.map(function (run) {
                return run.heat;
            })));
        }
    }]);

    return GeneralLayout;
}(React.Component);

exports.default = GeneralLayout;

},{"./Participant":29,"JudgeTablet/Grid":32,"JudgeTablet/Header":46}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tablet_components = require("ui/tablet_components");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralScale = function (_React$Component) {
    _inherits(GeneralScale, _React$Component);

    function GeneralScale() {
        _classCallCheck(this, GeneralScale);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(GeneralScale).apply(this, arguments));
    }

    _createClass(GeneralScale, [{
        key: "renderHeader",
        value: function renderHeader() {
            if (this.props.header === null) {
                return null;
            }
            return React.createElement(
                "h3",
                null,
                this.props.header
            );
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            switch (this.props.scale) {
                case "point5":
                    return React.createElement(_tablet_components.TabletPoint5SelectInput, _extends({
                        style: "two-lines"
                    }, this.props));
                case "integer":
                    return React.createElement(_tablet_components.TabletIntegerSelectInput, _extends({
                        style: "two-lines"
                    }, this.props));
                case "grid":
                    return React.createElement(_tablet_components.TabletIntegerSelectInput, _extends({
                        style: "grid"
                    }, this.props));
                case "reduction":
                    return React.createElement(_tablet_components.TabletSelectorInput, _extends({
                        style: "one-line",
                        choices: this.possiblie_reductions
                    }, this.props));
                default:
                    console.error("Unknowd scale type: " + this.props.scale);
                    return null;
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderHeader(),
                this.renderBody()
            );
        }
    }, {
        key: "possiblie_reductions",
        get: function get() {
            return [[100, "X"], [75, "-75%"], [50, "-50%"], [25, "-25%"], [10, "-10%"], [5, "-5%"], [0, "OK"]];
        }
    }], [{
        key: "defaultProps",
        get: function get() {
            return {
                header: null
            };
        }
    }]);

    return GeneralScale;
}(React.Component);

exports.default = GeneralScale;

},{"ui/tablet_components":77}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_CacheMixin) {
    _inherits(Grid, _CacheMixin);

    function Grid() {
        _classCallCheck(this, Grid);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).apply(this, arguments));
    }

    _createClass(Grid, [{
        key: "renderRow",
        value: function renderRow(elements, is_second_row) {
            var _this2 = this;

            if (elements === null) {
                return null;
            }
            var row_width = (elements.length * this.width_value).toFixed(5) + "%";
            var class_name = "row";
            if (!this.asym_layout) {
                class_name += " align-center";
            } else if (is_second_row) {
                class_name += " align-left";
            } else {
                class_name += " align-right";
            }
            return React.createElement(
                "table",
                { className: class_name, style: { width: row_width } },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        elements.map(function (e, idx) {
                            return React.createElement(
                                "td",
                                { className: "item", key: idx, style: { width: _this2.width } },
                                e
                            );
                        })
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var class_name = this.two_rows ? "grid two-rows" : "grid";
            var first_row = this.two_rows ? this.children.filter(function (x, idx) {
                return idx % 2 === 1;
            }) : this.children;
            var second_row = this.two_rows ? this.children.filter(function (x, idx) {
                return idx % 2 === 0;
            }) : null;
            return React.createElement(
                "div",
                { className: class_name, style: { maxWidth: this.max_width } },
                this.renderRow(first_row, false),
                this.renderRow(second_row, true)
            );
        }
    }, {
        key: "children",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("children", function () {
                return Array.isArray(_this3.props.children) ? _this3.props.children : [_this3.props.children];
            });
        }
    }, {
        key: "two_rows",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("two_rows", function () {
                return _this4.children.length >= 4;
            });
        }
    }, {
        key: "width_value",
        get: function get() {
            var _this5 = this;

            return this.fetchFromCache("width_value", function () {
                return _this5.two_rows ? 99.9 / (_this5.children.length + 1) * 2 : 99.9 / _this5.children.length;
            });
        }
    }, {
        key: "width",
        get: function get() {
            var _this6 = this;

            return this.fetchFromCache("width", function () {
                return _this6.width_value.toFixed(5) + "%";
            });
        }
    }, {
        key: "max_width",
        get: function get() {
            var _this7 = this;

            return this.fetchFromCache("max_width", function () {
                var line_size = _this7.two_rows ? Math.floor((_this7.children.length + 1) / 2 + 0.001) : _this7.children.length;
                return 600 * line_size + "px";
            });
        }
    }, {
        key: "asym_layout",
        get: function get() {
            var _this8 = this;

            return this.fetchFromCache("asym_layout", function () {
                return _this8.two_rows ? _this8.children % 2 === 0 : false;
            });
        }
    }]);

    return Grid;
}((0, _CacheMixin3.default)(React.Component));

exports.default = Grid;

},{"common/CacheMixin":64}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _api = require("server/api");

var _dialogs = require("ui/dialogs");

var _tablet_components = require("ui/tablet_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionsPage = function (_React$Component) {
    _inherits(ActionsPage, _React$Component);

    function ActionsPage() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ActionsPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ActionsPage)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.stopTour = function () {
            (0, _dialogs.showConfirm)((0, _l10n2.default)("tablet.confirms.stop_tour"), function () {
                if (_this.props.tour) {
                    (0, _api.Api)("tour.stop", { tour_id: _this.props.tour.id }).onSuccess(function () {
                        return swal.close();
                    }).send();
                }
            });
        }, _this.finalizeTour = function () {
            (0, _dialogs.showConfirm)((0, _l10n2.default)("tablet.confirms.finalize_tour"), function () {
                if (_this.props.tour) {
                    (0, _api.Api)("tour.finalize", { tour_id: _this.props.tour.id }).onSuccess(function () {
                        return swal.close();
                    }).send();
                }
            });
        }, _this.stopTourAndStartNext = function () {
            (0, _dialogs.showConfirm)((0, _l10n2.default)("tablet.confirms.stop_tour_and_start_next"), function () {
                if (_this.props.tour) {
                    (function () {
                        var tour_id = _this.props.tour.id;
                        (0, _api.Api)("tour.stop", { tour_id: tour_id }).onSuccess(function () {
                            (0, _api.Api)("tour.start_next_after", { tour_id: tour_id }).onSuccess(function () {
                                return swal.close();
                            }).send();
                        }).send();
                    })();
                }
            });
        }, _this.finalizeTourAndStartNext = function () {
            (0, _dialogs.showConfirm)((0, _l10n2.default)("tablet.confirms.finalize_tour_and_start_next"), function () {
                if (_this.props.tour) {
                    (function () {
                        var tour_id = _this.props.tour.id;
                        (0, _api.Api)("tour.finalize", { tour_id: tour_id }).onSuccess(function () {
                            (0, _api.Api)("tour.start_next_after", { tour_id: tour_id }).onSuccess(function () {
                                return swal.close();
                            }).send();
                        }).send();
                    })();
                }
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ActionsPage, [{
        key: "hasUnconfirmedScores",
        value: function hasUnconfirmedScores() {
            var runs = this.props.tour.runs;
            var latest_heat = runs[runs.length - 1].heat;
            if (latest_heat === runs[0].heat) {
                return false;
            }
            var latest_runs = runs.filter(function (r) {
                return r.heat === latest_heat;
            });
            var prev_runs = runs.filter(function (r) {
                return r.heat === latest_heat - 1;
            });
            var scores = new Map();
            var process_run = function process_run(run, type) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = run.scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var score = _step.value;

                        var dj_id = score.discipline_judge_id;
                        if (!scores.has(dj_id)) {
                            scores.set(dj_id, {
                                latest: 0,
                                prev: 0
                            });
                        }
                        if (score.confirmed) {
                            ++scores.get(dj_id)[type];
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
            };
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = latest_runs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var run = _step2.value;

                    process_run(run, "latest");
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = prev_runs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var run = _step3.value;

                    process_run(run, "prev");
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

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = scores.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var stats = _step4.value;

                    if (stats.prev > 0 && stats.latest < latest_runs.length) {
                        return true;
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

            return false;
        }
    }, {
        key: "renderWarning",
        value: function renderWarning() {
            if (!this.hasUnconfirmedScores()) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "warning" },
                React.createElement(
                    "div",
                    { className: "content" },
                    (0, _l10n2.default)("tablet.alerts.has_unconfirmed_scores")
                )
            );
        }
    }, {
        key: "renderButton",
        value: function renderButton(code, callback) {
            return React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-primary", type: "button"
                    }, (0, _tablet_components.onTouchOrClick)(callback)),
                    (0, _l10n2.default)("tablet.buttons." + code)
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "body actions" },
                this.renderWarning(),
                this.renderButton("stop_tour", this.stopTour),
                this.renderButton("finalize_tour", this.finalizeTour),
                this.renderButton("stop_tour_and_start_next", this.stopTourAndStartNext),
                this.renderButton("finalize_tour_and_start_next", this.finalizeTourAndStartNext)
            );
        }
    }]);

    return ActionsPage;
}(React.Component);

exports.default = ActionsPage;

},{"l10n":69,"server/api":72,"ui/dialogs":76,"ui/tablet_components":77}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActobaticOverrides = function (_React$Component) {
    _inherits(ActobaticOverrides, _React$Component);

    function ActobaticOverrides() {
        _classCallCheck(this, ActobaticOverrides);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ActobaticOverrides).apply(this, arguments));
    }

    _createClass(ActobaticOverrides, [{
        key: "getAcrobaticOverrides",
        value: function getAcrobaticOverrides() {
            return this.props.run.acrobatics.map(function (acro, idx) {
                return { idx: idx + 1, acrobatic: acro };
            }).filter(function (acro) {
                return acro.acrobatic.original_score !== acro.acrobatic.score;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var acrobatic_overrides = this.getAcrobaticOverrides();
            if (acrobatic_overrides.length === 0) {
                return null;
            }
            return React.createElement(
                "div",
                null,
                React.createElement("div", { className: "spacer" }),
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.head_judge.acrobatic_overrides")
                ),
                React.createElement(
                    "table",
                    { className: "full-width" },
                    React.createElement(
                        "tbody",
                        null,
                        acrobatic_overrides.map(function (acro) {
                            return React.createElement(
                                "tr",
                                { key: acro.idx },
                                React.createElement(
                                    "td",
                                    { className: "w-5" },
                                    acro.idx
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    acro.acrobatic.description
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-10 text-right" },
                                    acro.acrobatic.original_score.toFixed(1)
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-5 text-center" },
                                    "→"
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-10 text-left" },
                                    acro.acrobatic.score.toFixed(1)
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return ActobaticOverrides;
}(React.Component);

exports.default = ActobaticOverrides;

},{"l10n":69}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Item;
function Item(props) {
    var confirmed = props.score && props.score.confirmed;
    return React.createElement(
        "td",
        { className: confirmed ? "confirmed" : "" },
        props.score ? props.score.data.total_score.toFixed(2) : "—"
    );
}

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineJudgeScore = function (_CacheMixin) {
    _inherits(LineJudgeScore, _CacheMixin);

    function LineJudgeScore() {
        _classCallCheck(this, LineJudgeScore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LineJudgeScore).apply(this, arguments));
    }

    _createClass(LineJudgeScore, [{
        key: "renderNumbers",
        value: function renderNumbers() {
            var _this2 = this;

            return this.scores.map(function (score) {
                var dj = _this2.line_judges_index.get(score.discipline_judge_id);
                return React.createElement(
                    "td",
                    { key: score.id },
                    "" + dj.judge.number + (dj.role === "acro_judge" ? " (A)" : "")
                );
            });
        }
    }, {
        key: "renderScores",
        value: function renderScores() {
            var _this3 = this;

            return this.scores.map(function (score) {
                var dj = _this3.line_judges_index.get(score.discipline_judge_id);
                return React.createElement(_Item2.default, {
                    key: dj.id,
                    judge: dj.judge,
                    score: score });
            });
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
                    (0, _l10n2.default)("tablet.head_judge.dance_judge_scores")
                ),
                React.createElement(
                    "table",
                    { className: "dance-judge-scores" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            { className: "numbers" },
                            this.renderNumbers()
                        ),
                        React.createElement(
                            "tr",
                            { className: "scores" },
                            this.renderScores()
                        )
                    )
                )
            );
        }
    }, {
        key: "line_judges",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("line_judges", function () {
                return _this4.props.disciplineJudges.filter(function (dj) {
                    return dj.role === "dance_judge" || dj.role === "acro_judge";
                });
            });
        }
    }, {
        key: "line_judges_index",
        get: function get() {
            var _this5 = this;

            return this.fetchFromCache("line_judges_index", function () {
                var result = new Map();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this5.line_judges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var dj = _step.value;

                        result.set(dj.id, dj);
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
            });
        }
    }, {
        key: "scores",
        get: function get() {
            var _this6 = this;

            return this.fetchFromCache("scores", function () {
                return _this6.props.run.scores.filter(function (score) {
                    return _this6.line_judges_index.has(score.discipline_judge_id);
                });
            });
        }
    }]);

    return LineJudgeScore;
}((0, _CacheMixin3.default)(React.Component));

exports.default = LineJudgeScore;

},{"./Item":35,"common/CacheMixin":64,"l10n":69}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _api = require("server/api");

var _tablet_components = require("ui/tablet_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotPerformedSwitch = function (_React$Component) {
    _inherits(NotPerformedSwitch, _React$Component);

    function NotPerformedSwitch() {
        _classCallCheck(this, NotPerformedSwitch);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotPerformedSwitch).apply(this, arguments));
    }

    _createClass(NotPerformedSwitch, [{
        key: "markNotPerformed",
        value: function markNotPerformed() {
            (0, _api.Api)("run.mark_not_performed", { run_id: this.props.run.id }).send();
        }
    }, {
        key: "markPerformed",
        value: function markPerformed() {
            (0, _api.Api)("run.mark_performed", { run_id: this.props.run.id }).send();
        }
    }, {
        key: "renderButton",
        value: function renderButton() {
            if (this.props.run.performed) {
                return React.createElement(
                    "button",
                    _extends({ type: "button", className: "btn btn-sm btn-danger" }, (0, _tablet_components.onTouchOrClick)(this.markNotPerformed.bind(this))),
                    (0, _l10n2.default)("tablet.global.mark_not_performed")
                );
            } else {
                return React.createElement(
                    "button",
                    _extends({ type: "button", className: "btn btn-sm btn-success" }, (0, _tablet_components.onTouchOrClick)(this.markPerformed.bind(this))),
                    (0, _l10n2.default)("tablet.global.discard_not_performed")
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "not-performed-control" },
                this.renderButton()
            );
        }
    }]);

    return NotPerformedSwitch;
}(React.Component);

exports.default = NotPerformedSwitch;

},{"l10n":69,"server/api":72,"ui/tablet_components":77}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _tablet_components = require("ui/tablet_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PenaltyInput = function (_React$Component) {
    _inherits(PenaltyInput, _React$Component);

    function PenaltyInput() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, PenaltyInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PenaltyInput)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onUpdate = function (value) {
            _this.props.onScoreUpdate("penalty", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PenaltyInput, [{
        key: "render",
        value: function render() {
            var penalties = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.scoringSystemName) >= 0 ? [[0, (0, _l10n2.default)("tablet.head_judge.ok")], [-5, (0, _l10n2.default)("tablet.head_judge.form_yellow_card")], [-15, (0, _l10n2.default)("tablet.head_judge.form_red_card")]] : [[0, (0, _l10n2.default)("tablet.head_judge.ok")], [-3, (0, _l10n2.default)("tablet.head_judge.yellow_card")], [-30, (0, _l10n2.default)("tablet.head_judge.red_card")], [-100, (0, _l10n2.default)("tablet.head_judge.black_card")]];
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.head_judge.penalty_type")
                ),
                React.createElement(_tablet_components.TabletSelectorInput, {
                    choices: penalties,
                    value: this.props.score.data.raw_data.penalty,
                    onValueUpdate: this.onUpdate })
            );
        }
    }]);

    return PenaltyInput;
}(React.Component);

exports.default = PenaltyInput;

},{"l10n":69,"ui/tablet_components":77}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = PreviousPenalties;

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PreviousPenalties(props) {
    if (!props.run.inherited_data.penalties || props.run.inherited_data.penalties.length === 0) {
        return React.createElement("div", null);
    }
    return React.createElement(
        "div",
        null,
        React.createElement("div", { className: "spacer" }),
        React.createElement(
            "h3",
            null,
            (0, _l10n2.default)("tablet.head_judge.previous_run.inherited_data.penalties")
        ),
        React.createElement(
            "table",
            { className: "full-width" },
            React.createElement(
                "tbody",
                null,
                " ",
                props.run.inherited_data.penalties.map(function (d, idx) {
                    return React.createElement(
                        "tr",
                        { key: idx },
                        React.createElement(
                            "td",
                            { className: "w-10 text-center" },
                            React.createElement(
                                "strong",
                                null,
                                d.penalty
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            d.tour
                        )
                    );
                })
            )
        )
    );
}

},{"l10n":69}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
    }

    _createClass(Item, [{
        key: "getTimingData",
        value: function getTimingData() {
            if (!this.props.score) {
                return ["-", ""];
            }
            var tv_raw_value = this.props.score.data.raw_data.timing_violation;
            if (tv_raw_value === null) {
                return ["-", ""];
            } else if (tv_raw_value) {
                return ["X", " fail"];
            } else {
                return ["OK", " ok"];
            }
        }
    }, {
        key: "render",
        value: function render() {
            var timing_data = this.getTimingData();
            var jump_steps = this.props.score ? this.props.score.data.raw_data.jump_steps : 0;
            var confirmed = this.props.score && this.props.score.confirmed;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    { className: confirmed ? "confirmed" : "" },
                    this.props.judge.name
                ),
                React.createElement(
                    "table",
                    { className: "tech-judge-info" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                { className: "title" },
                                (0, _l10n2.default)("tablet.tech_judge.jump_steps")
                            ),
                            React.createElement(
                                "td",
                                { className: "value" },
                                React.createElement(
                                    "div",
                                    { className: "inner" },
                                    jump_steps
                                )
                            ),
                            React.createElement(
                                "td",
                                { className: "title" },
                                (0, _l10n2.default)("tablet.tech_judge.timing")
                            ),
                            React.createElement(
                                "td",
                                { className: "value" },
                                React.createElement(
                                    "div",
                                    { className: "inner" + timing_data[1] },
                                    timing_data[0]
                                )
                            )
                        )
                    )
                )
            );
        }
    }], [{
        key: "propTypes",
        get: function get() {
            return {
                score: React.PropTypes.object.isRequired,
                judge: React.PropTypes.object.isRequired
            };
        }
    }]);

    return Item;
}(React.Component);

exports.default = Item;

},{"l10n":69}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TechJudgesScores = function (_CacheMixin) {
    _inherits(TechJudgesScores, _CacheMixin);

    function TechJudgesScores() {
        _classCallCheck(this, TechJudgesScores);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TechJudgesScores).apply(this, arguments));
    }

    _createClass(TechJudgesScores, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                this.scores.map(function (score) {
                    return React.createElement(_Item2.default, {
                        key: score.id,
                        score: score,
                        judge: _this2.tech_judges_index.get(score.discipline_judge_id).judge });
                })
            );
        }
    }, {
        key: "tech_judges",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("tech_judges", function () {
                return _this3.props.disciplineJudges.filter(function (dj) {
                    return dj.role === "tech_judge";
                });
            });
        }
    }, {
        key: "tech_judges_index",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("tech_judges_index", function () {
                var result = new Map();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this4.tech_judges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var dj = _step.value;

                        result.set(dj.id, dj);
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
            });
        }
    }, {
        key: "scores",
        get: function get() {
            var _this5 = this;

            return this.fetchFromCache("scores", function () {
                return _this5.props.run.scores.filter(function (score) {
                    return _this5.tech_judges_index.has(score.discipline_judge_id);
                });
            });
        }
    }]);

    return TechJudgesScores;
}((0, _CacheMixin3.default)(React.Component));

exports.default = TechJudgesScores;

},{"./Item":40,"common/CacheMixin":64}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _PenaltyInput = require("./PenaltyInput");

var _PenaltyInput2 = _interopRequireDefault(_PenaltyInput);

var _TechJudgesScores = require("./TechJudgesScores");

var _TechJudgesScores2 = _interopRequireDefault(_TechJudgesScores);

var _LineJudgesScores = require("./LineJudgesScores");

var _LineJudgesScores2 = _interopRequireDefault(_LineJudgesScores);

var _AcrobaticOverrides = require("./AcrobaticOverrides");

var _AcrobaticOverrides2 = _interopRequireDefault(_AcrobaticOverrides);

var _PreviousPenalties = require("./PreviousPenalties");

var _PreviousPenalties2 = _interopRequireDefault(_PreviousPenalties);

var _NotPerformedSwitch = require("./NotPerformedSwitch");

var _NotPerformedSwitch2 = _interopRequireDefault(_NotPerformedSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_CacheMixin) {
    _inherits(ScoringLayout, _CacheMixin);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onScoreUpdate = function (key, value) {
            var score_data = {};
            score_data[key] = value;
            _this.props.onScoreUpdate(_this.score.id, score_data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "render",
        value: function render() {
            var header = (0, _l10n2.default)("global.phrases.participant_n", this.props.run.participant.number, this.props.run.participant.name, this.props.run.participant.sportsmen.length);
            if (!this.props.run.performed) {
                return React.createElement(
                    "div",
                    { className: "layout-participant" },
                    React.createElement(
                        "h2",
                        null,
                        header
                    ),
                    React.createElement(_NotPerformedSwitch2.default, {
                        run: this.props.run })
                );
            }
            return React.createElement(
                "div",
                { className: "layout-participant" },
                React.createElement(
                    "h2",
                    null,
                    header
                ),
                React.createElement(_PenaltyInput2.default, {
                    score: this.score,
                    onScoreUpdate: this.onScoreUpdate,
                    scoringSystemName: this.props.tour.scoring_system_name }),
                React.createElement(_TechJudgesScores2.default, {
                    run: this.props.run,
                    disciplineJudges: this.props.tour.discipline.discipline_judges }),
                React.createElement(_LineJudgesScores2.default, {
                    run: this.props.run,
                    disciplineJudges: this.props.tour.discipline.discipline_judges }),
                React.createElement(_AcrobaticOverrides2.default, {
                    run: this.props.run }),
                React.createElement(_PreviousPenalties2.default, {
                    run: this.props.run }),
                React.createElement(_NotPerformedSwitch2.default, {
                    run: this.props.run })
            );
        }
    }, {
        key: "score",
        get: function get() {
            var _this2 = this;

            return this.fetchFromCache("score", function () {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this2.props.run.scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var score = _step.value;

                        if (score.discipline_judge_id === _this2.props.disciplineJudge.id) {
                            return score;
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

                return null;
            });
        }
    }]);

    return ScoringLayout;
}((0, _CacheMixin3.default)(React.Component));

exports.default = ScoringLayout;

},{"./AcrobaticOverrides":34,"./LineJudgesScores":36,"./NotPerformedSwitch":37,"./PenaltyInput":38,"./PreviousPenalties":39,"./TechJudgesScores":41,"common/CacheMixin":64,"l10n":69}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _Grid = require("JudgeTablet/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeatsPage = function (_CacheMixin) {
    _inherits(HeatsPage, _CacheMixin);

    function HeatsPage() {
        _classCallCheck(this, HeatsPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HeatsPage).apply(this, arguments));
    }

    _createClass(HeatsPage, [{
        key: "renderScores",
        value: function renderScores() {
            var _this2 = this;

            return this.runs.map(function (run) {
                return React.createElement(_ScoringLayout2.default, {
                    key: run.id,
                    run: run,
                    tour: _this2.props.tour,
                    disciplineJudge: _this2.props.disciplineJudge,
                    onScoreUpdate: _this2.props.onScoreUpdate });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "body heats" },
                React.createElement(
                    _Grid2.default,
                    null,
                    this.renderScores()
                )
            );
        }
    }, {
        key: "runs",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("runs", function () {
                return _this3.props.tour.runs.filter(function (run) {
                    return run.heat === _this3.props.heat;
                });
            });
        }
    }]);

    return HeatsPage;
}((0, _CacheMixin3.default)(React.Component));

exports.default = HeatsPage;

},{"./ScoringLayout":42,"JudgeTablet/Grid":32,"common/CacheMixin":64}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _ResultsTable = require("ResultsTable2");

var _ResultsTable2 = _interopRequireDefault(_ResultsTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsPage = function (_React$Component) {
    _inherits(ResultsPage, _React$Component);

    // Initialization

    function ResultsPage(props) {
        _classCallCheck(this, ResultsPage);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ResultsPage).call(this, props));

        _this.state = {
            tour: null,
            results: null
        };
        _this.TOUR_SCHEMA = {
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
        return _this;
    }

    _createClass(ResultsPage, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.storage = _storage.storage.getDomain("results_" + this.props.tour.id);
            this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData.bind(this));
            this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.results_change_listener = _message_dispatcher.message_dispatcher.addListener("tour_results_changed reload_data", function (message) {
                if (!message || message.tour_id === this.props.tour.id) {
                    this.loadResults();
                }
            }.bind(this));
            this.loadData();
            this.loadResults();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
            _message_dispatcher.message_dispatcher.removeListener(this.results_change_listener);
            _storage.storage.delDomain("results_" + this.props.tour.id);
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var serialized = this.storage.get("Tour").by_id(this.props.tour.id).serialize(this.TOUR_SCHEMA);
            this.setState({
                tour: serialized
            });
        }
    }, {
        key: "loadResults",
        value: function loadResults() {
            (0, _api.Api)("tour.get_results", { tour_id: this.props.tour.id }).onSuccess(function (new_results) {
                this.setState({
                    "results": new_results
                });
                this.reloadFromStorage();
            }.bind(this)).send();
        }
    }, {
        key: "loadData",
        value: function loadData() {
            (0, _api.Api)("tour.get", { tour_id: this.props.tour.id, children: this.TOUR_SCHEMA }).addToDB("Tour", this.props.tour.id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.tour === null || this.state.results === null) {
                return React.createElement("div", null);
            }
            return React.createElement(
                "div",
                { className: "body results" },
                React.createElement(
                    "div",
                    { className: "tour-results" },
                    React.createElement(_ResultsTable2.default, this.state)
                )
            );
        }
    }]);

    return ResultsPage;
}(React.Component);

exports.default = ResultsPage;

},{"ResultsTable2":60,"server/api":72,"server/message_dispatcher":73,"server/storage":74}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _Header = require("JudgeTablet/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require("JudgeTablet/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _FooterItem = require("JudgeTablet/Footer/FooterItem");

var _FooterItem2 = _interopRequireDefault(_FooterItem);

var _HeatsPage = require("./HeatsPage");

var _HeatsPage2 = _interopRequireDefault(_HeatsPage);

var _ResultsPage = require("./ResultsPage");

var _ResultsPage2 = _interopRequireDefault(_ResultsPage);

var _ActionsPage = require("./ActionsPage");

var _ActionsPage2 = _interopRequireDefault(_ActionsPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadJudgeLayout = function (_React$Component) {
    _inherits(HeadJudgeLayout, _React$Component);

    function HeadJudgeLayout(props) {
        _classCallCheck(this, HeadJudgeLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HeadJudgeLayout).call(this, props));

        _this.onPrevHeatClick = function () {
            _this.updateHeat(_this.state.heat - 1);
        };

        _this.onNextHeatClick = function () {
            _this.updateHeat(_this.state.heat + 1);
        };

        _this.onPageChange = function (page) {
            _this.setState({ page: page });
        };

        _this.state = {
            heat: 1,
            page: "heats"
        };
        return _this;
    }

    _createClass(HeadJudgeLayout, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (next_props.tour.id !== this.props.tour.id) {
                this.setState({
                    heat: 1
                });
            }
        }
    }, {
        key: "updateHeat",
        value: function updateHeat(value) {
            this.setState({
                heat: value
            });
        }
    }, {
        key: "renderHeats",
        value: function renderHeats() {
            return React.createElement(_HeatsPage2.default, {
                disciplineJudge: this.props.disciplineJudge,
                heat: this.state.heat,
                tour: this.props.tour,
                onScoreUpdate: this.props.onScoreUpdate });
        }
    }, {
        key: "renderResults",
        value: function renderResults() {
            return React.createElement(_ResultsPage2.default, {
                tour: this.props.tour });
        }
    }, {
        key: "renderActions",
        value: function renderActions() {
            return React.createElement(_ActionsPage2.default, {
                tour: this.props.tour });
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var heats_count = this.heats_count;
            return React.createElement(_Header2.default, {
                judge: this.props.disciplineJudge.judge,
                tour: this.props.tour,
                heat: this.state.heat,
                heatsCount: heats_count,
                maxHeat: heats_count,
                onPrevHeatClick: this.onPrevHeatClick,
                onNextHeatClick: this.onNextHeatClick });
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            switch (this.state.page) {
                case "heats":
                    return this.renderHeats();
                case "results":
                    return this.renderResults();
                case "actions":
                    return this.renderActions();
            }
        }
    }, {
        key: "renderFooter",
        value: function renderFooter() {
            return React.createElement(
                _Footer2.default,
                { value: this.state.page, onChange: this.onPageChange },
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.heats"),
                    mkey: "heats" }),
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.results"),
                    mkey: "results" }),
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.actions"),
                    mkey: "actions" })
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "judge-tablet" },
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            );
        }
    }, {
        key: "heats_count",
        get: function get() {
            var _Math;

            return (_Math = Math).max.apply(_Math, _toConsumableArray(this.props.tour.runs.map(function (run) {
                return run.heat;
            })));
        }
    }]);

    return HeadJudgeLayout;
}(React.Component);

exports.default = HeadJudgeLayout;

},{"./ActionsPage":33,"./HeatsPage":43,"./ResultsPage":44,"JudgeTablet/Footer":20,"JudgeTablet/Footer/FooterItem":19,"JudgeTablet/Header":46,"l10n":69}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
    }

    _createClass(Header, [{
        key: "renderPrevHeatButton",
        value: function renderPrevHeatButton() {
            if (this.props.heat <= 1) {
                return null;
            }
            return React.createElement(
                "button",
                { className: "btn btn-primary pull-left", onClick: this.props.onPrevHeatClick },
                (0, _l10n2.default)("tablet.buttons.prev_heat")
            );
        }
    }, {
        key: "renderNextHeatButton",
        value: function renderNextHeatButton() {
            if (this.props.heat >= this.props.maxHeat) {
                return null;
            }
            return React.createElement(
                "button",
                { className: "btn btn-primary pull-right", onClick: this.props.onNextHeatClick },
                (0, _l10n2.default)("tablet.buttons.next_heat")
            );
        }
    }, {
        key: "render",
        value: function render() {
            var judge_number = this.props.judge.role_description || (0, _l10n2.default)("global.phrases.judge_n", this.props.judge.number);
            return React.createElement(
                "header",
                null,
                this.renderPrevHeatButton(),
                this.renderNextHeatButton(),
                React.createElement(
                    "div",
                    { className: "header" },
                    React.createElement(
                        "table",
                        { className: "full-width" },
                        React.createElement(
                            "tbody",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    null,
                                    React.createElement(
                                        "h1",
                                        null,
                                        judge_number
                                    ),
                                    React.createElement(
                                        "h2",
                                        null,
                                        this.props.judge.name
                                    )
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    React.createElement(
                                        "h1",
                                        null,
                                        this.props.tour.discipline.name
                                    ),
                                    React.createElement(
                                        "h2",
                                        null,
                                        this.props.tour.name,
                                        "       ",
                                        (0, _l10n2.default)("tablet.global.heat_number", this.props.heat, this.props.heatsCount)
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(React.Component);

exports.default = Header;

},{"l10n":69}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _GeneralScale = require("JudgeTablet/GeneralScale");

var _GeneralScale2 = _interopRequireDefault(_GeneralScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_React$Component) {
    _inherits(ScoringLayout, _React$Component);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onValueUpdate = function (value) {
            _this.props.onScoreUpdate("points", value);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "render",
        value: function render() {
            return React.createElement(_GeneralScale2.default, {
                value: this.props.scoreData.points,
                scale: "grid",
                onValueUpdate: this.onValueUpdate,
                min: 1,
                max: 40,
                rowSize: 10 });
        }
    }]);

    return ScoringLayout;
}(React.Component);

exports.default = ScoringLayout;

},{"JudgeTablet/GeneralScale":31,"l10n":69}],48:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./ScoringLayout":47,"JudgeTablet/GeneralLayout":30,"dup":13}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tablet_components = require("ui/tablet_components");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function (_React$Component) {
    _inherits(Element, _React$Component);

    function Element() {
        _classCallCheck(this, Element);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Element).apply(this, arguments));
    }

    _createClass(Element, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "tech-judge-acro" },
                React.createElement(
                    "div",
                    { className: "controls pull-right" },
                    React.createElement(
                        "div",
                        { className: "setter" },
                        React.createElement(_tablet_components.TabletAcroOverrideInput, {
                            original_value: this.props.acro.original_score,
                            value: this.props.acro.score,
                            onValueUpdate: this.props.onAcroOverride })
                    )
                ),
                React.createElement(
                    "h3",
                    null,
                    this.props.acro.description
                ),
                React.createElement("div", { className: "clearfix" })
            );
        }
    }]);

    return Element;
}(React.Component);

exports.default = Element;

},{"ui/tablet_components":77}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require("server/api");

var _api2 = _interopRequireDefault(_api);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _ConfirmationButton = require("JudgeTablet/ConfirmationButton");

var _ConfirmationButton2 = _interopRequireDefault(_ConfirmationButton);

var _Element = require("./Element");

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_CacheMixin) {
    _inherits(ScoringLayout, _CacheMixin);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onConfirm = function () {
            _this.props.onScoreConfirm(_this.score.id);
        }, _this.onAcroOverride = function (acro_idx, value) {
            if (_this.score.confirmed) {
                return;
            }
            (0, _api2.default)("acrobatic_override.set", {
                run_id: _this.props.run.id,
                acrobatic_idx: acro_idx,
                score: value
            }).send();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "genOnAcroOverride",
        value: function genOnAcroOverride(acro_idx) {
            var _this2 = this;

            return function (new_value) {
                return _this2.onAcroOverride(acro_idx, new_value);
            };
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            var _this3 = this;

            return this.props.run.acrobatics.map(function (acro, idx) {
                return React.createElement(_Element2.default, {
                    key: idx,
                    acro: acro,
                    onAcroOverride: _this3.genOnAcroOverride(idx) });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderContent(),
                React.createElement(_ConfirmationButton2.default, {
                    confirmed: this.score.confirmed,
                    onConfirm: this.onConfirm })
            );
        }
    }, {
        key: "score",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("score", function () {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this4.props.run.scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var score = _step.value;

                        if (score.discipline_judge_id === _this4.props.disciplineJudge.id) {
                            return score;
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

                return null;
            });
        }
    }]);

    return ScoringLayout;
}((0, _CacheMixin3.default)(React.Component));

exports.default = ScoringLayout;

},{"./Element":49,"JudgeTablet/ConfirmationButton":9,"common/CacheMixin":64,"server/api":72}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require("JudgeTablet/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AcroPage = function (_React$Component) {
    _inherits(AcroPage, _React$Component);

    function AcroPage() {
        _classCallCheck(this, AcroPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AcroPage).apply(this, arguments));
    }

    _createClass(AcroPage, [{
        key: "renderScores",
        value: function renderScores() {
            var _this2 = this;

            return this.props.runs.map(function (run) {
                return React.createElement(_ScoringLayout2.default, {
                    key: run.id,
                    run: run,
                    tour: _this2.props.tour,
                    disciplineJudge: _this2.props.disciplineJudge,
                    onAcroOverride: _this2.props.onAcroOverride,
                    onScoreConfirm: _this2.props.onScoreConfirm });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "body heats" },
                React.createElement(
                    _Grid2.default,
                    null,
                    this.renderScores()
                )
            );
        }
    }]);

    return AcroPage;
}(React.Component);

exports.default = AcroPage;

},{"./ScoringLayout":50,"JudgeTablet/Grid":32}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _ConfirmationButton = require("JudgeTablet/ConfirmationButton");

var _ConfirmationButton2 = _interopRequireDefault(_ConfirmationButton);

var _tablet_components = require("ui/tablet_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoringLayout = function (_CacheMixin) {
    _inherits(ScoringLayout, _CacheMixin);

    function ScoringLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ScoringLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ScoringLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onConfirm = function () {
            _this.props.onScoreConfirm(_this.score.id);
        }, _this.onScoreUpdate = function (part, value) {
            var data = {};
            data[part] = value;
            _this.props.onScoreUpdate(_this.score.id, data);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScoringLayout, [{
        key: "genOnScoreUpdate",
        value: function genOnScoreUpdate(score_part) {
            var _this2 = this;

            return function (new_value) {
                return _this2.onScoreUpdate(score_part, new_value);
            };
        }
    }, {
        key: "render",
        value: function render() {
            var score = this.score.data;
            var class_name = this.score.confirmed ? "layout-participant read-only" : "layout-participant";
            return React.createElement(
                "div",
                { className: class_name },
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.tech_judge.jump_steps")
                ),
                React.createElement(_tablet_components.TabletIntegerInput, {
                    sendDeltas: true,
                    value: score.raw_data.jump_steps,
                    onValueUpdate: this.genOnScoreUpdate("jump_steps") }),
                React.createElement("div", { className: "spacer" }),
                React.createElement(
                    "h3",
                    null,
                    (0, _l10n2.default)("tablet.tech_judge.timing")
                ),
                React.createElement(_tablet_components.StopWatch, { score_id: this.score.id }),
                React.createElement(_tablet_components.TabletSelectorInput, {
                    choices: [[true, "X"], [null, "-"], [false, "OK"]],
                    value: score.raw_data.timing_violation,
                    onValueUpdate: this.genOnScoreUpdate("timing_violation") }),
                React.createElement(_ConfirmationButton2.default, {
                    confirmed: this.score.confirmed,
                    onConfirm: this.onConfirm })
            );
        }
    }, {
        key: "score",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("score", function () {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this3.props.run.scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var score = _step.value;

                        if (score.discipline_judge_id === _this3.props.disciplineJudge.id) {
                            return score;
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

                return null;
            });
        }
    }]);

    return ScoringLayout;
}((0, _CacheMixin3.default)(React.Component));

exports.default = ScoringLayout;

},{"JudgeTablet/ConfirmationButton":9,"common/CacheMixin":64,"l10n":69,"ui/tablet_components":77}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require("JudgeTablet/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _ScoringLayout = require("./ScoringLayout");

var _ScoringLayout2 = _interopRequireDefault(_ScoringLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DancingPage = function (_React$Component) {
    _inherits(DancingPage, _React$Component);

    function DancingPage() {
        _classCallCheck(this, DancingPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DancingPage).apply(this, arguments));
    }

    _createClass(DancingPage, [{
        key: "renderScores",
        value: function renderScores() {
            var _this2 = this;

            return this.props.runs.map(function (run) {
                return React.createElement(_ScoringLayout2.default, {
                    key: run.id,
                    run: run,
                    tour: _this2.props.tour,
                    disciplineJudge: _this2.props.disciplineJudge,
                    onScoreUpdate: _this2.props.onScoreUpdate,
                    onScoreConfirm: _this2.props.onScoreConfirm });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "body heats" },
                React.createElement(
                    _Grid2.default,
                    null,
                    this.renderScores()
                )
            );
        }
    }]);

    return DancingPage;
}(React.Component);

exports.default = DancingPage;

},{"./ScoringLayout":52,"JudgeTablet/Grid":32}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _CacheMixin2 = require("common/CacheMixin");

var _CacheMixin3 = _interopRequireDefault(_CacheMixin2);

var _Header = require("JudgeTablet/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require("JudgeTablet/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _FooterItem = require("JudgeTablet/Footer/FooterItem");

var _FooterItem2 = _interopRequireDefault(_FooterItem);

var _DancingPage = require("./DancingPage");

var _DancingPage2 = _interopRequireDefault(_DancingPage);

var _AcroPage = require("./AcroPage");

var _AcroPage2 = _interopRequireDefault(_AcroPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadJudgeLayout = function (_CacheMixin) {
    _inherits(HeadJudgeLayout, _CacheMixin);

    function HeadJudgeLayout(props) {
        _classCallCheck(this, HeadJudgeLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HeadJudgeLayout).call(this, props));

        _this.onPrevHeatClick = function () {
            _this.updateHeat(_this.state.heat - 1);
        };

        _this.onNextHeatClick = function () {
            _this.updateHeat(_this.state.heat + 1);
        };

        _this.onPageChange = function (page) {
            _this.setState({ page: page });
        };

        _this.state = {
            heat: _this.first_non_confirmed_heat,
            page: "dancing"
        };
        return _this;
    }

    _createClass(HeadJudgeLayout, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next_props) {
            if (next_props.tour.id !== this.props.tour.id) {
                this.setState({
                    heat: this.first_non_confirmed_heat
                });
            }
        }
    }, {
        key: "updateHeat",
        value: function updateHeat(value) {
            this.setState({
                heat: value
            });
        }
    }, {
        key: "renderDancing",
        value: function renderDancing() {
            return React.createElement(_DancingPage2.default, {
                runs: this.runs,
                disciplineJudge: this.props.disciplineJudge,
                onScoreUpdate: this.props.onScoreUpdate,
                onScoreConfirm: this.props.onScoreConfirm });
        }
    }, {
        key: "renderAcro",
        value: function renderAcro() {
            return React.createElement(_AcroPage2.default, {
                runs: this.runs,
                disciplineJudge: this.props.disciplineJudge,
                onScoreUpdate: this.props.onScoreUpdate,
                onScoreConfirm: this.props.onScoreConfirm });
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var heats_count = this.heats_count;
            return React.createElement(_Header2.default, {
                judge: this.props.disciplineJudge.judge,
                tour: this.props.tour,
                heat: this.state.heat,
                heatsCount: heats_count,
                maxHeat: heats_count,
                onPrevHeatClick: this.onPrevHeatClick,
                onNextHeatClick: this.onNextHeatClick });
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            switch (this.state.page) {
                case "dancing":
                    return this.renderDancing();
                case "acro":
                    return this.renderAcro();
            }
        }
    }, {
        key: "renderFooter",
        value: function renderFooter() {
            if (["rosfarr.acro", "rosfarr.am_final_acro"].indexOf(this.props.tour.scoring_system_name) < 0) {
                return null;
            }
            return React.createElement(
                _Footer2.default,
                { value: this.state.page, onChange: this.onPageChange },
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.dancing"),
                    mkey: "dancing" }),
                React.createElement(_FooterItem2.default, {
                    label: (0, _l10n2.default)("tablet.pages.acro"),
                    mkey: "acro" })
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "judge-tablet" },
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            );
        }
    }, {
        key: "heats_count",
        get: function get() {
            var _this2 = this;

            return this.fetchFromCache("heats_count", function () {
                var _Math;

                return (_Math = Math).max.apply(_Math, _toConsumableArray(_this2.props.tour.runs.map(function (run) {
                    return run.heat;
                })));
            });
        }
    }, {
        key: "runs",
        get: function get() {
            var _this3 = this;

            return this.fetchFromCache("runs", function () {
                return _this3.props.tour.runs.filter(function (run) {
                    return run.heat === _this3.state.heat;
                });
            });
        }
    }, {
        key: "first_non_confirmed_heat",
        get: function get() {
            var _this4 = this;

            return this.fetchFromCache("first_non_confirmed_heat", function () {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this4.props.tour.runs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var run = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = run.scores[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var score = _step2.value;

                                if (score.discipline_judge_id === _this4.props.disciplineJudge.id && !score.confirmed && run.performed) {
                                    return run.heat;
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

                return _this4.heats_count;
            });
        }
    }]);

    return HeadJudgeLayout;
}((0, _CacheMixin3.default)(React.Component));

exports.default = HeadJudgeLayout;

},{"./AcroPage":51,"./DancingPage":53,"JudgeTablet/Footer":20,"JudgeTablet/Footer/FooterItem":19,"JudgeTablet/Header":46,"common/CacheMixin":64,"l10n":69}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getScoringType = require("common/getScoringType");

var _getScoringType2 = _interopRequireDefault(_getScoringType);

var _AcrobaticsLayout = require("./AcrobaticsLayout");

var _AcrobaticsLayout2 = _interopRequireDefault(_AcrobaticsLayout);

var _DanceLayout = require("./DanceLayout");

var _DanceLayout2 = _interopRequireDefault(_DanceLayout);

var _DanceHalvedLayout = require("./DanceHalvedLayout");

var _DanceHalvedLayout2 = _interopRequireDefault(_DanceHalvedLayout);

var _FormationLayout = require("./FormationLayout");

var _FormationLayout2 = _interopRequireDefault(_FormationLayout);

var _FormationAcroLayout = require("./FormationAcroLayout");

var _FormationAcroLayout2 = _interopRequireDefault(_FormationAcroLayout);

var _SimplifiedLayout = require("./SimplifiedLayout");

var _SimplifiedLayout2 = _interopRequireDefault(_SimplifiedLayout);

var _HeadJudgeLayout = require("./HeadJudgeLayout");

var _HeadJudgeLayout2 = _interopRequireDefault(_HeadJudgeLayout);

var _TechJudgeLayout = require("./TechJudgeLayout");

var _TechJudgeLayout2 = _interopRequireDefault(_TechJudgeLayout);

var _api = require("server/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JudgeTablet = function (_React$Component) {
    _inherits(JudgeTablet, _React$Component);

    function JudgeTablet() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, JudgeTablet);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(JudgeTablet)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onScoreUpdate = function (score_id, new_score) {
            var request = {
                score_data: new_score,
                force: false
            };
            (0, _api.Api)("score.set", { score_id: score_id, data: request }).send();
        }, _this.onScoreConfirm = function (score_id) {
            (0, _api.Api)("score.confirm", { score_id: score_id }).send();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(JudgeTablet, [{
        key: "render",
        value: function render() {
            var scoring_type = (0, _getScoringType2.default)(this.props.disciplineJudge, this.props.tour.scoring_system_name);
            var LayoutClass = JudgeTablet.LAYOUTS[scoring_type];
            if (!LayoutClass) {
                return React.createElement(
                    "div",
                    null,
                    "Not implemented!"
                );
            }
            return React.createElement(LayoutClass, {
                disciplineJudge: this.props.disciplineJudge,
                tour: this.props.tour,
                onScoreUpdate: this.onScoreUpdate,
                onScoreConfirm: this.onScoreConfirm });
        }
    }]);

    return JudgeTablet;
}(React.Component);

JudgeTablet.LAYOUTS = {
    "acro": _AcrobaticsLayout2.default,
    "dance": _DanceLayout2.default,
    "dance_halved": _DanceHalvedLayout2.default,
    "formation": _FormationLayout2.default,
    "formation_acro": _FormationAcroLayout2.default,
    "simplified": _SimplifiedLayout2.default,
    "head": _HeadJudgeLayout2.default,
    "tech": _TechJudgeLayout2.default
};
exports.default = JudgeTablet;

},{"./AcrobaticsLayout":8,"./DanceHalvedLayout":13,"./DanceLayout":17,"./FormationAcroLayout":24,"./FormationLayout":28,"./HeadJudgeLayout":45,"./SimplifiedLayout":48,"./TechJudgeLayout":54,"common/getScoringType":68,"server/api":72}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getParticipantDisplay = require("common/getParticipantDisplay");

var _getParticipantDisplay2 = _interopRequireDefault(_getParticipantDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsTableRow = function (_React$Component) {
    _inherits(TourResultsTableRow, _React$Component);

    function TourResultsTableRow() {
        _classCallCheck(this, TourResultsTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsTableRow).apply(this, arguments));
    }

    _createClass(TourResultsTableRow, [{
        key: "render",
        value: function render() {
            var card = this.props.run.performed ? this.props.head_judge_score ? this.props.head_judge_score.data.total_score : "0" : React.createElement(
                "span",
                null,
                "—"
            );
            var total_score = this.props.has_total_score ? this.props.run.performed ? React.createElement(
                "p",
                { className: "text-center" },
                React.createElement(
                    "strong",
                    null,
                    this.props.run.verbose_total_score.primary_score.toFixed(2)
                ),
                " /",
                " ",
                this.props.run.verbose_total_score.secondary_score.toFixed(2)
            ) : React.createElement(
                "p",
                { className: "text-center" },
                "—"
            ) : null;
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "w-7 place" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.results_info.place
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-6 number" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.run.participant.number
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-30 participant" },
                    (0, _getParticipantDisplay2.default)(this.props.run.participant)
                ),
                React.createElement(
                    "td",
                    { className: "club" },
                    React.createElement(
                        "p",
                        null,
                        this.props.run.participant.club.name
                    )
                ),
                this.props.has_total_score ? React.createElement(
                    "td",
                    { className: "w-18 score" },
                    total_score
                ) : null,
                React.createElement(
                    "td",
                    { className: "w-8 card" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        card
                    )
                )
            );
        }
    }]);

    return TourResultsTableRow;
}(React.Component);

exports.default = TourResultsTableRow;

},{"common/getParticipantDisplay":67}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _TourScoresWrapper = require("common/TourScoresWrapper");

var _TourScoresWrapper2 = _interopRequireDefault(_TourScoresWrapper);

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsTable1 = function (_React$Component) {
    _inherits(ResultsTable1, _React$Component);

    function ResultsTable1() {
        _classCallCheck(this, ResultsTable1);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultsTable1).apply(this, arguments));
    }

    _createClass(ResultsTable1, [{
        key: "renderAdvancesHeader",
        value: function renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
            var prev_status = prev_row ? prev_run.performed ? prev_row.advances ? "advanced" : "not_advanced" : "not_performed" : null;
            var next_status = next_run.performed ? next_row.advances ? "advanced" : "not_advanced" : "not_performed";
            var result = prev_status !== next_status ? next_status === "not_performed" ? React.createElement(
                "p",
                { className: "text-left" },
                (0, _l10n2.default)("results.headers.participants_not_performed")
            ) : has_next_tour ? next_status === "not_advanced" ? React.createElement(
                "p",
                { className: "text-left" },
                (0, _l10n2.default)("results.headers.participants_not_advanced")
            ) : React.createElement(
                "p",
                { className: "text-left" },
                (0, _l10n2.default)("results.headers.participants_advanced")
            ) : null : null;
            if (result === null) {
                return null;
            }
            return React.createElement(
                "tr",
                { key: "NT" + idx },
                React.createElement(
                    "th",
                    { className: "advances-header", colSpan: n_cols },
                    result
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var tour_wrapper = new _TourScoresWrapper2.default(this.props.tour, this.props.results);
            var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
                return row[0];
            });
            var results_info = tour_wrapper.getResultsInfo();
            var runs = tour_wrapper.getRuns();
            var has_next_tour = this.props.tour.next_tour_id !== null;
            var has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
            var rows = [];
            for (var idx = 0; idx < runs.length; ++idx) {
                rows.push(this.renderAdvancesHeader(has_next_tour, results_info[idx - 1], results_info[idx], runs[idx - 1], runs[idx], idx, 5 + has_total_score));
                rows.push(React.createElement(_Row2.default, {
                    key: runs[idx].id,
                    head_judge_score: head_judge_scores[idx],
                    results_info: results_info[idx],
                    run: runs[idx],
                    has_next_tour: has_next_tour,
                    has_total_score: has_total_score }));
            };
            return React.createElement(
                "div",
                { className: "brief-table" },
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
                                { className: "w-7 place" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.place")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-6 number" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.number")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "w-30 participant" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.participant_name")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "club" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.participant_club")
                                )
                            ),
                            has_total_score ? React.createElement(
                                "th",
                                { className: "w-18 score" },
                                React.createElement(
                                    "p",
                                    null,
                                    (0, _l10n2.default)("results.labels.total_score")
                                )
                            ) : null,
                            React.createElement(
                                "th",
                                { className: "w-8 card" },
                                React.createElement(
                                    "p",
                                    { className: "text-center" },
                                    (0, _l10n2.default)("results.labels.card")
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        rows
                    )
                )
            );
        }
    }]);

    return ResultsTable1;
}(React.Component);

exports.default = ResultsTable1;

},{"./Row":56,"common/TourScoresWrapper":66,"l10n":69}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColumnsWidths = function () {
    function ColumnsWidths(n_judges) {
        _classCallCheck(this, ColumnsWidths);

        this.judge_width = Math.round(55 / n_judges);
        this.total_score_width = 14;
        this.place_width = 6;
        this.number_width = 3;
        this.name_width = 100 - this.judge_width * n_judges - this.total_score_width - this.place_width - this.number_width;
    }

    _createClass(ColumnsWidths, [{
        key: "genPlaceStyle",
        value: function genPlaceStyle() {
            return {
                width: this.place_width + "%"
            };
        }
    }, {
        key: "genNumberStyle",
        value: function genNumberStyle() {
            return {
                width: this.number_width + "%"
            };
        }
    }, {
        key: "genNameStyle",
        value: function genNameStyle() {
            return {
                width: this.name_width + "%"
            };
        }
    }, {
        key: "genTotalScoreStyle",
        value: function genTotalScoreStyle() {
            return {
                width: this.total_score_width + "%"
            };
        }
    }, {
        key: "genJudgeStyle",
        value: function genJudgeStyle() {
            return {
                width: this.judge_width + "%"
            };
        }
    }]);

    return ColumnsWidths;
}();

exports.default = ColumnsWidths;

},{}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _getParticipantDisplay = require("common/getParticipantDisplay");

var _getParticipantDisplay2 = _interopRequireDefault(_getParticipantDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        key: "renderFormationScore",
        value: function renderFormationScore(score, additiolal_data) {
            return React.createElement(
                "p",
                { className: "text-center" },
                React.createElement(
                    "strong",
                    null,
                    additiolal_data.places[score.id]
                ),
                " (",
                score.data.total_score.toFixed(1),
                ")"
            );
        }
    }, {
        key: "renderScore",
        value: function renderScore(judge, score, additiolal_data) {
            if (judge.role === "dance_judge") {
                if (this.props.tour.scoring_system_name === "rosfarr.formation" || this.props.tour.scoring_system_name === "rosfarr.formation_acro") {
                    return this.renderFormationScore(score, additiolal_data);
                }
            }
            return React.createElement(
                "p",
                { className: "text-center" },
                score.data.total_score.toFixed(2)
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var judges_scores = this.props.scores.map(function (score, idx) {
                return React.createElement(
                    "td",
                    { key: idx },
                    " ",
                    _this2.renderScore(_this2.props.discipline_judges[idx], score, _this2.props.results_info.additional_data),
                    " "
                );
            });
            if (!this.props.run.performed) {
                judges_scores = this.props.scores.map(function (score, idx) {
                    return React.createElement(
                        "td",
                        { key: idx },
                        React.createElement(
                            "p",
                            { className: "text-center" },
                            "—"
                        )
                    );
                });
            }
            var total_score = this.props.run.verbose_total_score;
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "place" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.results_info.place
                    )
                ),
                React.createElement(
                    "td",
                    { className: "number" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.run.participant.number
                    )
                ),
                React.createElement(
                    "td",
                    { className: "participant" },
                    (0, _getParticipantDisplay2.default)(this.props.run.participant)
                ),
                this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro" ? React.createElement(
                    "td",
                    { className: "total-score" },
                    function () {
                        if (!_this2.props.run.performed) {
                            return React.createElement(
                                "p",
                                { className: "text-center" },
                                "—"
                            );
                        }
                        if (_this2.props.tour.scoring_system_name === "rosfarr.am_final_acro") {
                            var p_score = total_score.previous_tour.primary_score.toFixed(2);
                            var s_score = total_score.previous_tour.secondary_score.toFixed(2);
                            return React.createElement(
                                "p",
                                { className: "text-center" },
                                React.createElement(
                                    "em",
                                    null,
                                    (0, _l10n2.default)("results.labels.fw_score_short") + ": " + p_score + " / " + s_score
                                ),
                                React.createElement(
                                    "strong",
                                    null,
                                    total_score.primary_score.toFixed(2)
                                ),
                                " /",
                                " ",
                                total_score.secondary_score.toFixed(2)
                            );
                        }
                        return React.createElement(
                            "p",
                            { className: "text-center" },
                            React.createElement(
                                "strong",
                                null,
                                total_score.primary_score.toFixed(2)
                            ),
                            " /",
                            " ",
                            total_score.secondary_score.toFixed(2)
                        );
                    }()
                ) : null,
                judges_scores,
                React.createElement(
                    "td",
                    { className: "card" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.head_judge_score && this.props.run.performed ? this.props.head_judge_score.data.total_score : React.createElement(
                            "span",
                            null,
                            "—"
                        )
                    )
                )
            );
        }
    }]);

    return Row;
}(React.Component);

exports.default = Row;

},{"common/getParticipantDisplay":67,"l10n":69}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

var _ColumnsWidths = require("./ColumnsWidths");

var _ColumnsWidths2 = _interopRequireDefault(_ColumnsWidths);

var _TourScoresWrapper = require("common/TourScoresWrapper");

var _TourScoresWrapper2 = _interopRequireDefault(_TourScoresWrapper);

var _getScoringType = require("common/getScoringType");

var _getScoringType2 = _interopRequireDefault(_getScoringType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsTable2 = function (_React$Component) {
    _inherits(ResultsTable2, _React$Component);

    function ResultsTable2() {
        _classCallCheck(this, ResultsTable2);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultsTable2).apply(this, arguments));
    }

    _createClass(ResultsTable2, [{
        key: "renderAdvancesHeader",
        value: function renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
            var prev_status = prev_row ? prev_run.performed ? prev_row.advances ? "advanced" : "not_advanced" : "not_performed" : null;
            var next_status = next_run.performed ? next_row.advances ? "advanced" : "not_advanced" : "not_performed";
            var result = prev_status !== next_status ? next_status === "not_performed" ? React.createElement(
                "p",
                { className: "text-left" },
                (0, _l10n2.default)("results.headers.participants_not_performed")
            ) : has_next_tour ? next_status === "not_advanced" ? React.createElement(
                "p",
                { className: "text-left" },
                (0, _l10n2.default)("results.headers.participants_not_advanced")
            ) : React.createElement(
                "p",
                { className: "text-left" },
                (0, _l10n2.default)("results.headers.participants_advanced")
            ) : null : null;
            if (result === null) {
                return null;
            }
            return React.createElement(
                "tr",
                { key: "NT" + idx },
                React.createElement(
                    "th",
                    { className: "advances-header", colSpan: n_cols },
                    result
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var tour_wrapper = new _TourScoresWrapper2.default(this.props.tour, this.props.results);
            var discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
            var scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
            var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
                return row[0];
            });
            var results_info = tour_wrapper.getResultsInfo();
            var runs = tour_wrapper.getRuns();
            var has_next_tour = this.props.tour.next_tour_id !== null;
            var has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
            var widths = new _ColumnsWidths2.default(discipline_judges.length + 1);
            var judges_header = discipline_judges.map(function (dj) {
                var suffix = (0, _getScoringType2.default)(dj, this.props.tour.scoring_system_name) === "acro" ? " (A)" : "";
                return React.createElement(
                    "th",
                    { key: dj.id, style: widths.genJudgeStyle() },
                    React.createElement(
                        "p",
                        null,
                        dj.judge.number + suffix
                    )
                );
            }.bind(this));
            var rows = [];
            for (var idx = 0; idx < runs.length; ++idx) {
                rows.push(this.renderAdvancesHeader(has_next_tour, results_info[idx - 1], results_info[idx], runs[idx - 1], runs[idx], idx, 4 + discipline_judges.length + has_total_score));
                rows.push(React.createElement(_Row2.default, {
                    key: runs[idx].id,
                    head_judge_score: head_judge_scores[idx],
                    results_info: results_info[idx],
                    tour: this.props.tour,
                    run: runs[idx],
                    scores: scores_table[idx],
                    discipline_judges: discipline_judges,
                    has_next_tour: has_next_tour,
                    has_total_score: has_total_score }));
            };
            return React.createElement(
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
                            { className: "place", style: widths.genPlaceStyle() },
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.labels.place")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "number", style: widths.genNumberStyle() },
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.labels.number")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "participant", style: widths.genNameStyle() },
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.labels.participant_name")
                            )
                        ),
                        has_total_score ? React.createElement(
                            "th",
                            { className: "total-score", style: widths.genTotalScoreStyle() },
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.labels.total_score")
                            )
                        ) : null,
                        judges_header,
                        React.createElement(
                            "th",
                            { className: "card", style: widths.genJudgeStyle() },
                            React.createElement(
                                "p",
                                { className: "text-center" },
                                (0, _l10n2.default)("results.labels.card")
                            )
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    rows
                )
            );
        }
    }]);

    return ResultsTable2;
}(React.Component);

exports.default = ResultsTable2;

},{"./ColumnsWidths":58,"./Row":59,"common/TourScoresWrapper":66,"common/getScoringType":68,"l10n":69}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColumnsWidths = function () {
    function ColumnsWidths(n_judges) {
        _classCallCheck(this, ColumnsWidths);

        this.judge_width = Math.round(70 / n_judges);
        this.place_width = 7;
        this.info_width = 100 - this.judge_width * n_judges - this.place_width;
    }

    _createClass(ColumnsWidths, [{
        key: "genPlaceStyle",
        value: function genPlaceStyle() {
            return {
                width: this.place_width + "%"
            };
        }
    }, {
        key: "genInfoStyle",
        value: function genInfoStyle() {
            return {
                width: this.info_width + "%"
            };
        }
    }, {
        key: "genJudgeStyle",
        value: function genJudgeStyle() {
            return {
                width: this.judge_width + "%"
            };
        }
    }]);

    return ColumnsWidths;
}();

exports.default = ColumnsWidths;

},{}],62:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _getParticipantDisplay = require("common/getParticipantDisplay");

var _getParticipantDisplay2 = _interopRequireDefault(_getParticipantDisplay);

var _getScoringType = require("common/getScoringType");

var _getScoringType2 = _interopRequireDefault(_getScoringType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsVerboseTableRow = function (_React$Component) {
    _inherits(TourResultsVerboseTableRow, _React$Component);

    function TourResultsVerboseTableRow() {
        _classCallCheck(this, TourResultsVerboseTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsVerboseTableRow).apply(this, arguments));
    }

    _createClass(TourResultsVerboseTableRow, [{
        key: "formatScore",
        value: function formatScore(score, template) {
            if (!template) {
                template = "$";
            }
            if (score === null) {
                return React.createElement(
                    "span",
                    null,
                    "—"
                );
            }
            return template.replace("$", score).replace("@", score.toFixed(1));
        }
    }, {
        key: "renderFormationScore",
        value: function renderFormationScore(score, additiolal_data) {
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
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
                                (0, _l10n2.default)("results.breakdown.dt"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.dance_tech, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.df"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.dance_figs, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.i"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.impression, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.m"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                score.data.total_score
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.p"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                additiolal_data.places[score.id]
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "renderFormationAcroScore",
        value: function renderFormationAcroScore(score, additiolal_data) {
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
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
                                (0, _l10n2.default)("results.breakdown.a"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.acrobatics, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.dt"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.dance_tech, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.df"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.dance_figs, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.i"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.impression, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.sm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.small_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.bm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.big_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                score.data.total_score
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.p"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                additiolal_data.places[score.id]
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "renderDanceScore",
        value: function renderDanceScore(score) {
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
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
                                (0, _l10n2.default)("results.breakdown.fw"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.fw_woman, "-$%")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.fm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.fw_man, "-$%")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.df"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.dance_figs)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.c"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.composition)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.sm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.small_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.bm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.big_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                score.data.total_score
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "renderAcroScore",
        value: function renderAcroScore(score) {
            var acro_scores = score.data.raw_data.reductions.map(function (score, idx) {
                return React.createElement(
                    "tr",
                    { key: idx },
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            (0, _l10n2.default)("results.breakdown.acro_n", idx + 1),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score, "-$%")
                        )
                    )
                );
            }.bind(this));
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
                    null,
                    acro_scores,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.fd"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                score.data.total_score
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "renderScore",
        value: function renderScore(judge, score, additiolal_data) {
            switch ((0, _getScoringType2.default)(judge, this.props.tour.scoring_system_name)) {
                case "dance":
                case "dance_halved":
                    return this.renderDanceScore(score, additiolal_data);
                case "acro":
                    return this.renderAcroScore(score, additiolal_data);
                case "formation":
                    return this.renderFormationScore(score, additiolal_data);
                case "formation_acro":
                    return this.renderFormationAcroScore(score, additiolal_data);
                default:
                    return React.createElement(
                        "p",
                        { className: "text-center" },
                        score.data.total_score.toFixed(2)
                    );
            }
        }
    }, {
        key: "renderParticipantInfo",
        value: function renderParticipantInfo() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        (0, _l10n2.default)("global.phrases.participant_n", this.props.run.participant.number, null, this.props.run.participant.sportsmen.length)
                    )
                ),
                (0, _getParticipantDisplay2.default)(this.props.run.participant)
            );
        }
    }, {
        key: "renderHeadJudgePenalty",
        value: function renderHeadJudgePenalty() {
            if (!this.props.run.performed) {
                return null;
            }
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.penalty"),
                    ": "
                ),
                this.props.head_judge_score ? this.props.head_judge_score.data.total_score : React.createElement(
                    "span",
                    null,
                    "—"
                )
            );
        }
    }, {
        key: "renderAcroTable",
        value: function renderAcroTable() {
            if (!this.props.run.performed) {
                return null;
            }
            var has_acro_overrides = false;
            var render_acro_table = this.props.tour.scoring_system_name === "rosfarr.acro" || this.props.tour.scoring_system_name === "rosfarr.am_final_acro";
            if (!render_acro_table) {
                return null;
            }
            this.props.run.acrobatics.forEach(function (acro) {
                if (acro.score !== acro.original_score) {
                    has_acro_overrides = true;
                }
            });
            if (this.props.run.acrobatics.length === 0) {
                return null;
            }
            var acro_cell_width = 100 / this.props.run.acrobatics.length + "%";
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        has_acro_overrides ? (0, _l10n2.default)("results.labels.acrobatics_verbose") : (0, _l10n2.default)("results.labels.acrobatics"),
                        ":"
                    )
                ),
                React.createElement(
                    "table",
                    { className: "acro-table" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            this.props.run.acrobatics.map(function (acro, idx) {
                                return React.createElement(
                                    "td",
                                    { key: idx, style: { width: acro_cell_width } },
                                    React.createElement(
                                        "p",
                                        { className: "text-center" },
                                        acro.original_score.toFixed(1)
                                    )
                                );
                            })
                        ),
                        has_acro_overrides ? React.createElement(
                            "tr",
                            null,
                            this.props.run.acrobatics.map(function (acro, idx) {
                                return React.createElement(
                                    "td",
                                    { key: idx, style: { width: acro_cell_width } },
                                    React.createElement(
                                        "p",
                                        { className: "text-center" },
                                        acro.score.toFixed(1)
                                    )
                                );
                            })
                        ) : null
                    )
                )
            );
        }
    }, {
        key: "renderAmClassFwScore",
        value: function renderAmClassFwScore() {
            if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
                return null;
            }
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.fw_score")
                ),
                ": ",
                this.props.run.verbose_total_score.previous_tour.primary_score.toFixed(2) + " / " + this.props.run.verbose_total_score.previous_tour.secondary_score.toFixed(2),
                " "
            );
        }
    }, {
        key: "renderAmClassAcroScore",
        value: function renderAmClassAcroScore() {
            if (!this.props.run.performed) {
                return null;
            }
            if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
                return null;
            }
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.acro_score")
                ),
                ": ",
                this.props.run.verbose_total_score.current_tour.primary_score.toFixed(2) + " / " + this.props.run.verbose_total_score.current_tour.secondary_score.toFixed(2),
                " "
            );
        }
    }, {
        key: "renderTotalScore",
        value: function renderTotalScore() {
            if (!this.props.run.performed) {
                return null;
            }
            if (this.props.tour.scoring_system_name === "rosfarr.formation") {
                return null;
            }
            if (this.props.tour.scoring_system_name === "rosfarr.formation_acro") {
                return null;
            }
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.total_score"),
                    ": ",
                    this.props.run.total_score
                )
            );
        }
    }, {
        key: "renderNotPerformedLabel",
        value: function renderNotPerformedLabel() {
            if (this.props.run.performed) {
                return null;
            }
            return React.createElement(
                "p",
                null,
                React.createElement(
                    "em",
                    null,
                    (0, _l10n2.default)("results.labels.not_performed")
                )
            );
        }
    }, {
        key: "renderNextTourLabel",
        value: function renderNextTourLabel() {
            if (!this.props.has_next_tour) {
                return null;
            }
            React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _l10n2.default)("results.labels.next_tour"),
                    ": "
                ),
                this.props.results_info.advances ? (0, _l10n2.default)("global.labels.yes") : (0, _l10n2.default)("global.labels.no")
            );
        }
    }, {
        key: "renderInfoBlock",
        value: function renderInfoBlock() {
            return React.createElement(
                "td",
                { className: "info-block", style: this.props.widths.genInfoStyle() },
                this.renderParticipantInfo(),
                this.renderHeadJudgePenalty(),
                this.renderAcroTable(),
                this.renderAmClassFwScore(),
                this.renderAmClassAcroScore(),
                this.renderTotalScore(),
                this.renderNotPerformedLabel(),
                this.renderNextTourLabel()
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var judges_scores = this.props.scores.map(function (score, idx) {
                return React.createElement(
                    "td",
                    { key: idx, style: _this2.props.widths.genJudgeStyle() },
                    _this2.renderScore(_this2.props.discipline_judges[idx], score, _this2.props.results_info.additional_data)
                );
            });
            if (!this.props.run.performed) {
                judges_scores = this.props.scores.map(function (score, idx) {
                    return React.createElement(
                        "td",
                        { style: _this2.props.widths.genJudgeStyle(), key: idx },
                        React.createElement(
                            "p",
                            { className: "text-center" },
                            "—"
                        )
                    );
                });
            }
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "place", style: this.props.widths.genPlaceStyle() },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.results_info.place
                    )
                ),
                this.renderInfoBlock(),
                judges_scores
            );
        }
    }]);

    return TourResultsVerboseTableRow;
}(React.Component);

},{"common/getParticipantDisplay":67,"common/getScoringType":68,"l10n":69}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _l10n = require("l10n");

var _l10n2 = _interopRequireDefault(_l10n);

var _TourScoresWrapper = require("common/TourScoresWrapper");

var _TourScoresWrapper2 = _interopRequireDefault(_TourScoresWrapper);

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

var _ColumnsWidths = require("./ColumnsWidths");

var _ColumnsWidths2 = _interopRequireDefault(_ColumnsWidths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsVerboseTable = function (_React$Component) {
    _inherits(TourResultsVerboseTable, _React$Component);

    function TourResultsVerboseTable() {
        _classCallCheck(this, TourResultsVerboseTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsVerboseTable).apply(this, arguments));
    }

    _createClass(TourResultsVerboseTable, [{
        key: "render",
        value: function render() {
            var tour_wrapper = new _TourScoresWrapper2.default(this.props.tour, this.props.results);
            var discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
            var scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
            var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
                return row[0];
            });
            var results_info = tour_wrapper.getResultsInfo();
            var runs = tour_wrapper.getRuns();
            var has_next_tour = this.props.tour.next_tour_id !== null;
            var rows = [];
            var widths = new _ColumnsWidths2.default(discipline_judges.length);
            for (var idx = 0; idx < runs.length; ++idx) {
                rows.push(React.createElement(_Row2.default, {
                    key: runs[idx].id,
                    tour: this.props.tour,
                    run: runs[idx],
                    scores: scores_table[idx],
                    widths: widths,
                    head_judge_score: head_judge_scores[idx],
                    results_info: results_info[idx],
                    discipline_judges: discipline_judges,
                    has_next_tour: has_next_tour }));
            };
            var judges_header = discipline_judges.map(function (dj) {
                return React.createElement(
                    "th",
                    { key: dj.id, width: widths.genJudgeStyle() },
                    React.createElement(
                        "p",
                        null,
                        dj.judge.number
                    )
                );
            });
            return React.createElement(
                "table",
                { className: "bordered-table", style: { width: "100%" } },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { className: "place", width: widths.genPlaceStyle() },
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.labels.place")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "participant", width: widths.genInfoStyle() },
                            React.createElement(
                                "p",
                                null,
                                (0, _l10n2.default)("results.labels.info")
                            )
                        ),
                        judges_header
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    rows
                )
            );
        }
    }]);

    return TourResultsVerboseTable;
}(React.Component);

exports.default = TourResultsVerboseTable;

},{"./ColumnsWidths":61,"./Row":62,"common/TourScoresWrapper":66,"l10n":69}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CacheMixin = function CacheMixin(Base) {
    return function (_Base) {
        _inherits(_class, _Base);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
        }

        _createClass(_class, [{
            key: "resetCache",
            value: function resetCache() {
                this._cache = {};
            }
        }, {
            key: "componentWillUpdate",
            value: function componentWillUpdate() {
                this.resetCache();
            }
        }, {
            key: "fetchFromCache",
            value: function fetchFromCache(key, generator) {
                if (!this._cache) {
                    this._cache = {};
                }
                if (!(key in this._cache)) {
                    this._cache[key] = generator();
                }
                return this._cache[key];
            }
        }]);

        return _class;
    }(Base);
};

exports.default = CacheMixin;

},{}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RunScoresWrapper = function () {
    function RunScoresWrapper(run, discipline_judges) {
        _classCallCheck(this, RunScoresWrapper);

        this.run = run;
        this.discipline_judges = discipline_judges;
        this.scores_by_discipline_judge_id = {};
        run.scores.forEach(function (score) {
            var dj_id = score.discipline_judge_id;
            this.scores_by_discipline_judge_id[dj_id] = score;
        }.bind(this));
    }

    _createClass(RunScoresWrapper, [{
        key: "getScoresByJudgeIds",
        value: function getScoresByJudgeIds(discipline_judge_ids) {
            var _this = this;

            return discipline_judge_ids.map(function (dj_id) {
                return _this.scores_by_discipline_judge_id[dj_id];
            }.bind(this));
        }
    }]);

    return RunScoresWrapper;
}();

exports.default = RunScoresWrapper;

},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RunScoresWrapper = require("./RunScoresWrapper");

var _RunScoresWrapper2 = _interopRequireDefault(_RunScoresWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TourScoresWrapper = function () {
    function TourScoresWrapper(tour, results) {
        var _this = this;

        _classCallCheck(this, TourScoresWrapper);

        this.run_wrappers = tour.runs.map(function (run) {
            return new _RunScoresWrapper2.default(run, tour.discipline_judges);
        });
        this.discipline_judges = tour.discipline.discipline_judges;
        this.discipline_judges_by_roles = {};
        this.discipline_judges.forEach(function (dj, idx) {
            var arr = this.discipline_judges_by_roles[dj.role] || [];
            arr.push({
                idx: idx,
                discipline_judge: dj
            });
            this.discipline_judges_by_roles[dj.role] = arr;
        }.bind(this));
        if (results) {
            (function () {
                var results_by_run_ids = {};
                results.forEach(function (res) {
                    return results_by_run_ids[res.run_id] = res;
                });
                _this.run_wrappers.forEach(function (w) {
                    return w.results_info = results_by_run_ids[w.run.id];
                });
                _this.run_wrappers.sort(function (a, b) {
                    return a.results_info.place - b.results_info.place;
                });
            })();
        }
    }

    _createClass(TourScoresWrapper, [{
        key: "getDisciplineJudgesByRoles",
        value: function getDisciplineJudgesByRoles() {
            if (arguments.length === 1) {
                return this.discipline_judges_by_roles[arguments[0]] ? this.discipline_judges_by_roles[arguments[0]].map(function (b) {
                    return b.discipline_judge;
                }) : [];
            }
            var res = [];
            for (var i = 0; i < arguments.length; ++i) {
                res = res.concat(this.discipline_judges_by_roles[arguments[i]] || []);
            }
            res.sort(function (a, b) {
                return a.idx - b.idx;
            });
            return res.map(function (b) {
                return b.discipline_judge;
            });
        }
    }, {
        key: "getScoresTableByRoles",
        value: function getScoresTableByRoles() {
            var discipline_judge_ids = this.getDisciplineJudgesByRoles.apply(this, arguments).map(function (dj) {
                return dj.id;
            });
            return this.run_wrappers.map(function (w) {
                return w.getScoresByJudgeIds(discipline_judge_ids);
            });
        }
    }, {
        key: "getResultsInfo",
        value: function getResultsInfo() {
            return this.run_wrappers.map(function (w) {
                return w.results_info;
            });
        }
    }, {
        key: "getRuns",
        value: function getRuns() {
            return this.run_wrappers.map(function (w) {
                return w.run;
            });
        }
    }]);

    return TourScoresWrapper;
}();

exports.default = TourScoresWrapper;

},{"./RunScoresWrapper":65}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getParticipantDisplay;
function getParticipantDisplay(participant) {
    if (participant.formation_name !== "") {
        return React.createElement(
            "p",
            null,
            participant.formation_name
        );
    }
    return participant.sportsmen.map(function (s, idx) {
        return React.createElement(
            "p",
            { key: idx },
            s.last_name + " " + s.first_name
        );
    });
}

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScoringType;
function getScoringType(discipline_judge, scoring_system_name) {
    switch (discipline_judge.role) {
        case "dance_judge":
            switch (scoring_system_name) {
                case "rosfarr.formation":
                    return "formation";
                case "rosfarr.formation_acro":
                    return "formation_acro";
                case "rosfarr.simplified":
                    return "simplified";
                case "rosfarr.am_final_fw":
                case "rosfarr.am_final_acro":
                    return "dance_halved";
                default:
                    return "dance";
            }
        case "acro_judge":
            switch (scoring_system_name) {
                case "rosfarr.am_final_fw":
                    return "dance_halved";
                default:
                    return "acro";
            }
        case "tech_judge":
            return "tech";
        case "head_judge":
            return "head";
    }
}

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ru = require("./ru");

var _ru2 = _interopRequireDefault(_ru);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = _ru2.default;

exports.default = _;

},{"./ru":70}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = translate;
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
        "tablet": {
            "acro_judge": {
                "fall_down": "Падения (-30)",
                "acro_n": function acro_n(n) {
                    return "Акробатика " + (n + 1);
                }
            },
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
                "total_score": "Сумма баллов",
                "not_performing": "Не выступает",
                "judge_number": function judge_number(n) {
                    return "Судья №" + n;
                },
                "heat_number": function heat_number(n, t) {
                    return "Заход " + n + " из " + t;
                },
                "confirm_score": "Зафиксировать",
                "confirmed": "Зафиксировано",
                "mark_not_performed": "Невыход на площадку",
                "discard_not_performed": "Отмена невыхода на площадку"
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
            },
            "pages": {
                "heats": "Заходы",
                "results": "Результаты",
                "actions": "Действия",
                "dancing": "Танец",
                "acro": "Акробатика"
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
        },
        "global": {
            "phrases": {
                "participant_n": function participant_n(n, name, n_sp) {
                    return n_sp > 2 ? "Формейшн №" + n.toString() + (name ? ": " + name : "") : (n_sp === 2 ? "Пара №" : "Участник №") + n.toString();
                }
            }
        }
    };

    var path = src.split(".");
    var phrase_ptr = PHRASES;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var chunk = _step.value;

            phrase_ptr = phrase_ptr[chunk];
            if (typeof phrase_ptr === "undefined") {
                console.error("Unable to find translation for " + src);
                return "";
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

    ;
    if (typeof phrase_ptr === "function") {
        var args = [];
        for (var idx = 1; idx < arguments.length; ++idx) {
            args.push(arguments[idx]);
        }
        return phrase_ptr.apply(undefined, args);
    }
    return phrase_ptr;
}

},{}],71:[function(require,module,exports){
"use strict";

var _ResultsTable = require("ResultsTable1");

var _ResultsTable2 = _interopRequireDefault(_ResultsTable);

var _ResultsTable3 = require("ResultsTable2");

var _ResultsTable4 = _interopRequireDefault(_ResultsTable3);

var _ResultsTable5 = require("ResultsTable3");

var _ResultsTable6 = _interopRequireDefault(_ResultsTable5);

var _JudgeTablet = require("JudgeTablet");

var _JudgeTablet2 = _interopRequireDefault(_JudgeTablet);

var _AdminScoreInput = require("AdminScoreInput");

var _AdminScoreInput2 = _interopRequireDefault(_AdminScoreInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.registerRulesSet("RosFARR", {
    tour_results_table_1: _ResultsTable2.default,
    tour_results_table_2: _ResultsTable4.default,
    tour_results_table_3: _ResultsTable6.default,
    judge_tablet: _JudgeTablet2.default,
    admin_score_input: _AdminScoreInput2.default
});

},{"AdminScoreInput":3,"JudgeTablet":55,"ResultsTable1":57,"ResultsTable2":60,"ResultsTable3":63}],72:[function(require,module,exports){
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

},{"l10n/loader":1,"server/storage":74,"ui/dialogs":76}],73:[function(require,module,exports){
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

var message_dispatcher = exports.message_dispatcher = new MessageDispatcher();

},{"server/storage":74,"ui/components":75}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{"l10n/loader":1}],76:[function(require,module,exports){
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

},{"l10n/loader":1}],77:[function(require,module,exports){
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

},{"l10n/loader":1}]},{},[71])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcbDEwblxcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxsMTBuXFxydS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcQWRtaW5TY29yZUlucHV0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXEVsZW1lbnRzXFxFbGVtZW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcRWxlbWVudHNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQWNyb2JhdGljc0xheW91dFxcU2NvcmluZ0xheW91dFxcTWlzdGFrZXMuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxBY3JvYmF0aWNzTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEFjcm9iYXRpY3NMYXlvdXRcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcQ29uZmlybWF0aW9uQnV0dG9uLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRGFuY2VIYWx2ZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXRcXFNjb3JlUGFydC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlSGFsdmVkTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlSGFsdmVkTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXERhbmNlTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvb3RlclxcQnV0dG9uLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9vdGVyXFxGb290ZXJJdGVtLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9vdGVyXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEZvcm1hdGlvbkFjcm9MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uQWNyb0xheW91dFxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxGb3JtYXRpb25MYXlvdXRcXFNjb3JpbmdMYXlvdXRcXE1pc3Rha2VzLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcRm9ybWF0aW9uTGF5b3V0XFxTY29yaW5nTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEdlbmVyYWxMYXlvdXRcXFBhcnRpY2lwYW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcR2VuZXJhbExheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHZW5lcmFsU2NhbGUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxHcmlkLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxBY3Rpb25zUGFnZS5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxBY3JvYmF0aWNPdmVycmlkZXNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXExpbmVKdWRnZXNTY29yZXNcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTGluZUp1ZGdlc1Njb3Jlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcTm90UGVyZm9ybWVkU3dpdGNoXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRKdWRnZUxheW91dFxcSGVhdHNQYWdlXFxTY29yaW5nTGF5b3V0XFxQZW5hbHR5SW5wdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcUHJldmlvdXNQZW5hbHRpZXNcXGluZGV4LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxIZWF0c1BhZ2VcXFNjb3JpbmdMYXlvdXRcXFRlY2hKdWRnZXNTY29yZXNcXEl0ZW0uanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcVGVjaEp1ZGdlc1Njb3Jlc1xcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXEhlYXRzUGFnZVxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxIZWFkSnVkZ2VMYXlvdXRcXFJlc3VsdHNQYWdlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcSGVhZEp1ZGdlTGF5b3V0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXEhlYWRlci5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFNpbXBsaWZpZWRMYXlvdXRcXFNjb3JpbmdMYXlvdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXEFjcm9QYWdlXFxTY29yaW5nTGF5b3V0XFxFbGVtZW50LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxKdWRnZVRhYmxldFxcVGVjaEp1ZGdlTGF5b3V0XFxBY3JvUGFnZVxcU2NvcmluZ0xheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXEFjcm9QYWdlXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcRGFuY2luZ1BhZ2VcXFNjb3JpbmdMYXlvdXQuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxUZWNoSnVkZ2VMYXlvdXRcXERhbmNpbmdQYWdlXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcSnVkZ2VUYWJsZXRcXFRlY2hKdWRnZUxheW91dFxcaW5kZXguanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXEp1ZGdlVGFibGV0XFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlMVxcUm93LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUxXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlMlxcQ29sdW1uc1dpZHRocy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlMlxcUm93LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUyXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcQ29sdW1uc1dpZHRocy5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcUmVzdWx0c1RhYmxlM1xcUm93LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxSZXN1bHRzVGFibGUzXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcY29tbW9uXFxDYWNoZU1peGluLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxjb21tb25cXFJ1blNjb3Jlc1dyYXBwZXIuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcVG91clNjb3Jlc1dyYXBwZXIuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXGNvbW1vblxcZ2V0UGFydGljaXBhbnREaXNwbGF5LmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxjb21tb25cXGdldFNjb3JpbmdUeXBlLmpzeCIsInNyY1xcanN4XFxydWxlc19zZXRzXFxyb3NmYXJyXFxsMTBuXFxpbmRleC5qc3giLCJzcmNcXGpzeFxccnVsZXNfc2V0c1xccm9zZmFyclxcbDEwblxccnUuanN4Iiwic3JjXFxqc3hcXHJ1bGVzX3NldHNcXHJvc2ZhcnJcXHJvb3QuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcYXBpLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXG1lc3NhZ2VfZGlzcGF0Y2hlci5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxzdG9yYWdlLmpzeCIsInNyY1xcanN4XFx1aVxcY29tcG9uZW50cy5qc3giLCJzcmNcXGpzeFxcdWlcXGRpYWxvZ3MuanN4Iiwic3JjXFxqc3hcXHVpXFx0YWJsZXRfY29tcG9uZW50cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUNFTyxJQUFJLDZCQUFKO0FBQ0EsSUFBSSxrQ0FBYSwrQkFBYjs7Ozs7Ozs7UUNISztBQUFULFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QjtBQUNoQyxhQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsRUFBakMsRUFBcUM7QUFDakMsWUFBSSxJQUFJLElBQUksR0FBSixDQUR5QjtBQUVqQyxZ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QUFYLENBQWhCLENBRlc7Ozs7c0NBSUQ7QUFDVixnQkFBSSxNQUFNLEtBQUssS0FBTCxFQUFOLENBRE07QUFFVixnQkFBSSxJQUFJLENBQUo7Z0JBQU8sSUFBSSxDQUFKLENBRkQ7QUFHVixnQkFBSSxTQUFTLEVBQVQsQ0FITTtBQUlWLGdCQUFJLEtBQUssS0FBTCxDQUFXLE9BQU8sS0FBSyxJQUFMLENBQVAsQ0FBZixDQUpVO0FBS1YsbUJBQU8sS0FBSyxJQUFMLENBTEc7QUFNVixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFNLElBQU4sQ0FBZixDQU5VO0FBT1YsbUJBQU8sRUFBRSxRQUFGLEtBQWUsR0FBZixHQUFxQixLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBWixDQUFyQixDQVBHOzs7O2lDQVNMO0FBQ0wsbUJBQ0k7O2tCQUFLLFdBQVUsV0FBVixFQUFMO2dCQUNJOzs7QUFDSSxtQ0FBVSxnQ0FBVjt1QkFDSSxlQUFlLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBZixFQUZSO29CQUlNLGVBQUUsZ0NBQUYsQ0FKTjtpQkFESjtnQkFPSTs7O0FBQ0ksbUNBQVkscUNBQXFDLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsU0FBcEIsR0FBZ0MsRUFBaEMsQ0FBckM7dUJBQ1IsZUFBZSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQWYsRUFGUjtvQkFJTSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLGVBQUUsK0JBQUYsQ0FBcEIsR0FBeUQsZUFBRSxnQ0FBRixDQUF6RDtpQkFYVjtnQkFhSTs7c0JBQUssV0FBVSxNQUFWLEVBQUw7b0JBQ00sS0FBSyxXQUFMLEVBRE47aUJBYko7YUFESixDQURLOzs7O1dBM0VBO0VBQWtCLE1BQU0sU0FBTiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyB0cmFuc2xhdGUsIGdldFBvc3NpYmxlVG91ck5hbWVzIH0gZnJvbSBcIi4vcnVcIjtcclxuXHJcbmV4cG9ydCB2YXIgXyA9IHRyYW5zbGF0ZTtcclxuZXhwb3J0IHZhciB0b3VyX25hbWVzID0gZ2V0UG9zc2libGVUb3VyTmFtZXMoKTtcclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShzcmMsIGFyZykge1xyXG4gICAgZnVuY3Rpb24gY2hvb3NlRW5kaW5nKG4sIGUxLCBlMiwgZTUpIHtcclxuICAgICAgICBsZXQgeCA9IG4gJSAxMDA7XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID49IDUgfHwgeCAlIDEwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGUyO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBQSFJBU0VTID0ge1xyXG4gICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6ICh2ZXJzaW9uLCBkYXRlKSA9PiA8ZGl2IGNsYXNzTmFtZT1cImFib3V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PGI+Um9ja0p1ZGdlIHt2ZXJzaW9ufTwvYj4gKNC30LDQutGA0YvRgtCw0Y8g0LLQtdGA0YHQuNGPINC00LvRjyDQvtCz0YDQsNC90LjRh9C10L3QvdC+0LPQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjykgJm1kYXNoOyDRgdC40YHRgtC10LzQsCDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDRgNC10LfRg9C70YzRgtCw0YLQvtCyINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDQv9C+INCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC+0LzRgyDRgNC+0Lot0L0t0YDQvtC70LvRgy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JDQstGC0L7RgNGB0LrQuNC1INC/0YDQsNCy0LAg0L3QsCDRgdC40YHRgtC10LzRgyBSb2NrSnVkZ2Ug0L/QvtC70L3QvtGB0YLRjNGOINC/0YDQuNC90LDQtNC70LXQttCw0YIg0YDQsNC30YDQsNCx0L7RgtGH0LjQutGDINCQ0YDRgtC10LzRgyDQmtCw0LfQsNC60L7QstGDLiDQodC+0LDQstGC0L7RgCDRgdC40YHRgtC10LzRiyDQkNC90YLQvtC9INCQ0LzQtdC70LjQvS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0KHQuNGB0YLQtdC80LAg0YDQsNGB0L/RgNC+0YHRgtGA0LDQvdGP0LXRgtGB0Y8g0L/QviDQu9C40YbQtdC90LfQuNC4IExpbnVtIGQuby5vIChpbmZvQGxpbnVtLmhyKS4g0JTQu9GPINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsCBSb2NrSnVkZ2Ug0L3QtdC+0LHRhdC+0LTQuNC80L4g0Lgg0LTQvtGB0YLQsNGC0L7Rh9C90L4g0LjQvNC10YLRjCDQv9GA0LDQstC+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLIExpbnVtIExQUy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0J7RhNC40YbQuNCw0LvRjNC90YvQuSDRgdCw0LnRgjogPGEgaHJlZj1cImh0dHBzOi8vcm9ja2p1ZGdlLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5odHRwczovL3JvY2tqdWRnZS5jb20vPC9hPjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3Byb2dyYW1zX2FmdGVyX2NyZWF0aW9uXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLINC80L7QttC90L4g0LHRg9C00LXRgiDQtNC+0LHQsNCy0LjRgtGMINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGB0L7RhdGA0LDQvdC10L3QuNGPINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0LrQvtGA0YDQtdC60YLQvdC+INC90LDRgdGC0YDQvtC10L3QsCDQuCDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L3QsC5cIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX25vdF9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQvdC10LTQvtGB0YLRg9C/0L3QsCDQvdCwINGN0YLQvtC8INC60L7QvNC/0YzRgtC10YDQtS5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmluYWxpemVkXCI6IFwi0J7RgtGB0YPRgtGB0YLQstGD0Y7RgiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3dhcm5pbmdcIjogPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPtCk0LjQvdCw0LvQuNC30LDRhtC40Y8g0LTQvtC70LbQvdCwINC+0YLQvNC10L3Rj9GC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDQuNGB0LrQu9GO0YfQuNGC0LXQu9GM0L3Ri9GFINGB0LvRg9GH0LDRj9GFITwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QldGB0LvQuCDQttC1INGN0YLQviDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDQvdC10L7QsdGF0L7QtNC40LzQviwg0L7QsdGA0LDRgtC40YLQtSDQstC90LjQvNCw0L3QuNC1LCDRh9GC0L4g0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgdC/0LjRgdC+0Log0YPRh9Cw0YHRgtC90LjQutC+0LJcclxuICAgICAgICAgICAgICAgICAgICDRgdC70LXQtNGD0Y7RidC10LPQviDRgtGD0YDQsCDQsdGD0LTQtdGCINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC4INC/0LXRgNC10YHQvtC30LTQsNC9LiDQoNC10LfRg9C70YzRgtCw0YLRiyDRg9GH0LDRgdGC0L3QuNC60L7Qsiwg0L/RgNC+0YjQtdC00YjQuNGFINCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L/QvtGB0LvQtSDQv9C10YDQstC+0LlcclxuICAgICAgICAgICAgICAgICAgICDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INC4INC90LUg0L/RgNC+0YjQtdC00YjQuNGFINC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INCx0YPQtNGD0YIg0LHQtdC30LLQvtC30LLRgNCw0YLQvdC+INGD0YLQtdGA0Y/QvdGLITwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QmCDQvdC1INC30LDQsdGD0LTRjNGC0LUg0LfQsNC90L7QstC+INC90LDQv9C10YfQsNGC0LDRgtGMINCy0YHQtSDRgtCx0LvQuNGG0YsuPC9wPjwvZGl2PixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YHQuy7CoNGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInByaW50X3Rlc3RfcGFnZVwiOiBcItCd0LDQv9C10YfQsNGC0LDRgtGMINGC0LXRgdGC0L7QstGD0Y4g0YHRgtGA0LDQvdC40YbRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWV1ZVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWV1ZV9lbXB0eVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0YPRgdGC0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJ1bGVzXCI6IFwi0JfQsNC00LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwidGVzdFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3BhZ2VcIjogXCLQotC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF90ZXh0XCI6IFwi0K3RgtC+INGC0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsCBSb2NrSnVkZ2VcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NsdWJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC60LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvblwiOiBcItCh0L7Qt9C00LDRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RglwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfZGlzY2lwbGluZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YNcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2p1ZGdlXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgdGD0LTRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wYXJ0aWNpcGFudFwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF90b3VyXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X251bWJlcnNcIjogXCLQndC+0LzQtdGA0LAg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydFwiOiBcItCt0LrRgdC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0XCI6IFwi0JjQvNC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibGF1bmNoX2F1dG9fcHJpbnRlclwiOiBcItCX0LDQv9GD0YHQuiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQvtC5INC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9cIjogXCLQl9Cw0LPRgNGD0LfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0J/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0LLRgdC1INGD0YHRgtGA0L7QudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0J7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDRg9GB0YLRgNC+0LnRgdGC0LLQsNGFXCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19wbGFuXCI6IFwi0KHQvtGA0YLQuNGA0L7QstC60LAg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX2Rpc2NpcGxpbmVzXCI6IFwi0KHQvtGA0YLQuNGA0L7QstC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVcIjogXCLQntGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jbHViXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0LrQu9GD0LE/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jb21wZXRpdGlvblwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQviDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LU/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9kaXNjaXBsaW5lXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC00LjRgdGG0LjQv9C70LjQvdGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfanVkZ2VcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGB0YPQtNGM0Y4/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQv9GA0L7Qs9GA0LDQvNC80YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDRgdGC0YDQsNC90LjRhtGDINC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjiDRgtGD0YDQsD8g0JLQstC10LTQuNGC0LUgwqt1bmZpbmFsaXplwrssINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogXCLQniDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xpZW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0L/QvtC00LrQu9GO0YfQtdC90L3Ri9C80Lgg0YPRgdGC0YDQvtC50YHRgtCy0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX3Nob3duXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0YLQvtC70YzQutC+INC/0L4g0YHQu9C10LTRg9GO0YnQuNC8INC60LvRg9Cx0LDQvDpcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfc3VtbWFyeVwiOiBcItCh0LLQvtC00LrQsCDQv9C+INC60LvRg9Cx0LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9pbmZvXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0L4g0YLRg9GA0L3QuNGA0LVcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9tYW5hZ2VtZW50XCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCg0LDRgdC/0YDQtdC00LXQu9C10L3QuNC1INGB0YPQtNC10Lkg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfc2hvd25cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0L/QviDRgdC70LXQtNGD0Y7RidC40Lwg0LTQuNGB0YbQuNC/0LvQuNC90LDQvDpcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfc3VtbWFyeVwiOiBcItCh0LLQvtC00LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0X2NvbXBldGl0aW9uXCI6IFwi0K3QutGB0L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwINC4INGA0LXQt9GD0LvRjNGC0LDRgtC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2NvbXBldGl0aW9uXCI6IFwi0JjQvNC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00LXQudGB0LrQsNGPINCx0YDQuNCz0LDQtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvYmF0aWNzXCI6IFwi0JfQsNCz0YDRg9C30LrQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGD0YfQsNGB0YLQvdC40LrQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic2VydmljZV9tZW51XCI6IFwi0KHQtdGA0LLQuNGB0L3QvtC1INC80LXQvdGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl9saXN0XCI6IFwi0KHQv9C40YHQvtC6INGB0L/QvtGA0YLRgdC80LXQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyX2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfdG91clwiOiBcItCe0YLQvNC10L3QsCDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInVucGlja2VkX3RvdXJzXCI6IFwi0J3QtSDQstC60LvRjtGH0LXQvdGLINCyINC/0YDQvtCz0YDQsNC80LzRg1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9kYXRlXCI6IFwi0JTQsNGC0LAg0L/RgNC+0LLQtdC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fbmFtZVwiOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNcIjogXCLQlNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJncm91cF9ieV9jbHVic1wiOiBcItCT0YDRg9C/0L/QuNGA0L7QstCw0YLRjCDQv9C+INC60LvRg9Cx0LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Fjcm9iYXRpY3NcIjogXCLQktC60LvRjtGH0LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfY2x1YnNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDQutC70YPQsdCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9kaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9leHRlbmRlZF9pbmZvXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHRiNC40YDQtdC90L3Rg9GOINC40L3RhNC+0YDQvNCw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZm9ybWF0aW9uX3Nwb3J0c21lblwiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YHQvtGB0YLQsNCyINGE0L7RgNC80LXQudGI0L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQtNCw0L3QvdGL0LUg0L4g0YHRg9C00YzRj9GFXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmlsZXNfc2VsZWN0ZWRcIjogXCLQktGL0LHQtdGA0LjRgtC1INGE0LDQudC7Li4uXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c1wiOiBcItCj0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXN0ZV9hY3JvXCI6IFwi0JLRgdGC0LDQstGM0YLQtSDQtNCw0L3QvdGL0LUg0LjQtyDQutCw0LvRjNC60YPQu9GP0YLQvtGA0LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgtGD0YDQvdC40YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3Nwb3J0c21lbl9vbmx5XCI6IFwi0J/QvtC60LDQt9GL0LLQsNGC0Ywg0YLQvtC70YzQutC+INGB0L/QvtGA0YLRgdC80LXQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zdW1tYXJ5XCI6IFwi0J/QvtC60LDQt9GL0LLQsNGC0Ywg0YLQvtC70YzQutC+INC60L7Qu9C40YfQtdGB0YLQstC+XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YlwiOiBcItC30LDQv1wiLCAgLy8gc3Vic3RpdHV0ZVxyXG4gICAgICAgICAgICAgICAgXCJ0b3Vyc1wiOiBcItCi0YPRgNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Bhc3Njb2RlXCI6IFwi0JLQstC10LTRkdC9INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC/0L7RgtCy0LXRgNC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lbnVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NsdWJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9kaXNjaXBsaW5lc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfanVkZ2VzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3Nwb3J0c21lblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L/QvtGA0YLRgdC80LXQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfdG91cnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgtGD0YDQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuX3BhcnRpY2lwYW50c1wiOiBuID0+IG4udG9TdHJpbmcoKSArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5cIjogKG4sIHMpID0+IG4udG9TdHJpbmcoKSArIFwiINGB0L/QvtGA0YLRgdC80LXQvVwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpICsgKHMgPiAwID8gYCAoKyR7c30g0LfQsNC/0LDRgdC9JHsgY2hvb3NlRW5kaW5nKHMsIFwi0L7QuVwiLCBcItGL0YVcIiwgXCLRi9GFXCIpIH0pYCA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJuX3Nwb3J0c21lbl9zaG9ydFwiOiAobiwgcykgPT4gbi50b1N0cmluZygpICsgXCIg0YHQv9C+0YDRgtGB0LzQtdC9XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIikgKyAocyA+IDAgPyBgICgrJHtzfSDQt9Cw0L8uKWAgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxfbl9wYXJ0aWNpcGFudHNcIjogbiA9PiBcItCY0YLQvtCz0L4gXCIgKyBuICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdpbmctdGFic1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvdXItYWRtaW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZS1yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZXJyb3JzXCI6IHtcclxuICAgICAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxvYWRfc3ludGF4X2Vycm9yXCI6IFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQtNCw0L3QvdGL0YVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhcGlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkdXBsaWNhdGVkX2V4dGVybmFsX2lkXCI6IFwi0JIg0LTQsNC90L3Ri9GFINC40LzQtdGO0YLRgdGPINC30LDQv9C40YHQuCDRgSDQv9C+0LLRgtC+0YDRj9GO0YnQuNC80LjQvNGB0Y8gZXh0ZXJuYWxfaWRcIixcclxuICAgICAgICAgICAgICAgIFwidW5hYmxlX3RvX2dldFwiOiAod2FudGVkKSA9PiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0L7Qu9GD0YfQuNGC0YwgXCIgKyB3YW50ZWQgKyBcIiDQuNC3INC30LDQv9GA0L7RgdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC60LvRg9CxLCDQuiDQutC+0YLQvtGA0L7QvNGDINC/0YDQuNCy0Y/Qt9Cw0L3RiyDRg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9ub25fZW1wdHlcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUsINGB0L7QtNC10YDQttCw0YnQtdC1INC00LjRgdGG0LjQv9C70LjQvdGLLCDQutC70YPQsdGLINC40LvQuCDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvb19tYW55X3RvdXJzXCI6IChkKSA9PiBbXCLQntGI0LjQsdC60LAg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLCBg0JIg0LTQuNGB0YbQuNC/0LvQuNC90LUgJHtkfSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsdC+0LvRjNGI0LUg0YLRg9GA0L7Qsiwg0YfQtdC8INGB0L7Qt9C00LDQvdC+INCyINGB0LjRgdGC0LXQvNC1YF0sXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfZGlzY2lwbGluZV9mb3VuZFwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Lkg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRiywg0L7RgtGB0YPRgtGB0YLQstGD0Y7RidC40LUg0LIg0YHQuNGB0YLQtdC80LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2hhbmdlX2p1ZGdlc193aXRoX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdC+0YHRgtCw0LIg0YHRg9C00LXQuSDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YssINGB0L7QtNC10YDQttCw0YnQtdC5INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDRgyDQutC+0YDQvtCz0L4g0LXRgdGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3Njb3Jlc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4g0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0LIg0YHRg9C00LXQudGB0YLQstC1INGF0L7RgtGPINCx0Ysg0L7QtNC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlcGVhdGluZ19qdWRnZVwiOiAobmFtZSkgPT4gbmFtZSArIFwiINCy0YHRgtGA0LXRh9Cw0LXRgtGB0Y8g0LIg0YHQv9C40YHQutC1INGB0YPQtNC10Lkg0LHQvtC70LXQtSDQvtC00L3QvtCz0L4g0YDQsNC30LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnRlcm5hbF9zZXJ2ZXJfZXJyb3JcIjogW1wi0J7RiNC40LHQutCwINC90LAg0YHQtdGA0LLQtdGA0LVcIiwgXCLQv9GA0L7QstC10YDRjNGC0LUg0LvQvtCz0Lgg0LTQu9GPINC40L3RhNC+0YDQvNCw0YbQuNC4XCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZGlzY2lwbGluZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDQstGF0L7QtNGP0YnQtdCz0L4g0LIg0YHRg9C00LXQudGB0LrRg9GOINCx0YDQuNCz0LDQtNGDINGF0L7RgtGPINCx0Ysg0L7QtNC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwLCDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDRhdC+0YLRjyDQsdGLINCyINC+0LTQvdC+0Lwg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0Lwg0YLRg9GA0LVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJ1blwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNldF9wZXJmb3JtZWRfZmxhZ19vbl9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0YLQsNGC0YPRgSDQt9Cw0YXQvtC00LAg0YTQuNC90LDQu9C40LfQuNC90L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNjb3JlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2NvcmVfbm90X2V4aXN0XCI6IFwi0J/QvtC/0YvRgtC60LAg0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1INC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10Lkg0L7RhtC10L3QutC4INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX29uX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDQvtGG0LXQvdC60YMg0LIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0Lwg0YLRg9GA0LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0b3VyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2JlZm9yZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQtNC+0LHQsNCy0LjRgtGMINC90L7QstGL0Lkg0YLRg9GAINC/0LXRgNC10LQg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGC0YPRgCwg0L/RgNC40YHRg9GC0YHRgtCy0YPRjtGJ0LjQuSDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfZmluYWlsemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9hZGRfYWZ0ZXJfaWRcIjogXCLQn9C+0L/Ri9GC0LrQsCDQtNC+0LHQsNC40YLRjCDRgtGD0YAg0LIg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQtSDQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfdG9fbm9uX2VtcHR5XCI6IChkKSA9PiBbXCLQndC10LLQvtC30LzQvtC20L3QviDQt9Cw0LPRgNGD0LfQuNGC0Ywg0YLRg9GA0Ysg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLXCIsIGDQlNC40YHRhtC40L/Qu9C40L3QsCAke2R9INGD0LbQtSDRgdC+0LTQtdGA0LbQuNGCINGC0YPRgNGLYF0sXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaXNfZmluYWlsemVkXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQvdC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19uZXh0X3RvdXJcIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC/0L7RgdC70LXQtNC90LjQuSDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQvdC1INGB0L7QtNC10YDQttC40YLRgdGPINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9ub3RfZmluYWlsemVkXCI6IFwi0J/RgNC10LTRi9C00YPRidC40Lkg0YLRg9GAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9maW5hbGl6ZWRcIjogXCLQlNC70Y8g0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsCDQvdC1INC00L7Qv9GD0YHQutCw0LXRgtGB0Y8g0LjQt9C80LXQvdC10L3QuNC1INC60LLQvtGC0Ysg0LLRi9Cy0L7QtNCwLCDRgtC40L/QsCDRgtGD0YDQsCDQuNC70Lgg0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZFwiOiBcItCU0L7QsdCw0LLQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvc2VcIjogXCLQl9Cw0LrRgNGL0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNlbGVjdF9hbGxcIjogXCLQodC90Y/RgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJlZGl0XCI6IFwi0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwi0KPQtNCw0LvQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2FyZFwiOiBcItCe0YLQvNC10L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZFwiOiBcItCX0LDQs9GA0YPQt9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzYXZlXCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9hbGxcIjogXCLQktGL0LHRgNCw0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwic3VibWl0XCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYnJvd3NlXCI6IFwi0J7QsdC30L7RgC4uLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW5nXCI6IFwi0J/QvtC00LrQu9GO0YfQtdC90LjQtSDQuiDRgdC10YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX3Byb2JsZW1cIjogXCLQn9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwieWVzXCI6IFwi0JTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9lcnJvclwiOiBcItCf0L7RhdC+0LbQtSwg0LjQvNC10Y7RgtGB0Y8g0L/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImVycm9yX2hlYWRlclwiOiBcItCe0YjQuNCx0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWNjZXNzXCI6IFwi0J7Qv9C10YDQsNGG0LjRjyDRg9GB0L/QtdGI0L3QviDQt9Cw0LLQtdGA0YjQtdC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGVhdF9uXCI6IChuKSA9PiBcItCX0LDRhdC+0LQg4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IFwi0JvQuNC90LXQudC90YvQuSDRgdGD0LTRjNGPIOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIChuX3NwID4gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwi0KTQvtGA0LzQtdC50YjQvSDihJZcIiArIG4udG9TdHJpbmcoKSArIChuYW1lID8gXCI6IFwiICsgbmFtZSA6IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKG5fc3AgPT09IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQn9Cw0YDQsCDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcItCj0YfQsNGB0YLQvdC40Log4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSArIG4udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2luZ1wiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQn9C10YDQtdGB0L7Qt9C00LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9hY3JvYmF0aWNfb3ZlcnJpZGVcIjogXCLQodCx0YDQvtGBXCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQn9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfdG91clwiOiBcItCd0LDRh9Cw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0J7RgdGC0LDQvdC+0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQv9GA0L7Qs9GA0LDQvNC80YMg0LTQu9GPINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsdCw0LfQvtCy0YvRhSDQvtGG0LXQvdC+0Log0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9faWR4XCI6IFwi4oSWINGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtZWRcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuZXdfc2NvcmVcIjogXCLQmtC+0YDRgC5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICBcIm9sZF9zY29yZVwiOiBcItCR0LDQt9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCSXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW9kZWxzXCI6IHtcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQu9GD0LHQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3RpdmVcIjogXCLQkNC60YLQuNCy0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwi0JTQsNGC0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LTQu9GPINC/0YDQvtGC0L7QutC+0LvQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdGl0bGVcIjogXCLQl9Cw0LPQvtC70L7QstC+0LpcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3ZhbHVlXCI6IFwi0JfQvdCw0YfQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5faXRlbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2VfbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcIlRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C7XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGFXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlc19sZWdlbmRcIjogKFxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LTEwMFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JPQuyDigJQg0LPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KIg4oCUINGB0YPQtNGM0Y8g0YLQsNC90YbQsDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JAg4oCUINGB0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60Lg8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCiZXgg4oCUINGC0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCLQmtCw0YLQtdCz0L7RgNC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC9LiBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KQuINCYLiDQni5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwi0KDQvtC70Ywg0LIg0YHRg9C00LXQudGB0YLQstC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVfZGVzY3JpcHRpb25cIjogXCLQlNC+0LvQttC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvbnNcIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX25hbWVcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX2NpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX25hbWVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwi0JjQvNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlclwiOiBcItCf0L7Qu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfZlwiOiBcItCWXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9tXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZXJhbF9pbmZvXCI6IFwi0J7RgdC90L7QstC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQvtC80LDQvdC00Ysg0YTQvtGA0LzQtdC50YjQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCLQpNCw0LzQuNC70LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByb2dyYW1zXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21hblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX25cIjogXCLQntGB0L0uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfeVwiOiBcItCX0LDQvy5cIixcclxuICAgICAgICAgICAgICAgIFwieWVhcl9vZl9iaXJ0aFwiOiBcItCT0L7QtCDRgNC+0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInlvYlwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2dyYW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X2ZvclwiOiBcItCf0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWZhdWx0X3Byb2dyYW1cIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpc19ob3BlX3RvdXJcIjogXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bV9hZHZhbmNlc1wiOiBcItCa0LLQvtGC0LAg0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19wZXJfaGVhdFwiOiBcItCj0YfQsNGB0YLQvdC40LrQvtCyINCyINC30LDRhdC+0LTQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY29yaW5nX3N5c3RlbV9uYW1lXCI6IFwi0KHQuNGB0YLQtdC80LAg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjcmVlbl9vcGVyYXRvclwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2hlYXRcIjogXCLQodCx0YDQvtGBINC90L7QvNC10YDQsCDQt9Cw0YXQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfcGxhY2VcIjogXCLQodCx0YDQvtGBINC80LXRgdGC0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlc1wiOiBcItCc0LXRgdGC0LAg0LTQu9GPINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInByZXNlbnRlclwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwicGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2JlZ2lubmluZ1wiOiBcItCd0LDRh9Cw0LvQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfZHVyYXRpb25cIjogXCLQlNC70LjRgi5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fYWN0aXZlX3RvdXJcIjogXCLQndC10YIg0LDQutGC0LjQstC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkbWluU2NvcmVpbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGgyPlxyXG4gICAgICAgICAgICAgICAgTm90IGltcGxlbWVudGVkXHJcbiAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IEdlbmVyYWxTY2FsZSBmcm9tIFwiSnVkZ2VUYWJsZXQvR2VuZXJhbFNjYWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIG9uVXBkYXRlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkFjcm9SZWR1Y3Rpb25VcGRhdGUodGhpcy5wcm9wcy5hY3JvSWR4LCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxTY2FsZVxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgXyhcInRhYmxldC5hY3JvX2p1ZGdlLmFjcm9fblwiLCB0aGlzLnByb3BzLmFjcm9JZHgpIH1cclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5yZWR1Y3Rpb24gfVxyXG4gICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMub25VcGRhdGUgfSAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vRWxlbWVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucmVkdWN0aW9ucy5tYXAoKHJlZHVjdGlvbiwgYWNyb19pZHgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsgYWNyb19pZHggfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb249eyByZWR1Y3Rpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3JvSWR4PXsgYWNyb19pZHggfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFjcm9SZWR1Y3Rpb25VcGRhdGU9eyB0aGlzLnByb3BzLm9uQWNyb1JlZHVjdGlvblVwZGF0ZSB9IC8+XHJcbiAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IHsgVGFibGV0SW50ZWdlcklucHV0IH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBvblVwZGF0ZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcIm1pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XHJcbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmFjcm9fanVkZ2UuZmFsbF9kb3duXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMub25VcGRhdGUgfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgRWxlbWVudHMgZnJvbSBcIi4vRWxlbWVudHNcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZSA9IChhY3JvX2lkeCwgdmFsdWUpID0+IHtcclxuICAgICAgICBsZXQgcmVkdWN0aW9ucyA9IHRoaXMucHJvcHMuc2NvcmVEYXRhLnJlZHVjdGlvbnMubWFwKCgpID0+IG51bGwpO1xyXG4gICAgICAgIHJlZHVjdGlvbnNbYWNyb19pZHhdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwicmVkdWN0aW9uc1wiLCByZWR1Y3Rpb25zKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgcmVkdWN0aW9ucz17IHRoaXMucHJvcHMuc2NvcmVEYXRhLnJlZHVjdGlvbnMgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZT17IHRoaXMub25BY3JvUmVkdWN0aW9uVXBkYXRlIH0gLz5cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIG1pc3Rha2VzPXsgdGhpcy5wcm9wcy5zY29yZURhdGEubWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHZW5lcmFsTGF5b3V0IGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsTGF5b3V0XCI7XHJcbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjcm9KdWRnZVRhYmxldEJvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHZW5lcmFsTGF5b3V0XHJcbiAgICAgICAgICAgICAgICBsYXlvdXRDbGFzcz17IFNjb3JpbmdMYXlvdXQgfVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IHsgU2xpZGVyIH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtYXRpb25CdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FuQ29uZmlybTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmNhbkNvbmZpcm0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29uZmlybVwiPjwvZGl2PjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29uZmlybVwiPlxyXG4gICAgICAgICAgICA8U2xpZGVyXHJcbiAgICAgICAgICAgICAgICBvbkFjdGl2YXRlPXsgdGhpcy5wcm9wcy5vbkNvbmZpcm0gfVxyXG4gICAgICAgICAgICAgICAgZG9uZT17IHRoaXMucHJvcHMuY29uZmlybWVkIH1cclxuICAgICAgICAgICAgICAgIHNsaWRlVGV4dD17IF8oXCJ0YWJsZXQuZ2xvYmFsLmNvbmZpcm1fc2NvcmVcIikgfVxyXG4gICAgICAgICAgICAgICAgZG9uZVRleHQ9eyBfKFwidGFibGV0Lmdsb2JhbC5jb25maXJtZWRcIikgfSAvPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IHsgVGFibGV0SW50ZWdlcklucHV0IH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBvblNtYWxsTWlzdGFrZXNVcGRhdGUgPSAodmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJzbWFsbF9taXN0YWtlc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBvbkJpZ01pc3Rha2VzVXBkYXRlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwiYmlnX21pc3Rha2VzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibWlzdGFrZXMgZnVsbC13aWR0aFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5zbWFsbF9taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8VGFibGV0SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGEuc21hbGxfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5vblNtYWxsTWlzdGFrZXNVcGRhdGUgfSAvPlxyXG4gICAgICAgICAgICAgICAgPC90ZD48dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5iaWdfbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLmJpZ19taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLm9uQmlnTWlzdGFrZXNVcGRhdGUgfSAvPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2VuZXJhbFNjYWxlIGZyb20gXCJKdWRnZVRhYmxldC9HZW5lcmFsU2NhbGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVQYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBvblZhbHVlVXBkYXRlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnByb3BzLmNvZGUsIHZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlciwgdmFsdWUsIHNjYWxlLCBvblNjb3JlVXBkYXRlLCAuLi5vdGhlcl9wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHZW5lcmFsU2NhbGVcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBoZWFkZXIgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdmFsdWUgfVxuICAgICAgICAgICAgICAgIHNjYWxlPXsgc2NhbGUgfVxuICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLm9uVmFsdWVVcGRhdGUgfVxuICAgICAgICAgICAgICAgIHsuLi5vdGhlcl9wcm9wc30gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFNjb3JlUGFydCBmcm9tIFwiLi9TY29yZVBhcnRcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclBhcnQoY29kZSwgc2NhbGUsIGFkZGl0aW9uYWxfcHJvcHM9e30pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0XHJcbiAgICAgICAgICAgICAgICBjb2RlPXsgY29kZSB9XHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKGB0YWJsZXQuZGFuY2VfanVkZ2UuJHtjb2RlfWApIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGFbY29kZV0gfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsuLi5hZGRpdGlvbmFsX3Byb3BzfSAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZndfd29tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd19tYW5cIiwgXCJyZWR1Y3Rpb25cIikgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJkYW5jZV9maWdzXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEyLjUgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJjb21wb3NpdGlvblwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICA8TWlzdGFrZXNcclxuICAgICAgICAgICAgICAgICAgICBzY29yZURhdGE9eyB0aGlzLnByb3BzLnNjb3JlRGF0YSB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdlbmVyYWxMYXlvdXQgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxMYXlvdXRcIjtcclxuaW1wb3J0IFNjb3JpbmdMYXlvdXQgZnJvbSBcIi4vU2NvcmluZ0xheW91dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2luZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdlbmVyYWxMYXlvdXRcclxuICAgICAgICAgICAgICAgIGxheW91dENsYXNzPXsgU2NvcmluZ0xheW91dCB9XHJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIGNvZGU9eyBjb2RlIH1cclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oYHRhYmxldC5kYW5jZV9qdWRnZS4ke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YVtjb2RlXSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgey4uLmFkZGl0aW9uYWxfcHJvcHN9IC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJmd193b21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImZ3X21hblwiLCBcInJlZHVjdGlvblwiKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJpbnRlZ2VyXCIsIHsgbWluOiAwLCBtYXg6IDI1IH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiY29tcG9zaXRpb25cIiwgXCJpbnRlZ2VyXCIsIHsgbWluOiAwLCBtYXg6IDIwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBvblRvdWNoT3JDbGljayB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLm1rZXkpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJidG5cIiArICh0aGlzLnByb3BzLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbkNsaWNrKSB9PlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMubGFiZWwgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIClcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb290ZXJJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCBCdXR0b24gZnJvbSBcIi4vQnV0dG9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZvb3Rlcihwcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyIHBhZ2Utc2VsZWN0b3JcIj5cbiAgICAgICAgICAgIHsgUmVhY3QuQ2hpbGRyZW4ubWFwKHByb3BzLmNoaWxkcmVuLCAoYnRuKSA9PlxuICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgYnRuLnByb3BzLm1rZXkgfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgcHJvcHMub25DaGFuZ2UgfVxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU9eyBwcm9wcy52YWx1ZSA9PT0gYnRuLnByb3BzLm1rZXkgfVxuICAgICAgICAgICAgICAgICAgICB7IC4uLmJ0bi5wcm9wcyB9IC8+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICApXG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IHsgVGFibGV0SW50ZWdlcklucHV0IH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBvbk1pc3Rha2VzVXBkYXRlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwibWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtaXN0YWtlcyBmdWxsLXdpZHRoXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fbWlzdGFrZXNcIikgfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLm1pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMub25NaXN0YWtlc1VwZGF0ZSB9IC8+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgU2NvcmVQYXJ0IGZyb20gXCIuL1Njb3JlUGFydFwiO1xyXG5pbXBvcnQgTWlzdGFrZXMgZnJvbSBcIi4vTWlzdGFrZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyUGFydChjb2RlLCBzY2FsZSwgYWRkaXRpb25hbF9wcm9wcz17fSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTY29yZVBhcnRcclxuICAgICAgICAgICAgICAgIGNvZGU9eyBjb2RlIH1cclxuICAgICAgICAgICAgICAgIGhlYWRlcj17IF8oYHRhYmxldC5kYW5jZV9qdWRnZS4ke2NvZGV9YCkgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YVtjb2RlXSB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT17IHNjYWxlIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxyXG4gICAgICAgICAgICAgICAgey4uLmFkZGl0aW9uYWxfcHJvcHN9IC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJhY3JvYmF0aWNzXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfdGVjaFwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJpbXByZXNzaW9uXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IHsgVGFibGV0SW50ZWdlcklucHV0IH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBvbk1pc3Rha2VzVXBkYXRlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwibWlzdGFrZXNcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtaXN0YWtlc1wiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzPnsgXyhcInRhYmxldC5kYW5jZV9qdWRnZS5mb3JtX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZXRJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLnNjb3JlRGF0YS5taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLm9uTWlzdGFrZXNVcGRhdGUgfSAvPlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IFNjb3JlUGFydCBmcm9tIFwiLi9TY29yZVBhcnRcIjtcclxuaW1wb3J0IE1pc3Rha2VzIGZyb20gXCIuL01pc3Rha2VzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yaW5nTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlclBhcnQoY29kZSwgc2NhbGUsIGFkZGl0aW9uYWxfcHJvcHM9e30pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0XHJcbiAgICAgICAgICAgICAgICBjb2RlPXsgY29kZSB9XHJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyBfKGB0YWJsZXQuZGFuY2VfanVkZ2UuJHtjb2RlfWApIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZURhdGFbY29kZV0gfVxyXG4gICAgICAgICAgICAgICAgc2NhbGU9eyBzY2FsZSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIHsuLi5hZGRpdGlvbmFsX3Byb3BzfSAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQYXJ0KFwiZGFuY2VfdGVjaFwiLCBcInBvaW50NVwiLCB7IG1pbjogMCwgbWF4OiAxMCB9KSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydChcImRhbmNlX2ZpZ3NcIiwgXCJwb2ludDVcIiwgeyBtaW46IDAsIG1heDogMTAgfSkgfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnQoXCJpbXByZXNzaW9uXCIsIFwicG9pbnQ1XCIsIHsgbWluOiAwLCBtYXg6IDEwIH0pIH1cclxuICAgICAgICAgICAgICAgIDxNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlRGF0YT17IHRoaXMucHJvcHMuc2NvcmVEYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IENvbmZpcm1hdGlvbkJ1dHRvbiBmcm9tIFwiSnVkZ2VUYWJsZXQvQ29uZmlybWF0aW9uQnV0dG9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2lwYW50IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiB0aGlzLnByb3BzLnJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2FuQ29uZmlybSgpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVfZGF0YSA9IHRoaXMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2NvcmVfZGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc2NvcmVfZGF0YVtrZXldO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmZpbHRlcihhID0+IGEgPT09IG51bGwpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgb25Db25maXJtID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtKHRoaXMuc2NvcmUuaWQpO1xuICAgIH1cbiAgICBvblNjb3JlVXBkYXRlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUuY29uZmlybWVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB7fTtcbiAgICAgICAgc2NvcmVfZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnNjb3JlLmlkLCBzY29yZV9kYXRhKTtcbiAgICB9XG4gICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlID0gKGFjcm9faWR4LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zY29yZS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVkdWN0aW9ucyA9IHRoaXMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcCgoKSA9PiBudWxsKTtcbiAgICAgICAgcmVkdWN0aW9uc1thY3JvX2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vblNjb3JlVXBkYXRlKFwicmVkdWN0aW9uc1wiLCByZWR1Y3Rpb25zKTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmluZ0xheW91dCgpIHtcbiAgICAgICAgY29uc3Qgc2NvcmVfZGF0YSA9IHRoaXMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcbiAgICAgICAgY29uc3QgY2xhc3NfbmFtZSA9IHRoaXMuc2NvcmUuY29uZmlybWVkID8gXCJyZWFkLW9ubHlcIiA6IFwiXCI7XG4gICAgICAgIGNvbnN0IFNjb3JpbmdDb21wb25lbnQgPSB0aGlzLnByb3BzLmxheW91dENsYXNzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0+XG4gICAgICAgICAgICAgICAgPFNjb3JpbmdDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVEYXRhPXsgc2NvcmVfZGF0YSB9XG4gICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLm9uU2NvcmVVcGRhdGUgfSAvPlxuICAgICAgICAgICAgICAgIDxDb25maXJtYXRpb25CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgY29uZmlybWVkPXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICBjYW5Db25maXJtPXsgdGhpcy5jYW5Db25maXJtKCkgfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm09eyB0aGlzLm9uQ29uZmlybSB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyTm90UGVyZm9ybWluZ01lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtaW5nXCI+XG4gICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5ub3RfcGVyZm9ybWluZ1wiKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBfKFwiZ2xvYmFsLnBocmFzZXMucGFydGljaXBhbnRfblwiLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJTY29yaW5nTGF5b3V0KClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnJlbmRlck5vdFBlcmZvcm1pbmdNZXNzYWdlKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEhlYWRlciBmcm9tIFwiSnVkZ2VUYWJsZXQvSGVhZGVyXCI7XG5pbXBvcnQgR3JpZCBmcm9tIFwiSnVkZ2VUYWJsZXQvR3JpZFwiO1xuaW1wb3J0IFBhcnRpY2lwYW50IGZyb20gXCIuL1BhcnRpY2lwYW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYWxMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhlYXQ6IHRoaXMuZ2V0Rmlyc3ROb25Db25maXJtZWRIZWF0KCksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy50b3VyLmlkICE9PSB0aGlzLnByb3BzLnRvdXIuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGhlYXQ6IHRoaXMuZ2V0Rmlyc3ROb25Db25maXJtZWRIZWF0KCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhdHNfY291bnQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCguLi50aGlzLnByb3BzLnRvdXIucnVucy5tYXAocnVuID0+IHJ1bi5oZWF0KSk7XG4gICAgfVxuICAgIHVwZGF0ZUhlYXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoZWF0OiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUHJldkhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCAtIDEpO1xuICAgIH1cbiAgICBvbk5leHRIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgKyAxKTtcbiAgICB9XG4gICAgZ2V0Rmlyc3ROb25Db25maXJtZWRIZWF0KCkge1xuICAgICAgICBmb3IgKGNvbnN0IHJ1biBvZiB0aGlzLnByb3BzLnRvdXIucnVucykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiBydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkICYmICFzY29yZS5jb25maXJtZWQgJiYgcnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVuLmhlYXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhlYXRzX2NvdW50O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImp1ZGdlLXRhYmxldFwiPlxuICAgICAgICAgICAgICAgIDxIZWFkZXJcbiAgICAgICAgICAgICAgICAgICAganVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5qdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICAgICAgaGVhdHNDb3VudD17IHRoaXMuaGVhdHNfY291bnQgfVxuICAgICAgICAgICAgICAgICAgICBtYXhIZWF0PXsgdGhpcy5nZXRGaXJzdE5vbkNvbmZpcm1lZEhlYXQoKSB9XG4gICAgICAgICAgICAgICAgICAgIG9uUHJldkhlYXRDbGljaz17IHRoaXMub25QcmV2SGVhdENsaWNrIH1cbiAgICAgICAgICAgICAgICAgICAgb25OZXh0SGVhdENsaWNrPXsgdGhpcy5vbk5leHRIZWF0Q2xpY2sgfSAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8R3JpZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLnJ1bnMuZmlsdGVyKHJ1biA9PiBydW4uaGVhdCA9PT0gdGhpcy5zdGF0ZS5oZWF0KS5tYXAocnVuID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBhcnRpY2lwYW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17IHJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzPXsgdGhpcy5wcm9wcy5sYXlvdXRDbGFzcyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xyXG4gICAgb25Ub3VjaE9yQ2xpY2ssXHJcbiAgICBUYWJsZXRJbnRlZ2VySW5wdXQsXHJcbiAgICBUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQsXHJcbiAgICBUYWJsZXRTZWxlY3RvcklucHV0LFxyXG4gICAgVGFibGV0UG9pbnQ1U2VsZWN0SW5wdXQsXHJcbiAgICBUYWJsZXRBY3JvT3ZlcnJpZGVJbnB1dCxcclxuICAgIFN0b3BXYXRjaCxcclxuICAgIFNsaWRlcixcclxufSBmcm9tIFwidWkvdGFibGV0X2NvbXBvbmVudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYWxTY2FsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWFkZXI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldCBwb3NzaWJsaWVfcmVkdWN0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBbMTAwLCBcIlhcIl0sXHJcbiAgICAgICAgICAgIFs3NSwgIFwiLTc1JVwiXSxcclxuICAgICAgICAgICAgWzUwLCAgXCItNTAlXCJdLFxyXG4gICAgICAgICAgICBbMjUsICBcIi0yNSVcIl0sXHJcbiAgICAgICAgICAgIFsxMCwgIFwiLTEwJVwiXSxcclxuICAgICAgICAgICAgWzUsICAgXCItNSVcIl0sXHJcbiAgICAgICAgICAgIFswLCAgIFwiT0tcIl0sXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG4gICAgcmVuZGVySGVhZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYWRlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGgzPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmhlYWRlciB9XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcbiAgICByZW5kZXJCb2R5KCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zY2FsZSkge1xyXG4gICAgICAgIGNhc2UgXCJwb2ludDVcIjpcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxUYWJsZXRQb2ludDVTZWxlY3RJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidHdvLWxpbmVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBjYXNlIFwiaW50ZWdlclwiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJTZWxlY3RJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwidHdvLWxpbmVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICBjYXNlIFwiZ3JpZFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJTZWxlY3RJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiZ3JpZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgY2FzZSBcInJlZHVjdGlvblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIm9uZS1saW5lXCJcclxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5wb3NzaWJsaWVfcmVkdWN0aW9ucyB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5rbm93ZCBzY2FsZSB0eXBlOiAke3RoaXMucHJvcHMuc2NhbGV9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XHJcbiAgICBnZXQgY2hpbGRyZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJjaGlsZHJlblwiLCAoKSA9PlxyXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgIDogW3RoaXMucHJvcHMuY2hpbGRyZW5dXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGdldCB0d29fcm93cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInR3b19yb3dzXCIsICgpID0+XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID49IDRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0IHdpZHRoX3ZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwid2lkdGhfdmFsdWVcIiwgKCkgPT5cclxuICAgICAgICAgICAgdGhpcy50d29fcm93c1xyXG4gICAgICAgICAgICAgICAgPyA5OS45IC8gKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICsgMSkgKiAyXHJcbiAgICAgICAgICAgICAgICA6IDk5LjkgLyB0aGlzLmNoaWxkcmVuLmxlbmd0aFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXQgd2lkdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ3aWR0aFwiLCAoKSA9PlxyXG4gICAgICAgICAgICBgJHsgdGhpcy53aWR0aF92YWx1ZS50b0ZpeGVkKDUpIH0lYFxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIGdldCBtYXhfd2lkdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJtYXhfd2lkdGhcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lX3NpemUgPSB0aGlzLnR3b19yb3dzXHJcbiAgICAgICAgICAgICAgICA/IE1hdGguZmxvb3IoKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICsgMSkgLyAyICsgMC4wMDEpXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7NjAwICogbGluZV9zaXplfXB4YDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldCBhc3ltX2xheW91dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcImFzeW1fbGF5b3V0XCIsICgpID0+XHJcbiAgICAgICAgICAgIHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgICAgID8gdGhpcy5jaGlsZHJlbiAlIDIgPT09IDBcclxuICAgICAgICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm93KGVsZW1lbnRzLCBpc19zZWNvbmRfcm93KSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnRzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByb3dfd2lkdGggPSBgJHsoZWxlbWVudHMubGVuZ3RoICogdGhpcy53aWR0aF92YWx1ZSkudG9GaXhlZCg1KX0lYDtcclxuICAgICAgICBsZXQgY2xhc3NfbmFtZSA9IFwicm93XCI7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFzeW1fbGF5b3V0KSB7XHJcbiAgICAgICAgICAgIGNsYXNzX25hbWUgKz0gXCIgYWxpZ24tY2VudGVyXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc19zZWNvbmRfcm93KSB7XHJcbiAgICAgICAgICAgIGNsYXNzX25hbWUgKz0gXCIgYWxpZ24tbGVmdFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsYXNzX25hbWUgKz0gXCIgYWxpZ24tcmlnaHRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17IGNsYXNzX25hbWUgfSBzdHlsZT17eyB3aWR0aDogcm93X3dpZHRoIH19Pjx0Ym9keT5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICB7IGVsZW1lbnRzLm1hcCgoZSwgaWR4KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiaXRlbVwiIGtleT17IGlkeCB9IHN0eWxlPXt7IHdpZHRoOiB0aGlzLndpZHRoIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICApIH1cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NfbmFtZSA9IHRoaXMudHdvX3Jvd3MgPyBcImdyaWQgdHdvLXJvd3NcIiA6IFwiZ3JpZFwiO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0X3JvdyA9IHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgPyB0aGlzLmNoaWxkcmVuLmZpbHRlcigoeCwgaWR4KSA9PiBpZHggJSAyID09PSAxKVxyXG4gICAgICAgICAgICA6IHRoaXMuY2hpbGRyZW47XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kX3JvdyA9IHRoaXMudHdvX3Jvd3NcclxuICAgICAgICAgICAgPyB0aGlzLmNoaWxkcmVuLmZpbHRlcigoeCwgaWR4KSA9PiBpZHggJSAyID09PSAwKVxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBjbGFzc19uYW1lIH0gc3R5bGU9e3sgbWF4V2lkdGg6IHRoaXMubWF4X3dpZHRoIH19PlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJvdyhmaXJzdF9yb3csIGZhbHNlKSB9XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUm93KHNlY29uZF9yb3csIHRydWUpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzaG93Q29uZmlybSB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBvblRvdWNoT3JDbGljayB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpb25zUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RvcFRvdXIgPSAoKSA9PiB7XG4gICAgICAgIHNob3dDb25maXJtKF8oXCJ0YWJsZXQuY29uZmlybXMuc3RvcF90b3VyXCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdG9wXCIsIHsgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyLmlkIH0pLm9uU3VjY2VzcygoKSA9PiBzd2FsLmNsb3NlKCkpLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsaXplVG91ciA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5maW5hbGl6ZV90b3VyXCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5maW5hbGl6ZVwiLCB7IHRvdXJfaWQ6IHRoaXMucHJvcHMudG91ci5pZCB9KS5vblN1Y2Nlc3MoKCkgPT4gc3dhbC5jbG9zZSgpKS5zZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wVG91ckFuZFN0YXJ0TmV4dCA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5zdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG91cl9pZCA9IHRoaXMucHJvcHMudG91ci5pZDtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0b3BcIiwgeyB0b3VyX2lkIH0pLm9uU3VjY2VzcygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEFwaShcInRvdXIuc3RhcnRfbmV4dF9hZnRlclwiLCB7IHRvdXJfaWQgfSkub25TdWNjZXNzKCgpID0+IHN3YWwuY2xvc2UoKSkuc2VuZCgpO1xuICAgICAgICAgICAgICAgIH0pLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZpbmFsaXplVG91ckFuZFN0YXJ0TmV4dCA9ICgpID0+IHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5maW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCIpLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvdXJfaWQgPSB0aGlzLnByb3BzLnRvdXIuaWQ7XG4gICAgICAgICAgICAgICAgQXBpKFwidG91ci5maW5hbGl6ZVwiLCB7IHRvdXJfaWQgfSkub25TdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdGFydF9uZXh0X2FmdGVyXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4gc3dhbC5jbG9zZSgpKS5zZW5kKCk7XG4gICAgICAgICAgICAgICAgfSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFzVW5jb25maXJtZWRTY29yZXMoKSB7XG4gICAgICAgIGNvbnN0IHJ1bnMgPSB0aGlzLnByb3BzLnRvdXIucnVucztcbiAgICAgICAgY29uc3QgbGF0ZXN0X2hlYXQgPSBydW5zW3J1bnMubGVuZ3RoIC0gMV0uaGVhdDtcbiAgICAgICAgaWYgKGxhdGVzdF9oZWF0ID09PSBydW5zWzBdLmhlYXQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhdGVzdF9ydW5zID0gcnVucy5maWx0ZXIociA9PiByLmhlYXQgPT09IGxhdGVzdF9oZWF0KTtcbiAgICAgICAgY29uc3QgcHJldl9ydW5zID0gcnVucy5maWx0ZXIociA9PiByLmhlYXQgPT09IGxhdGVzdF9oZWF0IC0gMSk7XG4gICAgICAgIGxldCBzY29yZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NfcnVuID0gKHJ1biwgdHlwZSkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29yZSBvZiBydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGpfaWQgPSBzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkO1xuICAgICAgICAgICAgICAgIGlmICghc2NvcmVzLmhhcyhkal9pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzLnNldChkal9pZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldjogMCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzY29yZS5jb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgKytzY29yZXMuZ2V0KGRqX2lkKVt0eXBlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIGxhdGVzdF9ydW5zKSB7XG4gICAgICAgICAgICBwcm9jZXNzX3J1bihydW4sIFwibGF0ZXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcnVuIG9mIHByZXZfcnVucykge1xuICAgICAgICAgICAgcHJvY2Vzc19ydW4ocnVuLCBcInByZXZcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzdGF0cyBvZiBzY29yZXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChzdGF0cy5wcmV2ID4gMCAmJiBzdGF0cy5sYXRlc3QgPCBsYXRlc3RfcnVucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJlbmRlcldhcm5pbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNVbmNvbmZpcm1lZFNjb3JlcygpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YXJuaW5nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5hbGVydHMuaGFzX3VuY29uZmlybWVkX3Njb3Jlc1wiKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyQnV0dG9uKGNvZGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1cIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInRidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayhjYWxsYmFjayl9PlxuICAgICAgICAgICAgICAgICAgICB7IF8oYHRhYmxldC5idXR0b25zLiR7Y29kZX1gKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IGFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyV2FybmluZygpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwic3RvcF90b3VyXCIsIHRoaXMuc3RvcFRvdXIpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKFwiZmluYWxpemVfdG91clwiLCB0aGlzLmZpbmFsaXplVG91cikgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIiwgdGhpcy5zdG9wVG91ckFuZFN0YXJ0TmV4dCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCIsIHRoaXMuZmluYWxpemVUb3VyQW5kU3RhcnROZXh0KSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvYmF0aWNPdmVycmlkZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGdldEFjcm9iYXRpY092ZXJyaWRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3NcbiAgICAgICAgICAgIC5tYXAoKGFjcm8sIGlkeCkgPT4gKHsgaWR4OiBpZHggKyAxLCBhY3JvYmF0aWM6IGFjcm8gfSkpXG4gICAgICAgICAgICAuZmlsdGVyKChhY3JvKSA9PiBhY3JvLmFjcm9iYXRpYy5vcmlnaW5hbF9zY29yZSAhPT0gYWNyby5hY3JvYmF0aWMuc2NvcmUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhY3JvYmF0aWNfb3ZlcnJpZGVzID0gdGhpcy5nZXRBY3JvYmF0aWNPdmVycmlkZXMoKTtcbiAgICAgICAgaWYgKGFjcm9iYXRpY19vdmVycmlkZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5hY3JvYmF0aWNfb3ZlcnJpZGVzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IGFjcm9iYXRpY19vdmVycmlkZXMubWFwKChhY3JvKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGFjcm8uaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNVwiPnsgYWNyby5pZHggfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnsgYWNyby5hY3JvYmF0aWMuZGVzY3JpcHRpb24gfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1yaWdodFwiPnsgYWNyby5hY3JvYmF0aWMub3JpZ2luYWxfc2NvcmUudG9GaXhlZCgxKSB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy01IHRleHQtY2VudGVyXCI+4oaSPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCB0ZXh0LWxlZnRcIj57IGFjcm8uYWNyb2JhdGljLnNjb3JlLnRvRml4ZWQoMSkgfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSXRlbShwcm9wcykge1xuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHByb3BzLnNjb3JlICYmIHByb3BzLnNjb3JlLmNvbmZpcm1lZDtcbiAgICByZXR1cm4gKFxuICAgICAgICA8dGQgY2xhc3NOYW1lPXsgY29uZmlybWVkID8gXCJjb25maXJtZWRcIiA6IFwiXCIgfT5cbiAgICAgICAgICAgIHsgcHJvcHMuc2NvcmVcbiAgICAgICAgICAgICAgICA/IHByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgIDogXCLigJRcIiB9XG4gICAgICAgIDwvdGQ+XG4gICAgKTtcbn1cbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XG5cbmltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVKdWRnZVNjb3JlIGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBnZXQgbGluZV9qdWRnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwibGluZV9qdWRnZXNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlcy5maWx0ZXIoZGogPT4gZGoucm9sZSA9PT0gXCJkYW5jZV9qdWRnZVwiIHx8IGRqLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiKSk7XG4gICAgfVxuICAgIGdldCBsaW5lX2p1ZGdlc19pbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJsaW5lX2p1ZGdlc19pbmRleFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBkaiBvZiB0aGlzLmxpbmVfanVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldChkai5pZCwgZGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBzY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwic2NvcmVzXCIsICgpID0+XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5zY29yZXMuZmlsdGVyKHNjb3JlID0+IHRoaXMubGluZV9qdWRnZXNfaW5kZXguaGFzKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQpKSk7XG4gICAgfVxuICAgIHJlbmRlck51bWJlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Jlcy5tYXAoc2NvcmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGogPSB0aGlzLmxpbmVfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHRkIGtleT17IHNjb3JlLmlkIH0+XG4gICAgICAgICAgICAgICAgICAgIHsgYCR7ZGouanVkZ2UubnVtYmVyIH0keyBkai5yb2xlID09PSBcImFjcm9fanVkZ2VcIiA/IFwiIChBKVwiIDogXCJcIiB9YCB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3Jlcy5tYXAoc2NvcmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGogPSB0aGlzLmxpbmVfanVkZ2VzX2luZGV4LmdldChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgICAgICAgICAga2V5PXsgZGouaWQgfVxuICAgICAgICAgICAgICAgICAgICBqdWRnZT17IGRqLmp1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyBzY29yZSB9IC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRfanVkZ2UuZGFuY2VfanVkZ2Vfc2NvcmVzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJkYW5jZS1qdWRnZS1zY29yZXNcIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJudW1iZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTnVtYmVycygpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cInNjb3Jlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3JlcygpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuXG5pbXBvcnQgeyBvblRvdWNoT3JDbGljayB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RQZXJmb3JtZWRTd2l0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIG1hcmtOb3RQZXJmb3JtZWQoKSB7XG4gICAgICAgIEFwaShcInJ1bi5tYXJrX25vdF9wZXJmb3JtZWRcIiwgeyBydW5faWQ6IHRoaXMucHJvcHMucnVuLmlkIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgbWFya1BlcmZvcm1lZCgpIHtcbiAgICAgICAgQXBpKFwicnVuLm1hcmtfcGVyZm9ybWVkXCIsIHsgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bi5pZCB9KS5zZW5kKCk7XG4gICAgfVxuICAgIHJlbmRlckJ1dHRvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1kYW5nZXJcIiB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMubWFya05vdFBlcmZvcm1lZC5iaW5kKHRoaXMpKSB9PlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuZ2xvYmFsLm1hcmtfbm90X3BlcmZvcm1lZFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1zdWNjZXNzXCIgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLm1hcmtQZXJmb3JtZWQuYmluZCh0aGlzKSkgfT5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5kaXNjYXJkX25vdF9wZXJmb3JtZWRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtZWQtY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCdXR0b24oKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQge1xuICAgIG9uVG91Y2hPckNsaWNrLFxuICAgIFRhYmxldEludGVnZXJJbnB1dCxcbiAgICBUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQsXG4gICAgVGFibGV0U2VsZWN0b3JJbnB1dCxcbiAgICBUYWJsZXRQb2ludDVTZWxlY3RJbnB1dCxcbiAgICBUYWJsZXRBY3JvT3ZlcnJpZGVJbnB1dCxcbiAgICBTdG9wV2F0Y2gsXG4gICAgU2xpZGVyLFxufSBmcm9tIFwidWkvdGFibGV0X2NvbXBvbmVudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVuYWx0eUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBvblVwZGF0ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJwZW5hbHR5XCIsIHZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBwZW5hbHRpZXMgPSBbXCJyb3NmYXJyLmZvcm1hdGlvblwiLCBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIl0uaW5kZXhPZih0aGlzLnByb3BzLnNjb3JpbmdTeXN0ZW1OYW1lKSA+PSAwXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBbMCwgICAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLm9rXCIpXSxcbiAgICAgICAgICAgICAgICBbLTUsICAgXyhcInRhYmxldC5oZWFkX2p1ZGdlLmZvcm1feWVsbG93X2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMTUsICBfKFwidGFibGV0LmhlYWRfanVkZ2UuZm9ybV9yZWRfY2FyZFwiKV1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgIFswLCAgICBfKFwidGFibGV0LmhlYWRfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstMywgICBfKFwidGFibGV0LmhlYWRfanVkZ2UueWVsbG93X2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMzAsICBfKFwidGFibGV0LmhlYWRfanVkZ2UucmVkX2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMTAwLCBfKFwidGFibGV0LmhlYWRfanVkZ2UuYmxhY2tfY2FyZFwiKV1cbiAgICAgICAgICAgIF07XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZF9qdWRnZS5wZW5hbHR5X3R5cGVcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlcz17IHBlbmFsdGllcyB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnBlbmFsdHkgfVxuICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5vblVwZGF0ZSB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcmV2aW91c1BlbmFsdGllcyhwcm9wcykge1xuICAgIGlmICghcHJvcHMucnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllcyB8fCBwcm9wcy5ydW4uaW5oZXJpdGVkX2RhdGEucGVuYWx0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gPGRpdiAvPjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XG4gICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRfanVkZ2UucHJldmlvdXNfcnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllc1wiKSB9PC9oMz5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+PHRib2R5PiB7XG4gICAgICAgICAgICAgICAgcHJvcHMucnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllcy5tYXAoKGQsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1jZW50ZXJcIj48c3Ryb25nPnsgZC5wZW5hbHR5IH08L3N0cm9uZz48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnsgZC50b3VyIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAganVkZ2U6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0VGltaW5nRGF0YSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNjb3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gW1wiLVwiLCBcIlwiXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdHZfcmF3X3ZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnRpbWluZ192aW9sYXRpb247XG4gICAgICAgIGlmICh0dl9yYXdfdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBbXCItXCIsIFwiXCJdO1xuICAgICAgICB9IGVsc2UgaWYgKHR2X3Jhd192YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFtcIlhcIiwgXCIgZmFpbFwiXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXCJPS1wiLCBcIiBva1wiXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCB0aW1pbmdfZGF0YSA9IHRoaXMuZ2V0VGltaW5nRGF0YSgpO1xuICAgICAgICBsZXQganVtcF9zdGVwcyA9IHRoaXMucHJvcHMuc2NvcmVcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmp1bXBfc3RlcHNcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgbGV0IGNvbmZpcm1lZCA9IHRoaXMucHJvcHMuc2NvcmUgJiYgdGhpcy5wcm9wcy5zY29yZS5jb25maXJtZWQ7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9eyBjb25maXJtZWQgPyBcImNvbmZpcm1lZFwiIDogXCJcIiB9PnsgdGhpcy5wcm9wcy5qdWRnZS5uYW1lIH08L2gzPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0ZWNoLWp1ZGdlLWluZm9cIj48dGJvZHk+PHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC50ZWNoX2p1ZGdlLmp1bXBfc3RlcHNcIikgfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGp1bXBfc3RlcHMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LnRlY2hfanVkZ2UudGltaW5nXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiaW5uZXJcIiArIHRpbWluZ19kYXRhWzFdIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aW1pbmdfZGF0YVswXSB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlY2hKdWRnZXNTY29yZXMgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGdldCB0ZWNoX2p1ZGdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJ0ZWNoX2p1ZGdlc1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2VzLmZpbHRlcihkaiA9PiBkai5yb2xlID09PSBcInRlY2hfanVkZ2VcIikpO1xuICAgIH1cbiAgICBnZXQgdGVjaF9qdWRnZXNfaW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwidGVjaF9qdWRnZXNfaW5kZXhcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZGogb2YgdGhpcy50ZWNoX2p1ZGdlcykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoZGouaWQsIGRqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgc2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3Jlc1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4uc2NvcmVzLmZpbHRlcihzY29yZSA9PiB0aGlzLnRlY2hfanVkZ2VzX2luZGV4LmhhcyhzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkKSkpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5zY29yZXMubWFwKHNjb3JlID0+XG4gICAgICAgICAgICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyBzY29yZS5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZT17IHNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGp1ZGdlPXsgdGhpcy50ZWNoX2p1ZGdlc19pbmRleC5nZXQoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCkuanVkZ2UgfSAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IFBlbmFsdHlJbnB1dCBmcm9tIFwiLi9QZW5hbHR5SW5wdXRcIjtcbmltcG9ydCBUZWNoSnVkZ2VzU2NvcmVzIGZyb20gXCIuL1RlY2hKdWRnZXNTY29yZXNcIjtcbmltcG9ydCBMaW5lSnVkZ2VzU2NvcmVzIGZyb20gXCIuL0xpbmVKdWRnZXNTY29yZXNcIjtcbmltcG9ydCBBY3JvYmF0aWNPdmVycmlkZXMgZnJvbSBcIi4vQWNyb2JhdGljT3ZlcnJpZGVzXCI7XG5pbXBvcnQgUHJldmlvdXNQZW5hbHRpZXMgZnJvbSBcIi4vUHJldmlvdXNQZW5hbHRpZXNcIjtcbmltcG9ydCBOb3RQZXJmb3JtZWRTd2l0Y2ggZnJvbSBcIi4vTm90UGVyZm9ybWVkU3dpdGNoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JpbmdMYXlvdXQgZXh0ZW5kcyBDYWNoZU1peGluKFJlYWN0LkNvbXBvbmVudCkge1xuICAgIGdldCBzY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJzY29yZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHRoaXMucHJvcHMucnVuLnNjb3Jlcykge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NvcmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblNjb3JlVXBkYXRlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB7fTtcbiAgICAgICAgc2NvcmVfZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnNjb3JlLmlkLCBzY29yZV9kYXRhKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBfKFwiZ2xvYmFsLnBocmFzZXMucGFydGljaXBhbnRfblwiLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dC1wYXJ0aWNpcGFudFwiPlxuICAgICAgICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhlYWRlciB9XG4gICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxOb3RQZXJmb3JtZWRTd2l0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXQtcGFydGljaXBhbnRcIj5cbiAgICAgICAgICAgICAgICA8aDI+XG4gICAgICAgICAgICAgICAgICAgIHsgaGVhZGVyIH1cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIDxQZW5hbHR5SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3JpbmdTeXN0ZW1OYW1lPXsgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgfSAvPlxuICAgICAgICAgICAgICAgIDxUZWNoSnVkZ2VzU2NvcmVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlcz17IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzIH0gLz5cbiAgICAgICAgICAgICAgICA8TGluZUp1ZGdlc1Njb3Jlc1xuICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZXM9eyB0aGlzLnByb3BzLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcyB9IC8+XG4gICAgICAgICAgICAgICAgPEFjcm9iYXRpY092ZXJyaWRlc1xuICAgICAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9IC8+XG4gICAgICAgICAgICAgICAgPFByZXZpb3VzUGVuYWx0aWVzXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH0gLz5cbiAgICAgICAgICAgICAgICA8Tm90UGVyZm9ybWVkU3dpdGNoXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBDYWNoZU1peGluIGZyb20gXCJjb21tb24vQ2FjaGVNaXhpblwiO1xuXG5pbXBvcnQgR3JpZCBmcm9tIFwiSnVkZ2VUYWJsZXQvR3JpZFwiO1xuXG5pbXBvcnQgU2NvcmluZ0xheW91dCBmcm9tIFwiLi9TY29yaW5nTGF5b3V0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRzUGFnZSBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHJ1bnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZldGNoRnJvbUNhY2hlKFwicnVuc1wiLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5wcm9wcy50b3VyLnJ1bnMuZmlsdGVyKHJ1biA9PiBydW4uaGVhdCA9PT0gdGhpcy5wcm9wcy5oZWF0KSk7XG4gICAgfVxuICAgIHJlbmRlclNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVucy5tYXAocnVuID0+XG4gICAgICAgICAgICA8U2NvcmluZ0xheW91dFxuICAgICAgICAgICAgICAgIGtleT17IHJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9IC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keSBoZWF0c1wiPlxuICAgICAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzKCkgfVxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xuXG5pbXBvcnQgUmVzdWx0c1RhYmxlMiBmcm9tIFwiUmVzdWx0c1RhYmxlMlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgLy8gSW5pdGlhbGl6YXRpb25cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgICAgICByZXN1bHRzOiBudWxsLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuVE9VUl9TQ0hFTUEgPSB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB7XG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7XG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlOiB7fSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiB7fSxcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwicmVzdWx0c19cIiArIHRoaXMucHJvcHMudG91ci5pZCk7XG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInRvdXJfcmVzdWx0c19jaGFuZ2VkIHJlbG9hZF9kYXRhXCIsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSB8fCBtZXNzYWdlLnRvdXJfaWQgPT09IHRoaXMucHJvcHMudG91ci5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZWxvYWRfbGlzdGVuZXIpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5kYl91cGRhdGVfbGlzdGVuZXIpO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lcik7XG4gICAgICAgIHN0b3JhZ2UuZGVsRG9tYWluKFwicmVzdWx0c19cIiArIHRoaXMucHJvcHMudG91ci5pZCk7XG4gICAgfVxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xuICAgICAgICBsZXQgc2VyaWFsaXplZCA9IHRoaXMuc3RvcmFnZS5nZXQoXCJUb3VyXCIpXG4gICAgICAgICAgICAuYnlfaWQodGhpcy5wcm9wcy50b3VyLmlkKVxuICAgICAgICAgICAgLnNlcmlhbGl6ZSh0aGlzLlRPVVJfU0NIRU1BKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0b3VyOiBzZXJpYWxpemVkLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZFJlc3VsdHMoKSB7XG4gICAgICAgIEFwaShcInRvdXIuZ2V0X3Jlc3VsdHNcIiwge3RvdXJfaWQ6IHRoaXMucHJvcHMudG91ci5pZH0pXG4gICAgICAgIC5vblN1Y2Nlc3MoZnVuY3Rpb24obmV3X3Jlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBuZXdfcmVzdWx0cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZSgpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIC5zZW5kKCk7XG4gICAgfVxuICAgIGxvYWREYXRhKCkge1xuICAgICAgICBBcGkoXCJ0b3VyLmdldFwiLCB7IHRvdXJfaWQ6IHRoaXMucHJvcHMudG91ci5pZCwgY2hpbGRyZW46IHRoaXMuVE9VUl9TQ0hFTUF9KVxuICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMucHJvcHMudG91ci5pZCwgdGhpcy5zdG9yYWdlKVxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXG4gICAgICAgICAgICAuc2VuZCgpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwgfHwgdGhpcy5zdGF0ZS5yZXN1bHRzID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiAvPlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHkgcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG91ci1yZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxSZXN1bHRzVGFibGUyIHsuLi50aGlzLnN0YXRlfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gXCJKdWRnZVRhYmxldC9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3RlclwiO1xuaW1wb3J0IEZvb3Rlckl0ZW0gZnJvbSBcIkp1ZGdlVGFibGV0L0Zvb3Rlci9Gb290ZXJJdGVtXCI7XG5cbmltcG9ydCBIZWF0c1BhZ2UgZnJvbSBcIi4vSGVhdHNQYWdlXCI7XG5pbXBvcnQgUmVzdWx0c1BhZ2UgZnJvbSBcIi4vUmVzdWx0c1BhZ2VcIjtcbmltcG9ydCBBY3Rpb25zUGFnZSBmcm9tIFwiLi9BY3Rpb25zUGFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkSnVkZ2VMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGhlYXQ6IDEsXG4gICAgICAgICAgICBwYWdlOiBcImhlYXRzXCIsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dF9wcm9wcykge1xuICAgICAgICBpZiAobmV4dF9wcm9wcy50b3VyLmlkICE9PSB0aGlzLnByb3BzLnRvdXIuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGhlYXQ6IDEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgaGVhdHNfY291bnQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCguLi50aGlzLnByb3BzLnRvdXIucnVucy5tYXAocnVuID0+IHJ1bi5oZWF0KSk7XG4gICAgfVxuICAgIHVwZGF0ZUhlYXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoZWF0OiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUHJldkhlYXRDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWF0KHRoaXMuc3RhdGUuaGVhdCAtIDEpO1xuICAgIH1cbiAgICBvbk5leHRIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgKyAxKTtcbiAgICB9XG4gICAgb25QYWdlQ2hhbmdlID0gKHBhZ2UpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2UgfSk7XG4gICAgfVxuICAgIHJlbmRlckhlYXRzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYXRzUGFnZVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVKdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlIH1cbiAgICAgICAgICAgICAgICBoZWF0PXsgdGhpcy5zdGF0ZS5oZWF0IH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyUmVzdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZXN1bHRzUGFnZVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfSAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEFjdGlvbnNQYWdlXG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9IC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhdHNfY291bnQgPSB0aGlzLmhlYXRzX2NvdW50O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEhlYWRlclxuICAgICAgICAgICAgICAgIGp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UuanVkZ2UgfVxuICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxuICAgICAgICAgICAgICAgIGhlYXQ9eyB0aGlzLnN0YXRlLmhlYXQgfVxuICAgICAgICAgICAgICAgIGhlYXRzQ291bnQ9eyBoZWF0c19jb3VudCB9XG4gICAgICAgICAgICAgICAgbWF4SGVhdD17IGhlYXRzX2NvdW50IH1cbiAgICAgICAgICAgICAgICBvblByZXZIZWF0Q2xpY2s9eyB0aGlzLm9uUHJldkhlYXRDbGljayB9XG4gICAgICAgICAgICAgICAgb25OZXh0SGVhdENsaWNrPXsgdGhpcy5vbk5leHRIZWF0Q2xpY2sgfSAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUucGFnZSkge1xuICAgICAgICBjYXNlIFwiaGVhdHNcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckhlYXRzKCk7XG4gICAgICAgIGNhc2UgXCJyZXN1bHRzXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJSZXN1bHRzKCk7XG4gICAgICAgIGNhc2UgXCJhY3Rpb25zXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3Rpb25zKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZvb3RlciB2YWx1ZT17IHRoaXMuc3RhdGUucGFnZSB9IG9uQ2hhbmdlPXsgdGhpcy5vblBhZ2VDaGFuZ2UgfT5cbiAgICAgICAgICAgICAgICA8Rm9vdGVySXRlbVxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17IF8oXCJ0YWJsZXQucGFnZXMuaGVhdHNcIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwiaGVhdHNcIiAvPlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5yZXN1bHRzXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cInJlc3VsdHNcIiAvPlxuICAgICAgICAgICAgICAgIDxGb290ZXJJdGVtXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsgXyhcInRhYmxldC5wYWdlcy5hY3Rpb25zXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgbWtleT1cImFjdGlvbnNcIiAvPlxuICAgICAgICAgICAgPC9Gb290ZXI+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwianVkZ2UtdGFibGV0XCI+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyRm9vdGVyKCkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJQcmV2SGVhdEJ1dHRvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oZWF0IDw9IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIG9uQ2xpY2s9eyB0aGlzLnByb3BzLm9uUHJldkhlYXRDbGljayB9PlxyXG4gICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucHJldl9oZWF0XCIpIH1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlck5leHRIZWF0QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhlYXQgPj0gdGhpcy5wcm9wcy5tYXhIZWF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17IHRoaXMucHJvcHMub25OZXh0SGVhdENsaWNrIH0+XHJcbiAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5uZXh0X2hlYXRcIikgfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGp1ZGdlX251bWJlciA9IHRoaXMucHJvcHMuanVkZ2Uucm9sZV9kZXNjcmlwdGlvbiB8fCBfKFwiZ2xvYmFsLnBocmFzZXMuanVkZ2VfblwiLCB0aGlzLnByb3BzLmp1ZGdlLm51bWJlcik7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGhlYWRlcj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJQcmV2SGVhdEJ1dHRvbigpIH1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOZXh0SGVhdEJ1dHRvbigpIH1cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGhcIj48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDE+eyBqdWRnZV9udW1iZXIgfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+eyB0aGlzLnByb3BzLmp1ZGdlLm5hbWUgfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMT57IHRoaXMucHJvcHMudG91ci5kaXNjaXBsaW5lLm5hbWUgfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnRvdXIubmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0Lmdsb2JhbC5oZWF0X251bWJlclwiLCB0aGlzLnByb3BzLmhlYXQsIHRoaXMucHJvcHMuaGVhdHNDb3VudCApIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgIDwvaGVhZGVyPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBHZW5lcmFsU2NhbGUgZnJvbSBcIkp1ZGdlVGFibGV0L0dlbmVyYWxTY2FsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBvblZhbHVlVXBkYXRlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKFwicG9pbnRzXCIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R2VuZXJhbFNjYWxlXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMuc2NvcmVEYXRhLnBvaW50cyB9XHJcbiAgICAgICAgICAgICAgICBzY2FsZT1cImdyaWRcIlxyXG4gICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMub25WYWx1ZVVwZGF0ZSB9XHJcbiAgICAgICAgICAgICAgICBtaW49eyAxIH1cclxuICAgICAgICAgICAgICAgIG1heD17IDQwIH1cclxuICAgICAgICAgICAgICAgIHJvd1NpemU9eyAxMCB9IC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBUYWJsZXRBY3JvT3ZlcnJpZGVJbnB1dCB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlY2gtanVkZ2UtYWNyb1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udHJvbHMgcHVsbC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNldHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxldEFjcm9PdmVycmlkZUlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxfdmFsdWU9eyB0aGlzLnByb3BzLmFjcm8ub3JpZ2luYWxfc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5hY3JvLnNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5wcm9wcy5vbkFjcm9PdmVycmlkZSB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmFjcm8uZGVzY3JpcHRpb24gfVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFwaSBmcm9tIFwic2VydmVyL2FwaVwiO1xuXG5pbXBvcnQgQ2FjaGVNaXhpbiBmcm9tIFwiY29tbW9uL0NhY2hlTWl4aW5cIjtcblxuaW1wb3J0IENvbmZpcm1hdGlvbkJ1dHRvbiBmcm9tIFwiSnVkZ2VUYWJsZXQvQ29uZmlybWF0aW9uQnV0dG9uXCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuL0VsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uQ29uZmlybSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSh0aGlzLnNjb3JlLmlkKTtcbiAgICB9XG4gICAgb25BY3JvT3ZlcnJpZGUgPSAoYWNyb19pZHgsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEFwaShcImFjcm9iYXRpY19vdmVycmlkZS5zZXRcIiwge1xuICAgICAgICAgICAgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bi5pZCxcbiAgICAgICAgICAgIGFjcm9iYXRpY19pZHg6IGFjcm9faWR4LFxuICAgICAgICAgICAgc2NvcmU6IHZhbHVlLFxuICAgICAgICB9KS5zZW5kKCk7XG4gICAgfVxuICAgIGdlbk9uQWNyb092ZXJyaWRlKGFjcm9faWR4KSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLm9uQWNyb092ZXJyaWRlKGFjcm9faWR4LCBuZXdfdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgIDxFbGVtZW50XG4gICAgICAgICAgICAgICAga2V5PXsgaWR4IH1cbiAgICAgICAgICAgICAgICBhY3JvPXsgYWNybyB9XG4gICAgICAgICAgICAgICAgb25BY3JvT3ZlcnJpZGU9eyB0aGlzLmdlbk9uQWNyb092ZXJyaWRlKGlkeCkgfSAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb250ZW50KCkgfVxuICAgICAgICAgICAgICAgIDxDb25maXJtYXRpb25CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgY29uZmlybWVkPXsgdGhpcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm09eyB0aGlzLm9uQ29uZmlybSB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tIFwiSnVkZ2VUYWJsZXQvR3JpZFwiO1xuXG5pbXBvcnQgU2NvcmluZ0xheW91dCBmcm9tIFwiLi9TY29yaW5nTGF5b3V0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjcm9QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJ1bnMubWFwKHJ1biA9PlxuICAgICAgICAgICAgPFNjb3JpbmdMYXlvdXRcbiAgICAgICAgICAgICAgICBrZXk9eyBydW4uaWQgfVxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIG9uQWNyb092ZXJyaWRlPXsgdGhpcy5wcm9wcy5vbkFjcm9PdmVycmlkZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IGhlYXRzXCI+XG4gICAgICAgICAgICAgICAgPEdyaWQ+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXMoKSB9XG4gICAgICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBDb25maXJtYXRpb25CdXR0b24gZnJvbSBcIkp1ZGdlVGFibGV0L0NvbmZpcm1hdGlvbkJ1dHRvblwiO1xuXG5pbXBvcnQge1xuICAgIG9uVG91Y2hPckNsaWNrLFxuICAgIFRhYmxldEludGVnZXJJbnB1dCxcbiAgICBUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQsXG4gICAgVGFibGV0U2VsZWN0b3JJbnB1dCxcbiAgICBUYWJsZXRQb2ludDVTZWxlY3RJbnB1dCxcbiAgICBUYWJsZXRBY3JvT3ZlcnJpZGVJbnB1dCxcbiAgICBTdG9wV2F0Y2gsXG4gICAgU2xpZGVyLFxufSBmcm9tIFwidWkvdGFibGV0X2NvbXBvbmVudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmluZ0xheW91dCBleHRlbmRzIENhY2hlTWl4aW4oUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgZ2V0IHNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInNjb3JlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NvcmUgb2YgdGhpcy5wcm9wcy5ydW4uc2NvcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uQ29uZmlybSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSh0aGlzLnNjb3JlLmlkKTtcbiAgICB9XG4gICAgb25TY29yZVVwZGF0ZSA9IChwYXJ0LCB2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhW3BhcnRdID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSh0aGlzLnNjb3JlLmlkLCBkYXRhKTtcbiAgICB9XG4gICAgZ2VuT25TY29yZVVwZGF0ZShzY29yZV9wYXJ0KSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLm9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCwgbmV3X3ZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgc2NvcmUgPSB0aGlzLnNjb3JlLmRhdGE7XG4gICAgICAgIGNvbnN0IGNsYXNzX25hbWUgPSB0aGlzLnNjb3JlLmNvbmZpcm1lZCA/IFwibGF5b3V0LXBhcnRpY2lwYW50IHJlYWQtb25seVwiIDogXCJsYXlvdXQtcGFydGljaXBhbnRcIjtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgY2xhc3NfbmFtZSB9PlxuICAgICAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQudGVjaF9qdWRnZS5qdW1wX3N0ZXBzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDxUYWJsZXRJbnRlZ2VySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgc2VuZERlbHRhc1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlLnJhd19kYXRhLmp1bXBfc3RlcHMgfVxuICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKFwianVtcF9zdGVwc1wiKSB9IC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LnRlY2hfanVkZ2UudGltaW5nXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDxTdG9wV2F0Y2ggc2NvcmVfaWQ9eyB0aGlzLnNjb3JlLmlkIH0gLz5cbiAgICAgICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzPXsgW1t0cnVlLCBcIlhcIl0sIFtudWxsLCBcIi1cIl0sIFtmYWxzZSwgXCJPS1wiXV0gfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlLnJhd19kYXRhLnRpbWluZ192aW9sYXRpb24gfVxuICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKFwidGltaW5nX3Zpb2xhdGlvblwiKSB9IC8+XG4gICAgICAgICAgICAgICAgPENvbmZpcm1hdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjb25maXJtZWQ9eyB0aGlzLnNjb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybT17IHRoaXMub25Db25maXJtIH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gXCJKdWRnZVRhYmxldC9HcmlkXCI7XG5cbmltcG9ydCBTY29yaW5nTGF5b3V0IGZyb20gXCIuL1Njb3JpbmdMYXlvdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFuY2luZ1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlclNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucnVucy5tYXAocnVuID0+XG4gICAgICAgICAgICA8U2NvcmluZ0xheW91dFxuICAgICAgICAgICAgICAgIGtleT17IHJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IGhlYXRzXCI+XG4gICAgICAgICAgICAgICAgPEdyaWQ+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXMoKSB9XG4gICAgICAgICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcblxuaW1wb3J0IENhY2hlTWl4aW4gZnJvbSBcImNvbW1vbi9DYWNoZU1peGluXCI7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSBcIkp1ZGdlVGFibGV0L0hlYWRlclwiO1xuaW1wb3J0IEZvb3RlciBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyXCI7XG5pbXBvcnQgRm9vdGVySXRlbSBmcm9tIFwiSnVkZ2VUYWJsZXQvRm9vdGVyL0Zvb3Rlckl0ZW1cIjtcblxuaW1wb3J0IERhbmNpbmdQYWdlIGZyb20gXCIuL0RhbmNpbmdQYWdlXCI7XG5pbXBvcnQgQWNyb1BhZ2UgZnJvbSBcIi4vQWNyb1BhZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZEp1ZGdlTGF5b3V0IGV4dGVuZHMgQ2FjaGVNaXhpbihSZWFjdC5Db21wb25lbnQpIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBoZWF0OiB0aGlzLmZpcnN0X25vbl9jb25maXJtZWRfaGVhdCxcbiAgICAgICAgICAgIHBhZ2U6IFwiZGFuY2luZ1wiLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRfcHJvcHMpIHtcbiAgICAgICAgaWYgKG5leHRfcHJvcHMudG91ci5pZCAhPT0gdGhpcy5wcm9wcy50b3VyLmlkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBoZWF0OiB0aGlzLmZpcnN0X25vbl9jb25maXJtZWRfaGVhdCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBoZWF0c19jb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJoZWF0c19jb3VudFwiLCAoKSA9PlxuICAgICAgICAgICAgTWF0aC5tYXgoLi4udGhpcy5wcm9wcy50b3VyLnJ1bnMubWFwKHJ1biA9PiBydW4uaGVhdCkpXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldCBydW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mZXRjaEZyb21DYWNoZShcInJ1bnNcIiwgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5ydW5zLmZpbHRlcihydW4gPT4gcnVuLmhlYXQgPT09IHRoaXMuc3RhdGUuaGVhdClcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZ2V0IGZpcnN0X25vbl9jb25maXJtZWRfaGVhdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hGcm9tQ2FjaGUoXCJmaXJzdF9ub25fY29uZmlybWVkX2hlYXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBydW4gb2YgdGhpcy5wcm9wcy50b3VyLnJ1bnMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNjb3JlIG9mIHJ1bi5zY29yZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQgPT09IHRoaXMucHJvcHMuZGlzY2lwbGluZUp1ZGdlLmlkICYmICFzY29yZS5jb25maXJtZWQgJiYgcnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bi5oZWF0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVhdHNfY291bnQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGVIZWF0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaGVhdDogdmFsdWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblByZXZIZWF0Q2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhdCh0aGlzLnN0YXRlLmhlYXQgLSAxKTtcbiAgICB9XG4gICAgb25OZXh0SGVhdENsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYXQodGhpcy5zdGF0ZS5oZWF0ICsgMSk7XG4gICAgfVxuICAgIG9uUGFnZUNoYW5nZSA9IChwYWdlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYWdlIH0pO1xuICAgIH1cbiAgICByZW5kZXJEYW5jaW5nKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERhbmNpbmdQYWdlXG4gICAgICAgICAgICAgICAgcnVucz17IHRoaXMucnVucyB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9IC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckFjcm8oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QWNyb1BhZ2VcbiAgICAgICAgICAgICAgICBydW5zPXsgdGhpcy5ydW5zIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lSnVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBjb25zdCBoZWF0c19jb3VudCA9IHRoaXMuaGVhdHNfY291bnQ7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgICAgICAganVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVKdWRnZS5qdWRnZSB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgaGVhdD17IHRoaXMuc3RhdGUuaGVhdCB9XG4gICAgICAgICAgICAgICAgaGVhdHNDb3VudD17IGhlYXRzX2NvdW50IH1cbiAgICAgICAgICAgICAgICBtYXhIZWF0PXsgaGVhdHNfY291bnQgfVxuICAgICAgICAgICAgICAgIG9uUHJldkhlYXRDbGljaz17IHRoaXMub25QcmV2SGVhdENsaWNrIH1cbiAgICAgICAgICAgICAgICBvbk5leHRIZWF0Q2xpY2s9eyB0aGlzLm9uTmV4dEhlYXRDbGljayB9IC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZS5wYWdlKSB7XG4gICAgICAgIGNhc2UgXCJkYW5jaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEYW5jaW5nKCk7XG4gICAgICAgIGNhc2UgXCJhY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3JvKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyRm9vdGVyKCkge1xuICAgICAgICBpZiAoW1wicm9zZmFyci5hY3JvXCIsIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCJdLmluZGV4T2YodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb290ZXIgdmFsdWU9eyB0aGlzLnN0YXRlLnBhZ2UgfSBvbkNoYW5nZT17IHRoaXMub25QYWdlQ2hhbmdlIH0+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmRhbmNpbmdcIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwiZGFuY2luZ1wiIC8+XG4gICAgICAgICAgICAgICAgPEZvb3Rlckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyBfKFwidGFibGV0LnBhZ2VzLmFjcm9cIikgfVxuICAgICAgICAgICAgICAgICAgICBta2V5PVwiYWNyb1wiIC8+XG4gICAgICAgICAgICA8L0Zvb3Rlcj5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJqdWRnZS10YWJsZXRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJCb2R5KCkgfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJGb290ZXIoKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgZ2V0U2NvcmluZ1R5cGUgZnJvbSBcImNvbW1vbi9nZXRTY29yaW5nVHlwZVwiO1xyXG5cclxuaW1wb3J0IEFjcm9iYXRpY3NMYXlvdXQgZnJvbSBcIi4vQWNyb2JhdGljc0xheW91dFwiO1xyXG5pbXBvcnQgRGFuY2VMYXlvdXQgZnJvbSBcIi4vRGFuY2VMYXlvdXRcIjtcclxuaW1wb3J0IERhbmNlSGFsdmVkTGF5b3V0IGZyb20gXCIuL0RhbmNlSGFsdmVkTGF5b3V0XCI7XHJcbmltcG9ydCBGb3JtYXRpb25MYXlvdXQgZnJvbSBcIi4vRm9ybWF0aW9uTGF5b3V0XCI7XHJcbmltcG9ydCBGb3JtYXRpb25BY3JvTGF5b3V0IGZyb20gXCIuL0Zvcm1hdGlvbkFjcm9MYXlvdXRcIjtcclxuaW1wb3J0IFNpbXBsaWZpZWRMYXlvdXQgZnJvbSBcIi4vU2ltcGxpZmllZExheW91dFwiO1xyXG5pbXBvcnQgSGVhZEp1ZGdlTGF5b3V0IGZyb20gXCIuL0hlYWRKdWRnZUxheW91dFwiO1xyXG5pbXBvcnQgVGVjaEp1ZGdlTGF5b3V0IGZyb20gXCIuL1RlY2hKdWRnZUxheW91dFwiO1xyXG5cclxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp1ZGdlVGFibGV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBMQVlPVVRTID0ge1xyXG4gICAgICAgIFwiYWNyb1wiOiBBY3JvYmF0aWNzTGF5b3V0LFxyXG4gICAgICAgIFwiZGFuY2VcIjogRGFuY2VMYXlvdXQsXHJcbiAgICAgICAgXCJkYW5jZV9oYWx2ZWRcIjogRGFuY2VIYWx2ZWRMYXlvdXQsXHJcbiAgICAgICAgXCJmb3JtYXRpb25cIjogRm9ybWF0aW9uTGF5b3V0LFxyXG4gICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogRm9ybWF0aW9uQWNyb0xheW91dCxcclxuICAgICAgICBcInNpbXBsaWZpZWRcIjogU2ltcGxpZmllZExheW91dCxcclxuICAgICAgICBcImhlYWRcIjogSGVhZEp1ZGdlTGF5b3V0LFxyXG4gICAgICAgIFwidGVjaFwiOiBUZWNoSnVkZ2VMYXlvdXQsXHJcbiAgICB9O1xyXG4gICAgb25TY29yZVVwZGF0ZSA9IChzY29yZV9pZCwgbmV3X3Njb3JlKSA9PiB7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIHNjb3JlX2RhdGE6IG5ld19zY29yZSxcclxuICAgICAgICAgICAgZm9yY2U6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgQXBpKFwic2NvcmUuc2V0XCIsIHsgc2NvcmVfaWQ6IHNjb3JlX2lkLCBkYXRhOiByZXF1ZXN0IH0pLnNlbmQoKTtcclxuICAgIH1cclxuICAgIG9uU2NvcmVDb25maXJtID0gKHNjb3JlX2lkKSA9PiB7XHJcbiAgICAgICAgQXBpKFwic2NvcmUuY29uZmlybVwiLCB7IHNjb3JlX2lkOiBzY29yZV9pZCB9KS5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmluZ190eXBlID0gZ2V0U2NvcmluZ1R5cGUodGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UsIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lKTtcclxuICAgICAgICBsZXQgTGF5b3V0Q2xhc3MgPSBKdWRnZVRhYmxldC5MQVlPVVRTW3Njb3JpbmdfdHlwZV07XHJcbiAgICAgICAgaWYgKCFMYXlvdXRDbGFzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5Ob3QgaW1wbGVtZW50ZWQhPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxMYXlvdXRDbGFzc1xyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZUp1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lSnVkZ2UgfVxyXG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5vblNjb3JlVXBkYXRlIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5vblNjb3JlQ29uZmlybSB9IC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgZ2V0UGFydGljaXBhbnREaXNwbGF5IGZyb20gXCJjb21tb24vZ2V0UGFydGljaXBhbnREaXNwbGF5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3VyUmVzdWx0c1RhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZVxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZVxyXG4gICAgICAgICAgICAgICAgOiBcIjBcIlxyXG4gICAgICAgICAgICA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+O1xyXG4gICAgICAgIGxldCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMuaGFzX3RvdGFsX3Njb3JlID9cclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkXHJcbiAgICAgICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57IHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD5cclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIHJldHVybiA8dHI+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8ucGxhY2UgfTwvcD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy02IG51bWJlclwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfTwvcD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0zMCBwYXJ0aWNpcGFudFwiPnsgZ2V0UGFydGljaXBhbnREaXNwbGF5KHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50KSB9PC90ZD5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIj48cD57IHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9PC9wPjwvdGQ+XHJcbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5oYXNfdG90YWxfc2NvcmUgPyA8dGQgY2xhc3NOYW1lPVwidy0xOCBzY29yZVwiPnsgdG90YWxfc2NvcmUgfTwvdGQ+IDogbnVsbCB9XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBjYXJkIH08L3A+PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgVG91clNjb3Jlc1dyYXBwZXIgZnJvbSBcImNvbW1vbi9Ub3VyU2NvcmVzV3JhcHBlclwiO1xyXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHRzVGFibGUxIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKGhhc19uZXh0X3RvdXIsIHByZXZfcm93LCBuZXh0X3JvdywgcHJldl9ydW4sIG5leHRfcnVuLCBpZHgsIG5fY29scykge1xyXG4gICAgICAgIGxldCBwcmV2X3N0YXR1cyA9IHByZXZfcm93XHJcbiAgICAgICAgICAgID8gcHJldl9ydW4ucGVyZm9ybWVkXHJcbiAgICAgICAgICAgICAgICA/IHByZXZfcm93LmFkdmFuY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcclxuICAgICAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcclxuICAgICAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCJcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIGxldCBuZXh0X3N0YXR1cyA9IG5leHRfcnVuLnBlcmZvcm1lZFxyXG4gICAgICAgICAgICA/IG5leHRfcm93LmFkdmFuY2VzXHJcbiAgICAgICAgICAgICAgICA/IFwiYWR2YW5jZWRcIlxyXG4gICAgICAgICAgICAgICAgOiBcIm5vdF9hZHZhbmNlZFwiXHJcbiAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCI7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHByZXZfc3RhdHVzICE9PSBuZXh0X3N0YXR1c1xyXG4gICAgICAgICAgICA/IG5leHRfc3RhdHVzID09PSBcIm5vdF9wZXJmb3JtZWRcIlxyXG4gICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF8oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIikgfTwvcD5cclxuICAgICAgICAgICAgICAgIDogaGFzX25leHRfdG91clxyXG4gICAgICAgICAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X2FkdmFuY2VkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF8oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiKSB9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfYWR2YW5jZWRcIikgfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA6IG51bGxcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8dHIga2V5PXsgXCJOVFwiICsgaWR4IH0+PHRoIGNsYXNzTmFtZT1cImFkdmFuY2VzLWhlYWRlclwiIGNvbFNwYW49eyBuX2NvbHMgfT5cclxuICAgICAgICAgICAgeyByZXN1bHQgfVxyXG4gICAgICAgIDwvdGg+PC90cj5cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgdG91cl93cmFwcGVyID0gbmV3IFRvdXJTY29yZXNXcmFwcGVyKHRoaXMucHJvcHMudG91ciwgdGhpcy5wcm9wcy5yZXN1bHRzKTtcclxuICAgICAgICBsZXQgaGVhZF9qdWRnZV9zY29yZXMgPSB0b3VyX3dyYXBwZXIuZ2V0U2NvcmVzVGFibGVCeVJvbGVzKFwiaGVhZF9qdWRnZVwiKS5tYXAoKHJvdykgPT4gcm93WzBdKTtcclxuICAgICAgICBsZXQgcmVzdWx0c19pbmZvID0gdG91cl93cmFwcGVyLmdldFJlc3VsdHNJbmZvKCk7XHJcbiAgICAgICAgbGV0IHJ1bnMgPSB0b3VyX3dyYXBwZXIuZ2V0UnVucygpO1xyXG4gICAgICAgIGxldCBoYXNfbmV4dF90b3VyID0gdGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbDtcclxuICAgICAgICBsZXQgaGFzX3RvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25cIiAmJiB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI7XHJcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBydW5zLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgcm93cy5wdXNoKHRoaXMucmVuZGVyQWR2YW5jZXNIZWFkZXIoXHJcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeCAtIDFdLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeF0sXHJcbiAgICAgICAgICAgICAgICBydW5zW2lkeCAtIDFdLFxyXG4gICAgICAgICAgICAgICAgcnVuc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgaWR4LFxyXG4gICAgICAgICAgICAgICAgNSArIGhhc190b3RhbF9zY29yZVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgcm93cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZF9qdWRnZV9zY29yZT17IGhlYWRfanVkZ2Vfc2NvcmVzW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cclxuICAgICAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXI9eyBoYXNfbmV4dF90b3VyIH1cclxuICAgICAgICAgICAgICAgICAgICBoYXNfdG90YWxfc2NvcmU9eyBoYXNfdG90YWxfc2NvcmUgfSAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYnJpZWYtdGFibGVcIj5cclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy03IHBsYWNlXCI+PHA+eyBfKFwicmVzdWx0cy5sYWJlbHMucGxhY2VcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy02IG51bWJlclwiPjxwPnsgXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTMwIHBhcnRpY2lwYW50XCI+PHA+eyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJjbHViXCI+PHA+eyBfKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaGFzX3RvdGFsX3Njb3JlID8gPHRoIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj48cD57IF8oXCJyZXN1bHRzLmxhYmVscy50b3RhbF9zY29yZVwiKSB9PC9wPjwvdGg+IDogbnVsbCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBfKFwicmVzdWx0cy5sYWJlbHMuY2FyZFwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgeyByb3dzIH1cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uc1dpZHRocyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcykge1xyXG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDU1IC8gbl9qdWRnZXMpO1xyXG4gICAgICAgIHRoaXMudG90YWxfc2NvcmVfd2lkdGggPSAxNDtcclxuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gNjtcclxuICAgICAgICB0aGlzLm51bWJlcl93aWR0aCA9IDM7XHJcbiAgICAgICAgdGhpcy5uYW1lX3dpZHRoID0gMTAwIC0gdGhpcy5qdWRnZV93aWR0aCAqIG5fanVkZ2VzIC1cclxuICAgICAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCAtIHRoaXMucGxhY2Vfd2lkdGggLSB0aGlzLm51bWJlcl93aWR0aDtcclxuICAgIH1cclxuICAgIGdlblBsYWNlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuTnVtYmVyU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubnVtYmVyX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbk5hbWVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5uYW1lX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlblRvdGFsU2NvcmVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy50b3RhbF9zY29yZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZW5KdWRnZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmp1ZGdlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXyBmcm9tIFwibDEwblwiO1xyXG5cclxuaW1wb3J0IGdldFBhcnRpY2lwYW50RGlzcGxheSBmcm9tIFwiY29tbW9uL2dldFBhcnRpY2lwYW50RGlzcGxheVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcclxuICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj48c3Ryb25nPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvc3Ryb25nPiAoeyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMSkgfSk8L3A+XHJcbiAgICB9XHJcbiAgICByZW5kZXJTY29yZShqdWRnZSwgc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xyXG4gICAgICAgIGlmIChqdWRnZS5yb2xlID09PSBcImRhbmNlX2p1ZGdlXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIgfHwgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH08L3A+O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBqdWRnZXNfc2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PiA8dGQga2V5PXsgaWR4IH0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTY29yZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2VzW2lkeF0sIHNjb3JlLCB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5hZGRpdGlvbmFsX2RhdGEpXHJcbiAgICAgICAgfSA8L3RkPik7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cclxuICAgICAgICAgICAgICAgIDx0ZCBrZXk9eyBpZHggfT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPiZtZGFzaDs8L3A+PC90ZD4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdG90YWxfc2NvcmUgPSB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlO1xyXG4gICAgICAgIHJldHVybiA8dHI+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5wbGFjZSB9PC9wPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJudW1iZXJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH08L3A+PC90ZD5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCI+eyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQpIH08L3RkPlxyXG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIgJiYgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXHJcbiAgICAgICAgICAgICAgICA/IDx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPiZtZGFzaDs8L3A+O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcF9zY29yZSA9IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc19zY29yZSA9IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYCR7XyhcInJlc3VsdHMubGFiZWxzLmZ3X3Njb3JlX3Nob3J0XCIpIH06ICR7cF9zY29yZX0gLyAke3Nfc2NvcmV9YCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+eyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfTwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwOy97XCIgXCJ9eyB0b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD47XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKSB9XHJcbiAgICAgICAgICAgICAgICA8L3RkPiA6IG51bGwgfVxyXG4gICAgICAgICAgICB7IGp1ZGdlc19zY29yZXMgfVxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5oZWFkX2p1ZGdlX3Njb3JlICYmIHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxyXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5oZWFkX2p1ZGdlX3Njb3JlLmRhdGEudG90YWxfc2NvcmVcclxuICAgICAgICAgICAgICAgICAgICA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+XHJcbiAgICAgICAgICAgIH08L3A+PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgUm93IGZyb20gXCIuL1Jvd1wiO1xyXG5pbXBvcnQgQ29sdW1uc1dpZHRocyBmcm9tIFwiLi9Db2x1bW5zV2lkdGhzXCI7XHJcblxyXG5pbXBvcnQgVG91clNjb3Jlc1dyYXBwZXIgZnJvbSBcImNvbW1vbi9Ub3VyU2NvcmVzV3JhcHBlclwiO1xyXG5pbXBvcnQgZ2V0U2NvcmluZ1R5cGUgZnJvbSBcImNvbW1vbi9nZXRTY29yaW5nVHlwZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0c1RhYmxlMiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJBZHZhbmNlc0hlYWRlcihoYXNfbmV4dF90b3VyLCBwcmV2X3JvdywgbmV4dF9yb3csIHByZXZfcnVuLCBuZXh0X3J1biwgaWR4LCBuX2NvbHMpIHtcclxuICAgICAgICBsZXQgcHJldl9zdGF0dXMgPSBwcmV2X3Jvd1xyXG4gICAgICAgICAgICA/IHByZXZfcnVuLnBlcmZvcm1lZFxyXG4gICAgICAgICAgICAgICAgPyBwcmV2X3Jvdy5hZHZhbmNlc1xyXG4gICAgICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgOiBcIm5vdF9hZHZhbmNlZFwiXHJcbiAgICAgICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICBsZXQgbmV4dF9zdGF0dXMgPSBuZXh0X3J1bi5wZXJmb3JtZWRcclxuICAgICAgICAgICAgPyBuZXh0X3Jvdy5hZHZhbmNlc1xyXG4gICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcclxuICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxyXG4gICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBwcmV2X3N0YXR1cyAhPT0gbmV4dF9zdGF0dXNcclxuICAgICAgICAgICAgPyBuZXh0X3N0YXR1cyA9PT0gXCJub3RfcGVyZm9ybWVkXCJcclxuICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCIpIH08L3A+XHJcbiAgICAgICAgICAgICAgICA6IGhhc19uZXh0X3RvdXJcclxuICAgICAgICAgICAgICAgICAgICA/IG5leHRfc3RhdHVzID09PSBcIm5vdF9hZHZhbmNlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIikgfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF8oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX2FkdmFuY2VkXCIpIH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiTlRcIiArIGlkeCB9Pjx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XHJcbiAgICAgICAgICAgIHsgcmVzdWx0IH1cclxuICAgICAgICA8L3RoPjwvdHI+XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XHJcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VzID0gdG91cl93cmFwcGVyLmdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xyXG4gICAgICAgIGxldCBzY29yZXNfdGFibGUgPSB0b3VyX3dyYXBwZXIuZ2V0U2NvcmVzVGFibGVCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xyXG4gICAgICAgIGxldCBoZWFkX2p1ZGdlX3Njb3JlcyA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJoZWFkX2p1ZGdlXCIpLm1hcCgocm93KSA9PiByb3dbMF0pO1xyXG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcclxuICAgICAgICBsZXQgcnVucyA9IHRvdXJfd3JhcHBlci5nZXRSdW5zKCk7XHJcbiAgICAgICAgbGV0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xyXG4gICAgICAgIGxldCBoYXNfdG90YWxfc2NvcmUgPSB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiICYmIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjtcclxuICAgICAgICBsZXQgd2lkdGhzID0gbmV3IENvbHVtbnNXaWR0aHMoZGlzY2lwbGluZV9qdWRnZXMubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgbGV0IGp1ZGdlc19oZWFkZXIgPSBkaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZnVuY3Rpb24oZGopIHtcclxuICAgICAgICAgICAgbGV0IHN1ZmZpeCA9IGdldFNjb3JpbmdUeXBlKGRqLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPT09IFwiYWNyb1wiID8gXCIgKEEpXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17IGRqLmlkIH0gc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+PHA+eyBkai5qdWRnZS5udW1iZXIgKyBzdWZmaXggfTwvcD48L3RoPlxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBydW5zLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgcm93cy5wdXNoKHRoaXMucmVuZGVyQWR2YW5jZXNIZWFkZXIoXHJcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeCAtIDFdLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeF0sXHJcbiAgICAgICAgICAgICAgICBydW5zW2lkeCAtIDFdLFxyXG4gICAgICAgICAgICAgICAgcnVuc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgaWR4LFxyXG4gICAgICAgICAgICAgICAgNCArIGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCArIGhhc190b3RhbF9zY29yZVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgcm93cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgPFJvd1xyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZF9qdWRnZV9zY29yZT17IGhlYWRfanVkZ2Vfc2NvcmVzW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cclxuICAgICAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cclxuICAgICAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3Jlcz17IHNjb3Jlc190YWJsZVtpZHhdIH1cclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlcz17IGRpc2NpcGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyPXsgaGFzX25leHRfdG91ciB9XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzX3RvdGFsX3Njb3JlPXsgaGFzX3RvdGFsX3Njb3JlIH0gLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PjxwPnsgXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwibnVtYmVyXCIgc3R5bGU9eyB3aWR0aHMuZ2VuTnVtYmVyU3R5bGUoKSB9PjxwPnsgXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuTmFtZVN0eWxlKCkgfT48cD57IF8oXCJyZXN1bHRzLmxhYmVscy5wYXJ0aWNpcGFudF9uYW1lXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICB7IGhhc190b3RhbF9zY29yZSA/IDx0aCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiIHN0eWxlPXsgd2lkdGhzLmdlblRvdGFsU2NvcmVTdHlsZSgpIH0+PHA+eyBfKFwicmVzdWx0cy5sYWJlbHMudG90YWxfc2NvcmVcIikgfTwvcD48L3RoPiA6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsganVkZ2VzX2hlYWRlciB9XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17IHdpZHRocy5nZW5KdWRnZVN0eWxlKCkgfT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgeyByb3dzIH1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICA8L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbHVtbnNXaWR0aHMge1xyXG4gICAgY29uc3RydWN0b3Iobl9qdWRnZXMpIHtcclxuICAgICAgICB0aGlzLmp1ZGdlX3dpZHRoID0gTWF0aC5yb3VuZCg3MCAvIG5fanVkZ2VzKTtcclxuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gN1xyXG4gICAgICAgIHRoaXMuaW5mb193aWR0aCA9IDEwMCAtIHRoaXMuanVkZ2Vfd2lkdGggKiBuX2p1ZGdlcyAtIHRoaXMucGxhY2Vfd2lkdGg7XHJcbiAgICB9XHJcbiAgICBnZW5QbGFjZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBsYWNlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkluZm9TdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5pbmZvX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkp1ZGdlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBfIGZyb20gXCJsMTBuXCI7XHJcblxyXG5pbXBvcnQgZ2V0UGFydGljaXBhbnREaXNwbGF5IGZyb20gXCJjb21tb24vZ2V0UGFydGljaXBhbnREaXNwbGF5XCI7XHJcbmltcG9ydCBnZXRTY29yaW5nVHlwZSBmcm9tIFwiY29tbW9uL2dldFNjb3JpbmdUeXBlXCI7XHJcblxyXG5jbGFzcyBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBmb3JtYXRTY29yZShzY29yZSwgdGVtcGxhdGUpIHtcclxuICAgICAgICBpZiAoIXRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gXCIkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY29yZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4+Jm1kYXNoOzwvc3Bhbj5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoXCIkXCIsIHNjb3JlKS5yZXBsYWNlKFwiQFwiLCBzY29yZS50b0ZpeGVkKDEpKTtcclxuICAgIH1cclxuICAgIHJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuZGFuY2VfZmlncywgXCJAXCIpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmlcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5tXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyRm9ybWF0aW9uQWNyb1Njb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5hXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmFjcm9iYXRpY3MsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uZGZcIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuZGFuY2VfZmlncywgXCJAXCIpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmlcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uYm1cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuYmlnX21pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyRGFuY2VTY29yZShzY29yZSkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmZ3XCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmZ3X3dvbWFuLCBcIi0kJVwiKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5mbVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5md19tYW4sIFwiLSQlXCIpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLmNcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmNvbXBvc2l0aW9uKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfKFwicmVzdWx0cy5icmVha2Rvd24uYm1cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuYmlnX21pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbiAgICByZW5kZXJBY3JvU2NvcmUoc2NvcmUpIHtcclxuICAgICAgICBsZXQgYWNyb19zY29yZXMgPSBzY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnMubWFwKGZ1bmN0aW9uKHNjb3JlLCBpZHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBpZHggfT5cclxuICAgICAgICAgICAgICAgIDx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5hY3JvX25cIiwgaWR4ICsgMSkgfTo8L3A+PC90aD5cclxuICAgICAgICAgICAgICAgIDx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUsIFwiLSQlXCIpIH08L3A+PC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxyXG4gICAgICAgICAgICB7IGFjcm9fc2NvcmVzIH1cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF8oXCJyZXN1bHRzLmJyZWFrZG93bi5mZFwiKSAgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEubWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxuICAgIHJlbmRlclNjb3JlKGp1ZGdlLCBzY29yZSwgYWRkaXRpb2xhbF9kYXRhKSB7XHJcbiAgICAgICAgc3dpdGNoIChnZXRTY29yaW5nVHlwZShqdWRnZSwgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUpKSB7XHJcbiAgICAgICAgY2FzZSBcImRhbmNlXCI6XHJcbiAgICAgICAgY2FzZSBcImRhbmNlX2hhbHZlZFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEYW5jZVNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xyXG4gICAgICAgIGNhc2UgXCJhY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFjcm9TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKTtcclxuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xyXG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25fYWNyb1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25BY3JvU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMikgfTwvcD47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyUGFydGljaXBhbnRJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8cD48c3Ryb25nPnsgXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIixcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlcixcclxuICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoXHJcbiAgICAgICAgICAgICl9PC9zdHJvbmc+PC9wPlxyXG4gICAgICAgICAgICB7IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG4gICAgcmVuZGVySGVhZEp1ZGdlUGVuYWx0eSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfKFwicmVzdWx0cy5sYWJlbHMucGVuYWx0eVwiKSB9OiA8L3N0cm9uZz5cclxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZSA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+IH08L3A+XHJcbiAgICB9XHJcbiAgICByZW5kZXJBY3JvVGFibGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoYXNfYWNyb19vdmVycmlkZXMgPSBmYWxzZTtcclxuICAgICAgICBsZXQgcmVuZGVyX2Fjcm9fdGFibGUgPSB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmFjcm9cIiB8fFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIjtcclxuICAgICAgICBpZiAoIXJlbmRlcl9hY3JvX3RhYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLmZvckVhY2goZnVuY3Rpb24oYWNybykge1xyXG4gICAgICAgICAgICBpZiAoYWNyby5zY29yZSAhPT0gYWNyby5vcmlnaW5hbF9zY29yZSkge1xyXG4gICAgICAgICAgICAgICAgaGFzX2Fjcm9fb3ZlcnJpZGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFjcm9fY2VsbF93aWR0aCA9ICgxMDAgLyB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLmxlbmd0aCkgKyBcIiVcIjtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPHA+PHN0cm9uZz57IGhhc19hY3JvX292ZXJyaWRlcyA/IF8oXCJyZXN1bHRzLmxhYmVscy5hY3JvYmF0aWNzX3ZlcmJvc2VcIikgOiBfKFwicmVzdWx0cy5sYWJlbHMuYWNyb2JhdGljc1wiKSB9Ojwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImFjcm8tdGFibGVcIj48dGJvZHk+XHJcbiAgICAgICAgICAgICAgICA8dHI+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+IDx0ZCBrZXk9eyBpZHggfSBzdHlsZT17eyB3aWR0aDogYWNyb19jZWxsX3dpZHRoIH19PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5vcmlnaW5hbF9zY29yZS50b0ZpeGVkKDEpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3A+PC90ZD4pXHJcbiAgICAgICAgICAgICAgICB9PC90cj5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNfYWNyb19vdmVycmlkZXMgPyA8dHI+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PiA8dGQga2V5PXsgaWR4IH0gc3R5bGU9e3sgd2lkdGg6IGFjcm9fY2VsbF93aWR0aCB9fT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3JvLnNjb3JlLnRvRml4ZWQoMSkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+PC90ZD4pXHJcbiAgICAgICAgICAgICAgICAgICAgfTwvdHI+IDogbnVsbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbiAgICByZW5kZXJBbUNsYXNzRndTY29yZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgXyhcInJlc3VsdHMubGFiZWxzLmZ3X3Njb3JlXCIpIH08L3N0cm9uZz46IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSArIFwiIC8gXCIgK1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMilcclxuICAgICAgICB9IDwvcD5cclxuICAgIH1cclxuICAgIHJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfKFwicmVzdWx0cy5sYWJlbHMuYWNyb19zY29yZVwiKSB9PC9zdHJvbmc+OiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuY3VycmVudF90b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSArIFwiIC8gXCIgK1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLmN1cnJlbnRfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKVxyXG4gICAgICAgIH0gPC9wPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyVG90YWxTY29yZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH06IHsgdGhpcy5wcm9wcy5ydW4udG90YWxfc2NvcmUgfTwvc3Ryb25nPjwvcD47XHJcbiAgICB9XHJcbiAgICByZW5kZXJOb3RQZXJmb3JtZWRMYWJlbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPHA+PGVtPlxyXG4gICAgICAgICAgICB7IF8oXCJyZXN1bHRzLmxhYmVscy5ub3RfcGVyZm9ybWVkXCIpIH1cclxuICAgICAgICA8L2VtPjwvcD5cclxuICAgIH1cclxuICAgIHJlbmRlck5leHRUb3VyTGFiZWwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhhc19uZXh0X3RvdXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDxwPjxzdHJvbmc+eyBfKFwicmVzdWx0cy5sYWJlbHMubmV4dF90b3VyXCIpIH06IDwvc3Ryb25nPntcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8uYWR2YW5jZXMgPyBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIikgOiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKVxyXG4gICAgICAgIH08L3A+XHJcbiAgICB9XHJcbiAgICByZW5kZXJJbmZvQmxvY2soKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJpbmZvLWJsb2NrXCIgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5JbmZvU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydGljaXBhbnRJbmZvKCkgfVxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZEp1ZGdlUGVuYWx0eSgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjcm9UYWJsZSgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NGd1Njb3JlKCkgfVxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQW1DbGFzc0Fjcm9TY29yZSgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmUoKSB9XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb3RQZXJmb3JtZWRMYWJlbCgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5leHRUb3VyTGFiZWwoKSB9XHJcbiAgICAgICAgPC90ZD5cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cclxuICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9IHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmUodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlc1tpZHhdLCBzY29yZSwgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8uYWRkaXRpb25hbF9kYXRhKSB9XHJcbiAgICAgICAgICAgIDwvdGQ+KTtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICBqdWRnZXNfc2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PlxyXG4gICAgICAgICAgICAgICAgPHRkIHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0ga2V5PXsgaWR4IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPjwvdGQ+KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDx0cj5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5QbGFjZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5wbGFjZSB9PC9wPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySW5mb0Jsb2NrKCkgfVxyXG4gICAgICAgICAgICB7IGp1ZGdlc19zY29yZXMgfVxyXG4gICAgICAgIDwvdHI+XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSBcImwxMG5cIjtcclxuXHJcbmltcG9ydCBUb3VyU2NvcmVzV3JhcHBlciBmcm9tIFwiY29tbW9uL1RvdXJTY29yZXNXcmFwcGVyXCI7XHJcbmltcG9ydCBSb3cgZnJvbSBcIi4vUm93XCI7XHJcbmltcG9ydCBDb2x1bW5zV2lkdGhzIGZyb20gXCIuL0NvbHVtbnNXaWR0aHNcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XHJcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VzID0gdG91cl93cmFwcGVyLmdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xyXG4gICAgICAgIGxldCBzY29yZXNfdGFibGUgPSB0b3VyX3dyYXBwZXIuZ2V0U2NvcmVzVGFibGVCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xyXG4gICAgICAgIGxldCBoZWFkX2p1ZGdlX3Njb3JlcyA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJoZWFkX2p1ZGdlXCIpLm1hcCgocm93KSA9PiByb3dbMF0pO1xyXG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcclxuICAgICAgICBsZXQgcnVucyA9IHRvdXJfd3JhcHBlci5nZXRSdW5zKCk7XHJcbiAgICAgICAgbGV0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xyXG4gICAgICAgIGxldCByb3dzID0gW107XHJcbiAgICAgICAgbGV0IHdpZHRocyA9IG5ldyBDb2x1bW5zV2lkdGhzKGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaChcclxuICAgICAgICAgICAgICAgIDxSb3dcclxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBydW5zW2lkeF0uaWQgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRvdXI9eyB0aGlzLnByb3BzLnRvdXIgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bj17IHJ1bnNbaWR4XSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzPXsgc2NvcmVzX3RhYmxlW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRocz17IHdpZHRocyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZF9qdWRnZV9zY29yZT17IGhlYWRfanVkZ2Vfc2NvcmVzW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cclxuICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlcz17IGRpc2NpcGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyPXsgaGFzX25leHRfdG91ciB9IC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQganVkZ2VzX2hlYWRlciA9IGRpc2NpcGxpbmVfanVkZ2VzLm1hcChmdW5jdGlvbihkaikge1xyXG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17IGRqLmlkIH0gd2lkdGg9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+PHA+eyBkai5qdWRnZS5udW1iZXIgfTwvcD48L3RoPlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIiBzdHlsZT17eyB3aWR0aDogXCIxMDAlXCIgfX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGxhY2VcIiB3aWR0aD17IHdpZHRocy5nZW5QbGFjZVN0eWxlKCkgfT48cD57IF8oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgd2lkdGg9eyB3aWR0aHMuZ2VuSW5mb1N0eWxlKCkgfT48cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwicmVzdWx0cy5sYWJlbHMuaW5mb1wiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBqdWRnZXNfaGVhZGVyIH1cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgIHsgcm93cyB9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgIH1cclxufVxyXG4iLCJ2YXIgQ2FjaGVNaXhpbiA9IEJhc2UgPT4gY2xhc3MgZXh0ZW5kcyBCYXNlIHtcbiAgICByZXNldENhY2hlKCkge1xuICAgICAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlc2V0Q2FjaGUoKTtcbiAgICB9XG4gICAgZmV0Y2hGcm9tQ2FjaGUoa2V5LCBnZW5lcmF0b3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fY2FjaGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVtrZXldID0gZ2VuZXJhdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlW2tleV07XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FjaGVNaXhpbjtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1blNjb3Jlc1dyYXBwZXIge1xyXG4gICAgY29uc3RydWN0b3IocnVuLCBkaXNjaXBsaW5lX2p1ZGdlcykge1xyXG4gICAgICAgIHRoaXMucnVuID0gcnVuO1xyXG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXMgPSBkaXNjaXBsaW5lX2p1ZGdlcztcclxuICAgICAgICB0aGlzLnNjb3Jlc19ieV9kaXNjaXBsaW5lX2p1ZGdlX2lkID0ge31cclxuICAgICAgICBydW4uc2NvcmVzLmZvckVhY2goZnVuY3Rpb24oc2NvcmUpIHtcclxuICAgICAgICAgICAgbGV0IGRqX2lkID0gc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZDtcclxuICAgICAgICAgICAgdGhpcy5zY29yZXNfYnlfZGlzY2lwbGluZV9qdWRnZV9pZFtkal9pZF0gPSBzY29yZTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NvcmVzQnlKdWRnZUlkcyhkaXNjaXBsaW5lX2p1ZGdlX2lkcykge1xyXG4gICAgICAgIHJldHVybiBkaXNjaXBsaW5lX2p1ZGdlX2lkcy5tYXAoKChkal9pZCkgPT4gdGhpcy5zY29yZXNfYnlfZGlzY2lwbGluZV9qdWRnZV9pZFtkal9pZF0pLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBSdW5TY29yZXNXcmFwcGVyIGZyb20gXCIuL1J1blNjb3Jlc1dyYXBwZXJcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3VyU2NvcmVzV3JhcHBlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0b3VyLCByZXN1bHRzKSB7XHJcbiAgICAgICAgdGhpcy5ydW5fd3JhcHBlcnMgPSB0b3VyLnJ1bnMubWFwKChydW4pID0+IG5ldyBSdW5TY29yZXNXcmFwcGVyKHJ1biwgdG91ci5kaXNjaXBsaW5lX2p1ZGdlcykpO1xyXG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXMgPSB0b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXM7XHJcbiAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXMuZm9yRWFjaChmdW5jdGlvbihkaiwgaWR4KSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2RqLnJvbGVdIHx8IFtdO1xyXG4gICAgICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpZHg6IGlkeCxcclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2U6IGRqLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1tkai5yb2xlXSA9IGFycjtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGlmIChyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRzX2J5X3J1bl9pZHMgPSB7fTtcclxuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXMpID0+XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzX2J5X3J1bl9pZHNbcmVzLnJ1bl9pZF0gPSByZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bl93cmFwcGVycy5mb3JFYWNoKCh3KSA9PlxyXG4gICAgICAgICAgICAgICAgdy5yZXN1bHRzX2luZm8gPSByZXN1bHRzX2J5X3J1bl9pZHNbdy5ydW4uaWRdKTtcclxuICAgICAgICAgICAgdGhpcy5ydW5fd3JhcHBlcnMuc29ydCgoYSwgYikgPT4gYS5yZXN1bHRzX2luZm8ucGxhY2UgLSBiLnJlc3VsdHNfaW5mby5wbGFjZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0RGlzY2lwbGluZUp1ZGdlc0J5Um9sZXMoKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbYXJndW1lbnRzWzBdXVxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2FyZ3VtZW50c1swXV0ubWFwKChiKSA9PiBiLmRpc2NpcGxpbmVfanVkZ2UpXHJcbiAgICAgICAgICAgICAgICA6IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgcmVzID0gcmVzLmNvbmNhdCh0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2FyZ3VtZW50c1tpXV0gfHwgW10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMuc29ydCgoYSwgYikgPT4gYS5pZHggLSBiLmlkeCk7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5tYXAoKGIpID0+IGIuZGlzY2lwbGluZV9qdWRnZSk7XHJcbiAgICB9XHJcbiAgICBnZXRTY29yZXNUYWJsZUJ5Um9sZXMoKSB7XHJcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VfaWRzID0gdGhpcy5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyguLi5hcmd1bWVudHMpLm1hcCgoZGopID0+IGRqLmlkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5ydW5fd3JhcHBlcnMubWFwKCh3KSA9PiB3LmdldFNjb3Jlc0J5SnVkZ2VJZHMoZGlzY2lwbGluZV9qdWRnZV9pZHMpKTtcclxuICAgIH1cclxuICAgIGdldFJlc3VsdHNJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJ1bl93cmFwcGVycy5tYXAoKHcpID0+IHcucmVzdWx0c19pbmZvKTtcclxuICAgIH1cclxuICAgIGdldFJ1bnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuX3dyYXBwZXJzLm1hcCgodykgPT4gdy5ydW4pO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcnRpY2lwYW50RGlzcGxheShwYXJ0aWNpcGFudCkge1xyXG4gICAgaWYgKHBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIDxwPnsgcGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgfTwvcD47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFydGljaXBhbnQuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PiA8cCBrZXk9eyBpZHggfT57IHMubGFzdF9uYW1lICsgXCIgXCIgKyBzLmZpcnN0X25hbWUgfTwvcD4pO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjb3JpbmdUeXBlKGRpc2NpcGxpbmVfanVkZ2UsIHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcclxuICAgIHN3aXRjaCAoZGlzY2lwbGluZV9qdWRnZS5yb2xlKSB7XHJcbiAgICBjYXNlIFwiZGFuY2VfanVkZ2VcIjpcclxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5mb3JtYXRpb25cIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiZm9ybWF0aW9uXCI7XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiZm9ybWF0aW9uX2Fjcm9cIjtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5zaW1wbGlmaWVkXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcInNpbXBsaWZpZWRcIjtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9md1wiOlxyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiZGFuY2VfaGFsdmVkXCI7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIFwiZGFuY2VcIjtcclxuICAgICAgICB9XHJcbiAgICBjYXNlIFwiYWNyb19qdWRnZVwiOlxyXG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmFtX2ZpbmFsX2Z3XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlX2hhbHZlZFwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcImFjcm9cIjtcclxuICAgICAgICB9XHJcbiAgICBjYXNlIFwidGVjaF9qdWRnZVwiOlxyXG4gICAgICAgIHJldHVybiBcInRlY2hcIjtcclxuICAgIGNhc2UgXCJoZWFkX2p1ZGdlXCI6XHJcbiAgICAgICAgcmV0dXJuIFwiaGVhZFwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0cmFuc2xhdGVfcnUgZnJvbSBcIi4vcnVcIjtcclxuXHJcbnZhciBfID0gdHJhbnNsYXRlX3J1XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCBhcmcpIHtcclxuICAgIGZ1bmN0aW9uIGNob29zZUVuZGluZyhuLCBlMSwgZTIsIGU1KSB7XHJcbiAgICAgICAgbGV0IHggPSBuICUgMTAwO1xyXG4gICAgICAgIGlmIChNYXRoLmZsb29yKHggLyAxMCkgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA+PSA1IHx8IHggJSAxMCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlMjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgUEhSQVNFUyA9IHtcclxuICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gYNCQ0LrRgNC+0LHQsNGC0LjQutCwICR7biArIDF9YCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2VfZmlnc1wiOiBcItCi0LDQvdGG0LXQstCw0LvRjNC90YvQtSDRhNC40LPRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2VfdGVjaFwiOiBcItCi0LXRhdC90LjQutCwINGC0LDQvdGG0LXQstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX21pc3Rha2VzXCI6IFwi0J7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybV9zbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3X21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3X3dvbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGA0YjQsCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwicG9pbnRzXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInNtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTUpXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWluZ1wiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX251bWJlclwiOiAobikgPT4gYNCh0YPQtNGM0Y8g4oSWJHtufWAsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRfbnVtYmVyXCI6IChuLCB0KSA9PiBg0JfQsNGF0L7QtCAke259INC40LcgJHt0fWAsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtZWRcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJrX25vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2FyZF9ub3RfcGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcclxuICAgICAgICAgICAgICAgIFwicGVuYWx0eV90eXBlXCI6IFwi0KjRgtGA0LDRhNC90YvQtSDRgdCw0L3QutGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcclxuICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF90b19uXCI6IChuKSA9PiBcItCh0LHRgNC+0YEg0L3QsCBcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uc1wiOiBcItCU0LXQudGB0YLQstC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2luZ1wiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImJyZWFrZG93blwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFcIjogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjXCI6IFwi0JpcIixcclxuICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXHJcbiAgICAgICAgICAgICAgICBcImZkXCI6IFwi0J9cIixcclxuICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcclxuICAgICAgICAgICAgICAgIFwiaVwiOiBcItCe0JJcIixcclxuICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICBcInNtXCI6IFwi0JzQnlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiOiBcItCd0LUg0L/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LvQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0LDQutGA0L5cIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NfdmVyYm9zZVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwICjQt9Cw0Y/QstC60LAv0YTQsNC60YIpXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhcmRcIjogXCLQqNGC0YDQsNGEXCIsXHJcbiAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgIFwiZndfc2NvcmVfc2hvcnRcIjogXCLQotCdXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQo9GH0LDRgdGC0L3QuNC6LCDRgNC10LfRg9C70YzRgtCw0YJcIixcclxuICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQv9GA0LjQvdC40LzQsNC7INGD0YfQsNGB0YLQuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItCc0LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQmNGC0L7Qs1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIChuX3NwID4gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwi0KTQvtGA0LzQtdC50YjQvSDihJZcIiArIG4udG9TdHJpbmcoKSArIChuYW1lID8gXCI6IFwiICsgbmFtZSA6IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKG5fc3AgPT09IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQn9Cw0YDQsCDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcItCj0YfQsNGB0YLQvdC40Log4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSArIG4udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHBhdGggPSBzcmMuc3BsaXQoXCIuXCIpO1xyXG4gICAgbGV0IHBocmFzZV9wdHIgPSBQSFJBU0VTO1xyXG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBwYXRoKSB7XHJcbiAgICAgICAgcGhyYXNlX3B0ciA9IHBocmFzZV9wdHJbY2h1bmtdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGZpbmQgdHJhbnNsYXRpb24gZm9yIFwiICsgc3JjKTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGhyYXNlX3B0ciguLi5hcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwaHJhc2VfcHRyO1xyXG59XHJcbiIsImltcG9ydCBSZXN1bHRzVGFibGUxIGZyb20gXCJSZXN1bHRzVGFibGUxXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUyIGZyb20gXCJSZXN1bHRzVGFibGUyXCI7XHJcbmltcG9ydCBSZXN1bHRzVGFibGUzIGZyb20gXCJSZXN1bHRzVGFibGUzXCI7XHJcbmltcG9ydCBKdWRnZVRhYmxldCBmcm9tIFwiSnVkZ2VUYWJsZXRcIjtcclxuaW1wb3J0IEFkbWluU2NvcmVJbnB1dCBmcm9tIFwiQWRtaW5TY29yZUlucHV0XCI7XHJcblxyXG53aW5kb3cucmVnaXN0ZXJSdWxlc1NldChcIlJvc0ZBUlJcIiwge1xyXG4gICAgdG91cl9yZXN1bHRzX3RhYmxlXzE6IFJlc3VsdHNUYWJsZTEsXHJcbiAgICB0b3VyX3Jlc3VsdHNfdGFibGVfMjogUmVzdWx0c1RhYmxlMixcclxuICAgIHRvdXJfcmVzdWx0c190YWJsZV8zOiBSZXN1bHRzVGFibGUzLFxyXG4gICAganVkZ2VfdGFibGV0OiBKdWRnZVRhYmxldCxcclxuICAgIGFkbWluX3Njb3JlX2lucHV0OiBBZG1pblNjb3JlSW5wdXQsXHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgc2hvd0Vycm9yIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcblxyXG5jbGFzcyBBcGlJbXBsIHtcclxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IChtc2csIGNvZGUsIGFyZ3MpID0+IHNob3dFcnJvcihjb2RlID8gXyhjb2RlLCAuLi5hcmdzKSA6IG1zZyk7XHJcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gKC4uLmRhdGEpID0+IGNvbnNvbGUuZXJyb3IoXCJBUEkgZmFpbFwiLCAuLi5kYXRhKTtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG4gICAgb25Eb25lKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9kb25lID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvblN1Y2Nlc3MoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRXJyb3IoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvbkZhaWwoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFkZFRvREIobW9kZWxfdHlwZSwgbW9kZWxfaWQsIHN0PXN0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHN0LmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZW5kKCkge1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvYXBpXCIsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfZGIocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9zdWNjZXNzKHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZXJyb3IocmVzcG9uc2UubWVzc2FnZSwgcmVzcG9uc2UuY29kZSwgcmVzcG9uc2UuYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiY2xpZW50X2lkXCIsIHdpbmRvdy5jbGllbnRfaWQpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcIm1ldGhvZFwiLCB0aGlzLm1ldGhvZCk7XHJcbiAgICAgICAgeGhyLnNlbmQoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgQXBpID0gKC4uLmFyZ3MpID0+IG5ldyBBcGlJbXBsKC4uLmFyZ3MpO1xyXG4iLCJpbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25fc3RhdHVzIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlRGlzcGF0Y2hlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNfY250ID0gMDtcclxuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIHdlYnNvY2tldC4uLlwiKTtcclxuICAgICAgICB0aGlzLndzID0gbmV3IFNvY2tKUyhcImh0dHA6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvd3NcIik7XHJcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0T2soKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQuXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbW1wicmVsb2FkX2RhdGFcIiwgbnVsbF1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbF91cGRhdGVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0RmFpbCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gY2xvc2VkLlwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY29ubmVjdC5iaW5kKHRoaXMpLCA1MDApO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbk1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhW1wiY2xpZW50X2lkXCJdKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGllbnRfaWQgPSBkYXRhW1wiY2xpZW50X2lkXCJdO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEubWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBtc2dfdHlwZSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIGxldCBtc2dfZGF0YSA9IGRhdGFbMV07XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge307XHJcbiAgICAgICAgICAgIGlmIChtc2dfdHlwZSA9PT0gXCJmb3JjZV9yZWZyZXNoXCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9KS5mb3JFYWNoKChrZXkpID0+IGxpc3RlbmVyc1trZXldKG1zZ19kYXRhKSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgZGF0YS5tb2RlbF91cGRhdGVzLmZvckVhY2goKG1vZGVsX2luZm8pID0+IHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gc3RvcmFnZS51cGRhdGVNb2RlbChtb2RlbF9pbmZvLm1vZGVsLCBtb2RlbF9pbmZvLmlkLCBtb2RlbF9pbmZvLmRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZGF0YV9jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tcImRiX3VwZGF0ZVwiXSB8fCB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldExpc3RlbmVySWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzX2NudCsrO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXIobXNnX3R5cGVzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuZ2V0TGlzdGVuZXJJZCgpO1xyXG4gICAgICAgIG1zZ190eXBlcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihtc2dfdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW21zZ190eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdW2lkXSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJfaWQpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW2tleV1bbGlzdGVuZXJfaWRdO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgbWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XHJcbiIsImNsYXNzIFJlZiB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lLCBpZCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5tb2RlbF9uYW1lKS5ieV9pZCh0aGlzLmlkKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgaWQsIG1vZGVsX3N0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fX3N0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXMgPSB7fTtcclxuICAgICAgICB0aGlzLl9fbW9kZWxfc3RvcmFnZSA9IG1vZGVsX3N0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGRCYWNrUmVmKGtleSwgcmVmKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gcmVmO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGRhdGEsIGNyZWF0ZT10cnVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkeCkpIHtcclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiIHx8IGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZSAmJiB0eXBlb2YgdGhpc1tpZHguc2xpY2UoMSldID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIHRoaXMuX19tb2RlbF9zdG9yYWdlLm1vZGVsX25hbWUsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmX2tleSA9IGRhdGFbaWR4XS5iYWNrX3JlZjtcclxuICAgICAgICAgICAgICAgIGRhdGFbaWR4XS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKG5lc3RlZF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YS5kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmLmdldCgpLmFkZEJhY2tSZWYoYmFja19yZWZfa2V5LCBiYWNrX3JlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldLnB1c2gocmVmKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIipcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRfZGF0YSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2lkeF0gPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2lkeF0gPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VyaWFsaXplKHNjaGVtYSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9fa2V5X3R5cGVzKSBpZiAodGhpcy5fX2tleV90eXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fX2tleV90eXBlc1trZXldKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLm1hcChmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZi5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJeXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5pZCA9IHRoaXMuaWRcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbHNTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMubW9kZWxzID0ge307XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZChpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbHNbaWRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXSA9IG5ldyBNb2RlbCh0aGlzLnN0b3JhZ2UsIGlkLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsc1tpZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBieV9pZChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpZF07XHJcbiAgICB9XHJcbiAgICBhbGwoKSB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1vZGVscyk7XHJcbiAgICAgICAgcmV0dXJuIGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNba2V5XTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlcyA9IHt9XHJcbiAgICAgICAgdGhpcy5kb21haW5zID0ge31cclxuICAgIH1cclxuICAgIGdldERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZG9tYWluc1tkb21haW5dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tYWluc1tkb21haW5dID0gbmV3IFN0b3JhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZGVsRG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGdldChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPSBuZXcgTW9kZWxzU3RvcmFnZSh0aGlzLCBtb2RlbF9uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICBkZWwobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTW9kZWwobW9kZWxfdHlwZSwgbW9kZWxfaWQsIGRhdGEpIHtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfdHlwZV0pIHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCBkYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZG9tYWlucykuZm9yRWFjaCgoa2V5KSA9PlxyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmRvbWFpbnNba2V5XS51cGRhdGVNb2RlbCguLi5hcmd1bWVudHMpIHx8IGRhdGFfY2hhbmdlZCk7XHJcbiAgICAgICAgLy8gcmV0dXJuIGRhdGFfY2hhbmdlZDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBzdHlsZT17eyBcImhlaWdodFwiOiBcIjEwMCVcIiwgXCJ3aWR0aFwiOiBcIjEwMCVcIiB9fT48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIiB9fT5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9pbWcvYWpheC1sb2FkZXIuZ2lmXCIgLz5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1c01vY2sge1xyXG4gICAgc2V0T2soKSB7fVxyXG4gICAgc2V0RmFpbCgpIHt9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgXCJjb25uZWN0ZWRcIjogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdGlvbl9zdGF0dXNcIik7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgJiYgIWVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICAgICAgICAgICAgICA8Q29ubmVjdGlvblN0YXR1cyAvPixcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uU3RhdHVzTW9jaygpO1xyXG4gICAgfVxyXG4gICAgc3RhcnRJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB0aWNrOiAhdGhpcy5zdGF0ZS50aWNrLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA3NTApO1xyXG4gICAgfVxyXG4gICAgc3RvcEludGVydmFsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldE9rKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3RlZDogdHJ1ZSwgdGljazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRGYWlsKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb25uZWN0aW9uLXN0YXR1cyBva1wiPjwvZGl2PlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgYWxlcnQtd2FybmluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5sYWJlbHMuY29ubmVjdGluZ1wiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiY29ubmVjdGlvbi1zdGF0dXMgYWxlcnQtZGFuZ2VyXCIgKyAodGhpcy5zdGF0ZS50aWNrID8gXCIgdGlja1wiIDogXCJcIikgfT5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3Rpb25fcHJvYmxlbVwiKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBjb25uZWN0aW9uX3N0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuaW5pdCgpO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImwxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcclxuICAgIGxldCB0aXRsZSA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1swXSA6IF8oXCJnbG9iYWwubWVzc2FnZXMuZXJyb3JfaGVhZGVyXCIpO1xyXG4gICAgbGV0IHRleHQgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMV0gOiBtc2c7XHJcbiAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICB0eXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XHJcbiAgICByZXR1cm4gc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIiksXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXHJcbiAgICAgICAgY2xvc2VPbkNvbmZpcm06IGNsb3NlX29uX2NvbmZpcm0sXHJcbiAgICB9LCBhY3Rpb24pO1xyXG59XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwibDEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaE9yQ2xpY2soaGFuZGxlcikge1xyXG4gICAgbGV0IGYgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVyKGV2ZW50KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uVG91Y2hTdGFydDogZixcclxuICAgICAgICBvbkNsaWNrOiBmLFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaEVuZE9yQ2xpY2soaGFuZGxlciwgcHJldmVudF9kZWZhdWx0KSB7XHJcbiAgICBsZXQgX2hhbmRsZXIgPSAoKSA9PiB7fTtcclxuICAgIGxldCBkaXN0YW5jZSA9IDA7XHJcbiAgICBsZXQgbGF0ZXN0X3BvcyA9IFswLCAwXTtcclxuICAgIGxldCBmaXJlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gX2hhbmRsZXIoKTtcclxuICAgIH1cclxuICAgIGxldCBkaXNjYXJkID0gKCkgPT4ge1xyXG4gICAgICAgIF9oYW5kbGVyID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBsZXQgbW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBjdXJyZW50X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcclxuICAgICAgICBsZXQgc3FyID0gKHgpID0+IHggKiB4O1xyXG4gICAgICAgIGRpc3RhbmNlICs9IE1hdGguc3FydChzcXIoY3VycmVudF9wb3NbMF0gLSBsYXRlc3RfcG9zWzBdKSArIHNxcihjdXJyZW50X3Bvc1sxXSAtIGxhdGVzdF9wb3NbMV0pKTtcclxuICAgICAgICBsYXRlc3RfcG9zID0gY3VycmVudF9wb3M7XHJcbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMjApIHtcclxuICAgICAgICAgICAgZGlzY2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBzdGFydCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcclxuICAgICAgICBkaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgbGF0ZXN0X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBzdGFydCxcclxuICAgICAgICBvblRvdWNoRW5kOiBmaXJlLFxyXG4gICAgICAgIG9uVG91Y2hNb3ZlOiBtb3ZlLFxyXG4gICAgICAgIG9uVG91Y2hDYW5jZWw6IGRpc2NhcmQsXHJcbiAgICAgICAgb25DbGljazogaGFuZGxlcixcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNsaWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb25lOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICAgICAgZG9uZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIHNsaWRlVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgb25BY3RpdmF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucGluID0gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmRvbmUgJiYgbmV4dFByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlzRnJlZSgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUudG91Y2ggJiYgIXRoaXMucHJvcHMuZG9uZSAmJiAhdGhpcy5zdGF0ZS5maW5pc2hlZDtcclxuICAgIH1cclxuICAgIGdldE91dGVyVGV4dE9wYWNpdHkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IE1hdGgubWluKE1hdGgubWF4KDEwMCAtIHRoaXMuc3RhdGUucG9zaXRpb24sIDApLCAxMDApO1xyXG4gICAgICAgIHJldHVybiAodmFsdWUgLyAxMDApLnRvRml4ZWQoMyk7XHJcbiAgICB9XHJcbiAgICBnZXRFbGVtZW50T2Zmc2V0KGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgcmVzID0gMDtcclxuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXMgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBnZXRUb3VjaChldmVudCkge1xyXG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XHJcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xyXG4gICAgfVxyXG4gICAgZ2V0UmVsYXRpdmVUb3VjaChldmVudCkge1xyXG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XHJcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcclxuICAgIH1cclxuICAgIGdldFNsaWRlclBvcyhldmVudCkge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmdldFRvdWNoKGV2ZW50KSAtIHRoaXMucGluO1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCAyMDApO1xyXG4gICAgfVxyXG4gICAgb25DbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwb3Npc2lvbjogMjAwLFxyXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gICAgb25Ub3VjaFN0YXJ0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBpbiA9IHRoaXMuZ2V0UmVsYXRpdmVUb3VjaChldmVudCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXHJcbiAgICAgICAgICAgIHRvdWNoOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb25Ub3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb25Ub3VjaEVuZCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucG9zaXRpb24gPT09IDIwMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyIG5vc2VsZWN0XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImlubmVyXCIgKyAodGhpcy5pc0ZyZWUoKSA/IFwiIGZyZWVcIiA6IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogKHRoaXMucHJvcHMuZG9uZSB8fCB0aGlzLnN0YXRlLmZpbmlzaGVkKSA/IFwiMjAwcHhcIiA6IHRoaXMuc3RhdGUucG9zaXRpb24gKyBcInB4XCIgfX1cclxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IHRoaXMub25Ub3VjaFN0YXJ0IH1cclxuICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsgdGhpcy5vblRvdWNoTW92ZSB9XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXsgdGhpcy5vblRvdWNoRW5kIH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLm9uQ2xpY2sgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICDihpJcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lXHJcbiAgICAgICAgICAgICAgICA/IDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiKDEwMCwxMDAsMTAwKVwiIH19XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJkb25lLXRleHRcIiB9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVUZXh0IH1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDogPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2JhKDEwMCwxMDAsMTAwLFwiICsgdGhpcy5nZXRPdXRlclRleHRPcGFjaXR5KCkgKyBcIilcIiB9fVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwic2xpZGUtdGV4dFwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKSB9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNsaWRlVGV4dCB9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRTZWxlY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBjaG9pY2VzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgcm93U2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICAgICAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXRCdXR0b25zQ291bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvd1NpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgb25DbGljayhuKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKG4pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnByb3BzLmNob2ljZXMuZm9yRWFjaCgoZWwsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gZWxbMF07XHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZWxbMV07XHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVfY2xhc3NfbmFtZSA9ICh0aGlzLnByb3BzLnZhbHVlID09PSBrZXkpID8gXCIgYWN0aXZlXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBrZXkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uQ2xpY2suYmluZCh0aGlzLCBrZXkpKX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInRidG4gc2NvcmUtYnRuXCIgKyBhY3RpdmVfY2xhc3NfbmFtZSB9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge3RleHR9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj4pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIgJiYgKGlkeCArIDEpICUgdGhpcy5wcm9wcy5yb3dTaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCg8YnIga2V5PXsgXCJiclwiICsgaWR4IH0gLz4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbGF5b3V0X2NsYXNzID0gKHRoaXMucHJvcHMuc3R5bGUgIT09IFwidHdvLWxpbmVzXCIpID8gXCJzZWxlY3Rvci1sYXlvdXRcIiA6IFwic2VsZWN0b3ItbGF5b3V0LTJyb3dzXCI7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkX2NsYXNzID0gdGhpcy5wcm9wcy52YWx1ZSA9PT0gbnVsbCA/IFwiXCIgOiBcIiBzZWxlY3RlZFwiXHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcInNjb3JpbmctbGF5b3V0IFwiICsgbGF5b3V0X2NsYXNzICsgc2VsZWN0ZWRfY2xhc3MgKyBcIiBuLVwiICsgdGhpcy5nZXRCdXR0b25zQ291bnQoKS50b1N0cmluZygpIH0+eyByZXN1bHQgfTwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlclNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gbWluOyBpZHggPD0gbWF4OyArK2lkeCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChbaWR4LCBpZHgudG9TdHJpbmcoKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cclxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1U2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjcmVhdGVBcnJheShtaW4sIG1heCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSBNYXRoLnJvdW5kKDIgKiBtaW4pOyBpZHggPD0gTWF0aC5yb3VuZCgyICogbWF4KTsgKytpZHgpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCAvIDIsIChpZHggJSAyKSA/IChpZHggLyAyKS50b0ZpeGVkKDEpIDogTWF0aC5mbG9vcihpZHggLyAyKS50b1N0cmluZygpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmNyZWF0ZUFycmF5KHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCkgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTWludXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTF9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uUGx1cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAxfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtaW50ZWdlci1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbk1pbnVzLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMuYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgK1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldEFjcm9PdmVycmlkZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9yaWdpbmFsX3ZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNlbmRfZGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VuZF9kZWx0YXM6IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTWludXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZF9kZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IC0wLjV9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoTWF0aC5tYXgodGhpcy5wcm9wcy52YWx1ZSAtIDAuNSwgMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uUGx1cyA9ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kX2RlbHRhcykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMC41fSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKE1hdGgubWluKHRoaXMucHJvcHMudmFsdWUgKyAwLjUsIHRoaXMucHJvcHMub3JpZ2luYWxfdmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblplcm8gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKDApO1xyXG4gICAgfVxyXG4gICAgb25SZXN0b3JlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLm9yaWdpbmFsX3ZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgdmFsdWVfY2hhbmdlZCA9IE1hdGguYWJzKHRoaXMucHJvcHMudmFsdWUgLSB0aGlzLnByb3BzLm9yaWdpbmFsX3ZhbHVlKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxldC1hY3JvLW92ZXJyaWRlLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXplcm9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMudmFsdWUgPCAwLjA1IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25aZXJvKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOKGkzBcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc3RvcmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHZhbHVlX2NoYW5nZWQgPCAwLjA1IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25SZXN0b3JlKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOKGkVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tbWludXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IHRoaXMucHJvcHMudmFsdWUgPCAwLjA1IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmbWludXM7XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyB0aGlzLnByb3BzLm9yaWdpbmFsX3ZhbHVlIDwgdGhpcy5wcm9wcy52YWx1ZSArIDAuMDUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMpfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgK1xyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZV9jaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7dGhpcy5wcm9wcy5vcmlnaW5hbF92YWx1ZS50b0ZpeGVkKDEpfSDihpIgJHt0aGlzLnByb3BzLnZhbHVlLnRvRml4ZWQoMSl9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMudmFsdWUudG9GaXhlZCgxKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG52YXIgc3RvcHdhdGNoZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9wV2F0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcmVfaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSB8fCB7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICBzdHJfdmFsdWU6IFwiMDowMFwiLFxyXG4gICAgICAgICAgICBpbnRlcnZhbDogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlyZWN0LW11dGF0aW9uLXN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcclxuICAgICAgICBzdG9wd2F0Y2hlc1t0aGlzLnByb3BzLnNjb3JlX2lkXSA9IHRoaXMuc3RhdGU7XHJcbiAgICB9XHJcbiAgICBub3coKSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcbiAgICB0b2dnbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmUgPyB0aGlzLnN0b3AoKSA6IHRoaXMuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIHN0YXJ0X2F0OiB0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS52YWx1ZSxcclxuICAgICAgICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCAxMCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFjdGl2ZVxyXG4gICAgICAgICAgICA/ICh0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS5zdGFydF9hdClcclxuICAgICAgICAgICAgOiB0aGlzLnN0YXRlLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGljaygpIHtcclxuICAgICAgICB2YXIgbmV3X3ZhbHVlID0gdGhpcy52YWx1ZSgpO1xyXG4gICAgICAgIGlmIChuZXdfdmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSgpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwYWQobnVtLCBzaXplKSB7XHJcbiAgICAgICAgdmFyIHMgPSBcIjAwMDBcIiArIG51bS50b1N0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBzLnN1YnN0cihzLmxlbmd0aCAtIHNpemUpO1xyXG4gICAgfVxyXG4gICAgZ2V0U3RyVmFsdWUoKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWUoKTtcclxuICAgICAgICB2YXIgbSA9IDAsIHMgPSAwO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgICAgICBtID0gTWF0aC5mbG9vcih2YWwgLyAoNjAgKiAxMDAwKSk7XHJcbiAgICAgICAgdmFsICU9IDYwICogMTAwMDtcclxuICAgICAgICBzID0gTWF0aC5mbG9vcih2YWwgLyAxMDAwKTtcclxuICAgICAgICByZXR1cm4gbS50b1N0cmluZygpICsgJzonICsgdGhpcy5wYWQocywgMik7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdG9wd2F0Y2hcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1yZXNldCBpZ25vcmUtcmVhZG9ubHlcIlxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnJlc2V0LmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnJlc2V0X3N0b3B3YXRjaFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcInRidG4gYnRuLXRvZ2dsZSBpZ25vcmUtcmVhZG9ubHlcIiArICh0aGlzLnN0YXRlLmFjdGl2ZSA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuYWN0aXZlID8gXyhcInRhYmxldC5idXR0b25zLnN0b3Bfc3RvcHdhdGNoXCIpIDogXyhcInRhYmxldC5idXR0b25zLnN0YXJ0X3N0b3B3YXRjaFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRTdHJWYWx1ZSgpIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuIl19
