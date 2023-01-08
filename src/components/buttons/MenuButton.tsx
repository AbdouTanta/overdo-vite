import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

function MenuButton() {
  return (
    <div className="flex cursor-pointer items-center">
      <EllipsisVerticalIcon className="h-5 w-5 text-black" />
    </div>
  );
}

export default MenuButton;
