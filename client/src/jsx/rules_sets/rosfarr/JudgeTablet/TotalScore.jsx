import _ from "l10n";

export default (props) => (
    <div className="total-score">
        { _("tablet.global.total_score") }: { props.score.data.total_score }
    </div>
);
