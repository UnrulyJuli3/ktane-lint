import { Rule } from "./rule.js";

export class Doctype extends Rule {
    constructor() {
        super("DOCTYPE", [".html"]);
    }

    protected lint() {
        if (!this.content.startsWith("<!DOCTYPE html>")) {
            this.reportLine(`HTML files must start with <!DOCTYPE html>.`, 1);
        }
    }
}