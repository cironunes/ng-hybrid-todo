import * as angular from 'angular';

import { todoItemComponent } from './todo-item.component';

export const todoItem = angular
  .module('h.todoItem', [])
  .component('hTodoItem', todoItemComponent)
  .name;