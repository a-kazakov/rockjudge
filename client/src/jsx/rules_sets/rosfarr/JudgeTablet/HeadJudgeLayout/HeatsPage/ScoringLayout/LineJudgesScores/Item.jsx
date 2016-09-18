export default function Item(props) {
    const confirmed = props.score && props.score.confirmed;
    return (
        <td className={ confirmed ? "confirmed" : "" }>
            { props.score
                ? props.score.data.total_score.toFixed(2)
                : "—" }
        </td>
    );
}
