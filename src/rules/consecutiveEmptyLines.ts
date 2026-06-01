import { Rule } from "./rule";

export class ConsecutiveEmptyLines extends Rule {
    constructor() {
        super("ConsecutiveEmptyLines", [".html"]);
    }

    protected lint() {
        let emptyLines = 0;
        let lineNumber = 1;

        for (const line of this.lines) {
            if (line.trim()) {
                if (emptyLines >= 2) this.reportLine(`${emptyLines} consecutive empty lines.`, lineNumber);
                emptyLines = 0;
            } else {
                emptyLines++;
            }

            lineNumber++;
        }

        if (emptyLines >= 2) this.reportLine(`${emptyLines} consecutive empty lines.`, lineNumber);
    }
}