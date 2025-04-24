import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DoneCatRoute extends Route {
  @service auth;
  @service todoEdit;
  @service router;

  @tracked cat;

  async beforeModel() {
    await this.auth.requireLogin();
  }

  async model(params) {
    const todos = await this.todoEdit.getTodoByCat(params.cat, true);
    const cats = await this.todoEdit.getCats();
    if (!cats.includes(params.cat)) {
      this.router.transitionTo('fourohfour');
    }
    this.cat = params.cat;
    return todos;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('todos', model);
    controller.set('cat', this.cat);
  }
}
