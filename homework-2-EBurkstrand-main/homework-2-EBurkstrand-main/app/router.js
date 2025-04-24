import EmberRouter from '@ember/routing/router';
import config from 'homework2/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('todos');
  this.route('done');
  this.route('todo', { path: '/todo/:id' });
  this.route('fourohfour', { path: '/404' });
  this.route('trashcan', { path: '*:' });
  this.route('welcome', { path: '/' });
  this.route('todoCat', { path: '/todos/:cat' });
  this.route('doneCat', { path: '/done/:cat' });
});
