import { Document, isText, Text } from "domhandler";
import { DomUtils } from "htmlparser2";
import pathMod from "path-browserify";
import { checkSpelling } from "../dictionary.js";
import { HTMLRule } from "./htmlRule.js";

export class Spelling extends HTMLRule {
    constructor() {
        super("Spelling");
    }

    protected lintHtml(doc: Document) {
        const { name } = pathMod.parse(this.path);
        if (name.includes("translated") || name.includes("all languages condensed (")) return;

        const body = DomUtils.findOne(e => e.tagName === "body", doc);
        if (!body) return;

        const textNodes = DomUtils.find(isText, body, true, Number.POSITIVE_INFINITY) as Text[];
        for (const node of textNodes) {
            const report = checkSpelling(node.data);
            for (const text of report) {
                this.reportElement(text, node);
            }
        }
    }
}