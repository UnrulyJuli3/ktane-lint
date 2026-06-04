import z from "zod";
import { checkSpelling } from "../../dictionary.js";
import { JSONRule } from "./jsonRule.js";

const schema = z.object({
    Description: z.string().optional(),
});

export class JSONSpelling extends JSONRule {
    constructor() {
        super("JSONSpelling");
    }

    protected lintJson(data: any) {
        const result = schema.safeParse(data);
        if (!result.success || !result.data.Description) return;

        const report = checkSpelling(result.data.Description);
        for (const text of report) {
            this.report(text);
        }
    }
}