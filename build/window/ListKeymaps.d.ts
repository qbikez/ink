import { KeyMap } from "../stdin/Keyboard.js";
export declare const CMDS: {
    readonly increment: "USE_KEYBINDS_INCREMENT";
    readonly decrement: "USE_KEYBINDS_DECREMENT";
    readonly scrollUp: "USE_KEYBINDS_SCROLL_UP";
    readonly scrollDown: "USE_KEYBINDS_SCROLL_DOWN";
    readonly goToTop: "USE_KEYBINDS_GO_TO_TOP";
    readonly goToBottom: "USE_KEYBINDS_GO_TO_BOTTOM";
};
export declare const LIST_CMDS: {
    readonly increment: (ID: string) => string;
    readonly decrement: (ID: string) => string;
    readonly scrollUp: (ID: string) => string;
    readonly scrollDown: (ID: string) => string;
    readonly goToTop: (ID: string) => string;
    readonly goToBottom: (ID: string) => string;
};
export declare const ListKeymaps: {
    arrowVertical: (id: string) => KeyMap;
    arrowHorizontal: (id: string) => KeyMap;
    vimVertical: (id: string) => KeyMap;
    vimHorizontal: (id: string) => KeyMap;
};
