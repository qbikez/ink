import { KeyMap, KeyInput } from "../index.js";
type InsertEvents = "return" | "left" | "right" | "up" | "down" | "backspace" | "tab" | "keypress";
declare function getScopedEvents(ID: string): {
    [K in InsertEvents]: string;
};
declare function getNormalKeymap(ID: string, enterKeyInput: KeyInput): [KeyMap, string];
declare function getInsertKeymap(ID: string, exitKeyInput: KeyInput, opts: {
    allowBreaking: boolean;
}): [KeyMap, string];
declare const _default: {
    getInsertKeymap: typeof getInsertKeymap;
    getNormalKeymap: typeof getNormalKeymap;
    defaultEnter: import("../stdin/Keyboard.js").KeyInput[];
    defaultExit: import("../stdin/Keyboard.js").KeyInput[];
    getScopedEvents: typeof getScopedEvents;
};
export default _default;
