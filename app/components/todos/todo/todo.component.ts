import {
  Component,
  Input,
  Inject
} from '@angular/core';

import { Location } from '@angular/common';

import { TodosActions } from '../todos.actions';

import { Todo } from '../todos.model';

@Component({
  selector: 'h-todo',
  template: `
    <input type="text" [(ngModel)]="todoCopy.description">
    <button (click)="onDeleteTodo(todoCopy)">delete</button>
    <button (click)="onUpdateTodo(todoCopy)">update</button>
  `
})
export class TodoComponent {

  @Input() todo: Todo;
  todoCopy: Todo;
  
  constructor(
    private location: Location,
    private todosActions: TodosActions
  ) {}

  ngOnInit() {
    this.todoCopy = Object.assign({}, this.todo);
  }

  onDeleteTodo(todo) {
    this.todosActions.deleteTodo(todo);
    this.location.back();
  }

  onUpdateTodo(todo) {
    this.todosActions.updateTodo(todo);
    this.location.back();
  }

}
