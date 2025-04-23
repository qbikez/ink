import React from "react";
import chalk from "chalk";
import colorize from "../colorize.js";
export const styleText = (style) => (children) => {
    if (style.dimColor) {
        children = chalk.dim(children);
    }
    if (style.color) {
        children = colorize(children, style.color, "foreground");
    }
    if (style.backgroundColor && style.backgroundColor !== "inherit") {
        children = colorize(children, style.backgroundColor, "background");
    }
    if (style.bold) {
        children = chalk.bold(children);
    }
    if (style.italic) {
        children = chalk.italic(children);
    }
    if (style.underline) {
        children = chalk.underline(children);
    }
    if (style.strikethrough) {
        children = chalk.strikethrough(children);
    }
    if (style.inverse) {
        children = chalk.inverse(children);
    }
    return children;
};
/**
 * This component can display text, and change its style to make it colorful, bold, underline, italic or strikethrough.
 */
export default function Text({ color, backgroundColor = "inherit", dimColor = false, bold = false, italic = false, underline = false, strikethrough = false, inverse = false, wrap = "wrap", styles, children, }) {
    if (children === undefined || children === null) {
        return null;
    }
    const textStyles = {
        flexGrow: 0,
        flexShrink: 1,
        flexDirection: "row",
        textWrap: wrap,
        backgroundColor,
        color,
        inverse,
        dimColor,
        bold,
        italic,
        underline,
        strikethrough,
        wrap,
    };
    if (styles) {
        for (const key in styles) {
            // @ts-ignore
            if (styles[key] && !textStyles[key]) {
                // @ts-ignore
                textStyles[key] = styles[key];
            }
        }
    }
    const transform = styleText(textStyles);
    return (React.createElement("ink-text", { style: textStyles, internal_transform: transform, internalStyles: { ...textStyles } }, children));
}
//# sourceMappingURL=Text.js.map