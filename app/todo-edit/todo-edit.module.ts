import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';

import { TodoEditComponent } from './todo-edit.component';

@NgModule({
  imports: [
    ComponentsModule,
  ],
  declarations: [
    TodoEditComponent,
  ],
  exports: [
    TodoEditComponent,
  ]
})
export class TodoEditModule {

}