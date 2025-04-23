import { ViewState, WindowControl } from "./types.js";
import { Except } from "type-fest";
import { SetState } from "../utility/types.js";
export type Opts = {
    windowSize?: number | "fit";
    unitSize?: number | "stretch" | "fit-unit";
    centerScroll?: boolean;
    fallthrough?: boolean;
    startIndex?: number;
    navigation?: "none" | "vi-vertical" | "vi-horizontal" | "arrow-vertical" | "arrow-horizontal";
};
type ReturnObject<T> = {
    viewState: ViewState;
    control: Except<WindowControl, "modifyWinSize">;
    items: T;
    setItems: SetState<T>;
};
export type Return<T extends readonly any[] | any[] | number = any[]> = T extends readonly any[] ? ReturnObject<T[number][]> : T extends any[] ? ReturnObject<T> : ReturnObject<null[]>;
export declare function useWindow<T extends readonly any[] | any[] | number>(itemsOrLength: T, opts?: Opts): Return<T>;
export {};
