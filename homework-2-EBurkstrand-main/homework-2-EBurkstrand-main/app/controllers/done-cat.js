import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DoneCatController extends Controller {
  @service auth;
  @service router;
  @service todoEdit;

  @tracked todos;
  @tracked cat;
  @tracked todoText;

  async loadTodos() {
    this.todos = await this.todoEdit.getTodoByCat(this.cat, true);
  }

  @action
  async toggleDone(todo) {
    await this.todoEdit.editTodo(todo.id, { done: false });
    this.loadTodos();
  }

  @action
  toTodos() {
    this.router.transitionTo('/todos/' + this.cat);
  }
}
