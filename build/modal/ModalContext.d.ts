type ModalContext = {
    ID: string;
    level: number;
    visible: boolean;
    hide: () => void;
};
export declare const ModalContext: import("react").Context<ModalContext | null>;
export declare function useModalLevel(): number;
export declare function useModalContext(): ModalContext;
export {};
