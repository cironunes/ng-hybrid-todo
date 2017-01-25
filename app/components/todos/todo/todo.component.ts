import * as angular from 'angular';

class TodoComponent  {

  todo: any;
  todos;
  private unsubscribe: Function;
  private getTodos: Function;
  private getTodo: Function;
  private deleteTodo: Function;
  private updateTodo: Function;

  static $inject = [
    '$ngRedux',
    '$state',
    '$stateParams',
    'TodosActions'
  ];

  constructor(
    private $ngRedux,
    private $state,
    private $stateParams,
    private TodosActions
  ) {
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

  $onInit() {
    const todo = this.todos.find(item => item.id == this.$stateParams.id);
    this.getTodo(todo);
  }

  $onDestroy() {
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

export const todoComponent = {
  controller: TodoComponent,
  template: `
    <input type="text" ng-model="$ctrl.todo.description">
    <button ng-click="$ctrl.onDeleteTodo($ctrl.todo)">delete</button>
    <button ng-click="$ctrl.onUpdateTodo($ctrl.todo)">update</button>
  `
};