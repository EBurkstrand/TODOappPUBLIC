import Service from '@ember/service';
import { service } from '@ember/service';
import { action } from '@ember/object';

import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
  onAuthStateChanged,
  authStateReady,
} from 'firebase/auth';
import { tracked } from '@glimmer/tracking';

export default class AuthService extends Service {
  @service firebase;
  @service router;

  auth = getAuth(this.firebase.app);

  @tracked user = undefined;
  @tracked loggedIn = false;

  async ensureInitialized() {
    await this.auth.authStateReady();
    this.user = this.auth.currentUser;
  }

  async requireLogin() {
    await this.ensureInitialized();
    if (!this.user) {
      this.loggedIn = false;
      this.router.transitionTo('welcome');
    } else {
      this.loggedIn = true;
    }
  }

  async requireLogout() {
    await this.ensureInitialized();
    if (this.user) {
      this.router.transitionTo('todos');
    }
  }

  async ensureLoggedIn() {
    await this.ensureInitialized;
    if (!this.user) {
      throw new Error('NOT LOGGED IN');
    }
  }

  async init() {
    super.init(...arguments);
    await this.ensureInitialized;
    await onAuthStateChanged(this.auth, (user) => (this.user = user));
    if (!this.user) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  @action
  async login() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result = await signInWithPopup(this.auth, provider);
    this.router.transitionTo('todos');
    return result;
  }

  @action
  async logout() {
    await signOut(this.auth);
    this.loggedIn = false;
    this.router.transitionTo('welcome');
  }

  @action
  returnUID() {
    return this.user;
  }
}
