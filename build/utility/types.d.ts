import { Except, LiteralUnion } from "type-fest";
import { ForegroundColorName } from "chalk";
import { BaseProps } from "../baseProps.js";
import { Props as TextProps } from "../components/Text.js";
import { KeyInput } from "../stdin/Keyboard.js";
import { SpecialKeys } from "../stdin/AsciiMap.js";
import React from "react";
export type KeyOf<T extends object> = T extends object ? PropertyKeyToString<keyof T> : never;
export type OmitStartsWith<T extends object, S extends string> = {
    [P in keyof T as P extends `${S}${infer _}` ? never : P]: T[P];
};
export type PickStartsWith<T extends object, S extends string> = {
    [P in keyof T as P extends `${S}${infer _}` ? P : never]: T[P];
};
export type DropReadonly<T extends object> = {
    -readonly [P in keyof T]: T[P];
};
export type PropertyKeyToString<T> = T extends number ? `${T}` : T extends string ? T : never;
export type SetState<T = any> = React.Dispatch<React.SetStateAction<T>>;
export type Color = LiteralUnion<ForegroundColorName, string>;
export type Styles = OmitStartsWith<BaseProps, "on">;
export type StylesConfig = {
    Box: DropReadonly<Except<Styles, "styles" | "textWrap">>;
    Text: DropReadonly<Except<TextProps, "styles" | "children">>;
    Title: DropReadonly<Except<TextProps, "styles" | "children" | "wrap">> & {
        title: string;
    };
    Scrollbar: {
        hide?: boolean;
        align?: "start" | "end";
        style?: "single" | "bold" | {
            char: string;
        };
    } & DropReadonly<Pick<TextProps, "color" | "dimColor">>;
};
export type Key = keyof SpecialKeys;
export type KeyInputSingle = KeyInput;
export type KeyInputUnion = KeyInput | KeyInput[];
export type MutableTextProps = DropReadonly<TextProps>;
export type MutableBaseProps = DropReadonly<BaseProps>;
