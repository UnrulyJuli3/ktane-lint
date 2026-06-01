import { Rule } from "../rule.js";

export abstract class JSONRule extends Rule {
    constructor(name: string) {
        super(name, [".json"]);
    }

    protected lint() {
        try {
            this.lintJson(JSON.parse(this.content));
        } catch (e) { }
    }

    protected abstract lintJson(data: any): void;
}