import { useRef, useState } from "react";
import assert from "assert";
import { ScrollAPI } from "./ScrollAPI.js";
export function useScroll(itemsLength, opts) {
    assert(opts.windowSize !== "fit" && opts.windowSize !== undefined);
    const [state, setState] = useState({
        idx: 0,
        start: 0,
        end: Math.min(Math.floor(opts.windowSize ?? itemsLength), itemsLength),
        _winSize: Math.min(Math.floor(opts.windowSize ?? itemsLength), itemsLength),
    });
    const LENGTH = itemsLength;
    const WINDOW_SIZE = Math.min(state._winSize ?? itemsLength, itemsLength);
    // If a list is using 'fit' sizing and its containing page goes out of view,
    // the window size becomes 0.  When it comes back in view, the start and end
    // indexes might be different.  This is used to attempt to keep the same
    // start and end indexes if that is possible
    const prevBounds = useRef({
        start: state.start,
        end: state.end,
    });
    const firstScroll = useRef(true);
    const scrollAPI = new ScrollAPI({
        state,
        setState,
        LENGTH,
        WINDOW_SIZE,
        opts,
        prevBounds: prevBounds.current,
    });
    const desiredWinSize = opts.fixedWindowSize !== undefined
        ? Math.min(opts.fixedWindowSize, itemsLength)
        : WINDOW_SIZE;
    if (desiredWinSize !== state._winSize) {
        scrollAPI.modifyWinSize(desiredWinSize);
    }
    else {
        scrollAPI.handle(firstScroll.current && opts.startIndex ? opts.startIndex : undefined);
        firstScroll.current = false;
    }
    if (state._winSize > 0) {
        prevBounds.current = { start: state.start, end: state.end };
    }
    const scrollState = state;
    const setScrollState = (nextState) => {
        try {
            assert.deepStrictEqual(state, nextState);
            return;
        }
        catch {
            setState(nextState);
        }
    };
    return {
        scrollState,
        setScrollState,
        LENGTH,
        WINDOW_SIZE,
        scrollAPI: scrollAPI.getAPI(),
    };
}
//# sourceMappingURL=useScroll.js.map