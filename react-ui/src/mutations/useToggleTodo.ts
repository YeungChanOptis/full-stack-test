import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../types/Todo';

export const useToggleTodo = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, Todo>({
        mutationFn: async (todo: Todo) => {
            await fetch(`http://localhost:3000/todos/${todo.id}/toggle`, {
                method: 'PATCH',
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'application/json' },
            });
        },
        onError: (error: Error) => {
            console.error('Error updating todo:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
};
