import { DOMAttributes, ReactNode, MouseEvent, FC } from 'react';
interface IButton extends DOMAttributes<HTMLButtonElement> {
    children?: ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    active?: boolean;
}
declare const Button: FC<IButton>;
export default Button;
