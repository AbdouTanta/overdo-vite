import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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
  return useMutation<IBoard, AxiosError, PatchBoardOptions>(patchBoard, {
    ...config,
  });
}
