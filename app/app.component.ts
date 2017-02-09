import { Component, OnInit } from '@angular/core';

import { TodosActions } from './components/todos/todos.actions';

@Component({
  selector: 'h-app',
  template: `
    <h1>What to do?</h1>
    <div ui-view></div>
  `,
})
export class AppComponent implements OnInit {
  
  constructor(
    private todosActions: TodosActions
  ) {}

  ngOnInit() {
    this.todosActions.getTodos([]);
  }

}
