import React, { useEffect } from "react";
import Box from "../components/Box.js";
import { useKeymap } from "../index.js";
import { usePageFocus } from "../focus/FocusContext.js";
import ModalStack from "./ModalStack.js";
import { ModalContext, useModalContext } from "./ModalContext.js";
export function Modal(props) {
    const modalCtx = useModalContext();
    const isPageFocus = usePageFocus();
    const visible = props.modal._vis && isPageFocus && modalCtx.visible;
    const ID = props.modal._ID;
    return (React.createElement(ModalContext.Provider, { value: {
            ID: ID,
            visible: visible,
            level: modalCtx.level + 1,
            hide: props.modal._hideModal,
        } },
        React.createElement(ModalConsumer, { ...props, visible: visible })));
}
function ModalConsumer(props) {
    let { modal, visible, justifySelf = "center", alignSelf = "center", xOffset = 0, yOffset = 0, zIndex = 1, closeOnOutsideClick = true, children, ...displayProps } = props;
    const ctx = useModalContext();
    useEffect(() => {
        ModalStack.add(ctx.ID, ctx.visible, ctx.level);
    }, [ctx.visible, ctx.level]);
    useEffect(() => {
        return () => {
            ModalStack.remove(ctx.ID);
        };
    }, []);
    const hideKeymap = modal._hideKeymap;
    const hideEvent = modal._hideEvent;
    const hideModal = modal._hideModal;
    const internalKeymap = hideKeymap ? { [hideEvent]: hideKeymap } : {};
    const { useEvent } = useKeymap(internalKeymap);
    useEvent(hideEvent, hideModal);
    if (!visible)
        return null;
    return (React.createElement(Box, { position: "absolute", zIndex: zIndex, height: "100", width: "100", 
        // zIndex wipes background by default, we don't want that in the overlay Box
        wipeBackground: false, 
        // Position the inner Box
        justifyContent: justifySelf, alignItems: alignSelf, marginLeft: xOffset, marginTop: yOffset, 
        // Handle outside click
        onClick: closeOnOutsideClick ? () => props.modal._hideModal() : () => { } },
        React.createElement(Box, { ...displayProps, zIndex: zIndex + 1, wipeBackground: true, onClick: displayProps.onClick ?? (() => { }) }, children)));
}
//# sourceMappingURL=Modal.js.map