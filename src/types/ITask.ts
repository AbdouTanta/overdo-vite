export type ITask = {
  id: string;
  name: string;
};

export type CreateTaskDTO = Omit<ITask, 'id'>;

export type EditTaskDTO = Partial<CreateTaskDTO>;
