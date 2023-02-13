import Navbar from './components/global/Navbar';
import Sidebar from './components/global/Sidebar';
import ListGrid from './components/list/ListGrid';
import { useBoard } from './contexts/board-context';
import { useGetBoards } from './api/board/useGetBoards';

function App() {
  const { selectedBoard, setSelectedBoard } = useBoard();

  const { data: boards, isLoading } = useGetBoards({
    onSuccess: (res) => {
      if (res.length === 0) return [];
      if (selectedBoard.id === '') {
        setSelectedBoard(() => {
          return res[0];
        });
      }
      return res;
    },
  });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!boards) {
    return null;
  }

  return (
    <div className="mt-12 grid grid-cols-[20em_auto]">
      <Sidebar boards={boards} />
      {boards.length === 0 ? (
        <div>No boards!</div>
      ) : (
        selectedBoard.id !== '' && <ListGrid board={selectedBoard} />
      )}
    </div>
  );
}

export default App;
