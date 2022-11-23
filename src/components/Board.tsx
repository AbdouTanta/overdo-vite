import { motion } from 'framer-motion';
import { IBoard } from '../types/IBoard';
import { IList } from '../types/IList';
import List from './List';

function ListGrid({ board }: { board: IBoard }) {
  return (
    <motion.div
      className="flex items-start gap-8"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      {board?.lists.map((list: IList) => (
        <List key={list.id} list={list} />
      ))}
    </motion.div>
  );
}

export default ListGrid;
