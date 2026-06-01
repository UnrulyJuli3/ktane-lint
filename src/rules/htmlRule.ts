import { Document, Node } from "domhandler";
import { parseDocument } from "htmlparser2";
import { Rule } from "./rule";

// using htmlparser2 over i.e. native DOMParser or JSDOM because the behavior is identical between browser and Node
// - julie

export abstract class HTMLRule extends Rule {
    constructor(name: string) {
        super(name, [".html"]);
    }

    protected lint() {
        this.lintHtml(parseDocument(this.content, {
            withStartIndices: true,
            withEndIndices: true,
        }));
    }

    protected abstract lintHtml(doc: Document): void;

    protected getIndexLine(index: number) {
        return [...this.content.slice(0, index).matchAll(/\r?\n/g)].length + 1;
    }

    protected reportElement(text: string, element: Node) {
        if (element.startIndex != null) {
            this.reportLine(text, this.getIndexLine(element.startIndex));
        }
    }
}