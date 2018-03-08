import _ from "l10n";

export default class LastPage extends React.PureComponent {
    handleReturnToMainPage = () => {
        window.location.href = "/";
    };

    render() {
        return (
            <div className="body last-page">
                { _("tablet.global.last_page") }
                <button
                    type="button"
                    onClick={ this.handleReturnToMainPage }
                >
                    { _("tablet.buttons.return_to_main_page") }
                </button>
            </div>
        )
    }
}
