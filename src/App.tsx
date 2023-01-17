// import axios from 'axios';
import Navbar from './components/global/Navbar';
import Sidebar from './components/global/Sidebar';
import ListGrid from './components/list/ListGrid';
import { IBoard } from './types/IBoard';
import { useBoard } from './contexts/board-context';
import { useGetBoards } from './api/board/useGetBoards';

function App() {
  const { selectedBoard, setSelectedBoard } = useBoard();

  const { data: boards, isLoading } = useGetBoards({
    onSuccess: (res) => {
      if (res.length === 0) return [];
      if (selectedBoard.id === '') {
        setSelectedBoard(() => {
          return {
            id: res[0].id,
            color: res[0].color,
          };
        });
      }
      return res;
    },
  });

  if (boards) {
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
}

export default App;
