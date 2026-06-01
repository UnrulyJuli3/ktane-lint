import { BrowserDownloaded } from "./browserDownloaded";
import { ConsecutiveBRs } from "./consecutiveBRs";
import { ConsecutiveEmptyLines } from "./consecutiveEmptyLines";
import { Doctype } from "./doctype";
import { ExpectedFiles } from "./expectedFiles";
import { FontFamily } from "./fontFamily";
import { GraphicsFolder } from "./graphicsFolder";
import { HeadTag } from "./headTag";
import { HTMLHeadBody } from "./htmlHeadBody";
import { ImageInSVG } from "./imageInSVG";
import { MinifySVG } from "./minifySVG";
import { NoManualContent } from "./noManualContent";
import { NoTabs } from "./noTabs";
import { NoTextSVG } from "./noTextSVG";
import { ParentFolder } from "./parentFolder";
import { Rule } from "./rule";
import { RuleSeed } from "./ruleSeed";
import { Spelling } from "./spelling";
import { TemplateManual } from "./templateManual";
import { TranslatedFileName } from "./translatedFileName";
import { TwoIndentJSON } from "./twoIndentJSON";
import { W3CValidator } from "./w3cValidator";

export const singleFileRules: readonly Rule[] = [
    new BrowserDownloaded(),
    new ConsecutiveBRs(),
    new ConsecutiveEmptyLines(),
    new Doctype(),
    new FontFamily(),
    new GraphicsFolder(),
    new HeadTag(),
    new HTMLHeadBody(),
    new ImageInSVG(),
    new MinifySVG(),
    new NoManualContent(),
    new NoTabs(),
    new NoTextSVG(),
    new RuleSeed(),
    new Spelling(),
    new TemplateManual(),
    new TranslatedFileName(),
    new TwoIndentJSON(),
    new W3CValidator(),
];

export const allRules: readonly Rule[] = [
    ...singleFileRules,
    new ExpectedFiles(),
    new ParentFolder(),
];