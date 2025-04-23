import path from "path";
import fs from "fs";
import chalk from "chalk";
export class Logger {
    _file;
    _time;
    _color;
    _prefix;
    _prefixColor;
    _validPaths;
    static Default = {
        file: "console.log",
        time: true,
        color: null,
        prefixColor: null,
        prefix: null,
    };
    constructor({ file = Logger.Default.file, time = Logger.Default.time, color = Logger.Default.color, prefixColor = Logger.Default.prefixColor, prefix = Logger.Default.prefix, } = Logger.Default) {
        this._file = file;
        this._time = time;
        this._color = color;
        this._prefixColor = prefixColor;
        this._prefix = prefix;
        this._validPaths = new Set();
        this.ensureValidPath(this._file);
    }
    file(file) {
        const next = Object.setPrototypeOf({}, this);
        return next.setFile(file);
    }
    setFile(file) {
        this._file = file;
        return this;
    }
    time(b) {
        const next = Object.setPrototypeOf({}, this);
        return next.setTime(b);
    }
    setTime(b) {
        this._time = b;
        return this;
    }
    color(c) {
        const next = Object.setPrototypeOf({}, this);
        return next.setColor(c);
    }
    setColor(c) {
        this._color = c;
        return this;
    }
    setPrefix(val) {
        this._prefix = val;
        return this;
    }
    prefixColor(val) {
        const next = Object.setPrototypeOf({}, this);
        return next.setPrefixColor(val);
    }
    setPrefixColor(val) {
        this._prefixColor = val;
        return this;
    }
    clearLog() {
        fs.writeFileSync(path.resolve(this._file), "");
        return this;
    }
    write(...data) {
        this.ensureValidPath(this._file);
        const prefix = this.getPrefix();
        const formattedData = this.getFormattedData(...data);
        const time = this.getTime();
        const text = this.colorText(formattedData, this._color);
        const logStream = fs.createWriteStream(path.resolve(this._file), {
            flags: "a",
        });
        logStream.write(time + prefix + text);
    }
    prefix(...data) {
        this.setPrefix(data[0]);
        this.write(...data.slice(1));
    }
    getPrefix() {
        const prefix = this?._prefix;
        if (!prefix)
            return "";
        const separator = " ⇒ ";
        if (!this._prefixColor) {
            return prefix + separator;
        }
        return chalk[this._prefixColor](prefix + separator);
    }
    getFormattedData(...data) {
        // Check for circular references and any other errors that might occur
        const stringify = (...args) => {
            try {
                return { stringifiedData: JSON.stringify(...args), errors: false };
            }
            catch (err) {
                if (err instanceof Error) {
                    return { stringifiedData: err.message, errors: true };
                }
                return { stringifiedData: "", errors: true };
            }
        };
        const formatData = (data) => {
            if (data === null)
                return "null";
            if (data === undefined)
                return "undefined";
            if (typeof data !== "string" && typeof data !== "number") {
                const { stringifiedData, errors } = stringify(data);
                if (stringifiedData.length > 25 && !errors) {
                    return stringify(data, null, 4).stringifiedData;
                }
                else {
                    return stringifiedData;
                }
            }
            return data;
        };
        let formattedData = "";
        for (let i = 0; i < data.length; ++i) {
            const comma = i !== 0 ? ", " : "";
            formattedData += `${comma}${formatData(data[i])}`;
        }
        formattedData += "\n";
        return formattedData;
    }
    getTime() {
        if (!this._time)
            return "";
        const date = new Date();
        const times = [
            String(date.getHours()),
            String(date.getMinutes()),
            String(date.getSeconds()),
            String(date.getMilliseconds()),
        ];
        for (let i = 0; i < times.length; ++i) {
            const desiredLength = i !== times.length - 1 ? 2 : 3;
            while (times[i].length < desiredLength) {
                times[i] = `0${times[i]}`;
            }
        }
        return `${times[0]}:${times[1]}:${times[2]}:${times[3]}: `;
    }
    colorText(value, color) {
        color = color ? color : this._color;
        if (color && chalk[color]) {
            return chalk[color](value);
        }
        else {
            return value;
        }
    }
    ensureValidPath(filePath) {
        if (this._validPaths.has(filePath))
            return;
        this.validatePath(filePath.split("/"));
        this._validPaths.add(filePath);
    }
    validatePath(p) {
        if (p.length === 1)
            return;
        try {
            fs.statSync(path.resolve(p[0]));
        }
        catch (err) {
            fs.mkdirSync(path.resolve(p[0]));
        }
        const joined = p[1] ? [p[0], p[1]].join("/") : p[0];
        const next = p.length > 2 ? [joined, ...p.slice(2)] : [joined];
        return this.validatePath(next);
    }
}
export const logger = new Logger();
//# sourceMappingURL=Logger.js.map