import * as angular from 'angular';

import { todoComponent } from './todo.component';

export const todo = angular
  .module('h.todo', [])
  .component('hTodo', todoComponent)
  .name;