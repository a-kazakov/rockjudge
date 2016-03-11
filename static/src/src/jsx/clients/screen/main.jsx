import { _ } from "i10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";


export class ScreenManifest {
    constructor(raw_manifest) {
        this.raw_data = raw_manifest;
        this.idx_by_id = {};
        this.raw_data.screens.forEach((item, idx) => this.idx_by_id[item.id] = idx);
    }
    getScreenDataById(id, is_default=false) {
        let result = this.raw_data.screens[this.idx_by_id[id]];
        if (!result) {
            if (is_default) {
                return this.raw_data.screens[0];
            }
            return this.getDefaultScreenData();
        }
        return result;
    }
    getDefaultScreenData() {
        return this.getScreenDataById(this.raw_data["default"], true);
    }
}


export class Screen extends React.Component {
    static get propTypes() {
        return {
            competition_id: React.PropTypes.number.isRequired,
            manifest: React.PropTypes.object.isRequired,
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
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
    }
    loadData() {
        Api("competition.get", { competition_id: this.props.competition_id, children: {} })
            .addToDB("Competition", this.props.competition_id)
            .onSuccess(this.reloadFromStorage.bind(this))
            .send();
    }
    reloadFromStorage() {
        let new_data = storage.get("Competition").by_id(this.props.competition_id).serialize({}).screen_data;
        if (new_data.screen_id !== this.state.current_screen.id && new_data.screen_id) {
            this.changeScreen(new_data.screen_id);
        }
    }
    getUrlByScreenData(data) {
        return "/media/screen/" + data.template + "#" + this.props.competition_id;
    }
    changeScreen(new_id) {
        this.setState({
            next_screen: this.manifest.getScreenDataById(new_id),
        });
    }
    switchFrames() {
        this.setState({
            current_screen: this.state.next_screen,
            next_screen: null,
        });
    }
    render() {
        return <div className="outer">
            <iframe src={ this.getUrlByScreenData(this.state.current_screen) }
                    key={ this.getUrlByScreenData(this.state.current_screen) } />
            { this.state.next_screen
                ? <iframe src={ this.getUrlByScreenData(this.state.next_screen) }
                          key={ this.getUrlByScreenData(this.state.next_screen) }
                          onLoad={ this.switchFrames.bind(this) } />
                : null }
        </div>
    }
}
