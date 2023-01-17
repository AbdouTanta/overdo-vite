import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IBoard } from '../../types/IBoard';
import client from '../common/client';

function patchBoard(boardId: string) {
  return client.patch(`boards/${boardId}`).then((res) => {
    return res.data.lists;
  });
}

type Response = IBoard;

type UsePatchBoardOptions = {
  config?: UseMutationOptions<Response>;
  boardId: string;
};

export function usePatchBoard({ config, boardId }: UsePatchBoardOptions) {
  return useMutation({
    mutationKey: ['board', boardId],
    mutationFn: () => patchBoard(boardId),
    ...config,
  });
}
