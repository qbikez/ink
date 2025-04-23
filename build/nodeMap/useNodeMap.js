import { randomUUID } from "crypto";
import { useEffect, useRef, useState } from "react";
import { NavController } from "./NavController.js";
import assert from "assert";
import { useEvent, useKeymap } from "../index.js";
import { ARROW_KEYMAP, ID_NAV_EVENTS, VI_KEYMAP } from "./keymaps.js";
export function useNodeMap(nodeMap, opts = {}) {
    const [controller, setController] = useState(new NavController(nodeMap, opts.initialFocus));
    const [ID] = useState(randomUUID());
    const [node, setNode] = useState(controller.getLocation());
    // NavController accepts an initial focus, but if the initial focus does
    // not exist in the initializer map, then the focus defaults to the first
    // node.  If a new navigation map cuts off focus, it makes more sense to try
    // to keep the focus at the same iteration, or as close to the same iteration
    // as possible.  In this case, the iteration refers to the index at the focused
    // node where indexes are determined from reading the matrix left to right,
    // line by line
    useDeepEffect(() => {
        const previousIteration = controller.getCurrentIndex();
        const nextController = new NavController(nodeMap, previousIteration);
        setController(nextController);
        const nextIteration = nextController.getCurrentIndex();
        const nextSize = nextController.getSize();
        if (previousIteration === nextIteration) {
            return setNode(nextController.getLocation());
        }
        // navigationMap size has decreased AND shifted previousIteration out of
        // range. Shift focus to the last node in the new map
        if (nextSize <= previousIteration) {
            return setNode(nextController.goToNode(nextSize - 1));
        }
    }, [nodeMap]);
    let keymap = {};
    // prettier-ignore
    if (opts.navigation === 'vi' || opts.navigation === undefined) {
        keymap = VI_KEYMAP(ID);
    }
    if (opts.navigation === "arrow") {
        keymap = ARROW_KEYMAP(ID);
    }
    // For adding the internal event listeners, we only care about updating state,
    // but for some of the utility functions that this hook exposes, it could be limiting
    // if they did not also return the output of the function.
    const set = (cb) => () => {
        const node = cb();
        setNode(node);
        return node;
    };
    useKeymap(keymap, {
        priority: opts.navigation === "none" ? "never" : "default",
    });
    useEvent(ID_NAV_EVENTS.up(ID), set(controller.up));
    useEvent(ID_NAV_EVENTS.down(ID), set(controller.down));
    useEvent(ID_NAV_EVENTS.left(ID), set(controller.left));
    useEvent(ID_NAV_EVENTS.right(ID), set(controller.right));
    useEvent(ID_NAV_EVENTS.next(ID), set(controller.next));
    useEvent(ID_NAV_EVENTS.prev(ID), set(controller.prev));
    const control = {
        goToNode: (nodeName) => {
            const node = controller.goToNode(nodeName);
            setNode(node);
            return node;
        },
        getNodeIndex: controller.getNodeIndex,
        getCurrentIndex: controller.getCurrentIndex,
        getSize: controller.getSize,
        getLocation: controller.getLocation,
        up: set(controller.up),
        down: set(controller.down),
        left: set(controller.left),
        right: set(controller.right),
        next: set(controller.next),
        prev: set(controller.prev),
    };
    function getFocusMap() {
        const possibleNodes = nodeMap
            .flatMap((i) => i.map((j) => (j ? j : null)))
            .filter((i) => i !== null);
        return Object.fromEntries(possibleNodes.map((_node) => {
            if (_node === node) {
                return [_node, true];
            }
            else {
                return [_node, false];
            }
        }));
    }
    const focusMap = getFocusMap();
    const nodesView = Object.freeze({
        _node: node,
        _focusMap: focusMap,
        _control: control,
    });
    const register = (nodeName) => {
        return {
            name: nodeName,
            nodesView: nodesView,
        };
    };
    return {
        node: node,
        control,
        register,
        nodesView,
    };
}
export function useDeepEffect(cb, deps) {
    const changes = useRef(0);
    const lastDeps = useRef(deps);
    for (let i = 0; i < deps.length; ++i) {
        try {
            assert.deepStrictEqual(deps[i], lastDeps.current[i]);
        }
        catch {
            ++changes.current;
        }
    }
    lastDeps.current = deps;
    useEffect(cb, [changes.current]);
}
//# sourceMappingURL=useNodeMap.js.map