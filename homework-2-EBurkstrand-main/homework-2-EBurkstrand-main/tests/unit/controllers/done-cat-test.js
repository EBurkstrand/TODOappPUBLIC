import { module, test } from 'qunit';
import { setupTest } from 'homework2/tests/helpers';

module('Unit | Controller | done-cat', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:done-cat');
    assert.ok(controller);
  });
});
