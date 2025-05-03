import { Stream } from "node:stream";
import process from "node:process";
import type { ReactNode } from "react";
import Ink, { type Options as InkOptions } from "./ink.js";
import instances from "./instances.js";
import ansiEscapes from "ansi-escapes";

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
const render = (
	node: ReactNode,
	options?: NodeJS.WriteStream | RenderOptions,
): Instance => {
	const inkOptions: InkOptions = {
		stdout: process.stdout,
		stdin: process.stdin,
		stderr: process.stderr,
		debug: false,
		exitOnCtrlC: true,
		patchConsole: true,
		ansiEscapeChars: {
			// clearScreen: ansiEscapes.clearTerminal, // <-- this is the original default. Old frames are left in the scroll buffer, causing it to fill quickly
			clearScreen: ansiEscapes.clearScreen, // <-- clear screen is nicer, but you will loose previous scroll buffer
			//clearScreen: ansiEscapes.eraseScreen // <-- similar to clearTerminal?
			// clearScreen: ansiEscapes.cursorTo(0, 0), // <--  this might leave some artifacts in the scroll buffer, as well as on the screen, if it's not fully filled
		},
		...getOptions(options),
	};

	const instance: Ink = getInstance(inkOptions.stdout, () => new Ink(inkOptions));

	instance.render(node);

	return {
		rerender: instance.render,
		unmount() {
			instance.unmount();
		},
		waitUntilExit: instance.waitUntilExit,
		cleanup: () => instances.delete(inkOptions.stdout),
		clear: instance.clear,
	};
};

export default render;

const getOptions = (
	stdout: NodeJS.WriteStream | RenderOptions | undefined = {},
): RenderOptions => {
	if (stdout instanceof Stream) {
		return {
			stdout,
			stdin: process.stdin,
		};
	}

	return stdout;
};

const getInstance = (stdout: NodeJS.WriteStream, createInstance: () => Ink): Ink => {
	let instance = instances.get(stdout);

	if (!instance) {
		instance = createInstance();
		instances.set(stdout, instance);
	}

	return instance;
};
