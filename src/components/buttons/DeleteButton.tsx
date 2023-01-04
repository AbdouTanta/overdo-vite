import { TrashIcon } from '@heroicons/react/24/outline';

function DeleteButton() {
  return (
    <div className="cursor-pointer">
      <TrashIcon className="h-5 w-5 text-red-500" />
    </div>
  );
}

export default DeleteButton;
