import { findAll } from 'ember-native-dom-helpers';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('first-and-get');

test('transforms first() correctly', function(assert) {
  assert.ok(findAll('.foo bar')[0]);

  const otherFirst = someOtherObj.first();
});

test('transforms get() correctly', function(assert) {
  assert.ok(findAll('.foo bar')[3]);

  const otherGet = someOtherObj.get(1);
});
