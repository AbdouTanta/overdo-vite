/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useBoard } from '../../contexts/board-context';
import { useModal } from '../../contexts/modal-context';
import ModalTypes from '../../types/ModalTypes';

function TaskPlaceholder({ listId }: { listId: string }) {
  const { selectedBoard } = useBoard();
  const { setModal } = useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axios.post(`http://localhost:3000/api/tasks`, { listId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([selectedBoard.id]);
      },
    }
  );

  return (
    <div
      className="cursor-pointer rounded-xl border-2 border-gray-200 bg-transparent p-4 font-normal text-gray-700 transition hover:bg-gray-200 hover:text-black"
      onClick={() => {
        // mutation.mutate();
        setModal({ open: true, type: ModalTypes.CREATE_TASK });
      }}
    >
      + New Task
    </div>
  );
}

export default TaskPlaceholder;
