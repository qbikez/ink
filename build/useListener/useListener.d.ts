import EventEmitter from "events";
export declare function useListener(emitter: EventEmitter, event: string, cb: (...args: any[]) => void, dependencies?: any[]): void;
