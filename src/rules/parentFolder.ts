import pathMod from "path-browserify";
import { Rule } from "./rule.js";

const repoFiles: readonly string[] = [
    "Bomb.svg",
    "BombSide.svg",
    "repo-logo-unminified.svg",
    "repo-logo.svg",
    "twitch.svg",
    "time-mode-Assigned.svg",
    "time-mode-Community.svg",
    "time-mode-TwitchPlays.svg",
    "time-mode-Unassigned.svg",
];

export class ParentFolder extends Rule {
    constructor() {
        super("ParentFolder", [".html", ".json", ".css", ".svg"]);
    }

    protected lint() {
        const file = pathMod.parse(this.path);

        if (repoFiles.includes(file.base)) return;

        const parentFolder = pathMod.basename(file.dir);

        switch (file.ext) {
            case ".html":
                if (parentFolder !== "HTML") this.report(`.html files should be in the "HTML" folder.`);
                break;
            case ".json":
                if (parentFolder !== "JSON") this.report(`.json files should be in the "JSON" folder.`);
                break;
            case ".svg": {
                let parent = file;
                while (parent && parent.base !== "img") {
                    parent = pathMod.parse(parent.dir);
                }

                if (!parent) {
                    this.report(`.svg files should be in a folder that's inside the "img" folder.`);
                }
                break;
            }
        }
    }
}