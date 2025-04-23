import { NodesView } from "../nodeMap/useNodeMap.js";
import { ViewState } from "../window/types.js";
import { SetState } from "../utility/types.js";
export type ListItemContext<T extends any[] | readonly any[] = any> = {
    items: T;
    setItems: SetState<T>;
    control: ViewState["_control"];
    isFocus: boolean;
    isShallowFocus: boolean;
    itemIndex: number;
    listIndex: number;
    onFocus: (cb: () => any) => void;
    onBlur: (cb: () => any) => void;
};
export type PageContext = {
    control: ViewState["_control"];
    isFocus: boolean;
    isShallowFocus: boolean;
    index: number;
    onPageFocus: (cb: () => any) => void;
    onPageBlur: (cb: () => any) => void;
};
export type WindowContext = {
    isFocus: boolean;
};
export type NodeContext<T extends string = string> = {
    name: T;
    isFocus: boolean;
    isShallowFocus: boolean;
    control: NodesView<T>["_control"];
};
export declare const ListItemContext: import("react").Context<ListItemContext<any> | null>;
export declare const PageContext: import("react").Context<PageContext | null>;
export declare const WindowContext: import("react").Context<WindowContext | null>;
export declare const NodeContext: import("react").Context<NodeContext<string> | null>;
export declare function useWindowFocus(): boolean;
export declare function usePageFocus(): boolean;
export declare function useItemFocus(): boolean;
export declare function useNodeFocus(): boolean;
export declare function useIsFocus(): boolean;
export declare function useListItem<T extends any[] | readonly any[] = any>(): ListItemContext<T> & {
    item: T[number];
};
export declare function usePage(): PageContext;
export declare function useNode<T extends string = string>(): NodeContext<T>;
