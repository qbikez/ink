const levels = {};
function add(id, visible, level) {
    if (!levels[level]) {
        levels[level] = new Set();
    }
    const set = levels[level];
    if (visible) {
        set.add(id);
    }
    else {
        remove(id);
    }
}
function remove(id) {
    for (const level in levels) {
        const set = levels[level];
        set?.delete(id);
        if (!set.size) {
            delete levels[level];
        }
    }
}
function top() {
    let max = 0;
    for (const level in levels) {
        max = Math.max(max, Number(level));
    }
    return max;
}
function isActiveModalLevel(componentLevel) {
    const topLevel = top();
    return componentLevel === topLevel;
}
export default {
    add,
    remove,
    top,
    isActiveModalLevel,
};
//# sourceMappingURL=ModalStack.js.map