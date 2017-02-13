import {
  Component,
  Inject
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

import { TodosActions } from './todos.actions';

import { Todo, TodosFilter } from './todos.model';
import { AppState } from '../../app.model';

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
        <button (click)="filter(true)">completed</button>
      </li>
      <li>
        <button (click)="filter(false)">unfinished</button>
      </li>
      <li>
        <button (click)="filter(null)">all</button>
      </li>
    </ul>

    <ul>
      <li
        *ngFor="let todoItem of filteredTodoList$ | async"
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
export class TodosComponent {

  private subscription;
  public todosFilter$: Observable<TodosFilter>;
  public todoList$: Observable<Todo[]>;
  public filteredTodoList$: Observable<Todo[]>;

  public newTodoDescription: string;

  constructor(
    private store: Store<AppState>,
    private todosActions: TodosActions
  ) {
    this.todoList$ = this.store.select('todos');
    this.todosFilter$ = this.store.select('todosFilter');

    this.filteredTodoList$ = Observable
      .combineLatest(this.todoList$, this.todosFilter$)
      .map(this.filterTodoList);
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

  private filterTodoList([ todoList, todosFilter ]) {
    if (typeof todosFilter.done !== 'boolean') return todoList;
    
    return todoList
      .filter(todo => todo.done === todosFilter.done);
  }

}
