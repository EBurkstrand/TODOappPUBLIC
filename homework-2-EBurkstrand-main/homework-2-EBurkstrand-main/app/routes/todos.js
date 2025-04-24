import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { getDoc, orderBy } from 'firebase/firestore';
import { tracked } from '@glimmer/tracking';
import TodoEditService from '../services/todo-edit';
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { action } from '@ember/object';

export default class TodosRoute extends Route {
  @service auth;
  @service todoEdit;
  @service router;

  // @tracked todoItems = [];

  // @action
  // async getItems() {
  //   const ref = query(
  //     this.todoEdit.todoRef,
  //     where('user', '==', this.auth.user.uid),
  //     where('done', '==', false),
  //     orderBy('created'),
  //   );
  //   const querySnapshot = await getDocs(ref);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, ' => ', doc.data());
  //     const dat = doc.data();
  //     dat['id'] = doc.id;
  //     this.todoItems.push(dat);
  //   });
  // }

  async beforeModel() {
    await this.auth.requireLogin();
    // console.log(this.auth.uid);
  }

  // async model() {
  //   // this.todoItems = [];
  //   // await this.getItems();

  //   return this.todoItems;
  // }
}
