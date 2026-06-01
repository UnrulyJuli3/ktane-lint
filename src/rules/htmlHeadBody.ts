import { Document } from "domhandler";
import { DomUtils } from "htmlparser2";
import { HTMLRule } from "./htmlRule";

export class HTMLHeadBody extends HTMLRule {
    constructor() {
        super("HTMLHeadBody");
    }

    protected lintHtml(doc: Document) {
        const elementLines = new Map<number, string>();

        const checkLine = (line: number, tag: string) => {
            if (elementLines.has(line)) {
                this.reportLine(`${tag} shouldn't be on the same line as ${elementLines.get(line)}.`, line);
            } else {
                elementLines.set(line, tag);
            }
        };

        for (const tag of ["html", "head", "body"]) {
            const element = DomUtils.findOne(e => e.tagName === tag, doc);
            if (!element) {
                this.report(`Missing <${tag}>.`);
                break;
            }

            if (element.startIndex != null) checkLine(this.getIndexLine(element.startIndex), `<${tag}>`);
            if (element.endIndex != null) checkLine(this.getIndexLine(element.endIndex), `</${tag}>`);
        }
    }
}