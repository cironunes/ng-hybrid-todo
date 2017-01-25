import * as angular from 'angular';

import { homeComponent } from './home.component';

export const home = angular.module('h.home', [])
  .component('hHome', homeComponent)
  .name;