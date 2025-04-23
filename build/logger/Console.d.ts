type Console = {
    enabled: boolean;
    path: string;
};
export declare const Console: Console;
export declare function setConsole(file: string): void;
export declare function setConsole(enabled: boolean): void;
export declare function setConsole(config: Console): void;
export {};
