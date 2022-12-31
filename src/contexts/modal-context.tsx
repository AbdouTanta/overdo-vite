import { createContext, useContext, ReactNode, useState } from 'react';
import ModalTypes from '../types/ModalTypes';

type ContextProps = {
  modal: { open: boolean; type: ModalTypes };
  setModal: React.Dispatch<
    React.SetStateAction<{ open: boolean; type: ModalTypes }>
  >;
};

const ModalContext = createContext<ContextProps | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState({
    open: false,
    type: ModalTypes.NULL,
  });
  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, useModal };
