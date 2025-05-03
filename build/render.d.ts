import type { ReactNode } from "react";
import Ink, { type Options as InkOptions } from "./ink.js";
export type RenderOptions = Partial<InkOptions>;
export type Instance = {
    /**
     * Replace previous root node with a new one or update props of the current root node.
     */
    rerender: Ink["render"];
    /**
     * Manually unmount the whole Ink app.
     */
    unmount: Ink["unmount"];
    /**
     * Returns a promise, which resolves when app is unmounted.
     */
    waitUntilExit: Ink["waitUntilExit"];
    cleanup: () => void;
    /**
     * Clear output.
     */
    clear: () => void;
};
/**
 * Mount a component and render the output.
 */
declare const render: (node: ReactNode, options?: NodeJS.WriteStream | RenderOptions) => Instance;
export default render;
