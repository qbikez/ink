import { type DOMNode } from "../dom.js";
import type Output from "../output.js";
import { BaseProps } from "../baseProps.js";
import { PickStartsWith, StylesConfig } from "../utility/types.js";
type MouseHandlers = PickStartsWith<BaseProps, "on">;
export type Title = StylesConfig["Title"] & MouseHandlers;
export declare function renderTitle(x: number, y: number, node: DOMNode, output: Output, position: "top" | "bottom", zIndexRoot: number): void;
export {};
