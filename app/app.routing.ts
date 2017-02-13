import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'todo/:id', component: TodoEditComponent }
    ])
  ]
})
export class AppRoutingModule {

}
  