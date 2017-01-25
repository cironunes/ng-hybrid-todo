import * as angular from 'angular';

import { todo } from './todo';
import { todoItem } from './todo-item';

import { todosComponent } from './todos.component';
import { TodosActions } from './todos.state';

export const todos = angular
  .module('h.components.todos', [
    todo,
    todoItem
  ])
  .component('hTodos', todosComponent)
  .factory('TodosActions', TodosActions)
  .name;
