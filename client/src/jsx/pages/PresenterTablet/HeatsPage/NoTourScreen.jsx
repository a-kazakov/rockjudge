import _ from "l10n";

export default class NoTourScreen extends React.PureComponent {
    render() {
        return (
            <div className="heats">
                <div className="splash-screen">
                    <div>
                        { _("presenter.labels.no_active_tour") }
                    </div>
                    <div className="spacer" />
                </div>
            </div>
        );
    }
}

NoTourScreen.displayName = "PresenterTablet_HeatsPage_NoTourScreen";
