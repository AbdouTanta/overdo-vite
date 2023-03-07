import { useQueryClient } from '@tanstack/react-query';
import { useDeleteList } from '../../../api/list/useDeleteList';
import { useModal } from '../../../contexts/modal-context';
import Button from '../../buttons/Button';
import ModalTypes from '../../../types/ModalTypes';

function DeleteListModal() {
  const { modal, setModal } = useModal();
  const queryClient = useQueryClient();
  const { mutate: deleteList } = useDeleteList({
    onSuccess: () => {
      queryClient.invalidateQueries(['boards']);
    },
  });

  const handleSubmit = () => {
    if (modal.data?.id) {
      deleteList({ listId: modal.data?.id });
    }
    setModal({ open: false, type: ModalTypes.NULL });
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-6">
        {/* Modal title and description */}
        <div className="text-lg font-semibold">Delete board</div>
        <div className="text-md">Are you sure you want to delete the list?</div>
        {/* Buttons */}
        <div className="mt-auto flex justify-end gap-4">
          <Button
            text="Cancel"
            color="secondary"
            onClick={() => {
              setModal({ open: false, type: ModalTypes.NULL });
            }}
          />
          <Button text="Delete" color="danger" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default DeleteListModal;
