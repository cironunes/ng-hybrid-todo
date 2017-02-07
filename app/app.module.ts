import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';
import { UIRouterModule } from 'ui-router-ng2';

import { HomeComponent } from './home/home.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoComponent } from './components/todos/todo/todo.component';
import { TodoItemComponent } from './components/todos/todo-item/todo-item.component';

import { TodosActions2 } from './components/todos/todos.state';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    FormsModule
  ],
  declarations: [
    TodoItemComponent,
    TodoComponent,
    TodosComponent,
    HomeComponent
  ],
  entryComponents: [
    TodoItemComponent,
    TodoComponent,
    HomeComponent
  ],
  providers: [
    {
      provide: '$ngRedux',
      useFactory: ($injector: any) => $injector.get('$ngRedux'),
      deps: ['$injector']
    },
    {
      provide: '$state',
      useFactory: ($injector: any) => $injector.get('$state'),
      deps: ['$injector']
    },
    {
      provide: '$stateParams',
      useFactory: ($injector: any) => $injector.get('$stateParams'),
      deps: ['$injector']
    },
    {
      provide: 'TodosActions',
      useFactory: ($injector: any) => $injector.get('TodosActions'),
      deps: ['$injector']
    },
    {
      provide: '$q',
      useFactory: ($injector: any) => $injector.get('$q'),
      deps: ['$injector']
    },
    {
      provide: '$http',
      useFactory: ($injector: any) => $injector.get('$http'),
      deps: ['$injector']
    },
    TodosActions2
  ],
})
export class AppModule {
  ngDoBootstrap() {}
}
