import { ScrollAPIPublicFns } from "./ScrollAPI.js";
import { Opts as UseWindowOpts } from "./useWindow.js";
export type Opts = Pick<UseWindowOpts, "fallthrough" | "centerScroll" | "windowSize" | "startIndex"> & {
    fixedWindowSize?: number;
};
export type State = {
    idx: number;
    start: number;
    end: number;
    _winSize: number;
};
export type Return = {
    scrollState: State;
    setScrollState: (nextState: State) => void;
    scrollAPI: ScrollAPIPublicFns;
    LENGTH: number;
    WINDOW_SIZE: number;
};
export type PrevBounds = {
    start: number;
    end: number;
};
export declare function useScroll(itemsLength: number, opts: Opts): Return;
