export default function formatScore(score, template="$") {
    if (score == null) {
        return "—";
    }
    return template
        .replace("$", score)
        .replace("@", score.toFixed(1))
}
