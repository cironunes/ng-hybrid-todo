import * as angular from 'angular';

import { todoEditComponent } from './todo-edit.component';

export const todoEdit = angular
  .module('h.todoEdit', [])
  .component('hTodoEdit', todoEditComponent)
  .name;