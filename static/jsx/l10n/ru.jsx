function _(src, arg) {
    let PHRASES = {
        "admin": {
            "alerts": {
                "no_finalized": "Отсутствуют финализированные туры",
                "unfinalize_warning": [
                    <p><strong>Финализация должна отменяться только в исключительных случаях!</strong></p>,
                    <p>Если же это действительно необходимо, обратите внимание, что после повторной финализации список участников
                    следующего тура будет автоматически пересоздан. Результаты участников, прошедших в следующий тур после первой
                    финализации и не прошедших после повторной будут безвозвратно утеряны!</p>,
                    <p>И не забудьте заново напечатать все тблицы.</p>],
            },
            "buttons": {
                "add_participant": "Добавить участника",
                "add_tour": "Добавить тур",
                "import": "Импортировать",
                "refresh_clients": "Перезагрузить все устройства",
                "reload_clients": "Обновить данные на всех устройствах",
                "unfinalize": "Отменить финализацию",
            },
            "confirms": {
                "delete_judge": "Вы действительно хотите удалить этого судью?",
                "delete_tour": "Вы действительно хотите удалить этот тур?",
                "refresh_clients": "Вы действительно хотите перезагрузить страницу на всех клиентах?",
                "reload_clients": "Вы действительно хотите обновить данные на всех клиентах?",
                "unfinalize_tour": "Вы действительно хотите отменить финализацию тура? Введите «unfinalize», чтобы продолжить",
            },
            "headers": {
                "clients_management": "Управление подключенными устройствами",
                "inner_competition_general_info": "Основная информация",
                "inner_competition_tours": "Список туров",
                "judges_management": "Управление судьями",
                "load_competition": "Импорт данных соревнования",
                "participants_management": "Управление участниками",
                "service_menu": "Сервисное меню",
                "unfinalize_tour": "Отмена финализации тура",
            },
            "messages": {
                "invalid_passcode": "Введён неверный код потверждения",
            },
            "menu": {
                "add_inner_competition": "Создать категорию",
                "load_competition": "Импорт данных",
                "manage_inner_competitions": "Управление категориями",
                "manage_judges": "Управление судьями",
                "manage_sportsmen": "Управление спортсменами",
            },
            "prompts": {
                "new_inner_competition_name": "Введите название новой категории",
            },
        },
        "global": {
            "buttons": {
                "add": "Добавить",
                "edit": "Редактировать",
                "delete": "Удалить",
                "discard": "Отменить",
                "save": "Сохранить",
                "submit": "Сохранить",
            },
            "labels": {
                "yes": "Да",
                "no": "Нет",
            },
            "messages": {
                "api_error": "Ошибка на сервере (проверьте логи для информации)",
                "success": "Операция успешно завершена",
            },
            "phrases": {
                "judge_n": (n) => "Судья №" + n.toString(),
                "participant_n": (n, n_sp) => (n_sp == 2 ? "Пара №" : (n_sp > 2 ? "Формейшн №" : "Участник №")) + n.toString(),
            }
        },
        "judging": {
            "buttons": {
                "init_tour": "Пересоздать тур",
                "finalize_tour": "Финализировать",
                "shuffle_heats": "Перемешать заходы",
                "start_tour": "Начать тур",
                "stop_tour": "Остановить тур",
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "init_tour": "Вы действительно хотите пересоздать этот тур?",
                "shuffle_heats": "Вы действительно хотите перемешать заходы?",
            },
            "labels": {
                "club": "Клуб",
                "heat": "Заход",
                "number": "№",
                "participant_name": "Участник",
                "total_score": "Сумма баллов",
            },
        },
        "models": {
            "inner_competition": {
                "name": "Название категории",
                "external_id": "Внешний ID",
            },
            "judge": {
                "category": "Категория",
                "hide_from_results": "Скрыть в таблице",
                "name": "Ф. И. О.",
                "number": "Номер",
                "role": "Роль",
            },
            "participant": {
                "acro_description": "Описание трюка",
                "acro_score": "Оценка",
                "acrobatics": "Акробатика",
                "club_name": "Клуб",
                "club_city": "Город",
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
                "yob": "Г.р.",
            },
            "tour": {
                "name": "Название тура",
                "is_hope_tour": "Тур «Надежды»",
                "num_advances": "Квота выхода в следующий тур",
                "participants_per_heat": "Кол-во участников на площадке",
                "scoring_system": "Система судейства",
            },
        },
        "results": {
            "alerts": {
                "not_finalized": "Данные результаты не являются окончательными.",
            },
            "buttons": {
                "print": "Печать",
                "simple_view": "Упрощенная таблица",
                "verbose_view": "Подробная таблица",
            },
        },
        "start_page": {
            "headers": {
                "select_competition": "Выберите соревнование для продолжения",
                "select_role": "Выберите свою роль",
            },
            "roles": {
                "presenter": "Ведущий",
                "administrator": "Администратор",
            },
        },
        "tablet": {
            "headers": {
                "select_page": "Страница",
                "heat": "Заход",
            },
            "messages": {
                "not_judging": "Вы не оцениваете этого спортсмена",
            },
            "pages": {
                "dance": "Танец",
                "acrobatics": "Акробатика",
            },
        },

        "scoring_systems": {
            "rosfarr": {
                "tablet": {
                    "acro_judge": {
                        "fall_down": "Падения (-30)",
                    },
                    "dance_judge": {
                        "big_mistakes": "Серьёзные ошибки (-30)",
                        "composition": "Композиция",
                        "dance_figs": "Танцевальные фигуры",
                        "fw_man": "Техника ног, партнёр (сбавка в %)",
                        "fw_woman": "Техника ног, партнёрша (сбавка в %)",
                        "small_mistakes": "Ошибки (-5)",
                    },
                    "global": {
                        "total_score": "Сумма баллов",
                    },
                    "head_judge": {
                        "black_card": "-100 баллов",
                        "ok": "OK",
                        "penalty_type": "Штрафные санкции",
                        "red_card": "Красная карточка (-30)",
                        "yellow_card": "Жёлтая карточка (-5)",
                    },
                    "tech_judge": {
                        "jump_steps": "Основные ходы",
                        "reset_to_n": (n) => "Сброс на " + n.toString(),
                        "timing": "Длительность программы",
                    },
                },
                "results": {
                    "labels": {
                        "acrobatics": "Акробатика",
                        "next_tour": "След. тур",
                        "number": "№",
                        "participant_name": "Участник",
                        "place": "Место",
                        "total_score": "Сумма баллов",
                    },
                    "breakdown": {
                        "acro_n": (n) => "A" + n.toString(),
                        "bm": "СО",
                        "c": "К",
                        "df": "ТФ",
                        "fd": "П",
                        "fm": "ТНм",
                        "fw": "ТНж",
                        "sm": "Ош",
                        "t": "Σ",
                    },
                }
            }
        },

        "scoring_systems_names": {
            "rosfarr": {
                "acro": "РосФАРР, акробатические программы",
                "no_acro": "РосФАРР, танцевальные программы",
            }
        }
    }
    let path = src.split(".");
    let phrase_ptr = PHRASES;
    path.forEach((chunk) => phrase_ptr = phrase_ptr[chunk]);
    if (typeof phrase_ptr === "undefined") {
        console.error("Unable to find translation for " + src);
        return;
    }
    if (typeof phrase_ptr === "function") {
        let args = [];
        for (let idx = 1; idx < arguments.length; ++idx) {
            args.push(arguments[idx]);
        }
        return phrase_ptr(...args);
    }
    return phrase_ptr;
}

var _getPossibleTourNames = () => [
    "Отборочный тур",
    "Тур «Надежды»",
    "Финал",
    "1/2 финала",
    "1/4 финала",
    "1/8 финала",
    "1/16 финала",
];
