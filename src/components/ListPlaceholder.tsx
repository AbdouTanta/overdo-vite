/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useBoard } from '../contexts/board-context';

function ListPlaceholder() {
  const queryClient = useQueryClient();
  const { selectedBoard } = useBoard();
  const mutation = useMutation(
    () => {
      return axios.post(
        `http://localhost:3000/api/boards/${selectedBoard.id}/lists`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['boards']);
      },
    }
  );
  return (
    <div
      className="flex h-14 w-72 cursor-pointer flex-col justify-center gap-4 rounded-xl border-2 border-slate-700 bg-slate-200 p-4 align-middle opacity-50 shadow-sm transition hover:bg-slate-300"
      onClick={() => {
        mutation.mutate();
      }}
    >
      <div className="text-md cursor-pointer font-medium text-gray-900">
        + New List
      </div>
    </div>
  );
}

export default ListPlaceholder;
