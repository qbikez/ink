import Mouse from "./Mouse.js";
import Keyboard from "./Keyboard.js";
/*
 * Stdin.handleStdin parses input from the keyboard and mouse.
 *
 * When Keyboard input is recieved, it updates the Keyboard register which stores
 * the last 2 keypresses by default.  useKeymap hooks are subscribed to keypress
 * events and they check if there are any keymap matches.  If there are, they will
 * emit the corresponding events.  The useEvent hook is used to subscribe to events
 * emitted from the useKeymap hook.
 *
 * When Mouse input is recieved, events are emitted for the type of mouse input
 * recieved (click, right click, double click, scroll, etc...).  The x,y position
 * of the click is dispatched with that event as well.  A click event for example
 * checks to see if any components contain the x,y point where the click event
 * happened and if so, executes any assigned callbacks.
 * */
export const EVENT = {
    keypress: "KEYPRESS",
    data: "data",
};
class Stdin {
    Mouse;
    Keyboard;
    mouseEnabled;
    listening;
    constructor() {
        this.Mouse = new Mouse();
        this.Keyboard = new Keyboard();
        this.mouseEnabled = false;
        this.listening = false;
    }
    setMouseReporting = (b = true) => {
        this.Mouse.setMouseReporting(b);
        this.mouseEnabled = b;
        b && this.listen();
    };
    listen = () => {
        if (this.listening)
            return;
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
        else {
            if (!process.env?.["TEST_ENV"]) {
                console.warn("Raw mode not supported.  Stdin not supported");
            }
            return;
        }
        process.stdin.resume();
        process.stdin.setEncoding("hex");
        process.stdin.on(EVENT.data, this.handleStdin);
        this.mouseEnabled && this.Mouse.listen();
        // Keyboard listeners are added/removed in through hooks in the app
        this.listening = true;
    };
    isListening = () => {
        return this.listening;
    };
    pause = () => {
        process.stdin.off(EVENT.data, this.handleStdin);
        this.Mouse.pause();
        this.Keyboard.pause();
        this.listening = false;
    };
    pauseDataStream = () => {
        process.stdin.off(EVENT.data, this.handleStdin);
    };
    resumeDataStream = () => {
        process.stdin.on(EVENT.data, this.handleStdin);
    };
    handleStdin = (stdin) => {
        // Handle SIGINT
        if (stdin === "03") {
            process.exit();
        }
        const buffer = Buffer.from(stdin, "hex");
        if (this.mouseEnabled && this.Mouse.isMouseEvent(buffer)) {
            this.Mouse.handleStdin(buffer);
        }
        else {
            this.Keyboard.handleStdin(buffer);
        }
    };
}
// AltStdin for alt screen states from 'tput rmcup/smcup' commands that still need
// some sort of input to switch back to default input.
export const DefaultStdin = new Stdin();
export const AltStdin = new Stdin();
export const setMouseReporting = DefaultStdin.setMouseReporting;
export const setCharRegisterSize = DefaultStdin.Keyboard.setMaxChars;
//# sourceMappingURL=Stdin.js.map