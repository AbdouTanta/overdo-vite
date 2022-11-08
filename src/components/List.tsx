import { IList } from "../types/IList";
import Task from "./Task";

const List = ({ list }: { list: IList }) => {
    return (
        <div className="shadow-sm flex flex-col gap-4 p-4 bg-white rounded-2xl w-72">
            <div className="font-semibold text-md">{list.name}</div>
            {list.tasks?.map((task: any, index) => (
                <Task key={task.id} task={task} index={index} />
            ))}
        </div>
    );
};

export default List;
