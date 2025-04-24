import { module, test } from 'qunit';
import { setupTest } from 'homework2/tests/helpers';

module('Unit | Route | trashcan', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:trashcan');
    assert.ok(route);
  });
});
