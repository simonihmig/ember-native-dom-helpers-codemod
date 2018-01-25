import { findAll } from 'ember-native-dom-helpers';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('last');

test('transforms last() correctly', function(assert) {
  assert.ok(findAll('.foo bar').slice(-1)[0]);

  const otherLast = someOtherObj.last();
});
