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
                not_performed: "Не вышел",
                performed: "Отмена невыхода",
                prev_heat: "Пред. заход",
                reset_stopwatch: "Сброс",
                return: "Назад",
                start_stopwatch: "Старт",
                stop_stopwatch: "Стоп",
                stop_tour: "Завершить тур",
                stop_tour_and_start_next: "Завершить тур и перейти к следующему туру",
                submit_time: "Сохранить",
                to_start_page: "На главную",
                auto_assign_places: "Присвоить места автоматически",
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
                cant_confirm: (c, t) =>
                    `Для закрытия оценок необходимо поставить ровно ${t} крест${chooseEnding(
                        t,
                        "",
                        "а",
                        "ов",
                    )} (сейчас ${c})`,
                crosses_status: (c, t) =>
                    `Поставлен${chooseEnding(c, "", "о", "о")} ${c} крест${chooseEnding(
                        c,
                        "",
                        "а",
                        "ов",
                    )} из ${t}`,
                heat: n => `Заход ${n}`,
                notes: "Заметки",
                tech: "Техника",
                composition: "Композиция",
                art: "Артистизм",
                confirmation_page: "Подтверждение оценок",
                participant: "Участник",
                multiple_participants: "Несколько участников",
                participant_number: "№",
                score: "Балл",
            },
            global: {
                confirm_score: "Зафиксировать",
                confirmed: "Зафиксировано",
                discard_disqualified: "Отмена дисквалификации",
                discard_not_performed: "Отмена невыхода",
                disqualified: "Дисквалифицирован",
                heat_number: (n, t) => `Заход ${n} из ${t}`,
                judge_number: n => `Судья №${n}`,
                mark_disqualified: "Дисквал.",
                mark_not_performed: "Не вышел",
                no_score:
                    "Для этого захода не заведена карточка в системе.\nОбратитесь за помощью к администратору, ему необходимо пересоздать тур.",
                not_performing: "Не выступает",
                total_score: "Сумма баллов",
                wrong_judge_role:
                    "Для Вас неверно выбрана роль (например, судья акробатики в танцевальных дисциплинах).\nОбратитесь за помощью к администратору.",
            },
            head_judge: {
                dance_judge_scores: "Оценки линейных судей",
                advances_quota: n => `Квота вывода: ${n}`,
                advances_actual: n => `Прошедшие участники: ${n}`,
                num_advances_selector_not_avaliable:
                    "После закрытия всех оценок линейными судьями можно будет установить новую квоту вывода",
                set_num_advances: "Изменить квоту вывода",
            },
            messages: {
                confirm_auto_assign: [
                    "Проставить места автоматически?",
                    "Это действие очистит текущие места",
                ],
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
                acrobatics: "Акробатика",
                acrobatics_verbose: "Акробатика (заявка/факт)",
                card: "Штраф",
                disqualified: "Дисквалифицирован",
                dq: "Дискв.",
                fw_score: "Результат ТН",
                fw_score_short: "ТН",
                info: "Участник, результат",
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
                tours_places_sum: "Σ",
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
            skating: {
                base_name: "Скейтинг система",
                qualification_simple: "Отборочные туры, только кресты",
                final_simple: "Финал, упрощенная система",
                final_3d: "Финал, система 3D",
                final_summary: "Сводка нескольких финалов",
            },
        },
        judge_roles: {
            "": "-",
            dance_judge: "Линейный судья",
            head_judge: "Главный судья",
        },
        score_parts: {
            components: {
                short: {
                    cross: "К",
                    tech: "T",
                    composition: "К",
                    art: "А",
                    place: "М",
                },
                long: {
                    cross: "Крест",
                    crosses: "Кресты",
                    notes: "Заметки",
                },
            },
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
];
