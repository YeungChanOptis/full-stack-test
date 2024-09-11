import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.3s ease;
    &::placeholder {
        color: #999;
    }
`;

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
    return <StyledInput {...props} />;
};

export default Input;
