import { IList } from '../../types/IList';
import { ITask } from '../../types/ITask';
import Task from '../task/Task';
import TaskPlaceholder from '../task/TaskPlaceholder';

function List({ list }: { list: IList }) {
  return (
    <div className="flex w-72 flex-shrink-0 flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="text-md font-semibold">{list.name}</div>
      {list.tasks?.map((task: ITask) => (
        <Task key={task.id} task={task} />
      ))}
      <TaskPlaceholder listId={list.id} />
    </div>
  );
}

export default List;
