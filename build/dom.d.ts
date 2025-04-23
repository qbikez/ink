import { type Node as YogaNode } from "yoga-wasm-web/auto";
import { type BaseProps } from "./baseProps.js";
import { type OutputTransformer } from "./render-node-to-output.js";
import { TextProps } from "./index.js";
import { MutableBaseProps, MutableTextProps } from "./utility/types.js";
import { IntrinsicWindowAttributes, IntrinsicWindowBaseProps } from "./window/Window.js";
import { IntrinsicLineProps } from "./lines/Line.js";
type InkNode = {
    parentNode: DOMElement | undefined;
    yogaNode?: YogaNode;
    internal_static?: boolean;
    style: MutableBaseProps & MutableTextProps & Partial<IntrinsicWindowBaseProps> & Partial<IntrinsicLineProps>;
};
export type TextName = "#text";
export type ElementNames = "ink-root" | "ink-box" | "ink-text" | "ink-virtual-text" | "ink-window" | "ink-line";
export type NodeNames = ElementNames | TextName;
export type DOMElement = {
    nodeName: ElementNames;
    attributes: Record<string, DOMNodeAttribute>;
    childNodes: DOMNode[];
    internal_transform?: OutputTransformer;
    ID?: string;
    isStaticDirty?: boolean;
    staticNode?: DOMElement;
    onComputeLayout?: () => void;
    onRender?: () => void;
    onImmediateRender?: () => void;
} & InkNode;
export type TextNode = {
    nodeName: TextName;
    nodeValue: string;
} & InkNode;
export type DOMNode<T = {
    nodeName: NodeNames;
}> = T extends {
    nodeName: infer U;
} ? U extends "#text" ? TextNode : DOMElement : never;
export type DOMNodeAttribute = boolean | string | number | Function | BaseProps | (BaseProps & TextProps) | IntrinsicWindowAttributes["viewState"];
export declare const createNode: (nodeName: ElementNames) => DOMElement;
export declare const appendChildNode: (node: DOMElement, childNode: DOMElement) => void;
export declare const insertBeforeNode: (node: DOMElement, newChildNode: DOMNode, beforeChildNode: DOMNode) => void;
export declare const removeChildNode: (node: DOMElement, removeNode: DOMNode) => void;
export declare const setAttribute: (node: DOMElement, key: string, value: DOMNodeAttribute) => void;
export declare const setStyle: (node: DOMNode, style: BaseProps) => void;
export declare const createTextNode: (text: string) => TextNode;
export declare const setTextNodeValue: (node: TextNode, text: string) => void;
export {};
