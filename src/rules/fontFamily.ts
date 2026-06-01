import { CssDeclarationAST, CssStylesheetAST, parse as parseCss } from "@adobe/css-tools";
import { Document, isText, Node } from "domhandler";
import { DomUtils } from "htmlparser2";
import { parse } from "path-browserify";
import { HTMLRule } from "./htmlRule";

const genericFamilies: readonly string[] = [
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui",
    "inherit",
    "Special Elite",
];

export class FontFamily extends HTMLRule {
    constructor() {
        super("FontFamily");
    }

    protected lintHtml(doc: Document) {
        const trees: CssStylesheetAST[] = [];
        const sourceMap = new Map<number, Node>();

        const styleTags = DomUtils.findAll(e => e.tagName === "style", doc);

        for (const element of styleTags) {
            if (element.firstChild && isText(element.firstChild)) {
                sourceMap.set(trees.length, element);
                trees.push(parseCss(element.firstChild.data));
            }
        }

        for (const path in this.files) {
            if (parse(path).ext === ".css") {
                trees.push(parseCss(this.files[path]));
            }
        }

        const knownFamilies = new Set<string>(genericFamilies);

        for (const tree of trees) {
            for (const rule of tree.stylesheet?.rules ?? []) {
                if (rule.type === "font-face") {
                    const familyDeclaration = rule.declarations.find(d => d.type === "declaration" && d.property === "font-family") as CssDeclarationAST | undefined;
                    if (familyDeclaration) knownFamilies.add(familyDeclaration.value.replace(/^['"]|['"]$/g, ""));
                }
            }
        }

        for (let i = 0; i < trees.length; i++) {
            const tree = trees[i];
            const sourceNode = sourceMap.get(i);

            for (const rule of tree.stylesheet?.rules ?? []) {
                if (rule.type === "rule") {
                    const familyDeclaration = rule.declarations.find(d => d.type === "declaration" && d.property === "font-family") as CssDeclarationAST | undefined;
                    if (familyDeclaration) {
                        const families = familyDeclaration.value.split(",").map(f => f.trim().replace(/^['"]|['"]$/g, ""));
                        const unknown = families.filter(f => !knownFamilies.has(f));
                        if (unknown.length >= families.length) {
                            const text = `Font ${unknown.length === 1 ? "family" : "families"} ${unknown.map(x => `"${x}"`).join(", ")} ${unknown.length === 1 ? "doesn't" : "don't"} match any included fonts.`;
                            if (sourceNode) {
                                this.reportElement(text, sourceNode);
                            } else {
                                this.report(text);
                            }
                        }
                    }
                }
            }
        }
    }
}