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
            jazz_group: (
                <>
                    <tr>
                        <td>
                            <b>ТИ</b>
                        </td>
                        <td> — (техника) Исполнение технических элементов</td>
                    </tr>
                    <tr>
                        <td>
                            <b>ТП</b>
                        </td>
                        <td>
                            {" "}
                            — (техника) Положение частей тела / Контроль / Натянутость
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>ТС</b>
                        </td>
                        <td> — (техника) Стиль / Сила и амплитуда движений</td>
                    </tr>
                    <tr>
                        <td>
                            <b>ГС</b>
                        </td>
                        <td>
                            {" "}
                            — (групповое исполнение) Синхронность / Исполнение в ритм
                            музыки
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>ГО</b>
                        </td>
                        <td> — (групповое исполнение) Однородность движений</td>
                    </tr>
                    <tr>
                        <td>
                            <b>ГР</b>
                        </td>
                        <td> — (групповое исполнение) Равнение</td>
                    </tr>
                    <tr>
                        <td>
                            <b>ХМ</b>
                        </td>
                        <td> — (хореография) Музыкальность / Креативность / Новизна</td>
                    </tr>
                    <tr>
                        <td>
                            <b>ХЗ</b>
                        </td>
                        <td>
                            {" "}
                            — (хореография) Зрелищность композиции / Визуальные эффекты
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>ХС</b>
                        </td>
                        <td> — (хореография) Уровень сложности</td>
                    </tr>
                    <tr>
                        <td>
                            <b>ОВ</b>
                        </td>
                        <td>
                            {" "}
                            — (общее впечатления) Артистичность / Воздействие на
                            зрителей
                        </td>
                    </tr>
                </>
            ),
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
            long: {
                cross: "Крест",
                crosses: "Кресты",
                notes: "Заметки",
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
