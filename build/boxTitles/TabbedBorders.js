const MAP = {
    top: {
        round: "─",
        bold: "━",
        single: "─",
        double: "═",
        doubleSingle: "═",
        singleDouble: "─",
        arrow: "↓",
        classic: "-",
    },
    bottom: {
        round: "─",
        bold: "━",
        single: "─",
        double: "═",
        doubleSingle: "═",
        singleDouble: "─",
        arrow: "↑",
        classic: "-",
    },
    left: {
        round: "│",
        bold: "┃",
        single: "│",
        double: "║",
        doubleSingle: "│",
        singleDouble: "║",
        arrow: "→",
        classic: "|",
    },
    right: {
        round: "│",
        bold: "┃",
        single: "│",
        double: "║",
        doubleSingle: "│",
        singleDouble: "║",
        arrow: "←",
        classic: "|",
    },
    topLeft: {
        round: "╭",
        bold: "┏",
        single: "┌",
        double: "╔",
        doubleSingle: "╒",
        singleDouble: "╓",
        arrow: "↘",
        classic: "+",
    },
    topRight: {
        round: "╮",
        bold: "┓",
        single: "┐",
        double: "╗",
        doubleSingle: "╕",
        singleDouble: "╖",
        arrow: "↙",
        classic: "+",
    },
    bottomLeft: {
        round: "╰",
        bold: "┗",
        single: "└",
        double: "╚",
        doubleSingle: "╘",
        singleDouble: "╙",
        arrow: "↗",
        classic: "+",
    },
    bottomRight: {
        round: "╯",
        bold: "┛",
        single: "┘",
        double: "╝",
        doubleSingle: "╛",
        singleDouble: "╜",
        arrow: "↖",
        classic: "+",
    },
};
function shallow(borderStyle) {
    const top = {};
    const bottom = {};
    for (const key in MAP) {
        top[key] = MAP[key][borderStyle];
        bottom[key] = MAP[key][borderStyle];
    }
    // overwrite bottom
    bottom.left = bottom.topRight;
    bottom.right = bottom.topLeft;
    bottom.top = " ";
    bottom.topLeft = " ";
    bottom.topRight = " ";
    // overwrite top
    top.left = top.bottomRight;
    top.right = top.bottomLeft;
    top.bottom = " ";
    top.bottomLeft = " ";
    top.bottomRight = " ";
    return { top, bottom };
}
function deep(borderStyle) {
    const top = {};
    const bottom = {};
    for (const key in MAP) {
        top[key] = MAP[key][borderStyle];
        bottom[key] = MAP[key][borderStyle];
    }
    // overwrite bottom
    bottom.topLeft = MAP.topRight[borderStyle];
    bottom.topRight = MAP.topLeft[borderStyle];
    bottom.top = " ";
    // overwrite top
    top.bottomLeft = MAP.bottomRight[borderStyle];
    top.bottomRight = MAP.bottomLeft[borderStyle];
    top.bottom = " ";
    return { top, bottom };
}
export default {
    shallow,
    deep,
};
//# sourceMappingURL=TabbedBorders.js.map