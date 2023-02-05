import { useQueryClient } from '@tanstack/react-query';
import { useDeleteBoard } from '../../../api/board/useDeleteBoard';
import { useModal } from '../../../contexts/modal-context';
import Button from '../../buttons/Button';
import ModalTypes from '../../../types/ModalTypes';
import { useBoard } from '../../../contexts/board-context';

function DeleteBoardModal() {
  const { setModal } = useModal();
  const queryClient = useQueryClient();
  const { selectedBoard, setSelectedBoard } = useBoard();
  const { mutate: deleteBoard } = useDeleteBoard({
    onSuccess: () => {
      setSelectedBoard((prev) => ({ ...prev, id: '' }));
      queryClient.invalidateQueries(['boards']);
    },
  });

  const handleSubmit = () => {
    deleteBoard({ boardId: selectedBoard.id });
    setModal({ open: false, type: ModalTypes.NULL });
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-6">
        {/* Modal title and description */}
        <div className="text-lg font-semibold">Delete board</div>
        <div className="text-md">
          Are you sure you want to delete the board?
        </div>
        {/* Buttons */}
        <div className="mt-auto flex justify-end gap-4">
          <Button
            text="Cancel"
            isPrimary={false}
            onClick={() => {
              setModal({ open: false, type: ModalTypes.NULL });
            }}
          />
          <Button text="Delete" isDelete onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default DeleteBoardModal;
