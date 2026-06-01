import { Rule } from "./rule.js";

export class TwoIndentJSON extends Rule {
    constructor() {
        super("TwoIndentJSON", [".json"]);
    }

    protected lint() {
        const { lines } = this;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            for (let j = 0; j < line.length; j++) {
                if (line[j] !== " ") {
                    if (j % 2 !== 0) this.reportLine(`${j} spaces, expected a multiple of 2.`, i + 1);

                    break;
                }
            }
        }
    }
}