import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UpgradeModule } from '@angular/upgrade/static';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomeComponent } from './home/home.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

import { TodosComponent } from './components/todos/todos.component';
import { TodoItemComponent } from './components/todos/todo-item/todo-item.component';
import { TodoComponent } from './components/todos/todo/todo.component';

import {
  todos,
  todo,
  todosFilter,
} from './components/todos/todos.state';

import { TodosActions } from './components/todos/todos.actions';
import { TodosEffects } from './components/todos/todos.effects';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({
      todos,
      todo,
      todosFilter
    }),
    EffectsModule.run(TodosEffects)
  ],
  declarations: [
    TodoItemComponent,
    TodoComponent,
    TodosComponent,
    HomeComponent,
    TodoEditComponent
  ],
  entryComponents: [
    TodoItemComponent,
    TodoComponent,
    HomeComponent,
    TodoEditComponent
  ],
  providers: [
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
    TodosActions
 ],
})
export class AppModule {
  ngDoBootstrap() {}
}
