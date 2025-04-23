import React from "react";
import { BoxProps } from "../index.js";
export type Props = Omit<BoxProps, "height" | "width" | "minHeight" | "minWidth" | "alignSelf"> & React.PropsWithChildren;
type Dimensions = {
    height: number;
    width: number;
};
export declare function Viewport(props: Props): React.ReactNode;
export declare function useViewportDimensions(): Dimensions;
export {};
