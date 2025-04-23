import { createContext, useContext } from "react";
export const ListItemContext = createContext(null);
export const PageContext = createContext(null);
export const WindowContext = createContext(null);
export const NodeContext = createContext(null);
// If no Context exists, this is the root node and therefore focus is true.
// Otherwise, focus is dependent on the Context value.
export function useWindowFocus() {
    const windowContext = useContext(WindowContext);
    if (windowContext === null)
        return true;
    return windowContext.isFocus;
}
export function usePageFocus() {
    const pageContext = useContext(PageContext);
    if (pageContext === null)
        return true;
    return pageContext.isFocus;
}
export function useItemFocus() {
    const listItemContext = useContext(ListItemContext);
    if (listItemContext === null)
        return true;
    return listItemContext.isFocus;
}
export function useNodeFocus() {
    const nodeContext = useContext(NodeContext);
    if (nodeContext === null)
        return true;
    return nodeContext.isFocus;
}
// Combine focus of all the above
export function useIsFocus() {
    const itemFocus = useItemFocus();
    const pageFocus = usePageFocus();
    const windowFocus = useWindowFocus(); // Don't think this is necessary
    const nodeFocus = useNodeFocus();
    return itemFocus && pageFocus && windowFocus && nodeFocus;
}
// prettier-ignore
const errMsg = (h, cmp) => `Attemping to use ${h} hook outside the context of a ${cmp} component.`;
export function useListItem() {
    const listItemContext = useContext(ListItemContext);
    if (listItemContext === null) {
        throw new Error(errMsg("useListItem", "List"));
    }
    const items = listItemContext.items;
    const setItems = listItemContext.setItems;
    const itemIndex = listItemContext.itemIndex;
    const listIndex = listItemContext.control.currentIndex;
    const control = listItemContext.control;
    const isFocus = listItemContext.isFocus;
    const isShallowFocus = listItemContext.isShallowFocus;
    const item = items[itemIndex];
    const onFocus = listItemContext.onFocus;
    const onBlur = listItemContext.onBlur;
    return {
        items,
        setItems,
        itemIndex,
        listIndex,
        isFocus,
        isShallowFocus,
        item,
        control,
        onFocus,
        onBlur,
    };
}
export function usePage() {
    const pageContext = useContext(PageContext);
    if (pageContext === null) {
        throw new Error(errMsg("usePage", "Pages"));
    }
    return pageContext;
}
export function useNode() {
    const nodeContext = useContext(NodeContext);
    if (nodeContext === null) {
        throw new Error(errMsg("useNavNode", "Nav.Node"));
    }
    return nodeContext;
}
//# sourceMappingURL=FocusContext.js.map