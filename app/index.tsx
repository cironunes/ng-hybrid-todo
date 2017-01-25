import * as angular from 'angular';
import 'angular-ui-router';
import ngRedux from 'ng-redux';

import { components } from './components';
import { home } from './home';
import { todoEdit } from './todo-edit';

import { appComponent } from './app.component';

import { combineReducers } from 'redux';
import { default as thunk } from 'redux-thunk';

import { todos, todo, todosFilter } from './components/todos/todos.state';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createDevTools } from 'redux-devtools';
import { default as LogMonitor } from 'redux-devtools-log-monitor';
import { default as DockMonitor } from 'redux-devtools-dock-monitor';


const rootReducer = combineReducers({
  todos,
  todo,
  todosFilter
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               defaultIsVisible={true}>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

export const appConfig: any = (
  $ngReduxProvider,
  $stateProvider,
  $urlRouterProvider,
  $locationProvider
) => {
  $ngReduxProvider.createStoreWith(rootReducer, [thunk], [DevTools.instrument()]);

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
  '$ngReduxProvider',
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];

const appRun: any = ($ngRedux, $rootScope) => {
  const componentDidUpdate = DockMonitor.prototype.componentDidUpdate;
  DockMonitor.prototype.componentDidUpdate = function() {
    $rootScope.$evalAsync();
    if (componentDidUpdate) {
      return componentDidUpdate.apply(this, arguments);
    }
  };

  ReactDOM.render(
    <DevTools store={$ngRedux}/>,
    document.getElementById('devTools')
  );
};
appRun.$inject = ['$ngRedux', '$rootScope'];


angular.module('h', [
    'ui.router',
    ngRedux,
    components,
    home,
    todoEdit
  ])
  .config(appConfig)
  .run(appRun)
  .component('hApp', appComponent);

angular.bootstrap(document.body, ['h'], { strictDi: true });
