import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CreateListDTO, IList } from '../../types/IList';
import client from '../common/client';

type Response = IList;

type PostListOptions = {
  boardId: string;
  payload: CreateListDTO;
};

function postList({ boardId, payload }: PostListOptions): Promise<Response> {
  return client.post(`boards/${boardId}/lists`, payload).then((res) => {
    return res.data;
  });
}

export function usePostList(
  config: UseMutationOptions<Response, AxiosError, PostListOptions>
) {
  return useMutation<IList, AxiosError, PostListOptions>(postList, {
    ...config,
  });
}
