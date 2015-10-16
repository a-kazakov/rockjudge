"use strict";

function _(src, arg) {
    var PHRASES = {
        "admin": {
            "alerts": {
                "no_finalized": "Отсутствуют финализированные туры",
                "unfinalize_warning": [React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        "Финализация должна отменяться только в исключительных случаях!"
                    )
                ), React.createElement(
                    "p",
                    null,
                    "Если же это действительно необходимо, обратите внимание, что после повторной финализации список участников следующего тура будет автоматически пересоздан. Результаты участников, прошедших в следующий тур после первой финализации и не прошедших после повторной будут безвозвратно утеряны!"
                ), React.createElement(
                    "p",
                    null,
                    "И не забудьте заново напечатать все тблицы."
                )]
            },
            "buttons": {
                "add_participant": "Добавить участника",
                "add_tour": "Добавить тур",
                "import": "Импортировать",
                "refresh_clients": "Перезагрузить все устройства",
                "reload_clients": "Обновить данные на всех устройствах",
                "unfinalize": "Отменить финализацию"
            },
            "confirms": {
                "delete_judge": "Вы действительно хотите удалить этого судью?",
                "delete_participant": "Вы действительно хотите удалить этого участника?",
                "delete_tour": "Вы действительно хотите удалить этот тур?",
                "refresh_clients": "Вы действительно хотите перезагрузить страницу на всех клиентах?",
                "reload_clients": "Вы действительно хотите обновить данные на всех клиентах?",
                "unfinalize_tour": "Вы действительно хотите отменить финализацию тура? Введите «unfinalize», чтобы продолжить"
            },
            "headers": {
                "clients_management": "Управление подключенными устройствами",
                "clubs": "Клубы-участники",
                "competition_report": "Протокол соревнований",
                "competition_results": "Результаты соревнования",
                "inner_competition_general_info": "Основная информация",
                "inner_competition_tours": "Список туров",
                "judges": "Судейская бригада",
                "judges_management": "Управление судьями",
                "load_competition": "Импорт данных соревнования",
                "participants_management": "Управление участниками",
                "service_menu": "Сервисное меню",
                "unfinalize_tour": "Отмена финализации тура"
            },
            "labels": {
                "competition_name": "Наименование соревнования",
                "competition_data": "Дата проведения"
            },
            "messages": {
                "invalid_passcode": "Введён неверный код потверждения"
            },
            "menu": {
                "all_inner_competition_results": "Сводная по категории",
                "add_inner_competition": "Создать категорию",
                "competition_report": "Отчет о турнире",
                "load_competition": "Импорт данных",
                "manage_inner_competitions": "Управление категориями",
                "manage_judges": "Управление судьями",
                "manage_sportsmen": "Управление спортсменами"
            },
            "prompts": {
                "new_inner_competition_name": "Введите название новой категории"
            }
        },
        "global": {
            "buttons": {
                "add": "Добавить",
                "edit": "Редактировать",
                "delete": "Удалить",
                "discard": "Отменить",
                "save": "Сохранить",
                "submit": "Сохранить"
            },
            "labels": {
                "yes": "Да",
                "no": "Нет"
            },
            "messages": {
                "api_error": "Ошибка на сервере (проверьте логи для информации)",
                "success": "Операция успешно завершена"
            },
            "phrases": {
                "judge_n": function judge_n(n) {
                    return "Судья №" + n.toString();
                },
                "participant_n": function participant_n(n, n_sp) {
                    return (n_sp == 2 ? "Пара №" : n_sp > 2 ? "Формейшн №" : "Участник №") + n.toString();
                }
            }
        },
        "judging": {
            "buttons": {
                "init_tour": "Пересоздать тур",
                "finalize_tour": "Финализировать",
                "shuffle_heats": "Перемешать заходы",
                "start_tour": "Начать тур",
                "stop_tour": "Остановить тур"
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "init_tour": "Вы действительно хотите пересоздать этот тур?",
                "shuffle_heats": "Вы действительно хотите перемешать заходы?"
            },
            "labels": {
                "club": "Клуб",
                "heat": "Заход",
                "number": "№",
                "participant_name": "Участник",
                "total_score": "Сумма баллов"
            }
        },
        "models": {
            "inner_competition": {
                "name": "Название категории",
                "external_id": "Внешний ID"
            },
            "judge": {
                "category": "Категория",
                "name": "Ф. И. О.",
                "number": "Номер",
                "role": "Роль в судействе",
                "role_description": "Должность"
            },
            "participant": {
                "acro_description": "Описание трюка",
                "acro_score": "Оценка",
                "acrobatics": "Акробатика",
                "club_name": "Клуб",
                "club_city": "Город",
                "coaches": "Тренеры",
                "first_name": "Имя",
                "gender": "Пол",
                "gender_f": "Ж",
                "gender_m": "М",
                "general_info": "Основная информация",
                "formation_name": "Название команды формейшн",
                "last_name": "Фамилия",
                "name": "Участник",
                "number": "Номер",
                "sportsmen": "Спортсмены",
                "year_of_birth": "Год рождения",
                "yob": "Г.р."
            },
            "tour": {
                "name": "Название тура",
                "is_hope_tour": "Тур «Надежды»",
                "num_advances": "Квота выхода в следующий тур",
                "participants_per_heat": "Кол-во участников на площадке",
                "scoring_system": "Система судейства"
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
            "roles": {
                "presenter": "Ведущий",
                "administrator": "Администратор"
            }
        },
        "tablet": {
            "headers": {
                "select_page": "Страница",
                "heat": "Заход"
            },
            "messages": {
                "not_judging": "Вы не оцениваете этого спортсмена"
            },
            "pages": {
                "dance": "Танец",
                "acrobatics": "Акробатика"
            }
        },

        "scoring_systems": {
            "rosfarr": {
                "tablet": {
                    "acro_judge": {
                        "fall_down": "Падения (-30)"
                    },
                    "dance_judge": {
                        "big_mistakes": "Серьёзные ошибки (-30)",
                        "composition": "Композиция",
                        "dance_figs": "Танцевальные фигуры",
                        "dance_tech": "Техника танцевания",
                        "fw_man": "Техника ног, партнёр (сбавка в %)",
                        "fw_woman": "Техника ног, партнёрша (сбавка в %)",
                        "impression": "Общее впечатление",
                        "small_mistakes": "Ошибки (-5)"
                    },
                    "global": {
                        "total_score": "Сумма баллов"
                    },
                    "head_judge": {
                        "black_card": "-100 баллов",
                        "ok": "OK",
                        "penalty_type": "Штрафные санкции",
                        "red_card": "Красная карточка (-30)",
                        "yellow_card": "Жёлтая карточка (-3)"
                    },
                    "tech_judge": {
                        "jump_steps": "Основные ходы",
                        "reset_to_n": function reset_to_n(n) {
                            return "Сброс на " + n.toString();
                        },
                        "timing": "Длительность программы"
                    }
                },
                "results": {
                    "labels": {
                        "acrobatics": "Акробатика",
                        "next_tour": "След. тур",
                        "number": "№",
                        "participant_club": "Клуб",
                        "participant_coaches": "Тренеры",
                        "participant_name": "Участник",
                        "place": "Место",
                        "sportsmen": "Спортсмены",
                        "total_score": "Сумма баллов"
                    },
                    "breakdown": {
                        "acro_n": function acro_n(n) {
                            return "A" + n.toString();
                        },
                        "bm": "СО",
                        "c": "К",
                        "df": "ТФ",
                        "dt": "ТT",
                        "fd": "П",
                        "fm": "ТНм",
                        "fw": "ТНж",
                        "i": "ОВ",
                        "sm": "Ош",
                        "t": "Σ"
                    }
                }
            }
        },

        "scoring_systems_names": {
            "rosfarr": {
                "acro": "РосФАРР, акробатические программы",
                "formation": "РосФАРР, формейшн без акробатики",
                "no_acro": "РосФАРР, танцевальные программы"
            }
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

var _getPossibleTourNames = function _getPossibleTourNames() {
    return ["Финал", "Тур «Надежды»", "Отборочный тур", "1/2 финала", "1/4 финала", "1/8 финала", "1/16 финала"];
};
//# sourceMappingURL=ru.js.map