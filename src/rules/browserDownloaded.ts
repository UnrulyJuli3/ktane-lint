import { Document } from "domhandler";
import { HTMLRule } from "./htmlRule";
import { DomUtils } from "htmlparser2";

export class BrowserDownloaded extends HTMLRule {
    constructor() {
        super("BrowserDownloaded");
    }

    protected lintHtml(doc: Document) {
        if (DomUtils.findOne(e => e.tagName === "input" && e.attribs.id === "highlighter-enabled" && e.attribs.type === "checkbox", doc, true)) {
            this.report(`Don't save pages from the browser using the "complete" option. Use the "HTML only" option or get it from the GitHub repository.`);
        }
    }
}