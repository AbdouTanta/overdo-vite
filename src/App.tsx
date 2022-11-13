import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ListGrid from './components/Board';
import { IBoard } from './types/IBoard';
import { BoardProvider } from './contexts/board-context';

function App() {
  const [selectedBoard, setSelectedBoard] = useState({ id: '', color: '' });

  const { data: boards, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: () =>
      axios.get('http://localhost:3000/boards').then((res) => {
        setSelectedBoard(() => {
          return {
            id: res.data[0].id,
            color: res.data[0].color,
          };
        });
        return res.data;
      }),
    initialData: [],
  });

  if (isLoading) return <div>Loading</div>;

  return (
    <BoardProvider value={{ selectedBoard, setSelectedBoard }}>
      <div className="h-screen bg-stone-200">
        {/* Nav: Logo and User */}
        <Navbar />
        <div className="mt-24 grid grid-cols-[20em_auto]">
          {/* Sidebar */}
          <Sidebar boards={boards} />
          {/* Board lists */}
          <ListGrid
            board={boards.find((b: IBoard) => b.id === selectedBoard.id)}
          />
        </div>
      </div>
    </BoardProvider>
  );
}

export default App;
