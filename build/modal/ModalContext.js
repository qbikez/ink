import { createContext, useContext } from "react";
export const ModalContext = createContext(null);
/*
 * A component with no ModalContext is assumed to have a level of 0;
 * A component that is not visible has a level of -Infinity to ensure that it never
 * allows it to be execute callbacks.
 * A component with ModalContext returns its level.
 * */
export function useModalLevel() {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        return 0;
    }
    if (modalContext.visible) {
        return modalContext.level;
    }
    else {
        return -Infinity;
    }
}
export function useModalContext() {
    const modalContext = useContext(ModalContext);
    // Return a 'root level' context
    if (!modalContext) {
        return {
            level: 0,
            visible: true,
            ID: "",
            hide: () => { },
        };
    }
    return modalContext;
}
//# sourceMappingURL=ModalContext.js.map