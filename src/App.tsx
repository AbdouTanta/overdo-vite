import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Navbar from './components/global/Navbar';
import Sidebar from './components/global/Sidebar';
import ListGrid from './components/list/ListGrid';
import { IBoard } from './types/IBoard';
import { useBoard } from './contexts/board-context';

function App() {
  const { selectedBoard, setSelectedBoard } = useBoard();

  const { data: boards, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: () =>
      axios.get('http://localhost:3000/api/boards').then((res) => {
        if (res.data.length === 0) return [];
        if (selectedBoard.id === '') {
          setSelectedBoard(() => {
            return {
              id: res.data[0].id,
              color: res.data[0].color,
            };
          });
        }
        return res.data;
      }),
  });

  return (
    <div className="h-screen bg-slate-200">
      {/* Nav: Logo and User */}
      <Navbar />
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="mt-12 grid grid-cols-[20em_auto]">
          {/* Sidebar */}
          <Sidebar boards={boards} />
          {/* Board lists */}
          {boards.length === 0 ? (
            <div>No boards!</div>
          ) : (
            <ListGrid
              board={boards.find((b: IBoard) => b.id === selectedBoard.id)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
