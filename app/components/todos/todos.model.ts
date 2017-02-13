export interface Todo {
  id?: number;
  description: string;
  done: boolean;
}

export interface TodosFilter {
  done?: boolean;
}