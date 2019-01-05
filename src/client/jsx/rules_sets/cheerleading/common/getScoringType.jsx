export default function getScoringType(discipline_judge_role, scoring_system_name) {
    switch (discipline_judge_role) {
        case "dance_judge":
            return scoring_system_name.split(".")[1];
        case "tech_judge":
            return "tech";
        case "head_judge":
            return "head";
    }
    return null;
}
