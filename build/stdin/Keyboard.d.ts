import EventEmitter = require("events");
import { SpecialKeys } from "./AsciiMap.js";
import { Key } from "../utility/types.js";
export type KeyInput = {
    key?: Key;
    notKey?: Key[];
    input?: string;
    notInput?: string[];
};
export type KeyMap = {
    [eventName: string]: KeyInput | KeyInput[];
};
export type KeyboardState = {
    chars: string;
    specialKeys: SpecialKeys;
    ctrlKeys: string;
    listening: boolean;
    event: string | null;
    eventSet: boolean;
    eventEmitted: boolean;
    registerSize: number;
    isTextInput: boolean;
    keyInput: KeyInput | KeyInput[] | null;
};
export default class Keyboard {
    private Emitter;
    private StateEmitter;
    private state;
    static StateUpdate: string;
    static InputRecieved: string;
    constructor();
    getEmitter: () => EventEmitter;
    getStateEmitter: () => EventEmitter;
    getChars: () => string;
    private clearChars;
    setMaxChars: (n: number) => void;
    private setSpecialKeys;
    getEvent: () => string | null;
    private setEvent;
    private setKeyInput;
    private appendChar;
    emitEvent: (event: string | null, stdin: string) => void;
    setTextInputMode: (b: boolean) => void;
    respondToKeypress(cb: (stdin: string) => unknown): void;
    handleStdin: (buffer: Buffer) => void;
    pause: () => void;
    addComponentListener: (processKeymapHandler: (stdin: string) => unknown) => void;
    removeComponentListener: (processKeymapHandler: (stdin: string) => unknown) => void;
    subscribeComponentToStateChanges: (cb: (s: Keyboard["state"]) => unknown) => void;
    unsubscribeComponentToStateChanges: (cb: (s: Keyboard["state"]) => unknown) => void;
    addEventListener: (event: string, handler: (stdin: string, keyinput: KeyInput | KeyInput[]) => unknown) => void;
    removeEventListener: (event: string, handler: (stdin: string, keyinput: KeyInput | KeyInput[]) => unknown) => void;
    processConfig: (config: KeyMap) => void;
    private checkMatch;
    private checkNotMatch;
}
