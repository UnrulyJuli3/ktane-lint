import pathMod from "path-browserify";
import { repo } from "./repo.js";
import { allRules, singleFileRules } from "./rules/list.js";

export interface FileProblems {
    readonly name: string;
    count: number;
    readonly problems: FileProblem[];
}

export interface FileProblem {
    readonly text: string;
    readonly rule: string;
}

export const lintFiles = (files: Record<string, string>) => {
    const singleFile = Object.keys(files).length === 1;
    const rules = singleFile ? singleFileRules : allRules;

    const resList: FileProblems[] = [];

    for (const path in files) {
        const pathExt = pathMod.parse(path).ext;

        const fileRes: FileProblems = {
            name: path,
            count: 0,
            problems: [],
        };

        for (const rule of rules) {
            if (rule.extensions.includes(pathExt)) {
                const res = rule.evaluate(files, path, singleFile);
                fileRes.count += res.count;
                fileRes.problems.push(...res.problems.map(text => ({ text, rule: rule.name })));
            }
        }

        if (fileRes.count > 0 || fileRes.problems.length > 0) {
            resList.push(fileRes);
        }
    }

    return resList;
};

export const lintFile = (name: string, data: string) => lintFiles({
    [name]: data,
});

export const fetchRepo = () => repo.fetch();