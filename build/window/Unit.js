import React, { useEffect, useRef } from "react";
import Box from "../components/Box.js";
import { DefaultStdin } from "../stdin/Stdin.js";
import { ListItemContext, PageContext } from "../focus/FocusContext.js";
export function Unit({ type, listeners, items, setItems, control, index, isShallowFocus, isDeepFocus, stretch, isHidden, node, }) {
    useMultipleEventsWithoutContextChecks(listeners);
    const display = isHidden ? "none" : "flex";
    const dimension = type === "PAGES" || stretch ? "100" : undefined;
    const flexShrink = dimension ? 1 : 0;
    const unit = (React.createElement(Box, { display: display, height: dimension, width: dimension, flexShrink: flexShrink, key: node.key }, node));
    if (type === "PAGES") {
        return (React.createElement(Page, { key: node.key, isFocus: isDeepFocus, isShallowFocus: isShallowFocus, index: index, control: control }, unit));
    }
    if (type === "ITEMS") {
        return (React.createElement(ListItem, { key: node.key, isFocus: isDeepFocus, isShallowFocus: isShallowFocus, index: index, items: items, setItems: setItems, control: control }, unit));
    }
    throw new Error("Unhandled Window Unit type");
}
function ListItem(props) {
    const onFocusChangeGenerator = useFocusChangeGenerators(props.isFocus);
    return (React.createElement(ListItemContext.Provider, { value: {
            isFocus: props.isFocus,
            isShallowFocus: props.isShallowFocus,
            itemIndex: props.index,
            listIndex: props.control.currentIndex,
            items: props.items,
            setItems: props.setItems,
            control: props.control,
            onFocus: onFocusChangeGenerator("onFocus"),
            onBlur: onFocusChangeGenerator("onBlur"),
        } }, props.children));
}
function Page(props) {
    const onFocusChangeGenerator = useFocusChangeGenerators(props.isFocus);
    return (React.createElement(PageContext.Provider, { value: {
            isFocus: props.isFocus,
            isShallowFocus: props.isShallowFocus,
            index: props.index,
            control: props.control,
            onPageFocus: onFocusChangeGenerator("onFocus"),
            onPageBlur: onFocusChangeGenerator("onBlur"),
        } }, props.children));
}
function useFocusChangeGenerators(isFocus) {
    // Like a ref, but not not preserved across renders.  Calling the generated
    // functions from onFocusChangeGenerator changes these values which can
    // then be called in the effect callback.  Basically, a way of moving state
    // back up, so that the end user doesn't need to write the useEffect themselves
    const cache = { onFocus: [], onLeaveFocus: [] };
    const onFocusChangeGenerator = (type) => {
        return (cb) => {
            if (type === "onFocus") {
                cache.onFocus.push(cb);
            }
            else {
                cache.onLeaveFocus.push(cb);
            }
        };
    };
    const hasBeenFocused = useRef(false);
    useEffect(() => {
        if (isFocus) {
            cache.onFocus.forEach((cb) => cb());
            hasBeenFocused.current = true;
        }
        else {
            if (hasBeenFocused.current) {
                cache.onLeaveFocus.forEach((cb) => cb());
            }
        }
    }, [isFocus]);
    return onFocusChangeGenerator;
}
/*
 * Like useEvent, but does not perform context checks before calling handlers.
 * No context checks are needed here because the Window component won't add any
 * listeners if the focus state isn't appropriate
 * */
function useMultipleEventsWithoutContextChecks(nextListeners) {
    const oldListeners = useRef([]);
    useEffect(() => {
        oldListeners.current = nextListeners;
        nextListeners.forEach((listener) => {
            DefaultStdin.Keyboard.addEventListener(listener.event, listener.handler);
        });
        return () => {
            oldListeners.current.forEach((listener) => {
                DefaultStdin.Keyboard.removeEventListener(listener.event, listener.handler);
            });
        };
    });
}
//# sourceMappingURL=Unit.js.map