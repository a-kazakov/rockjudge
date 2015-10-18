window.Docx = (fn) => new DocxImpl(fn);

class DocxImpl {
    constructor(filename) {
        this.filename = filename;
        this.header = "";
        this.subheader = null;
        this.body = "";
        this.orientation = "portrait";
        this.styles = {
            "body": {
                "font-size": "10pt",
                "font-family": "Calibri, Arial, sans-serif",
            },
            "table": {
                "border-collapse": "collapse",
                "width": "100%",
            },
            "tr": {
                "page-break-inside": "avoid",
            },
            "td, th": {
                "padding": "1pt 3pt",
            },
            "h1, h2, h3, h4, h5, h6": {
                "page-break-after": "avoid",
            },
            "h1": {
                "font-size": "20pt",
                "font-weight": "bold",
                "text-align": "center",
            },
            "p": {
                "margin": 0,
                "padding": 0,
            },
            ".text-left": { "text-align": "left" },
            ".text-right": { "text-align": "right" },
            ".text-center": { "text-align": "center" },
            ".bordered-table td, .bordered-table th": {
                "border": "2px solid black",
            },
        }
        this.addWidthCss();
    }
    addWidthCss() {
        for (let i = 1; i <= 100; ++i) {
            this.addStyle(".w-" + i, "width", i + "%");
        }
    }

    addStyle(selector, key, value) {
        if (!this.styles[selector]) {
            this.styles[selector] = {};
        }
        this.styles[selector][key] = value;
        return this;
    }
    setHeader(header) {
        this.header = header;
        return this;
    }
    setSubheader(subheader) {
        this.subheader = subheader;
        return this;
    }
    setBody(body) {
        this.body = body;
        return this;
    }
    setOrientation(orientation) {
        this.orientation = orientation;
        return this;
    }

    renderStyleBlock(selector, data) {
        let css_pairs = Object.getOwnPropertyNames(data).map((key) => key + ': ' + data[key] + '; ')
        return selector + " { " + css_pairs.join(" ") + " }";
    }
    renderStyles() {
        let css_blocks = Object.getOwnPropertyNames(this.styles).map((
            (selector) => this.renderStyleBlock(selector, this.styles[selector])
        ).bind(this));
        return css_blocks.join("\n");
    }
    renderHTML() {
        let css = this.renderStyles();
        let header = (this.subheader !== null ? '<h1 style="margin-bottom:5pt">' : "<h1>") + this.header + "</h1>";
        let subheader = this.subheader !== null ? '<h3 class="text-center" style="margin: 0 0 25pt 0">' + this.subheader + '</h3>' : "";
        return "<!DOCTYPE html>\n" +
            "<html><head>" +
                "<meta charset=\"utf-8\">" +
                "<style>\n" + css + "\n</style>\n" +
            "</head><body>\n" +
                header +
                subheader +
                this.body +
            "</body></html>";
    }

    save() {
        let html = this.renderHTML();
        let margins = this.orientation.portrait ? [10, 7, 15, 7] : [7, 10, 7, 10];
        let converted = htmlDocx.asBlob(html, {
            orientation: this.orientation,
            margins: {
                top:    margins[0] + "mm",
                right:  margins[1] + "mm",
                bottom: margins[2] + "mm",
                left:   margins[3] + "mm"
            }
        });
        saveAs(converted, this.filename + ".docx");
    }
}
