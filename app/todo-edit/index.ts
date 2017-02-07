import * as angular from 'angular';

import { downgradeComponent } from '@angular/upgrade/static';

import { TodoEditComponent } from './todo-edit.component';

export const todoEdit = angular
  .module('h.todoEdit', [])
  .directive(
    'hTodoEdit',
    downgradeComponent({
      component: TodoEditComponent
    }) as angular.IDirectiveFactory
  )
  .name;