import { basename } from "path-browserify";
import { Rule } from "./rule.js";

export class TemplateManual extends Rule {
    constructor() {
        super("TemplateManual", [".html", ".png", ".svg"]);
    }

    protected lint() {
        switch (basename(this.path)) {
            case "Example Image.png":
            case "Module Name.svg":
                this.report(`Template Manual files should not be included.`);
                break;
            case "Template Manual.html":
                this.report(`Manual should be renamed to the name of the module and the Template Manual should be removed.`);
                break;
        }
    }
}