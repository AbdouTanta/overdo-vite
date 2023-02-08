import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CreateTaskDTO, ITask } from '../../types/ITask';
import client from '../common/client';

type Response = ITask;

type PostTaskOptions = {
  listId: string;
  payload: CreateTaskDTO;
};

function postTask({ listId, payload }: PostTaskOptions): Promise<Response> {
  return client.post(`lists/${listId}/tasks`, payload).then((res) => {
    return res.data;
  });
}

export function usePostTask(
  config: UseMutationOptions<Response, AxiosError, PostTaskOptions>
) {
  return useMutation<ITask, AxiosError, PostTaskOptions>(postTask, {
    ...config,
  });
}
