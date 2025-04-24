import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class WelcomeController extends Controller {
  @service auth;
  @service router;
}
