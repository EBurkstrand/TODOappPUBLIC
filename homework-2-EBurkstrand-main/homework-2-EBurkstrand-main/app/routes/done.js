import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { getDoc, orderBy } from 'firebase/firestore';
import { tracked } from '@glimmer/tracking';
import TodoEditService from '../services/todo-edit';
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { action } from '@ember/object';

export default class DoneRoute extends Route {
  @service auth;
  @service todoEdit;
  @service router;

  async beforeModel() {
    await this.auth.requireLogin();
    // console.log(this.auth.uid);
  }

  // async model() {
  //   await this.getItems();

  //   return this.todoItems;
  // }
}
