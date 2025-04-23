import { randomUUID } from "crypto";
import { useEvent } from "../stdin/hooks/useEvent.js";
import { ListKeymaps, LIST_CMDS } from "./ListKeymaps.js";
import { useScroll } from "./useScroll.js";
import { useState } from "react";
import { useKeymap } from "../stdin/hooks/useKeymap.js";
export function useWindow(itemsOrLength, opts = {}) {
    opts.centerScroll = opts.centerScroll ?? false;
    opts.navigation = opts.navigation ?? "vi-vertical";
    opts.fallthrough = opts.fallthrough ?? false;
    opts.windowSize = opts.windowSize ?? "fit";
    opts.unitSize = opts.unitSize ?? (opts.windowSize === "fit" ? 1 : "stretch");
    const [items, setItems] = useState(typeof itemsOrLength === "number"
        ? new Array(itemsOrLength).fill(null)
        : itemsOrLength);
    let nextLength = typeof itemsOrLength === "number" ? itemsOrLength : items.length;
    let explicitWindowSize = undefined;
    if (typeof opts.windowSize === "number") {
        explicitWindowSize = opts.windowSize;
    }
    else {
        opts.windowSize = nextLength;
    }
    const { scrollState, scrollAPI, LENGTH, WINDOW_SIZE } = useScroll(nextLength, {
        centerScroll: opts.centerScroll,
        fallthrough: opts.fallthrough,
        windowSize: opts.windowSize,
        fixedWindowSize: explicitWindowSize,
        startIndex: opts.startIndex,
    });
    const [ID] = useState(randomUUID());
    const getKeymap = () => {
        // prettier-ignore
        switch (opts.navigation) {
            case 'vi-vertical': return ListKeymaps.vimVertical(ID);
            case 'vi-horizontal': return ListKeymaps.vimHorizontal(ID);
            case 'arrow-vertical': return ListKeymaps.arrowVertical(ID);
            case 'arrow-horizontal': return ListKeymaps.arrowHorizontal(ID);
            default: return {};
        }
    };
    const keymap = getKeymap();
    useKeymap(keymap, {
        priority: opts.navigation !== "none" ? "default" : "never",
    });
    useEvent(LIST_CMDS.increment(ID), () => {
        scrollAPI.nextItem();
    });
    useEvent(LIST_CMDS.decrement(ID), () => {
        scrollAPI.prevItem();
    });
    useEvent(LIST_CMDS.goToTop(ID), () => {
        scrollAPI.goToIndex(0);
    });
    useEvent(LIST_CMDS.goToBottom(ID), () => {
        scrollAPI.goToIndex(LENGTH - 1);
    });
    useEvent(LIST_CMDS.scrollDown(ID), () => {
        scrollAPI.scrollDown();
    });
    useEvent(LIST_CMDS.scrollUp(ID), () => {
        scrollAPI.scrollUp();
    });
    const control = {
        currentIndex: scrollState.idx,
        scrollUp: scrollAPI.scrollUp,
        scrollDown: scrollAPI.scrollDown,
        nextItem: scrollAPI.nextItem,
        prevItem: scrollAPI.prevItem,
        goToIndex: scrollAPI.goToIndex,
    };
    const viewStateControl = {
        ...scrollAPI,
        currentIndex: scrollState.idx,
    };
    const viewState = Object.freeze({
        _start: scrollState.start,
        _end: scrollState.end,
        _idx: scrollState.idx,
        _winSize: WINDOW_SIZE,
        _itemsLen: LENGTH,
        _control: viewStateControl,
        _items: items,
        _setItems: setItems,
        _explicitWindowSize: explicitWindowSize,
        _unitSize: opts.unitSize,
    });
    return {
        viewState,
        control,
        items: items,
        setItems: setItems,
    };
}
//# sourceMappingURL=useWindow.js.map