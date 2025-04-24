import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class WelcomeRoute extends Route {
  @service auth;
  async beforeModel() {
    this.auth.requireLogout();
  }
}
