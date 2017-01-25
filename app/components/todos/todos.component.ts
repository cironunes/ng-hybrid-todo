import { todos, todosFilter } from './todos.state';

class TodosComponent {

  public todoList: any[];
  public newTodoDescription: string;
  public todoFilter: any;

  private unsubscribe: Function;
  private getTodos;
  private addTodo;
  private filterTodos;
  private updateTodo: Function;

  static $inject = ['$ngRedux', 'TodosActions'];

  constructor(
    private $ngRedux,
    private TodosActions
  ) { }

  $onInit() {
    this.unsubscribe = this.$ngRedux.connect(
      this.mapStateToThis, this.TodosActions
    )(this);

    this.getTodos();
  }

  $onDestroy() {
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
  }

  onUpdateTodo($event) {
    this.updateTodo($event.todo);
  }

}

export const todosComponent = {
  controller: TodosComponent,
  template: `
    <form ng-submit="$ctrl.onAddTodo()">
      <input
        type="text"
        placeholder="ex.: Conquer the world"
        ng-model="$ctrl.newTodoDescription"
      >
      <button>Add</button>
    </form>

    <ul>
      <li>
        <a href="#" ng-click="$ctrl.filter(true)">completed</a>
      </li>
      <li>
        <a href="#" ng-click="$ctrl.filter(false)">unfinished</a>
      </li>
      <li>
        <a href="#" ng-click="$ctrl.filter(null)">all</a>
      </li>
    </ul>

    <ul>
      <li
        ng-repeat="todoItem in $ctrl.todoList | filter:$ctrl.todoFilter track by todoItem.id"
        ng-class="{ done: todoItem.done }"
      >
        <h-todo-item
          [item]="todoItem"
          (update)="$ctrl.onUpdateTodo($event)"
        ></h-todo-item>
      </li>
    </ul>
  `
};
