import { createContext, useContext, ReactNode, useState } from 'react';

type ContextProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [showModal, setShowModal] = useState(false);
  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, useModal };
