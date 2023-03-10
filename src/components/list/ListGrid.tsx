/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useGetBoard } from '../../api/board/useGetBoard';
import { IBoard } from '../../types/IBoard';
import { IList } from '../../types/IList';
import List from './List';
import ListPlaceholder from './ListPlaceholder';

function ListGrid({ board }: { board: IBoard }) {
  const {
    data: lists,
    isLoading,
    isError,
  } = useGetBoard({ boardId: board.id });

  if (isLoading) return <h1>Loading</h1>;

  if (isError) return <h1>Error loading lists!</h1>;

  if (!lists) return <h1>No lists</h1>;

  return (
    <div className="flex flex-row">
      {lists.length !== 0 && (
        <div className="scrollbar flex items-start gap-4 overflow-x-auto pb-4 pr-4">
          {lists?.map((list: IList) => (
            <List key={list.id} list={list} />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <ListPlaceholder />
      </div>
    </div>
  );
}

export default ListGrid;
