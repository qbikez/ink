import assert from "assert";
const gate = {};
function canProcess(hookId, hookPriority) {
    if (!hookPriority) {
        hookPriority = gate[hookId];
        assert(hookPriority);
    }
    if (hookPriority === "always") {
        for (const key in gate) {
            if (gate[key] === "textinput") {
                return false;
            }
        }
        return true;
    }
    if (hookPriority === "never") {
        return false;
    }
    const map = {
        default: 0,
        override: 1,
        textinput: 2,
    };
    for (const key in gate) {
        if (key === hookId)
            continue;
        if (gate[key] === "always")
            continue;
        if (gate[key] === "never")
            continue;
        const priority = gate[key];
        if (map[priority] > map[hookPriority]) {
            return false;
        }
    }
    return true;
}
function updatePriority(hookId, priority) {
    gate[hookId] = priority;
}
function removeHook(hookId) {
    delete gate[hookId];
}
export default {
    canProcess,
    updatePriority,
    removeHook,
};
//# sourceMappingURL=ProcessGate.js.map