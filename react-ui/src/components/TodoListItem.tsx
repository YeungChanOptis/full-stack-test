import styled from 'styled-components';
import Icon from './Icon';
import { ReactNode, ChangeEvent, useId } from 'react';

type TodoListItemProps = {
    children: ReactNode;
    onDelete?: () => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    completed: boolean;
    isPending?: boolean;
};

const StyledLabel = styled.label<{ isPending?: boolean }>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    &:hover {
        background-color: #f1f1f1;
    }
    transition: background-color 300ms;
    padding: 8px;
    border-radius: 8px;
    opacity: ${({ isPending }) => (isPending ? 0.5 : 1)};
`;

const InvisibleButton = styled.button`
    border: none;
    background-color: transparent;
`;

const TodoListItem = ({ children, onChange, onDelete, completed, isPending }: TodoListItemProps) => {
    const id = useId();
    return (
        <li>
            <StyledLabel htmlFor={id} isPending={isPending}>
                <div>
                    <input id={id} type="checkbox" onChange={onChange} checked={completed} />
                    {children}
                </div>
                <InvisibleButton onClick={onDelete} type="button">
                    <Icon src="/trash.svg" alt="Trash" />
                </InvisibleButton>
            </StyledLabel>
        </li>
    );
};

export default TodoListItem;
