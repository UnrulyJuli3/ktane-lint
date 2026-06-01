export abstract class Rule {
    public readonly name;
    public readonly extensions;
    private problems: string[] = [];
    private groupedProblems: GroupedProblem[] = [];

    constructor(name: string, extensions: string[]) {
        this.name = name;
        this.extensions = extensions;
    }

    protected files: Record<string, string> = {};
    protected path: string = "";
    protected singleFile: boolean = false;

    protected get content() {
        return this.files[this.path];
    }

    protected get lines() {
        return this.content.split(/\r?\n/g);
    }

    public evaluate(files: Record<string, string>, path: string, singleFile: boolean) {
        this.files = files;
        this.path = path;
        this.singleFile = singleFile;
        this.problems = [];
        this.groupedProblems = [];

        this.lint();

        let count = this.problems.length;

        const groups = Object.groupBy(this.groupedProblems, x => x.problem);
        for (const [text, list] of Object.entries(groups)) {
            if (list) {
                this.report(`${list.length === 1 ? "Line" : "Lines"} ${list.join(", ")}: ${text}`);
                for (const { start, end } of list) {
                    count += end - start + 1;
                }
            }
        }

        return {
            count,
            problems: this.problems,
        };
    }

    protected abstract lint(): void;

    protected report(text: string) {
        this.problems.push(text);
    }

    protected reportLine(text: string, line: number) {
        const group = this.groupedProblems.find(x => line >= x.start - 1 && line <= x.end + 1 && x.problem === text);
        if (group) {
            group.end = Math.max(group.end, line);
            return;
        }

        this.groupedProblems.push(new GroupedProblem(text, line));
    }
}

class GroupedProblem {
    public readonly problem;
    public readonly start;
    public end;

    constructor(problem: string, line: number) {
        this.problem = problem;
        this.start = line;
        this.end = line;
    }

    public toString() {
        if (this.start === this.end) return `${this.start}`;
        return `${this.start}-${this.end}`;
    }
}