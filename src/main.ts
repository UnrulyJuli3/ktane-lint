import { Unzipped, unzipSync } from "fflate";
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

const textDecoder = new TextDecoder();

export const lintFiles = (filesRaw: Unzipped) => {
    // this also decodes binary files like images (so they become a jarbled string), but rules that involve those files types will not attempt to use the actual text content, so it's ok
    const files = Object.fromEntries(Object.entries(filesRaw).map(entry => [entry[0], textDecoder.decode(entry[1])]));

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

export const lintArchive = (data: Uint8Array) => lintFiles(unzipSync(data));

export const lintFile = (name: string, data: Uint8Array<ArrayBuffer>) => {
    try {
        return lintArchive(data);
    } catch (e) {
        return lintFiles({
            [name]: data,
        });
    }
};

export const fetchRepo = () => repo.fetch();