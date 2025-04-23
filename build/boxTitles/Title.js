import React from "react";
import Box from "../components/Box.js";
import { Text } from "../index.js";
import TabbedBorders from "./TabbedBorders.js";
import { usePageFocus } from "../focus/FocusContext.js";
const FLEX_VALUES_MAP = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
};
/*
 * @deprecated
 * */
export function Title({ title, style = "strike-through", color = undefined, tabBorderStyle = "single", 
// tabBorderColor = undefined,
justify = "center", align = "start", }) {
    // Adjust Inline Axis
    let marginLeft;
    if (justify === "start")
        marginLeft = 1;
    if (justify === "end")
        marginLeft = -1;
    // Adjust Block Axis
    let marginTop = align === "start" ? -1 : 1;
    // Adjust for tabbed title
    if (style !== "strike-through") {
        const additionalTabMargin = marginTop;
        marginTop += additionalTabMargin;
        if (style.includes("deep")) {
            marginTop += additionalTabMargin;
        }
    }
    // Create border configuration objects
    const isShallow = style.includes("shallow");
    const isDeep = style.includes("deep");
    const hasBorder = !style.includes("no-border");
    // prettier-ignore
    let borderConfiguration = undefined;
    if (isShallow && tabBorderStyle && hasBorder) {
        const config = TabbedBorders.shallow(tabBorderStyle);
        borderConfiguration = align === "start" ? config.top : config.bottom;
    }
    if (isDeep && tabBorderStyle && hasBorder) {
        const config = TabbedBorders.deep(tabBorderStyle);
        borderConfiguration = align === "start" ? config.top : config.bottom;
    }
    return (React.createElement(Box, { wipeBackground: false, position: "absolute", height: "100", width: "100", flexShrink: 0, marginLeft: marginLeft, marginTop: marginTop, justifyContent: FLEX_VALUES_MAP[justify], alignItems: FLEX_VALUES_MAP[align], borderColor: "inherit" },
        React.createElement(TitleImplementation, { title: title, color: color, 
            // borderColor={tabBorderColor}
            borderConfiguration: borderConfiguration })));
}
function TitleImplementation(props) {
    const isPageFocus = usePageFocus();
    if (!isPageFocus)
        return null;
    if (props.borderConfiguration === undefined) {
        return React.createElement(Text, { color: props.color }, props.title);
    }
    return (React.createElement(Box, { borderStyle: props.borderConfiguration, borderColor: "inherit", backgroundColor: "inherit", flexShrink: 0, zIndex: 1 },
        React.createElement(Text, { color: props.color }, props.title)));
}
//# sourceMappingURL=Title.js.map