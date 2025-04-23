import { KeyInput } from "../index.js";
export type ModalControlKeyMap = {
    show: KeyInput | null;
    hide: KeyInput | null;
};
export type ModalData = {
    _ID: string;
    _hideKeymap: KeyInput | null;
    _showKeymap: KeyInput | null;
    _vis: boolean;
    _showEvent: string;
    _hideEvent: string;
    _showModal: () => void;
    _hideModal: () => void;
};
export type Return = {
    modal: ModalData;
    showModal: () => void;
    hideModal: () => void;
};
export declare const SHOW = "SHOW";
export declare const HIDE = "HIDE";
export declare function useModal(keymap: ModalControlKeyMap): Return;
export declare function useHideModal(): {
    hideModal: () => void;
};
