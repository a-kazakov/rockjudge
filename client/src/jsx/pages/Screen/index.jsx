import LoadingComponent from "common/server/LoadingComponent";

import ScreenManifest from "common/ScreenManifest";

import loader from "./loader";

export default class Screen extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionId: PT.number.isRequired,
            manifest: PT.object.isRequired,
        };
    }

    CLASS_ID = "screen";
    API_MODELS = {
        competition: {
            model_type: "Competition",
            model_id_getter: props => props.competitionId,
            schema: {}
        },
    };

    constructor(props) {
        super(props);
        this.manifest = new ScreenManifest(this.props.manifest);
        this.state = {
            competition: null,
        };
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
