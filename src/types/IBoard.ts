import { IList } from "./IList";

export interface IBoard {
    id: string;
    name: string;
    color: string;
    lists: IList[];
}
