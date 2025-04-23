import { Opts as UseKeymapOpts } from "./hooks/useKeymap.js";
type Priority = UseKeymapOpts["priority"];
declare function canProcess(hookId: string, hookPriority?: Priority): boolean;
declare function updatePriority(hookId: string, priority: Priority): void;
declare function removeHook(hookId: string): void;
declare const _default: {
    canProcess: typeof canProcess;
    updatePriority: typeof updatePriority;
    removeHook: typeof removeHook;
};
export default _default;
