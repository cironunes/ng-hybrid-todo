import * as angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';

import { TodoComponent } from './todo.component';

export const todo = angular
  .module('h.todo', [])
  .directive(
    'hTodo',
    downgradeComponent({
      component: TodoComponent,
      inputs: ['todo']
    }) as angular.IDirectiveFactory
  )
  .name;