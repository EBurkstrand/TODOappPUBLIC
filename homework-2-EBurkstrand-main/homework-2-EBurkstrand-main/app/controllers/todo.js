import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import TodoEditService from '../services/todo-edit';
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';

export default class TodoController extends Controller {
  @service auth;
  @service router;
  @service todoEdit;

  @tracked todoText;
  @tracked cats;
  @tracked cat;

  @action
  async toggleDone(event) {
    // this.todo.done = !(this.todo.done);
    await this.todoEdit.editTodo(this.todo.id, { done: event.target.checked });
    this.todo.done = !this.todo.done;
    console.log(this.todo.done);
  }

  @action
  async updateTodoText(event) {
    this.todo.todo = event.target.value;
    console.log(this.todo.todo);
  }

  @action
  async saveTodoUpdate() {
    await this.todoEdit.editTodo(this.todo.id, { todo: this.todo.todo });
    console.log('tempppp');
  }

  @action
  toTodos() {
    this.router.transitionTo('todos');
  }
}
