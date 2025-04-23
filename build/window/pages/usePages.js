import { useWindow } from "../useWindow.js";
export function usePages(numPages, opts = { fallthrough: false }) {
    const windowOpts = {
        windowSize: 1,
        centerScroll: false,
        navigation: "none",
        fallthrough: opts.fallthrough,
    };
    const pages = useWindow(numPages, windowOpts);
    const pageView = Object.freeze({
        ...pages.viewState,
        _numPages: numPages,
    });
    return {
        pageView,
        control: {
            currentPage: pages.control.currentIndex,
            goToPage: pages.control.goToIndex,
            nextPage: pages.control.nextItem,
            prevPage: pages.control.prevItem,
        },
    };
}
//# sourceMappingURL=usePages.js.map