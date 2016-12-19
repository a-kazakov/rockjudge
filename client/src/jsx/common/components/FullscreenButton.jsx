import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

export default class FullscreenButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this._top_node = window.document.documentElement;
        this._enter_func = (
            this._top_node.requestFullscreen ||
            this._top_node.mozRequestFullScreen ||
            this._top_node.msRequestFullscreen ||
            this._top_node.webkitRequestFullscreen ||
            this._top_node.webkitEnterFullscreen
        );
        this._exit_func = (
            window.document.cancelFullScreen ||
            window.document.mozCancelFullScreen ||
            window.document.msCancelFullScreen ||
            window.document.webkitCancelFullScreen
        );
    }

    checkInFullScreen() {
        return (
            window.document.fullscreenElement ||
            window.document.mozFullScreenElement ||
            window.document.webkitFullscreenElement
        );
    }
    checkFullScreenSupport() {
        return this._enter_func && this._exit_func;
    }

    handleToggleFullScreen = () => {
        if (!this.checkInFullScreen()) {
            this._enter_func.apply(this._top_node);
        } else {
            this._exit_func.apply(window.document);
        }
    }


    render() {
        if (!this.checkFullScreenSupport()) {
            return null;
        }
        return (
            <div
                className="btn-fullscreen"
                { ...onTouchEndOrClick(this.handleToggleFullScreen) }
            >
                <div />
            </div>
        );
    }
}

FullscreenButton.displayName = "common_components_FullscreenButton";
