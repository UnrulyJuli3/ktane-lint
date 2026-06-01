import pathMod from "path-browserify";
import { Rule } from "./rule.js";

export class NoTextSVG extends Rule {
    constructor() {
        super("NoTextSVG", [".svg"]);
    }

    protected lint() {
        if ((pathMod.basename(pathMod.parse(this.path).dir) === "Component" || this.singleFile) && this.content.includes("<text ")) {
            this.report(`<text> elements should be converted to <path> elements.`);
        }
    }
}