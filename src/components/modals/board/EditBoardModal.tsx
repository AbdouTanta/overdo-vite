import { useForm, SubmitHandler } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import TextInput from '../../inputs/TextInput';
import { useModal } from '../../../contexts/modal-context';
import CheckBox from '../../inputs/CheckBox';
import Button from '../../buttons/Button';
import ModalTypes from '../../../types/ModalTypes';

type Inputs = {
  name: string;
  color: string;
  startWithTemplate: boolean;
};

function EditeBoardModal() {
  const { setModal } = useModal();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newBoard: { name: string; color: string }) => {
      return axios.post('http://localhost:3000/boards', newBoard);
    },
    {
      onMutate: async (newBoard) => {
        await queryClient.cancelQueries(['boards']);
        const snapshotOfPreviousBoards = queryClient.getQueryData(['boards']);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryClient.setQueryData(['boards'], (oldBoards: any) => [
          ...oldBoards,
          { id: uuidv4(), ...newBoard },
        ]);
        return { snapshotOfPreviousBoards };
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['boards']);
      },
      onError: (error, newBoard, snapshotOfPreviousBoards) => {
        queryClient.setQueryData(['boards'], snapshotOfPreviousBoards);
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({ name: data.name, color: data.color });
    setModal({ open: false, type: ModalTypes.NULL });
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="flex h-72 flex-col gap-4 rounded-xl bg-white p-6">
        {/* Modal title */}
        <div className="text-lg font-semibold">Create a new board</div>
        {/* Inputs */}
        <div className="flex justify-between gap-4">
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
          <div className="flex flex-col gap-1">
            <TextInput
              label="Color"
              id="color"
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
        <div className="flex items-center gap-2">
          <CheckBox
            text="Start with Todo, Doing and Done lists"
            label="startWithTemplate"
            register={register}
          />
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

export default EditeBoardModal;
