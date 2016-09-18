import Api from "common/server/Api";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";

import ScreenManifest from "common/ScreenManifest";

export default class Screen extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionId: PT.number.isRequired,
            manifest: PT.object.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.manifest = new ScreenManifest(this.props.manifest);
        this.state = {
            current_screen: this.manifest.getDefaultScreenData(),
            next_screen: null,
        }
        this.loadData();
        message_dispatcher.addListener("db_update", this.reloadFromStorage);
        message_dispatcher.addListener("reload_data", this.loadData);
    }

    loadData = () => {
        Api("competition.get", { competition_id: this.props.competitionId, children: {} })
            .addToDB("Competition", this.props.competitionId)
            .onSuccess(this.reloadFromStorage)
            .send();
    }
    reloadFromStorage = () => {
        let new_data = storage.get("Competition").by_id(this.props.competitionId).serialize({}).screen_data;
        if (new_data.screen_id !== this.state.current_screen.id && new_data.screen_id) {
            this.changeScreen(new_data.screen_id);
        }
    }

    getUrlByScreenData(data) {
        return `/media/screen/${data.template}#${this.props.competitionId}`;
    }
    changeScreen(new_id) {
        this.setState({
            next_screen: this.manifest.getScreenDataById(new_id),
        });
    }
    handleNextFrameLoaded = () => {
        this.setState({
            current_screen: this.state.next_screen,
            next_screen: null,
        });
    }

    renderNextScreen() {
        if (this.state.next_screen === null) {
            return null;
        }
        return (
            <iframe
                className="preloading"
                key={ this.getUrlByScreenData(this.state.next_screen) }
                src={ this.getUrlByScreenData(this.state.next_screen) }
                onLoad={ this.handleNextFrameLoaded }
            />
        );
    }
    render() {
        return (
            <div className="outer">
                <iframe
                    key={ this.getUrlByScreenData(this.state.current_screen) }
                    src={ this.getUrlByScreenData(this.state.current_screen) }
                />
                { this.renderNextScreen() }
            </div>
        );
    }
}

Screen.displayName = "Screen";
