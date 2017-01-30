import * as angular from 'angular';
import {
  Component,
  Inject,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'h-todo',
  template: `
    <input type="text" [(ngModel)]="todo.description">
    <button (click)="onDeleteTodo(todo)">delete</button>
    <button (click)="onUpdateTodo(todo)">update</button>
  `
})
export class TodoComponent implements OnInit, OnDestroy {

  todos;

  getTodos;
  getTodo;
  deleteTodo;
  updateTodo;
  unsubscribe;

  constructor(
    @Inject('$ngRedux') private $ngRedux,
    @Inject('$state') private $state,
    @Inject('$stateParams') private $stateParams,
    @Inject('TodosActions') private TodosActions
  ) {
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.TodosActions = TodosActions;

    this.unsubscribe = this.$ngRedux.connect(
      this.mapStateToThis, this.TodosActions
    )(this);

    this.getTodos();
  }

  mapStateToThis(state) {
    return {
      todos: state.todos,
      todo: angular.copy(state.todo)
    }
  }

  ngOnInit() {
    const todo = this.todos.find(item => item.id == this.$stateParams.id);
    this.getTodo(todo);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  onDeleteTodo(todo) {
    this.deleteTodo(todo)
    this.$state.go('home');
  }

  onUpdateTodo(todo) {
    this.updateTodo(todo)
    this.$state.go('home');
  }

}

