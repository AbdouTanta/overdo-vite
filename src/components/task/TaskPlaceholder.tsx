/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useBoard } from '../../contexts/board-context';
import { useModal } from '../../contexts/modal-context';
import ModalTypes from '../../types/ModalTypes';

function TaskPlaceholder({ listId }: { listId: string }) {
  const { setModal } = useModal();
  const { setSelectedListId } = useBoard();

  return (
    <div
      className="cursor-pointer rounded-xl border-2 border-gray-200 bg-transparent p-4 font-normal text-gray-700 transition hover:bg-gray-200 hover:text-black"
      onClick={() => {
        setModal({ open: true, type: ModalTypes.CREATE_TASK, id: listId });
        setSelectedListId(listId);
      }}
    >
      + New Task
    </div>
  );
}

export default TaskPlaceholder;
