import styled from '@emotion/styled';
import {HTMLAttributes, MouseEvent} from 'react';

interface IButton extends HTMLAttributes<HTMLButtonElement> {
    /** Optional click handler */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    /** Active button */
    active?: boolean;
}
const StyledButton = styled.button<{active: boolean}>`
    color: ${props => (props.active ? 'red' : 'blue')};
    // background-color: grey;
    font-size: 14px;
    height: 32px;
    padding: 0px 15px;
    border-radius: 6px;
    /* color: rgba(0, 0, 0, 0.88); */
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
    border-color: #d9d9d9;
    background: #ffffff;
    outline: none;
    position: relative;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    // touch-action: manipulation;
    &:hover {
        border-color: rgb(50, 43, 145);
        color: rgb(50, 43, 145);
        background: #ffffff;
    }
`;

/** Button UI component for user interaction */
export const Button = ({children, onClick, active = false, ...restProps}: IButton) => {
    console.log(active);
    return (
        <StyledButton {...restProps} onClick={onClick} active={active}>
            {children}
        </StyledButton>
    );
};
