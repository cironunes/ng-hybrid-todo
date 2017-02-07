import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

import { TodosActions } from './todos.actions';

interface Todo {
  id?: number;
  description: string;
  done: boolean;
}

interface TodosFilter {
  done?: boolean;
}

interface AppState {
  todos: Todo[],
  todosFilter: TodosFilter,
  todo: Todo
}

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
export class TodosComponent implements OnInit {

  private subscription;
  public todosFilter$: Observable<TodosFilter>;
  public todoList$: Observable<Todo[]>;
  public filteredTodoList$: Observable<any>;

  public newTodoDescription: string;

  constructor(
    private store: Store<AppState>,
    private todosActions: TodosActions
  ) {
    this.todoList$ = this.store.select('todos');
    this.todosFilter$ = this.store.select('todosFilter');

    this.filteredTodoList$ = Observable.combineLatest(
      this.todoList$,
      this.todosFilter$,
      (todoList, todosFilter) => {
        return { todoList, todosFilter };
      }
    )
    .map(state => {
      if (typeof state.todosFilter.done !== 'boolean') return state.todoList;
      
      return state.todoList
        .filter(todo => todo.done === state.todosFilter.done);
    });
  }

  ngOnInit() {
    this.subscription = this.filteredTodoList$
      .subscribe(todos => this.todosActions.getTodos(todos));
      
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
