import { EffectCallback } from "react";
import { NavControllerAPI } from "./NavController.js";
type NodeMap<T extends string = string> = T[][];
type Nodes<T extends string> = Exclude<T, "">;
export type NodesView<T extends string> = Readonly<{
    _node: Nodes<T>;
    _focusMap: FocusMap;
    _control: NavControllerAPI;
}>;
export type FocusMap = {
    [node: string]: boolean;
};
export interface RegisterNode<T extends string = string> {
    (nodeName: Nodes<T>): {
        name: Nodes<T>;
        nodesView: NodesView<T>;
    };
}
type Return<T extends string = string> = {
    node: Nodes<T>;
    control: NavControllerAPI;
    nodesView: NodesView<T>;
    register: RegisterNode<T>;
};
type Opts<T extends string = string> = {
    initialFocus?: T;
    navigation?: "vi" | "arrow" | "none";
};
export declare function useNodeMap<T extends string = string>(nodeMap: NodeMap<T>, opts?: Opts<T>): Return<T>;
export declare function useDeepEffect(cb: EffectCallback, deps: any[]): void;
export {};
