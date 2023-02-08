import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ITask } from '../../types/ITask';
import client from '../common/client';

type Response = ITask;

type DeleteTaskOptions = {
  taskId: string;
};

function deleteTask({ taskId }: DeleteTaskOptions): Promise<Response> {
  return client.delete(`tasks/${taskId}`).then((res) => {
    return res.data;
  });
}

export function useDeleteTask(
  config: UseMutationOptions<Response, AxiosError, DeleteTaskOptions>
) {
  return useMutation<ITask, AxiosError, DeleteTaskOptions>(deleteTask, {
    ...config,
  });
}
