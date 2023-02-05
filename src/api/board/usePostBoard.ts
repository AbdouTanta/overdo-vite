import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CreateBoardDTO, IBoard } from '../../types/IBoard';
import client from '../common/client';

type Response = IBoard;

type PostBoardOptions = {
  payload: CreateBoardDTO;
};

function postBoard({ payload }: PostBoardOptions): Promise<Response> {
  return client.post(`boards`, payload).then((res) => {
    return res.data;
  });
}

export function usePostBoard(
  config: UseMutationOptions<Response, AxiosError, PostBoardOptions>
) {
  return useMutation<IBoard, AxiosError, PostBoardOptions>(postBoard, {
    ...config,
  });
}
