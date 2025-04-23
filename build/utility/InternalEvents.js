export default class InternalEvents {
    static Prefix = "$$INTERNAL_EVENT";
    static getInternalEvent(event, ID = "") {
        if (ID === "")
            return event;
        return `${InternalEvents.Prefix}_${event}_${ID}`;
    }
    static toID(scopedEvent) {
        const ID = scopedEvent.split("_")[2];
        if (!ID) {
            throw new Error("Cannot extract ID from non-scoped event");
        }
        return ID;
    }
    static toEvent(scopedEvent) {
        const event = scopedEvent.split("_")[1];
        if (!event) {
            throw new Error("Cannot extract event name from non-scoped event");
        }
        return event;
    }
}
//# sourceMappingURL=InternalEvents.js.map