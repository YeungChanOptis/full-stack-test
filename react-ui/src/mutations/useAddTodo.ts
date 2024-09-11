import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: async (title: string) => {
            const response = await fetch(`http://localhost:3000/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });
            return await response.json();
        },
        onError: (error: Error) => {
            console.error('Error adding todo:', error);
        },
        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
};
