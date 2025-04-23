import { useState } from "react";
import { useTextInput } from "../textInput/useTextInput.js";
/*
 * Wraps the setValue function from useTextInput in a function that updates the state
 * of the styles prop so that the declared styles of different outcomes accurately
 * reflect each other.
 * */
export function useCli({ inputStyles, rejectStyles, resolveStyles, }) {
    const { onChange, setValue, insert, enterInsert, value } = useTextInput();
    const [textStyleType, setTextStyleType] = useState("INPUT");
    const hasStyles = inputStyles || rejectStyles || resolveStyles;
    const internalSetValue = (style, value, insert) => {
        setValue(value, insert);
        if (hasStyles) {
            setTextStyleType(style);
        }
    };
    let textStyle = {};
    if (hasStyles) {
        if (textStyleType === "INPUT" && inputStyles) {
            textStyle = inputStyles;
        }
        if (textStyleType === "REJECT" && rejectStyles) {
            textStyle = rejectStyles;
        }
        if (textStyleType === "RESOLVE" && resolveStyles) {
            textStyle = resolveStyles;
        }
    }
    return {
        onChange,
        setValue: internalSetValue,
        value,
        insert,
        enterInsert,
        textStyle,
    };
}
//# sourceMappingURL=useCli.js.map