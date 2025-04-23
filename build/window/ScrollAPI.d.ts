import { PrevBounds, State } from "./useScroll.js";
import { Opts as UseScrollOpts } from "./useScroll.js";
export type Initializer = {
    state: State;
    setState: (next: State) => void;
    LENGTH: number;
    WINDOW_SIZE: number;
    prevBounds?: PrevBounds;
    opts: UseScrollOpts;
};
export type ScrollAPIPublicFns = Omit<{
    [P in keyof ScrollAPI]: ScrollAPI[P] extends Function ? ScrollAPI[P] : never;
}, "getAPI" | "handle">;
export declare class ScrollAPI {
    private readonly state;
    private readonly setState;
    private readonly LENGTH;
    private readonly WINDOW_SIZE;
    private readonly prevBounds?;
    private readonly centerScroll;
    private readonly fallthrough;
    constructor({ state, setState, LENGTH, WINDOW_SIZE, opts, prevBounds }: Initializer);
    getAPI: () => ScrollAPIPublicFns;
    handle: (nextIdx?: number) => void;
    goToIndex: (nextIdx: number, center?: boolean) => void;
    nextItem: () => void;
    prevItem: () => void;
    scrollDown: (n?: number) => void;
    scrollUp: (n?: number) => void;
    private getNormalScrollChanges;
    private getCenterScrollChanges;
    private centerIdx;
    private getTrueWindowSize;
    private constrainWindow;
    private normalizeWindow;
    modifyWinSize: (nextSize: number) => void;
    private rangeCheck;
}
