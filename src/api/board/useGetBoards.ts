import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IBoard } from '../../types/IBoard';
import client from '../common/client';

type Response = IBoard[];

function getBoards(): Promise<Response> {
  return client.get('boards').then((res) => res.data);
}

export function useGetBoards(config?: UseQueryOptions<Response>) {
  return useQuery<Response>({
    queryKey: ['boards'],
    queryFn: getBoards,
    ...config,
  });
}
