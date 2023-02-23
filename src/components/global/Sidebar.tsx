/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { usePatchBoard } from '../../api/board/usePatchBoard';
import { useBoard } from '../../contexts/board-context';
import { useModal } from '../../contexts/modal-context';
import { IBoard } from '../../types/IBoard';
import ModalTypes from '../../types/ModalTypes';
import {
  calculateLexorank,
  parseLexorank,
} from '../../utils/calculate-lexorank';
import BoardItem from './BoardItem';

type SidebarProps = { boards: IBoard[] };

function Sidebar({ boards }: SidebarProps) {
  const [sortableBoards, setSortableBoards] = useState(boards);
  const [prevBoards, setPrevBoards] = useState<IBoard[] | null>(null);
  const { setNodeRef } = useDroppable({ id: 'sidebar' });
  const { selectedBoard, setSelectedBoard } = useBoard();
  const { setModal } = useModal();
  const { mutate: editBoard } = usePatchBoard({});
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (boards !== prevBoards) {
    setSortableBoards(boards);
    setPrevBoards(boards);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      const oldBoardsIds = sortableBoards.map((el: IBoard) => el.id);
      const oldIndex = oldBoardsIds.indexOf(`${active.id}`);
      const newIndex = oldBoardsIds.indexOf(`${over?.id}`);

      // make api call to update rank
      editBoard({
        boardId: active.id.toString(),
        payload: {
          lexorank: calculateLexorank({
            prev: parseLexorank(sortableBoards[newIndex - 1]?.lexorank),
            next: parseLexorank(sortableBoards[newIndex + 1]?.lexorank),
          }),
        },
      });

      // re-arrange boards
      setSortableBoards((oldBoards) => {
        return arrayMove(oldBoards, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div ref={setNodeRef} className="flex flex-col gap-12 px-20">
        <SortableContext
          items={sortableBoards}
          strategy={verticalListSortingStrategy}
        >
          {sortableBoards.map((board) => (
            <BoardItem
              key={board.id}
              board={board}
              isSelected={board.id === selectedBoard.id}
              onClick={() => {
                setSelectedBoard(board);
              }}
            />
          ))}
        </SortableContext>
        <div
          className="cursor-pointer text-lg font-medium text-slate-500 underline underline-offset-4 hover:text-slate-700"
          onClick={() => {
            setModal({ open: true, type: ModalTypes.CREATE_BOARD });
          }}
        >
          + New Board
        </div>
      </div>
    </DndContext>
  );
}

export default Sidebar;
