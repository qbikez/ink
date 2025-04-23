export declare function saveScreenState(): void;
export declare function restoreScreenState(): void;
export declare function preserveScreen(): void;
declare const _default: {
    State: {
        ShouldPreserveScreen: boolean;
    };
    saveScreenState: typeof saveScreenState;
    restoreScreenState: typeof restoreScreenState;
    preserveScreen: typeof preserveScreen;
};
export default _default;
