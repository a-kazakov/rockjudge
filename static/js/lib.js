(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

window.rockjudge = {
    api: _api.Api,
    storage: _storage.storage,
    message_dispatcher: _message_dispatcher.message_dispatcher
};

},{"server/api":4,"server/message_dispatcher":5,"server/storage":6}],4:[function(require,module,exports){
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

},{"i10n/loader":1,"server/storage":6,"ui/dialogs":8}],5:[function(require,module,exports){
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

},{"server/storage":6,"ui/components":7}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"i10n/loader":1}],8:[function(require,module,exports){
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

},{"i10n/loader":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcaTEwblxcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxpMTBuXFxydS5qc3giLCJzcmNcXGpzeFxcbGliLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXGFwaS5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxtZXNzYWdlX2Rpc3BhdGNoZXIuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcc3RvcmFnZS5qc3giLCJzcmNcXGpzeFxcdWlcXGNvbXBvbmVudHMuanN4Iiwic3JjXFxqc3hcXHVpXFxkaWFsb2dzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNFTyxJQUFJLDZCQUFKO0FBQ0EsSUFBSSxrQ0FBYSwrQkFBYjs7Ozs7O1FDSEs7QUFBVCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDaEMsYUFBUyxZQUFULENBQXNCLENBQXRCLEVBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLEVBQWlDLEVBQWpDLEVBQXFDO0FBQ2pDLFlBQUksSUFBSSxJQUFJLEdBQUosQ0FEeUI7QUFFakMsWUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFJLEVBQUosQ0FBWCxLQUF1QixDQUF2QixFQUEwQjtBQUMxQixtQkFBTyxFQUFQLENBRDBCO1NBQTlCO0FBR0EsWUFBSSxJQUFJLEVBQUosS0FBVyxDQUFYLEVBQWM7QUFDZCxtQkFBTyxFQUFQLENBRGM7U0FBbEI7QUFHQSxZQUFJLElBQUksRUFBSixJQUFVLENBQVYsSUFBZSxJQUFJLEVBQUosS0FBVyxDQUFYLEVBQWM7QUFDN0IsbUJBQU8sRUFBUCxDQUQ2QjtTQUFqQztBQUdBLGVBQU8sRUFBUCxDQVhpQztLQUFyQzs7QUFjQSxRQUFJLFVBQVU7QUFDVixpQkFBUztBQUNMLHNCQUFVO0FBQ04seUJBQVMsZUFBQyxPQUFELEVBQVUsSUFBVjsyQkFBbUI7OzBCQUFLLFdBQVUsT0FBVixFQUFMO3dCQUN4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QUpKLEVBSDJCO0NBQXhCOztBQVdBLFNBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QixNQUE5QixFQUE4RDtRQUF4Qix5RUFBaUIscUJBQU87O0FBQ2pFLFdBQU8sS0FBSztBQUNSLGVBQU8sT0FBUDtBQUNBLG1CQUFXLEtBQVg7QUFDQSwwQkFBa0IsSUFBbEI7QUFDQSwyQkFBbUIsZUFBRSxtQkFBRixDQUFuQjtBQUNBLDBCQUFrQixlQUFFLGtCQUFGLENBQWxCO0FBQ0Esd0JBQWdCLGdCQUFoQjtLQU5HLEVBT0osTUFQSSxDQUFQLENBRGlFO0NBQTlEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IHRyYW5zbGF0ZSwgZ2V0UG9zc2libGVUb3VyTmFtZXMgfSBmcm9tIFwiLi9ydVwiO1xuXG5leHBvcnQgdmFyIF8gPSB0cmFuc2xhdGU7XG5leHBvcnQgdmFyIHRvdXJfbmFtZXMgPSBnZXRQb3NzaWJsZVRvdXJOYW1lcygpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShzcmMsIGFyZykge1xyXG4gICAgZnVuY3Rpb24gY2hvb3NlRW5kaW5nKG4sIGUxLCBlMiwgZTUpIHtcclxuICAgICAgICBsZXQgeCA9IG4gJSAxMDA7XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID49IDUgfHwgeCAlIDEwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGUyO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBQSFJBU0VTID0ge1xyXG4gICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6ICh2ZXJzaW9uLCBkYXRlKSA9PiA8ZGl2IGNsYXNzTmFtZT1cImFib3V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PGI+Um9ja0p1ZGdlIHt2ZXJzaW9ufTwvYj4gKNC+0YIge2RhdGV9KSAmbWRhc2g7INGB0LjRgdGC0LXQvNCwINC00LvRjyDQv9C+0LTRgdGH0LXRgtCwINGA0LXQt9GD0LvRjNGC0LDRgtC+0LIg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INC/0L4g0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60L7QvNGDINGA0L7Qui3QvS3RgNC+0LvQu9GDLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QkNCy0YLQvtGA0YHQutC40LUg0L/RgNCw0LLQsCDQvdCwINGB0LjRgdGC0LXQvNGDIFJvY2tKdWRnZSDQv9C+0LvQvdC+0YHRgtGM0Y4g0L/RgNC40L3QsNC00LvQtdC20LDRgiDRgNCw0LfRgNCw0LHQvtGC0YfQuNC60YMg0JDRgNGC0LXQvNGDINCa0LDQt9Cw0LrQvtCy0YMuINCh0L7QsNCy0YLQvtGAINGB0LjRgdGC0LXQvNGLINCQ0L3RgtC+0L0g0JDQvNC10LvQuNC9LjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QodC40YHRgtC10LzQsCDRgNCw0YHQv9GA0L7RgdGC0YDQsNC90Y/QtdGC0YHRjyDQv9C+INC70LjRhtC10L3Qt9C40LggTGludW0gZC5vLm8gKGluZm9AbGludW0uaHIpLiDQlNC70Y8g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwIFJvY2tKdWRnZSDQvdC10L7QsdGF0L7QtNC40LzQviDQuCDQtNC+0YHRgtCw0YLQvtGH0L3QviDQuNC80LXRgtGMINC/0YDQsNCy0L4g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80YsgTGludW0gTFBTLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QntGE0LjRhtC40LDQu9GM0L3Ri9C5INGB0LDQudGCOiA8YSBocmVmPVwiaHR0cHM6Ly9yb2NranVkZ2UuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPmh0dHBzOi8vcm9ja2p1ZGdlLmNvbS88L2E+PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcHJvZ3JhbXNfYWZ0ZXJfY3JlYXRpb25cIjogXCLQn9GA0L7Qs9GA0LDQvNC80Ysg0LzQvtC20L3QviDQsdGD0LTQtdGCINC00L7QsdCw0LLQuNGC0Ywg0YLQvtC70YzQutC+INC/0L7RgdC70LUg0YHQvtGF0YDQsNC90LXQvdC40Y8g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQutC+0YDRgNC10LrRgtC90L4g0L3QsNGB0YLRgNC+0LXQvdCwINC4INC80L7QttC10YIg0LHRi9GC0Ywg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdCwLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfbm90X2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC90LXQtNC+0YHRgtGD0L/QvdCwINC90LAg0Y3RgtC+0Lwg0LrQvtC80L/RjNGC0LXRgNC1LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maW5hbGl6ZWRcIjogXCLQntGC0YHRg9GC0YHRgtCy0YPRjtGCINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfd2FybmluZ1wiOiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+0KTQuNC90LDQu9C40LfQsNGG0LjRjyDQtNC+0LvQttC90LAg0L7RgtC80LXQvdGP0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINC40YHQutC70Y7Rh9C40YLQtdC70YzQvdGL0YUg0YHQu9GD0YfQsNGP0YUhPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCV0YHQu9C4INC20LUg0Y3RgtC+INC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INC90LXQvtCx0YXQvtC00LjQvNC+LCDQvtCx0YDQsNGC0LjRgtC1INCy0L3QuNC80LDQvdC40LUsINGH0YLQviDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INGB0L/QuNGB0L7QuiDRg9GH0LDRgdGC0L3QuNC60L7QslxyXG4gICAgICAgICAgICAgICAgICAgINGB0LvQtdC00YPRjtGJ0LXQs9C+INGC0YPRgNCwINCx0YPQtNC10YIg0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60Lgg0L/QtdGA0LXRgdC+0LfQtNCw0L0uINCg0LXQt9GD0LvRjNGC0LDRgtGLINGD0YfQsNGB0YLQvdC40LrQvtCyLCDQv9GA0L7RiNC10LTRiNC40YUg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQv9C+0YHQu9C1INC/0LXRgNCy0L7QuVxyXG4gICAgICAgICAgICAgICAgICAgINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0Lgg0L3QtSDQv9GA0L7RiNC10LTRiNC40YUg0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0LHRg9C00YPRgiDQsdC10LfQstC+0LfQstGA0LDRgtC90L4g0YPRgtC10YDRj9C90YshPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCYINC90LUg0LfQsNCx0YPQtNGM0YLQtSDQt9Cw0L3QvtCy0L4g0L3QsNC/0LXRh9Cw0YLQsNGC0Ywg0LLRgdC1INGC0LHQu9C40YbRiy48L3A+PC9kaXY+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRgdC7LsKg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicHJpbnRfdGVzdF9wYWdlXCI6IFwi0J3QsNC/0LXRh9Cw0YLQsNGC0Ywg0YLQtdGB0YLQvtCy0YPRjiDRgdGC0YDQsNC90LjRhtGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlXCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlX2VtcHR5XCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/Rg9GB0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicnVsZXNcIjogXCLQl9Cw0LTQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfcGFnZVwiOiBcItCi0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3RleHRcIjogXCLQrdGC0L4g0YLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwIFJvY2tKdWRnZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfY2x1YlwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjogXCLQlNC+0LHQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9kaXNjaXBsaW5lXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3BhcnRpY2lwYW50XCI6IFwi0JTQvtCx0LDQstC40YLRjCDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3RvdXJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfbnVtYmVyc1wiOiBcItCd0L7QvNC10YDQsCDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0XCI6IFwi0K3QutGB0L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogXCLQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb1wiOiBcItCX0LDQs9GA0YPQt9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQn9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQstGB0LUg0YPRgdGC0YDQvtC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX3BsYW5cIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX2Rpc2NpcGxpbmVzXCI6IFwi0KHQvtGA0YLQuNGA0L7QutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmNvbmZpcm1fc2NvcmVcIjogXCLQntGC0LzQtdC90LAg0YTQuNC60YHQsNGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY2x1YlwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINC60LvRg9CxP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY29tcGV0aXRpb25cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L4g0YHQvtGA0LXQstC90L7QstCw0L3QuNC1P1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZGlzY2lwbGluZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQtNC40YHRhtC40L/Qu9C40L3Rgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2p1ZGdlXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRgdGD0LTRjNGOP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcGFydGljaXBhbnRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0L/RgNC+0LPRgNCw0LzQvNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0YHRgtGA0LDQvdC40YbRgyDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y4g0YLRg9GA0LA/INCS0LLQtdC00LjRgtC1IMKrdW5maW5hbGl6ZcK7LCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6IFwi0J4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsaWVudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC/0L7QtNC60LvRjtGH0LXQvdC90YvQvNC4INGD0YHRgtGA0L7QudGB0YLQstCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5fbWFuYWdlbWVudFwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3Nob3duXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0YLQvtC70YzQutC+INC/0L4g0YHQu9C10LTRg9GO0YnQuNC8INC00LjRgdGG0LjQv9C70LjQvdCw0Lw6XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydF9jb21wZXRpdGlvblwiOiBcItCt0LrRgdC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsCDQuCDRgNC10LfRg9C70YzRgtCw0YLQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9jb21wZXRpdGlvblwiOiBcItCY0LzQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc1wiOiBcItCh0YPQtNC10LnRgdC60LDRjyDQsdGA0LjQs9Cw0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb2JhdGljc1wiOiBcItCX0LDQs9GA0YPQt9C60LAg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRg9GH0LDRgdGC0L3QuNC60LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlcnZpY2VfbWVudVwiOiBcItCh0LXRgNCy0LjRgdC90L7QtSDQvNC10L3RjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5fbGlzdFwiOiBcItCh0L/QuNGB0L7QuiDRgdC/0L7RgNGC0YHQvNC10L3QvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQntGC0LzQtdC90LAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bnBpY2tlZF90b3Vyc1wiOiBcItCd0LUg0LLQutC70Y7Rh9C10L3RiyDQsiDQv9GA0L7Qs9GA0LDQvNC80YNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9kYXRlXCI6IFwi0JTQsNGC0LAg0L/RgNC+0LLQtdC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fbmFtZVwiOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Rpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmlsZXNfc2VsZWN0ZWRcIjogXCLQktGL0LHQtdGA0LjRgtC1INGE0LDQudC7Li4uXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3Nwb3J0c21lbl9vbmx5XCI6IFwi0J/QvtC60LDQt9GL0LLQsNGC0Ywg0YLQvtC70YzQutC+INGB0L/QvtGA0YLRgdC80LXQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwic2hvd19zdW1tYXJ5XCI6IFwi0J/QvtC60LDQt9GL0LLQsNGC0Ywg0YLQvtC70YzQutC+INC60L7Qu9C40YfQtdGB0YLQstC+XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YlwiOiBcItC30LDQv1wiLCAgLy8gc3Vic3RpdHV0ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9wYXNzY29kZVwiOiBcItCS0LLQtdC00ZHQvSDQvdC10LLQtdGA0L3Ri9C5INC60L7QtCDQv9C+0YLQstC10YDQttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZW51XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcmVwb3J0XCI6IFwi0J/RgNC+0YLQvtC60L7QuyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2V4cG9ydFwiOiBcItCY0LzQv9C+0YDRgiAvINGN0LrRgdC/0L7RgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jbHVic1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfZGlzY2lwbGluZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2p1ZGdlc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0YPQtNGM0Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9zcG9ydHNtZW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC/0L7RgNGC0YHQvNC10L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3RvdXJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YLRg9GA0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibl9wYXJ0aWNpcGFudHNcIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuXCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQv9Cw0YHQvSR7IGNob29zZUVuZGluZyhzLCBcItC+0LlcIiwgXCLRi9GFXCIsIFwi0YvRhVwiKSB9KWAgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5fc2hvcnRcIjogKG4sIHMpID0+IG4udG9TdHJpbmcoKSArIFwiINGB0L/QvtGA0YLRgdC80LXQvVwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpICsgKHMgPiAwID8gYCAoKyR7c30g0LfQsNC/LilgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX25fcGFydGljaXBhbnRzXCI6IG4gPT4gXCLQmNGC0L7Qs9C+IFwiICsgbiArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnaW5nLXRhYnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b3VyLWFkbWluXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0cy0zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmUtcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVycm9yc1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3N5bnRheF9lcnJvclwiOiBcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0LTQsNC90L3Ri9GFXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXBpXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZHVwbGljYXRlZF9leHRlcm5hbF9pZFwiOiBcItCSINC00LDQvdC90YvRhSDQuNC80LXRjtGC0YHRjyDQt9Cw0L/QuNGB0Lgg0YEg0L/QvtCy0YLQvtGA0Y/RjtGJ0LjQvNC40LzRgdGPIGV4dGVybmFsX2lkXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuYWJsZV90b19nZXRcIjogKHdhbnRlZCkgPT4gXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C+0LvRg9GH0LjRgtGMIFwiICsgd2FudGVkICsgXCIg0LjQtyDQt9Cw0L/RgNC+0YHQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQutC70YPQsSwg0Log0LrQvtGC0L7RgNC+0LzRgyDQv9GA0LjQstGP0LfQsNC90Ysg0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfbm9uX2VtcHR5XCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1LCDRgdC+0LTQtdGA0LbQsNGJ0LXQtSDQtNC40YHRhtC40L/Qu9C40L3Riywg0LrQu9GD0LHRiyDQuNC70Lgg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b29fbWFueV90b3Vyc1wiOiAoZCkgPT4gW1wi0J7RiNC40LHQutCwINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIiwgYNCSINC00LjRgdGG0LjQv9C70LjQvdC1ICR7ZH0g0YHQvtC00LXRgNC20LjRgtGB0Y8g0LHQvtC70YzRiNC1INGC0YPRgNC+0LIsINGH0LXQvCDRgdC+0LfQtNCw0L3QviDQsiDRgdC40YHRgtC10LzQtWBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNoYW5nZV9qdWRnZXNfd2l0aF9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHQvtGB0YLQsNCyINGB0YPQtNC10Lkg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLLCDRgdC+0LTQtdGA0LbQsNGJ0LXQuSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9wYXJ0aWNpcGFudHNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rgywg0YHQvtC00LXRgNC20LDRidGD0Y4g0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0YMg0LrQvtGA0L7Qs9C+INC10YHRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9zY29yZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXBlYXRpbmdfanVkZ2VcIjogKG5hbWUpID0+IG5hbWUgKyBcIiDQstGB0YLRgNC10YfQsNC10YLRgdGPINCyINGB0L/QuNGB0LrQtSDRgdGD0LTQtdC5INCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGA0LDQt9CwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYWxfc2VydmVyX2Vycm9yXCI6IFtcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1XCIsIFwi0L/RgNC+0LLQtdGA0YzRgtC1INC70L7Qs9C4INC00LvRjyDQuNC90YTQvtGA0LzQsNGG0LjQuFwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2Rpc2NpcGxpbmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiwg0LLRhdC+0LTRj9GJ0LXQs9C+INCyINGB0YPQtNC10LnRgdC60YPRjiDQsdGA0LjQs9Cw0LTRgyDRhdC+0YLRjyDQsdGLINC+0LTQvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsCwg0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0YXQvtGC0Y8g0LHRiyDQsiDQvtC00L3QvtC8INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJydW5cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZXRfcGVyZm9ybWVkX2ZsYWdfb25fZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdGC0LDRgtGD0YEg0LfQsNGF0L7QtNCwINGE0LjQvdCw0LvQuNC30LjQvdC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzY29yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNjb3JlX25vdF9leGlzdFwiOiBcItCf0L7Qv9GL0YLQutCwINC/0L7Qu9GD0YfQuNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC5INC+0YbQtdC90LrQuCDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9vbl9maW5hbGl6ZWRfdG91clwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0L7RhtC10L3QutGDINCyINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtC8INGC0YPRgNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9iZWZvcmVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LTQvtCx0LDQstC40YLRjCDQvdC+0LLRi9C5INGC0YPRgCDQv9C10YDQtdC0INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgtGD0YAsINC/0YDQuNGB0YPRgtGB0YLQstGD0Y7RidC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X2ZpbmFpbHplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfYWRkX2FmdGVyX2lkXCI6IFwi0J/QvtC/0YvRgtC60LAg0LTQvtCx0LDQuNGC0Ywg0YLRg9GAINCyINC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3RvX25vbl9lbXB0eVwiOiAoZCkgPT4gW1wi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNCz0YDRg9C30LjRgtGMINGC0YPRgNGLINC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLCBg0JTQuNGB0YbQuNC/0LvQuNC90LAgJHtkfSDRg9C20LUg0YHQvtC00LXRgNC20LjRgiDRgtGD0YDRi2BdLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2lzX2ZpbmFpbHplZFwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwibm9fbmV4dF90b3VyXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQv9C+0YHQu9C10LTQvdC40Lkg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L3QtSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfbm90X2ZpbmFpbHplZFwiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC5INGC0YPRgCDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LfQsNC/0YPRgdGC0LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfZmluYWxpemVkXCI6IFwi0JTQu9GPINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3QvtCz0L4g0YLRg9GA0LAg0L3QtSDQtNC+0L/Rg9GB0LrQsNC10YLRgdGPINC40LfQvNC10L3QtdC90LjQtSDQutCy0L7RgtGLINCy0YvQstC+0LTQsCwg0YLQuNC/0LAg0YLRg9GA0LAg0LjQu9C4INGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRcIjogXCLQlNC+0LHQsNCy0LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsb3NlXCI6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzZWxlY3RfYWxsXCI6IFwi0KHQvdGP0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwiZWRpdFwiOiBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZVwiOiBcItCj0LTQsNC70LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NhcmRcIjogXCLQntGC0LzQtdC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRcIjogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2F2ZVwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfYWxsXCI6IFwi0JLRi9Cx0YDQsNGC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Ym1pdFwiOiBcItCh0L7RhdGA0LDQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJyb3dzZVwiOiBcItCe0LHQt9C+0YAuLi5cIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGluZ1wiOiBcItCf0L7QtNC60LvRjtGH0LXQvdC40LUg0Log0YHQtdGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9wcm9ibGVtXCI6IFwi0J/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInllc1wiOiBcItCU0LBcIixcclxuICAgICAgICAgICAgICAgIFwibm9cIjogXCLQndC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fZXJyb3JcIjogXCLQn9C+0YXQvtC20LUsINC40LzQtdGO0YLRgdGPINC/0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlcnJvcl9oZWFkZXJcIjogXCLQntGI0LjQsdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiOiBcItCe0L/QtdGA0LDRhtC40Y8g0YPRgdC/0LXRiNC90L4g0LfQsNCy0LXRgNGI0LXQvdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYXRfblwiOiAobikgPT4gXCLQl9Cw0YXQvtC0IOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZV9uXCI6IChuKSA9PiBcItCb0LjQvdC10LnQvdGL0Lkg0YHRg9C00YzRjyDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfblwiOiAobiwgbmFtZSwgbl9zcCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAobl9zcCA+IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCk0L7RgNC80LXQudGI0L0g4oSWXCIgKyBuLnRvU3RyaW5nKCkgKyAobmFtZSA/IFwiOiBcIiArIG5hbWUgOiBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChuX3NwID09PSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwi0J/QsNGA0LAg4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCLQo9GH0LDRgdGC0L3QuNC6IOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKyBuLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdpbmdcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0J/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfYWNyb2JhdGljX292ZXJyaWRlXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0J/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3RvdXJcIjogXCLQndCw0YfQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCe0YHRgtCw0L3QvtCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0L/RgNC+0LPRgNCw0LzQvNGDINC00LvRjyDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRiz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LHQsNC30L7QstGL0YUg0L7RhtC10L3QvtC6INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2lkeFwiOiBcIuKEliDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybWVkXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibmV3X3Njb3JlXCI6IFwi0JrQvtGA0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgXCJvbGRfc2NvcmVcIjogXCLQkdCw0LfQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQklwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vZGVsc1wiOiB7XHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60LvRg9Cx0LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWN0aXZlXCI6IFwi0JDQutGC0LjQstC90L5cIixcclxuICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcItCU0LDRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQlNC+0L/QvtC70L3QuNGC0LXQu9GM0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPINC00LvRjyDQv9GA0L7RgtC+0LrQvtC70LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3RpdGxlXCI6IFwi0JfQsNCz0L7Qu9C+0LLQvtC6XCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV92YWx1ZVwiOiBcItCX0L3QsNGH0LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2JlZ2lubmluZ1wiOiBcItCd0LDRh9Cw0LvQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfZHVyYXRpb25cIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgICAgIFwidG91clwiOiBcItCi0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQkFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCJUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhVwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicm9sZXNfbGVnZW5kXCI6IChcclxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy0xMDBcIj48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCT0Lsg4oCUINCz0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y88L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCiIOKAlCDRgdGD0LTRjNGPINGC0LDQvdGG0LA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCQIOKAlCDRgdGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QomV4IOKAlCDRgtC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y88L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJqdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IFwi0JrQsNGC0LXQs9C+0YDQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvS4gSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCkLiDQmC4g0J4uXCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcItCg0L7Qu9GMINCyINGB0YPQtNC10LnRgdGC0LLQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlX2Rlc2NyaXB0aW9uXCI6IFwi0JTQvtC70LbQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25zXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCe0YbQtdC90LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9uYW1lXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1Yl9jaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9uYW1lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZmlyc3RfbmFtZVwiOiBcItCY0LzRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJcIjogXCLQn9C+0LtcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX2ZcIjogXCLQllwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfbVwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmVyYWxfaW5mb1wiOiBcItCe0YHQvdC+0LLQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX25hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1INC60L7QvNCw0L3QtNGLINGE0L7RgNC80LXQudGI0L1cIixcclxuICAgICAgICAgICAgICAgIFwibGFzdF9uYW1lXCI6IFwi0KTQsNC80LjQu9C40Y9cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcm9ncmFtc1wiOiBcItCf0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcG9ydHNtYW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L1cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV9uXCI6IFwi0J7RgdC9LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJzdGl0dXRlX3lcIjogXCLQl9Cw0L8uXCIsXHJcbiAgICAgICAgICAgICAgICBcInllYXJfb2ZfYmlydGhcIjogXCLQk9C+0LQg0YDQvtC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ5b2JcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9ncmFtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdF9mb3JcIjogXCLQn9C+INGD0LzQvtC70YfQsNC90LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0b3VyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdF9wcm9ncmFtXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaXNfaG9wZV90b3VyXCI6IFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1fYWR2YW5jZXNcIjogXCLQmtCy0L7RgtCwINCy0YvQstC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfcGVyX2hlYXRcIjogXCLQo9GH0LDRgdGC0L3QuNC60L7QsiDQsiDQt9Cw0YXQvtC00LVcIixcclxuICAgICAgICAgICAgICAgIFwic2NvcmluZ19zeXN0ZW1fbmFtZVwiOiBcItCh0LjRgdGC0LXQvNCwINGB0YPQtNC10LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzY3JlZW5fb3BlcmF0b3JcIjoge1xyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9oZWF0XCI6IFwi0KHQsdGA0L7RgSDQvdC+0LzQtdGA0LAg0LfQsNGF0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3BsYWNlXCI6IFwi0KHQsdGA0L7RgSDQvNC10YHRgtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFjZXNcIjogXCLQnNC10YHRgtCwINC00LvRjyDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwidG91clwiOiBcItCi0YPRgFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0LzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwcmVzZW50ZXJcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2FjdGl2ZV90b3VyXCI6IFwi0J3QtdGCINCw0LrRgtC40LLQvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2ZpbmFsaXplZFwiOiBcItCU0LDQvdC90YvQtSDRgNC10LfRg9C70YzRgtCw0YLRiyDQvdC1INGP0LLQu9GP0Y7RgtGB0Y8g0L7QutC+0L3Rh9Cw0YLQtdC70YzQvdGL0LzQuC5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicHJpbnRcIjogXCLQn9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxlX3ZpZXdcIjogXCLQo9C/0YDQvtGJ0LXQvdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2ZXJib3NlX3ZpZXdcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic3RhcnRfcGFnZVwiOiB7XHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9jb21wZXRpdGlvblwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1INC00LvRjyDQv9GA0L7QtNC+0LvQttC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9yb2xlXCI6IFwi0JLRi9Cx0LXRgNC40YLQtSDRgdCy0L7RjiDRgNC+0LvRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm9fY29tcGV0aXRpb25zXCI6IFwi0J3QtdGCINCw0LrRgtC40LLQvdGL0YUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50X2xpbmtcIjogKGxpbmspID0+IDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgINCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj9C80Lgg0L3QsNGF0L7QtNC40YLRgdGPINC/0L4g0LDQtNGA0LXRgdGDJm5ic3A7XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17IGxpbmsgfT57IGxpbmsgfTwvYT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZG1pbmlzdHJhdG9yXCI6IFwi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuXCI6IFwi0K3QutGA0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzY3JlZW5fb3BlcmF0b3JcIjogXCLQntC/0LXRgNCw0YLQvtGAINGN0LrRgNCw0L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImhhc191bmNvbmZpcm1lZF9zY29yZXNcIjogXCLQmNC80LXRjtGC0YHRjyDQvdC10LfQsNGE0LjQutGB0LjRgNC+0LLQsNC90L3Ri9C1INC+0YbQtdC90LrQuCDRgdGD0LTQtdC5INCyINC/0L7RgdC70LXQtNC90LXQvCDQt9Cw0YXQvtC00LUuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YNcIixcclxuICAgICAgICAgICAgICAgIFwibmV4dF9oZWF0XCI6IFwi0KHQu9C10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LXQstGL0YXQvtC0INC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwZXJmb3JtZWRcIjogXCLQntGC0LzQtdC90LAg0L3QtdCy0YvRhdC+0LTQsCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9oZWF0XCI6IFwi0J/RgNC10LQuINC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfc3RvcHdhdGNoXCI6IFwi0KHQsdGA0L7RgVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9zdG9wd2F0Y2hcIjogXCLQodGC0LDRgNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3Bfc3RvcHdhdGNoXCI6IFwi0KHRgtC+0L9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwIOKEllwiICsgKG4gKyAxKSxcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X3BhZ2VcIjogXCLQodGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19kaXNjaXBsaW5lXCI6IFwi0JLRiyDQvdC1INGD0YfQsNGB0YLQstGD0LXRgtC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDQtNCw0L3QvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfcGFydGljaXBhbnRcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfdG91clwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7RgiDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1pbmdcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogXCLQlNC10LnRgdGC0LLQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhbmNlXCI6IFwi0KLQsNC90LXRhlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcG9zaXRpb25cIjogXCLQmtC+0LzQv9C+0LfQuNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2ZpZ3NcIjogXCLQotCw0L3RhtC10LLQsNC70YzQvdGL0LUg0YTQuNCz0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfdGVjaFwiOiBcItCi0LXRhdC90LjQutCwINGC0LDQvdGG0LXQstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9mYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9taXN0YWtlc1wiOiBcItCe0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9zbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMylcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3dvbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGA0YjQsCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW1wcmVzc2lvblwiOiBcItCe0LHRidC10LUg0LLQv9C10YfQsNGC0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBvaW50c1wiOiBcItCe0YbQtdC90LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlX3Njb3Jlc1wiOiBcItCe0YbQtdC90LrQuCDQu9C40L3QtdC50L3Ri9GFINGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJva1wiOiBcIk9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVuYWx0eV90eXBlXCI6IFwi0KjRgtGA0LDRhNC90YvQtSDRgdCw0L3QutGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByZXZpb3VzX3BlbmFsdGllc1wiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC1INGI0YLRgNCw0YTRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZF9jYXJkXCI6IFwiLTMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1feWVsbG93X2NhcmRcIjogXCItNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fcmVkX2NhcmRcIjogXCItMTVcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianVtcF9zdGVwc1wiOiBcItCe0YHQvdC+0LLQvdGL0LUg0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXNldF90b19uXCI6IChuKSA9PiBcItCh0LHRgNC+0YEg0L3QsCBcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1pbmdcIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJicmVha2Rvd25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIjogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBcIkFcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibVwiOiBcItCR0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjXCI6IFwi0JpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZlwiOiBcItCi0KRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkdFwiOiBcItCiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZkXCI6IFwi0J9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmbVwiOiBcItCe0KXQvFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3XCI6IFwi0J7QpdC2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaVwiOiBcItCe0JJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtXCI6IFwi0J7RiFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBcIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtXCI6IFwi0JzQnlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRcIjogXCLOo1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfYWR2YW5jZWRcIjogXCLQn9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIjogXCLQndC1INC/0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LvQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0LDQutGA0L5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzX3ZlcmJvc2VcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCAo0LfQsNGP0LLQutCwL9GE0LDQutGCKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNhcmRcIjogXCLQqNGC0YDQsNGEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlX3Nob3J0XCI6IFwi0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQo9GH0LDRgdGC0L3QuNC6LCDRgNC10LfRg9C70YzRgtCw0YJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0X3RvdXJcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0L/RgNC40L3QuNC80LDQuyDRg9GH0LDRgdGC0LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NsdWJcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVuYWx0eVwiOiBcItCo0YLRgNCw0YQg0LPQu9Cw0LLQvdC+0LPQviDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQnNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0JjRgtC+0LNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNfbmFtZXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfZndcIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvblwiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INCx0LXQtyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INGBINCw0LrRgNC+0LHQsNGC0LjQutC+0LlcIixcclxuICAgICAgICAgICAgICAgIFwibm9fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRgtCw0L3RhtC10LLQsNC70YzQvdGL0LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsaWZpZWRcIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YPQv9GA0L7RidC10L3QvdCw0Y8g0YHQuNGB0YLQtdC80LAgKDHigJM0MClcIixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnZV9yb2xlc1wiOiB7XHJcbiAgICAgICAgICAgIFwiXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQodGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCLQodGD0LTRjNGPINGC0LDQvdGG0LBcIixcclxuICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIGxldCBwYXRoID0gc3JjLnNwbGl0KFwiLlwiKTtcclxuICAgIGxldCBwaHJhc2VfcHRyID0gUEhSQVNFUztcclxuICAgIHBhdGguZm9yRWFjaCgoY2h1bmspID0+IHBocmFzZV9wdHIgPSBwaHJhc2VfcHRyW2NodW5rXSk7XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGZpbmQgdHJhbnNsYXRpb24gZm9yIFwiICsgc3JjKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGxldCBhcmdzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpZHhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBocmFzZV9wdHIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGhyYXNlX3B0cjtcclxufVxyXG5cclxuZXhwb3J0IHZhciBnZXRQb3NzaWJsZVRvdXJOYW1lcyA9ICgpID0+IFtcclxuICAgIFwi0KTQuNC90LDQu1wiLFxyXG4gICAgXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICBcItCe0YLQsdC+0YDQvtGH0L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgXCIxLzIg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvNCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS84INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzE2INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgIFwi0KTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuXTtcclxuIiwiaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XG5cblxud2luZG93LnJvY2tqdWRnZSA9IHtcbiAgICBhcGk6IEFwaSxcbiAgICBzdG9yYWdlOiBzdG9yYWdlLFxuICAgIG1lc3NhZ2VfZGlzcGF0Y2hlcjogbWVzc2FnZV9kaXNwYXRjaGVyLFxufTtcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBzaG93RXJyb3IgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuXHJcbmNsYXNzIEFwaUltcGwge1xyXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gKG1zZywgY29kZSwgYXJncykgPT4gc2hvd0Vycm9yKGNvZGUgPyBfKGNvZGUsIC4uLmFyZ3MpIDogbXNnKTtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSAoLi4uZGF0YSkgPT4gY29uc29sZS5lcnJvcihcIkFQSSBmYWlsXCIsIC4uLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gKCkgPT4ge307XHJcbiAgICB9XHJcbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uU3VjY2VzcyhjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2Jfc3VjY2VzcyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgb25FcnJvcihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRmFpbChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuY2JfZmFpbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWRkVG9EQihtb2RlbF90eXBlLCBtb2RlbF9pZCwgc3Q9c3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2RiID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNlbmQoKSB7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYl9kb25lKCk7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJjbGllbnRfaWRcIiwgd2luZG93LmNsaWVudF9pZCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwibWV0aG9kXCIsIHRoaXMubWV0aG9kKTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XHJcbiIsImltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvbl9zdGF0dXMgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xyXG5cclxuXHJcbmNsYXNzIE1lc3NhZ2VEaXNwYXRjaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc19jbnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gICAgY29ubmVjdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RpbmcgdG8gd2Vic29ja2V0Li4uXCIpO1xyXG4gICAgICAgIHRoaXMud3MgPSBuZXcgU29ja0pTKFwiaHR0cDovL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi93c1wiKTtcclxuICAgICAgICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRPaygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZC5cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtbXCJyZWxvYWRfZGF0YVwiLCBudWxsXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsX3VwZGF0ZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uX3N0YXR1cy5zZXRGYWlsKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jb25uZWN0LmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGFbXCJjbGllbnRfaWRcIl0pIHtcclxuICAgICAgICAgICAgd2luZG93LmNsaWVudF9pZCA9IGRhdGFbXCJjbGllbnRfaWRcIl07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5tZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG1zZ190eXBlID0gZGF0YVswXTtcclxuICAgICAgICAgICAgbGV0IG1zZ19kYXRhID0gZGF0YVsxXTtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW21zZ190eXBlXSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKG1zZ190eXBlID09PSBcImZvcmNlX3JlZnJlc2hcIikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge30pLmZvckVhY2goKGtleSkgPT4gbGlzdGVuZXJzW2tleV0obXNnX2RhdGEpKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBkYXRhLm1vZGVsX3VwZGF0ZXMuZm9yRWFjaCgobW9kZWxfaW5mbykgPT4ge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSBzdG9yYWdlLnVwZGF0ZU1vZGVsKG1vZGVsX2luZm8ubW9kZWwsIG1vZGVsX2luZm8uaWQsIG1vZGVsX2luZm8uZGF0YSkgfHwgZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChkYXRhX2NoYW5nZWQpIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW1wiZGJfdXBkYXRlXCJdIHx8IHt9O1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0TGlzdGVuZXJJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnNfY250Kys7XHJcbiAgICB9XHJcbiAgICBhZGRMaXN0ZW5lcihtc2dfdHlwZXMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5nZXRMaXN0ZW5lcklkKCk7XHJcbiAgICAgICAgbXNnX3R5cGVzLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKG1zZ190eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV1baWRdID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcl9pZCkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMubGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNba2V5XVtsaXN0ZW5lcl9pZF07XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBtZXNzYWdlX2Rpc3BhdGNoZXIgPSBuZXcgTWVzc2FnZURpc3BhdGNoZXIoKTtcclxuIiwiY2xhc3MgUmVmIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLm1vZGVsX25hbWUpLmJ5X2lkKHRoaXMuaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBpZCwgbW9kZWxfc3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9fc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX19tb2RlbF9zdG9yYWdlID0gbW9kZWxfc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZEJhY2tSZWYoa2V5LCByZWYpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSByZWY7XHJcbiAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoZGF0YSwgY3JlYXRlPXRydWUpIHtcclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIgfHwgaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY3JlYXRlICYmIHR5cGVvZiB0aGlzW2lkeC5zbGljZSgxKV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBpZHguc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXVxyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgdGhpcy5fX21vZGVsX3N0b3JhZ2UubW9kZWxfbmFtZSwgdGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja19yZWZfa2V5ID0gZGF0YVtpZHhdLmJhY2tfcmVmO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpZHhdLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obmVzdGVkX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhLmRhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3N0b3JhZ2UuZ2V0KG5lc3RlZF9kYXRhLm1vZGVsKS5hZGQobmVzdGVkX2RhdGEuaWQsIG5lc3RlZF9kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWYuZ2V0KCkuYWRkQmFja1JlZihiYWNrX3JlZl9rZXksIGJhY2tfcmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChyZWYpO1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiKlwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lc3RlZF9kYXRhID0gZGF0YVtpZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbaWR4XSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNbaWR4XSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXJpYWxpemUoc2NoZW1hKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX19rZXlfdHlwZXMpIGlmICh0aGlzLl9fa2V5X3R5cGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9fa2V5X3R5cGVzW2tleV0pIHtcclxuICAgICAgICAgICAgY2FzZSBcIipcIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0ubWFwKGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIl5cIjpcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV0uZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LmlkID0gdGhpcy5pZFxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vZGVsc1N0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgfVxyXG4gICAgYWRkKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsc1tpZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdID0gbmV3IE1vZGVsKHRoaXMuc3RvcmFnZSwgaWQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxzW2lkXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGJ5X2lkKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2lkXTtcclxuICAgIH1cclxuICAgIGFsbCgpIHtcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubW9kZWxzKTtcclxuICAgICAgICByZXR1cm4ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1trZXldO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX3N0b3JhZ2VzID0ge31cclxuICAgICAgICB0aGlzLmRvbWFpbnMgPSB7fVxyXG4gICAgfVxyXG4gICAgZ2V0RG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kb21haW5zW2RvbWFpbl0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21haW5zW2RvbWFpbl0gPSBuZXcgU3RvcmFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5zW2RvbWFpbl07XHJcbiAgICB9XHJcbiAgICBkZWxEb21haW4oZG9tYWluKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZ2V0KG1vZGVsX25hbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9IG5ldyBNb2RlbHNTdG9yYWdlKHRoaXMsIG1vZGVsX25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcclxuICAgIH1cclxuICAgIGRlbChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICB1cGRhdGVNb2RlbChtb2RlbF90eXBlLCBtb2RlbF9pZCwgZGF0YSkge1xyXG4gICAgICAgIGxldCBkYXRhX2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF90eXBlXSkge1xyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIGRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5kb21haW5zKS5mb3JFYWNoKChrZXkpID0+XHJcbiAgICAgICAgICAgIGRhdGFfY2hhbmdlZCA9IHRoaXMuZG9tYWluc1trZXldLnVwZGF0ZU1vZGVsKC4uLmFyZ3VtZW50cykgfHwgZGF0YV9jaGFuZ2VkKTtcclxuICAgICAgICAvLyByZXR1cm4gZGF0YV9jaGFuZ2VkO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpXHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIHN0eWxlPXt7IFwiaGVpZ2h0XCI6IFwiMTAwJVwiLCBcIndpZHRoXCI6IFwiMTAwJVwiIH19Pjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBcInRleHRBbGlnblwiOiBcImNlbnRlclwiIH19PlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy9hamF4LWxvYWRlci5naWZcIiAvPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzTW9jayB7XHJcbiAgICBzZXRPaygpIHt9XHJcbiAgICBzZXRGYWlsKCkge31cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBcImNvbm5lY3RlZFwiOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0aW9uX3N0YXR1c1wiKTtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgPENvbm5lY3Rpb25TdGF0dXMgLz4sXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvblN0YXR1c01vY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0SW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGljazogIXRoaXMuc3RhdGUudGljayxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgIH1cclxuICAgIHN0b3BJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRPaygpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IHRydWUsIHRpY2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0RmFpbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgb2tcIj48L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3RpbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImNvbm5lY3Rpb24tc3RhdHVzIGFsZXJ0LWRhbmdlclwiICsgKHRoaXMuc3RhdGUudGljayA/IFwiIHRpY2tcIiA6IFwiXCIpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW9uX3Byb2JsZW1cIikgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgY29ubmVjdGlvbl9zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmluaXQoKTtcclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobXNnKSB7XG4gICAgbGV0IHRpdGxlID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzBdIDogXyhcImdsb2JhbC5tZXNzYWdlcy5lcnJvcl9oZWFkZXJcIik7XG4gICAgbGV0IHRleHQgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMV0gOiBtc2c7XG4gICAgc3dhbCh7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0NvbmZpcm0obWVzc2FnZSwgYWN0aW9uLCBjbG9zZV9vbl9jb25maXJtPWZhbHNlKSB7XG4gICAgcmV0dXJuIHN3YWwoe1xuICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMubm9cIiksXG4gICAgICAgIGNsb3NlT25Db25maXJtOiBjbG9zZV9vbl9jb25maXJtLFxuICAgIH0sIGFjdGlvbik7XG59XG4iXX0=
