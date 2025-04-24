import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import TodoEditService from '../services/todo-edit';
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';

export default class TodosController extends Controller {
  @service auth;
  @service router;
  @service todoEdit;

  @tracked todoText;
  @tracked newCat;

  @tracked todoItems = [];
  @tracked categories = [];

  constructor() {
    super(...arguments);
    this.loadTodos();
    this.loadCats();
  }

  async loadTodos() {
    this.todoItems = await this.todoEdit.getItems(false);
  }

  async loadCats() {
    this.categories = await this.todoEdit.getCats(false);
  }

  @action
  async toggleDone(todo) {
    await this.todoEdit.editTodo(todo.id, { done: true });
    this.loadTodos();
  }

  @action
  toDone() {
    this.router.transitionTo('done');
  }

  @action
  async createTodo() {
    await this.todoEdit.createTodo(this.todoText);
    this.todoText = '';
    this.loadTodos();
  }

  @action
  async createCat() {
    await this.todoEdit.createCat(this.newCat);
    this.newCat = '';
    this.loadCats();
  }
}
