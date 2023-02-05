/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useGetBoard } from '../../api/board/useGetBoard';
import { IBoard } from '../../types/IBoard';
import { IList } from '../../types/IList';
import List from './List';
import ListPlaceholder from './ListPlaceholder';

function ListGrid({ board }: { board: IBoard }) {
  const queryClient = useQueryClient();
  const { data: lists, isLoading } = useGetBoard({ boardId: board.id });

  const mutation = useMutation(
    () => {
      return axios.delete(`http://localhost:3000/boards/${board.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['boards']);
      },
    }
  );

  if (isLoading) return <h1>Loading</h1>;

  if (!lists) return <h1>No lists</h1>;

  return (
    <motion.div
      className="scrollbar mr-20 flex items-start gap-8 overflow-x-auto pb-4 pr-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      {lists.length !== 0
        ? lists?.map((list: IList) => <List key={list.id} list={list} />)
        : null}
      <div className="flex flex-col gap-4">
        <ListPlaceholder />
      </div>
    </motion.div>
  );
}

export default ListGrid;
