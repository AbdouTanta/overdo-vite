import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
} from 'react';

type ContextProps = {
  selectedBoard: {
    id: string;
    color: string;
  };
  setSelectedBoard: Dispatch<SetStateAction<{ id: string; color: string }>>;
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
  const [selectedBoard, setSelectedBoard] = useState({ id: '', color: '' });

  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <BoardContext.Provider value={{ selectedBoard, setSelectedBoard }}>
      {children}
    </BoardContext.Provider>
  );
}

export { BoardProvider, useBoard };
