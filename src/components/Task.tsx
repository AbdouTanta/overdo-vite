import { ITask } from "../types/ITask";

const Task = ({ task }: { task: ITask; index: number }) => {
    return (
        <div className="cursor-pointer rounded-xl bg-green-200 p-4 font-normal text-black shadow-sm transition hover:bg-green-300">
            {task.name}
        </div>
    );
};

export default Task;
