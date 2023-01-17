import { ITask } from './ITask';

export interface IList {
  id: string;
  name: string;
  tasks: ITask[];
}
