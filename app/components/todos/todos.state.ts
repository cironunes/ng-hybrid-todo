import { Injectable, Inject } from '@angular/core';

interface IAction {
  type: string;
  payload?: any;
}

let lastId = 1;

const _getNextId = () => {
  lastId += 1;
  return lastId;
}

const _extract = result => result.data;


export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const FILTER_TODOS = 'FILTER_TODOS';
export const GET_TODO = 'GET_TODO';


export const TodosActions: any = ($q, $http) => {
  const getTodos = () => {
    return (dispatch, getState) => {
      const { todos } = getState();

      if (todos.length) {
        return $q.when(todos);
      } else {
        return $http.get('data/todos.json')
          .then(_extract)
          .then(data => dispatch({ type: GET_TODOS, payload: data }));
      }
    };
  };

  const addTodo = todo => {
    todo.id = _getNextId();
    return { type: ADD_TODO, payload: todo };
  };

  const filterTodos = filter => {
    return { type: FILTER_TODOS, payload: filter };
  };

  const getTodo = todo => {
    return { type: GET_TODO, payload: todo };
  };

  const deleteTodo = todo => {
    return { type: DELETE_TODO, payload: todo };
  };

  const updateTodo = todo => {
    return { type: UPDATE_TODO, payload: todo };
  }

  return {
    getTodos,
    addTodo,
    filterTodos,
    getTodo,
    deleteTodo,
    updateTodo
  };
};
TodosActions.$inject = ['$q', '$http'];


@Injectable()
export class TodosActions2 {

  constructor(
    @Inject('$q') private $q,
    @Inject('$http') private $http,
  ) {}

    getTodos() {
      return (dispatch, getState) => {
        const { todos } = getState();

        if (todos.length) {
          return this.$q.when(todos);
        } else {
          return this.$http.get('data/todos.json')
            .then(_extract)
            .then(data => dispatch({ type: GET_TODOS, payload: data }));
        }
      };
    }

    addTodo(todo) {
      todo.id = _getNextId();
      return { type: ADD_TODO, payload: todo };
    }

    filterTodos(filter) {
      return { type: FILTER_TODOS, payload: filter };
    }

    getTodo(todo) {
      return { type: GET_TODO, payload: todo };
    }

    deleteTodo(todo) {
      return { type: DELETE_TODO, payload: todo };
    }

    updateTodo(todo) {
      return { type: UPDATE_TODO, payload: todo };
    }

}


export const todos = (state = [], { type, payload }: IAction) => {
  switch(type) {
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

export const todosFilter = (state = [], { type, payload }: IAction) => {
  switch(type) {
    case FILTER_TODOS:
      let filter = typeof payload === 'boolean' ? { done: payload } : {};
      return (<any>Object).assign({}, filter);
    default:
      return state;
  }
};

export const todo = (state = {}, { type, payload }:IAction) => {
  switch(type) {
    case GET_TODO:
      return payload || { description: '', done: false };
    default:
      return state;
  }
};
