import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosModule } from './todos/todos.module';

@NgModule({
  imports: [
    TodosModule,
  ],
  exports: [
    TodosModule,
  ]
})
export class ComponentsModule {

}