export default function getScoringType(discipline_judge, scoring_system_name) {
    switch (discipline_judge.role) {
    case "dance_judge":
        switch (scoring_system_name) {
        case "vftsarr.formation":
        case "vftsarr.formation_acro":
            return "formation";
        case "vftsarr.simplified":
            return "simplified";
        case "vftsarr.solo":
        case "vftsarr.solo_rough":
            return "solo";
        default:
            return "dance";
        }
    case "acro_judge":
        switch (scoring_system_name) {
        case "vftsarr.am_final_fw":
            return "dance";
        case "vftsarr.formation_acro":
        case "vftsarr.am_final_acro":
        case "vftsarr.am_qual":
        case "vftsarr.acro":
            return "acro";
        default:
            return null
        }
    case "tech_judge":
        return "tech";
    case "head_judge":
        return "head";
    }
}
