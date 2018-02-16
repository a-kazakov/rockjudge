export default function getScoringType(discipline_judge, scoring_system_name) {
    switch (discipline_judge.role) {
    case "dance_judge":
        switch (scoring_system_name) {
        case "skating.qualification_simple":
            return "qualification_simple";
        default:
            return null;
        }
    case "head_judge":
        return "head";
    default:
        return null;
    }
}
