import React, { useEffect, useState } from "react";
import Text from "../components/Text.js";
import Box from "../components/Box.js";
import { DefaultStdin } from "../stdin/Stdin.js";
import InternalEvents from "../utility/InternalEvents.js";
import { deepEqual } from "../utility/deepEqual.js";
export function StdinState({ eventStyles = {}, registerStyles = {}, showEvents = true, showRegister = true, width = 20, }) {
    const [state, setState] = useState({
        event: "",
        register: "",
    });
    useEffect(() => {
        const handler = (keyboardState) => {
            const isTextInput = keyboardState.isTextInput;
            const nextEvent = keyboardState.event ?? "";
            const nextRegister = keyboardState.chars ?? "";
            const update = (next) => {
                setState((prev) => {
                    if (!deepEqual(next, prev)) {
                        return next;
                    }
                    else {
                        return prev;
                    }
                });
            };
            if (isTextInput || nextEvent.startsWith(InternalEvents.Prefix)) {
                return update({ event: "", register: "" });
            }
            update({ event: nextEvent, register: nextRegister });
        };
        DefaultStdin.Keyboard.subscribeComponentToStateChanges(handler);
        return () => {
            DefaultStdin.Keyboard.unsubscribeComponentToStateChanges(handler);
        };
    });
    let styles = {};
    let text = "";
    if (state.event && showEvents) {
        styles = eventStyles;
        text = state.event;
    }
    if (!state.event && state.register && showRegister) {
        styles = registerStyles;
        text = state.register;
    }
    return (React.createElement(Box, { width: width },
        React.createElement(Text, { wrap: "truncate-end", ...styles }, text ?? " ")));
}
//# sourceMappingURL=StdinState.js.map