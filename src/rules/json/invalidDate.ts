import z from "zod";
import { JSONRule } from "./jsonRule.js";

const schema = z.object({
    Published: z.iso.date().optional(),
});

export class InvalidDate extends JSONRule {
    constructor() {
        super("InvalidDate");
    }

    protected lintJson(data: any) {
        const result = schema.safeParse(data);
        if (!result.success) {
            this.report("Published needs to be a valid date.");
        }
    }
}