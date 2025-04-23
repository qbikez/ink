export declare const ASCII: {
    backspace: string;
    delete: string;
    esc: string;
    insert: string;
    return: string;
    sigint: string;
    tab: string;
    up: string;
    down: string;
    right: string;
    left: string;
    f1: string;
    f2: string;
    f3: string;
    f4: string;
    f5: string;
    f6: string;
    f7: string;
    f8: string;
    f9: string;
    f10: string;
    f11: string;
    f12: string;
};
export declare function newSpecialKeyRegister(): SpecialKeys;
export type SpecialKeys = Omit<{
    [P in keyof typeof ASCII]: boolean;
}, "sigint"> & {
    ctrl: boolean;
};
