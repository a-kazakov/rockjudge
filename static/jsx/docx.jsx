window.Docx = (fn) => new DocxImpl(fn);

class DocxImpl {
    constructor(filename) {
        this.filename = filename;
        this.header = null;
        this.title1 = null;
        this.title2 = null;
        this.title3 = null;
        this.margins = null;
        this.body = "";
        this.orientation = "portrait";
        this.styles = {
            "body": {
                "font-size": "10pt",
                "font-family": "Calibri, Tahoma, Arial, sans-serif",
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
                "margin-bottom": 0,
            },
            "h1": {
                "font-size": "20pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "10pt",
            },
            "h2": {
                "font-size": "16pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "6pt",
            },
            "h3": {
                "font-size": "16pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "4pt",
            },
            "h4 p": {
                "font-size": "14pt",
                "font-weight": "bold",
                "margin": "10pt 0 6pt",
            },
            "h5 p": {
                "font-size": "12pt",
                "font-weight": "bold",
                "margin": "6pt 0",
            },
            ".header": {
                "border-bottom": "1px solid black",
                "font-size": "10pt",
                "font-weight": "bold",
                "margin": 0,
                "padding-bottom": "2pt",
                "margin-bottom": "20pt",
                "text-align": "center",
            },
            "p": {
                "margin": 0,
                "padding": 0,
            },
            ".spacer": {
                "font-size": "14pt",
            },
            ".va-top": {
                "vertical-align": "top",
            },
            ".text-left": { "text-align": "left" },
            ".text-right": { "text-align": "right" },
            ".text-center": { "text-align": "center" },
            ".bordered-table td, .bordered-table th": {
                "border": "1pt solid black",
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
    setTitle1(title1) {
        this.title1 = title1;
        return this;
    }
    setTitle2(title2) {
        this.title2 = title2;
        return this;
    }
    setTitle3(title3) {
        this.title3 = title3;
        return this;
    }
    setMargins(margins) {
        this.margins = margins;
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
        let header = this.header ? '<p class="header">' + this.header + '</p>' : "";
        let title1 = this.title1 ? '<h1>' + this.title1 + '</h1>' : "";
        let title2 = this.title2 ? '<h2>' + this.title2 + '</h2>' : "";
        let title3 = this.title3 ? '<h3>' + this.title3 + '</h3>' : "";
        let spacer = (header || title1 || title2 || title3) ? '<p class="spacer">&nbsp;</p>' : "";
        return "<!DOCTYPE html>\n" +
            "<html><head>" +
                "<meta charset=\"utf-8\">" +
                "<style>\n" + css + "\n</style>\n" +
            "</head><body>\n" +
                header +
                title1 +
                title2 +
                title3 +
                spacer +
                this.body +
            "</body></html>";
    }

    save() {
        let html = this.renderHTML();
        let margins = this.margins || (this.orientation == "portrait" ? [10, 15, 10, 15] : [7, 10, 7, 10]);
        let converted = htmlDocx.asBlob(html, {
            orientation: this.orientation,
            margins: {
                top:    Math.floor(margins[0] * 56.659).toString(),
                right:  Math.floor(margins[1] * 56.659).toString(),
                bottom: Math.floor(margins[2] * 56.659).toString(),
                left:   Math.floor(margins[3] * 56.659).toString(),
            }
        });
        saveAs(converted, this.filename + ".docx");
    }
}
