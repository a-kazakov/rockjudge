import Api from "common/server/Api";
import storage from "common/server/storage";
import websocket from "common/server/websocket";

import ScreenManifest from "common/ScreenManifest";

import loader from "./loader";

export default class Screen extends React.PureComponent {
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
            competition: null,
        };
    }

    componentWillMount() {
        this.loadData();
        this._websockets = [
            websocket.addListener("db_update", this.reloadFromStorage),
            websocket.addListener("reload_data", this.loadData),
        ];
    }
    componentWillUnmount() {
        for (const md of this._websockets) {
            websocket.removeListener(md);
        }
    }

    loadData = () => {
        Api("competition.get", {
            competition_id: this.props.competitionId,
            children: {},
        })
            .addToDB("Competition", this.props.competitionId)
            .onSuccess(this.reloadFromStorage)
            .send();
    }
    reloadFromStorage = () => {
        const serialized = storage
            .get("Competition")
            .by_id(this.props.competitionId)
            .serialize({});
        this.setState({
            competition: serialized,
        });
    }

    render() {
        if (this.state.competition === null) {
            return (
                <div />
            );
        }
        if (!loader.loaded) {
            setTimeout(() => this.forceUpdate(), 1000);
            return (
                <div />
            );
        }
        const RenderingComponent = loader.component;
        return (
            <RenderingComponent
                competition={ this.state.competition }
            />
        );
    }
}

Screen.displayName = "Screen";
