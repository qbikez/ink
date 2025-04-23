declare namespace UseResponsiveDimensions {
    type Dimensions = {
        height: number | null;
        width: number | null;
    };
    type SetDim = React.Dispatch<React.SetStateAction<Dimensions>>;
    type Ref = React.MutableRefObject<any>;
    type Return = Dimensions & {
        ref: Ref;
    };
}
type Props = {
    shouldUpdate?: boolean;
    dependencies?: any[];
};
export declare function useResponsiveDimensions(props?: Props): UseResponsiveDimensions.Return;
export {};
