/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core';
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { useGetBoard } from '../../api/board/useGetBoard';
import { IBoard } from '../../types/IBoard';
import { IList } from '../../types/IList';
import List from './List';
import ListPlaceholder from './ListPlaceholder';

function ListGrid({ board }: { board: IBoard }) {
  const { data: lists, isLoading } = useGetBoard({ boardId: board.id });

  // const sensors = useSensors(
  //   useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  // );
  const { setNodeRef } = useDroppable({ id: 'listgrid' });

  function handleDragEnd() {}

  if (isLoading) return <h1>Loading</h1>;

  if (!lists) return <h1>No lists</h1>;

  return (
    <DndContext
      // sensors={sensors}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeOut', duration: 0.5 }}
        className="flex flex-row"
      >
        {lists.length !== 0 && (
          <div
            className="scrollbar flex items-start gap-4 overflow-x-auto pb-4 pr-4"
            ref={setNodeRef}
          >
            <SortableContext
              items={lists}
              strategy={horizontalListSortingStrategy}
            >
              {lists?.map((list: IList) => (
                <List key={list.id} list={list} />
              ))}
            </SortableContext>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <ListPlaceholder />
        </div>
      </motion.div>
    </DndContext>
  );
}

export default ListGrid;
