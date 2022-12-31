import clsx from 'clsx';
import { useBoard } from '../../contexts/board-context';
import { ITask } from '../../types/ITask';

function Task({ task }: { task: ITask }) {
  const { selectedBoard } = useBoard();

  return (
    <div
      className={clsx(
        'cursor-pointer rounded-xl  p-4 font-normal text-black shadow-sm transition hover:shadow-lg',
        `bg-${selectedBoard.color}-200`,
        `hover:bg-${selectedBoard.color}-300`
      )}
    >
      {task.name}
    </div>
  );
}

export default Task;
