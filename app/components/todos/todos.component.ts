import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TodosActions } from './todos.actions';


@Component({
  selector: 'h-todos',
  template: `
    <form (submit)="onAddTodo()">
      <input
        type="text"
        name="newTodoDescription"
        placeholder="ex.: Conquer the world"
        [(ngModel)]="newTodoDescription"
      >
      <button>Add</button>
    </form>

    <ul>
      <li>
        <a href="#" (click)="filter(true)">completed</a>
      </li>
      <li>
        <a href="#" (click)="filter(false)">unfinished</a>
      </li>
      <li>
        <a href="#" (click)="filter(null)">all</a>
      </li>
    </ul>

    <ul>
      <li
        *ngFor="let todoItem of todoList | async"
        [ngClass]="{ done: todoItem.done }"
      >
        <h-todo-item
          [item]="todoItem"
          (update)="onUpdateTodo($event)"
        ></h-todo-item>
      </li>
    </ul>
  `
})
export class TodosComponent implements OnInit {

  public todoList: Observable<any>;
  public newTodoDescription: string;

  constructor(
    private store: Store<any>,
    private todosActions: TodosActions
  ) {
    this.todoList = this.store.select('todos');
  }

  ngOnInit() {
    this.todoList.subscribe(state => {
      this.todosActions.getTodos(state);
    });
  }

  onAddTodo() {
    const payload = {
      description: this.newTodoDescription,
      done: false
    };

    this.todosActions.addTodo(payload);
    this.newTodoDescription = '';
  }

  filter(filter: boolean): void {
    this.todosActions.filterTodos(filter);
  }

  onUpdateTodo($event) {
    this.todosActions.updateTodo($event.todo);
  }

}
