import { type DOMElement } from "./dom.js";
import type Output from "./output.js";
import { MutableBaseProps } from "./utility/types.js";
export type OutputTransformer = (s: string, index: number) => string;
declare const renderNodeToOutput: (node: DOMElement, output: Output, options: {
    offsetX?: number;
    offsetY?: number;
    transformers?: OutputTransformer[];
    skipStaticElements: boolean;
    isZIndexRoot?: boolean;
    rootZIndex?: number;
    parentStyles?: MutableBaseProps;
}, zIndexes?: {
    index: number;
    cb: () => void;
}[]) => void;
export default renderNodeToOutput;
