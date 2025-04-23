import React from "react";
import { AbstractCli } from "./AbstractCli.js";
import { Modal } from "../modal/Modal.js";
import { useModal } from "../modal/useModal.js";
export function CliModal(props) {
    const { commands, enterKeymap = [{ input: ":" }], exitKeymap = [{ key: "return" }, { key: "esc" }], prompt, inputStyles, resolveStyles, rejectStyles, persistPrompt, ...modalProps } = props;
    const { modal, hideModal, showModal } = useModal({
        show: enterKeymap,
        hide: null,
    });
    return (React.createElement(Modal, { modal: modal, ...modalProps },
        React.createElement(AbstractCli, { commands: commands, autoEnter: true, enterKeymap: enterKeymap, exitKeymap: exitKeymap, hideModal: hideModal, showModal: showModal, prompt: prompt, persistPrompt: persistPrompt, inputStyles: inputStyles, resolveStyles: resolveStyles, rejectStyles: rejectStyles })));
}
//# sourceMappingURL=CliModal.js.map