import { SpecialKeys as Key } from "../stdin/AsciiMap.js";
interface UseInputCb {
    (input: string, key: Key): unknown;
}
type Opts = {
    isActive?: boolean;
    inputType?: "char" | "register";
};
export declare function useInput(cb: UseInputCb, opts?: Opts): void;
export {};
