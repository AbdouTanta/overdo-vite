/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useForm, SubmitHandler } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import TextInput from '../../inputs/TextInput';
import { useModal } from '../../../contexts/modal-context';
import Button from '../../buttons/Button';
import ModalTypes from '../../../types/ModalTypes';
import { usePatchList } from '../../../api/list/usePatchList';

type Inputs = {
  name: string;
};

/* eslint-disable jsx-a11y/label-has-associated-control */
function EditListModal() {
  const { modal, setModal } = useModal();

  const queryClient = useQueryClient();

  const { mutate: editList } = usePatchList({
    onSuccess: () => {
      queryClient.invalidateQueries(['boards']);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (modal?.data?.id) {
      console.log(modal, data);
      editList({ listId: modal.data?.id, payload: { name: data.name } });
    }
    setModal({ open: false, type: ModalTypes.NULL });
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="flex h-72 flex-col gap-4 rounded-xl bg-white p-6">
        {/* Modal title */}
        <div className="text-lg font-semibold">Edit list</div>
        {/* Inputs */}
        <div className="flex flex-col gap-1">
          <TextInput
            label="Name"
            id="name"
            register={register}
            validationSchema={{ required: true }}
          />
          {errors.name && (
            <div className="text-xs font-medium text-red-500">
              Name is required!
            </div>
          )}
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
          <Button text="Create" isPrimary onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
}

export default EditListModal;
