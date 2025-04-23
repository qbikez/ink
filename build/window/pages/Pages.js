import React from "react";
import { Window } from "../Window.js";
export function Pages(props) {
    const windowProps = {
        ...props,
        type: "PAGES",
        scrollbar: { hide: true },
        viewState: props.pageView,
    };
    if (props.pageView._numPages !== React.Children.count(props.children)) {
        console.warn("usePages/Pages warning: Mismatch between number of pages in usePages hook and children in Pages component.");
    }
    return React.createElement(Window, { ...windowProps }, props.children);
}
//# sourceMappingURL=Pages.js.map