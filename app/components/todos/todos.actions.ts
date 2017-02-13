import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { Store, Action } from '@ngrx/store';

import {
  GET_TODOS,
  ADD_TODO,
  FILTER_TODOS,
  GET_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from './todos.state';

import { AppState } from '../../app.model';
import { Todo, TodosFilter } from './todos.model';

// ----------------------------------------
// convenience methods
// ----------------------------------------
let lastId = 1;

const _getNextId = () => {
  lastId += 1;
  return lastId;
}

const _extract = result => result.data;



@Injectable()
export class TodosActions {

  constructor(
    private store: Store<AppState>,
    private http: Http
  ) {}

    getTodos(todos: Todo[]) {
      return this.store.dispatch({ type: GET_TODOS, payload: todos });
    }

    addTodo(todo: Todo) {
      todo.id = _getNextId();
      return this.store.dispatch({ type: ADD_TODO, payload: todo });
    }

    filterTodos(filter: TodosFilter) {
      return this.store.dispatch({ type: FILTER_TODOS, payload: filter });
    }

    getTodo(todo: Todo) {
      return this.store.dispatch({ type: GET_TODO, payload: todo });
    }

    deleteTodo(todo: Todo) {
      return this.store.dispatch({ type: DELETE_TODO, payload: todo });
    }

    updateTodo(todo: Todo) {
      return this.store.dispatch({ type: UPDATE_TODO, payload: todo });
    }

}
