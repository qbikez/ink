import { KeyOf } from "../../utility/types.js";
import { KeyMap } from "../Keyboard.js";
import { KeyInput } from "../../index.js";
export declare namespace T {
    interface UseEvent<T extends KeyMap = any> {
        (cmd: keyof T, handler: (stdin: string, keyinput: KeyInput | KeyInput[]) => unknown): void;
    }
    type Listener = {
        event: string;
        handler: (...args: any[]) => unknown;
    };
    type MultipleListeners<T extends KeyMap = any> = {
        cmd: KeyOf<T>;
        handler: (...args: any[]) => unknown;
    }[];
}
export type { T as UseEventTypes };
export declare function useEvent<T extends KeyMap = any>(event: KeyOf<T>, handler: (stdin: string, keyinput: KeyInput | KeyInput[]) => unknown, extraFocusCheck?: boolean): void;
export declare function useTypedEvent<T extends KeyMap>(): {
    useEvent: T.UseEvent<T>;
};
