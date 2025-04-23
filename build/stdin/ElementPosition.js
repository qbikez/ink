export default class ElementPosition {
    static getNode(ref) {
        return ref.yogaNode;
    }
    static getSx(node) {
        return node.getComputedLeft();
    }
    static getSy(node) {
        return node.getComputedTop();
    }
    static getDx(node) {
        return node.getComputedWidth();
    }
    static getDy(node) {
        return node.getComputedHeight();
    }
    // Builds a MouseTypes.CornerPositions object based on the top-left coordinates of the
    // parent node.
    static buildRelativePosition(node, sx, sy) {
        sx = sx ?? this.getSx(node);
        sy = sy ?? this.getSy(node);
        const dx = this.getDx(node);
        const dy = this.getDy(node);
        const topLeft = [sx, sy];
        const topRight = [sx + dx, sy];
        const bottomLeft = [sx, sy + dy];
        const bottomRight = [sx + dx, sy + dy];
        return { topLeft, topRight, bottomLeft, bottomRight };
    }
    static applyParentOffset(childNode, child, parent) {
        child.topLeft[0] += parent.topLeft[0];
        child.topLeft[1] += parent.topLeft[1];
        const nextChildPosition = this.buildRelativePosition(childNode, child.topLeft[0], child.topLeft[1]);
        return nextChildPosition;
    }
    static getScreenPosition(childNode) {
        let childPos = this.buildRelativePosition(childNode);
        let parentNode = childNode.getParent();
        while (parentNode) {
            const parentPos = this.buildRelativePosition(parentNode);
            childPos = this.applyParentOffset(childNode, childPos, parentPos);
            parentNode = parentNode.getParent();
        }
        return childPos;
    }
    static containsPoint(x, y, pos) {
        if (x < pos.topLeft[0])
            return false;
        if (x >= pos.topRight[0])
            return false;
        if (y < pos.topLeft[1])
            return false;
        if (y >= pos.bottomLeft[1])
            return false;
        return true;
    }
}
//# sourceMappingURL=ElementPosition.js.map