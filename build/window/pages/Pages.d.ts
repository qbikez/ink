import React from "react";
import { PageView } from "./usePages.js";
type PageSpecificProps = {
    pageView: PageView;
};
export type Props = PageSpecificProps & React.PropsWithChildren;
export declare function Pages(props: Props): React.ReactNode;
export {};
