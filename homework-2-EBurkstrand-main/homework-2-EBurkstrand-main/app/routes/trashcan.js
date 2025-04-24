import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class TrashcanRoute extends Route {
  @service router;

  beforeModel() {
    this.router.transitionTo('fourohfour');
  }
}
