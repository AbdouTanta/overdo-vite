import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IList } from '../../types/IList';
import client from '../common/client';

type Response = IList[];

function getBoard(boardId: string): Promise<Response> {
  return client.get(`boards/${boardId}`).then((res) => {
    return res.data.lists;
  });
}

type UseGetBoardOptions = {
  config?: UseQueryOptions<Response>;
  boardId: string;
};

export function useGetBoard({ config, boardId }: UseGetBoardOptions) {
  return useQuery<Response>({
    queryKey: ['boards', boardId],
    queryFn: () => getBoard(boardId),
    enabled: !!boardId,
    ...config,
  });
}
