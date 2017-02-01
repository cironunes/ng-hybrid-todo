import {
  Component,
  Inject,
  OnInit,
  OnDestroy
} from '@angular/core';

import { todos, todosFilter } from './todos.state';

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
        *ngFor="let todoItem of todoList"
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
export class TodosComponent implements OnInit, OnDestroy {

  public todoList: any[];
  public newTodoDescription: string;
  public todoFilter: any;

  private unsubscribe: Function;
  private getTodos: Function;
  private addTodo: Function;
  private filterTodos: Function;
  private updateTodo: Function;

  constructor(
    @Inject('$ngRedux') private $ngRedux,
    @Inject('TodosActions') private TodosActions
  ) { }

  ngOnInit() {
    this.unsubscribe = this.$ngRedux.connect(
      this.mapStateToThis, this.TodosActions
    )(this);

    this.getTodos();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      todoList: state.todos,
      todoFilter: state.todosFilter
    };
  }

  onAddTodo() {
    const payload = {
      description: this.newTodoDescription,
      done: false
    };

    this.addTodo(payload)
    this.newTodoDescription = '';
  }

  filter(filter: boolean): void {
    this.filterTodos(filter);

    if (typeof this.todoFilter.done != 'boolean') return;

    this.todoList = this.todoList
      .filter(item => item.done === this.todoFilter.done);
  }

  onUpdateTodo($event) {
    this.updateTodo($event.todo);
  }

}
