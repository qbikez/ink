import ElementPosition from "./ElementPosition.js";
import { DefaultStdin } from "./Stdin.js";
export function addTitleEventListeners({ node, zIndexRoot, title, titleType, targetPosition, }) {
    const ID = node.attributes["ID"];
    const isPageFocus = node.attributes["isPageFocus"];
    const shouldSubscribe = title.onClick ||
        title.onRightClick ||
        title.onDoubleClick ||
        title.onRightDoubleClick ||
        title.onMouseDown ||
        title.onMouseUp ||
        title.onRightMouseUp ||
        title.onRightMouseDown ||
        title.onScrollClick ||
        title.onScrollDown ||
        title.onScrollUp;
    if (!title || !isPageFocus || !shouldSubscribe)
        return;
    DefaultStdin.Mouse.subscribeTitle({
        title: title,
        ID: `${titleType}-${ID}`,
        target: ElementPosition.getNode(node),
        targetPosition: targetPosition,
        zIndex: zIndexRoot,
    });
}
//# sourceMappingURL=AddTitleEventListeners.js.map