import { Component, Inject } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'h-todo-edit',
  template: `<h-todo [todo]="todo"></h-todo>`
})
export class TodoEditComponent {

  todo;

  constructor(
    private store: Store<any>
  ) {
    this.store
      .subscribe(state => this.todo = state.todo);
  }

}
