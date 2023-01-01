/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSortable } from '@dnd-kit/sortable';
import clsx from 'clsx';
import { useBoard } from '../../contexts/board-context';
import { IBoard } from '../../types/IBoard';

function DraggableBoard({ board }: { board: IBoard }) {
  const { selectedBoard, setSelectedBoard } = useBoard();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: board.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div
        className={clsx(
          'cursor-pointer rounded-lg bg-opacity-30 p-2 text-lg font-medium',
          `text-${board.color}-500`,
          `hover:text-${board.color}-400`,
          board.id === selectedBoard.id &&
            `outline outline-2 outline-${board.color}-500`
        )}
        onClick={() => {
          setSelectedBoard({ id: board.id, color: board.color });
        }}
      >
        {board.name}
      </div>
    </div>
  );
}

export default DraggableBoard;
