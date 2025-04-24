import { module, test } from 'qunit';
import { setupTest } from 'homework2/tests/helpers';

module('Unit | Route | todoCat', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:todo-cat');
    assert.ok(route);
  });
});
