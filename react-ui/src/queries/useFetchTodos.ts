import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../App';
import { Todo } from '../types/Todo';

const useFetchTodos = () => {
    return useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await fetch(BASE_URL);
            return response.json();
        },
    });
};
export default useFetchTodos;
