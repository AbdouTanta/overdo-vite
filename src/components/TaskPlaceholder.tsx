/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function TaskPlaceholder({ listId }: { listId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`http://localhost:3000/api/tasks`, { listId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['boards']);
      },
    }
  );

  return (
    // <div
    //   className="cursor-pointer rounded-xl bg-gray-200  p-4 text-center font-normal text-black shadow-sm transition hover:bg-gray-300 hover:shadow-lg"
    //   onClick={() => {
    //     mutation.mutate();
    //   }}
    // >
    <div
      className="cursor-pointer rounded-xl border-2 border-gray-200 bg-transparent p-4 font-normal text-gray-700 transition hover:bg-gray-200 hover:text-black"
      onClick={() => {
        mutation.mutate();
      }}
    >
      + New Task
    </div>
  );
}

export default TaskPlaceholder;
