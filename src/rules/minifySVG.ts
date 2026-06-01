import { basename, parse } from "path-browserify";
import { Rule } from "./rule.js";

export class MinifySVG extends Rule {
    constructor() {
        super("MinifySVG", [".svg"]);
    }

    protected lint() {
        if ((basename(parse(this.path).dir) === "Component" || this.singleFile) && this.content.includes("\n")) {
            this.report(`Component SVGs should be minified with SVGOMG.`);
        }
    }
}