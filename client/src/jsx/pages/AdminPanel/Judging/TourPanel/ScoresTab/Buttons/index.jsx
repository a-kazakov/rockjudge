import _ from "l10n";

import Button from "./Button";

export default class Buttons extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tour: PT.shape({
                active: PT.bool.isRequired,
                finalized: PT.bool.isRequired,
            }).isRequired,
            onSignal: PT.func.isRequired,
        };
    }
    render() {
        if (this.props.tour.finalized) {
            return <div />
        }
        if (this.props.tour.active) {
            return (
                <div>
                    <Button
                        className="btn btn-danger"
                        label={ _("judging.buttons.stop_tour") }
                        signalMessage="stop_tour"
                        onSignal={ this.props.onSignal }
                    />
                </div>
            )
        }
        return (
            <div>
                <Button
                    className="btn btn-primary"
                    label={ _("judging.buttons.init_tour") }
                    signalMessage="init_tour"
                    onSignal={ this.props.onSignal }
                />
                <Button
                    className="btn btn-primary"
                    label={ _("judging.buttons.finalize_tour") }
                    signalMessage="finalize_tour"
                    onSignal={ this.props.onSignal }
                />
                <Button
                    className="btn btn-primary"
                    label={ _("judging.buttons.shuffle_heats") }
                    signalMessage="shuffle_heats"
                    onSignal={ this.props.onSignal }
                />
                <Button
                    className="btn btn-success"
                    label={ _("judging.buttons.start_tour") }
                    signalMessage="start_tour"
                    onSignal={ this.props.onSignal }
                />
            </div>
        )
    }
}

Buttons.displayName = "AdminPanel_Judging_TourPanel_ScoresTab_Buttons";
