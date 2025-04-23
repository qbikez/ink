export const Console = {
    enabled: false,
    path: "console.log",
};
export function setConsole(fileEnabledOrConfig) {
    if (typeof fileEnabledOrConfig === "string") {
        if (fileEnabledOrConfig) {
            Console.path = fileEnabledOrConfig;
            Console.enabled = true;
        }
        return;
    }
    if (typeof fileEnabledOrConfig === "boolean") {
        Console.enabled = fileEnabledOrConfig;
    }
    if (typeof fileEnabledOrConfig === "object") {
        Console.enabled = fileEnabledOrConfig.enabled ?? Console.enabled;
        if (fileEnabledOrConfig.path) {
            Console.path = fileEnabledOrConfig.path;
        }
    }
}
//# sourceMappingURL=Console.js.map