/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { useBoard } from '../contexts/board-context';
import { useModal } from '../contexts/modal-context';
import { IBoard } from '../types/IBoard';

type SidebarProps = { boards: IBoard[] };

function Sidebar({ boards }: SidebarProps) {
  const { selectedBoard, setSelectedBoard } = useBoard();
  const { setShowModal } = useModal();

  return (
    <div className="flex flex-col gap-12 px-20">
      {boards.map((board) => (
        <div
          key={board.id}
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
      ))}
      <div
        className="cursor-pointer text-lg font-medium text-slate-500 underline underline-offset-4 hover:text-slate-700"
        onClick={() => {
          setShowModal(true);
        }}
      >
        + New Board
      </div>
    </div>
  );
}

export default Sidebar;
