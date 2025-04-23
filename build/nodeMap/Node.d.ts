import React from "react";
import { NodesView } from "./useNodeMap.js";
import { BoxProps } from "../index.js";
export type Props<T extends string = string> = {
    name: T;
    nodesView: NodesView<T>;
} & React.PropsWithChildren;
export declare function Node<T extends string = string>(props: Props<T>): React.ReactNode;
export declare namespace Node {
    var Box: <T extends string = string>(props: NodeBoxProps<T>) => React.ReactNode;
}
export type NodeBoxProps<T extends string = string> = BoxProps & Props<T>;
