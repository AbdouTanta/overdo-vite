/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { IBoard } from '../../types/IBoard';
import OptionsDropdown from '../buttons/BoardItemDropdown';
import ModalTypes from '../../types/ModalTypes';
import { useModal } from '../../contexts/modal-context';
import VerticalDragHandle from '../buttons/VerticalDragHandle';

interface BoardItemProps {
  board: IBoard;
  isSelected: boolean;
  onClick: () => void;
}

function BoardItem({ board, isSelected, onClick }: BoardItemProps) {
  const { setModal } = useModal();

  return (
    <div>
      <div
        key={board.id}
        className={clsx(
          'flex cursor-pointer items-center justify-between rounded-lg bg-opacity-30 p-2 text-lg font-medium hover:outline hover:outline-2',
          isSelected
            ? `outline outline-2 outline-${board.color}-500 bg-${board.color}-300`
            : `outline outline-2 outline-slate-300`
        )}
        onClick={onClick}
      >
        <VerticalDragHandle />
        <div
          className={clsx(
            isSelected ? `text-${board.color}-700` : `text-${board.color}-500`
          )}
        >
          {board.name}
        </div>
        <OptionsDropdown
          editHandler={() => {
            setModal({
              open: true,
              type: ModalTypes.EDIT_BOARD,
              data: board,
            });
          }}
          deleteHandler={() => {
            setModal({ open: true, type: ModalTypes.DELETE_BOARD });
          }}
        />
      </div>
    </div>
  );
}

export default BoardItem;
