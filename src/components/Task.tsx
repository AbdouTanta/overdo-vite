import { ITask } from "../types/ITask";

const Task = ({ task }: { task: ITask; index: number }) => {
    return (
        <div className="p-4 font-normal text-black bg-green-200 shadow-sm rounded-xl">
            {task.name}
        </div>
    );
};

export default Task;
