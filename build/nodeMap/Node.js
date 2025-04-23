import React from "react";
import { NodeContext, useIsFocus } from "../focus/FocusContext.js";
import Box from "../components/Box.js";
export function Node(props) {
    const parentIsFocused = useIsFocus();
    const nodeIsFocused = props.name === props.nodesView._node;
    const isDeepFocus = parentIsFocused && nodeIsFocused;
    const isShallowFocus = !parentIsFocused && nodeIsFocused;
    return (React.createElement(NodeContext.Provider, { value: {
            name: props.name,
            isFocus: isDeepFocus,
            isShallowFocus: isShallowFocus,
            control: props.nodesView._control,
        } }, props.children));
}
Node.Box = function (props) {
    const { children, name, nodesView, ...boxProps } = props;
    return (React.createElement(Box, { ...boxProps },
        React.createElement(Node, { name: name, nodesView: nodesView }, children)));
};
//# sourceMappingURL=Node.js.map