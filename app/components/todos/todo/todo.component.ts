import {
  Component,
  Input,
  Inject
} from '@angular/core';

import { TodosActions } from '../todos.actions';


@Component({
  selector: 'h-todo',
  template: `
    <input type="text" [(ngModel)]="todo.description">
    <button (click)="onDeleteTodo(todo)">delete</button>
    <button (click)="onUpdateTodo(todo)">update</button>
  `
})
export class TodoComponent {

  @Input() todo;
  
  constructor(
    @Inject('$state') private $state,
    private todosActions: TodosActions
  ) {
  }

  onDeleteTodo(todo) {
    this.todosActions.deleteTodo(todo);
    this.$state.go('home');
  }

  onUpdateTodo(todo) {
    this.todosActions.updateTodo(todo);
    this.$state.go('home');
  }

}
