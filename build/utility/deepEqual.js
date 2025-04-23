import assert from "assert";
export const deepEqual = (a, b) => {
    try {
        assert.deepStrictEqual(a, b);
        return true;
    }
    catch {
        return false;
    }
};
//# sourceMappingURL=deepEqual.js.map