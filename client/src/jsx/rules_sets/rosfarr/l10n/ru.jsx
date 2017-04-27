export default function translate(src, ...args) {
    let PHRASES = {
        "admin": {
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
                "unfinalize": "Отменить финализацию",
            },
            "messages": {
                "wrong_judge_role": "Неверно выбран тип судьи для данного тура",
            },
        },
        "tablet": {
            "acro_judge": {
                "fall_down": "Падения (−30)",
                "acro_n": (n) => `Акробатика ${n + 1}`,
            },
            "alerts": {
                "has_unconfirmed_scores": "Имеются незафиксированные оценки судей в последнем заходе.",
            },
            "buttons": {
                "discard_time": "Удалить",
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
                "submit_time": "Сохранить",
                "to_start_page": "На главную",
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "finalize_tour_and_start_next": "Вы действительно хотите финализировать этот тур и перейти к следующему туру?",
                "stop_tour": "Вы действительно хотите остановить этот тур?",
                "stop_tour_and_start_next": "Вы действительно хотите перейти к следующему туру?",
            },
            "dance_judge": {
                "acrobatics": "Акробатика",
                "big_mistakes": "Большие ошибки (−30)",
                "composition": "Композиция",
                "dance_figs": "Танцевальные фигуры",
                "dance_tech": "Техника танцевания",
                "form_fall_down": "Падения (−3)",
                "form_mistakes": "Ошибки (−2)",
                "form_small_mistakes": "Мелкие ошибки (−2)",
                "form_big_mistakes": "Большие ошибки (−3)",
                "fw": "Основной ход (сбавка в %)",
                "fw_man": "Основной ход, партнёр (сбавка в %)",
                "fw_woman": "Основной ход, партнёрша (сбавка в %)",
                "impression": "Общее впечатление",
                "points": "Оценка",
                "small_mistakes": "Мелкие ошибки (−5)",
            },
            "global": {
                "confirm_score": "Зафиксировать",
                "confirmed": "Зафиксировано",
                "disqualified": "Дисквалифицирован",
                "discard_disqualified": "Отмена дисквалификации",
                "discard_not_performed": "Отмена невыхода на площадку",
                "heat_number": (n, t) => `Заход ${n} из ${t}`,
                "judge_number": (n) => `Судья №${n}`,
                "mark_disqualified": "Дисквалификация",
                "mark_not_performed": "Невыход на площадку",
                "not_performing": "Не выступает",
                "total_score": "Сумма баллов",
                "wrong_judge_role": "Для Вас неверно выбрана роль (например, судья акробатики в танцевальных дисциплинах).\nОбратитесь за помощью к администратору.",
            },
            "head_judge": {
                "acrobatic_overrides": "Корректировки акробатики",
                "card": "Карточка",
                "dance_judge_scores": "Оценки линейных судей",
                "form_red_card": "Красная",
                "form_yellow_card": "Желтая",
                "ok": "OK",
                "card_type": "Карточка",
                "previous_cards": "Предыдущие карточки",
                "red_card": "Красная",
                "tech_judge_scores": "Оценки технических судей",
                "yellow_card": "Желтая",
            },
            "tech_judge": {
                "form_red_card": "Красная (−15)",
                "form_yellow_card": "Желтая",
                "jump_steps": "Осн. ходы",
                "ok": "OK",
                "card_type": "Карточка",
                "reset_to_n": (n) => `Сброс на ${n}`,
                "timing": "Длительность",
                "red_card": "Красная",
                "server_time": (t) => t !== null ? `Сохраненное время: ${t}` : "Нет сохраненного времени",
                "yellow_card": "Желтая",
            },
            "pages": {
                "heats": "Заходы",
                "results": "Результаты",
                "actions": "Действия",
                "dancing": "Танец",
                "acro": "Акробатика",
            },
        },
        "results": {
            "breakdown": {
                "a": "A",
                "acro_n": (n) => `A${n}`,
                "bm": "БО",
                "c": "К",
                "df": "ТФ",
                "dt": "ТT",
                "fd": "П",
                "fm": "ОХм",
                "fw": "ОХж",
                "fw_solo": "ОХ",
                "i": "ОВ",
                "m": "Ош",
                "p": "М",
                "sm": "МО",
                "js": "ОХ",
                "tv": "Время",
                "penalty": "Штраф",
                "time": "Время",
                "t": "Σ",
            },
            "headers": {
                "participants_advanced": "Прошли в следующий тур",
                "participants_not_advanced": "Не прошли в следующий тур",
                "participants_NP": "Не выступали",
                "participants_DQ": "Дисквалификация",
            },
            "labels": {
                "acro_score": "Результат акро",
                "acrobatics": "Акробатика",
                "acrobatics_verbose": "Акробатика (заявка/факт)",
                "card": "Штраф",
                "disqualified": "Дисквалифицирован",
                "dq": "Дискв.",
                "fw_score": "Результат ТН",
                "fw_score_short": "ТН",
                "info": "Участник, результат",
                "next_tour": "Следующий тур",
                "not_performed": "Не принимал участие",
                "number": "№",
                "participant_club": "Клуб",
                "participant_coaches": "Тренеры",
                "participant_name": "Участник",
                "penalty": "Штраф",
                "place": "Место",
                "sportsmen": "Спортсмены",
                "sportsmen_year_of_birth": "Г.р.",
                "sub": "зап",
                "total_score": "Итог",
            },
            "cards": {
                "RC": (is_formation) => is_formation ? "КК (−15)" : "КК (−30)",
                "YC": "ЖК",
                "OK": "",
                "verbose_RC": (is_formation) => is_formation
                    ? "Красная карточка (штраф −15)"
                    : "Красная карточка (штраф −30)",
                "verbose_YC": "Желтая карточка",
                "verbose_OK": "",
                "short_YC": "ЖК",
                "short_RC": "КК",
            },
        },
        "global": {
            "buttons": {
                "submit": "Сохранить",
                "discard": "Отменить",
                "close": "Закрыть",
            },
            "labels": {
                "yes": "Да",
                "no": "Нет",
            },
            "phrases": {
                "participant_n": (n, name, n_sp) => {
                    if (n_sp > 2) {
                        let result = `Формейшн №${n}`;
                        if (name) {
                            result += `: ${name}`;
                        }
                        return result;
                    }
                    return (n_sp === 2)
                        ? `Пара №${n}`
                        : `Участник №${n}`
                },
                "judge_n": (n) => `Линейный судья №${n}`,
            },
        },
        "scoring_systems_names": {
            "rosfarr": {
                "base_name": "РосФАРР",
                "acro": "РосФАРР, акробатические программы",
                "am_qual": "РосФАРР, A и M классы, до полуфинала",
                "am_final_acro": "РосФАРР, A и M классы, финал, акробатика",
                "am_final_fw": "РосФАРР, A и M классы, финал, техника ног",
                "formation": "РосФАРР, формейшн без акробатики",
                "formation_acro": "РосФАРР, формейшн с акробатикой",
                "no_acro": "РосФАРР, танцевальные программы",
                "simplified": "РосФАРР, упрощенная система (1–40)",
                "solo": "РосФАРР, соло-дисциплины",
            },
        },
        "judge_roles": {
            "": "-",
            "acro_judge": "Судья акробатики",
            "dance_judge": "Судья танца",
            "head_judge": "Главный судья",
            "tech_judge": "Технический судья",
        },
    };

    const path = src.split(".");
    let phrase_ptr = PHRASES;
    for (const chunk of path) {
        phrase_ptr = phrase_ptr[chunk];
        if (typeof phrase_ptr === "undefined") {
            console.error(`Unable to find translation for ${src}`);
            return "";
        }
    }
    if (typeof phrase_ptr === "function") {
        return phrase_ptr(...args);
    }
    return phrase_ptr;
}

translate.tour_name_suggestions = [
    "Финал",
    "Тур «Надежды»",
    "Отборочный тур",
    "1/2 финала",
    "1/4 финала",
    "1/8 финала",
    "1/16 финала",
    "Финал, техника ног",
    "Финал, акробатика",
];
