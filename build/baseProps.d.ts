import { type Boxes, type BoxStyle } from "cli-boxes";
import { type Node as YogaNode } from "yoga-wasm-web/auto";
import { Title } from "./renderTitles/renderTitleToOutput.js";
import { Color } from "./utility/types.js";
import { MouseEventHandler } from "./index.js";
import { StylesConfig } from "./utility/types.js";
import { IntrinsicWindowBaseProps } from "./window/Window.js";
export type BaseProps = {
    readonly textWrap?: "wrap" | "end" | "middle" | "truncate-end" | "truncate" | "truncate-middle" | "truncate-start" | "overflow";
    readonly position?: "absolute" | "relative";
    readonly titleTopLeft?: Title;
    readonly titleTopCenter?: Title;
    readonly titleTopRight?: Title;
    readonly titleBottomLeft?: Title;
    readonly titleBottomCenter?: Title;
    readonly titleBottomRight?: Title;
    /**
     * Makes it possible to inject pre-defined styles into a component.  Conflicts
     * in styles found in the styles prop and normal props will overwrite in favor
     * of the normal props.
     */
    readonly styles?: StylesConfig["Box"];
    readonly leftActive?: StylesConfig["Box"];
    readonly rightActive?: StylesConfig["Box"];
    /**
     * Alters the render order for a component which allows components to appear
     * on top of other components.  Does not support negative zIndexes.  zIndex
     * values are relative only to parent nodes.
     *
     * @default 'auto' (same as 0)
     * */
    readonly zIndex?: number | "auto";
    /**
     * Handle click events on Box components.  Click events will only be read when
     * using a Viewport component.
     * */
    readonly onClick?: MouseEventHandler;
    readonly onDoubleClick?: MouseEventHandler;
    readonly onMouseDown?: MouseEventHandler;
    readonly onMouseUp?: MouseEventHandler;
    readonly onRightClick?: MouseEventHandler;
    readonly onRightMouseDown?: MouseEventHandler;
    readonly onRightMouseUp?: MouseEventHandler;
    readonly onRightDoubleClick?: MouseEventHandler;
    readonly onScrollUp?: MouseEventHandler;
    readonly onScrollDown?: MouseEventHandler;
    readonly onScrollClick?: MouseEventHandler;
    /**
     * Size of the gap between an element's columns.
     */
    readonly columnGap?: number;
    /**
     * Size of the gap between element's rows.
     */
    readonly rowGap?: number;
    /**
     * Size of the gap between an element's columns and rows. Shorthand for `columnGap` and `rowGap`.
     */
    readonly gap?: number;
    /**
     * Margin on all sides. Equivalent to setting `marginTop`, `marginBottom`, `marginLeft` and `marginRight`.
     */
    readonly margin?: number;
    /**
     * Horizontal margin. Equivalent to setting `marginLeft` and `marginRight`.
     */
    readonly marginX?: number;
    /**
     * Vertical margin. Equivalent to setting `marginTop` and `marginBottom`.
     */
    readonly marginY?: number;
    /**
     * Top margin.
     */
    readonly marginTop?: number;
    /**
     * Bottom margin.
     */
    readonly marginBottom?: number;
    /**
     * Left margin.
     */
    readonly marginLeft?: number;
    /**
     * Right margin.
     */
    readonly marginRight?: number;
    /**
     * Padding on all sides. Equivalent to setting `paddingTop`, `paddingBottom`, `paddingLeft` and `paddingRight`.
     */
    readonly padding?: number;
    /**
     * Horizontal padding. Equivalent to setting `paddingLeft` and `paddingRight`.
     */
    readonly paddingX?: number;
    /**
     * Vertical padding. Equivalent to setting `paddingTop` and `paddingBottom`.
     */
    readonly paddingY?: number;
    /**
     * Top padding.
     */
    readonly paddingTop?: number;
    /**
     * Bottom padding.
     */
    readonly paddingBottom?: number;
    /**
     * Left padding.
     */
    readonly paddingLeft?: number;
    /**
     * Right padding.
     */
    readonly paddingRight?: number;
    /**
     * This property defines the ability for a flex item to grow if necessary.
     * See [flex-grow](https://css-tricks.com/almanac/properties/f/flex-grow/).
     */
    readonly flexGrow?: number;
    /**
     * It specifies the “flex shrink factor”, which determines how much the flex item will shrink relative to the rest of the flex items in the flex container when there isn’t enough space on the row.
     * See [flex-shrink](https://css-tricks.com/almanac/properties/f/flex-shrink/).
     */
    readonly flexShrink?: number;
    /**
     * It establishes the main-axis, thus defining the direction flex items are placed in the flex container.
     * See [flex-direction](https://css-tricks.com/almanac/properties/f/flex-direction/).
     */
    readonly flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    /**
     * It specifies the initial size of the flex item, before any available space is distributed according to the flex factors.
     * See [flex-basis](https://css-tricks.com/almanac/properties/f/flex-basis/).
     */
    readonly flexBasis?: number | string;
    /**
     * It defines whether the flex items are forced in a single line or can be flowed into multiple lines. If set to multiple lines, it also defines the cross-axis which determines the direction new lines are stacked in.
     * See [flex-wrap](https://css-tricks.com/almanac/properties/f/flex-wrap/).
     */
    readonly flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
    /**
     * The align-items property defines the default behavior for how items are laid out along the cross axis (perpendicular to the main axis).
     * See [align-items](https://css-tricks.com/almanac/properties/a/align-items/).
     */
    readonly alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
    /**
     * It makes possible to override the align-items value for specific flex items.
     * See [align-self](https://css-tricks.com/almanac/properties/a/align-self/).
     */
    readonly alignSelf?: "flex-start" | "center" | "flex-end" | "auto";
    /**
     * It defines the alignment along the main axis.
     * See [justify-content](https://css-tricks.com/almanac/properties/j/justify-content/).
     */
    readonly justifyContent?: "flex-start" | "flex-end" | "space-between" | "space-around" | "center";
    /**
     * Width of the element in spaces.
     * You can also set it in percent, which will calculate the width based on the width of parent element.
     */
    readonly width?: number | string;
    /**
     * Height of the element in lines (rows).
     * You can also set it in percent, which will calculate the height based on the height of parent element.
     */
    readonly height?: number | string;
    /**
     * Sets a minimum width of the element.
     */
    readonly minWidth?: number | string;
    /**
     * Sets a minimum height of the element.
     */
    readonly minHeight?: number | string;
    /**
     * Set this property to `none` to hide the element.
     */
    readonly display?: "flex" | "none";
    /**
     * Color the background of the element.  Value set to 'inherit' sets the
     * background to the background of the parent Box.
     */
    readonly backgroundColor?: Color | "inherit";
    /**
     * Wipe the background of the element.  Defaults to false because wiping the
     * background is a burden on performance.  There are cases where the background is
     * automatically wiped.  1. When the direct parent element has a backgroundColor property
     * set and the element does not have backgroundColor set to 'inherit'. 2. When the
     * element has a zIndex set to a value other than auto or 0.
     *
     * @default false
     * */
    readonly wipeBackground?: boolean;
    /**
     * Add a border with a specified style.
     * If `borderStyle` is `undefined` (which it is by default), no border will be added.
     */
    readonly borderStyle?: keyof Boxes | BoxStyle | "inherit";
    /**
     * Determines whether top border is visible.
     *
     * @default true
     */
    readonly borderTop?: boolean;
    /**
     * Determines whether bottom border is visible.
     *
     * @default true
     */
    readonly borderBottom?: boolean;
    /**
     * Determines whether left border is visible.
     *
     * @default true
     */
    readonly borderLeft?: boolean;
    /**
     * Determines whether right border is visible.
     *
     * @default true
     */
    readonly borderRight?: boolean;
    /**
     * Change border color.
     * Shorthand for setting `borderTopColor`, `borderRightColor`, `borderBottomColor` and `borderLeftColor`.
     */
    readonly borderColor?: Color | "inherit";
    /**
     * Change top border color.
     * Accepts the same values as `color` in `Text` component.
     */
    readonly borderTopColor?: Color;
    /**
     * Change bottom border color.
     * Accepts the same values as `color` in `Text` component.
     */
    readonly borderBottomColor?: Color;
    /**
     * Change left border color.
     * Accepts the same values as `color` in `Text` component.
     */
    readonly borderLeftColor?: Color;
    /**
     * Change right border color.
     * Accepts the same values as `color` in `Text` component.
     */
    readonly borderRightColor?: Color;
    /**
     * Dim the border color.
     * Shorthand for setting `borderTopDimColor`, `borderBottomDimColor`, `borderLeftDimColor` and `borderRightDimColor`.
     *
     * @default false
     */
    readonly borderDimColor?: boolean;
    /**
     * Dim the top border color.
     *
     * @default false
     */
    readonly borderTopDimColor?: boolean;
    /**
     * Dim the bottom border color.
     *
     * @default false
     */
    readonly borderBottomDimColor?: boolean;
    /**
     * Dim the left border color.
     *
     * @default false
     */
    readonly borderLeftDimColor?: boolean;
    /**
     * Dim the right border color.
     *
     * @default false
     */
    readonly borderRightDimColor?: boolean;
    /**
     * Behavior for an element's overflow in both directions.
     *
     * @default 'visible'
     */
    readonly overflow?: "visible" | "hidden";
    /**
     * Behavior for an element's overflow in horizontal direction.
     *
     * @default 'visible'
     */
    readonly overflowX?: "visible" | "hidden";
    /**
     * Behavior for an element's overflow in vertical direction.
     *
     * @default 'visible'
     */
    readonly overflowY?: "visible" | "hidden";
};
declare const applyBaseProps: (node: YogaNode, style?: BaseProps & Partial<IntrinsicWindowBaseProps>) => void;
export default applyBaseProps;
