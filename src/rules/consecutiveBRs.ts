import { Document, isTag, isText } from "domhandler";
import { DomUtils } from "htmlparser2";
import { HTMLRule } from "./htmlRule";

export class ConsecutiveBRs extends HTMLRule {
    constructor() {
        super("ConsecutiveBRs");
    }

    protected lintHtml(doc: Document) {
        const nodes = DomUtils.findAll(e => e.tagName === "br", doc);
        for (const element of nodes) {
            let prev = element.previousSibling;
            while (prev && isText(prev) && !prev.data.trim()) {
                prev = prev.previousSibling;
            }

            if (prev && isTag(prev) && prev.tagName === "br") {
                this.reportElement(`Avoid using consecutive <br> tags.`, element);
            }
        }
    }
}