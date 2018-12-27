import React from "react";
import { consoleError } from "common/logging";

/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

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

    const PHRASES = {
        admin: {
            alerts: {
                about: (
                    version,
                    date, // eslint-disable-line no-unused-vars
                ) => (
                    <div className="about">
                        <p>
                            <b>RockJudge {version}</b> (версия от {date}) &mdash;
                            система автоматизации проведения соревнований по
                            акробатическому рок-н-роллу.
                        </p>
                        <p>
                            Авторские права на систему RockJudge полностью принадлежат
                            разработчику Артему Казакову. Соавтор системы Антон Амелин.
                        </p>
                        <p>
                            Исключительным правом распросранения данной программы
                            обладает ООО &laquo;ПроСпорт&raquo;. Запрещено любое
                            использование данной системы без письменного разрешения от
                            ООО &laquo;ПроСпорт&raquo; (ОГРН 1177847156222).
                        </p>
                        <p>
                            Официальный сайт:{" "}
                            <a href="https://rockjudge.com/" target="_blank">
                                https://rockjudge.com/
                            </a>
                        </p>
                    </div>
                ),
                add_programs_after_creation:
                    "Программы можно будет добавить только после сохранения участника",
                auto_printer_available:
                    "Автоматическая печать корректно настроена и может быть использована.",
                auto_printer_not_available:
                    "Автоматическая печать недоступна на этом компьтере.",
                no_finalized: "Отсутствуют финализированные туры",
                unfinalize_warning: (
                    <div>
                        <p>
                            <strong>
                                Финализация должна отменяться только в исключительных
                                случаях!
                            </strong>
                        </p>
                        <p>
                            Если же это действительно необходимо, обратите внимание, что
                            после повторной финализации список участников следующего
                            тура будет автоматически пересоздан. Результаты участников,
                            прошедших в следующий тур после первой финализации и не
                            прошедших после повторной будут безвозвратно утеряны!
                        </p>
                        <p>И не забудьте заново напечатать все таблицы.</p>
                    </div>
                ),
            },
            auto_printer: {
                confirm_print_all_docs: "Напечатать всю отмеченную документацию?",
                confirm_print_first_tours_heats: "Напечатать заходы первых туров?",
                confirm_print_test_page: "Напечатать тестовую страницу?",
                discipline: "Дисциплина",
                discipline_results: "Результаты дисциплины",
                heats: "Заходы",
                print_all_docs: "Печать всей выбранной документации",
                print_fitst_tours_heats: "Печать заходов первых туров",
                print_test_page: "Печать тестовой страницы",
                queue: "Очередь печати",
                queue_empty: "Очередь пуста",
                results_1: "Краткая таблица",
                results_2: "Средняя таблица",
                results_3: "Подробная таблица",
                rules: "Задания",
                test: "",
                test_page: "Тестовая страница",
                test_text: "Это тестовая страница RockJudge",
            },
            buttons: {
                add_club: "Добавить клуб",
                add_competition: "Создать соревнование",
                add_competition_plan_item: "Добавить элемент",
                add_discipline: "Добавить дисциплину",
                add_element: "Добавить элемент",
                add_judge: "Добавить судью",
                add_participant: "Добавить участника",
                add_tour: "Добавить тур",
                bulk_tour_init: "Создать первые туры",
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
            confirms: {
                bulk_tour_init: "Пересоздать первые туры всех дисциплин?",
                delete_client:
                    "Вы действительно хотите отозвать авторизацию для этого клиента?",
                delete_club: "Вы действительно хотите удалить этот клуб?",
                delete_competition: "Вы действительно хотите удалить это соревнование?",
                delete_discipline: "Вы действительно хотите удалить эту дисциплину?",
                delete_judge: "Вы действительно хотите удалить этого судью?",
                delete_participant: "Вы действительно хотите удалить этого участника?",
                delete_program: "Вы действительно хотите удалить эту программу?",
                delete_tour: "Вы действительно хотите удалить этот тур?",
                refresh_clients:
                    "Вы действительно хотите перезагрузить страницу на всех клиентах?",
                reload_clients:
                    "Вы действительно хотите обновить данные на всех клиентах?",
                unfinalize_tour:
                    "Вы действительно хотите отменить финализацию тура? Введите «unfinalize», чтобы продолжить",
            },
            headers: {
                about: "О программе",
                auto_printer: "Автоматическая печать",
                clients_management: "Управление авторизованными устройствами",
                clubs: "Клубы-участники",
                clubs_management: "Управление клубами",
                clubs_shown: "Информация только по следующим клубам:",
                clubs_summary: "Сводка по клубам",
                competition_info: "Информация о турнире",
                competition_plan: "Программа соревнований",
                competition_plan_management: "Программа соревнований",
                competition_report: "Протокол соревнований",
                competition_results: "Результаты соревнований",
                competitions_management: "Управление соревнованиями",
                discipline_judges: "Распределение судей по дисциплинам",
                discipline_results: "Результаты дисциплины",
                disciplines_management: "Управление дисциплинами",
                disciplines_shown: "Информация только по следующим дисциплинам:",
                disciplines_summary: "Сводка по дисциплинам",
                export_competition: "Экспорт данных турнира и результатов",
                import_competition: "Импорт данных турнира",
                import_export: "Импорт / экспорт",
                judges: "Судейская бригада",
                judges_management: "Управление судьями",
                load_acrobatics: "Загрузка акробатики",
                participants_management: "Управление участниками",
                service_menu: "Сервисное меню",
                shortcuts: "Быстрые действия",
                sportsmen_list: "Список спортсменов",
                start_list: "Стартовый лист",
                tour_heats: "Заходы участников",
                tour_results: "Результаты тура",
                unfinalize_tour: "Отмена финализации тура",
                unpicked_tours: "Не включены в программу",
            },
            labels: {
                clubs: "Клубы",
                competition_date: "Дата проведения",
                competition_name: "Наименование соревнования",
                discipline: "Дисциплина",
                discipline_judges: "Распределение судей по дисциплинам",
                disciplines: "Дисциплины",
                group_by_clubs: "Группировать по клубам",
                include_acrobatics: "Включить акробатику",
                include_clubs: "Включить данные о клубах",
                include_discipline_judges:
                    "Включить распределение судей по дисциплинам",
                include_extended_info: "Включить расширенную информацию",
                include_formation_sportsmen: "Включить состав формейшнов",
                include_judges: "Включить данные о судьях",
                judges: "Судьи",
                no_files_selected: "Выберите файл...",
                no_program_loaded: "Акробатика не загружена",
                participants: "Участники",
                paste_acro: "Вставьте данные из калькулятора акробатики",
                plan: "Программа турнира",
                show_sportsmen_only: "Показывать только спортсменов",
                show_summary: "Показывать только количество",
                sub: "зап", // substitute
                tours: "Туры",
            },
            messages: {
                bulk_tour_init_status: (idx, n_tours, failures) => {
                    if (failures > 0) {
                        return `Инициализация первых туров: ${idx}/${n_tours} (${failures} ошиб${chooseEnding(
                            "ка",
                            "ки",
                            "ок",
                        )})`;
                    } else {
                        return `Инициализация первых туров: ${idx}/${n_tours}`;
                    }
                },
                invalid_passcode: "Введён неверный код потверждения",
            },
            menu: {
                competition_report: "Протокол соревнований",
                discipline_results: "Результаты дисциплины",
                import_export: "Импорт / экспорт",
                manage_clubs: "Управление клубами",
                manage_competition_plan: "Программа соревнований",
                manage_disciplines: "Управление дисциплинами",
                manage_judges: "Управление судьями",
                manage_participants: "Управление спортсменами",
                manage_tours: "Управление турами",
                start_list: "Стартовый лист",
            },
            phrases: {
                n_participants: n => `${n} участник${chooseEnding(n, "", "а", "ов")}`,
                n_participations: n => `${n} участи${chooseEnding(n, "е", "я", "й")}`,
                n_sportsmen: (n, s) => {
                    let result = `${n} спортсмен${chooseEnding(n, "", "а", "ов")}`;
                    if (s > 0) {
                        result += ` (+${s} запасн${chooseEnding(s, "ой", "ых", "ых")})`;
                    }
                    return result;
                },
                n_sportsmen_short: (n, s) => {
                    let result = `${n} спортсмен${chooseEnding(n, "", "а", "ов")}`;
                    if (s > 0) {
                        result += ` (+${s} зап.)`;
                    }
                    return result;
                },
                total_n_participants: n =>
                    `Итого ${n} участник${chooseEnding(n, "", "а", "ов")}`,
            },
            "judging-tabs": {
                "tour-admin": "Управление",
                heats: "Заходы",
                "results-1": "Краткая таблица",
                "results-2": "Средняя таблица",
                "results-3": "Подробная таблица",
                "discipline-results": "Результаты дисциплины",
            },
        },
        errors: {
            admin: {
                load_syntax_error: "Некорректный формат данных",
            },
            api: {
                duplicated_external_id:
                    "В данных имеются записи с повторяющимимся external_id",
                unable_to_get: wanted => `Невозможно получить ${wanted} из запроса`,
            },
            auth: {
                already_authenticated: [
                    "Не удалось авторизовать устройство",
                    "Попробуйте обновить страницу",
                ],
                invalid_signature: [
                    "Запрос имеет неверную подпись",
                    "Попробуйте обновить страницу",
                ],
                localhost_only: [
                    "Действие недоступно",
                    "Данное действие можно осуществить только на компьютере, на котором запущена система",
                ],
                not_authenticated: [
                    "Действие недоступно",
                    "Данное устройство не авторизовано для выполнения запрошенного действия",
                ],
            },
            club: {
                delete_with_participants:
                    "Невозможно удалить клуб, к которому привязаны участники",
                empty_name: "Название клуба не может быть пустым",
            },
            competition: {
                delete_non_empty:
                    "Невозможно удалить соревнование, содержащее дисциплины, клубы или судей",
            },
            competition_plan: {
                too_many_tours: d => [
                    "Ошибка в программе соревнований",
                    `В дисциплине ${d} содержится больше туров, чем создано в системе`,
                ],
                invalid_discipline_found:
                    "Программа соревнований содержит туры, отсутствующие в системе",
            },
            demo_version: {
                runs: n => [
                    "Ограничение демо-версии",
                    `В демо-версии не допускается запуск туров с\xa0количеством участников более ${n}.`,
                ],
            },
            discipline: {
                change_judges_with_finalized_tour:
                    "Невозможно изменить состав судей для дисциплины, содержащей финализированные туры",
                delete_with_participants:
                    "Невозможно удалить дисциплину, содержащую участников",
                delete_with_tours: "Невозможно удалить дисциплину, содержащую туры",
                empty_name: "Название дисциплины не может быть пустым",
            },
            discipline_judge: {
                delete_with_finalized:
                    "Невозможно удалить судью, у корого есть финализированне туры",
                delete_with_scores:
                    "Невозможно удалить судью принявшего участие в судействе хотя бы одного тура",
                repeating_judge: name =>
                    `${name} встречается в списке судей более одного раза`,
            },
            global: {
                internal_server_error: m => ["Ошибка на сервере", m],
                invalid_sp: "Неверно указан приоритет при сортировке",
                no_connection: [
                    "Отсутствует соединение с сервером",
                    "проверьте своё подключение",
                ],
            },
            import: {
                wrong_scoring_system:
                    "Импортируемая система судейства не соответствует системе судейства соревнований",
            },
            judge: {
                delete_with_disciplines:
                    "Невозможно удалить судью, входящего в судейскую бригаду хотя бы одной дисциплины",
                empty_name: "Имя судьи не может быть пустым",
            },
            participant: {
                delete_with_finalized_tours:
                    "Невозможно удалить участника, принявшего участие хотя бы в одном финализированном туре",
                invalid_sp: "Неверно указан номер участника",
            },
            program: {
                empty_name: "Название программы не может быть пустым",
                wrong_participant: "Нельзя загрузить программу другого участника",
            },
            run: {
                bad_status: "Некорректный статус",
                set_status_on_finalized:
                    "Невозможно изменить статус захода финализинованного тура",
                modify_finalized: "Невозможно изменить данные финализинованного тура",
            },
            score: {
                score_not_exist:
                    "Попытка получить значение несуществующей оценки судьи",
                update_on_finalized_tour:
                    "Невозможно изменить оценку в финализированном туре",
            },
            tour: {
                add_before_finalized:
                    "Невозможно добавить новый тур перед финализированным",
                delete_finalized: "Невозможно удалить финализированный тур",
                delete_in_competition_plan:
                    "Невозможно удалить тур, присутствующий в программе соревнований",
                empty_name: "Название тура не может быть пустым",
                init_finailzed: "Невозможно пересоздать финализированный тур",
                invalid_add_after_id: "Попытка добаить тур в несуществующее место",
                invalid_scoring_system: "Выбрана недопустимая система судейства",
                invalid_num_advances: "Некорректное значение квоты вывода",
                load_to_non_empty: d => [
                    "Невозможно загрузить туры для дисциплины",
                    `Дисциплина ${d} уже содержит туры`,
                ],
                next_is_finailzed: "Следующий тур не должен быть финализирован",
                no_next_tour: "Данный тур последний в программе соревнований",
                not_in_competition_plan:
                    "Данный тур не содержится в программе соревнований",
                participants_per_heat:
                    "Некорректное занчение количества участников в заходе",
                prev_not_finailzed: "Предыдущий тур должен быть финализирован",
                start_finalized: "Невозможно запустить финализированный тур",
                update_finalized:
                    "Для финализированного тура не допускается изменение квоты вывода, типа тура или системы судейства",
            },
        },
        global: {
            access_levels: {
                admin: "Администратор (полный доступ)",
                any_judge: "Любой судья (запасной планшет)",
                none: "Нет доступа",
                presenter: "Ведущий / оператор экрана",
            },
            buttons: {
                add: "Добавить",
                close: "Закрыть",
                continue: "Продолжить",
                deselect_all: "Снять все",
                edit: "Редактировать",
                delete: "Удалить",
                discard: "Отменить",
                load: "Загрузить",
                save: "Сохранить",
                select_all: "Выбрать все",
                submit: "Сохранить",
            },
            labels: {
                browse: "Обзор...",
                connecting: "Подключение к сети",
                connection_problem: "Проблемы с сетью",
                connection_problem_data_pending:
                    "Проблемы с сетью. Не обновляйте и не закрывайте страницу!",
                data_pending:
                    "Данные отправляются. Не обновляйте и не закрывайте страницу!",
                yes: "Да",
                no: "Нет",
            },
            messages: {
                connection_error: "Похоже, имеются проблемы с сетью",
                error_header: "Ошибка",
                success: "Операция успешно завершена",
            },
            phrases: {
                heat_n: n => `Заход №${n}`,
                judge_n: n => `Линейный судья №${n}`,
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
            },
            statuses: {
                OK: "Без нарушений",
                NP: "Пара не выступила (без дисквалификации)",
                DQ: "Дисквалификация",
            },
        },
        judging: {
            buttons: {
                close_actions_menu: "Закрыть это меню",
                confirm_all: "Подтвердить все оценки",
                confirm_score: "Зафиксировать",
                edit_acrobatic_override: "Изменить",
                init_tour: "Пересоздать тур",
                finalize_tour: "Финализировать",
                move_to_position: pos => `На ${pos} позицию в заходе`,
                reset_acrobatic_override: "Сброс",
                shuffle_heats: "Перемешать заходы",
                start_tour: "Начать тур",
                stop_tour: "Остановить тур",
                reset_score: "Сбросить оценки",
                unconfirm_all: "Открыть все оценки",
            },
            confirms: {
                confirm_all:
                    "Вы действительно хотите подтвердить все оценки этого судьи?",
                finalize_tour: "Вы действительно хотите финализировать этот тур?",
                init_tour: "Вы действительно хотите пересоздать этот тур?",
                load_program:
                    "Вы действительно хотите перезагрузить программу для этого участника?",
                reset_judge_scores:
                    "Вы действительно хотите очистить все оценки судьи?",
                shuffle_heats: "Вы действительно хотите перемешать заходы?",
                stop_tour: "Вы действительно хотите остановить этот тур?",
                reset_score: "Вы действительно хотите сбросить оценки судей?",
                unconfirm_all:
                    "Вы действительно хотите снять подтверждение cо всех оценок этого судьи?",
            },
            headers: {
                acrobatic_overrides: "Корректировки базовых оценок акробатики",
            },
            labels: {
                acro_description: "Описание трюка",
                acro_idx: "№ трюка",
                acrobatics: "Акробатика",
                actions: "",
                club: "Клуб",
                confirmed: "Зафиксировано",
                heat: "Заход",
                new_score: "Корр.",
                number: "№",
                old_score: "База",
                participant_name: "Участник",
                status: "Статус",
                total_score: "Сумма баллов",
            },
        },
        models: {
            club: {
                name: "Название клуба",
                city: "Город",
                external_id: "Внешний ID",
            },
            competition: {
                active: "Активно",
                date: "Дата",
                info: "Дополнительная информация для протокола",
                info_item_title: "Заголовок",
                info_item_value: "Значение",
                name: "Название",
                rules_set: "Система судейства",
            },
            competition_plan_item: {
                discipline: "Дисциплина",
                estimated_beginning: "Начало",
                estimated_duration: "Длительность",
                name: "Название",
                sp: "Приоритет",
                tour: "Тур",
                verbose_name: "Название",
            },
            discipline: {
                discipline_judges: "Судьи",
                external_id: "Внешний ID",
                name: "Название дисциплины",
                sp: "Приоритет",
            },
            discipline_judge: {
                roles: {
                    acro_judge: "А",
                    dance_judge: "T",
                    head_judge: "Гл",
                    tech_judge: "Тех",
                },
                roles_legend: (
                    <table className="w-100">
                        <tbody>
                            <tr>
                                <td className="w-25">Гл — главный судья</td>
                                <td className="w-25">Т — судья танца</td>
                                <td className="w-25">А — судья акробатики</td>
                                <td className="w-25">Тex — технический судья</td>
                            </tr>
                        </tbody>
                    </table>
                ),
            },
            judge: {
                category: "Категория",
                external_id: "Вн. ID",
                name: "Ф. И. О.",
                number: "Номер",
                role: "Роль в судействе",
                role_description: "Должность",
                sp: "Приоритет",
            },
            participant: {
                acro_description: "Описание трюка",
                acro_descriptions: "Описание трюков",
                acro_score: "Оценка",
                acrobatics: "Акробатика",
                club_name: "Клуб",
                club_city: "Город",
                coaches: "Тренеры",
                discipline_name: "Дисциплина",
                first_name: "Имя",
                gender: "Пол",
                gender_f: "Ж",
                gender_m: "М",
                general_info: "Основная информация",
                formation_name: "Название команды формейшн",
                last_name: "Фамилия",
                name: "Участник",
                number: "Номер",
                programs: "Программы",
                sportsman: "Спортсмен",
                sportsmen: "Спортсмены",
                sportsmen_year_of_birth: "Г.р.",
                substitute_n: "Осн.",
                substitute_y: "Зап.",
                year_of_birth: "Год рождения",
                yob: "Г.р.",
            },
            program: {
                default_for: "По умолчанию",
                name: "Название программы",
            },
            tour: {
                default_program: "Акробатика по умолчанию",
                is_hope_tour: "Тур «Надежды»",
                name: "Название тура",
                num_advances: "Квота вывода",
                participants_per_heat: "Участников в заходе",
                scoring_system_name: "Система судейства",
            },
        },
        screen_operator: {
            buttons: {
                reset_heat: "Сброс номера захода",
                reset_place: "Сброс места",
            },
            headers: {
                discipline: "Дисциплина",
                heat: "Заход",
                places: "Места для вывода",
                tour: "Тур",
            },
            labels: {
                place: "место",
                heat: "заход",
            },
        },
        presenter: {
            headers: {
                clubs: "Клубы-участники",
                heats: "Заходы",
                info: "Информация",
                judges: "Судьи",
                plan: "Программа",
                results: "Результаты",
            },
            labels: {
                discipline: "Дисциплина",
                disqualified: "Дискв.",
                enable_auto_heat: "Переключать заходы автоматически",
                estimated_beginning: "Начало",
                estimated_duration: "Длит.",
                no_active_tour: "Нет активного тура",
                no_runs: "В этом туре нет заходов",
                place: "место",
                tour: "Тур",
            },
        },
        results: {
            alerts: {
                not_finalized: "Данные результаты не являются окончательными.",
            },
            buttons: {
                print: "Печать",
                simple_view: "Упрощенная таблица",
                verbose_view: "Подробная таблица",
            },
        },
        start_page: {
            headers: {
                select_competition: "Выберите соревнование для продолжения",
                select_role: "Выберите свою роль",
            },
            buttons: {
                request_access: "Запросить доступ",
            },
            messages: {
                access_request:
                    "Данное устройство не авторизовано для работы с этим соревнованием",
                client_id: id => `ID устройства: ${id}`,
                competitions_management_link: link => (
                    <span>
                        Управление соревнованиями находится по адресу&nbsp;
                        <a href={link}>{link}</a>
                    </span>
                ),
                pending_access_request: "Ожидается авторизация устройства ...",
                single_judge_access:
                    "Этот планшет авторизован для работы от имени следующего судьи",
                no_competitions: "Нет активных соревнований",
            },
            roles: {
                administrator: "Администратор",
                presenter: "Ведущий",
                screen: "Экран",
                screen_operator: "Оператор экрана",
            },
        },
        tablet: {
            alerts: {
                has_unconfirmed_scores:
                    "Имеются незафиксированные оценки судей в последнем заходе.",
            },
            buttons: {
                finalize_tour: "Финализировать тур",
                finalize_tour_and_start_next:
                    "Финализировать тур и перейти к следующему",
                next_heat: "След. заход",
                next_heat_short: ">>",
                not_performed: "Невыход на площадку",
                performed: "Отмена невыхода на площадку",
                prev_heat_short: "<<",
                reset_stopwatch: "Сброс",
                start_stopwatch: "Старт",
                stop_stopwatch: "Стоп",
                stop_tour: "Завершить тур",
                stop_tour_and_start_next: "Завершить тур и перейти к следующему туру",
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
            headers: {
                acro_n: n => `Акробатика №${n + 1}`,
                heat: "Заход",
                presenter: "Ведущий",
                select_page: "Страница",
            },
            messages: {
                not_judging_discipline: "Вы сейчас не судите",
                not_judging_participant: "Вы не оцениваете этого участника",
                not_judging_tour: "Вы не оцениваете этот тур",
                not_performing: "Не выступает",
            },
            pages: {
                acrobatics: "Акробатика",
                actions: "Действия",
                dance: "Танец",
                heats: "Заходы",
                results: "Результаты",
            },
        },

        scoring_systems: {
            rosfarr: {
                tablet: {
                    acro_judge: {
                        fall_down: "Падения (−30)",
                    },
                    dance_judge: {
                        acrobatics: "Акробатика",
                        big_mistakes: "Большие ошибки (−30)",
                        composition: "Композиция",
                        dance_figs: "Танцевальные фигуры",
                        dance_tech: "Техника танцевания",
                        form_fall_down: "Падения (-3)",
                        form_mistakes: "Ошибки (-2)",
                        form_small_mistakes: "Маленькие ошибки (-2)",
                        form_big_mistakes: "Большие ошибки (-3)",
                        fw_man: "Основной ход, партнёр (сбавка в %)",
                        fw_woman: "Основной ход, партнёрша (сбавка в %)",
                        impression: "Общее впечатление",
                        points: "Оценка",
                        small_mistakes: "Маленькие ошибки (-5)",
                    },
                    global: {
                        total_score: "Сумма баллов",
                    },
                    head_judge: {
                        acrobatic_overrides: "Корректировки акробатики",
                        black_card: "-100",
                        dance_judge_scores: "Оценки линейных судей",
                        ok: "OK",
                        penalty_type: "Штрафные санкции",
                        previous_cards: "Предыдущие карточки",
                        red_card: "-30",
                        yellow_card: "-3",
                        form_yellow_card: "-5",
                        form_red_card: "-15",
                    },
                    tech_judge: {
                        jump_steps: "Основные ходы",
                        reset_to_n: n => `Сброс на ${n}`,
                        timing: "Длительность",
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
                        i: "ОВ",
                        m: "Ош",
                        p: "М",
                        sm: "МО",
                        t: "Σ",
                    },
                    headers: {
                        participants_advanced: "Прошли в следующий тур",
                        participants_disqualified: "Дисквалификация",
                        participants_not_advanced: "Не прошли в следующий тур",
                        participants_not_performed: "Не выступали",
                    },
                    labels: {
                        acro_score: "Результат акро",
                        acrobatics: "Акробатика",
                        acrobatics_verbose: "Акробатика (заявка/факт)",
                        card: "Штраф",
                        disqualified: "Дисквалифицирован",
                        fw_score: "Результат ТН",
                        fw_score_short: "ТН",
                        info: "Участник, результат",
                        next_tour: "Следующий тур",
                        not_performed: "Не принимал участие",
                        number: "№",
                        participant_club: "Клуб",
                        participant_coaches: "Тренеры",
                        participant_name: "Участник",
                        penalty: "Штраф главного судьи",
                        place: "Место",
                        sportsmen: "Спортсмены",
                        sportsmen_year_of_birth: "Г.р.",
                        total_score: "Итог",
                    },
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
