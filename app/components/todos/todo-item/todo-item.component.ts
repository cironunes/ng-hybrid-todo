import * as angular from 'angular';

class TodoItem {

  public todo;
  public onUpdate: Function;
  private item;

  $onInit() {
    this.todo = angular.copy(this.item);
  }

  updateTodo(item) {
    const todo = {
      id: item.id,
      description: item.description,
      done: item.done
    };

    this.onUpdate({ $event: { todo } });
  }

}

export const todoItemComponent = {
  bindings: {
    item: '<',
    onUpdate: '&'
  },
  controller: TodoItem,
  template: `
    <input
      type="checkbox"
      ng-model="$ctrl.todo.done"
      ng-change="$ctrl.updateTodo($ctrl.todo)"
    >
    <a ui-sref="todo({ id: $ctrl.todo.id })">{{ $ctrl.todo.description }}</a>
  `
};