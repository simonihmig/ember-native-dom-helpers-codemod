import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('last');

test('transforms last() correctly', function(assert) {
  assert.ok(find('.foo bar').last());

  const otherLast = someOtherObj.last();
});
