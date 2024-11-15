import { React } from "HostModules";

import _ from "l10n";

import getCardReasons from "./getCardReasons";

export default function getCard(run_result, tour, params = {}) {
    const { verbose, reasons_style, p_class } = Object.assign(
        {
            verbose: false,
            reasons_style: {},
            p_class: "",
        },
        params,
    );
    if (run_result.extra_data.status !== "OK") {
        return <p className={p_class}>—</p>;
    }
    const loc_prefix = verbose ? "long" : "short";
    const card = run_result.extra_data.card;
    const texts = getCardReasons(tour.scoring_system_name)
        .filter(cr => run_result.extra_data.card_reasons[cr])
        .map(cr => _(`card_reasons.${loc_prefix}.${cr.toLowerCase()}`));
    let result = [];
    if (card === "OK") {
        result.push(
            <p className={p_class} key="base">
                {_(`cards.${loc_prefix}.${card}`)}
            </p>,
        );
    } else {
        result.push(
            <p className={p_class} key="C">
                <strong>{_(`cards.${loc_prefix}.${card}`)}</strong>
            </p>,
        );
    }
    result = result.concat(
        texts.map((text, idx) => (
            <p className={p_class} key={idx} style={reasons_style}>
                {text}
            </p>
        )),
    );
    return result;
}
