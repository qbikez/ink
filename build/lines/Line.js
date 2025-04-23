import React from "react";
export function Line({ ...props }) {
    if (props.direction === "horizontal") {
        props.width = props.width ?? "100";
    }
    else {
        props.height = props.height ?? "100";
    }
    props.position = "relative";
    props.flexGrow = props.flexGrow ?? 0;
    props.flexShrink = props.flexShrink ?? 1;
    return React.createElement("ink-line", { style: { ...props } });
}
export function VerticalLine(props) {
    const { length, minLength, ...rest } = props;
    const lineProps = {
        height: length,
        minHeight: minLength,
        width: 1,
        direction: "vertical",
        ...rest,
    };
    return React.createElement(Line, { ...lineProps });
}
export function HorizontalLine(props) {
    const { length, minLength, ...rest } = props;
    const lineProps = {
        width: length,
        minWidth: minLength,
        height: 1,
        direction: "horizontal",
        ...rest,
    };
    return React.createElement(Line, { ...lineProps });
}
//# sourceMappingURL=Line.js.map