import { Opts as UseWindowOpts } from "../useWindow.js";
import { Return as UseWindowReturn } from "../useWindow.js";
export type PageView = UseWindowReturn["viewState"] & {
    _numPages: number;
};
export type PagesControl = {
    currentPage: UseWindowReturn["control"]["currentIndex"];
    goToPage: UseWindowReturn["control"]["goToIndex"];
    nextPage: UseWindowReturn["control"]["nextItem"];
    prevPage: UseWindowReturn["control"]["prevItem"];
};
type Return = {
    pageView: PageView;
    control: PagesControl;
};
type Opts = Pick<UseWindowOpts, "fallthrough">;
export declare function usePages(numPages: number, opts?: Opts): Return;
export {};
