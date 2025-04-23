export type ExitStatus = number | null;
export declare const executeShellCommand: (cmd: string, reattachMessage?: string) => (render: () => void) => Promise<ExitStatus>;
