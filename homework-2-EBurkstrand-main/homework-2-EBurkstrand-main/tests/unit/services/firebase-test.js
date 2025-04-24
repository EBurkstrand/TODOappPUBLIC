import { module, test } from 'qunit';
import { setupTest } from 'homework2/tests/helpers';

module('Unit | Service | firebase', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:firebase');
    assert.ok(service);
  });
});
