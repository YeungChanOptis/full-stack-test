import styled from 'styled-components';

type IconProps = React.ImgHTMLAttributes<HTMLImageElement>;

const StyledIcon = styled.img`
    width: 16px;
    height: 16px;
    cursor: pointer;
`;

const Icon = (props: IconProps) => {
    return <StyledIcon {...props} />;
};

export default Icon;
