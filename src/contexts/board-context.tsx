import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
} from 'react';
import { IBoard } from '../types/IBoard';

type ContextProps = {
  selectedBoard: IBoard;
  setSelectedBoard: Dispatch<SetStateAction<IBoard>>;
  selectedListId: string;
  setSelectedListId: Dispatch<SetStateAction<string>>;
};

const BoardContext = createContext<ContextProps | null>(null);

function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}

function BoardProvider({ children }: { children: ReactNode }) {
  const [selectedBoard, setSelectedBoard] = useState({
    id: '',
    name: '',
    color: '',
  });
  const [selectedListId, setSelectedListId] = useState('');
  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <BoardContext.Provider
      value={{
        selectedBoard,
        setSelectedBoard,
        selectedListId,
        setSelectedListId,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export { BoardProvider, useBoard };
