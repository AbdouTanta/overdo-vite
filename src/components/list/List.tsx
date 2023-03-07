import { useSortable } from '@dnd-kit/sortable';
import { useModal } from '../../contexts/modal-context';
import { IList } from '../../types/IList';
import { ITask } from '../../types/ITask';
import ModalTypes from '../../types/ModalTypes';
import BoardMenu from '../buttons/BoardItemDropdown';
import HorizontalDragHandle from '../buttons/HorizontalDragHandle';
import Task from '../task/Task';
import TaskPlaceholder from '../task/TaskPlaceholder';

function List({ list }: { list: IList }) {
  const { setModal } = useModal();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: list.id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-72 flex-shrink-0 flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <HorizontalDragHandle {...listeners} {...attributes} />
        <div className="text-md font-semibold">{list.name}</div>
        <BoardMenu
          editHandler={() => {
            setModal({
              open: true,
              type: ModalTypes.EDIT_LIST,
              data: { id: list.id },
            });
          }}
          deleteHandler={() => {
            setModal({
              open: true,
              type: ModalTypes.DELETE_LIST,
              data: { id: list.id },
            });
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
