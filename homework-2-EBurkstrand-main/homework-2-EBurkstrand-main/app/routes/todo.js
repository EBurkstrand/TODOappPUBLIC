import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TodoRoute extends Route {
  @service auth;
  @service todoEdit;
  @service router;

  @tracked cats;

  async beforeModel() {
    await this.auth.requireLogin();
  }

  async model(params) {
    const todo = await this.todoEdit.getTodoByID(params.id);
    if (todo == null) {
      this.router.transitionTo('fourohfour');
    }
    this.cats = await this.todoEdit.getCats();
    return todo;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('todo', model);
    controller.set('cats', this.cats);
  }
}
