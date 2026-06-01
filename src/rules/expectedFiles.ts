import { parse } from "path-browserify";
import { repo } from "../repo.js";
import { Rule } from "./rule.js";

export class ExpectedFiles extends Rule {
    constructor() {
        super("ExpectedFiles", [".html"]);
    }

    protected lint() {
        const moduleName = parse(this.path).name;

        if (!moduleName) return;

        if (repo.modules?.some(mod => mod.Name === moduleName)) return;

        const files: string[] = [];

        for (const path in this.files) {
            if (path === this.path) continue;

            if (parse(path).name === moduleName) {
                files.push(path);
            }

            if (files.length >= 2) break;
        }

        if (files.length < 2) {
            const found = files.length === 1 ? `only found: ${files[0]}` : "found nothing";
            this.report(`Expected 2 other files (Component SVG and JSON) with the same name "${moduleName}", ${found}`);
        }
    }
}