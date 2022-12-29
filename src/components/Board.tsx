/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { IBoard } from '../types/IBoard';
import { IList } from '../types/IList';
import List from './List';
import ListPlaceholder from './ListPlaceholder';

function ListGrid({ board }: { board: IBoard }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return axios.delete(`http://localhost:3000/api/boards/${board.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['boards']);
      },
    }
  );

  return (
    <motion.div
      className="flex items-start gap-8"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      {board?.lists.length !== 0
        ? board?.lists?.map((list: IList) => <List key={list.id} list={list} />)
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
        <div
          className="text-md cursor-pointer font-medium text-red-500 underline underline-offset-4 hover:text-red-700"
          onClick={() => {
            mutation.mutate();
          }}
        >
          X Delete All lists
        </div>
      </div>
    </motion.div>
  );
}

export default ListGrid;
