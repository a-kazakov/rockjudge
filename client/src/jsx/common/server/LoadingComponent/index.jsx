import DataLoader from "./DataLoader";

export default class LoadingComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this._loader_inited = false;
    }

    componentDidMount() {
        this._initLoader();
    }
    componentWillReceiveProps(nextProps) {
        if (!this._loader_inited) {
            return;
        }
        for (const key of Object.keys(this.API_MODELS)) {
            const params = this.API_MODELS[key];
            const this_model_id = params.model_id_getter(this.props);
            const next_model_id = params.model_id_getter(nextProps);
            if (this_model_id !== next_model_id) {
                if (this._loaders[key] !== null) {
                    this._loaders[key].destroy();
                }
                this.setState({[key]: null});
                if (next_model_id !== null) {
                    this._loaders[key] = new DataLoader(
                        data => this._handleStateUpdate(key, data),
                        params.method,
                        params.model_type,
                        next_model_id,
                        params.schema,
                        this.CLASS_ID,
                    )
                } else {
                    this._loaders[key] = null;
                }
                if (this.onIdChanged) {
                    this.onIdChanged(key, next_model_id, nextProps);
                }
            }
        }
    }
    componentWillUnmount() {
        if (!this._loader_inited) {
            return;
        }
        for (const key of Object.keys(this.API_MODELS)) {
            if (this._loaders[key] !== null) {
                this._loaders[key].destroy();
            }
        }
    }

    _initLoader() {
        this._loader_inited = true;
        this._loaders = {};
        for (const key of Object.keys(this.API_MODELS)) {
            const params = this.API_MODELS[key];
            const model_id = params.model_id_getter(this.props);
            if (model_id !== null) {
                this._loaders[key] = new DataLoader(
                    data => this._handleStateUpdate(key, data),
                    params.method,
                    params.model_type,
                    model_id,
                    params.schema,
                    this.CLASS_ID,
                );
            } else {
                this._loaders[key] = null;
            }
        }
    }
    _handleStateUpdate = (key, data) => {
        const upd = {[key]: data};
        let add = {};
        if (this.getAdditionalStateUpdate) {
            add = this.getAdditionalStateUpdate(Object.assign({}, this.state, upd));
        }
        this.setState(Object.assign({}, upd, add));
    };
}
