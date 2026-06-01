import pathMod from "path-browserify";
import { repo } from "../repo.js";
import { Rule } from "./rule.js";

export class TranslatedFileName extends Rule {
    constructor() {
        super("TranslatedFileName", [".html"]);
    }

    protected lint() {
        const { name } = pathMod.parse(this.path);

        if (!/([A-Z\d❖][!-~]*) translated /.test(name) && !/\(.+ — .+\)/.test(name)) return;

        const moduleName = name.match(/^(.+) translated/)?.[1];
        if (!moduleName) return;

        if (repo.modules?.some(mod => (mod.FileName ?? mod.Name) === moduleName)) {
            this.report(`No original module named "${moduleName}" found.`);
        }

        if (!new RegExp(`^${moduleName} translated \(.+ — .+\)( [^()]+)?( \([^()]+\))?$`).test(name)) {
            this.report("Invalid file name: expected \"(.+) translated \\(.+ — .+\\)( [^()]+)?( \\([^()]+\\))?.html\"");
        }
    }
}