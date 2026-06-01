import { Rule } from "./rule.js";

export class NoTabs extends Rule {
    constructor() {
        super("NoTabs", [".html", ".json"]);
    }

    protected lint() {
        const { lines } = this;
        for (let i = 0; i < lines.length; i++) {
            for (const char of lines[i]) {
                if (/\S/g.test(char)) break;
                if (char === "\t") {
                    this.reportLine(`Use spaces instead of tabs.`, i + 1);
                    break;
                }
            }
        }
    }
}