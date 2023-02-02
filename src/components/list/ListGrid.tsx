/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useGetBoard } from '../../api/board/useGetBoard';
import { IList } from '../../types/IList';
import List from './List';
import ListPlaceholder from './ListPlaceholder';

function ListGrid({ boardId }: { boardId: string }) {
  const queryClient = useQueryClient();
  const { data: lists, isLoading } = useGetBoard({ boardId });

  const mutation = useMutation(
    () => {
      return axios.delete(`http://localhost:3000/boards/${boardId}`);
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
        <div
          className="text-md cursor-pointer font-medium text-red-500 underline underline-offset-4 hover:text-red-700"
          onClick={() => {
            mutation.mutate();
          }}
        >
          X Delete Board
        </div>
      </div>
    </motion.div>
  );
}

export default ListGrid;
