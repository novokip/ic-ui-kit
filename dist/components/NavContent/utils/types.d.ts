/**
 * @Author: Your name
 * @Date:   2025-03-17 16:18:30
 * @Last Modified by:   Your name
 * @Last Modified time: 2025-03-19 16:11:41
 */
export interface IMenuItem {
    title: string;
    id: string;
    children?: IMenuItem[];
}
