import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from '../../inputs/TextInput';
import { useModal } from '../../../contexts/modal-context';
import Button from '../../buttons/Button';
import ModalTypes from '../../../types/ModalTypes';
import { usePatchBoard } from '../../../api/board/usePatchBoard';
import { useBoard } from '../../../contexts/board-context';

type Inputs = {
  name: string;
  color: string;
};

function EditBoardModal() {
  const { modal, setModal } = useModal();
  const { setSelectedBoard } = useBoard();
  const queryClient = useQueryClient();
  const { mutate: editBoard } = usePatchBoard({
    onSuccess: (newBoard) => {
      // queryClient.invalidateQueries({ queryKey: ['boards', modal.data?.id] });
      // queryClient.invalidateQueries({ queryKey: ['boards'] });
      setSelectedBoard(newBoard);
      queryClient.invalidateQueries();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // mutation.mutate({ name: data.name, color: data.color });
    if (modal?.data?.id) {
      editBoard({
        boardId: modal.data?.id,
        payload: { name: data.name, color: data.color },
      });
    }
    setModal({ open: false, type: ModalTypes.NULL });
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="flex h-72 flex-col gap-4 rounded-xl bg-white p-6">
        {/* Modal title */}
        <div className="text-lg font-semibold">Edit board</div>
        {/* Inputs */}
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1">
            <TextInput
              label="Name"
              id="name"
              defaultValue={modal.data?.name}
              register={register}
              validationSchema={{ required: true }}
            />
            {errors.name && (
              <div className="text-xs font-medium text-red-500">
                Name is required!
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <TextInput
              label="Color"
              id="color"
              defaultValue={modal.data?.color}
              register={register}
              validationSchema={{ required: true }}
            />
            {errors.color && (
              <div className="text-xs font-medium text-red-500">
                Color is required!
              </div>
            )}
          </div>
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
          <Button text="Edit" isPrimary onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
}

export default EditBoardModal;
