import { useEffect } from "react";
import { DefaultStdin } from "../Stdin.js";
import { useIsFocus } from "../../focus/FocusContext.js";
import { useModalLevel } from "../../modal/ModalContext.js";
import ModalStack from "../../modal/ModalStack.js";
export function useEvent(event, handler, extraFocusCheck) {
    const isFocus = useIsFocus();
    extraFocusCheck = extraFocusCheck ?? true;
    const componentLevel = useModalLevel();
    useEffect(() => {
        if (!isFocus || !extraFocusCheck)
            return;
        const innerHandler = (stdin, keyinput) => {
            if (ModalStack.isActiveModalLevel(componentLevel)) {
                handler(stdin, keyinput);
            }
        };
        DefaultStdin.Keyboard.addEventListener(event, innerHandler);
        return () => {
            DefaultStdin.Keyboard.removeEventListener(event, innerHandler);
        };
    }, [{}]);
}
export function useTypedEvent() {
    return { useEvent: useEvent };
}
//# sourceMappingURL=useEvent.js.map