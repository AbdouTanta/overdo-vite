import { IBoard } from "../types/IBoard";
import { IList } from "../types/IList";
import List from "./List";

const ListGrid = ({ board }: { board: IBoard }) => {
    return (
        <div className="flex items-start gap-8">
            {board?.lists.map((list: IList) => (
                <List key={list.id} list={list} />
            ))}
        </div>
    );
};

export default ListGrid;
