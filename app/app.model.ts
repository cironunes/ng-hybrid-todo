import { Todo, TodosFilter } from './components/todos/todos.model';

export interface AppState {
  todos: Todo[],
  todosFilter: TodosFilter,
  todo: Todo
}