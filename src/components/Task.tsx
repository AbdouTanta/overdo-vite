import { useContext } from "react";
import clsx from "clsx";
import BoardContext from "../contexts/BoardContext";
import { ITask } from "../types/ITask";

const Task = ({ task }: { task: ITask; index: number }) => {
    const { selectedBoard } = useContext(BoardContext);

    return (
        <div
            className={clsx(
                "cursor-pointer rounded-xl  p-4 font-normal text-black shadow-sm transition hover:shadow-lg",
                "bg-" + selectedBoard.color + "-200",
                "hover:bg-" + selectedBoard.color + "-300"
            )}
        >
            {task.name}
        </div>
    );
};

export default Task;
