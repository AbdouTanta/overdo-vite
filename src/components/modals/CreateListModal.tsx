/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TextInput from '../inputs/TextInput';
import { useModal } from '../../contexts/modal-context';
import Button from '../buttons/Button';
import ModalTypes from '../../types/ModalTypes';
import { useBoard } from '../../contexts/board-context';

type Inputs = {
  name: string;
};

/* eslint-disable jsx-a11y/label-has-associated-control */
function CreateListModal() {
  const { setModal } = useModal();
  const { selectedBoard } = useBoard();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: Inputs) => {
      return axios.post(
        `http://localhost:3000/api/boards/${selectedBoard.id}/lists`,
        data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([selectedBoard.id]);
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
    setModal({ open: false, type: ModalTypes.NULL });
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="flex h-72 flex-col gap-4 rounded-xl bg-white p-6">
        {/* Modal title */}
        <div className="text-lg font-semibold">Create a new list</div>
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

export default CreateListModal;
