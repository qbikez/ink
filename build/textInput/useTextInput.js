import { useState } from "react";
import { deepEqual } from "../utility/deepEqual.js";
export function useTextInput(initialValue = "") {
    const [state, setState] = useState({
        value: initialValue,
        idx: initialValue.length,
        insert: false,
        stdin: null,
        window: {
            start: 0,
            end: initialValue.length,
        },
    });
    const update = (nextState) => {
        setState((prev) => {
            if (!deepEqual(prev, nextState)) {
                return nextState;
            }
            else {
                return prev;
            }
        });
    };
    const onChange = () => {
        return { update, state };
    };
    const enterInsert = () => {
        if (!state.insert) {
            setState((prev) => {
                return { ...prev, insert: true };
            });
        }
    };
    const setValue = (nextValue, insert) => {
        setState((prev) => {
            const nextInsert = insert ?? prev.insert;
            return {
                ...prev,
                value: nextValue,
                idx: nextValue.length,
                insert: nextInsert,
                window: { start: 0, end: nextValue.length },
            };
        });
    };
    return {
        value: state.value,
        insert: state.insert,
        onChange: onChange,
        setValue: setValue,
        enterInsert: enterInsert,
    };
}
//# sourceMappingURL=useTextInput.js.map