import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const EventEmitter = __require("events");
import { newSpecialKeyRegister } from "./AsciiMap.js";
import { EVENT } from "./Stdin.js";
import { ASCII } from "./AsciiMap.js";
export default class Keyboard {
    Emitter;
    StateEmitter;
    state;
    static StateUpdate = "STATE_UPDATE";
    static InputRecieved = "INPUT_RECIEVED";
    constructor() {
        this.Emitter = new EventEmitter();
        this.StateEmitter = new EventEmitter();
        this.Emitter.setMaxListeners(Infinity);
        this.state = {
            chars: "",
            specialKeys: newSpecialKeyRegister(),
            ctrlKeys: "",
            listening: false,
            event: null,
            eventSet: false,
            eventEmitted: false,
            registerSize: 2,
            isTextInput: false,
            keyInput: null,
        };
    }
    getEmitter = () => {
        return this.Emitter;
    };
    getStateEmitter = () => {
        return this.StateEmitter;
    };
    getChars = () => {
        return this.state.chars;
    };
    clearChars = () => {
        this.state.chars = "";
    };
    setMaxChars = (n) => {
        this.state.registerSize = Math.max(1, n);
    };
    setSpecialKeys = (mapping) => {
        this.state.specialKeys = mapping;
    };
    getEvent = () => {
        return this.state.event;
    };
    setEvent = (event) => {
        // Only allow one event to be set per EVENT.keypress event
        if (this.state.eventSet)
            return;
        this.state.eventSet = true;
        this.state.event = typeof event === "string" ? event : String(event);
        this.state.chars = "";
        this.StateEmitter.emit(Keyboard.StateUpdate, this.state);
    };
    setKeyInput = (keyInput) => {
        if (this.state.keyInput)
            return;
        this.state.keyInput = keyInput;
    };
    appendChar = (c) => {
        if (c === "")
            return;
        if (this.state.chars.length >= this.state.registerSize) {
            this.state.chars = "";
        }
        this.state.chars += c;
        this.StateEmitter.emit(Keyboard.StateUpdate, this.state);
    };
    emitEvent = (event, stdin) => {
        if (this.state.eventEmitted || event === null)
            return;
        this.Emitter.emit(event, stdin, this.state.keyInput);
        this.state.eventEmitted = true;
    };
    setTextInputMode = (b) => {
        this.state.isTextInput = b;
    };
    respondToKeypress(cb) {
        this.Emitter.once(EVENT.keypress, cb);
    }
    handleStdin = (buffer) => {
        if (buffer[0] === undefined)
            return;
        const char = buffer.toString("utf-8");
        this.state.eventSet = false;
        this.state.eventEmitted = false;
        this.state.event = null;
        this.state.ctrlKeys = "";
        this.state.keyInput = null;
        // Handle sigint before all else
        if (char === ASCII.sigint) {
            this.Emitter.removeAllListeners();
            process.stdin.pause();
            process.exit();
        }
        let dirtySpecKey = false;
        const match = (code) => {
            if (char === code) {
                dirtySpecKey = true;
            }
            return char === code;
        };
        const map = {
            backspace: match(ASCII.backspace),
            delete: match(ASCII.delete),
            esc: match(ASCII.esc),
            insert: match(ASCII.insert),
            return: match(ASCII.return),
            tab: match(ASCII.tab),
            up: match(ASCII.up),
            down: match(ASCII.down),
            right: match(ASCII.right),
            left: match(ASCII.left),
            f1: match(ASCII.f1),
            f2: match(ASCII.f2),
            f3: match(ASCII.f3),
            f4: match(ASCII.f4),
            f5: match(ASCII.f5),
            f6: match(ASCII.f6),
            f7: match(ASCII.f7),
            f8: match(ASCII.f8),
            f9: match(ASCII.f9),
            f10: match(ASCII.f10),
            f11: match(ASCII.f11),
            f12: match(ASCII.f12),
            // ctrl will not be triggered on its own.  It can only read ctrl + letter
            ctrl: false,
        };
        this.setSpecialKeys(map);
        // Special key press always clears char register
        dirtySpecKey && this.clearChars();
        // Ctrl + lowercase letter.  Unfortunately, I don't believe there is any way
        // within Nodejs to recognize other combinations of special keys.
        const charCode = char.charCodeAt(0);
        /// on Windows, Backspace is 8 (or so it seems)
        if (charCode == 8) {
            // Backspace
            this.setSpecialKeys({
                ...map,
                backspace: true
            });
            this.clearChars();
        }
        else if (charCode >= 1 && charCode <= 26) {
            const letter = String.fromCharCode(charCode + 96);
            this.state.ctrlKeys = letter;
            this.state.chars = "";
            map.ctrl = true;
            dirtySpecKey = true;
            this.setSpecialKeys(map);
        }
        else {
            if (!dirtySpecKey) {
                char && this.appendChar(char);
            }
            else {
                this.clearChars();
            }
        }
        // Notify useKeymap hooks
        this.Emitter.emit(EVENT.keypress, char);
        this.Emitter.emit(Keyboard.InputRecieved, char, this.state);
    };
    pause = () => {
        this.Emitter.removeAllListeners(EVENT.keypress);
        this.Emitter.removeAllListeners(Keyboard.InputRecieved);
        this.Emitter.removeAllListeners(Keyboard.StateUpdate);
    };
    addComponentListener = (processKeymapHandler) => {
        this.Emitter.on(EVENT.keypress, processKeymapHandler);
    };
    removeComponentListener = (processKeymapHandler) => {
        this.Emitter.off(EVENT.keypress, processKeymapHandler);
    };
    subscribeComponentToStateChanges = (cb) => {
        this.StateEmitter.on(Keyboard.StateUpdate, cb);
    };
    unsubscribeComponentToStateChanges = (cb) => {
        this.StateEmitter.off(Keyboard.StateUpdate, cb);
    };
    addEventListener = (event, handler) => {
        this.Emitter.on(event, handler);
    };
    removeEventListener = (event, handler) => {
        this.Emitter.off(event, handler);
    };
    processConfig = (config) => {
        if (this.state.eventSet)
            return;
        /* Is there a non alphanumeric keypress?  We need to know so that bindings
         * such as just "f" should not trigger ctrl + f for example. */
        const hasNonAlphaKey = Object.values(this.state.specialKeys).some((b) => b);
        for (const event in config) {
            const binding = config[event];
            let match;
            if (Array.isArray(binding)) {
                match = binding.find((b) => this.checkMatch(b, hasNonAlphaKey));
            }
            else {
                match = this.checkMatch(binding, hasNonAlphaKey) ? binding : undefined;
            }
            if (match) {
                this.setEvent(event);
                this.setKeyInput(match);
            }
        }
    };
    checkMatch = (binding, hasNonAlphakey) => {
        // Empty object triggers any key press
        if (!Object.keys(binding).length) {
            return true;
        }
        // notKey and notInput match anything that is not in their array of values
        if ((binding.notKey || binding.notInput) && this.checkNotMatch(binding)) {
            return true;
        }
        // key + char input
        if (binding.key && binding.input) {
            if (binding.key === "ctrl") {
                return this.state.ctrlKeys === binding.input;
            }
            // This should always evaluate to false
            return (this.state.specialKeys[binding.key] && this.state.chars === binding.input);
        }
        // key only
        if (binding.key && !binding.input) {
            return this.state.specialKeys[binding.key];
        }
        // char input only
        if (!binding.key && binding.input) {
            if (hasNonAlphakey)
                return false;
            return this.state.chars === binding.input;
        }
        return false;
    };
    checkNotMatch = (binding) => {
        const notKey = binding.notKey || [];
        const notInput = binding.notInput || [];
        for (const k of notKey) {
            if (this.state.specialKeys[k]) {
                return false;
            }
        }
        for (const s of notInput) {
            if (this.state.chars === s) {
                return false;
            }
        }
        return true;
    };
}
//# sourceMappingURL=Keyboard.js.map