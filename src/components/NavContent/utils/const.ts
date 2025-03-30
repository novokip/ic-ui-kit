/**
 * @Author: Your name
 * @Date:   2025-03-21 09:05:14
 * @Last Modified by:   Your name
 * @Last Modified time: 2025-03-21 09:06:07
 */

import { createContext } from "react";

interface INavigationContext {
    selectedValue?: string | number | null;
    selectNavItem?: (a: string | number | null) => void;
}

export const NavigationContext = createContext<INavigationContext>({});