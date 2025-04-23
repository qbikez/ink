import React from "react";
import { BoxProps } from "../index.js";
type TitleStyle = "strike-through" | "tab-deep" | "tab-shallow" | "tab-deep-no-border" | "tab-shallow-no-border";
type Justify = "start" | "center" | "end";
type Align = "start" | "end";
export type Props = {
    title: string;
    color?: BoxProps["borderColor"];
    tabBorderStyle?: BoxProps["borderStyle"];
    style?: TitleStyle;
    justify?: Justify;
    align?: Align;
};
export declare function Title({ title, style, color, tabBorderStyle, justify, align, }: Props): React.ReactNode;
export {};
