declare function add(id: string, visible: boolean, level: number): void;
declare function remove(id: string): void;
declare function top(): number;
declare function isActiveModalLevel(componentLevel: number): boolean;
declare const _default: {
    add: typeof add;
    remove: typeof remove;
    top: typeof top;
    isActiveModalLevel: typeof isActiveModalLevel;
};
export default _default;
