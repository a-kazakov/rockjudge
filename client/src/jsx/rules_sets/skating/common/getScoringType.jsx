export default function getScoringType(discipline_judge_role, scoring_system_name) {
    switch (discipline_judge_role) {
    case "dance_judge":
        switch (scoring_system_name) {
        case "skating.qualification_simple":
            return "qualification_simple";
        case "skating.final_simple":
            return "final_simple";
        case "skating.final_3d":
            return "final_3d";
        default:
            return null;
        }
    case "head_judge":
        return "head";
    default:
        return null;
    }
}
