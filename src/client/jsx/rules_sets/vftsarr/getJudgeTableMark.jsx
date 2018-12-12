function getJudgeTableMark(discipline_judge) {
    let result = discipline_judge.judge.number;
    if (discipline_judge.role === "acro_judge") {
        result += " (A)";
    }
    return result;
}

export default getJudgeTableMark;
