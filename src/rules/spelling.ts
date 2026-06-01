import { Document, isText, Text } from "domhandler";
import { DomUtils } from "htmlparser2";
import { parse } from "path-browserify";
import { dictionary } from "../dictionary.js";
import { HTMLRule } from "./htmlRule.js";

export class Spelling extends HTMLRule {
    constructor() {
        super("Spelling");
    }

    protected lintHtml(doc: Document) {
        const { name } = parse(this.path);
        if (name.includes("translated") || name.includes("all languages condensed (")) return;

        const body = DomUtils.findOne(e => e.tagName === "body", doc);
        if (!body) return;

        const textNodes = DomUtils.find(isText, body, true, Number.POSITIVE_INFINITY) as Text[];
        for (const node of textNodes) {
            const words = node.data.split(/[^\w']+/g);
            for (const word of words) {
                if (!word) continue;
                if (word.toUpperCase() === word) continue;

                const correction = dictionary[word.toLowerCase()];
                if (!correction) continue;

                this.reportElement(`"${word}" might be spelled "${correction}".`, node);
            }
        }
    }
}