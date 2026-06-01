import z from "zod";
import { JSONRule } from "./jsonRule.js";

const schema = z.object({
    Type: z.enum(["Regular", "Needy", "Holdable", "Widget"]).optional(),
    License: z.enum(["OpenSource", "Republishable", "Restricted"]).optional(),
    Compatibility: z.enum(["Untested", "Unplayable", "Problematic", "Compatible"]).optional(),
    DefuserDifficulty: z.enum(["Trivial", "VeryEasy", "Easy", "Medium", "Hard", "VeryHard", "Extreme"]).optional(),
    ExpertDifficulty: z.enum(["Trivial", "VeryEasy", "Easy", "Medium", "Hard", "VeryHard", "Extreme"]).optional(),
    RuleSeedSupport: z.enum(["NotSupported", "Supported"]).optional(),
    MysteryModule: z.enum(["NoConflict", "MustNotBeHidden", "MustNotBeKey", "MustNotBeHiddenOrKey", "RequiresAutoSolve"]).optional(),
});

export class InvalidOption extends JSONRule {
    constructor() {
        super("InvalidOption");
    }

    protected lintJson(data: any) {
        const result = schema.safeParse(data);
        if (!result.success) {
            const { properties } = z.treeifyError(result.error);
            for (const key in properties) {
                console.log(`"${data[key]}" is not a valid option for ${key}.`);
            }
        }
    }
}