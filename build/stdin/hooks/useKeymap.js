import { DefaultStdin } from "../Stdin.js";
import { randomUUID } from "crypto";
import { useEffect, useState } from "react";
import ProcessGate from "../ProcessGate.js";
import { useTypedEvent } from "./useEvent.js";
import { useIsFocus } from "../../focus/FocusContext.js";
import ModalStack from "../../modal/ModalStack.js";
import { useModalLevel } from "../../modal/ModalContext.js";
export function useKeymap(keymap, opts) {
    opts = { priority: "default", ...opts };
    const [ID] = useState(randomUUID());
    const priority = opts.priority ?? "default";
    const focused = useIsFocus();
    const componentLevel = useModalLevel(); // If not within a Modal this is just 0
    if (priority !== "never") {
        DefaultStdin.listen();
    }
    useEffect(() => {
        ProcessGate.updatePriority(ID, priority);
        return () => {
            ProcessGate.removeHook(ID);
        };
    }, [priority]);
    useEffect(() => {
        const handleStdin = (stdin) => {
            const canProcess = ProcessGate.canProcess(ID, priority) &&
                ModalStack.isActiveModalLevel(componentLevel);
            if (focused && canProcess) {
                DefaultStdin.Keyboard.processConfig(keymap);
            }
            const event = DefaultStdin.Keyboard.getEvent();
            DefaultStdin.Keyboard.emitEvent(event, stdin);
        };
        DefaultStdin.Keyboard.addComponentListener(handleStdin);
        return () => {
            DefaultStdin.Keyboard.removeComponentListener(handleStdin);
        };
    });
    const { useEvent } = useTypedEvent();
    return {
        useEvent,
    };
}
//# sourceMappingURL=useKeymap.js.map