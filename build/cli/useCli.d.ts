import { Except } from "type-fest";
import { TextProps } from "../index.js";
export type StyleType = "INPUT" | "RESOLVE" | "REJECT";
export type SetValue = (style: StyleType, value: string, insert?: boolean) => void;
export type TextStyles = Except<TextProps, "wrap" | "children">;
export declare function useCli({ inputStyles, rejectStyles, resolveStyles, }: {
    inputStyles?: TextStyles;
    rejectStyles?: TextStyles;
    resolveStyles?: TextStyles;
}): {
    onChange: () => {
        state: import("../textInput/useTextInput.js").State;
        update: (nextState: import("../textInput/useTextInput.js").State) => void;
    };
    setValue: SetValue;
    value: string;
    insert: boolean;
    enterInsert: () => void;
    textStyle: {
        readonly color?: import("../index.js").Color | undefined;
        readonly backgroundColor?: import("../index.js").Color | "inherit" | undefined;
        readonly dimColor?: boolean | undefined;
        readonly bold?: boolean | undefined;
        readonly italic?: boolean | undefined;
        readonly underline?: boolean | undefined;
        readonly strikethrough?: boolean | undefined;
        readonly inverse?: boolean | undefined;
        readonly styles?: import("../index.js").Styles["Text"] | undefined;
    };
};
