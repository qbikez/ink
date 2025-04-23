import React, { Key } from "react";
import { UseEventTypes } from "../stdin/hooks/useEvent.js";
import { KeyMap } from "../index.js";
import { ViewState } from "./types.js";
import { MutableBaseProps, StylesConfig } from "../utility/types.js";
export type IntrinsicWindowAttributes = {
    key?: Key;
    viewState?: ViewState;
    style?: IntrinsicWindowBaseProps;
} & React.PropsWithChildren;
export declare const WindowAttributes: {
    readonly viewState: "viewState";
};
export type IntrinsicWindowBaseProps = Pick<MutableBaseProps, "flexDirection" | "justifyContent" | "alignItems" | "gap" | "height" | "width" | "position" | "flexGrow" | "flexWrap" | "flexShrink" | "flexBasis"> & {
    scrollbar?: StylesConfig["Scrollbar"];
    unitSize?: number | "stretch";
};
export interface ItemGenerator<T extends KeyMap = any> {
    (isFocus: boolean, onUnit: UseEventTypes.UseEvent<T>): React.ReactNode;
}
export type WindowProps<BatchItem = any> = React.PropsWithChildren & IntrinsicWindowBaseProps & {
    type: "PAGES" | "ITEMS";
    viewState: ViewState;
    generators?: ItemGenerator[];
    wordList?: string[];
    flexDirection?: Extract<StylesConfig["Box"]["flexDirection"], "column" | "row">;
    fitX?: boolean;
    fitY?: boolean;
    /** @deprecated Currently unused. */
    retainState?: boolean;
    batchMap?: {
        batchSize?: number;
        items: readonly BatchItem[];
        map: (item: BatchItem, 
        /** The index of the item from the provided `items` array. */
        index: number) => React.ReactNode;
    };
};
export declare function Window<T extends any>({ ...props }: WindowProps<T>): React.ReactNode;
