import { FormEvent, useRef } from 'react';
import styled from 'styled-components';
import Button from './components/Button';
import Container from './components/Container';
import Input from './components/Input';
import TodoList from './components/TodoList';
import TodoListItem from './components/TodoListItem';
import { useAddTodo } from './mutations/useAddTodo';
import { useDeleteTodo } from './mutations/useDeleteTodo';
import { useToggleTodo } from './mutations/useToggleTodo';
import useFetchTodos from './queries/useFetchTodos';

export const BASE_URL = 'http://localhost:3000/todos';

const InputContainer = styled.div`
    display: flex;
    height: fit-content;
    align-items: center;
    gap: 10px;
`;

const App = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const { data, isLoading } = useFetchTodos();
    const { mutate: addTodo, variables: addTodoVariables, isPending: addTodoIsPending } = useAddTodo();
    const { mutate: deleteTodo, variables: deleteTodoVariables, isPending: deleteTodoIsPending } = useDeleteTodo();
    const { mutate: toggleTodo, variables: toggleTodoVariables, isPending: toggleTodoIsPending } = useToggleTodo();
    const mutationIsPending = addTodoIsPending || deleteTodoIsPending || toggleTodoIsPending;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (mutationIsPending) return;
        const formData = new FormData(event.target as HTMLFormElement);
        const title = formData.get('title');
        formRef.current?.reset();
        if (!title || typeof title !== 'string') return;
        addTodo(title);
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} ref={formRef}>
                <h1>My Todo App</h1>
                <TodoList>
                    {data
                        ?.filter((item) => item.id !== deleteTodoVariables)
                        .map((item) => (
                            <TodoListItem
                                key={item.id}
                                onDelete={() => {
                                    if (!mutationIsPending) deleteTodo(item.id);
                                }}
                                onChange={(event) => {
                                    if (!mutationIsPending) toggleTodo({ ...item, completed: event.target.checked });
                                }}
                                completed={toggleTodoVariables?.id === item.id ? toggleTodoVariables.completed : item.completed}
                            >
                                {item.title}
                            </TodoListItem>
                        ))}
                    {addTodoIsPending && (
                        <TodoListItem isPending={addTodoIsPending} completed={false}>
                            {addTodoVariables}
                        </TodoListItem>
                    )}
                    {!data?.length && !isLoading && <em>Looks like you don't have any todos yet. Start adding some!</em>}
                </TodoList>
                <InputContainer>
                    <Input name="title" type="text" placeholder="Add a new todo..." />
                    <Button disabled={mutationIsPending} type="submit">
                        +
                    </Button>
                </InputContainer>
            </form>
        </Container>
    );
};

export default App;
