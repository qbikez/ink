import { KeyOf } from "../utility/types.js";
import { Commands, DefaultCommands } from "./types.js";
export declare function useCommand<T extends Commands = DefaultCommands>(command: KeyOf<T> | KeyOf<DefaultCommands>, handler: (...args: string[]) => unknown, extraFocusCheck?: boolean): void;
