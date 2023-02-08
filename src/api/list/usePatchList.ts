import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EditListDTO, IList } from '../../types/IList';
import client from '../common/client';

type Response = IList;

type PatchListOptions = {
  listId: string;
  payload: EditListDTO;
};

function patchList({ listId, payload }: PatchListOptions): Promise<Response> {
  return client.patch(`lists/${listId}`, payload).then((res) => {
    return res.data;
  });
}

export function usePatchList(
  config: UseMutationOptions<Response, AxiosError, PatchListOptions>
) {
  return useMutation<IList, AxiosError, PatchListOptions>(patchList, {
    ...config,
  });
}
