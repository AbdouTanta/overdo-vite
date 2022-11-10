import clsx from "clsx";
import { useContext } from "react";
import BoardContext from "../contexts/BoardContext";
import { IBoard } from "../types/IBoard";

type SidebarProps = { boards: IBoard[]; activeBoardId: string };

const Sidebar = ({ boards, activeBoardId }: SidebarProps) => {
    const { selectedBoard, setSelectedBoard } = useContext(BoardContext);

    return (
        <div className="flex flex-col gap-12 px-20">
            {boards.map((board) => (
                <div
                    key={board.id}
                    // className={`cursor-pointer text-lg font-medium text-${board.color}-500 hover:text-${board.color}-700`}
                    className={clsx(
                        "cursor-pointer text-lg font-medium",
                        "text-" + board.color + "-500",
                        "hover:text-" + board.color + "-700"
                    )}
                    onClick={(e) => {
                        setSelectedBoard({ id: board.id, color: board.color });
                    }}
                >
                    {board.name}
                </div>
            ))}
            <div className="cursor-pointer text-lg font-medium text-slate-500 underline underline-offset-4 hover:text-slate-700">
                + New Board
            </div>
        </div>
    );
};

export default Sidebar;
