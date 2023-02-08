import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EditTaskDTO, ITask } from '../../types/ITask';
import client from '../common/client';

type Response = ITask;

type PatchTaskOptions = {
  taskId: string;
  payload: EditTaskDTO;
};

function patchTask({ taskId, payload }: PatchTaskOptions): Promise<Response> {
  return client.patch(`tasks/${taskId}`, payload).then((res) => {
    return res.data;
  });
}

export function usePatchTask(
  config: UseMutationOptions<Response, AxiosError, PatchTaskOptions>
) {
  return useMutation<ITask, AxiosError, PatchTaskOptions>(patchTask, {
    ...config,
  });
}
