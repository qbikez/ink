import { DOMElement } from "../dom.js";
import { Title } from "../renderTitles/renderTitleToOutput.js";
import { CornerPositions } from "./ElementPosition.js";
export declare function addTitleEventListeners({ node, zIndexRoot, title, titleType, targetPosition, }: {
    zIndexRoot: number;
    node: DOMElement;
    title: Title;
    titleType: string;
    targetPosition: CornerPositions;
}): void;
