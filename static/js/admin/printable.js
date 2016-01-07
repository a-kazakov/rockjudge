"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Printable = (function (_React$Component) {
    _inherits(Printable, _React$Component);

    function Printable() {
        _classCallCheck(this, Printable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Printable).apply(this, arguments));
    }

    _createClass(Printable, [{
        key: "renderHeader",
        value: function renderHeader() {
            return this.props.header ? React.createElement(
                "div",
                { className: "p-header" },
                this.props.header
            ) : null;
        }
    }, {
        key: "renderTitle1",
        value: function renderTitle1() {
            return this.props.title1 ? React.createElement(
                "h1",
                null,
                this.props.title1
            ) : null;
        }
    }, {
        key: "renderTitle2",
        value: function renderTitle2() {
            return this.props.title2 ? React.createElement(
                "h2",
                null,
                this.props.title2
            ) : null;
        }
    }, {
        key: "renderTitle3",
        value: function renderTitle3() {
            return this.props.title3 ? React.createElement(
                "h3",
                null,
                this.props.title3
            ) : null;
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            return React.createElement(
                "div",
                { className: "p-content", ref: "body" },
                this.props.body
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "printable" },
                this.renderHeader(),
                this.renderTitle1(),
                this.renderTitle2(),
                this.renderTitle3(),
                this.renderBody()
            );
        }
    }, {
        key: "fetchPrintableData",
        value: function fetchPrintableData() {
            return this.refs.body.innerHTML;
        }
    }]);

    return Printable;
})(React.Component);
//# sourceMappingURL=printable.js.map