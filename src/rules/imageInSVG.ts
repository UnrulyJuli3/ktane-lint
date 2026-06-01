import { Rule } from "./rule";

export class ImageInSVG extends Rule {
    constructor() {
        super("ImageInSVG", [".svg"]);
    }

    protected lint() {
        if (this.content.includes("<image ")) {
            this.report(`<image> elements should be converted to a vector.`);
        }
    }
}