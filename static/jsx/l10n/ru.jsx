function _(src, arg) {
    function chooseEnding(n, e1, e2, e5) {
        let x = n % 100;
        if (Math.floor(x / 10) == 1) {
            return e5;
        }
        if (x % 10 == 1) {
            return e1;
        }
        if (x % 10 >= 5 || x % 10 == 0) {
            return e5;
        }
        return e2;
    }

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
                "add_club": "Добавить клуб",
                "add_competition": "Создать соревнование",
                "add_discipline": "Добавить дисциплину",
                "add_judge": "Добавить судью",
                "add_participant": "Добавить участника",
                "add_tour": "Добавить тур",
                "import": "Импортировать",
                "refresh_clients": "Перезагрузить все устройства",
                "reload_clients": "Обновить данные на всех устройствах",
                "to_start_page": "На главную",
                "unfinalize": "Отменить финализацию",
            },
            "confirms": {
                "delete_club": "Вы действительно хотите удалить этот клуб?",
                "delete_competition": "Вы действительно хотите удалить это соревнование?",
                "delete_discipline": "Вы действительно хотите удалить эту дисциплину?",
                "delete_judge": "Вы действительно хотите удалить этого судью?",
                "delete_participant": "Вы действительно хотите удалить этого участника?",
                "delete_tour": "Вы действительно хотите удалить этот тур?",
                "refresh_clients": "Вы действительно хотите перезагрузить страницу на всех клиентах?",
                "reload_clients": "Вы действительно хотите обновить данные на всех клиентах?",
                "unfinalize_tour": "Вы действительно хотите отменить финализацию тура? Введите «unfinalize», чтобы продолжить",
            },
            "headers": {
                "clients_management": "Управление подключенными устройствами",
                "clubs": "Клубы-участники",
                "clubs_management": "Управление клубами",
                "competitions_management": "Управление соревнованиями",
                "competition_report": "Протокол соревнования",
                "competition_results": "Результаты соревнования",
                "discipline_results": "Результаты дисциплины",
                "disciplines_management": "Управление дисциплинами",
                "judges": "Судейская бригада",
                "judges_management": "Управление судьями",
                "load_competition": "Импорт данных соревнования",
                "participants_management": "Управление участниками",
                "service_menu": "Сервисное меню",
                "start_list": "Стартовый лист",
                "tour_results": "Результаты тура",
                "unfinalize_tour": "Отмена финализации тура",
            },
            "labels": {
                "competition_name": "Наименование соревнования",
                "competition_date": "Дата проведения",
                "include_acrobatics": "Включить акробатику",
                "include_formation_sportsmen": "Включить состав формейшнов",
            },
            "messages": {
                "invalid_passcode": "Введён неверный код потверждения",
            },
            "menu": {
                "competition_report": "Протокол соревнования",
                "discipline_results": "Результаты дисциплины",
                "load_competition": "Импорт данных",
                "manage_clubs": "Управление клубами",
                "manage_disciplines": "Управление дисциплинами",
                "manage_judges": "Управление судьями",
                "manage_sportsmen": "Управление спортсменами",
                "manage_tours": "Управление турами",
                "start_list": "Стартовый лист",
            },
            "phrases": {
                "total_n_participants": (n) => "Итого " + n + " участник" + chooseEnding(n, "", "а", "ов"),
            },
        },
        "errors": {
            "club": {
                "delete_with_participants": "Невозможно удалить клуб, к которому привязаны участники",
            },
            "competition": {
                "delete_non_empty": "Невозможно удалить соревнование, содержащее дисциплины, клубы или судей",
            },
            "discipline": {
                "delete_with_participants": "Невозможно удалить дисциплину, содержащую участников",
                "delete_with_tours": "Невозможно удалить дисциплину, содержащую туры",
            },
            "global": {
                "internal_server_error": "Ошибка на сервере (проверьте логи для информации)",
            },
            "judge": {
                "delete_with_scores": "Невозможно удалить судью, отсудившего хотя бы один тур",
            },
            "score": {
                "score_not_exist": "Попытка получить значение несуществующей оценки судьи",
            },
            "tour": {
                "add_before_finalized": "Невозможно добавить новый тур перед финализированным",
                "delete_finalized": "Невозможно удалить финализированный тур",
                "init_finailzed": "Невозможно пересоздать финализированный тур",
                "invalid_add_after_id": "Попытка добаить тур в несуществующее место",
                "next_is_finailzed": "Следующий тур не должен быть финализирован",
                "prev_not_finailzed": "Предыдущий тур должен быть финализирован",
                "update_finalized": "Для финализированного тура не допускается изменение квоты вывода, типа тура или системы судейства",
            },
        },
        "global": {
            "buttons": {
                "add": "Добавить",
                "deselect_all": "Снять все",
                "edit": "Редактировать",
                "delete": "Удалить",
                "discard": "Отменить",
                "save": "Сохранить",
                "select_all": "Выбрать все",
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
                "heat_n": (n) => "Заход №" + n.toString(),
                "judge_n": (n) => "Линейный судья №" + n.toString(),
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
            "club": {
                "name": "Название клуба",
                "city": "Город",
                "external_id": "Внешний ID",
            },
            "competition": {
                "active": "Активно",
                "date": "Дата",
                "info": "Дополнительная информация для протокола",
                "info_item_title": "Заголовок",
                "info_item_value": "Значение",
                "name": "Название",
            },
            "discipline": {
                "external_id": "Внешний ID",
                "name": "Название дисциплины",
                "sp": "Приоритет",
            },
            "judge": {
                "category": "Категория",
                "external_id": "Внешний ID",
                "name": "Ф. И. О.",
                "number": "Номер",
                "role": "Роль в судействе",
                "role_description": "Должность",
                "sp": "Приоритет",
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
                "sportsmen_year_of_birth": "Г.р.",
                "year_of_birth": "Год рождения",
                "yob": "Г.р.",
            },
            "tour": {
                "name": "Название тура",
                "is_hope_tour": "Тур «Надежды»",
                "num_advances": "Квота вывода",
                "participants_per_heat": "Участников в заходе",
                "scoring_system_name": "Система судейства",
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
            "messages": {
                "no_competitions": "Нет активных соревнований",
                "competitions_management_link": (link) => <span>
                    Управление соревнованиями находится по адресу&nbsp;
                    <a href={ link }>{ link }</a>
                </span>,
            },
            "roles": {
                "presenter": "Ведущий",
                "administrator": "Администратор",
            },
        },
        "tablet": {
            "buttons": {
                "next_heat": "След. заход",
                "prev_heat": "Пред. заход",
                "reset_stopwatch": "Сброс",
                "start_stopwatch": "Старт",
                "stop_stopwatch": "Стоп",
                "to_start_page": "На главную",
            },
            "headers": {
                "heat": "Заход",
                "presenter": "Ведущий",
                "select_page": "Страница",
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
                        "dance_tech": "Техника танцевания",
                        "fw_man": "Техника ног, партнёр (сбавка в %)",
                        "fw_woman": "Техника ног, партнёрша (сбавка в %)",
                        "impression": "Общее впечатление",
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
                        "yellow_card": "Жёлтая карточка (-3)",
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
                        "participant_club": "Клуб",
                        "participant_coaches": "Тренеры",
                        "participant_name": "Участник",
                        "place": "Место",
                        "sportsmen": "Спортсмены",
                        "sportsmen_year_of_birth": "Г.р.",
                        "total_score": "Сумма баллов",
                    },
                    "breakdown": {
                        "acro_n": (n) => "A" + n.toString(),
                        "bm": "СО",
                        "c": "К",
                        "df": "ТФ",
                        "dt": "ТT",
                        "fd": "П",
                        "fm": "ТНм",
                        "fw": "ТНж",
                        "i": "ОВ",
                        "sm": "Ош",
                        "t": "Σ",
                    },
                }
            }
        },

        "scoring_systems_names": {
            "rosfarr": {
                "acro": "РосФАРР, акробатические программы",
                "formation": "РосФАРР, формейшн без акробатики",
                "no_acro": "РосФАРР, танцевальные программы",
            }
        },
        "judge_roles": {
            "head_judge": "Главный судья",
            "acro_judge": "Судья акробатики",
            "dance_judge": "Судья танца",
            "tech_judge": "Технический судья",
            "": "-",
        },
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
    "Финал",
    "Тур «Надежды»",
    "Отборочный тур",
    "1/2 финала",
    "1/4 финала",
    "1/8 финала",
    "1/16 финала",
];
