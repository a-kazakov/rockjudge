const GROUPS = (function () {
    const raw_groups = {
        "formation": [
            "formation",
            "formation_acro",
            "formation_simplified",
        ],
        "acro": [
            "acro",
            "acro_extended",
            "am_qual",
            "am_final_acro",
            "formation_acro",
        ],
        "acro_6": [
            "am_final_acro",
        ],
        "acro_8": [
            "formation_acro",
        ],
        "rough": [
            "dance_rough",
            "solo_rough",
        ],
    };
    return new Map(Object.keys(raw_groups).map(key => [key, new Set(raw_groups[key])]));
})();
const BASE_PREFIX = "vftsarr.";

export default function checkSS(scoring_system_name, group) {
    if (!GROUPS.has(group)) {
        return false;
    }
    if (!scoring_system_name.startsWith(BASE_PREFIX)) {
        return false;
    }
    return GROUPS.get(group).has(scoring_system_name.slice(BASE_PREFIX.length));
}
