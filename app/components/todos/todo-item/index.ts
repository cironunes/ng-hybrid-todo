import * as angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';

import { TodoItemComponent } from './todo-item.component';

export const todoItem = angular
  .module('h.todoItem', [])
  .directive(
    'hTodoItem',
    downgradeComponent({
      component: TodoItemComponent,
      inputs: ['item'],
      outputs: ['update']
    }) as angular.IDirectiveFactory
  )
  .name;