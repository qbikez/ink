import { Color } from "../utility/types.js";
export type Props = {
    file?: string;
    time?: boolean;
    color?: Exclude<Color, undefined> | null;
    prefix?: string | null;
    prefixColor?: Exclude<Color, undefined> | null;
};
export declare class Logger {
    private _file;
    private _time;
    private _color;
    private _prefix;
    private _prefixColor;
    private _validPaths;
    static Default: {
        readonly file: "console.log";
        readonly time: true;
        readonly color: null;
        readonly prefixColor: null;
        readonly prefix: null;
    };
    constructor({ file, time, color, prefixColor, prefix, }?: Props);
    file(file: string): Logger;
    setFile(file: string): Logger;
    time(b: boolean): Logger;
    setTime(b: boolean): Logger;
    color(c: Props["color"]): Logger;
    setColor(c: Props["color"]): Logger;
    setPrefix(val: string): Logger;
    prefixColor(val: Props["color"]): Logger;
    setPrefixColor(val: Props["color"]): Logger;
    clearLog(): Logger;
    write(...data: any[]): void;
    prefix(...data: any[]): void;
    private getPrefix;
    private getFormattedData;
    private getTime;
    private colorText;
    private ensureValidPath;
    private validatePath;
}
export declare const logger: Logger;
