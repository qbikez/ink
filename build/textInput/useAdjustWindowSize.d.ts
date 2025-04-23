import { Return as UseTextInputReturn } from "./useTextInput.js";
type State = ReturnType<UseTextInputReturn["onChange"]>["state"];
type Update = ReturnType<UseTextInputReturn["onChange"]>["update"];
type Return = {
    ref: any;
    availableWidth: number;
};
export declare function useAdjustWindowSize(state: State, update: Update): Return;
export {};
