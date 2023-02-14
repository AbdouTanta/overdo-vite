import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
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
  config?: UseMutationOptions<Response, AxiosError, PostBoardOptions>
) {
  const queryClient = useQueryClient();

  return useMutation<IBoard, AxiosError, PostBoardOptions>(postBoard, {
    onSuccess: (newBoard) => {
      queryClient.setQueryData<IBoard[]>(
        ['boards'],
        (oldBoards: IBoard[] | undefined) => {
          if (oldBoards) {
            return [...oldBoards, newBoard];
          } else {
            return [newBoard];
          }
        }
      );
    },
    ...config,
  });
}
