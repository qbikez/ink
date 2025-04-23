import { useEffect } from "react";
/*
 * Subscribes and unsubscribes to a listener on every render, or every dependency change
 * if provided.  Prevents re-renders from accumulating excess listeners and/or stale state.
 * */
export function useListener(emitter, event, cb, dependencies = [{}]) {
    useEffect(() => {
        setImmediate(() => {
            emitter.on(event, cb);
        });
        return () => {
            setImmediate(() => {
                emitter.off(event, cb);
            });
        };
    }, dependencies);
}
//# sourceMappingURL=useListener.js.map