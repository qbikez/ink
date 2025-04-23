import React, { PropsWithChildren } from "react";
import { executeShellCommand } from "./executeShellCommand.js";
export type ShellCommandContext = {
    render: () => void;
};
export declare const ShellCommandContext: React.Context<ShellCommandContext | null>;
export declare function useShellCommand(): {
    exec: (cmd: string, reattachMessage?: string | undefined) => Promise<number | null>;
};
export declare function ShellCommmandProvider(props: PropsWithChildren): React.ReactNode;
