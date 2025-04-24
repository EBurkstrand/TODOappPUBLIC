import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DoneController extends Controller {
  @service auth;
  @service router;
  @service todoEdit;

  @tracked todoItems = [];

  constructor() {
    super(...arguments);
    this.loadTodos();
  }

  async loadTodos() {
    this.todoItems = await this.todoEdit.getItems(true);
  }

  @action
  async toggleDone(todo) {
    console.log('----------');
    await this.todoEdit.editTodo(todo.id, { done: false });
    this.loadTodos();
  }

  @action
  toTodos() {
    this.router.transitionTo('todos');
  }
}
