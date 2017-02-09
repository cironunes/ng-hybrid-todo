// AngularJS
import * as angular from 'angular';
import 'angular-ui-router';

import { components } from './components';
import { home } from './home';
import { todoEdit } from './todo-edit';

// Angular
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppModule } from './app.module';


export const appConfig: any = (
  $stateProvider,
  $urlRouterProvider,
  $locationProvider
) => {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: '/',
    component: 'hHome'
  });
  $stateProvider.state('todo', {
    url: '/todo/:id',
    component: 'hTodoEdit'
  });
};
appConfig.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];

angular.module('h', [
    'ui.router',
    components,
    home,
    todoEdit
  ])
  .config(appConfig);


platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['h'], {strictDi: true});
});
