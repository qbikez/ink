import React from "react";
import { Except } from "type-fest";
import { StylesConfig } from "../utility/types.js";
type TextStyles = Except<StylesConfig["Text"], "wrap">;
type Props = {
    showEvents?: boolean;
    showRegister?: boolean;
    eventStyles?: TextStyles;
    registerStyles?: TextStyles;
    width?: number;
};
export declare function StdinState({ eventStyles, registerStyles, showEvents, showRegister, width, }: Props): React.ReactNode;
export {};
