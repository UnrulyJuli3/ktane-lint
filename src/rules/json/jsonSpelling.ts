import z from "zod";
import { dictionary } from "../../dictionary.js";
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

        const words = result.data.Description.split(/[^\w']+/g);
        for (const word of words) {
            if (!word) continue;
            if (word.toUpperCase() === word) continue;

            const correction = dictionary[word.toLowerCase()];
            if (!correction) continue;

            this.report(`"${word}" might be spelled "${correction}".`);
        }
    }
}