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
        case "rosfarr.am_final_fw":
        case "rosfarr.am_final_acro":
            return "dance_halved";
        default:
            return "dance";
        }
    case "acro_judge":
        switch (scoring_system_name) {
        case "rosfarr.am_final_fw":
            return "dance_halved";
        default:
            return "acro";
        }
    case "tech_judge":
        return "tech";
    case "head_judge":
        return "head";
    }
}
