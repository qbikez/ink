import React from "react";
import EventEmitter from "events";
import { KeyInput } from "../index.js";
import { TextStyles } from "./useCli.js";
import { Commands, CliMessage, CliActionPrompt } from "./types.js";
export type CliProps = {
    commands: Commands;
    message?: CliMessage;
    actionPrompt?: CliActionPrompt;
    prompt?: string;
    persistPrompt?: boolean;
    enterKeymap?: KeyInput;
    exitKeymap?: KeyInput;
    inputStyles?: TextStyles;
    resolveStyles?: TextStyles;
    rejectStyles?: TextStyles;
    promptStyles?: TextStyles;
};
export type AbstractProps = CliProps & {
    autoEnter: boolean;
    showModal?: () => void;
    hideModal?: () => void;
    onUpArrow?: () => unknown;
    onDownArrow?: () => unknown;
};
export declare const DEFAULT = "DEFAULT";
export declare const CliEmitter: EventEmitter<[never]>;
export declare function AbstractCli(props: AbstractProps): React.ReactNode;
