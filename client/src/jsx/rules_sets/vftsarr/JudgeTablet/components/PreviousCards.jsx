import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n/index";

export default class PreviousCards extends React.Component {
    static propTypes = {
        run: PT.object.isRequired,
        tourResults: PT.shape({
            runs_results: PT.object.isRequired,
        }).isRequired,
    };

    renderCard = (card_info, idx) => {
        const { card, tour_id } = card_info;
        const tour = this.props.run.global_storage.get("Tour", tour_id);
        return (
            <tr key={idx}>
                <td className="w-10 text-center">
                    <strong>{_(`results.cards.short_${card}`)}</strong>
                </td>
                <td>{tour.name}</td>
            </tr>
        );
    };
    render() {
        const cards =
            this.props.tourResults.runs_results[this.props.run.id]?.extra_data
                .prev_cards || [];
        if (cards.length === 0) {
            return <div />;
        }
        return (
            <div>
                <h3>{_("tablet.head_judge.previous_cards")}</h3>
                <table className="full-width">
                    <tbody>{cards.map(this.renderCard)}</tbody>
                </table>
            </div>
        );
    }
}
