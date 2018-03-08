function genScale(type, user_params) {
    const optional = type[0] === "?";
    if (optional) {
        type = type.slice(1);
    }
    let result = [];
    switch (type) {
    case "reduction":
        result = [100, 75, 50, 25, 10, 5, 0].map(
            s => [s.toString(), `-${s}%`]
        );
        break;
    case "numbers": {
        const params = Object.assign({
            min: 0,
            max: 10,
            step: 1,
        }, user_params);
        const fraction_size = Math.abs(params.step - Math.round(params.step)) < 1e-5 ? 0 : 1;
        for (let score = params.min; score < (params.max + 1e-5); score += params.step) {
            const str = score.toFixed(fraction_size);
            result.push([str, str]);
        }
        break;
    }
    default:
        console.error(`Unknown scale type: ${type}`);
    }
    if (optional) {
        result = [["", "—"]].concat(result);
    }
    return result;
}

export default genScale;
