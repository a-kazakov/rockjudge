import { consoleError } from "common/logging";

export default function translate(src, ...args) {
    function chooseEnding(n, e1, e2, e5) {
        let x = n % 100;
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

    let PHRASES = {
        admin: {
            buttons: {
                add_club: "Добавить клуб",
                add_competition: "Создать соревнование",
                add_competition_plan_item: "Добавить элемент",
                add_discipline: "Добавить дисциплину",
                add_judge: "Добавить судью",
                add_participant: "Добавить участника",
                add_tour: "Добавить тур",
                confirm_score: "Зафиксировать",
                docx_heats: "Заходы в DOCX",
                docx_numbers: "Номера в DOCX",
                docx_results: "Результаты в DOCX",
                export: "Экспортировать",
                import: "Импортировать",
                launch_auto_printer: "Запуск автоматической печати",
                load_acro: "Загрузить акробатику",
                refresh_clients: "Перезагрузить все устройства",
                reload_clients: "Обновить данные на всех устройствах",
                switch_to_plan: "Сортировка по программе",
                switch_to_disciplines: "Сортировка по дисциплинам",
                to_start_page: "На главную",
                unconfirm_score: "Отмена фиксации",
                unfinalize: "Отменить финализацию",
            },
            messages: {
                wrong_judge_role: "Неверно выбран тип судьи для данного тура",
            },
        },
        tablet: {
            acro_judge: {
                acro_n: n => `Акробатика ${n + 1}`,
            },
            alerts: {
                has_unconfirmed_scores:
                    "Имеются незафиксированные оценки судей в последнем заходе.",
            },
            buttons: {
                discard_time: "Удалить",
                finalize_tour: "Финализировать тур",
                finalize_tour_and_start_next:
                    "Финализировать тур и перейти к следующему",
                finish: "Завершить",
                next_heat: "След. заход",
                not_performed: "Невыход на площадку",
                performed: "Отмена невыхода на площадку",
                prev_heat: "Пред. заход",
                reset_stopwatch: "Сброс",
                return: "Назад",
                return_to_main_page: "Переключиться на другого судью",
                start_stopwatch: "Старт",
                stop_stopwatch: "Стоп",
                stop_tour: "Завершить тур",
                stop_tour_and_start_next: "Завершить тур и перейти к следующему туру",
                submit_time: "Сохранить",
                to_start_page: "На главную",
            },
            confirms: {
                finalize_tour: "Вы действительно хотите финализировать этот тур?",
                finalize_tour_and_start_next:
                    "Вы действительно хотите финализировать этот тур и перейти к следующему туру?",
                stop_tour: "Вы действительно хотите остановить этот тур?",
                stop_tour_and_start_next:
                    "Вы действительно хотите перейти к следующему туру?",
            },
            dance_judge: {
                acrobatics: "Акробатика",
                big_mistakes: "Большие ошибки",
                composition: "Композиция",
                dance_figs: "Танцевальные фигуры",
                dance_tech: "Техника танцевания",
                form_fall_down: "Падения",
                form_small_mistakes: "Мелкие ошибки",
                form_big_mistakes: "Большие ошибк",
                fw: "Основной ход (сбавка в %)",
                fw_man: "Основной ход, партнёр (сбавка в %)",
                fw_woman: "Основной ход, партнёрша (сбавка в %)",
                impression: "Общее впечатление",
                points: "Оценка",
                small_mistakes: "Мелкие ошибки",
                df_accuracy: "Точность",
                df_complexity: "Сложность",
                df_difficulty: "Сложность, разнообразие, оригинальность",
                df_art: "Артистизм",
                c_ideas: "Идеи",
                c_idea: "Идея",
                c_structure: "Постановка и представление",
                c_performance: "Постановка",
                c_bonus: "Бонус",
                fig_execution: "Синхронность и исполнение",
                fig_patterns: "Построения",
                fig_transitions: "Перестроения",
                figures: "Формейшн-фигуры",
            },
            global: {
                confirm_score: "Зафиксировать",
                confirmed: "Зафиксировано",
                discard_disqualified: "Отмена дисквалификации",
                discard_not_performed: "Отмена невыхода на площадку",
                disqualified: "Дисквалифицирован",
                heat_number: (n, t) => `Заход ${n} из ${t}`,
                judge_number: n => `Судья №${n}`,
                last_page:
                    "Судейство тура окончено.\nПожалуйста, ожидайте начала следующего тура.",
                mark_disqualified: "Дисквалификация",
                mark_not_performed: "Невыход на площадку",
                no_score:
                    "Для этого захода не заведена карточка в системе.\nОбратитесь за помощью к администратору, ему необходимо пересоздать тур.",
                not_performing: "Не выступает",
                total_score: "Итог",
                wrong_judge_role:
                    "Для Вас неверно выбрана роль (например, судья акробатики в танцевальных дисциплинах).\nОбратитесь за помощью к администратору.",
            },
            head_judge: {
                acrobatic_overrides: "Корректировки акробатики",
                card: "Карточка",
                card_reasons: "Нарушения",
                dance_judge_scores: "Оценки линейных судей",
                final_card: "Итоговая карточка",
                form_red_card: "Красная",
                form_yellow_card: "Желтая",
                ok: "OK",
                card_type: "Карточка",
                previous_cards: "Предыдущие карточки",
                red_card: "Красная",
                tech_judge_scores: "Оценки технических судей",
                yellow_card: "Желтая",
                undercount: "Недостаток спортсменов",
                fall_down: "Падения",
            },
            tech_judge: {
                form_red_card: "Красная (−15)",
                form_yellow_card: "Желтая",
                jump_steps: "Осн. ходы",
                restarts: "Рестарты",
                ok: "OK",
                fall_down: "Падения (−30)",
                card_type: "Карточка",
                reset_to_n: n => `Сброс на ${n}`,
                timing: "Длительность",
                red_card: "Красная",
                server_time: t =>
                    t != null ? `Сохраненное время: ${t}` : "Нет сохраненного времени",
                stopwatch: "Секундомер",
                yellow_card: "Желтая",
                violations: "Нарушения",
                nobody_in_position: "В этом заходе Вы никого не оцениваете",
                undercount: "Недостаток спортсменов",
                judging_position_prompt: "Выберите пару, которую будете оценивать",
                judging_positions: {
                    left: "Левая",
                    right: "Правая",
                    central: "Центральная",
                    custom: pos =>
                        pos <= 6
                            ? [
                                  "Нулевая",
                                  "Первая",
                                  "Вторая",
                                  "Третья",
                                  "Четвертая",
                                  "Пятая",
                                  "Шестая",
                              ][pos]
                            : `${pos}-я`,
                },
            },
            pages: {
                heats: "Заходы",
                results: "Результаты",
                actions: "Действия",
                dancing: "Танец",
                acro: "Акробатика",
            },
        },
        results: {
            breakdown: {
                a: "A",
                acro_n: n => `A${n}`,
                bm: "БО",
                c: "К",
                df: "ТФ",
                dt: "ТT",
                fd: "П",
                fm: "ОХм",
                fw: "ОХж",
                fw_solo: "ОХ",
                i: "ОВ",
                m: "Ош",
                p: "М",
                sm: "МО",
                js: "ОХ",
                tv: "Время",
                penalty: "Штраф",
                time: "Время",
                t: "Σ",
            },
            headers: {
                participants_advanced: "Прошли в следующий тур",
                participants_not_advanced: "Не прошли в следующий тур",
                participants_NP: "Не выступали",
                participants_DQ: "Дисквалификация",
            },
            labels: {
                acro_score: "Результат акро",
                acro_score_short: "А",
                acrobatics: "Акробатика",
                acrobatics_verbose: "Акробатика (заявка/факт)",
                card: "Карточка",
                disqualified: "Дисквалифицирован",
                dq: "Дискв.",
                fw_score: "Результат ТН",
                fw_score_short: "ТН",
                info: "Участник, результат",
                criterias: "Оценки по компонентам",
                next_tour: "Следующий тур",
                not_performed: "Не принимал участие",
                number: "№",
                participant_club: "Клуб",
                participant_coaches: "Тренеры",
                participant_name: "Участник",
                penalty: "Штраф",
                place: "Место",
                sportsmen: "Спортсмены",
                sportsmen_year_of_birth: "Г.р.",
                sub: "зап",
                total_score: "Итог",
            },
            cards: {
                RC: is_formation => (is_formation ? "КК (−15)" : "КК (−30)"),
                YC: "ЖК",
                OK: "",
                verbose_RC: is_formation =>
                    is_formation
                        ? "Красная карточка (штраф −15)"
                        : "Красная карточка (штраф −30)",
                verbose_YC: "Желтая карточка",
                verbose_OK: "",
                short_YC: "ЖК",
                short_RC: "КК",
            },
            restarts: value => `${value} рестарт${chooseEnding(value, "", "а", "ов")}`,
        },
        cards: {
            verbose: {
                OK: "",
                YC: "Желтая карточка",
                RC: "Красная карточка",
            },
            long: {
                OK: "",
                YC: "Желтая",
                RC: "Красная",
            },
            short: {
                OK: "",
                YC: "ЖК",
                RC: "КК",
            },
        },
        card_reasons: {
            long: {
                duration: "Недопустимая продолжительность программы",
                music: "Недопустимая фонограмма",
                costume: "Нарушение дресс-кода",
                forbidden_acro: "Запрещенная акробатика",
                no_required_acro: "Отсутствие требуемых групп акробатики",
                acro_count: "Недопустимое кол-во акробатических элементов",
                basic_steps_count: "Недостаток танцевальных фигур I группы",
                incomplete_couple: "Неполная пара в формейшн-микст",
                other: "Другие ограничения в фигурах",
            },
            short: {
                duration: "Длительность",
                music: "Фонограмма",
                costume: "Дресс-код",
                forbidden_acro: "Запрещ. акро",
                no_required_acro: "Группы акро",
                acro_count: "Кол-во акро",
                basic_steps_count: "Кол. ТФ I гр.",
                incomplete_couple: "Неполная пара",
                other: "Другое",
            },
        },
        score_parts: {
            components: {
                short: {
                    a1: "А1",
                    a2: "А2",
                    a3: "А3",
                    a4: "А4",
                    a5: "А5",
                    a6: "А6",
                    a7: "А7",
                    a8: "А8",
                    fall_down: "Пад",
                    undercount: "Нед",
                    big_mistakes: "БО",
                    card: "Карт",
                    composition: "К",
                    dance_figs: "ТФ",
                    mistakes: "Ош",
                    small_mistakes: "МО",
                    fw: "ОХ",
                    fw_man: "ОХм",
                    fw_woman: "ОХж",
                    points: "Б",
                    df_accuracy: "Точн",
                    df_difficulty: "Слож",
                    df_complexity: "Слож",
                    df_art: "Арт",
                    c_idea: "Идея",
                    c_ideas: "Идеи",
                    c_structure: "Пстн",
                    c_performance: "Пстн",
                    c_bonus: "Бон",
                    fig_execution: "Синх",
                    fig_patterns: "Пстр",
                    fig_transitions: "Пер",
                    figures: "ФФ",
                },
            },
            tech: {
                long: {
                    fall_down: "Падения",
                    time: "Время",
                    undercount: "Недостаток спортсменов",
                    restarts: "Рестарты",
                },
            },
        },
        global: {
            buttons: {
                submit: "Сохранить",
                discard: "Отменить",
                close: "Закрыть",
            },
            labels: {
                yes: "Да",
                no: "Нет",
            },
            phrases: {
                participant_n: (n, name, n_sp) => {
                    if (n_sp > 2) {
                        let result = `Формейшн №${n}`;
                        if (name) {
                            result += `: ${name}`;
                        }
                        return result;
                    }
                    return n_sp === 2 ? `Пара №${n}` : `Участник №${n}`;
                },
                judge_n: n => `Линейный судья №${n}`,
            },
        },
        scoring_systems_names: {
            vftsarr: {
                base_name: "ФТСАРР",
                acro: "ФТСАРР, акробатические программы",
                acro_extended: "ФТСАРР, акробатические программы (раздельная шкала)",
                am_qual: "ФТСАРР, A и M классы, до полуфинала",
                am_final_acro: "ФТСАРР, A и M классы, финал, акробатика",
                am_final_fw: "ФТСАРР, A и M классы, финал, техника ног",
                formation: "ФТСАРР, формейшн без акробатики",
                formation_simplified:
                    "ФТСАРР, формейшн без акробатики (упрощенная шкала)",
                formation_acro: "ФТСАРР, формейшн с акробатикой",
                dance_extended: "ФТСАРР, танцевальные программы (раздельная шкала)",
                dance: "ФТСАРР, танцевальные программы",
                dance_rough: "ФТСАРР, танцевальные программы (сокращенная шкала)",
                simplified: "ФТСАРР, упрощенная система (1–40)",
                solo: "ФТСАРР, соло-дисциплины",
                solo_rough: "ФТСАРР, соло-дисциплины (сокращенная шкала)",
            },
        },
        judge_roles: {
            "": "-",
            acro_judge: "Судья акробатики",
            dance_judge: "Судья танца",
            head_judge: "Главный судья",
            tech_judge: "Технический судья",
        },
    };

    const path = src.split(".");
    let phrase_ptr = PHRASES;
    for (const chunk of path) {
        phrase_ptr = phrase_ptr[chunk];
        if (typeof phrase_ptr === "undefined") {
            consoleError(`Unable to find translation for ${src}`);
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
