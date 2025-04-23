import React from "react";
import { BaseProps } from "../baseProps.js";
import { TextProps } from "../index.js";
export type LineStyleOptions = Pick<TextProps, "color" | "bold" | "dimColor">;
export type IntrinsicLineProps = BaseProps & {
    direction: "horizontal" | "vertical";
    char?: string;
};
export declare function Line({ ...props }: IntrinsicLineProps): React.ReactNode;
type Props = {
    length?: BaseProps["height"];
    minLength?: BaseProps["minHeight"];
    char?: string;
} & LineStyleOptions;
export declare function VerticalLine(props: Props): React.ReactNode;
export declare function HorizontalLine(props: Props): React.ReactNode;
export {};
