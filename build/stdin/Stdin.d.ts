import Mouse from "./Mouse.js";
import Keyboard from "./Keyboard.js";
export declare const EVENT: {
    readonly keypress: "KEYPRESS";
    readonly data: "data";
};
declare class Stdin {
    Mouse: Mouse;
    Keyboard: Keyboard;
    private mouseEnabled;
    private listening;
    constructor();
    setMouseReporting: (b?: boolean) => void;
    listen: () => void;
    isListening: () => boolean;
    pause: () => void;
    pauseDataStream: () => void;
    resumeDataStream: () => void;
    handleStdin: (stdin: string) => void;
}
export declare const DefaultStdin: Stdin;
export declare const AltStdin: Stdin;
export declare const setMouseReporting: (b?: boolean) => void;
export declare const setCharRegisterSize: (n: number) => void;
export {};
