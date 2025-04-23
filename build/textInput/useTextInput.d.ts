export type State = {
    value: string;
    idx: number;
    insert: boolean;
    stdin: null | string;
    window: {
        start: number;
        end: number;
    };
};
export type Return = {
    value: State["value"];
    insert: boolean;
    onChange: () => {
        state: State;
        update: (nextState: State) => void;
    };
    setValue: (nextValue: string, insert?: boolean) => void;
    enterInsert: () => void;
};
export declare function useTextInput(initialValue?: string): Return;
