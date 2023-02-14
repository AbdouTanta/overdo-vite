import { IList } from './IList';

export type IBoard = {
  id: string;
  name: string;
  color: string;
  lexorank?: string;
  lists?: IList[];
};

export type CreateBoardDTO = Omit<IBoard, 'id' | 'lists'>;

export type EditBoardDTO = Partial<IBoard>;
