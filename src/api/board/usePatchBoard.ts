import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EditBoardDTO, IBoard } from '../../types/IBoard';
import client from '../common/client';

type Response = IBoard;

type PatchBoardOptions = {
  boardId: string;
  payload: EditBoardDTO;
};

function patchBoard({
  boardId,
  payload,
}: PatchBoardOptions): Promise<Response> {
  return client.patch(`boards/${boardId}`, payload).then((res) => {
    return res.data;
  });
}

export function usePatchBoard(
  config: UseMutationOptions<Response, AxiosError, PatchBoardOptions>
) {
  const queryClient = useQueryClient();

  return useMutation<IBoard, AxiosError, PatchBoardOptions>(patchBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...config,
  });
}
