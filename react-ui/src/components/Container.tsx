import { HTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.main`
    width: 300px;
    margin-left: auto;
    margin-right: auto;
`;

type ContainerProps = HTMLAttributes<HTMLElement>;

const Container = (props: ContainerProps) => {
    return <StyledContainer>{props.children}</StyledContainer>;
};
export default Container;
