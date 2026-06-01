import { basename, parse } from "path-browserify";
import { Rule } from "./rule.js";

export class NoTextSVG extends Rule {
    constructor() {
        super("NoTextSVG", [".svg"]);
    }

    protected lint() {
        if ((basename(parse(this.path).dir) === "Component" || this.singleFile) && this.content.includes("<text ")) {
            this.report(`<text> elements should be converted to <path> elements.`);
        }
    }
}