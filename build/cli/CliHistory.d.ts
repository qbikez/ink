declare class CliHistoryBuilder {
    private history;
    private set;
    private idx;
    constructor();
    push: (cliInput: string) => void;
    current: () => string;
    next: () => string;
    prev: () => string;
    resetIdx: () => void;
}
export declare const CliHistory: CliHistoryBuilder;
export {};
