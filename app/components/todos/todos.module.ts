import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TodoModule } from './todo/todo.module';
import { TodoItemModule } from './todo-item/todo-item.module';

import { TodosComponent } from './todos.component';
import { TodosActions } from './todos.actions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    TodoItemModule,
    TodoModule,
  ],
  declarations: [
    TodosComponent,
  ],
  providers: [
    TodosActions,
  ],
  exports: [
    TodosComponent,
    TodoItemModule,
    TodoModule,
  ]
})
export class TodosModule {

}
