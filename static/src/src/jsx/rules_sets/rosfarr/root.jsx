import ResultsTable1 from "ResultsTable1";
import ResultsTable2 from "ResultsTable2";
import ResultsTable3 from "ResultsTable3";
import DisciplineResultsTable from "DisciplineResultsTable";
import JudgeTablet from "JudgeTablet";
import AdminScoreInput from "AdminScoreInput";
import getJudgeTableMark from "getJudgeTableMark";

import { setup } from "HostModules";

const response = window.registerRulesSet("RosFARR", {
    tour_results_table_1: ResultsTable1,
    tour_results_table_2: ResultsTable2,
    tour_results_table_3: ResultsTable3,
    discipline_results_table: DisciplineResultsTable,
    judge_tablet: JudgeTablet,
    admin_score_input: AdminScoreInput,
    get_judge_table_mark: getJudgeTableMark,
});

setup(response);
