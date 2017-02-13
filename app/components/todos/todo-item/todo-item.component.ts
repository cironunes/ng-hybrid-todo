import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { TodosActions } from '../todos.actions';

import { Todo } from '../todos.model';

@Component({
  selector: 'h-todo-item',
  template: `
    <input
      type="checkbox"
      [(ngModel)]="todo.done"
      (change)="updateTodo(todo)"
    >
    <a
      [routerLink]="['/todo', todo.id]"
      (click)="selectItem(todo)"
    >{{ todo.description }}</a>
  `
})
export class TodoItemComponent implements OnInit {

  todo: Todo;
  @Input() item: Todo;
  @Output() update = new EventEmitter<any>();

  constructor(
    private todosActions: TodosActions
  ) {}

  ngOnInit() {
    this.todo = Object.assign({}, this.item);
  }

  updateTodo(todo) {
    this.update.emit({todo});
  }

  selectItem(todo) {
    this.todosActions.getTodo(todo);
  }

}
