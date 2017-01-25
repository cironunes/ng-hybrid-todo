import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';
import { UIRouterModule } from 'ui-router-ng2';

import { TodoItemComponent } from './components/todos/todo-item/todo-item.component';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    FormsModule
  ],
  declarations: [
    TodoItemComponent
  ],
  entryComponents: [
    TodoItemComponent
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}
