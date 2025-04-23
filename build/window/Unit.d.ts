import React from "react";
import { WindowProps } from "./Window.js";
import { Listener, ViewState } from "./types.js";
type Props = {
    type: WindowProps["type"];
    node: React.ReactElement;
    stretch: boolean;
    isDeepFocus: boolean;
    isShallowFocus: boolean;
    isHidden: boolean;
    listeners: Listener[];
    index: number;
    items: any[];
    control: ViewState["_control"];
    setItems: ViewState["_setItems"];
};
export declare function Unit({ type, listeners, items, setItems, control, index, isShallowFocus, isDeepFocus, stretch, isHidden, node, }: Props): React.JSX.Element;
export {};
