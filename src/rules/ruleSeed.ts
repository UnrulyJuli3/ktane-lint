import { Document, isText } from "domhandler";
import { DomUtils } from "htmlparser2";
import { HTMLRule } from "./htmlRule.js";

export class RuleSeed extends HTMLRule {
    constructor() {
        super("RuleSeed");
    }

    protected lintHtml(doc: Document) {
        const script = DomUtils.findOne(e => e.tagName === "script" && e.attribs.src === "js/ruleseed.js", doc, true);
        const fns = DomUtils.findOne(e => e.tagName === "script" && !!e.firstChild && isText(e.firstChild) && (e.firstChild.data.includes("setRules") && e.firstChild.data.includes("setDefaultRules")), doc, true);

        if (script && !fns) {
            this.report(`ruleseed.js was included but setRules and setDefaultRules functions were not.`);
        } else if (!script && fns) {
            this.report(`setRules and setDefaultRules functions were included but ruleseed.js was not.`);
        }
    }
}