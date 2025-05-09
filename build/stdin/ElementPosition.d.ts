import { Node as YogaNode } from "yoga-layout";
import { DOMElement } from "../dom.js";
export type CornerPositions = {
    topLeft: [number, number];
    topRight: [number, number];
    bottomLeft: [number, number];
    bottomRight: [number, number];
};
export default class ElementPosition {
    static getNode(ref: DOMElement): YogaNode;
    private static getSx;
    private static getSy;
    private static getDx;
    private static getDy;
    private static buildRelativePosition;
    private static applyParentOffset;
    static getScreenPosition(childNode: YogaNode): CornerPositions;
    static containsPoint(x: number, y: number, pos: CornerPositions): boolean;
}
