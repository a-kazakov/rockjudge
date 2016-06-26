export default function getScoringType(discipline_judge, scoring_system_name) {
    switch (discipline_judge.role) {
    case "dance_judge":
        switch (scoring_system_name) {
        case "rosfarr.formation":
            return "formation";
        case "rosfarr.formation_acro":
            return "formation_acro";
        case "rosfarr.simplified":
            return "simplified";
        default:
            return "dance";
        }
    case "acro_judge":
        switch (scoring_system_name) {
        case "rosfarr.am_final_fw":
            return "dance";
        default:
            return "acro";
        }
    case "tech_judge":
        return "tech";
    case "head_judge":
        return "head";
    }
}
