import { Document } from "domhandler";
import { DomUtils } from "htmlparser2";
import { HTMLRule } from "./htmlRule";

export class NoManualContent extends HTMLRule {
    constructor() {
        super("NoManualContent");
    }

    protected lintHtml(doc: Document) {
        const element = DomUtils.findOne(e => e.tagName === "div" && e.attribs.id === "ManualContent", doc);
        if (element) {
            this.reportElement(`<div id="ManualContent"> wrapper element should be removed.`, element);
        }
    }
}