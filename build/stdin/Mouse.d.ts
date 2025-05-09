import { Node as YogaNode } from "yoga-layout";
import { CornerPositions } from "./ElementPosition.js";
import { Title } from "../renderTitles/renderTitleToOutput.js";
export type Events = "CLICK" | "DOUBLE_CLICK" | "MOUSE_DOWN" | "MOUSE_UP" | "RIGHT_CLICK" | "RIGHT_DOUBLE_CLICK" | "RIGHT_MOUSE_DOWN" | "RIGHT_MOUSE_UP" | "SCROLL_UP" | "SCROLL_DOWN" | "SCROLL_CLICK";
export type HandlerProps = "onClick" | "onDoubleClick" | "onMouseDown" | "onMouseUp" | "onRightClick" | "onRightDoubleClick" | "onRightMouseDown" | "onRightMouseUp" | "onScrollUp" | "onScrollDown" | "onScrollClick";
export type MouseEvent = {
    clientX: number;
    clientY: number;
    target: YogaNode;
    targetPosition: CornerPositions;
};
export type StdinData = Omit<MouseEvent, "target" | "targetPosition">;
export type Handler = (e: MouseEvent) => unknown;
export type ComponentData = {
    [ComponentId: string]: {
        target: YogaNode;
        targetPosition: CornerPositions;
        setLeftActive: (b: boolean) => void;
        setRightActive: (b: boolean) => void;
        trackLeftActive: boolean;
        trackRightActive: boolean;
        componentHandler?: Handler;
    };
};
export type TitleData = {
    [TitleId: string]: {
        isTitle: true;
        target: YogaNode;
        targetPosition: CornerPositions;
        titleHandler?: Handler;
    };
};
export type ZIndexRegistry = Record<HandlerProps, ComponentData | TitleData>;
export type HandlerRegistry = {
    [zIndex: number]: ZIndexRegistry;
};
export type Buttons = "LEFT_BTN_DOWN" | "SCROLL_BTN_DOWN" | "RIGHT_BTN_DOWN" | "RELEASE_BTN" | "SCROLL_UP" | "SCROLL_DOWN";
export declare const MOUSE_ESCAPE_CODES: {
    readonly ON: "\u001B[?1000h";
    readonly OFF: "\u001B[?1000l";
};
export default class Mouse {
    private PropsToEvents;
    private Emitter;
    private Handlers;
    private unsubscribers;
    private btnDownState;
    private dblClickState;
    private listening;
    private hasSetExitHandler;
    constructor();
    resetHandlers(): void;
    private newZIndexRegistry;
    setMouseReporting: (on: boolean) => void;
    handleEvent: (prop: HandlerProps) => (event: StdinData) => void;
    listen: () => void;
    pause: () => void;
    subscribeTitle({ ID, target, targetPosition, zIndex, title, }: {
        ID: string;
        target: YogaNode;
        targetPosition: CornerPositions;
        zIndex: number;
        title: Title;
    }): void;
    subscribeComponent: <T extends { [P in HandlerProps]?: any; }>({ props, ID, target, targetPosition, setLeftActive, setRightActive, trackLeftActive, trackRightActive, zIndex, }: {
        props: T;
        ID: string;
        target: YogaNode;
        targetPosition: CornerPositions;
        setLeftActive: (b: boolean) => void;
        setRightActive: (b: boolean) => void;
        trackLeftActive: boolean;
        trackRightActive: boolean;
        zIndex: number;
    }) => void;
    unsubscribeComponent: (ID: string) => void;
    private getButtonType;
    isMouseEvent: (buffer: Buffer) => boolean;
    handleStdin: (buffer: Buffer) => void;
    private beginDoubleClickTimer;
}
