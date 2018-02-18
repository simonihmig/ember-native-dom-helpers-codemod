import { findAll } from 'ember-native-dom-helpers';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('get');

test('transforms get() correctly', function(assert) {
  assert.ok(findAll('.foo bar')[3]);
  assert.ok(findAll('.foo bar').slice(-1)[0]);
  assert.ok(findAll('.foo bar').slice(-3)[0]);

  const otherGet = someOtherObj.get(1);
});
