import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 10px 20px 10px 20px;
    height: 100%;
    border-radius: 5px;
    font-size: 20px;
    color: white;
    background-color: rgb(0, 123, 255);
    border: none;
    cursor: pointer;
    transition: all;
    transition-duration: 300ms;
    &:hover {
        background-color: #0056b3;
    }
`;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
