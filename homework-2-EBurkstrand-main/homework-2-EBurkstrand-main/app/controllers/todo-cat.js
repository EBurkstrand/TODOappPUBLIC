import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TodoCatController extends Controller {
  @service auth;
  @service router;
  @service todoEdit;

  @tracked todos;
  @tracked cat;
  @tracked todoText;

  async loadTodos() {
    this.todos = await this.todoEdit.getTodoByCat(this.cat, false);
  }

  @action
  async createTodo() {
    await this.todoEdit.createTodoWithCat(this.todoText, this.cat);
    this.todoText = '';
    this.loadTodos();
  }

  @action
  async toggleDone(todo) {
    await this.todoEdit.editTodo(todo.id, { done: true });
    this.loadTodos();
  }

  @action
  toDone() {
    this.router.transitionTo('/done/' + this.cat);
  }
}
