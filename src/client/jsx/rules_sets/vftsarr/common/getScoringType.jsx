export default function getScoringType(discipline_judge_role, scoring_system_name) {
    switch (discipline_judge_role) {
        case "dance_judge":
            switch (scoring_system_name) {
                case "vftsarr.formation":
                case "vftsarr.formation_acro":
                    return "formation";
                case "vftsarr.formation_simplified":
                    return "formation_simplified";
                case "vftsarr.dance_extended":
                case "vftsarr.acro_extended":
                case "vftsarr.am_final_fw":
                case "vftsarr.am_final_acro":
                    return "dance_extended";
                case "vftsarr.simplified":
                    return "simplified";
                case "vftsarr.solo":
                case "vftsarr.solo_rough":
                    return "solo";
                case "vftsarr.solo_final":
                    return "solo_final";
                default:
                    return "dance";
            }
        case "acro_judge":
            switch (scoring_system_name) {
                case "vftsarr.am_final_fw":
                    return "dance_extended";
                case "vftsarr.formation_acro":
                case "vftsarr.am_final_acro":
                case "vftsarr.am_qual":
                case "vftsarr.acro":
                case "vftsarr.acro_extended":
                    return "acro";
                default:
                    return null;
            }
        case "tech_judge":
            return "tech";
        case "head_judge":
            return "head";
    }
    return null;
}
