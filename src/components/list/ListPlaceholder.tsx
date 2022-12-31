/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useModal } from '../../contexts/modal-context';
import ModalTypes from '../../types/ModalTypes';

function ListPlaceholder() {
  const { setModal } = useModal();

  return (
    <div
      className="flex h-14 w-72 cursor-pointer flex-col justify-center gap-4 rounded-xl border-2 border-slate-700 bg-slate-200 p-4 align-middle opacity-50 shadow-sm transition hover:bg-slate-300"
      onClick={() => {
        // mutation.mutate();
        setModal({ open: true, type: ModalTypes.CREATE_LIST });
      }}
    >
      <div className="text-md cursor-pointer font-medium text-gray-900">
        + New List
      </div>
    </div>
  );
}

export default ListPlaceholder;
