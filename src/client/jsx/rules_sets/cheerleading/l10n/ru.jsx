import { React } from "HostModules";
import { consoleError } from "common/logging";

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

const PHRASES = {
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
            finalize_tour_and_start_next: "Финализировать тур и перейти к следующему",
            finish: "Завершить",
            next_heat: "След. заход",
            not_performed: "Не вышел",
            performed: "Отмена невыхода",
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
            last_page:
                "Судейство тура окончено.\nПожалуйста, ожидайте начала следующего тура.",
            mark_disqualified: "Дисквал.",
            mark_not_performed: "Не вышел",
            no_score:
                "Для этого захода не заведена карточка в системе.\nОбратитесь за помощью к администратору, ему необходимо пересоздать тур.",
            not_performing: "Не выступает",
            total_score: "Сумма баллов",
            wrong_judge_role:
                "Для Вас неверно выбрана роль (например, судья акробатики в танцевальных дисциплинах).\nОбратитесь за помощью к администратору.",
        },
        tech_judge: {
            time_penalty_0: "до 4 сек (0)",
            time_penalty_1: "5−10 сек (−1)",
            time_penalty_3: "от 11 сек (−3)",
            stopwatch: "Секундомер",
            penalties: "Штрафы за нарушения",
        },
        head_judge: {
            dance_judge_scores: "Оценки линейных судей",
            final_penalty: "Итоговый штраф",
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
        hints: {
            jazz_group: (() => {
                const data = [
                    ["ТИ", "(техника) Исполнение технических элементов"],
                    ["ТП", "(техника) Положение частей тела / Контроль / Натянутость"],
                    ["ТС", "(техника) Стиль / Сила и амплитуда движений"],
                    [
                        "ГС",
                        "(групповое исполнение) Синхронность / Исполнение в ритм музыки",
                    ],
                    ["ГО", "(групповое исполнение) Однородность движений"],
                    ["ГР", "(групповое исполнение) Равнение"],
                    ["ХМ", "(хореография) Музыкальность / Креативность / Новизна"],
                    ["ХЗ", "(хореография) Зрелищность композиции / Визуальные эффекты"],
                    ["ХС", "(хореография) Уровень сложности"],
                    [
                        "ОВ",
                        "(общее впечатления) Артистичность / Воздействие на зрителей",
                    ],
                ];
                const body = data.map(([short, long], idx) => (
                    <tr key={idx}>
                        <td style={{ width: "25pt" }}>
                            <p style={{ fontWeight: "bold" }}>{short}</p>
                        </td>
                        <td>
                            <p>{` — ${long}`}</p>
                        </td>
                    </tr>
                ));
                return (
                    <table>
                        <tbody>{body}</tbody>
                    </table>
                );
            })(),
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
                    let result = `Команда №${n}`;
                    if (name) {
                        result += `: ${name}`;
                    }
                    return result;
                }
                return n_sp === 2 ? `Двойка №${n}` : `Участник №${n}`;
            },
            judge_n: n => `Линейный судья №${n}`,
        },
    },
    scoring_systems_names: {
        cheerleading: {
            base_name: "Чирлидинг",
            jazz_group: "Чир джаз группа",
            freestyle_group: "Чир фристайл группа",
            hiphop_group: "Чир хип-хоп группа",
            couple: "Чир фристайл/хип-хоп/джаз двойка",
            cl_group: "Чирлидинг группа / чирлидинг группа смешанная",
            cl_stunt: "Чирлидинг стант -/смешанный/партнерский",
        },
    },
    judge_roles: {
        "": "-",
        dance_judge: "Линейный судья",
        head_judge: "Главный судья",
        tech_judge: "Технический судья",
    },
    score_parts: {
        components: {
            short: {
                tech_execution: "ТИ",
                tech_control: "ТП",
                tech_style: "ТС",
                group_sync: "ГС",
                group_similarity: "ГО",
                group_position: "ГР",
                choreography_art: "ХМ",
                choreography_performance: "ХЗ",
                choreography_complexity: "ХС",
                impression: "ОВ",
                place: "М",
            },
            medium: {
                tech_execution: "Исполнение техн. элементов",
                tech_control: "Положение / Контроль / Натянутость",
                tech_style: "Стиль / Сила и амплитуда",
                group_sync: "Синхронность / Исполнение в ритм",
                group_similarity: "Однородность",
                group_position: "Равнение",
                choreography_art: "Музыкальность / Креативность",
                choreography_performance: "Зрелищность / Эффекты",
                choreography_complexity: "Сложность",
                impression: "Артистичность",
                time_penalty: "Время",
                music_violated: "Музыка",
                entry_exit_violated: "Вход/выход",
                dress_violated: "Дресс-код",
                cheer_block_violated: "Чир-блок/чант",
                accessories_violated: "Аксессуары",
                complexity_violations: "Сложн./безоп-ть",
                other_penalties: "Другое",
            },
            long: {
                tech_execution: "Исполнение технических элементов",
                tech_control: "Положение частей тела / Контроль / Натянутость",
                tech_style: "Стиль / Сила и амплитуда движений",
                group_sync: "Синхронность / Исполнение в ритм музыки",
                group_similarity: "Однородность движений",
                group_position: "Равнение",
                choreography_art: "Музыкальность / Креативность / Новизна",
                choreography_performance: "Зрелищность композиции / Визуальные эффекты",
                choreography_complexity: "Уровень сложности",
                impression: "Артистичность / Воздействие на зрителей",
                place: "Место",
                time_penalty: "Штраф за временные ограничения",
                music_violated: "Нарушения по музыке (−5)",
                entry_exit_violated: "Постановочные вход/выход (−5)",
                dress_violated: "Нарушение дресс-кода (−5)",
                cheer_block_violated: "Использование «чир-блока» / чантов (−5)",
                accessories_violated: "Недопустимые аксессуары (−5)",
                complexity_violations: "Нарушения сложности / безопасности (−5)",
                other_penalties: "Дополнительные штрафные баллы (другое)",
            },
        },
    },
};

export default function translate(src, ...args) {
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
