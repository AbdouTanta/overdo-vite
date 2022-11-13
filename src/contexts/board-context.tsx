import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

type ContextProps = {
  selectedBoard: {
    id: string;
    color: string;
  };
  setSelectedBoard: Dispatch<SetStateAction<{ id: string; color: string }>>;
};

const BoardContext = createContext<ContextProps | undefined>(undefined);

function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}

function BoardProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ContextProps;
}) {
  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

export { BoardProvider, useBoard };
