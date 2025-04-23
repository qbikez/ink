import { useEvent } from "./useEvent.js";
import { KeyMap } from "../Keyboard.js";
export type Return<U extends KeyMap = any> = {
    useEvent: typeof useEvent<U>;
};
export type Opts = {
    priority: "never" | "always" | "default" | "override" | "textinput";
};
export declare function useKeymap<U extends KeyMap = any>(keymap: U, opts?: Opts): Return<U>;
