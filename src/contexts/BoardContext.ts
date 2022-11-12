import { createContext, Dispatch, SetStateAction } from 'react';

type ContextProps = {
  selectedBoard: {
    id: string;
    color: string;
  };
  setSelectedBoard: Dispatch<SetStateAction<{ id: string; color: string }>>;
};

const BoardContext = createContext<ContextProps>({
  selectedBoard: { id: '', color: '' },
  setSelectedBoard: () => {},
});

export default BoardContext;
