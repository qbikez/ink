import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const EventEmitter = __require("events");
import ElementPosition from "./ElementPosition.js";
import { spawnSync } from "child_process";
export const MOUSE_ESCAPE_CODES = {
    ON: "\x1b[?1000h",
    OFF: "\x1b[?1000l",
};
export default class Mouse {
    // Ensure consistent naming for Events and Handler Props
    PropsToEvents;
    Emitter;
    Handlers;
    unsubscribers;
    btnDownState;
    dblClickState;
    listening;
    hasSetExitHandler;
    constructor() {
        this.Emitter = new EventEmitter();
        this.Emitter.setMaxListeners(Infinity);
        this.PropsToEvents = {
            onClick: "CLICK",
            onDoubleClick: "DOUBLE_CLICK",
            onMouseDown: "MOUSE_DOWN",
            onMouseUp: "MOUSE_UP",
            onRightClick: "RIGHT_CLICK",
            onRightDoubleClick: "RIGHT_DOUBLE_CLICK",
            onRightMouseDown: "RIGHT_MOUSE_DOWN",
            onRightMouseUp: "RIGHT_MOUSE_UP",
            onScrollUp: "SCROLL_UP",
            onScrollDown: "SCROLL_DOWN",
            onScrollClick: "SCROLL_CLICK",
        };
        this.Handlers = {};
        this.unsubscribers = [];
        this.btnDownState = {
            left: false,
            scroll: false,
            right: false,
        };
        this.dblClickState = {
            left: false,
            right: false,
        };
        this.listening = false;
        this.hasSetExitHandler = false;
    }
    resetHandlers() {
        this.Handlers = {};
    }
    newZIndexRegistry() {
        return {
            onClick: {},
            onDoubleClick: {},
            onMouseDown: {},
            onMouseUp: {},
            onRightClick: {},
            onRightDoubleClick: {},
            onRightMouseDown: {},
            onRightMouseUp: {},
            onScrollUp: {},
            onScrollDown: {},
            onScrollClick: {},
        };
    }
    setMouseReporting = (on) => {
        const escapeSequence = on ? MOUSE_ESCAPE_CODES.ON : MOUSE_ESCAPE_CODES.OFF;
        const set = (escapeSequence) => {
            spawnSync("echo", ["-e", escapeSequence], {
                stdio: ["inherit", "inherit", "inherit"],
            });
        };
        set(escapeSequence);
        if (!this.hasSetExitHandler) {
            process.on("exit", () => {
                set(MOUSE_ESCAPE_CODES.OFF);
            });
            this.hasSetExitHandler = true;
        }
    };
    // Parse the this.Handler[prop] object which contains a store IDs from Box
    // components and determine if their click event handlers should be executed
    handleEvent = (prop) => (event) => {
        const { clientX, clientY } = event;
        // Sort zIndex highest to lowest to highest
        // If an event is clicked inside one of the components on one level, the
        // lower levels will not be checked.
        const zIndexes = [];
        const zIndexListeners = Object.keys(this.Handlers)
            .sort((a, b) => Number(b) - Number(a))
            .map((zIndex) => {
            zIndexes.push(Number(zIndex));
            return this.Handlers[Number(zIndex)];
        });
        let eventHappened = false;
        const batchedHandlers = [];
        for (const level of zIndexListeners) {
            if (eventHappened)
                break;
            if (!level) {
                continue;
            }
            const propData = level[prop];
            for (const ID in propData) {
                const targetPosition = propData[ID].targetPosition;
                const componentNode = propData[ID].target;
                if (!ElementPosition.containsPoint(clientX, clientY, targetPosition)) {
                    continue;
                }
                eventHappened = true;
                const event = {
                    clientX,
                    clientY,
                    targetPosition: targetPosition,
                    target: componentNode,
                };
                if ("isTitle" in propData[ID]) {
                    const titleHandler = propData[ID]?.titleHandler;
                    if (titleHandler) {
                        batchedHandlers.push(() => {
                            titleHandler(event);
                        });
                    }
                }
                else {
                    const componentHandler = propData[ID].componentHandler;
                    const setLeftActive = propData[ID].setLeftActive;
                    const trackLeftActive = propData[ID].trackLeftActive;
                    const setRightActive = propData[ID].setRightActive;
                    const trackRightActive = propData[ID].trackRightActive;
                    const eventType = this.PropsToEvents[prop];
                    if (trackLeftActive && eventType === this.PropsToEvents.onMouseDown) {
                        setLeftActive(true);
                        this.Emitter.once(this.PropsToEvents.onMouseUp, () => {
                            setLeftActive(false);
                        });
                    }
                    // prettier-ignore
                    if (trackRightActive && eventType === this.PropsToEvents.onRightMouseDown) {
                        setRightActive(true);
                        this.Emitter.once(this.PropsToEvents.onRightMouseUp, () => {
                            setRightActive(false);
                        });
                    }
                    if (componentHandler) {
                        batchedHandlers.push(() => {
                            componentHandler(event);
                        });
                    }
                }
            }
        }
        batchedHandlers.forEach((batchedHandler) => {
            batchedHandler();
        });
    };
    // Allow processing of this.Handlers object when mouse input events are recieved
    listen = () => {
        if (this.listening)
            return;
        for (const prop in this.PropsToEvents) {
            const eventString = this.PropsToEvents[prop];
            const handler = this.handleEvent(prop);
            this.Emitter.on(eventString, handler);
            this.unsubscribers.push(() => {
                this.Emitter.off(eventString, handler);
            });
        }
        this.listening = true;
    };
    // Used to exit the entire app, or to temporarily pause mouse input for any reason
    pause = () => {
        this.Emitter.removeAllListeners();
        this.listening = false;
    };
    subscribeTitle({ ID, target, targetPosition, zIndex, title, }) {
        for (const prop in this.PropsToEvents) {
            if (!this.Handlers[zIndex]) {
                this.Handlers[zIndex] = this.newZIndexRegistry();
            }
            this.Handlers[zIndex][prop][ID] = {
                isTitle: true,
                target: target,
                targetPosition: targetPosition,
                titleHandler: title[prop],
            };
        }
    }
    // Update this.Handlers object from within a Box component
    subscribeComponent = ({ props, ID, target, targetPosition, setLeftActive, setRightActive, trackLeftActive, trackRightActive, zIndex, }) => {
        const componentData = {
            ID,
            target,
            targetPosition,
            setLeftActive,
            setRightActive,
            trackLeftActive,
            trackRightActive,
            zIndex,
        };
        for (const prop in this.PropsToEvents) {
            if (!this.Handlers[zIndex]) {
                this.Handlers[zIndex] = this.newZIndexRegistry();
            }
            this.Handlers[zIndex][prop][ID] = {
                ...componentData,
                componentHandler: props[prop],
            };
        }
    };
    // Ensure listeners are removed after a Box component is unmounted
    unsubscribeComponent = (ID) => {
        for (const zIndex in this.Handlers) {
            for (const prop in this.PropsToEvents) {
                delete this.Handlers[zIndex]?.[prop][ID];
            }
        }
    };
    getButtonType = (n) => {
        switch (n) {
            case 0:
                return "LEFT_BTN_DOWN";
            case 1:
                return "SCROLL_BTN_DOWN";
            case 2:
                return "RIGHT_BTN_DOWN";
            case 3:
                return "RELEASE_BTN";
            case 64:
                return "SCROLL_UP";
            case 65:
                return "SCROLL_DOWN";
            default:
                return null;
        }
    };
    /*
     * man console-codes
     * https://www.xfree86.org/current/ctlseqs.html#Mouse%20Tracking
     *
     * Sending "\033[?1000h" and "\033[?1000l" to stdin turns on/off mouse
     * tracking respectively.  Mouse events start with \033[M which is 0x1b, 0x5b,
     * and 0x4d
     * */
    isMouseEvent = (buffer) => {
        let codes = [];
        for (let i = 0; i < buffer.length; ++i) {
            // Convert byte to hex string.
            codes.push(`${buffer[i]?.toString(16)}`);
        }
        if (codes[0] === "1b" && codes[1] === "5b" && codes[2] === "4d") {
            return true;
        }
        else {
            return false;
        }
    };
    handleStdin = (buffer) => {
        // xterm offsets the codes by 32 so that control chars like \n aren't sent
        // - 1 on x and y because xterm does not send 0 based coordinates
        const buttonCode = buffer[3] - 32;
        let x = buffer[4] - 32 - 1;
        let y = buffer[5] - 32 - 1;
        const event = { clientX: x, clientY: y };
        const button = this.getButtonType(buttonCode);
        if (button === "LEFT_BTN_DOWN") {
            this.btnDownState.left = true;
            this.Emitter.emit(this.PropsToEvents.onMouseDown, event);
        }
        if (button === "RIGHT_BTN_DOWN") {
            this.btnDownState.right = true;
            this.Emitter.emit(this.PropsToEvents.onRightMouseDown, event);
        }
        if (button === "SCROLL_BTN_DOWN") {
            this.btnDownState.scroll = true;
        }
        if (button === "SCROLL_UP") {
            this.Emitter.emit(this.PropsToEvents.onScrollUp, event);
        }
        if (button === "SCROLL_DOWN") {
            this.Emitter.emit(this.PropsToEvents.onScrollDown, event);
        }
        if (button !== "RELEASE_BTN")
            return;
        if (this.btnDownState.left) {
            this.Emitter.emit(this.PropsToEvents.onClick, event);
            this.Emitter.emit(this.PropsToEvents.onMouseUp, event);
            if (this.dblClickState.left) {
                this.Emitter.emit(this.PropsToEvents.onDoubleClick, event);
            }
            else {
                this.beginDoubleClickTimer("LEFT");
            }
        }
        if (this.btnDownState.right) {
            this.Emitter.emit(this.PropsToEvents.onRightClick, event);
            this.Emitter.emit(this.PropsToEvents.onRightMouseUp, event);
            if (this.dblClickState.right) {
                this.Emitter.emit(this.PropsToEvents.onRightDoubleClick, event);
            }
            else {
                this.beginDoubleClickTimer("RIGHT");
            }
        }
        if (this.btnDownState.scroll) {
            this.Emitter.emit(this.PropsToEvents.onScrollClick, event);
        }
        this.btnDownState = { left: false, scroll: false, right: false };
    };
    beginDoubleClickTimer = (btn) => {
        const CLICK_INTERVAL = 500;
        setTimeout(() => {
            if (btn === "LEFT") {
                this.dblClickState.left = false;
            }
            if (btn === "RIGHT") {
                this.dblClickState.right = false;
            }
        }, CLICK_INTERVAL);
        if (btn === "LEFT" && !this.dblClickState.left) {
            this.dblClickState.left = true;
        }
        if (btn === "RIGHT" && !this.dblClickState.right) {
            this.dblClickState.right = true;
        }
    };
}
//# sourceMappingURL=Mouse.js.map