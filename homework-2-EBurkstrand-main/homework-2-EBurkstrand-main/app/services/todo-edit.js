import Service from '@ember/service';
import { service } from '@ember/service';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  Timestamp,
  orderBy,
} from 'firebase/firestore';
import { action } from '@ember/object';
import { getFirestore } from 'firebase/firestore';
import { tracked } from '@glimmer/tracking';
import {
  getDocs,
  onSnapshot,
  query,
  where,
  updateDoc,
  ref,
  setDoc,
} from 'firebase/firestore';
import { none } from '@ember/object/computed';

export default class TodoEditService extends Service {
  @service firebase;
  @service router;
  @service auth;

  db = getFirestore(this.firebase.app);
  todoRef = collection(this.db, 'TODO LISTS');
  catRef = collection(this.db, 'categories');

  @tracked todoItems = [];
  @tracked categories = [];

  @action
  async createTodo(text) {
    addDoc(this.todoRef, {
      user: this.auth.user.uid,
      created: Timestamp.now(),
      todo: text,
      done: false,
      cat: null,
    });
  }

  @action
  async createTodoWithCat(text, cat) {
    addDoc(this.todoRef, {
      user: this.auth.user.uid,
      created: Timestamp.now(),
      todo: text,
      done: false,
      cat: cat,
    });
  }

  @action
  async createCat(cat) {
    await setDoc(doc(this.db, 'categories', cat), { user: this.auth.user.uid });
  }

  @action
  async getItems(done) {
    await this.auth.ensureInitialized();
    console.log(this.auth.returnUID());
    this.todoItems = [];
    const ref = query(
      this.todoRef,
      where('user', '==', this.auth.user.uid),
      where('done', '==', done),
      orderBy('created', 'desc'),
    );
    const querySnapshot = await getDocs(ref);
    // console.log("........");
    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      const dat = doc.data();
      dat['id'] = doc.id;
      this.todoItems.push(dat);
    });
    return this.todoItems;
  }

  @action
  async editTodo(id, data) {
    // console.log(data);
    const someRef = doc(this.db, 'TODO LISTS', id);
    await updateDoc(someRef, data);
  }

  @action
  async getTodoByID(id) {
    await this.auth.ensureInitialized();
    const docMaybe = await getDoc(doc(this.db, 'TODO LISTS', id));
    if (docMaybe.exists()) {
      const todo = docMaybe.data();
      todo['id'] = id;
      return todo;
    } else {
      return null;
    }
  }

  @action
  async getTodoByCat(cat, done) {
    await this.auth.ensureInitialized();
    this.todoItems = [];
    const ref = query(
      this.todoRef,
      where('user', '==', this.auth.user.uid),
      where('done', '==', done),
      where('cat', '==', cat),
      orderBy('created', 'desc'),
    );
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach((doc) => {
      const dat = doc.data();
      dat['id'] = doc.id;
      this.todoItems.push(dat);
    });
    return this.todoItems;
  }

  @action
  async getCats() {
    await this.auth.ensureInitialized();
    this.categories = [];
    const ref = query(this.catRef, where('user', '==', this.auth.user.uid));
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach((doc) => {
      console.log(doc);
      this.categories.push(doc.id);
    });
    console.log('ccccccc');
    console.log(this.categories);
    return this.categories;
  }
}
