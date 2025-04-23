export default class InternalEvents {
    static Prefix: string;
    static getInternalEvent(event: string, ID?: string): string;
    static toID(scopedEvent: string): string;
    static toEvent(scopedEvent: string): string;
}
