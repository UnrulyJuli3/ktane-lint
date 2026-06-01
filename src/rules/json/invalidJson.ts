import { Rule } from "../rule.js";

export class InvalidJSON extends Rule {
    constructor() {
        super("InvalidJSON", [".json"]);
    }

    protected lint() {
        try {
            JSON.parse(this.content);
        } catch (e) {
            if (e instanceof SyntaxError) {
                this.report(e.message);
            }
        }
    }
}