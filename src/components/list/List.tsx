import { useModal } from '../../contexts/modal-context';
import { IList } from '../../types/IList';
import { ITask } from '../../types/ITask';
import ModalTypes from '../../types/ModalTypes';
import BoardMenu from '../buttons/OptionsDropdown';
import Task from '../task/Task';
import TaskPlaceholder from '../task/TaskPlaceholder';

function List({ list }: { list: IList }) {
  const { setModal } = useModal();

  return (
    <div className="flex w-72 flex-shrink-0 flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-md font-semibold">{list.name}</div>
        <BoardMenu
          editHandler={() => {
            setModal({ open: true, type: ModalTypes.EDIT_LIST });
          }}
          deleteHandler={() => {
            setModal({ open: true, type: ModalTypes.DELETE_LIST });
          }}
        />
      </div>
      {list.tasks?.map((task: ITask) => (
        <Task key={task.id} task={task} />
      ))}
      <TaskPlaceholder listId={list.id} />
    </div>
  );
}

export default List;
