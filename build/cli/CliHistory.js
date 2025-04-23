class CliHistoryBuilder {
    history;
    set;
    idx;
    constructor() {
        this.history = {};
        this.set = new Set();
        this.idx = 0;
    }
    /*
     * history indexes start at 1 because they are based on set size
     * */
    push = (cliInput) => {
        if (!cliInput)
            return;
        if (!this.set.has(cliInput)) {
            this.set.add(cliInput);
            this.history[this.set.size - 1] = cliInput;
        }
    };
    current = () => {
        const current = this.history[this.idx];
        return current ?? "";
    };
    next = () => {
        if (this.idx < this.set.size - 1) {
            ++this.idx;
        }
        else {
            this.idx = 0;
        }
        return this.current();
    };
    prev = () => {
        if (this.idx > 0) {
            --this.idx;
        }
        else {
            this.idx = this.set.size - 1;
        }
        return this.current();
    };
    resetIdx = () => {
        this.idx = 0;
    };
}
export const CliHistory = new CliHistoryBuilder();
//# sourceMappingURL=CliHistory.js.map