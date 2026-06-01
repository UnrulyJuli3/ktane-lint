import { BrowserDownloaded } from "./browserDownloaded.js";
import { ConsecutiveBRs } from "./consecutiveBRs.js";
import { ConsecutiveEmptyLines } from "./consecutiveEmptyLines.js";
import { Doctype } from "./doctype.js";
import { ExpectedFiles } from "./expectedFiles.js";
import { FontFamily } from "./fontFamily.js";
import { GraphicsFolder } from "./graphicsFolder.js";
import { HeadTag } from "./headTag.js";
import { HTMLHeadBody } from "./htmlHeadBody.js";
import { ImageInSVG } from "./imageInSVG.js";
import { MinifySVG } from "./minifySVG.js";
import { NoManualContent } from "./noManualContent.js";
import { NoTabs } from "./noTabs.js";
import { NoTextSVG } from "./noTextSVG.js";
import { ParentFolder } from "./parentFolder.js";
import { Rule } from "./rule.js";
import { RuleSeed } from "./ruleSeed.js";
import { Spelling } from "./spelling.js";
import { TemplateManual } from "./templateManual.js";
import { TranslatedFileName } from "./translatedFileName.js";
import { TwoIndentJSON } from "./twoIndentJSON.js";
import { W3CValidator } from "./w3cValidator.js";

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