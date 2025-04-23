import InternalEvents from "../utility/InternalEvents.js";
export const CMDS = {
    increment: "USE_KEYBINDS_INCREMENT",
    decrement: "USE_KEYBINDS_DECREMENT",
    scrollUp: "USE_KEYBINDS_SCROLL_UP",
    scrollDown: "USE_KEYBINDS_SCROLL_DOWN",
    goToTop: "USE_KEYBINDS_GO_TO_TOP",
    goToBottom: "USE_KEYBINDS_GO_TO_BOTTOM",
};
const arrowVertical = {
    [CMDS.increment]: [{ key: "down" }, { key: "tab" }],
    [CMDS.decrement]: [{ key: "up" }],
};
const arrowHorizontal = {
    [CMDS.increment]: [{ key: "right" }, { key: "tab" }],
    [CMDS.decrement]: [{ key: "left" }],
};
const vimVertical = {
    [CMDS.increment]: [{ input: "j" }, { key: "down" }, { key: "tab" }],
    [CMDS.decrement]: [{ input: "k" }, { key: "up" }],
    [CMDS.scrollUp]: { key: "ctrl", input: "u" },
    [CMDS.scrollDown]: { key: "ctrl", input: "d" },
    [CMDS.goToTop]: { input: "gg" },
    [CMDS.goToBottom]: { input: "G" },
};
const vimHorizontal = {
    // ...vimVertical,
    [CMDS.increment]: [{ input: "l" }, { key: "right" }, { key: "tab" }],
    [CMDS.decrement]: [{ input: "h" }, { key: "left" }],
};
function prefixId(ID, obj) {
    const next = {};
    for (const [key, value] of Object.entries(obj)) {
        next[InternalEvents.getInternalEvent(key, ID)] = value;
    }
    return next;
}
// prettier-ignore
export const LIST_CMDS = {
    increment: (ID) => InternalEvents.getInternalEvent(CMDS.increment, ID),
    decrement: (ID) => InternalEvents.getInternalEvent(CMDS.decrement, ID),
    scrollUp: (ID) => InternalEvents.getInternalEvent(CMDS.scrollUp, ID),
    scrollDown: (ID) => InternalEvents.getInternalEvent(CMDS.scrollDown, ID),
    goToTop: (ID) => InternalEvents.getInternalEvent(CMDS.goToTop, ID),
    goToBottom: (ID) => InternalEvents.getInternalEvent(CMDS.goToBottom, ID),
};
export const ListKeymaps = {
    arrowVertical: (id) => prefixId(id, arrowVertical),
    arrowHorizontal: (id) => prefixId(id, arrowHorizontal),
    vimVertical: (id) => prefixId(id, vimVertical),
    vimHorizontal: (id) => prefixId(id, vimHorizontal),
};
//# sourceMappingURL=ListKeymaps.js.map