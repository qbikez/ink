export type NodeMap<T extends string = string> = T[][];
export type Position = [number, number];
export type NavControllerAPI = Omit<{
    [P in keyof NavController]: NavController[P];
}, "goToIteration" | "goToNodeName">;
export declare class NavController {
    private nav;
    private currPosition;
    private nameMap;
    private prevMap;
    private nextMap;
    private size;
    constructor(nav: NodeMap, startingNode?: string | number);
    private init;
    getLocation: () => string;
    getNodeIndex: (name: string) => number;
    getCurrentIndex: () => number;
    getSize: () => number;
    goToNode: (nextNode: string | number) => string;
    private goToIteration;
    goToNodeName: (nodeName: string) => string;
    private autoMove;
    next: () => string;
    prev: () => string;
    private move;
    up: () => string;
    down: () => string;
    right: () => string;
    left: () => string;
}
