import React, { createContext, useContext, useState } from "react";
import { executeShellCommand } from "./executeShellCommand.js";
import assert from "assert";
export const ShellCommandContext = createContext(null);
export function useShellCommand() {
    const ctx = useContext(ShellCommandContext);
    assert(ctx);
    return {
        exec: (...args) => {
            const [cmd, message] = args;
            return executeShellCommand(cmd, message)(ctx.render);
        },
    };
}
export function ShellCommmandProvider(props) {
    const [count, setCount] = useState(0);
    const render = () => setCount(count + 1);
    return (React.createElement(ShellCommandContext.Provider, { value: { render } }, props.children));
}
//# sourceMappingURL=ShellCommandContext.js.map