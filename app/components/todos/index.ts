import * as angular from 'angular';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';

import { todo } from './todo';
import { todoItem } from './todo-item';

import { TodosComponent } from './todos.component';
import { TodosActions } from './todos.actions';

export const todos = angular
  .module('h.components.todos', [
    todo,
    todoItem
  ])
  .directive(
    'hTodos',
    downgradeComponent({
      component: TodosComponent
    }) as angular.IDirectiveFactory
  )
  .factory('TodosActions', downgradeInjectable(TodosActions))
  .name;
