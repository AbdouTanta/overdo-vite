import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BoardProvider } from './board-context';
import { ModalProvider } from './modal-context';

const queryClient = new QueryClient();
function DataProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BoardProvider>
        <ModalProvider>{children}</ModalProvider>
      </BoardProvider>
    </QueryClientProvider>
  );
}

export default DataProvider;
