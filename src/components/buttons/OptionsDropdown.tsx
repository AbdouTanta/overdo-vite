/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import MenuButton from './MenuButton';

function OptionsDropdown({
  editHandler,
  deleteHandler,
}: {
  editHandler: () => void;
  deleteHandler: () => void;
}) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as="div" className="relative flex items-center">
        <MenuButton />
      </Menu.Button>
      {/* <Menu.Items className="absolute mx-2 my-5 translate-x-full rounded-2xl border-2 border-slate-300 bg-slate-100 py-3 shadow-2xl"> */}
      <Menu.Items className="absolute z-50 rounded-2xl border-2 border-slate-300 bg-slate-100 py-3 shadow-2xl">
        <Menu.Item>
          {({ active }) => (
            <div
              className={`mb-1 flex cursor-pointer items-center gap-4 py-1 px-6 text-sm text-gray-700 ${
                active && 'bg-slate-200'
              }`}
              onClick={editHandler}
            >
              <PencilIcon className="h-4 w-4" />
              <div>Edit</div>
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`flex cursor-pointer items-center gap-4 px-6 py-1 text-sm text-gray-700 ${
                active && 'bg-slate-200'
              }`}
              onClick={deleteHandler}
            >
              <TrashIcon className="h-4 w-4" />
              <div>Delete</div>
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default OptionsDropdown;
