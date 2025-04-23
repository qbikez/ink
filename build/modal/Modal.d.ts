import React from "react";
import { BoxProps } from "../index.js";
import { ModalData } from "./useModal.js";
export type Props = {
    modal: ModalData;
    zIndex?: number;
    justifySelf?: "flex-start" | "center" | "flex-end";
    alignSelf?: "flex-start" | "center" | "flex-end";
    xOffset?: number;
    yOffset?: number;
    closeOnOutsideClick?: boolean;
} & Omit<BoxProps, "wipeBackground"> & React.PropsWithChildren;
export declare function Modal(props: Props): React.ReactNode;
