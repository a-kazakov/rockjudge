import checkSS from "common/checkSS";

const ARR_CARD_REASONS = {
    "base": {
        "DURATION": 10,
        "BASIC_STEPS_COUNT": 20,
        "COSTUME": 30,
        "MUSIC": 40,
        "OTHER": 1000,
    },
    "acro": {
        "ACRO_COUNT": 100,
        "NO_REQUIRED_ACRO": 110,
        "FORBIDDEN_ACRO": 120,
    },
    "formation": {
        "INCOMPLETE_COUPLE": 200,
    },
};

export default function getCardReasons(scoring_system_name) {
    const card_groups = ["base"];
    if (checkSS(scoring_system_name, "acro")) {
        card_groups.push("acro");
    }
    if (checkSS(scoring_system_name, "formation")) {
        card_groups.push("formation");
    }
    let pairs = [];
    for (const group_name of Object.keys(ARR_CARD_REASONS)) {
        if (!card_groups.includes(group_name)) {
            continue;
        }
        const group = ARR_CARD_REASONS[group_name];
        for (const reason of Object.keys(group)) {
            const priority = group[reason];
            pairs.push([reason, priority]);
        }
    }
    pairs.sort((a, b) => (a[1] - b[1]));
    return pairs.map(p => p[0]);
}
