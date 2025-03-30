import { FunctionComponent, ReactNode } from "react";
import { IMenuItem } from "../utils/types";
interface Props {
    children?: ReactNode;
    item?: IMenuItem;
}
export declare const LeafLiLine: ({ item }: Props) => import("@emotion/react/jsx-runtime").JSX.Element | null;
export declare const MenuItem: FunctionComponent<Props>;
export {};
