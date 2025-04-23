import React from "react";
import { Window } from "../Window.js";
export function List({ ...props }) {
    props.fitX = props.fitX ?? false;
    props.fitY = props.fitY ?? false;
    const windowProps = {
        ...props,
        viewState: props.listView,
        type: "ITEMS",
    };
    return React.createElement(Window, { ...windowProps }, props.children);
}
//# sourceMappingURL=List.js.map