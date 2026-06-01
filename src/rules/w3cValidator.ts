import { HtmlValidate, Message, Severity } from "html-validate";
import { Rule } from "./rule.js";

const validator = new HtmlValidate({
    extends: ["html-validate:standard"],
});

const ignoredRules: readonly ((x: Message) => boolean)[] = [
    x => x.ruleId === "element-required-attributes" && x.message === `<html> is missing required "lang" attribute`,
];

export class W3CValidator extends Rule {
    constructor() {
        super("W3CValidator", [".html"]);
    }

    protected lint() {
        const report = validator.validateStringSync(this.content);
        if (!report.valid) {
            for (const result of report.results) {
                console.log(result.messages);
                for (const message of result.messages) {
                    if (message.severity === Severity.ERROR && !ignoredRules.some(rule => rule(message))) {
                        this.reportLine(message.message, message.line);
                    }
                }
            }
        }
    }
}