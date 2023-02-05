import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IBoard } from '../../types/IBoard';
import client from '../common/client';

type Response = IBoard;

type DeleteBoardOptions = {
  boardId: string;
};

function deleteBoard({ boardId }: DeleteBoardOptions): Promise<Response> {
  return client.delete(`boards/${boardId}`).then((res) => {
    return res.data;
  });
}

export function useDeleteBoard(
  config: UseMutationOptions<Response, AxiosError, DeleteBoardOptions>
) {
  return useMutation<IBoard, AxiosError, DeleteBoardOptions>(deleteBoard, {
    ...config,
  });
}
