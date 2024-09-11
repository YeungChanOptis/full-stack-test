import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: async (id: string) => {
            await fetch(`http://localhost:3000/todos/${id}`, {
                method: 'DELETE',
            });
        },
        onError: (error: Error) => {
            console.error('Error deleting todo:', error);
        },
        onSettled: () => {
            queryClient.refetchQueries({ queryKey: ['todos'] });
        },
    });
};
