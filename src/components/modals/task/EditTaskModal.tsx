/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from '../../inputs/TextInput';
import { useModal } from '../../../contexts/modal-context';
import Button from '../../buttons/Button';
import ModalTypes from '../../../types/ModalTypes';
import { useBoard } from '../../../contexts/board-context';
import { IList } from '../../../types/IList';

type Inputs = {
  name: string;
};

/* eslint-disable jsx-a11y/label-has-associated-control */
function EditTaskModal() {
  const queryClient = useQueryClient();
  const { setModal } = useModal();
  const { selectedBoard, selectedListId } = useBoard();

  const mutation = useMutation(
    (data: Inputs) => {
      return axios.post(
        `http://localhost:3000/lists/${selectedListId}/tasks`,
        data
      );
    },
    {
      onMutate: async (newTask) => {
        await queryClient.cancelQueries([selectedBoard.id]);
        const snapshotOfPreviousLists = queryClient.getQueryData([
          selectedBoard.id,
        ]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryClient.setQueryData([selectedBoard.id], (oldLists: any) =>
          oldLists.map((list: IList) => {
            if (list.id === selectedListId) {
              const updatedTasks = [...list.tasks, newTask];
              return { ...list, tasks: updatedTasks };
            }
            return list;
          })
        );
        return { snapshotOfPreviousLists };
      },
      onSuccess: () => {
        queryClient.invalidateQueries([selectedBoard.id]);
      },
      onError: (error, newBoard, snapshotOfPreviousLists) => {
        queryClient.setQueryData([selectedBoard.id], snapshotOfPreviousLists);
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
        <div className="text-lg font-semibold">Edit task</div>
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

export default EditTaskModal;
