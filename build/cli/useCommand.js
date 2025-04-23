import { useEffect } from "react";
import { CliEmitter } from "./AbstractCli.js";
import { useIsFocus } from "../focus/FocusContext.js";
export function useCommand(command, handler, extraFocusCheck) {
    const isFocus = useIsFocus();
    extraFocusCheck = extraFocusCheck ?? true;
    useEffect(() => {
        if (!isFocus || !extraFocusCheck)
            return;
        CliEmitter.on(command, handler);
        return () => {
            CliEmitter.off(command, handler);
        };
    });
}
//# sourceMappingURL=useCommand.js.map