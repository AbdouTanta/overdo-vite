import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import TextInput from '../../inputs/TextInput';
import { useModal } from '../../../contexts/modal-context';
import CheckBox from '../../inputs/CheckBox';
import Button from '../../buttons/Button';
import ModalTypes from '../../../types/ModalTypes';
import ColorDropdown from '../../inputs/ColorDropdown';
import { usePostBoard } from '../../../api/board/usePostBoard';

type Inputs = {
  name: string;
  color: string;
  startWithTemplate: boolean;
};

function CreateBoardModal() {
  const queryClient = useQueryClient();
  const { setModal } = useModal();
  const { mutate: postBoard } = usePostBoard({
    onSuccess: () => {
      queryClient.invalidateQueries(['boards']);
    },
  });
  const colors = ['red', 'green', 'blue', 'orange', 'teal', 'yellow', 'black'];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    postBoard({ payload: { name: data.name, color: data.color } });
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
            {/* <TextInput
              label="Color"
              id="color"
              register={register}
              validationSchema={{ required: true }}
            /> */}
            <Controller
              control={control}
              defaultValue="green"
              rules={{ required: true }}
              name="color"
              render={({ field }) => (
                <ColorDropdown
                  label="Color"
                  id="color"
                  field={field}
                  colors={colors}
                />
              )}
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
            color='danger'
            onClick={() => {
              setModal({ open: false, type: ModalTypes.NULL });
            }}
          />
          <Button text="Create" color='primary' onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
}

export default CreateBoardModal;
