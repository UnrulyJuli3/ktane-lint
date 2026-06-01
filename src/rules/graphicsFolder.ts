import { Document } from "domhandler";
import { DomUtils } from "htmlparser2";
import { HTMLRule } from "./htmlRule";

export class GraphicsFolder extends HTMLRule {
    constructor() {
        super("GraphicsFolder");
    }

    protected lintHtml(doc: Document) {
        const nodes = DomUtils.findAll(e => e.tagName === "img", doc);
        for (const element of nodes) {
            const src = element.attribs.src;
            if (!src) continue;

            try {
                const url = new URL(src, "https://ktane.timwi.de");

                const segments = url.pathname.split("/").filter(x => x);
                if (segments.length === 3 && segments[1] === "img") {
                    this.reportElement(`Graphics must be in the appropriate folder named for the module.`, element);
                }
            } catch (e) {
                console.warn(e);
            }
        }
    }
}