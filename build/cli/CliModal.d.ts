import React from "react";
import { Except } from "type-fest";
import { CliProps } from "./AbstractCli.js";
import { Props as ModalProps } from "../modal/Modal.js";
type CliModalProps = Except<CliProps, "actionPrompt" | "message"> & Except<ModalProps, "modal">;
export declare function CliModal(props: CliModalProps): React.ReactNode;
export {};
