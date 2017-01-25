import * as angular from 'angular';

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'h-todo-item',
  template: `
    <input
      type="checkbox"
      [(ngModel)]="todo.done"
      (change)="updateTodo(todo)"
    >
    <a [attr.href]="'/todo/' + todo.id">{{ todo.description }}</a>
  `
})
export class TodoItemComponent implements OnInit {

  todo;
  @Input() item: any;
  @Output() update = new EventEmitter<any>();

  ngOnInit() {
    this.todo = angular.copy(this.item);
  }

  updateTodo(todo) {
    this.update.emit({todo});
  }

}
