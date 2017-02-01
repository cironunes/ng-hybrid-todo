import * as angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';

import { HomeComponent } from './home.component';

export const home = angular.module('h.home', [])
  .directive(
    'hHome',
    downgradeComponent({
      component: HomeComponent
    }) as angular.IDirectiveFactory
  )
  .name;