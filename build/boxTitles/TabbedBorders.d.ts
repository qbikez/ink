import { BoxProps } from "../index.js";
type BorderStyleHelper = Exclude<BoxProps["borderStyle"], undefined>;
export type BorderStyle = keyof Omit<{
    [P in BorderStyleHelper as P extends string ? P : never]: string;
}, "inherit">;
export type BorderConfiguration = {
    topLeft: string;
    top: string;
    topRight: string;
    left: string;
    bottomLeft: string;
    bottom: string;
    bottomRight: string;
    right: string;
};
type Return = {
    top: BorderConfiguration;
    bottom: BorderConfiguration;
};
declare function shallow(borderStyle: BorderStyle): Return;
declare function deep(borderStyle: BorderStyle): Return;
declare const _default: {
    shallow: typeof shallow;
    deep: typeof deep;
};
export default _default;
