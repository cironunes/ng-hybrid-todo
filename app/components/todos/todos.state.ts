import { Store, Action } from '@ngrx/store';

export const GET_TODOS = 'GET_TODOS';
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const FILTER_TODOS = 'FILTER_TODOS';
export const GET_TODO = 'GET_TODO';


export const todos = (state = [], { type, payload }: Action) => {
  switch(type) {
    case GET_TODOS_SUCCESS:
    case GET_TODOS:
      return payload || state;
    case ADD_TODO:
      return [payload, ...state];
    case DELETE_TODO:
      return state.filter(todo => todo.id !== payload.id);
    case UPDATE_TODO:
      return state.map(todo => todo.id === payload.id ? payload : todo);
    default:
      return state;
  }
};

export const todosFilter = (state = [], { type, payload }: Action) => {
  switch(type) {
    case FILTER_TODOS:
      let filter = typeof payload === 'boolean' ? { done: payload } : {};
      return (<any>Object).assign({}, filter);
    default:
      return state;
  }
};

export const todo = (state = {}, { type, payload }: Action) => {
  switch(type) {
    case GET_TODO:
      return payload || { description: '', done: false };
    default:
      return state;
  }
};
