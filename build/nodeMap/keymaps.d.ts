import { KeyMap } from "../index.js";
export declare const ID_NAV_EVENTS: {
    up: (ID: string) => string;
    down: (ID: string) => string;
    left: (ID: string) => string;
    right: (ID: string) => string;
    next: (ID: string) => string;
    prev: (ID: string) => string;
};
export declare const VI_KEYMAP: (ID: string) => KeyMap;
export declare const ARROW_KEYMAP: (ID: string) => KeyMap;
