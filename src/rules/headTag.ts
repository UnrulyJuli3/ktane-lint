import { Document, Element, isTag, isText } from "domhandler";
import { DomUtils } from "htmlparser2";
import { HTMLRule } from "./htmlRule";

const nth = (num: number) => {
    switch (num > 20 ? num % 10 : num) {
        case 1: return `${num}st`;
        case 2: return `${num}nd`;
        case 3: return `${num}rd`;
        default: return `${num}th`;
    }
};

const isStyle = (e: Element, href: RegExp) => e.tagName === "link" && e.attribs.rel === "stylesheet" && e.attribs.type === "text/css" && href.test(e.attribs.href);

const isMeta = (e: Element) => e.tagName === "meta";

interface HeadRule {
    readonly text: string; // for reporting purposes only
    readonly fn: (e: Element) => any;
    readonly optional?: boolean;
}

// <meta charset="utf-8">
// <meta name="viewport" content="initial-scale=1">
// <meta *>
// <title>*—*</title>
// <link rel="stylesheet" type="text/css" href="css/font.css">
// <link rel="stylesheet" type="text/css" href="css/font-*.css">
// <link rel="stylesheet" type="text/css" href="font/*/font.css">
// <link rel="stylesheet" type="text/css" href="css/normalize.css">
// <link rel="stylesheet" type="text/css" href="css/main.css">
// <link rel="stylesheet" type="text/css" href="css/*/*.css">
// <script src="js/ktane-utils.js"></script>

const headRules: readonly HeadRule[] = [
    {
        text: `<meta charset="utf-8">`,
        fn: e => isMeta(e) && e.attribs.charset === "utf-8",
    },
    {
        text: `<meta name="viewport" content="initial-scale=1">`,
        fn: e => isMeta(e) && e.attribs.name === "viewport" && e.attribs.content === "initial-scale=1",
    },
    {
        text: `<meta *>`,
        fn: isMeta,
        optional: true,
    },
    {
        text: `<title>*—*</title>`,
        fn: e => e.tagName === "title" && e.firstChild && isText(e.firstChild) && /^.+—.+$/.test(e.firstChild.data),
    },
    {
        text: `<link rel="stylesheet" type="text/css" href="css/font.css">`,
        fn: e => isStyle(e, /^css\/font\.css$/),
    },
    {
        text: `<link rel="stylesheet" type="text/css" href="css/font-*.css">`,
        fn: e => isStyle(e, /^css\/font-.+\.css$/),
        optional: true,
    },
    {
        text: `<link rel="stylesheet" type="text/css" href="font/*/font.css">`,
        fn: e => isStyle(e, /^font\/.+\/font\.css$/),
        optional: true,
    },
    {
        text: `<link rel="stylesheet" type="text/css" href="css/normalize.css">`,
        fn: e => isStyle(e, /^css\/normalize\.css$/),
    },
    {
        text: `<link rel="stylesheet" type="text/css" href="css/main.css">`,
        fn: e => isStyle(e, /^css\/main\.css$/),
    },
    {
        text: `<link rel="stylesheet" type="text/css" href="css/*/*.css">`,
        fn: e => isStyle(e, /^css\/.+\/.+\.css$/),
        optional: true,
    },
    {
        text: `<script src="js/ktane-utils.js"></script>`,
        fn: e => e.tagName === "script" && e.attribs.src === "js/ktane-utils.js",
    },
];

export class HeadTag extends HTMLRule {
    constructor() {
        super("HeadTag");
    }

    protected lintHtml(doc: Document) {
        const head = DomUtils.findOne(e => e.tagName === "head", doc);
        if (!head) return;

        const children = head.children.filter(isTag);
        if (!children.length) return;

        let childNumber = 0;

        for (let i = 0; i < headRules.length; i++) {
            const { text, fn, optional } = headRules[i];

            const child = children[childNumber];
            const matches = child && fn(child);

            if (!matches && !optional) {
                this.reportElement(`Expected “${text}” as the ${nth(childNumber + 1)} child element in the <head>.`, child ?? children[children.length - 1]);
                break;
            }

            if (matches) {
                childNumber++;
            }
        }
    }
}