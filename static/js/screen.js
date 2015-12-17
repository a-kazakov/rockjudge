"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenManifest = (function () {
    function ScreenManifest(raw_manifest) {
        var _this = this;

        _classCallCheck(this, ScreenManifest);

        this.raw_data = raw_manifest;
        this.idx_by_id = {};
        this.raw_data.screens.forEach(function (item, idx) {
            return _this.idx_by_id[item.id] = idx;
        });
    }

    _createClass(ScreenManifest, [{
        key: "getScreenDataById",
        value: function getScreenDataById(id) {
            var is_default = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var result = this.raw_data.screens[this.idx_by_id[id]];
            if (!result) {
                if (is_default) {
                    return this.raw_data.screens[0];
                }
                return this.getDefaultScreenData();
            }
            return result;
        }
    }, {
        key: "getDefaultScreenData",
        value: function getDefaultScreenData() {
            return this.getScreenDataById(this.raw_data["default"], true);
        }
    }]);

    return ScreenManifest;
})();

var Screen = (function (_React$Component) {
    _inherits(Screen, _React$Component);

    function Screen(props) {
        _classCallCheck(this, Screen);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Screen).call(this, props));

        _this2.manifest = new ScreenManifest(_this2.props.manifest);
        _this2.state = {
            current_screen: _this2.manifest.getDefaultScreenData(),
            next_screen: null
        };
        _this2.loadData();
        message_dispatcher.addListener("db_update", _this2.reloadFromStorage.bind(_this2));
        message_dispatcher.addListener("reload_data", _this2.loadData.bind(_this2));
        return _this2;
    }

    _createClass(Screen, [{
        key: "loadData",
        value: function loadData() {
            Api("competition.get", { competition_id: this.props.competition_id, children: {} }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var new_data = storage.get("Competition").by_id(this.props.competition_id).serialize({}).screen_data;
            if (new_data.screen_id != this.state.current_screen.id) {
                this.changeScreen(new_data.screen_id);
            }
        }
    }, {
        key: "getUrlByScreenData",
        value: function getUrlByScreenData(data) {
            return "/media/screen/" + data.template + "#" + this.props.competition_id;
        }
    }, {
        key: "changeScreen",
        value: function changeScreen(new_id) {
            this.setState({
                next_screen: this.manifest.getScreenDataById(new_id)
            });
        }
    }, {
        key: "switchFrames",
        value: function switchFrames() {
            this.setState({
                current_screen: this.state.next_screen,
                next_screen: null
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "outer" },
                React.createElement("iframe", { src: this.getUrlByScreenData(this.state.current_screen),
                    key: this.getUrlByScreenData(this.state.current_screen) }),
                this.state.next_screen ? React.createElement("iframe", { src: this.getUrlByScreenData(this.state.next_screen),
                    key: this.getUrlByScreenData(this.state.next_screen),
                    onLoad: this.switchFrames.bind(this) }) : null
            );
        }
    }]);

    return Screen;
})(React.Component);
//# sourceMappingURL=screen.js.map