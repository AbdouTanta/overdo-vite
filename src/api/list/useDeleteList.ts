import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IList } from '../../types/IList';
import client from '../common/client';

type Response = IList;

type DeleteListOptions = {
  listId: string;
};

function deleteList({ listId }: DeleteListOptions): Promise<Response> {
  return client.delete(`lists/${listId}`).then((res) => {
    return res.data;
  });
}

export function useDeleteList(
  config: UseMutationOptions<Response, AxiosError, DeleteListOptions>
) {
  return useMutation<IList, AxiosError, DeleteListOptions>(deleteList, {
    ...config,
  });
}
