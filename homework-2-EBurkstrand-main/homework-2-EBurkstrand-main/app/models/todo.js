import Model, { attr } from '@ember-data/model';

export default class TodoModel extends Model {
  @attr('string') text;
  @attr('boolean', { defaultValue: false }) isDone;
  @attr('date', {
    defaultValue() {
      return new Date();
    },
  })
  createdAt;
}
