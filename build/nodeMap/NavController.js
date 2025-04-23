import assert from "assert";
export class NavController {
    nav;
    currPosition;
    nameMap;
    prevMap;
    nextMap;
    size;
    constructor(nav, startingNode) {
        this.nav = nav;
        this.prevMap = {};
        this.nextMap = {};
        this.nameMap = {};
        this.size = 0;
        this.init(nav, startingNode);
    }
    init = (nav, startingNode) => {
        let currStartPosition = null;
        let prevPosition = null;
        let prevName = null;
        let startPosition = null;
        let startName = null;
        let size = 0;
        for (let y = 0; y < nav.length; ++y) {
            for (let x = 0; x < nav[y].length; ++x) {
                const name = nav[y][x];
                const currPosition = [y, x];
                if (!name)
                    continue;
                if (!this.nameMap[name]) {
                    this.nameMap[name] = { position: currPosition, iteration: size++ };
                    if (!currStartPosition) {
                        currStartPosition = currPosition;
                    }
                    if (typeof startingNode === "string" && startingNode === name) {
                        currStartPosition = currPosition;
                    }
                    if (typeof startingNode === "number" && startingNode === size - 1) {
                        currStartPosition = currPosition;
                    }
                    if (prevPosition === null) {
                        startName = name;
                        startPosition = currPosition;
                    }
                    if (prevName) {
                        this.nextMap[prevName] = currPosition;
                    }
                    prevName = name;
                    if (prevPosition) {
                        this.prevMap[name] = prevPosition;
                    }
                    prevPosition = currPosition;
                }
            }
        }
        // prettier-ignore
        if (!startName || !prevPosition || !startPosition || !prevName || !currStartPosition) {
            // throw new Error("Invalid navigation initializer");
            this.size = size;
            this.currPosition = [-1, -1];
            return;
        }
        this.size = size;
        this.prevMap[startName] = prevPosition;
        this.nextMap[prevName] = startPosition;
        this.currPosition = currStartPosition;
    };
    getLocation = () => {
        try {
            const [y, x] = this.currPosition;
            return this.nav[y][x];
        }
        catch {
            return "";
        }
    };
    getNodeIndex = (name) => {
        return this.nameMap[name]?.iteration ?? -1;
    };
    getCurrentIndex = () => {
        const name = this.getLocation();
        return this.nameMap[name]?.iteration ?? -1;
    };
    getSize = () => {
        return this.size;
    };
    goToNode = (nextNode) => {
        if (typeof nextNode === "string") {
            return this.goToNodeName(nextNode);
        }
        if (typeof nextNode === "number") {
            return this.goToIteration(nextNode);
        }
        return this.getLocation();
    };
    goToIteration = (n) => {
        if (n >= this.getSize() || n < 0) {
            return this.getLocation();
        }
        let nextCoords = undefined;
        for (const name in this.nameMap) {
            if (this.nameMap[name].iteration === n) {
                nextCoords = this.nameMap[name].position;
                break;
            }
        }
        assert(nextCoords);
        this.currPosition = nextCoords;
        return this.getLocation();
    };
    // If it exists, move to the node with nodeName.  Otherwise stay put.  Return
    // the current node name after the move or lack thereof
    goToNodeName = (nodeName) => {
        for (let y = 0; y < this.nav.length; ++y) {
            for (let x = 0; x < this.nav[y].length; ++x) {
                const name = this.nav[y][x];
                const currPosition = [y, x];
                if (name === nodeName) {
                    this.currPosition = currPosition;
                    return this.getLocation();
                }
            }
        }
        return this.getLocation();
    };
    autoMove = (dir) => {
        const name = this.getLocation();
        if (name === "")
            return "";
        const nextCoords = dir < 0 ? this.prevMap[name] : this.nextMap[name];
        this.currPosition = nextCoords;
        const nextName = this.getLocation();
        return nextName;
    };
    next = () => {
        return this.autoMove(1);
    };
    prev = () => {
        return this.autoMove(-1);
    };
    move = (dy, dx) => {
        const prevName = this.getLocation();
        const [y, x] = this.currPosition;
        const ny = y + dy;
        let nx = x + dx;
        if (this.nav[ny]?.[nx]) {
            this.currPosition = [ny, nx];
        }
        if (this.getLocation() === prevName) {
            let lny = ny;
            let lnx = nx;
            while (this.nav[lny + dy]?.[lnx + dx] !== undefined &&
                this.nav[lny + dy]?.[lnx + dx] !== "") {
                lny += dy;
                lnx += dx;
                this.currPosition = [lny, lnx];
            }
        }
        if (this.nav[ny]?.[nx] === undefined || this.nav[ny]?.[nx] === "") {
            if (this.nav[ny]?.length === 0 || nx <= 0) {
                return this.getLocation();
            }
            while (this.nav[ny] && nx > this.nav[ny].length - 1) {
                --nx;
            }
            if (this.nav[ny]?.[nx]) {
                this.currPosition = [ny, nx];
            }
        }
        const name = this.getLocation();
        return name;
    };
    up = () => {
        return this.move(-1, 0);
    };
    down = () => {
        return this.move(1, 0);
    };
    right = () => {
        return this.move(0, 1);
    };
    left = () => {
        return this.move(0, -1);
    };
}
//# sourceMappingURL=NavController.js.map