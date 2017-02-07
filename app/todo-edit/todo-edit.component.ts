import { Component, Inject } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'h-todo-edit',
  template: `<h-todo [todo]="todo"></h-todo>`
})
export class TodoEditComponent {

  todo;

  constructor(
    @Inject('$stateParams') private $stateParams,
    private store: Store<any>
  ) {
    this.store.subscribe(state => {
      this.todo = state.todos.find(item => item.id == this.$stateParams.id);
    });
  }

}
