import { module, test } from 'qunit';
import { setupTest } from 'homework2/tests/helpers';

module('Unit | Route | done', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:done');
    assert.ok(route);
  });
});
