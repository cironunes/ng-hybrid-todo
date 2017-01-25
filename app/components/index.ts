import * as angular from 'angular';

import { todos } from './todos';

export const components = angular
  .module('h.components', [
    todos
  ])
  .name;