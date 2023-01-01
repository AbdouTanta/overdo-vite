/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import DraggableBoard from './DraggableBoard';
import { useBoard } from '../../contexts/board-context';
import { useModal } from '../../contexts/modal-context';
import { IBoard } from '../../types/IBoard';
import ModalTypes from '../../types/ModalTypes';

type SidebarProps = { boards: IBoard[] };

function Sidebar({ boards }: SidebarProps) {
  const { setModal } = useModal();
  const [sortableBoards, setSortableBoards] = useState(boards);
  const { isOver, setNodeRef } = useDroppable({ id: 'sidebar' });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      setSortableBoards((oldBoards) => {
        const oldBoardsIds = oldBoards.map((el: IBoard) => el.id);

        const oldIndex = oldBoardsIds.indexOf(`${active.id}`);
        const newIndex = oldBoardsIds.indexOf(`${over?.id}`);

        console.log(oldIndex);
        console.log(newIndex);

        // console.log(arrayMove(oldBoards, oldIndex, newIndex));

        return arrayMove(oldBoards, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      // eslint-disable-next-line react/jsx-no-bind
      onDragEnd={handleDragEnd}
    >
      <div ref={setNodeRef} className="flex flex-col gap-12 px-20">
        <SortableContext
          items={sortableBoards}
          strategy={verticalListSortingStrategy}
        >
          {sortableBoards.map((board) => (
            <DraggableBoard key={board.id} board={board} />
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
