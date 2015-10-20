"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.Docx = function (fn) {
    return new DocxImpl(fn);
};

var DocxImpl = (function () {
    function DocxImpl(filename) {
        _classCallCheck(this, DocxImpl);

        this.filename = filename;
        this.header = "";
        this.subheader = null;
        this.body = "";
        this.orientation = "portrait";
        this.styles = {
            "body": {
                "font-size": "10pt",
                "font-family": "Calibri, Arial, sans-serif"
            },
            "table": {
                "border-collapse": "collapse",
                "width": "100%"
            },
            "tr": {
                "page-break-inside": "avoid"
            },
            "td, th": {
                "padding": "1pt 3pt"
            },
            "h1, h2, h3, h4, h5, h6": {
                "page-break-after": "avoid"
            },
            "h1": {
                "font-size": "20pt",
                "font-weight": "bold",
                "text-align": "center"
            },
            "p": {
                "margin": 0,
                "padding": 0
            },
            ".text-left": { "text-align": "left" },
            ".text-right": { "text-align": "right" },
            ".text-center": { "text-align": "center" },
            ".bordered-table td, .bordered-table th": {
                "border": "2px solid black"
            }
        };
        this.addWidthCss();
    }

    _createClass(DocxImpl, [{
        key: "addWidthCss",
        value: function addWidthCss() {
            for (var i = 1; i <= 100; ++i) {
                this.addStyle(".w-" + i, "width", i + "%");
            }
        }
    }, {
        key: "addStyle",
        value: function addStyle(selector, key, value) {
            if (!this.styles[selector]) {
                this.styles[selector] = {};
            }
            this.styles[selector][key] = value;
            return this;
        }
    }, {
        key: "setHeader",
        value: function setHeader(header) {
            this.header = header;
            return this;
        }
    }, {
        key: "setSubheader",
        value: function setSubheader(subheader) {
            this.subheader = subheader;
            return this;
        }
    }, {
        key: "setBody",
        value: function setBody(body) {
            this.body = body;
            return this;
        }
    }, {
        key: "setOrientation",
        value: function setOrientation(orientation) {
            this.orientation = orientation;
            return this;
        }
    }, {
        key: "renderStyleBlock",
        value: function renderStyleBlock(selector, data) {
            var css_pairs = Object.getOwnPropertyNames(data).map(function (key) {
                return key + ': ' + data[key] + '; ';
            });
            return selector + " { " + css_pairs.join(" ") + " }";
        }
    }, {
        key: "renderStyles",
        value: function renderStyles() {
            var _this = this;

            var css_blocks = Object.getOwnPropertyNames(this.styles).map((function (selector) {
                return _this.renderStyleBlock(selector, _this.styles[selector]);
            }).bind(this));
            return css_blocks.join("\n");
        }
    }, {
        key: "renderHTML",
        value: function renderHTML() {
            var css = this.renderStyles();
            var header = (this.subheader !== null ? '<h1 style="margin-bottom:5pt">' : "<h1>") + this.header + "</h1>";
            var subheader = this.subheader !== null ? '<h3 class="text-center" style="margin: 0 0 25pt 0">' + this.subheader + '</h3>' : "";
            return "<!DOCTYPE html>\n" + "<html><head>" + "<meta charset=\"utf-8\">" + "<style>\n" + css + "\n</style>\n" + "</head><body>\n" + header + subheader + this.body + "</body></html>";
        }
    }, {
        key: "save",
        value: function save() {
            var html = this.renderHTML();
            console.log(html);
            var margins = this.orientation.portrait ? [10, 7, 15, 7] : [7, 10, 7, 10];
            var converted = htmlDocx.asBlob(html, {
                orientation: this.orientation,
                margins: {
                    top: margins[0] + "mm",
                    right: margins[1] + "mm",
                    bottom: margins[2] + "mm",
                    left: margins[3] + "mm"
                }
            });
            saveAs(converted, this.filename + ".docx");
        }
    }]);

    return DocxImpl;
})();
//# sourceMappingURL=docx.js.map