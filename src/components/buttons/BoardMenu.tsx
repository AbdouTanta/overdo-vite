import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import MenuButton from './MenuButton';

function BoardMenu() {
  return (
    <Menu>
      <Menu.Button>
        <MenuButton />
      </Menu.Button>
      <Menu.Items className="absolute mx-2 my-5 translate-x-full rounded-2xl border-2 border-slate-300 bg-slate-100 py-3 shadow-2xl">
        <Menu.Item>
          {({ active }) => (
            <div
              className={`mb-1 flex items-center gap-4 py-1 px-6 text-sm text-gray-700 ${
                active && 'bg-slate-200'
              }`}
            >
              <PencilIcon className="h-4 w-4" />
              <div>Edit</div>
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              className={`flex items-center gap-4 px-6 py-1 text-sm text-gray-700 ${
                active && 'bg-slate-200'
              }`}
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

export default BoardMenu;
