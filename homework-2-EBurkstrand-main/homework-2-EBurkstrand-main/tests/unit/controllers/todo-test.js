import { module, test } from 'qunit';
import { setupTest } from 'homework2/tests/helpers';

module('Unit | Controller | todo', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:todo');
    assert.ok(controller);
  });
});
