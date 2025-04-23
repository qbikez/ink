import React from "react";
import { WindowProps } from "../Window.js";
type ListSpecificProps<BatchItem = any> = {
    listView: WindowProps<BatchItem>["viewState"];
};
type Props<BatchItem extends any> = ListSpecificProps<BatchItem> & React.PropsWithChildren & Pick<WindowProps, "alignItems" | "justifyContent" | "flexDirection" | "gap" | "scrollbar"> & {
    fitX?: boolean;
    fitY?: boolean;
} & {
    batchMap?: WindowProps<BatchItem>["batchMap"];
};
export declare function List<BatchItem extends any>({ ...props }: Props<BatchItem>): React.ReactNode;
export {};
